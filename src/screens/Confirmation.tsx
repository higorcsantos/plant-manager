import React from "react";
import { 
        StyleSheet, 
        View,
        SafeAreaView,
        Text } from "react-native";
import {Button }from "../components/Button";
import colors from "../styles/colors"
import fonts from "../styles/fonts"

export function Confirmation(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😃
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subTitle}>
                    Vamos começar a cuidar das suas plantinhas com cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button/>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: "center",
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 10,
        color: colors.heading
    },
    emoji: {
        fontSize: 78,
    },
    footer: {
        width: "100%",
        paddingHorizontal: 50,
        marginTop: 15
    }
})