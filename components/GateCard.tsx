import { Gate } from '@/types';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

interface GateCardProps {
  gate: Gate;
}

export function GateCard({ gate }: GateCardProps) {
  return (
    <Link href={`/${gate.code}`} asChild>
      <Pressable className="bg-slate-800 p-4 rounded-xl mb-3 active:bg-slate-700">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-white">{gate.name}</Text>
          <Text className="text-sm font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
            {gate.code}
          </Text>
        </View>
        <Text className="text-slate-400 text-sm">
          {gate.links.length} Connections
        </Text>
      </Pressable>
    </Link>
  );
}
