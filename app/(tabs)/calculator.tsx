import { Theme as Colors } from '@/constants/Colors'
import { useTransportCost } from '@/hooks/useQueries'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CalculatorScreen() {
	const [distance, setDistance] = useState('')
	const [passengers, setPassengers] = useState('2')
	const [parking, setParking] = useState('3')
	const { width } = useWindowDimensions()

	const {
		data: costData,
		isLoading,
		error,
	} = useTransportCost(
		parseFloat(distance) || 0,
		parseInt(passengers) || 0,
		parseInt(parking) || 0
	)

	const showEach = width >= 500

	return (
		<SafeAreaView className="flex-1 bg-background" edges={['top']}>
			<View className="flex-1 px-4 py-4">
				<Text className="mb-6 text-3xl font-bold text-foreground">
					Journey Cost
				</Text>

				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<View className="mb-8 gap-4 pr-1">
						<View>
							<Text className="mb-2 text-foreground-muted">Distance (AU)</Text>
							<TextInput
								className="rounded-xl border border-ui bg-ui p-4 text-lg leading-tight text-foreground focus:border-primary"
								placeholder="e.g 150"
								placeholderTextColor={Colors.foreground.dim}
								keyboardType="numeric"
								value={distance}
								onChangeText={setDistance}
							/>
						</View>

						<View>
							<Text className="mb-2 text-foreground-muted">Passengers</Text>
							<View className="flex-row items-center gap-2">
								<TextInput
									className="h-14 flex-1 rounded-xl border border-ui bg-ui p-4 text-lg leading-tight text-foreground focus:border-primary"
									placeholder="e.g 2"
									placeholderTextColor={Colors.foreground.dim}
									keyboardType="numeric"
									value={passengers}
									onChangeText={setPassengers}
								/>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(passengers) || 0
										setPassengers(Math.max(1, current - 1).toString())
									}}
									className="h-14 w-14 items-center justify-center rounded-xl border border-ui bg-ui active:bg-ui-active"
								>
									<Ionicons
										name="remove"
										size={24}
										color={Colors.foreground.muted}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(passengers) || 0
										setPassengers((current + 1).toString())
									}}
									className="h-14 w-14 items-center justify-center rounded-xl border border-ui bg-ui active:bg-ui-active"
								>
									<Ionicons
										name="add"
										size={24}
										color={Colors.foreground.muted}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View>
							<Text className="mb-2 text-foreground-muted">Parking Days</Text>
							<View className="flex-row items-center gap-2">
								<TextInput
									className="h-14 flex-1 rounded-xl border border-ui bg-ui p-4 text-lg leading-tight text-foreground focus:border-primary"
									placeholder="e.g 3"
									placeholderTextColor={Colors.foreground.dim}
									keyboardType="numeric"
									value={parking}
									onChangeText={setParking}
								/>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(parking) || 0
										setParking(Math.max(0, current - 1).toString())
									}}
									className="h-14 w-14 items-center justify-center rounded-xl border border-ui bg-ui active:bg-ui-active"
								>
									<Ionicons
										name="remove"
										size={24}
										color={Colors.foreground.muted}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(parking) || 0
										setParking((current + 1).toString())
									}}
									className="h-14 w-14 items-center justify-center rounded-xl border border-ui bg-ui active:bg-ui-active"
								>
									<Ionicons
										name="add"
										size={24}
										color={Colors.foreground.muted}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					{isLoading && (
						<View className="p-4">
							<ActivityIndicator color={Colors.primary} />
						</View>
					)}

					{error && (
						<View className="rounded-xl border border-destructive/50 bg-destructive/20 p-4">
							<Text className="text-destructive">
								Failed to calculate cost. Please check inputs.
							</Text>
						</View>
					)}

					{costData &&
						!isLoading &&
						!error &&
						distance &&
						passengers &&
						parking && (
							<View className="rounded-2xl border border-ui bg-panel p-6">
								<Text className="mb-4 text-sm uppercase tracking-widest text-foreground-muted">
									Recommended Transport
								</Text>

								<View className="mb-6 flex-row items-center gap-4">
									<View className="rounded-full bg-primary-muted/50 p-3">
										<Ionicons
											name="rocket-outline"
											size={32}
											color={Colors.primary}
										/>
									</View>
									<View>
										<Text className="text-2xl font-bold text-foreground">
											{costData.recommendedTransport.name}
										</Text>
										<Text className="max-w-[200px] text-sm text-foreground-muted">
											{costData.recommendedTransport.description ||
												'Standard travel option.'}
										</Text>
									</View>
								</View>

								<View className="gap-3 rounded-xl bg-background p-4">
									{(() => {
										const capacity = costData.recommendedTransport.capacity || 1
										const count = Math.ceil(parseInt(passengers) / capacity)
										const isFleet = count > 1

										return (
											<>
												{isFleet && (
													<View className="mb-2 border-b border-dashed border-panel pb-2">
														<Text className="mb-1 text-xs uppercase text-foreground-muted">
															Fleet Composition
														</Text>
														<View className="flex-row items-center justify-between">
															<View className="flex-row items-center gap-2">
																<Text className="font-mono text-lg font-bold text-primary">
																	{count}x
																</Text>
																<Text className="text-foreground-dim">
																	{costData.recommendedTransport.name}s
																</Text>
															</View>
															<Text className="text-xs text-foreground-dim">
																(Pas. Capacity Each: {capacity})
															</Text>
														</View>
													</View>
												)}

												{isFleet ? (
													<>
														{showEach && (
															<View className="mb-1 flex-row justify-end">
																<Text className="mr-3 text-right text-xs text-foreground-dim">
																	EACH
																</Text>
																<Text className="w-32 text-right text-xs text-foreground-dim">
																	TOTAL
																</Text>
															</View>
														)}

														<View className="h-8 flex-row items-center justify-between">
															<Text className="text-foreground-muted">
																Rate
															</Text>
															<View className="flex-1 flex-row justify-end">
																{showEach && (
																	<Text className="mr-3 font-mono text-right text-foreground-muted">
																		£{costData.recommendedTransport.ratePerAu} /
																		AU
																	</Text>
																)}
																<Text
																	className="w-32 font-mono text-right text-foreground"
																	numberOfLines={1}
																	adjustsFontSizeToFit
																>
																	£
																	{(
																		costData.recommendedTransport.ratePerAu! *
																		count
																	).toFixed(2)}{' '}
																	/ AU
																</Text>
															</View>
														</View>

														<View className="h-8 flex-row items-center justify-between">
															<Text className="text-foreground-muted">
																Journey Cost ({distance} AU)
															</Text>
															<View className="flex-1 flex-row justify-end">
																{showEach && (
																	<Text className="mr-3 font-mono text-right text-foreground-muted">
																		{(costData.journeyCost / count).toFixed(2)}
																	</Text>
																)}
																<Text
																	className="w-32 font-mono text-right text-foreground"
																	numberOfLines={1}
																	adjustsFontSizeToFit
																>
																	{costData.journeyCost.toFixed(2)}
																</Text>
															</View>
														</View>
														<View className="h-8 flex-row items-center justify-between">
															<Text className="text-foreground-muted">
																Parking Cost
															</Text>
															<View className="flex-1 flex-row justify-end">
																{showEach && (
																	<Text className="mr-3 font-mono text-right text-foreground-muted">
																		{(costData.parkingFee / count).toFixed(2)}
																	</Text>
																)}
																<Text
																	className="w-32 font-mono text-right text-foreground"
																	numberOfLines={1}
																	adjustsFontSizeToFit
																>
																	{costData.parkingFee.toFixed(2)}
																</Text>
															</View>
														</View>
														<View className="my-1 h-[1px] bg-ui" />
														<View className="mt-1 flex-row items-center justify-between">
															<Text className="font-bold text-foreground">
																Total
															</Text>
															<View className="flex-1 flex-row items-center justify-end">
																{showEach && (
																	<Text className="mr-3 font-mono text-sm font-bold text-foreground-muted">
																		£
																		{(
																			(costData.journeyCost +
																				costData.parkingFee) /
																			count
																		).toFixed(2)}
																	</Text>
																)}
																<Text
																	className="w-32 font-mono text-xl font-bold text-primary"
																	numberOfLines={1}
																	adjustsFontSizeToFit
																>
																	£
																	{(
																		costData.journeyCost + costData.parkingFee
																	).toFixed(2)}
																</Text>
															</View>
														</View>
													</>
												) : (
													<>
														<View className="flex-row justify-between">
															<Text className="text-foreground-muted">
																Rate
															</Text>
															<Text className="font-mono text-foreground">
																£{costData.recommendedTransport.ratePerAu} / AU
															</Text>
														</View>
														<View className="flex-row justify-between">
															<Text className="text-foreground-muted">
																Journey Cost ({distance} AU)
															</Text>
															<Text className="font-mono text-foreground">
																{costData.journeyCost.toFixed(2)}
															</Text>
														</View>
														<View className="flex-row justify-between">
															<Text className="text-foreground-muted">
																Parking Cost
															</Text>
															<Text className="font-mono text-foreground">
																{costData.parkingFee.toFixed(2)}
															</Text>
														</View>
														<View className="my-1 h-[1px] bg-ui" />
														<View className="flex-row items-center justify-between">
															<Text className="font-bold text-foreground">
																Total
															</Text>
															<Text className="font-mono text-xl font-bold text-primary">
																£
																{(
																	costData.journeyCost + costData.parkingFee
																).toFixed(2)}
															</Text>
														</View>
													</>
												)}
											</>
										)
									})()}
								</View>
							</View>
						)}
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
