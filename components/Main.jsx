import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  RefreshControl,
} from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContentLoader, { Rect } from "react-content-loader/native";

export function Main() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el loading
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el "refresh"
  const insets = useSafeAreaInsets();

  // Función para obtener los juegos más recientes
  const fetchGames = () => {
    setLoading(true); // Mostrar skeletons mientras se cargan los datos
    getLatestGames().then((games) => {
      setGames(games);
      setLoading(false); // Desactivar skeletons cuando se carguen los datos
    });
  };

  // Ejecutar fetchGames al montar el componente
  useEffect(() => {
    fetchGames();
  }, []);

  // Función para manejar el refresh
  const onRefresh = () => {
    setRefreshing(true); // Activa el estado de refresh
    setLoading(true); // Mostrar skeletons durante el refresh
    getLatestGames().then((games) => {
      setGames(games);
      setRefreshing(false); // Desactiva el refresh una vez cargados los datos
      setLoading(false); // Desactivar skeletons cuando se carguen los datos
    });
  };

  const SkeletonCard = () => (
    <ContentLoader
      speed={1.5}
      width={375}
      height={160}
      backgroundColor="#94a3b8"
      foregroundColor="#444"
    >
      <Rect x="0" y="0" rx="10" ry="10" width="107" height="147" />
      <Rect x="130" y="0" rx="5" ry="5" width="200" height="20" />
      <Rect x="130" y="30" rx="5" ry="5" width="150" height="15" />
      <Rect x="130" y="55" rx="5" ry="5" width="180" height="15" />
      <Rect x="130" y="80" rx="5" ry="5" width="140" height="15" />
    </ContentLoader>
  );

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.card}>
                <SkeletonCard />
              </View>
            ))
          : games.map((game) => (
              <View key={game.slug} style={styles.card}>
                <Image source={{ uri: game.image }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <View style={styles.scoreContainer}>
                    <Text style={styles.score}>{game.score}</Text>
                  </View>
                  <Text style={styles.title}>{game.title}</Text>
                  <Text style={styles.description} numberOfLines={3}>
                    {game.description}
                  </Text>
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
