import { atualizarTarefa, criarTarefa, excluirTarefa, listarTarefasPorUsuario } from "@/api/tarefas";
import BackButton from "@/components/backButton";
import Category from "@/components/Category";
import { Tarefa } from "@/types/tarefas";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TarefasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState<"pendente" | "concluida">("pendente");
  const [idtarefaEditando, setIdtarefaEditando] = useState<number | null>(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const data = await listarTarefasPorUsuario(Number(id));
        setTarefas(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    if (id) fetchTarefas();
  }, [id]);

  const handleCriarTarefa = async () => {
    if (!titulo.trim()) return;
    try {
      await criarTarefa({
        idusuario: Number(id),
        titulo_tarefa: titulo,
        descricao_tarefa: descricao,
        status_tarefa: status,
      });
      const data = await listarTarefasPorUsuario(Number(id));
      setTarefas(data);
      setTitulo("");
      setDescricao("");
      setStatus("pendente");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleAtualizarTarefa = async () => {
    if (!titulo.trim() || idtarefaEditando === null) return;
    try {
      await atualizarTarefa(idtarefaEditando, {
        idusuario: Number(id),
        titulo_tarefa: titulo,
        descricao_tarefa: descricao,
        status_tarefa: status,
      });
      const data = await listarTarefasPorUsuario(Number(id));
      setTarefas(data);
      setTitulo("");
      setDescricao("");
      setStatus("pendente");
      setIdtarefaEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleExcluirTarefa = async (idtarefa: number) => {
    try {
      await excluirTarefa(idtarefa);
      setTarefas((prev) => prev.filter((t) => t.idtarefa !== idtarefa));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const iniciarEdicao = (tarefa: Tarefa) => {
    setTitulo(tarefa.titulo_tarefa);
    setDescricao(tarefa.descricao_tarefa);
    setStatus(tarefa.status_tarefa);
    setIdtarefaEditando(tarefa.idtarefa);
  };

  return (
    <>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.title}>Minhas Tarefas</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Título da tarefa"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição da tarefa"
            value={descricao}
            onChangeText={setDescricao}
          />

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            {["pendente", "concluida"].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusButton,
                  status === s && { backgroundColor: "#B5EAD7" }
                ]}
                onPress={() => setStatus(s as any)}
              >
                <Text style={{ color: "#111827" }}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={idtarefaEditando === null ? handleCriarTarefa : handleAtualizarTarefa}
          >
            <Text style={styles.buttonText}>
              {idtarefaEditando === null ? "Criar Tarefa" : "Atualizar Tarefa"}
            </Text>
          </TouchableOpacity>
        </View>

        {tarefas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
        ) : (
          <FlatList
            data={tarefas}
            keyExtractor={(item) => item.idtarefa.toString()}
            renderItem={({ item }) => (
              <View style={styles.tarefaItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tarefaTitulo}>{item.titulo_tarefa}</Text>
                  <Text style={styles.tarefaDescricao}>{item.descricao_tarefa}</Text>
                  <Text style={styles.tarefaStatus}>Status: {item.status_tarefa}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => iniciarEdicao(item)} style={{ marginRight: 10 }}>
                    <Ionicons name="create-outline" size={24} color="#2980B9" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleExcluirTarefa(item.idtarefa)}>
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    backgroundColor: "#B5EAD7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  tarefaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#A7C7E7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  tarefaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },

  tarefaDescricao: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },

  tarefaStatus: {
    fontSize: 12,
    color: "#555",
  },

  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },

  statusButton: {
    backgroundColor: "#EAEAEA",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

