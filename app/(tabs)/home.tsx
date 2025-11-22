import Category from "@/components/Category";
import { Lembrete } from "@/types/lembrete";
import { Usuario } from "@/types/usuario";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../api/api";

export default function HomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [lembrete, setLembrete] = useState<Lembrete | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [gestor, setGestor] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get<Usuario[]>("/usuarios");
        const usuarios = response.data;
        const usuarioEncontrado = usuarios.find((u) => u.idusuario === Number(id));
        setUsuario(usuarioEncontrado || null);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    const fetchLembrete = async () => {
      try {
        const response = await api.get<Lembrete[]>("/lembretes");
        const lembretes = response.data;
        const lembreteEncontrado = lembretes.find((l) => l.idusuario === Number(id));
        setLembrete(lembreteEncontrado || null);
      } catch (error) {
        console.error("Erro ao buscar lembrete:", error);
      }
    };

    const fetchGestor = async () => {
      try {
        const response = await api.get<Usuario[]>("/usuarios");
        const usuarios = response.data;
        const gestorEncontrado = usuarios.find((u) => u.idusuario === 3);
        setGestor(gestorEncontrado || null);
      } catch (error) {
        console.error("Erro ao buscar gestor:", error);
      }
    };

    if (id) {
      fetchUsuario();
      fetchLembrete();
      fetchGestor();
    }
  }, [id]);

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Não foi possível carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/user", params: { id: usuario.idusuario } })}
          >
            <Ionicons name="person-circle-outline" size={40} color="#A7C7E7" />
          </TouchableOpacity>
          <Text style={styles.welcome}>Olá, {usuario.nome_usuario}</Text>
        </View>

        <View style={styles.mainContent}>
          {lembrete ? (
            <View style={styles.lembreteContainer}>
              <Text style={styles.lembreteTitulo}>{lembrete.tipo_lembrete}</Text>
              <Text style={styles.lembreteDescricao}>
                Frequência: {lembrete.frequencia} dias
              </Text>

              <TouchableOpacity
                style={styles.verMaisButton}
                onPress={() => router.push({ pathname: "/lembrete", params: { id } })}
              >
                <Text style={styles.verMaisText}>Ver mais Lembretes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyText}>Nenhum lembrete encontrado</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push({ pathname: "/tarefas", params: { id } })}
          >
            <Ionicons name="list-outline" size={20} color="#111827" />
            <Text style={styles.buttonText}>Ver Tarefas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => setShowOverlay(true)}
          >
            <Ionicons name="alert-circle-outline" size={40} color="#111827" />
            <Text style={styles.alertText}>Alerta de Crise</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showOverlay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOverlay(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.overlayBox}>
            <Ionicons name="alert-circle-outline" size={50} color="#FF4C4C" />
            <Text style={styles.overlayTitle}>Aviso Gestor</Text>
            <Text style={styles.overlayText}>
              O gestor {gestor?.nome_usuario ?? "não encontrado"} vai ajudá-lo
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowOverlay(false)}
            >
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Category />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "flex-start",
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#111827",
    textAlign: "left",
  },

  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lembreteContainer: {
    backgroundColor: "#A7C7E7",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },

  lembreteTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  lembreteDescricao: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },

  verMaisButton: {
    backgroundColor: "#B5EAD7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },

  verMaisText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B5EAD7",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
  },

  buttonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  alertButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFB7B2",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 40,
  },

  alertText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
    textAlign: "center",
  },

  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  overlayBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },

  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  overlayText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  closeButton: {
    backgroundColor: "#FFB7B2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
});
