import { router, Stack, } from "expo-router";
import { useRef, useState, } from "react";
import {
    Alert,
    Animated,
    Image,
    Modal,
    Pressable,

    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import imagenLogo from "./imagenes/logo-circular-remove.png";

export default function Calificacion() {
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState("");

    const animaciones = [
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
        useRef(new Animated.Value(1)).current,
    ];

    const animarEstrella = (i) => {
        Animated.sequence([
            Animated.timing(animaciones[i], { toValue: 1.4, duration: 120, useNativeDriver: true }),
            Animated.timing(animaciones[i], { toValue: 1, duration: 120, useNativeDriver: true }),
        ]).start();
    };

    const seleccionarRating = (numero) => {
        setRating(numero);
        animarEstrella(numero - 1);
    };
    const [modalVisible, setModalVisible] = useState(false);

    // Animación del icono
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const enviar = () => {
        if (rating === 0) {
            Alert.alert("Falta calificación", "Selecciona una cantidad de estrellas ⭐");
            return;
        }

        // Mostrar modal
        setModalVisible(true);

        // Animación suave del check
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 80,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            <Stack.Screen
                options={{ title: "Calificación" }}
            />
            <View style={styles.container}>
                <View style={styles.inner}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Image source={imagenLogo} style={styles.logo} />
                        <Text style={styles.title}>Califica tu experiencia</Text>
                    </View>

                    {/* ESTRELLAS */}
                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((num, index) => (
                            <Pressable key={num} onPress={() => seleccionarRating(num)}>
                                <Animated.Text
                                    style={[
                                        styles.star,
                                        rating >= num && styles.starSelected,
                                        { transform: [{ scale: animaciones[index] }] },
                                    ]}
                                >
                                    ★
                                </Animated.Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* COMENTARIO */}
                    <Text style={styles.label}>Escribe tu reseña (opcional)</Text>
                    <TextInput
                        multiline
                        placeholder="Escribe tu opinión sobre el servicio..."
                        style={styles.textArea}
                        value={comentario}
                        onChangeText={setComentario}
                    />

                    {/* BOTÓN */}
                    <Pressable style={styles.button} onPress={enviar}>
                        <Text style={styles.buttonText}>Enviar Calificación</Text>
                    </Pressable>

                    <Pressable onPress={() => router.back()}>
                        <Text style={styles.backText}>Volver</Text>
                    </Pressable>
                </View>
            </View>
            {/* MODAL PROFESIONAL */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>

                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Text style={styles.checkIcon}>✔</Text>
                        </Animated.View>

                        <Text style={styles.modalTitle}>¡Gracias por tu opinión!</Text>

                        <Text style={styles.modalMessage}>
                            Tu calificación se registró correctamente.
                            Gracias por ayudarnos a mejorar nuestro servicio.
                        </Text>

                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                router.push("/");
                            }}
                        >
                            <Text style={styles.modalButtonText}>Aceptar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F7FA",
        paddingTop: 60,
        alignItems: "center",
    },

    // 🔥 El max width real
    inner: {
        width: "90%",
        maxWidth: 480,
        alignItems: "center",
    },

    header: {
        alignItems: "center",
        marginBottom: 20,
    },

    logo: {
        width: 110,
        height: 110,
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#003D3A",
        textAlign: "center",
    },

    // ESTRELLAS
    starsContainer: {
        flexDirection: "row",
        marginVertical: 20,
    },
    star: {
        fontSize: 45,
        color: "#BFC9C8",
        marginHorizontal: 8,
    },
    starSelected: {
        color: "#FFC107",
        textShadowColor: "#FFDA6A",
        textShadowRadius: 6,
    },

    // RESEÑA
    label: {
        width: "100%",
        fontSize: 14,
        fontWeight: "600",
        color: "#003D3A",
        marginBottom: 8,
    },
    textArea: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDE7E6",
        minHeight: 120,
        padding: 12,
        textAlignVertical: "top",
        marginBottom: 20,
    },

    button: {
        backgroundColor: "#26A69A",
        padding: 15,
        borderRadius: 15,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

    backText: {
        color: "#777",
        marginBottom: 30,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modalCard: {
        backgroundColor: "white",
        width: "90%",
        maxWidth: 420,
        padding: 30,
        borderRadius: 20,
        alignItems: "center",

        // sombras profesionales
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 6,
    },

    checkIcon: {
        fontSize: 60,
        color: "#26A69A",
        marginBottom: 10,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#003D3A",
        marginBottom: 8,
        textAlign: "center",
    },

    modalMessage: {
        fontSize: 14,
        color: "#335954",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 20,
    },

    modalButton: {
        backgroundColor: "#26A69A",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 12,
    },

    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

});
