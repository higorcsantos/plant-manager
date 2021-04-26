import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,FlatList,ActivityIndicator } from "react-native";
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
    const [loading, setLoading] = useState(true);

    const [page,setPage] = useState(1);
    const [loadingMore,setLoadingMore] = useState(false);

    function handleEnvironmentSelected(environment: string) {
        setEnviromentSelected(environment);

        if (environment == 'all')
            return setFilteredPlants(plants)
            
        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        );        

        setFilteredPlants(filtered)
        
    }

    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);
        if(!data)
            return setLoading(true)
        if(page > 1){
            setPlants(oldValue => [...oldValue,...data])
            setFilteredPlants(oldValue => [...oldValue,...data])
        }
        else{
            setPlants(data)
            setFilteredPlants(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
    }
    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);

        fetchPlants()
        
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
        
        fetchPlants()
    }, [])
    if(loading){
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
            keyExtractor={(item) => item.key}
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
                    keyExtractor={(item) => item.id}
                    data={filteredPlants}
                    renderItem={({item}) => (
                        <PlantCardPrimary key={item.id} data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => 
                        handleFetchMore(distanceFromEnd)
                }
                ListFooterComponent={
                    loadingMore 
                    ?
                    <ActivityIndicator color={colors.green}/>
                    :
                    <></>
                }
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