import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, Image, View } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView>
        {games.map((game) => (
          <View key={game.slug} style={styles.card}>
            <Image source={{ uri: game.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{game.score}</Text>
              </View>
              <Text style={styles.title}>{game.title}</Text>
              <Text style={styles.description} numberOfLines={3}>{game.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    width: 375,
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row", // Organiza en fila
    alignItems: "flex-start", // Alinea los elementos al inicio
    
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
    marginRight: 15, // Espacio entre la imagen y el texto
  },
  scoreContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    flex: 1, // Usa el espacio restante
    justifyContent: "flex-start", // Alinea el contenido al inicio
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 5,
  },
});
