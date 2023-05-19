import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [rdvData, setRdvData] = useState(null);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(`http://127.0.0.1:1337/api/rdvs/${itemId}`)
      ).json();

      console.log(data);
      // set state when the data received
      setRdvData(data);
    };

    dataFetch();
  }, []);

  async function launchGame(gameId) {
    const data = JSON.stringify({
      data: {
        partie_en_cours: "true",
      },
    });

    await fetch(`http://127.0.0.1:1337/api/rdvs/${gameId}`, {
      method: "PUT",
      body: data,
    });
  }

  async function stopGame(gameId) {
    const data = JSON.stringify({
      data: {
        partie_en_cours: "true",
      },
    });

    fetch(`http://127.0.0.1:1337/api/rdvs/${gameId}`, {
      method: "PUT",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return (
    <View>
      <Text style={styles.heading}>Détails de la partie</Text>
      {rdvData && (
        <View>
          <Text>Créée le : {rdvData.data.attributes.createdAt}</Text>
          <Text>Date de début : {rdvData.data.attributes.date_debut}</Text>
          <Text>Date de fin : {rdvData.data.attributes.date_fin}</Text>
          <Text>
            Nombre de joueurs : {rdvData.data.attributes.nombre_joueur}
          </Text>
          <Text>
            Partie en cours :{" "}
            {rdvData.data.attributes.partie_en_cours ? "Oui" : "Non"}
          </Text>
          <Text>Publiée le : {rdvData.data.attributes.publishedAt}</Text>
          <Text>
            Dernière mise à jour : {rdvData.data.attributes.updatedAt}
          </Text>
          <Button
            disabled={rdvData.data.attributes.partie_en_cours}
            title="Lancer la partie"
            onPress={launchGame}
          />
          <Button
            title="Arreter la partie"
            onPress={() => stopGame(rdvData.data.id)}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
};

export default DetailsScreen;
