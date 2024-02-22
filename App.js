import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from "./service/AvatarService";

export default function App() {
    let value = Avatar.changeElement({elementType: "HAT", number: 1});
    let animation = Avatar.getAnimation("HELLO");
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>{value}</Text>
            <Text>{animation}</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
