import React from "react";
import {Text, 
        Image,
        StyleSheet,
        SafeAreaView,
        TouchableOpacity,
        Dimensions,
        View} from "react-native";
import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import {Entypo} from "@expo/vector-icons";
import fonts from "../styles/fonts"
import { useNavigation } from "@react-navigation/native";

export function Welcome(){
    const navigation = useNavigation()
    function handleStart(){
        navigation.navigate("UserIdentification")
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
            <Text style={styles.title}>Gerencie {"\n"} 
            suas plantas de {"\n"} 
            forma fácil</Text>

            <Image source={wateringImg}
            resizeMode = {"contain"}/>
            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar para voce
            </Text>
            
            <TouchableOpacity style={styles.button}
            activeOpacity={0.7}
            onPress={handleStart}>
                    <Entypo name="chevron-thin-right" 
                    style={styles.buttonIcon}/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    wrapper: {
        flex: 1,
        alignItems: `center`,
        justifyContent: "space-around",
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        width: Dimensions.get(`window`).width * 0.7
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    
    
})