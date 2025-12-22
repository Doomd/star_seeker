import React, { useEffect, useState, useMemo } from 'react'
import {
	View,
	Text,
	StyleSheet,
	LayoutChangeEvent,
	Platform,
} from 'react-native'
import Svg, {
	Line,
	Circle,
	Text as SvgText,
	G,
	Defs,
	Filter,
	FeGaussianBlur,
	FeMerge,
	FeMergeNode,
} from 'react-native-svg'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withSequence,
	withDelay,
	Easing,
	runOnJS,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated'
import { Rocket } from 'lucide-react-native'
import { useThemeColor } from '@/hooks/useThemeColor'

interface JourneyVisualizerProps {
	route?: {
		route: string[]
		totalCost: number
	}
	isLoading: boolean
}

interface Position {
	code: string
	x: number
	y: number
}

const STAR_COUNT = 50
const WARP_STAR_COUNT = 20

export function JourneyVisualizer({
	route,
	isLoading,
}: JourneyVisualizerProps) {
	const Colors = useThemeColor()
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [positions, setPositions] = useState<Position[]>([])

	const rocketX = useSharedValue(0)
	const rocketY = useSharedValue(0)
	const rocketRotate = useSharedValue(45)
	const rocketOpacity = useSharedValue(0)

	const warpOpacity = useSharedValue(0)

	// Static Stars
	const stars = useMemo(() => {
		return Array.from({ length: STAR_COUNT }).map((_, i) => ({
			id: i,
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.2,
		}))
	}, [])

	const onLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout
		setDimensions({ width, height })
	}

	// Calculate Map Positions when route or dimensions change
	useEffect(() => {
		if (dimensions.width > 0 && dimensions.height > 0 && route?.route) {
			const padding = 60
			const usableWidth = dimensions.width - padding * 2
			const count = route.route.length

			const newPositions: Position[] = []
			let lastY = dimensions.height / 2

			route.route.forEach((code, i) => {
				const x = padding + (i / (count - 1 || 1)) * usableWidth
				let y
				if (i === 0) {
					y = padding + Math.random() * (dimensions.height - padding * 2)
				} else {
					const dx = x - newPositions[i - 1].x
					const maxDY = dx * 0.8
					y = lastY + (Math.random() * maxDY * 2 - maxDY)
					y = Math.max(padding, Math.min(dimensions.height - padding, y))
				}
				newPositions.push({ code, x, y })
				lastY = y
			})
			setPositions(newPositions)
		} else if (!route) {
			setPositions([])
		}
	}, [route, dimensions])

	// Handle Loading Warp Effect
	useEffect(() => {
		warpOpacity.value = withTiming(isLoading ? 1 : 0, { duration: 500 })
	}, [isLoading])

	// Rocket Animation
	useEffect(() => {
		if (positions.length > 0 && !isLoading) {
			const VERTICAL_OFFSET = 15

			const animateStep = async () => {
				// Start at first node
				rocketX.value = positions[0].x
				rocketY.value = positions[0].y + VERTICAL_OFFSET

				if (positions.length > 1) {
					const next = positions[1]
					const initialAngle =
						Math.atan2(next.y - positions[0].y, next.x - positions[0].x) *
							(180 / Math.PI) +
						45
					rocketRotate.value = initialAngle
				}

				rocketOpacity.value = withTiming(1, { duration: 500 })

				for (let i = 1; i < positions.length; i++) {
					const pos = positions[i]

					rocketX.value = withTiming(pos.x, {
						duration: 800,
						easing: Easing.bezier(0.4, 0, 0.2, 1),
					})
					rocketY.value = withTiming(pos.y + VERTICAL_OFFSET, {
						duration: 800,
						easing: Easing.bezier(0.4, 0, 0.2, 1),
					})

					await new Promise((r) => setTimeout(r, 850))

					if (i < positions.length - 1) {
						const next = positions[i + 1]
						const nextAngle =
							Math.atan2(next.y - pos.y, next.x - pos.x) * (180 / Math.PI) + 45
						rocketRotate.value = withTiming(nextAngle, { duration: 300 })
						await new Promise((r) => setTimeout(r, 350))
					}
				}
			}

			animateStep()
		} else {
			rocketOpacity.value = withTiming(0, { duration: 300 })
		}
	}, [positions, isLoading])

	const animatedRocketStyle = useAnimatedStyle(() => ({
		left: rocketX.value - 16,
		top: rocketY.value - 16,
		transform: [{ rotate: `${rocketRotate.value}deg` }],
		opacity: rocketOpacity.value,
	}))

	const animatedWarpStyle = useAnimatedStyle(() => ({
		opacity: warpOpacity.value,
	}))

	return (
		<View
			style={[styles.container, { backgroundColor: Colors.panel }]}
			onLayout={onLayout}
			className="overflow-hidden rounded-3xl border border-ui"
		>
			{/* Background stars */}
			{stars.map((star) => (
				<View
					key={star.id}
					style={[
						styles.star,
						{
							left: star.left,
							top: star.top,
							width: star.size,
							height: star.size,
							opacity: star.opacity,
						},
					]}
				/>
			))}

			{/* Warp star overlay */}
			<Animated.View
				style={[StyleSheet.absoluteFill, animatedWarpStyle]}
				pointerEvents="none"
			>
				{Array.from({ length: WARP_STAR_COUNT }).map((_, i) => (
					<WarpStar key={i} dimensions={dimensions} index={i} />
				))}
			</Animated.View>

			{/* Map SVG */}
			<Svg style={StyleSheet.absoluteFill}>
				<Defs>
					<Filter id="glow">
						<FeGaussianBlur stdDeviation="2" result="blur" />
						<FeMerge>
							<FeMergeNode in="blur" />
							<FeMergeNode in="SourceGraphic" />
						</FeMerge>
					</Filter>
				</Defs>

				{/* Paths */}
				{positions.map((pos, i) => {
					if (i === 0) return null
					const prev = positions[i - 1]
					return (
						<G key={`path-${i}`}>
							<Line
								x1={prev.x}
								y1={prev.y}
								x2={pos.x}
								y2={pos.y}
								stroke={Colors.primary}
								strokeWidth="1.5"
								strokeDasharray="4,4"
								opacity={0.4}
							/>
						</G>
					)
				})}

				{/* Nodes */}
				{positions.map((pos, i) => (
					<G key={`node-${i}`}>
						<Circle cx={pos.x} cy={pos.y} r="4" fill={Colors.primary} />
						<SvgText
							x={pos.x}
							y={pos.y - 12}
							fill={Colors.foreground.dim}
							fontSize="10"
							fontWeight="bold"
							textAnchor="middle"
						>
							{pos.code}
						</SvgText>
					</G>
				))}
			</Svg>

			{/* Rocket */}
			<Animated.View style={[styles.rocketContainer, animatedRocketStyle]}>
				<Rocket size={24} color={Colors.primary} />
			</Animated.View>

			{isLoading && (
				<View className="absolute inset-0 items-center justify-center p-6 pointer-events-none">
					<View className="bg-slate-950/80 rounded-full px-4 py-2 border border-primary/30 flex-row items-center">
						<Animated.View
							className="w-2 h-2 rounded-full bg-primary mr-3"
							style={{ opacity: 0.8 }}
						/>
						<Text className="text-white font-bold">CALCULATING ROUTE...</Text>
					</View>
				</View>
			)}
		</View>
	)
}

function WarpStar({
	dimensions,
	index,
}: {
	dimensions: { width: number; height: number }
	index: number
}) {
	const swim = useSharedValue(0)
	const left = useMemo(
		() => Math.random() * (dimensions.width || 300),
		[dimensions.width]
	)

	useEffect(() => {
		swim.value = withRepeat(
			withSequence(
				withDelay(
					index * 100,
					withTiming(1, { duration: 800, easing: Easing.linear })
				),
				withTiming(0, { duration: 0 })
			),
			-1
		)
	}, [dimensions])

	const animatedStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		left: left,
		top: interpolate(
			swim.value,
			[0, 1],
			[-50, dimensions.height || 400],
			Extrapolate.CLAMP
		),
		height: interpolate(swim.value, [0, 1], [0, 80], Extrapolate.CLAMP),
		width: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		opacity: interpolate(swim.value, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0]),
	}))

	return <Animated.View style={animatedStyle} />
}

const styles = StyleSheet.create({
	container: {
		height: 180,
		width: '100%',
		position: 'relative',
	},
	star: {
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 50,
	},
	rocketContainer: {
		position: 'absolute',
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
