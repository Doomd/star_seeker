import { useTransportCost } from '@/hooks/useQueries'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useUserStore } from '@/store/useUserStore'
import { Ionicons } from '@expo/vector-icons'
import TabPage from '@/components/ui/TabPage'
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
import { calculateFleetSize, formatCurrency } from '@/utils/journey'

export default function CalculatorScreen() {
	const { calculatorSettings, setCalculatorSettings } = useUserStore()
	const { distance, passengers, parking } = calculatorSettings
	const { width } = useWindowDimensions()
	const Colors = useThemeColor()

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
		<TabPage title="Estimate Journey Cost">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="gap-8">
					<View className="gap-4 px-1">
						<View>
							<Text className="mb-2 text-foreground-muted">Distance (AU)</Text>
							<TextInput
								className="rounded-xl border border-ui bg-ui p-4 text-lg leading-tight text-foreground focus:border-primary"
								placeholder="e.g 150"
								placeholderTextColor={Colors.foreground.dim}
								keyboardType="numeric"
								value={distance}
								onChangeText={(val) => setCalculatorSettings({ distance: val })}
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
									onChangeText={(val) =>
										setCalculatorSettings({ passengers: val })
									}
								/>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(passengers) || 0
										setCalculatorSettings({
											passengers: Math.max(1, current - 1).toString(),
										})
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
										setCalculatorSettings({
											passengers: (current + 1).toString(),
										})
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
									onChangeText={(val) =>
										setCalculatorSettings({ parking: val })
									}
								/>

								<TouchableOpacity
									onPress={() => {
										const current = parseInt(parking) || 0
										setCalculatorSettings({
											parking: Math.max(0, current - 1).toString(),
										})
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
										setCalculatorSettings({
											parking: (current + 1).toString(),
										})
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
										const count = calculateFleetSize(
											parseInt(passengers),
											capacity
										)
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
																	{formatCurrency(
																		costData.recommendedTransport.ratePerAu! *
																			count
																	)}{' '}
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
																	{formatCurrency(costData.journeyCost)}
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
																	{formatCurrency(costData.parkingFee)}
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
																	<Text className="mr-3 font-mono text-sm font-bold text-foreground-muted text-right">
																		£
																		{(
																			(costData.journeyCost +
																				costData.parkingFee) /
																			count
																		).toFixed(2)}
																	</Text>
																)}
																<Text
																	className="w-32 font-mono text-xl font-bold text-primary text-right"
																	numberOfLines={1}
																	adjustsFontSizeToFit
																>
																	{formatCurrency(
																		costData.journeyCost + costData.parkingFee
																	)}
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
																{formatCurrency(
																	costData.recommendedTransport.ratePerAu!
																)}{' '}
																/ AU
															</Text>
														</View>
														<View className="flex-row justify-between">
															<Text className="text-foreground-muted">
																Journey Cost ({distance} AU)
															</Text>
															<Text className="font-mono text-foreground">
																{formatCurrency(costData.journeyCost)}
															</Text>
														</View>
														<View className="flex-row justify-between">
															<Text className="text-foreground-muted">
																Parking Cost
															</Text>
															<Text className="font-mono text-foreground">
																{formatCurrency(costData.parkingFee)}
															</Text>
														</View>
														<View className="my-1 h-[1px] bg-ui" />
														<View className="flex-row items-center justify-between">
															<Text className="font-bold text-foreground">
																Total
															</Text>
															<Text className="font-mono text-xl font-bold text-primary">
																{formatCurrency(
																	costData.journeyCost + costData.parkingFee
																)}
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
				</View>
			</ScrollView>
		</TabPage>
	)
}
