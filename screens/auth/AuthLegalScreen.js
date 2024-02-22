import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AuthLegalScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Legal Information</Text>
            <Button title="Agree" onPress={() => navigation.navigate('AuthLogin')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
    },
});

export default AuthLegalScreen;