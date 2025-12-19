import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function GateDetailsScreen() {
  const { code } = useLocalSearchParams();
  
  return (
    <View className="flex-1 items-center justify-center bg-slate-950">
      <Text className="text-white text-xl">Details for {code}</Text>
    </View>
  );
}
