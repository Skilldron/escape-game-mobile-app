import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export function Main({ navigation }) {
    
    const [date, setDate] = useState(new Date());
    const [rdv, setRdv] = useState([])
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };

    async function getParties() {
        let missions = await fetch(`http://127.0.0.1:1337/api/rdvs?filters[date_debut][$gte]=${date.toISOString()}`);
        let missionsJson = await missions.json();
        
        if (missionsJson.data.length > 0) setRdv(missionsJson.data);
    }

    

    return (
      <View style={styles.container}>
        <Text>Selectionnez une date</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='datetime'
            is24Hour={true}
            onChange={onChange}
          />
          <Button title="Rechercher" onPress={getParties} />

          {rdv.map((rdv, index) => (
            <View key={rdv.id} style={styles.card}>
                <Text style={styles.cardText}>{new Date(rdv.attributes.date_debut).toLocaleString()}</Text>
                <Text style={styles.cardText}>{new Date(rdv.attributes.date_fin).toLocaleString()}</Text>
                <Text style={styles.cardText}>La partie comprend {rdv.attributes.nombre_joueur} joueurs</Text>
                <Text style={styles.cardText}>{rdv.attributes.partie_en_cours ? "Partie en cours" : "Partie non en cours" }</Text>
                <Button title="Voir les détails" onPress={() => navigation.navigate('Details', { itemId: rdv.id })} />
            </View>
        ))}

      </View>
    );
    
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    // Ajoutez d'autres styles de la carte si nécessaire
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    // Ajoutez d'autres styles du texte de la carte si nécessaire
  },
});
