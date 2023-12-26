import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "../components/signout.button";
export default function MainScreen(){
    return(
        <View style={styles.container}>
            <Text>Herzlich Willkommen</Text>
            <SignOutButton/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
   
})