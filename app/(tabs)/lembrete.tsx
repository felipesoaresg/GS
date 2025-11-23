import { atualizarLembrete, criarLembrete, excluirLembrete, listarLembretesPorUsuario } from "@/api/lembrete";
import BackButton from "@/components/backButton";
import Category from "@/components/Category";
import { Lembrete } from "@/types/lembrete";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LembretesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [tipo, setTipo] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [idlembreteEditando, setIdlembreteEditando] = useState<number | null>(null);

  useEffect(() => {
    const fetchLembretes = async () => {
      try {
        const data = await listarLembretesPorUsuario(Number(id));
        setLembretes(data);
      } catch (error) {
        console.error("Erro ao buscar lembretes:", error);
      }
    };
    if (id) fetchLembretes();
  }, [id]);

  const handleCriarLembrete = async () => {
    if (!tipo.trim() || !frequencia.trim()) return;
    try {
      await criarLembrete({
        idusuario: Number(id),
        tipo_lembrete: tipo,
        frequencia: Number(frequencia),
        ativo: "S",
      });
      const data = await listarLembretesPorUsuario(Number(id));
      setLembretes(data);
      setTipo("");
      setFrequencia("");
    } catch (error) {
      console.error("Erro ao criar lembrete:", error);
    }
  };

  const handleAtualizarLembrete = async () => {
    if (!tipo.trim() || !frequencia.trim() || idlembreteEditando === null) return;
    try {
      await atualizarLembrete(idlembreteEditando, {
        idusuario: Number(id),
        tipo_lembrete: tipo,
        frequencia: Number(frequencia),
        ativo: "S",
      });
      const data = await listarLembretesPorUsuario(Number(id));
      setLembretes(data);
      setTipo("");
      setFrequencia("");
      setIdlembreteEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar lembrete:", error);
    }
  };

  const handleExcluirLembrete = async (idlembrete: number) => {
    try {
      await excluirLembrete(idlembrete);
      setLembretes((prev) => prev.filter((l) => l.idlembrete !== idlembrete));
    } catch (error) {
      console.error("Erro ao excluir lembrete:", error);
    }
  };

  const iniciarEdicao = (lembrete: Lembrete) => {
    setTipo(lembrete.tipo_lembrete);
    setFrequencia(lembrete.frequencia.toString());
    setIdlembreteEditando(lembrete.idlembrete);
  };

  return (
    <>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Meus Lembretes</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Tipo do lembrete"
            value={tipo}
            onChangeText={setTipo}
          />
          <TextInput
            style={styles.input}
            placeholder="Frequência (em dias)"
            keyboardType="numeric"
            value={frequencia}
            onChangeText={setFrequencia}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={idlembreteEditando === null ? handleCriarLembrete : handleAtualizarLembrete}
          >
            <Text style={styles.buttonText}>
              {idlembreteEditando === null ? "Criar Lembrete" : "Atualizar Lembrete"}
            </Text>
          </TouchableOpacity>
        </View>

        {lembretes.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum lembrete encontrado</Text>
        ) : (
          <FlatList
            data={lembretes}
            keyExtractor={(item) => item.idlembrete.toString()}
            renderItem={({ item }) => (
              <View style={styles.lembreteItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lembreteTitulo}>{item.tipo_lembrete}</Text>
                  <Text style={styles.lembreteDescricao}>
                    Frequência: {item.frequencia} dias
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => iniciarEdicao(item)} style={{ marginRight: 10 }}>
                    <Ionicons name="create-outline" size={24} color="#2980B9" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleExcluirLembrete(item.idlembrete)}>
                    <Ionicons name="trash-outline" size={24} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
        <Category />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },

  form: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    backgroundColor: "#B5EAD7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  lembreteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A7C7E7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  lembreteTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  lembreteDescricao: {
    fontSize: 14,
    color: "#333",
  },

  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});
