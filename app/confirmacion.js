import * as Clipboard from "expo-clipboard";
import { router, Stack } from "expo-router";
import { Alert, Image, Pressable, Share, StyleSheet, Text, View } from "react-native";
import imagenLogo from "./imagenes/logo-circular-remove.png";

export default function Confirmacion() {

    const compartirSeguimiento = async () => {
        try {
            const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
            const link = `https://allinnovaassist.app/seguimiento/${codigo}`;

            const result = await Share.share({
                message: `Puedes seguir el viaje en tiempo real aquí:\n${link}`,
            });

            if (result.action === Share.sharedAction) {
                Alert.alert("Seguimiento enviado", "La persona ya puede ver la ubicación en tiempo real.");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo compartir el seguimiento.");
        }
    };

    const copiarLink = async () => {
        const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
        const link = `https://allinnovaassist.app/seguimiento/${codigo}`;

        await Clipboard.setStringAsync(link);
        Alert.alert("Enlace copiado", "El enlace de seguimiento se copió al portapapeles.");
    };

    return (
        <>
            <Stack.Screen
                options={{ headerShown: false }}
            />
            <View style={styles.screen}>

                {/* Encabezado */}
                <Image source={imagenLogo} style={styles.logo} />
                <Text style={styles.title}>¡Reserva confirmada!</Text>

                {/* Tarjeta */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Detalles del servicio</Text>
                    <Text style={styles.detail}>• Servicio reservado correctamente</Text>
                    <Text style={styles.detail}>• Pago procesado con éxito</Text>
                    <Text style={styles.success}>✔ Todo está listo</Text>
                </View>

                {/* Botón seguimiento */}
                <Pressable style={styles.primaryButton} onPress={() => router.push("/seguimiento")}>
                    <Text style={styles.primaryText}>Ir al seguimiento</Text>
                </Pressable>

                {/* Botón compartir */}
                <Pressable style={styles.secondaryButton} onPress={compartirSeguimiento}>
                    <Text style={styles.secondaryText}>Compartir seguimiento</Text>
                </Pressable>

                {/* Botón copiar */}
                <Pressable style={styles.outlineButton} onPress={copiarLink}>
                    <Text style={styles.outlineText}>Copiar enlace</Text>
                </Pressable>

                <Pressable onPress={() => router.push("/")}>
                    <Text style={styles.backText}>Volver al inicio</Text>
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F2F7FA",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    logo: {
        width: 110,
        height: 110,
        marginBottom: 10,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#003D3A",
        marginBottom: 20,
        textAlign: "center",
    },

    card: {
        width: "100%",
        maxWidth: 480,
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#DDE7E6",
        marginBottom: 25,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#003D3A",
        marginBottom: 10,
    },

    detail: {
        fontSize: 14,
        color: "#003D3A",
        marginBottom: 4,
    },

    success: {
        fontSize: 16,
        color: "#26A69A",
        fontWeight: "bold",
        marginTop: 14,
        textAlign: "center",
    },

    primaryButton: {
        backgroundColor: "#26A69A",
        padding: 15,
        borderRadius: 14,
        width: "100%",
        maxWidth: 480,
        alignItems: "center",
        marginBottom: 10,
        elevation: 2,
    },
    primaryText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

    secondaryButton: {
        backgroundColor: "#23D4BF",
        padding: 14,
        borderRadius: 14,
        width: "100%",
        maxWidth: 480,
        alignItems: "center",
        marginBottom: 10,
        elevation: 2,
    },
    secondaryText: {
        color: "#003D3A",
        fontWeight: "bold",
        fontSize: 15,
    },

    outlineButton: {
        borderColor: "#26A69A",
        borderWidth: 2,
        padding: 14,
        borderRadius: 14,
        width: "100%",
        maxWidth: 480,
        alignItems: "center",
        marginBottom: 15,
    },
    outlineText: {
        color: "#26A69A",
        fontWeight: "bold",
        fontSize: 15,
    },

    backText: {
        marginTop: 5,
        color: "#777",
    },
});

