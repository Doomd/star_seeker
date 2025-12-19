import { Gate } from '@/types'
import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

interface GateCardProps {
	gate: Gate
}

export function GateCard({ gate }: GateCardProps) {
	return (
		<Link href={`/gates/${gate.code}`} asChild>
			<Pressable className="mb-3 rounded-xl bg-ui p-4 active:bg-ui-active">
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-xl font-bold text-foreground">{gate.name}</Text>
					<Text className="rounded bg-primary-muted px-2 py-0.5 font-mono text-sm text-primary">
						{gate.code}
					</Text>
				</View>
				<Text className="text-sm text-foreground-muted">
					{gate.links.length} Connections
				</Text>
			</Pressable>
		</Link>
	)
}
