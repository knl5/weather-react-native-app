import {View,TextInput,Text,StyleSheet} from "react-native";
import React from "react";


const SearchBar = (props)=>{
    return(
        <View style={styles.container}>
            <TextInput
                placeholder="Search your city"
                style={styles.input}
                value={props.searchText}
                onChangeText={(city)=>props.setSearchText(city)}
                onSubmitEditing={props.onSubmit}
            />
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container:{
        margin: 10
    },
    input:{
        backgroundColor:"#fff",
        padding: 10,
        borderRadius: 10,
        color: "#000",
        borderWidth: 1
    }
});