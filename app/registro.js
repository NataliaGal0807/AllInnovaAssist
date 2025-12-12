import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

export default function Registro() {

    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [condicion, setCondicion] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const enviarFormulario = () => {
        if (!nombre || !fecha || !telefono || !correo) {
            setModalVisible(true); // Muestra modal de error
            return;
        }

        setModalVisible(true); // Muestra modal de éxito
    };

    return (
        <>
            {/* -------------------- MODAL BONITO -------------------- */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <Text style={styles.modalIcon}>✔️</Text>
                        <Text style={styles.modalTitle}>Formulario enviado</Text>
                        <Text style={styles.modalMessage}>
                            Nos pondremos en contacto contigo pronto.
                        </Text>

                        <Pressable
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                router.push("/tarifas");
                            }}
                        >
                            <Text style={styles.modalButtonText}>Aceptar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>

            {/* -------------------- FORMULARIO -------------------- */}

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                <Text style={styles.title}>Ficha de registro</Text>

                {/* Nombre */}
                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />

                {/* Fecha de nacimiento */}
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    value={fecha}
                    onChangeText={setFecha}
                />

                {/* Teléfono */}
                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+56 9 1234 5678"
                    keyboardType="phone-pad"
                    value={telefono}
                    onChangeText={setTelefono}
                />

                {/* Correo */}
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ejemplo@gmail.com"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setCorreo}
                />

                {/* Condición médica */}
                <Text style={styles.label}>Condición médica</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Describe la condición médica del usuario"
                    value={condicion}
                    onChangeText={setCondicion}
                    multiline
                />

                {/* Botón enviar */}
                <Pressable style={styles.button} onPress={enviarFormulario}>
                    <Text style={styles.buttonText}>Enviar solicitud</Text>
                </Pressable>

                {/* Volver */}
                <Link href="/" asChild>
                    <Pressable style={styles.backButton}>
                        <Text style={styles.backText}>Volver al inicio</Text>
                    </Pressable>
                </Link>

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F7FA",
        padding: 20,
    },
    content: {
        maxWidth: 480,
        width: "100%",
        alignSelf: "center",
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#002B26",
        textAlign: "center",
        marginBottom: 25,
    },
    label: {
        fontSize: 14,
        color: "#002B26",
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        borderColor: "#A8E3DC",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#26A69A",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 25,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 15,
        paddingVertical: 10,
    },
    backText: {
        color: "#26A69A",
        textAlign: "center",
        fontWeight: "bold",
    },

    /* ---------- MODAL ---------- */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 20,
        width: "80%",
        maxWidth: 350,
        alignItems: "center",
    },
    modalIcon: {
        fontSize: 40,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#002B26",
        marginBottom: 5,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 14,
        color: "#335954",
        textAlign: "center",
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: "#2CB68A",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});
