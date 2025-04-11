import React, { useState, useEffect } from "react";
import {
  StyleSheet, Text, View, ScrollView, TextInput, Button,
  TouchableOpacity, Linking,
} from "react-native";
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen({ navigation }) {
  const [lista, setLista] = useState([]);
  const [tarefa, setTarefa] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  console.log(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  
  const adicionarTarefa = async () => {
    if (tarefa.trim() !== "") {
      const idNotificacao = await agendarNotificacao(tarefa, dataSelecionada);
      
      const novaTarefa = {
        id: Date.now(),
        nome: tarefa,
        concluida: false,
        data: dataSelecionada,
        idNotificacao
      };
      
      setLista([...lista, novaTarefa]);
      setTarefa("");
      setDataSelecionada(new Date());
    }
  };
  
  const alternarConcluido = (id) => {
    setLista(lista.map(item =>
      item.id === id ? { ...item, concluida: !item.concluida } : item
    ));
  };
  
  const agendarNotificacao = async (tarefaNome, data) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de Tarefa",
        body: `Não se esqueça de: "${tarefaNome}"`,
        sound: true,
      },
      trigger: {
        date: data,
      },
    });
    
    return notificationId;
  };
  
  const onChangeData = (event, selectedDate) => {
    setMostrarPicker(false);
    // return;
    
    const currentDate = selectedDate || dataSelecionada;
    setMostrarPicker(false);
    setDataSelecionada(currentDate);
  };
  
  
  
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Você precisa permitir notificações para receber lembretes.');
      }
    };
    pedirPermissao();
  }, []);
  
  return (
    <ScrollView style={styles.container}>
    <Text
    style={styles.title}
    onPress={() => {
      Linking.openURL('https://github.com/Marcos-Winicius/todo-list-react')
    }}
    >
    Lista de Tarefas
    </Text>
    
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
    
    {/* Seletor de data */}
    <View style={{ marginBottom: 15 }}>
    <Button title="Selecionar data da tarefa" onPress={() => setMostrarPicker(true)} />
    <Text style={{ marginTop: 10 }}>Data selecionada: {dataSelecionada.toLocaleString()}</Text>
    {console.log(dataSelecionada.toLocaleString())}
    {mostrarPicker && (
      <DateTimePicker
      value={dataSelecionada}
      mode="datetime"
      display="default"
      onChange={(event, selectedDate)=>{
        console.log(selectedDate)
        setMostrarPicker(false);
        if(selectedDate){
          setDataSelecionada(selectedDate);
        }
      }}
      />
    )}
    </View>
    
    {/* Lista de tarefas */}
    <View style={styles.lista}>
    {lista.map((item) => (
      <View key={item.id} style={styles.tarefa}>
      <View>
      <Text style={[styles.textoTarefa, item.concluida && styles.tarefaConcluida]}>
      {item.nome}
      </Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>
      Lembrete: {new Date(item.data).toLocaleString()}
      </Text>
      </View>
      <TouchableOpacity onPress={() => alternarConcluido(item.id)} style={styles.botaoConcluir}>
      <Text style={styles.textoBotaoAcao}>
      {item.concluida ? "Desfazer" : "Concluir"}
      </Text>
      </TouchableOpacity>
      </View>
    ))}
    </View>
    
    {/* Botão de navegação */}
    <TouchableOpacity onPress={() => {
      navigation.navigate('About', { userName: tarefa })
    }}>
    <Text style={{ marginTop: 30, textAlign: 'center', color: '#0987EE' }}>
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
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textoBotaoAcao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
