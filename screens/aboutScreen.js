import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function SobreScreen() {
    const route = useRoute(); // ✅ Agora dentro do componente
    const { userName } = route.params || {}; // Pega o parâmetro enviado
    const navigation = useNavigation()
    
    return (
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Sobre o Aplicativo</Text>
        
        <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido para ajudar você a organizar suas tarefas de forma eficiente e prática.
        </Text>
        
        <Text style={styles.subTitle}>Usuário:</Text>
        <Text style={styles.text}>{userName || "Nenhum nome informado"}</Text>
        
        <Text style={styles.subTitle}>Funcionalidades:</Text>
        <Text style={styles.item}>✅ Adicionar novas tarefas</Text>
        <Text style={styles.item}>✅ Marcar tarefas como concluídas</Text>
        <Text style={styles.item}>✅ Remover tarefas</Text>
        <Text style={styles.item}>✅ Interface simples e intuitiva</Text>
        
        <Text style={styles.subTitle}>Versão:</Text>
        <Text style={styles.text}>1.0.0</Text>
        
        <Text style={styles.subTitle}>Desenvolvido por:</Text>
        <Text style={styles.text}>
        ChatG...  
        <Button title="Marcos-Winicius" onPress={() => Linking.openURL('https://github.com/Marcos-Winicius')} />
        <Button title="Voltar" onPress={() => {navigation.goBack()}} />
        </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    paragraph: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    item: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});
