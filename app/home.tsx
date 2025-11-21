import { Usuario } from "@/types/usuario";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../api/api";

export default function Home() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Busca todos os usuários
        const response = await api.get<Usuario[]>("/usuarios");
        const usuarios = response.data;

        // Filtra pelo id recebido
        const usuarioEncontrado = usuarios.find((u) => u.IDUSUARIO === Number(id));
        setUsuario(usuarioEncontrado || null);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text>Carregando usuário...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Não foi possível carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com ícone e boas-vindas */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={40} color="#4A90E2" />
        <Text style={styles.welcome}>Olá, {usuario.NOME_USUARIO}</Text>
      </View>

      {/* Botão de Lembretes */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Ionicons name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Ver Lembretes</Text>
      </TouchableOpacity>

      {/* Botão de Tarefas */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Ionicons name="list-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Ver Tarefas</Text>
      </TouchableOpacity>

      {/* Botão de Alerta de Crise */}
      <TouchableOpacity style={styles.alertButton} onPress={() => router.push("/")}>
        <Ionicons name="alert-circle-outline" size={24} color="#fff" />
        <Text style={styles.alertText}>Alerta de Crise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FDFDFD" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  welcome: { fontSize: 22, fontWeight: "bold", marginLeft: 10, color: "#111827" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  alertButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E74C3C",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 40,
    justifyContent: "center",
  },
  alertText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 8 },
  error: { color: "red", fontSize: 16, textAlign: "center" },
});
