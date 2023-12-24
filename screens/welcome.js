import { View,StyleSheet } from "react-native";
import GoogleButton from "../components/google.button";
export default function WelcomeScreen(){
    return(
        <View style={styles.container}>
            <GoogleButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f3e2df",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})