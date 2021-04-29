import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage"

export function UserIdentification(){
    const navigation = useNavigation()
    const [isFocused ,setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false);
    const [name,setName] = useState<string>();
    
    async function handleSubmit(){
        if(!name){
            return Alert.alert("Me diz como voce se chama 🥲")
        }

        try{
        await AsyncStorage.setItem("@plantmanager:user", name);
        navigation.navigate("Confirmation", {
            title: "Prontinho",
            subtitle: "Agora vamos começar a cuidar das suas plantinhas",
            buttonTitle: "Começar",
            icon: "smile",
            nextScreen: "PlantSelect"
        })

        }catch(error){
            Alert.alert("Erro ao salvar o seu nome 🥲")
        }

        
    }
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name)
    };
    function handleInputFocus(){
        setIsFocused(true)
    };

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }
    return(
        <SafeAreaView style={styles.container}>
            
            <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.content}>
                    <View style={styles.form}>
                    <Text style={styles.emoji}>
                            {isFilled ? "😄" : "😃"}
                    </Text>
                        <Text style={styles.title}>Como podemos {"\n"}
                        chamar voce?</Text>
                        
                        <TextInput 
                        style={[styles.input,
                            (isFocused || isFilled ) && {borderColor: colors.green} ]}
                        placeholder="Digite um nome"
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChangeText={handleInputChange}/>
                        <View style={styles.footer}>
                            <Button 
                            title="Confirmar"
                            onPress={handleSubmit}/>
                        </View>
                        
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        flex: 1,
        width: "100%"
    },
    form: {
        flex: 1,
        paddingHorizontal: 54,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign:"center"
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: "100%"
    }
})