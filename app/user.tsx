import api from "@/api/api";
import BackButton from "@/components/backButton";
import { Usuario } from "@/types/usuario";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PerfilScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (id) {
          const response = await api.get<Usuario[]>("/usuarios");
          const user = response.data.find((u) => u.idusuario === Number(id));
          setUsuario(user || null);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleLogout = () => {
    router.replace("/");
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.infoBox}>
          <Ionicons name="person-circle-outline" size={28} color="#111827" />
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{usuario.nome_usuario}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="mail-outline" size={28} color="#111827" />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{usuario.email_usuario}</Text>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="lock-closed-outline" size={28} color="#111827" />
          <Text style={styles.label}>Senha:</Text>
          <Text style={styles.value}>
            {"*".repeat(usuario.senha_usuario.length)}
          </Text>
        </View>

        {usuario.cargo_usuario && (
          <View style={styles.infoBox}>
            <Ionicons name="briefcase-outline" size={28} color="#111827" />
            <Text style={styles.label}>Cargo:</Text>
            <Text style={styles.value}>{usuario.cargo_usuario}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color="#111827" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 30,
    textAlign: "center",
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A7C7E7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 10,
  },

  value: {
    fontSize: 16,
    color: "#333",
    marginLeft: 6,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFB7B2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 30,
    justifyContent: "center",
  },

  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
});
