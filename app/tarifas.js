import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Tarifas() {

    const [modalVisible, setModalVisible] = useState(false);
    const [turno, setTurno] = useState("");
    const [horaSeleccionada, setHoraSeleccionada] = useState("");
    const [metodoPago, setMetodoPago] = useState("");

    // Horarios simulados por turno
    const horas = {
        mañana: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        tarde: ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        emergencia: ["23:30", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00"]
    };

    const abrirReserva = (tipo) => {
        setTurno(tipo);
        setModalVisible(true);
        setHoraSeleccionada("");
        setMetodoPago("");
    };

    const continuar = () => {
        if (!horaSeleccionada) {
            alert("Debes seleccionar una hora disponible");
            return;
        }
        if (!metodoPago) {
            alert("Debes seleccionar un método de pago");
            return;
        }

        setModalVisible(false);

        if (metodoPago === "tarjeta") {
            router.push("/pago");
        } else {
            router.push("/confirmacion");
        }
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                <Text style={styles.title}>Tarifas y horarios</Text>

                {/* TURNO MAÑANA */}
                <Pressable style={styles.cardMorning} onPress={() => abrirReserva("mañana")}>
                    <Text style={styles.icon}>🌅</Text>
                    <Text style={styles.cardTitle}>TURNO MAÑANA</Text>
                    <Text style={styles.cardText}>Horario: 07:00 - 15:00</Text>
                    <Text style={styles.cardPrice}>$15.000 por hora</Text>
                </Pressable>

                {/* TURNO TARDE */}
                <Pressable style={styles.cardAfternoon} onPress={() => abrirReserva("tarde")}>
                    <Text style={styles.icon}>🌇</Text>
                    <Text style={styles.cardTitle}>TURNO TARDE</Text>
                    <Text style={styles.cardText}>Horario: 15:00 - 23:00</Text>
                    <Text style={styles.cardPrice}>$18.000 por hora</Text>
                </Pressable>

                {/* EMERGENCIA */}
                <Pressable style={styles.emergencyButton} onPress={() => abrirReserva("emergencia")}>
                    <Text style={styles.emergencyText}>S.O.S</Text>
                    <Text style={styles.cardText}>(23:00 - 07:00)</Text>
                    <Text style={styles.emergencyPrice}>$25.000 / hora</Text>
                </Pressable>

            </ScrollView >

            {/* MODAL */}
            < Modal visible={modalVisible} transparent animationType="fade" >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitle}>Selecciona hora disponible</Text>

                        {/* HORAS DISPONIBLES */}
                        <View style={styles.grid}>
                            {horas[turno]?.map((h, idx) => (
                                <Pressable
                                    key={idx}
                                    onPress={() => setHoraSeleccionada(h)}
                                    style={[
                                        styles.hourBox,
                                        horaSeleccionada === h && styles.hourSelected
                                    ]}
                                >
                                    <Text style={styles.hourText}>{h}</Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* MÉTODOS DE PAGO */}
                        <Text style={styles.modalSubtitle}>Método de pago</Text>

                        <Pressable
                            onPress={() => setMetodoPago("tarjeta")}
                            style={[styles.payButton, metodoPago === "tarjeta" && styles.paySelected]}
                        >
                            <Text style={styles.payText}>💳 Tarjeta</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setMetodoPago("efectivo")}
                            style={[styles.payButton, metodoPago === "efectivo" && styles.paySelected]}
                        >
                            <Text style={styles.payText}>💵 Efectivo</Text>
                        </Pressable>

                        {/* BOTÓN CONTINUAR */}
                        <Pressable style={styles.continueButton} onPress={continuar}>
                            <Text style={styles.continueText}>Confirmar</Text>
                        </Pressable>

                        {/* CANCELAR */}
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F7FA"
    },
    content: {
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#002B26",
        textAlign: "center",
        marginBottom: 25,
    },

    icon: { fontSize: 40, textAlign: "center", marginBottom: 10 },
    cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center" },
    cardText: { fontSize: 14, color: "#fff", textAlign: "center", marginTop: 6 },
    cardPrice: { fontSize: 16, color: "#fff", textAlign: "center", marginTop: 10, fontWeight: "bold" },

    cardMorning: {
        backgroundColor: "#23D4BF",
        padding: 20,
        borderRadius: 16,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        marginVertical: 10,
    },

    cardAfternoon: {
        backgroundColor: "#0a927eff",
        padding: 20,
        borderRadius: 16,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        marginVertical: 10,
    },

    emergencyButton: {
        backgroundColor: "#C0392B",
        padding: 16,
        borderRadius: 16,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        marginVertical: 10,
        alignItems: "center",
    },

    emergencyText: { color: "white", fontWeight: "bold", fontSize: 16 },
    emergencyPrice: { color: "white", opacity: 0.9, marginTop: 3, fontWeight: "bold" },

    /* MODAL */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        maxWidth: 480,
        width: "100%",
        alignSelf: "center",
    },

    modalTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#003D3A" },
    modalSubtitle: { marginTop: 20, marginBottom: 5, fontWeight: "bold", fontSize: 15 },

    /* GRID DE HORAS */
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
    },
    hourBox: {
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        margin: 5,
    },
    hourSelected: {
        backgroundColor: "#23d4bf",
    },
    hourText: { fontWeight: "bold", color: "#003D3A" },

    payButton: {
        padding: 12,
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        marginTop: 10,
    },
    paySelected: { backgroundColor: "#23d4bf" },
    payText: { textAlign: "center", fontWeight: "bold", color: "#003D3A" },

    continueButton: {
        backgroundColor: "#1A715E",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    continueText: { color: "white", textAlign: "center", fontWeight: "bold" },

    cancelText: { marginTop: 12, textAlign: "center", color: "#777" },
});
