import React from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";
import { color } from "react-native-reanimated";
import { EnviromentButton } from "../components/EnviromentButton";
import { Header } from "../components/Header";
import colors from "../styles/colors"
import fonts from "../styles/fonts";

export function PlantSelect(){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Header/>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}> 
                    voce quer colocar sua planta
                </Text>
            </View>
            <FlatList
            data={[1,2,3,4,5]}
            renderItem={({item}) => (
                <EnviromentButton title="Conzinha" active/>
            )}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    header: {
        paddingHorizontal: 20
    }
})