import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Platypi: require("./assets/fonts/Platypi-Regular.ttf"),
  });

  const [selectedCategory, setSelectedCategory] = useState("gym");
  const [bruinFitHours, setBruinFitHours] = useState("");

  // Fetch the data from the backend API
  // const fetchBruinFit = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/facility/bruin-fit');
  //     const data = await response.json();
  //     setBruinFitHours(data); // Store the response in state
  //     console.log(bruinFitHours);
  //   } catch (error) {
  //     // console.error('Error fetching facilities:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchBruinFit();
  // }, []);


  // Hardcoded facility data based on selection
  const facilities = {
    gym: [
      { name: "Bruin Fit", hours: "8:00 AM - 8:00 PM" },
      { name: "John Wooden", hours: "6:00 AM - 10:00 PM" }
    ],
    dining: [
      { name: "De Neve", hours: "9:00 AM - 5:00 PM" },
      { name: "Rendezvous", hours: "11:00 AM - 9:00 PM" }
    ]
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>BruOn Time</Text>
      </View>

      <Text style={styles.date}>June 13, 2022</Text>

      {/* Binary Selection: Gym or Dining Hall */}
      <View style={styles.selectionContainer}>
        <TouchableOpacity 
          style={[styles.selectionButton, selectedCategory === "gym" && styles.selectedButton]}
          onPress={() => setSelectedCategory("gym")}
        >
          <Text style={styles.selectionButtonText}>Gym</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.selectionButton, selectedCategory === "dining" && styles.selectedButton]}
          onPress={() => setSelectedCategory("dining")}
        >
          <Text style={styles.selectionButtonText}>Dining Hall</Text>
        </TouchableOpacity>
      </View>

      {/* Render buttons dynamically based on selection */}
      <View>
        {facilities[selectedCategory].map((facility, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <View style={styles.buttonContent}>
              <Text style={styles.facilityTitle}>{facility.name}</Text>
              <Text style={styles.facilitySubtitle}>{facility.hours}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 75,
    paddingLeft: 20,
    paddingRight: 20,
    width: 350,
  },
  title: {
    marginBottom: 15,
  },
  titleText: {
    color: "black",
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "Platypi",
    textAlign: 'left',
  },
  date: {
    color: "black",
    fontSize: 24,
    fontFamily: "General Sans",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: 'left',
  },
  selectionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: 350, // Ensuring it fills the container
  },
  selectionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5, // Smaller border radius
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: "black",
  },
  selectionButtonText: {
    color: "gray",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 5, // Smaller border radius
    width: 350, // Ensuring it fits the container
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
  },
  buttonContent: {
    alignItems: 'center',
  },
  facilityTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: 'bold',
  },
  facilitySubtitle: {
    color: "black",
    fontSize: 14,
    marginTop: 5,
  },
});
