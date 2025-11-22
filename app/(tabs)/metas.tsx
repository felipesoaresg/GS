import { excluirMeta, listarMetasPorUsuario } from "@/api/metas";
import BackButton from "@/components/backButton";
import Category from "@/components/Category";
import { Meta } from "@/types/metas";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function MetasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [metas, setMetas] = useState<Meta[]>([]);

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        if (id) {
          const data = await listarMetasPorUsuario(Number(id));
          setMetas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar metas:", error);
      }
    };

    fetchMetas();
  }, [id]);

  const handleExcluir = async (idmeta: number) => {
    try {
      await excluirMeta(idmeta);
      setMetas((prev) => prev.filter((m) => m.idmeta !== idmeta));
    } catch (error) {
      console.error("Erro ao excluir meta:", error);
    }
  };

  return (
    <>
      <BackButton />

      <View style={styles.container}>
        <Text style={styles.title}>Cursos Complementares</Text>

        {metas.length > 0 ? (
          <FlatList
            data={metas}
            keyExtractor={(item) => item.idmeta.toString()}
            renderItem={({ item }) => (
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={24} color="#111827" style={styles.metaIcon} />
                <View style={styles.metaContent}>
                  <Text style={styles.metaTitulo}>{item.titulo_meta}</Text>
                  {item.descricao_meta && (
                    <Text style={styles.metaDescricao}>{item.descricao_meta}</Text>
                  )}
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhum curso complementar encontrado</Text>
        )}
      </View>

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

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#A7C7E7",
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
  },

  metaIcon: {
    marginRight: 12,
    marginTop: 4,
  },

  metaContent: {
    flex: 1,
  },

  metaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  metaDescricao: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});
