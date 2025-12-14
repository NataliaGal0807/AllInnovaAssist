import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerBackTitle: "Volver",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#FFFFFF",
                },
                headerTintColor: "#003D3A",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        />
    );
}
