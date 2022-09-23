import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import axios from "axios";

import DateTime from './components/DateTime'
import CurrentWeather from './components/SearchLocationResult'
import FutureForecast from './components/FutureForecast'
import CurrentTempEl from './components/WeatherScroll'
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
      const [city,setCity] = useState("");
      const [temp,setTemp] = useState("");
      const [weather,setWeather] = useState("");


      const searchCities = () =>{
                   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&APPID=924077f3e7e3dbbcc18c3cdcacea6bb1`)
                       .then( (response) =>{

                           setCity(response.data.name)
                           setWeather(response.data.weather[0].description)
                           setTemp(response.data.main.temp)

                       })
                       .catch(function (error) {

                           console.log(error);
                       })
                       .then(function () {

                       });
      };


    return (

      <View style={styles.container}>
       <SearchBar searchText={searchText} setSearchText={setSearchText} onSubmit={searchCities}/>
       <ImageBackground source={img} style={styles.image} >
       <View style={styles.currentTempContainer}>
       <Text style={styles.city}>{city}</Text>
       <Text style={styles.temp}>{temp}&#176;C</Text>
       <Text style={styles.conditions}>Current weather conditions : {weather}</Text>
       </View>
       </ImageBackground>
      </View>
    );

  }


  function ResultScreen() {
  const WeatherScroll = ({weatherData}) => {
      return (
          <ScrollView horizontal={true} style={styles.scrollView}>
             <searchCities > {response.data.main} </searchCities>
          </ScrollView>
      )
  }

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
  },
  city: {
          fontSize: 20,
          color:"#F1E8B8",
          backgroundColor: "#3c3c44",
          padding: 10,
          textAlign:"center",
          borderRadius: 60,
          fontWeight: "200",
          marginBottom: 15
      },
  temp: {
       fontSize: 16,
       color:"black",
       fontWeight:"300",
       textAlign:"center"
  },
  conditions: {
          fontSize: 16,
          color:'#363537'
      },
  currentTempContainer: {
          flexDirection: 'column',
          backgroundColor: '#00000033',
          justifyContent:"center",
          alignItems:'center',
          borderRadius: 10,
          borderColor:'#F1E8B8',
          borderWidth:1,
          padding: 15
      },
});