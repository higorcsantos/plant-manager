import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import {SvgFromUri} from "react-native-svg"
import colors from "../styles/colors";
import {RectButton,RectButtonProps} from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import fonts from "../styles/fonts";

interface PlantProps extends RectButton{
    data: {
        name: string,
        photo: string
    }
}

export const PlantCardPrimary = ({data, ...rest}: PlantProps) => {
    return (
        <RectButton
        style={styles.container}
        {...rest}>
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.text}> 
                {data.name}
             </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "45%",
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        margin: 10
    },
    text: {
        color: colors.green_dark,
        fontFamily: fonts.text,
        marginVertical: 16
    }
})