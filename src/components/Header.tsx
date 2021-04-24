import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image
} from "react-native";
import colors from "../styles/colors"

export function Header(){
    return(
        <View style = {styles.container}>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: colors.red,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between"
    }
})