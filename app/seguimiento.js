import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";


import imagenAuto from "./imagenes/auto-remove.png";
import imagenLogo from "./imagenes/logo-circular-remove.png";
import imagenMapa from "./imagenes/mapa-falso.png";

export default function Seguimiento() {
    const [mapSize, setMapSize] = useState({ width: 1, height: 1 });

    const pos = useRef(new Animated.ValueXY({ x: 80, y: 620 })).current;

    // Ruta ORIGINAL basada en la imagen de 768x768
    const rutaOriginal = [
        { x: 100, y: 700 },
        { x: 200, y: 650 },
        { x: 300, y: 600 },
        { x: 380, y: 520 },
        { x: 450, y: 450 },
        { x: 520, y: 350 },
        { x: 600, y: 290 },
        { x: 680, y: 150 },

    ];

    // Ruta ESCALADA al tamaño real del mapa
    const rutaEscalada = rutaOriginal.map((p) => ({
        x: (p.x / 768) * mapSize.width,
        y: (p.y / 768) * mapSize.height,
    }));

    useEffect(() => {
        if (!mapSize.width) return;

        const animaciones = rutaEscalada.map((p) =>
            Animated.timing(pos, {
                toValue: { x: p.x, y: p.y },
                duration: 2000,
                useNativeDriver: false,
            })
        );

        Animated.loop(Animated.sequence(animaciones)).start();
    }, [mapSize]);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F2F7FA" }}
            contentContainerStyle={styles.scrollContent}
        >
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={imagenLogo} style={styles.logo} />
                </View>
                <Text style={styles.headerText}>Seguimiento en tiempo real</Text>
            </View>

            {/* MAPA */}
            <View style={styles.mapWrapper}>
                <View
                    style={styles.mapContainer}
                    onLayout={(e) => {
                        const { width, height } = e.nativeEvent.layout;
                        setMapSize({ width, height });
                    }}
                >
                    <Image source={imagenMapa} style={styles.mapa} />

                    {/* AUTO ANIMADO */}
                    <Animated.Image
                        source={imagenAuto}
                        style={[
                            styles.auto,
                            { transform: pos.getTranslateTransform() }
                        ]}
                    />
                </View>
            </View>

            {/* BURBUJA */}
            <View style={styles.bubble}>
                <Text style={styles.bubbleText}>El viaje está en curso...</Text>

                <Pressable
                    onPress={() => router.push("/calificacion")}
                    style={styles.bubbleButton}
                >
                    <Text style={styles.bubbleButtonText}>Calificar servicio</Text>
                </Pressable>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Estado: En camino</Text>
                <Text style={styles.footerText}>Llegada estimada: 15:30</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F2F7FA" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#26A69A",
        paddingVertical: 10,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    logo: {
        width: 55,
        height: 55,
    },

    logoContainer: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 50,
        marginRight: 10,

        // Sombras para iOS
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },

        // Sombra para Android
        elevation: 4,

        // Sombra para Web
        ...(Platform.OS === "web" && {
            boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
        }),
    },



    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },

    mapWrapper: { alignItems: "center", marginTop: 10 },

    mapContainer: {
        width: "100%",
        maxWidth: 480,
        aspectRatio: 1,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#ddd",
        position: "relative",
    },

    mapa: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    auto: {
        width: 50,
        height: 50,
        position: "absolute",
    },

    bubble: {
        marginTop: 20,
        alignSelf: "center",
        width: "90%",
        maxWidth: 450,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "#26A69A",
    },

    bubbleText: {
        textAlign: "center",
        color: "#003D3A",
        fontWeight: "600",
        marginBottom: 10,
    },

    bubbleButton: {
        backgroundColor: "#26A69A",
        padding: 12,
        borderRadius: 10,
    },

    bubbleButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },

    footer: {
        marginTop: 20,
        backgroundColor: "#003D3A",
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    footerText: { color: "white", fontWeight: "bold" },
});
