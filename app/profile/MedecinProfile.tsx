import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Medecin } from "../../types/medecin.type";
import { routes } from "../../routes";
import { Link, router } from "expo-router";
import SejourType from "../../types/sejour.type";

export default function MedecinProfile() {
  const [matricule, setMatricule] = useState<Medecin>();
  const [sejours, setSejour] = useState<SejourType[]>();
  const getMedecinProfile = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Token not found!");
    }
    const response = await fetch(`${routes}auth/medecin/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    // console.log("====================================");
    // console.log(response);
    // console.log("====================================");
    const data = await response.json();
    setMatricule(data);
  };

  const hours = new Date().getHours() >= 10 && new Date().getHours() < 18;

  const handleSejourMedecin = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Token not found!");
      }
      const response = await fetch(`${routes}sejour/medecin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setSejour(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMedecinProfile();
    handleSejourMedecin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          {matricule ? (
            <Text style={styles.medecinInfo}>
              Dr {matricule.firstName} {matricule.lastName} -{" "}
              {matricule.specialite}
            </Text>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
      <View style={styles.sejourContainer}>
        <Text style={styles.list}>Liste des séjours</Text>
        <View>
          {!hours && (
            <Text>
              Vous ne pouvez pas prescrire d'avis en dehors des heures de
              travail
            </Text>
          )}
          {hours &&
            sejours?.map((sejour) => (
              <View key={sejour.id} style={styles.sejourItem}>
                <Text>Date d'entrée: {sejour.dateEntree}</Text>
                <Text>Date de sortie: {sejour.dateSortie}</Text>
                <Text>Motif: {sejour.motif}</Text>
                <View style={styles.btnContainer}>
                  {sejour.avis == "" ? (
                    <Link
                      style={styles.link}
                      href={`/profile/avis/${sejour.id}`}
                    >
                      Prescrire un avis
                    </Link>
                  ) : (
                    <Text>Avis déjà prescrit</Text>
                  )}
                </View>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71A3D0",
    padding: 20,
  },
  sejourContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sejourItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sejourText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  medecinInfo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  btnContainer: {
    marginVertical: 13,
  },
  list: {
    fontSize: 20,
    marginBottom: 10,
  },
  link: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});
