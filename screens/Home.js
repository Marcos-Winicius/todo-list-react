import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Button, TouchableOpacity, Linking } from "react-native";

export default function HomeScreen({navigation}) {
    const [lista, setLista] = useState([]); // Estado da lista de tarefas
    const [tarefa, setTarefa] = useState(""); // Estado do campo de entrada

    // Função para adicionar tarefa
    const adicionarTarefa = () => {
        if (tarefa.trim() !== "") {
            setLista([...lista, { id: Date.now(), nome: tarefa, concluida: false }]); // Adiciona nova tarefa
            setTarefa(""); // Limpa o campo após adicionar
        }
    };

    // Função para alternar o status da tarefa (concluir/desfazer)
    const alternarConcluido = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, concluida: !item.concluida } : item
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}
            onPress={()=>{
                Linking.openURL('https://github.com/Marcos-Winicius/todo-list-react')
            }}
            >Lista de Tarefas</Text>

            {/* Campo de entrada e botão */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a tarefa"
                    value={tarefa}
                    onChangeText={setTarefa}
                />
                <Button title="Adicionar" onPress={adicionarTarefa} />
            </View>

            {/* Lista de tarefas */}
            <View style={styles.lista}>
                {lista.map((item) => (
                    <View key={item.id} style={styles.tarefa}>
                        <Text style={[styles.textoTarefa, item.concluida && styles.tarefaConcluida]}>
                            {item.nome}
                        </Text>
                        <TouchableOpacity onPress={() => alternarConcluido(item.id)} style={styles.botaoConcluir}>
                            <Text style={styles.textoBotao}>{item.concluida ? "Desfazer" : "Concluir"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('About', {userName: tarefa})
            }}>
                <Text>
                    Ir para tela 2?
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    lista: {
        marginTop: 10,
    },
    tarefa: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    textoTarefa: {
        fontSize: 16,
    },
    tarefaConcluida: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    botaoConcluir: {
        backgroundColor: "#0987EE",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textoBotao: {
        color: "#fff",
        fontWeight: "bold",
    },
});
