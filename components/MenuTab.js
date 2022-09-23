import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DateTime from './DateTime'
import App from '../App'
import WeatherScroll from './WeatherScroll'

const img = require('../assets/image.png')

function HomeScreen() {
  return (
    <View>
      <ImageBackground source={img} style={styles.image} >
             <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
             <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MenuTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image:{
    flex:1,
    resizeMode:"cover",
    justifyContent:"center"
  }
});