import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PomodoroScreen() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            clearInterval(timer);

            if (isBreak) {
              setIsBreak(false);
              setTime(25 * 60);
            } else {
              setIsBreak(true);
              setTime(5 * 60);
            }

            setIsRunning(false);
            return prev - 1;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsBreak(false);
    setTime(25 * 60);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isBreak ? "Hora da Pausa" : "Hora de Foco"}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (isRunning ? setIsRunning(false) : handleStart())}
      >
        <Ionicons name={isRunning ? "pause-outline" : "play-outline"} size={24} color="#111827" />
        <Text style={styles.buttonText}>{isRunning ? "Pausar" : "Iniciar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
        <Ionicons name="refresh-outline" size={24} color="#111827" />
        <Text style={styles.buttonText}>Resetar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },

  timer: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#A7C7E7",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B5EAD7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },

  resetButton: {
    backgroundColor: "#FFB7B2",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },
});
