import React, { useState } from "react";
import { 
  StyleSheet, Text, View, ScrollView, TextInput, 
  TouchableOpacity, Linking, Platform 
} from "react-native";
import { DateTimePicker } from 'expo-date-time-picker';
import * as Notifications from 'expo-notifications';

export default function HomeScreen({ navigation }) {
  const [lista, setLista] = useState([]);
  const [tarefa, setTarefa] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  // Função para formatar data
  const formatarData = (date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const adicionarTarefa = async () => {
    if (tarefa.trim() !== "") {
      const novaTarefa = { 
        id: Date.now(), 
        nome: tarefa, 
        concluida: false,
        data: dataSelecionada
      };
      
      setLista([...lista, novaTarefa]);
      setTarefa("");
      setDataSelecionada(new Date());
      
      // Agendar notificação (implementação abaixo)
      await agendarNotificacao(novaTarefa.nome, novaTarefa.data);
    }
  };

  const agendarNotificacao = async (tarefaNome, data) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de Tarefa",
        body: `Não se esqueça de: "${tarefaNome}"`,
        sound: true,
      },
      trigger: {
        date: data,
      },
    });
  };

  // ... (mantenha as outras funções como alternarConcluido, removerTarefa, etc.)

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Título e Input mantidos iguais */}
      
      {/* Botão para selecionar data/hora */}
      <TouchableOpacity 
        style={styles.dateButton}
        onPress={() => setMostrarDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {formatarData(dataSelecionada)}
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {mostrarDatePicker && (
        <DateTimePicker
          value={dataSelecionada}
          onChange={(event, date) => {
            setMostrarDatePicker(false);
            if (date) {
              setDataSelecionada(date);
            }
          }}
          mode="datetime"
          minimumDate={new Date()}
        />
      )}

      {/* Lista de tarefas com data */}
      <View style={styles.lista}>
        {lista.map((item) => (
          <View key={item.id} style={[styles.tarefa, item.concluida && styles.tarefaConcluidaContainer]}>
            <View style={styles.tarefaContent}>
              <Text style={[styles.textoTarefa, item.concluida && styles.tarefaConcluida]}>
                {item.nome}
              </Text>
              <Text style={styles.dataTarefa}>
                {formatarData(new Date(item.data))}
              </Text>
            </View>
            {/* Botões de ação */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,
    },
    contentContainer: {
        padding: 20,
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
        marginBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    dateButton: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    dateButtonText: {
        fontSize: 16,
        color: "#333",
    },
    addButton: {
        backgroundColor: "#0987EE",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    lista: {
        marginTop: 10,
    },
    tarefa: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    tarefaContent: {
        marginBottom: 10,
    },
    textoTarefa: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 5,
    },
    dataTarefa: {
        fontSize: 14,
        color: "#666",
    },
    tarefaConcluida: {
        textDecorationLine: "line-through",
        color: "#aaa",
    },
    tarefaConcluidaContainer: {
        backgroundColor: "#e6f7ff",
    },
    acoesTarefa: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    botaoAcao: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    botaoEditar: {
        backgroundColor: "#FFC107",
    },
    botaoConcluir: {
        backgroundColor: "#4CAF50",
    },
    botaoRemover: {
        backgroundColor: "#F44336",
    },
    textoBotaoAcao: {
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