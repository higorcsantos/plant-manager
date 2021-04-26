import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,FlatList } from "react-native";
import { EnviromentButton } from "../components/EnviromentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import api from "../services/api";
import colors from "../styles/colors"
import fonts from "../styles/fonts";
interface EnvironmentProps{
    key: string,
    title: string
};
interface PlantCardProps{
    id: string;
    name: string;
    about: string;
    water_tipes: string;
    photo: string;
    environments:[string];
    frequency: {
        times: number,
        repeat_every: string
    }
}
export function PlantSelect(){
    const [enviroments,setEnviroments] = useState<EnvironmentProps[]>([]);
    const [plants,setPlants] = useState<PlantCardProps[]>([]);
    const [filteredPlants,setFilteredPlants] = useState<PlantCardProps[]>([]);
    const [environmentSelected,setEnviromentSelected] = useState("all");
    const [load, setLoad] = useState(true)

    function handleEnvironmentSelected(environment: string) {
        setEnviromentSelected(environment);

        if (environment == 'all')
            return setFilteredPlants(plants)
            
        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        );        

        setFilteredPlants(filtered)
        
    }

    useEffect(() => {
        async function fetchEnviroment(){
            const {data} = await api.get('plants_environments?_sort=title&order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ])
        };
        

        fetchEnviroment();

    },[]);
    useEffect(() => {
        async function fetchPlants(){
            const {data} = await api.get('plants?_sort=name&order=asc');
            setFilteredPlants(data);
            setLoad(false)
        }
        fetchPlants()
    }, [])
    if(load){
        return <Load/>
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Header/>
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}> 
                    voce quer colocar sua planta?
                </Text>
            </View>
            <View>
            <FlatList
            data={enviroments}
            renderItem={({item}) => (
                <EnviromentButton 
                key={item.key} 
                title={item.title}
                active={item.key === environmentSelected}
                onPress = {() => handleEnvironmentSelected(item.key)}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.enviromentList}/>
            </View>
            
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({item}) => (
                        <PlantCardPrimary key={item.id} data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
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
    },
    enviromentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginHorizontal: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center" 
    },
    contentContainerStyle:{
        justifyContent: "center"
    }
})