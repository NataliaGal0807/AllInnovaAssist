import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import imagenLogo from "./imagenes/logo-circular-remove.png";
export default function Inicio() {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const iniciarSesion = () => {
        if (!email || !password) {
            alert("Debes completar todos los campos");
            return;
        }

        setModalVisible(false);
        router.push('/tarifas')
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {/* LOGO */}
                <View style={styles.header}>
                    <Image source={imagenLogo} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>ALL INNOVA ASSIST</Text>
                    <Text style={styles.subtitle}>
                        Transporte especializado para adultos mayores y personas con discapacidad
                    </Text>
                </View>

                {/* QUIENES SOMOS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quiénes somos</Text>
                    <Text style={styles.sectionText}>
                        Somos un servicio de transporte privado diseñado para brindar seguridad,
                        comodidad y acompañamiento a personas con movilidad reducida y adultos mayores.
                    </Text>
                </View>

                {/* MISIÓN + VISIÓN LADO A LADO */}
                <View style={styles.row}>

                    {/* Misión */}
                    <View style={styles.sectionHalf}>
                        <Text style={styles.sectionTitle}>Misión</Text>
                        <Text style={styles.sectionText}>
                            Brindar traslados seguros y confiables, con un servicio humano y accesible para cada persona.
                        </Text>
                    </View>

                    {/* Visión */}
                    <View style={styles.sectionHalf}>
                        <Text style={styles.sectionTitle}>Visión</Text>
                        <Text style={styles.sectionText}>
                            Convertirnos en el sistema de transporte especializado más confiable de la región.
                        </Text>
                    </View>

                </View>

                {/* BOTÓN REGISTRO */}
                <Link href="/registro" asChild>
                    <Pressable style={styles.buttonPrimary}>
                        <Text style={styles.buttonPrimaryText}>Registrarse</Text>
                    </Pressable>
                </Link>

                {/* BOTÓN INICIAR SESIÓN */}
                <Pressable style={styles.buttonSecondary} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonSecondaryText}>Iniciar sesión</Text>
                </Pressable>


            </ScrollView>
            {/* MODAL LOGIN */}
            <Modal transparent animationType="fade" visible={modalVisible}>
                <View style={styles.modalOverlay}>

                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Iniciar sesión</Text>

                        {/* Correo */}
                        <Text style={styles.modalLabel}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ejemplo@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        {/* Contraseña */}
                        <Text style={styles.modalLabel}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        {/* Entrar */}
                        <Pressable style={styles.modalButton} onPress={iniciarSesion}>
                            <Text style={styles.modalButtonText}>Entrar</Text>
                        </Pressable>

                        {/* Cancelar */}
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F2F7FA",
    },
    content: {
        maxWidth: 480,
        alignSelf: "center",
        width: "100%",
        paddingBottom: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 25,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "bold",
        color: "#002B26",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#555",
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    section: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E1ECEB",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#003D3A",
        marginBottom: 5,
    },
    sectionText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },

    // Botón principal (registro)
    buttonPrimary: {
        backgroundColor: "#26A69A",
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
    },
    buttonPrimaryText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },

    // Botón secundario (login)
    buttonSecondary: {
        borderColor: "#26A69A",
        borderWidth: 2,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 12,
    },
    buttonSecondaryText: {
        color: "#26A69A",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 15,
    },

    sectionHalf: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E1ECEB",
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "white",
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 20,
    },
    modalTitle: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#003D3A",
    },
    modalLabel: {
        marginTop: 10,
        color: "#003D3A",
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#F3F3F3",
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    modalButton: {
        backgroundColor: "#26A69A",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    modalButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    cancelText: {
        textAlign: "center",
        marginTop: 10,
        color: "#888",
    },
});
