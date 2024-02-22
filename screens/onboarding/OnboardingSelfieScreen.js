import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const OnboardingStartScreen = () => {


    return (
        <View style={styles.container}>
            <Text style={styles.processingText}>Processing selfies</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    processingText: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default OnboardingStartScreen;