import React, { useEffect, useState } from "react";
import {
    View,
    Alert,
    StyleSheet,
    Text,
    ScrollView,
    Platform,
    TouchableOpacity,
    Image
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import {SvgFromUri} from "react-native-svg"
import  waterdrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation, useRoute} from "@react-navigation/core";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker"
import { format, isBefore } from "date-fns";
import { loadPlant, PlantProps, savePlant } from "../libs/storage";

interface Params{
    plant: PlantProps
}
export function PlantSave(){
    const[selectedDateTime,setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const navigation = useNavigation();

    const route = useRoute();
    const {plant} = route.params as Params;

    function handleChangeTimes(event: Event, dateTime: Date | undefined){
        if(Platform.OS === "android"){
            setShowDatePicker((oldState) => !oldState)
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha um horario no futuro 😅")
        }
        if(dateTime){
            setSelectedDateTime(dateTime);
        }

    }


    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState)
    }
    async function handleSave(){
        
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate("Confirmation", {
                title: "Tudo Certo",
                subtitle: "Fique tranquilo que sempre lembraremos voce de cuidar das suas plantinhas com muito cuidado",
                buttonTitle: "Muito Obrigado ",
                icon: "hug",
                nextScreen: "MyPlants"
            })
            
        } catch(error) {
            Alert.alert('Não foi possível salvar 😢')
        }
    }
    return(
        <View style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri 
            uri={plant.photo}
            height={150}
            width={150}/>
            <Text style={styles.plantName}>
                {plant.name}
            </Text>
            <Text style={styles.plantAbout}>
                {plant.about}
            </Text>
        </View>
        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image 
                source={waterdrop}
                style={styles.tipImage}/>
                <Text style={styles.tipText}>
                    {plant.water_tips}
                </Text>
            </View>
            <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado
            </Text>
            {
                showDatePicker && (
                    <DateTimePicker value={selectedDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleChangeTimes}/>
                )
            }
            {
                Platform.OS === "android" && (
                    <TouchableOpacity
                    onPress={handleOpenDateTimePickerForAndroid}>
                        <Text style={styles.dateTimepickerText}> 
                            {`Mudar Horário ${format(selectedDateTime, "HH:mm")}`}
                        </Text>
                    </TouchableOpacity>
                    
                )
            }
            <Button
            title="Cadastrar"
            onPress={handleSave}/>
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.shape
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    tipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: "relative",
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.blue,
        textAlign: "justify"
    },
    alertLabel: {
        textAlign: "center",
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimepickerText: {
        color: colors.heading,
        fontSize: 24,
        paddingVertical: fonts.text
    },
    dateTimepickerButton: {
        width: "100%",
        alignItems: "center",
        paddingVertical: 40
    }
})