import { router, Stack, } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Pago() {
    const [nombre, setNombre] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    const [cargando, setCargando] = useState(false);

    const pagar = () => {
        if (!nombre || !tarjeta || !vencimiento || !cvv) {
            alert("Debes completar todos los campos.");
            return;
        }

        setCargando(true);

        // Simular pago
        setTimeout(() => {
            setCargando(false);
            router.push("/confirmacion");
        }, 1800);
    };

    return (
        <>
            <Stack.Screen
                options={{ title: "" }}
            />
            <View style={styles.fullBackground}>
                <ScrollView contentContainerStyle={styles.contentWrapper}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Pago con tarjeta</Text>

                        {/* Nombre */}
                        <Text style={styles.label}>Nombre del titular</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: Natalia Galeano"
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        {/* Tarjeta */}
                        <Text style={styles.label}>Número de tarjeta</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="numeric"
                            maxLength={19}
                            value={tarjeta}
                            onChangeText={setTarjeta}
                        />

                        <View style={styles.row}>
                            {/* Vencimiento */}
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.label}>Vencimiento</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={vencimiento}
                                    onChangeText={setVencimiento}
                                />
                            </View>

                            {/* CVV */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="123"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    value={cvv}
                                    onChangeText={setCvv}
                                />
                            </View>
                        </View>

                        {/* Botón pagar */}
                        <Pressable style={styles.payButton} onPress={pagar} disabled={cargando}>
                            {cargando ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.payText}>Pagar ahora</Text>
                            )}
                        </Pressable>

                        {/* Cancelar */}
                        <Pressable onPress={() => router.back()}>
                            <Text style={styles.cancel}>Cancelar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
        backgroundColor: "#F2F7FA",
    },

    contentWrapper: {
        padding: 20,
        alignItems: "center",
        paddingBottom: 60,
    },

    container: {
        width: "100%",
        maxWidth: 480,
        backgroundColor: "transparent",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#003D3A",
        textAlign: "center",
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        color: "#003D3A",
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 12,
    },
    input: {
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
    },
    payButton: {
        backgroundColor: "#1A715E",
        padding: 15,
        borderRadius: 12,
        marginTop: 30,
        alignItems: "center",
    },
    payText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    cancel: {
        textAlign: "center",
        marginTop: 15,
        color: "#777",
    },
});
