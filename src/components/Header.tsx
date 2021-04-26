import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import colors from "../styles/colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import avatar from "../assets/avatar.jpg";
import fonts from "../styles/fonts";

export function Header(){
    const [userName, setUserName] = useState<string>()
    
    useEffect(() => {
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem("@plantmanager:user");
            setUserName(user || '');
        }
        loadStorageUserName();
    },[userName]);
    return(
        <View style = {styles.container}>
            <View>
                <Text style={styles.greeting}>Olá, </Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={avatar} style={styles.image}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: getStatusBarHeight(),

    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 40
    }
})