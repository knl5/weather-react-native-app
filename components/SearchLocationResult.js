import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

import FutureForecast from './FutureForecast'



const CurrentWeather = () => {



        return(
            <View style={styles.currentTempContainer}>

                <View  style={styles.otherContainer}>
                    <Text  style={styles.temp}>Day - {temp}&#176;C</Text>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: '#363537',
        opacity: 0.9,
        padding:30
    },
    image: {
        width: 120,
        height: 120
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#F1E8B8',
        borderWidth:1,
        padding: 15
    },
    day: {
        fontSize: 20,
        color:"#F1E8B8",
        backgroundColor: "#363537",
        padding: 10,
        textAlign:"center",
        borderRadius: 30,
        fontWeight: "300",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color:"#F1E8B8",
        fontWeight:"300",
        textAlign:"center"
    },
    otherContainer: {
        paddingRight: 30
    }
})

export default CurrentWeather