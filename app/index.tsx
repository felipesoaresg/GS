import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { autenticar } from "../api/user";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function IndexScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const usuario = await autenticar(data.email, data.senha);

      if (usuario) {
        router.push({ pathname: "/home", params: { id: usuario.idusuario } });
      } else {
        Alert.alert("Erro", "Email ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      Alert.alert("Erro", "Não foi possível conectar à API");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELLWORK</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#A7C7E7" />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#A7C7E7" />
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#666"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.testInfo}>
        Para fins de teste, entre com as seguintes credenciais:{"\n"}
        E-mail: felipe@empresa.com{"\n"}
        Senha: Teste123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    backgroundColor: "#B5EAD7",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  testInfo: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
