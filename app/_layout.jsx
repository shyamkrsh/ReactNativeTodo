import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'ToDo App',
        headerTitleStyle: {
          fontWeight: 600,
          fontSize: 25
        }
      }} />
    </Stack>
  )
}
