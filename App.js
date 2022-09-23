import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import axios from "axios";

import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
import SearchBar from './components/SearchLocationWeather'
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const img = require('./assets/image.png')

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("43.7101728", "7.2619532")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground source={img} style={styles.image} >
                <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
                <WeatherScroll weatherData={data.daily}/>
        </ImageBackground>
      </View>
    );
  }

  function SearchScreen() {
  const [searchText,setSearchText] = useState("");
      const [city,setCity] = useState([]);

     const SearchCities = () =>{
         axios.get(`http://api.openweathermap.org/data/2.5/weather?q={searchText}&appid=${API_KEY}`)
             .then( (response) =>{
                 // handle success
                 setCity(response.data.city);
             })
             .catch(function (error) {
                 // handle error
                 console.log(error);
             })
             .then(function () {
                 // always executed
             });
     }
    return (
      <View style={styles.container}>
       <SearchBar searchText={searchText} setSearchText={setSearchText} onSubmit={SearchCities}/>

      </View>
    );
  }

  function ResultScreen() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SearchCities/>
        </View>
      );
    }

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Weather APP - Home" component={HomeScreen} />
              <Tab.Screen name="Weather APP - Search" component={SearchScreen} />
              <Tab.Screen name="Weather APP - Result" component={ResultScreen} />
            </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});