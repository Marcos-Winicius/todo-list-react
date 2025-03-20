import React, { useState } from "react";
import { 
    StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Linking 
} from "react-native";

export default function HomeScreen({ navigation }) {
    const [lista, setLista] = useState([]);
    const [tarefa, setTarefa] = useState("");

    const adicionarTarefa = () => {
        if (tarefa.trim() !== "") {
            setLista([...lista, { id: Date.now(), nome: tarefa, concluida: false }]);
            setTarefa("");
        }
    };

    const alternarConcluido = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, concluida: !item.concluida } : item
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <Text 
                style={styles.title}
                onPress={() => Linking.openURL('https://github.com/Marcos-Winicius/todo-list-react')}
            >
                Lista de Tarefas
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a tarefa..."
                    placeholderTextColor="#999"
                    value={tarefa}
                    onChangeText={setTarefa}
                />
                <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lista}>
                {lista.map((item) => (
                    <View key={item.id} style={[styles.tarefa, item.concluida && styles.tarefaConcluidaContainer]}>
                        <Text style={[styles.textoTarefa, item.concluida && styles.tarefaConcluida]}>
                            {item.nome}
                        </Text>
                        <TouchableOpacity onPress={() => alternarConcluido(item.id)} style={styles.botaoConcluir}>
                            <Text style={styles.textoBotao}>
                                {item.concluida ? "✔" : "→"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <TouchableOpacity 
                style={styles.navigateButton}
                onPress={() => navigation.navigate('About', { userName: tarefa })}
            >
                <Text style={styles.navigateButtonText}>Ir para tela 2</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    addButton: {
        backgroundColor: "#0987EE",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
    },
    lista: {
        marginTop: 10,
    },
    tarefa: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    textoTarefa: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    tarefaConcluida: {
        textDecorationLine: "line-through",
        color: "#aaa",
    },
    tarefaConcluidaContainer: {
        backgroundColor: "#e6f7ff",
    },
    botaoConcluir: {
        backgroundColor: "#0987EE",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    navigateButton: {
        backgroundColor: "#00B5E2",
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    navigateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
