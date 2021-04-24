import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import colors from "../styles/colors"

export function PlantSelect(){
    return(
        <View style={styles.container}>
            <Header/>
            <Text>Selecionar Planta</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
})