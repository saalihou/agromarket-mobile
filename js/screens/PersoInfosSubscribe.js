import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

export default class SubscribePage extends Component {
    
	render() {
        const handlePress = () => false
		return (
			<View style={styles.authContainer}>
                <View style={styles.header}>
                    <Text>Informations Personnelles</Text>
                </View>
                <View style={styles.card}>
                    <TextInput
                        placeholder="Nom"
                    />
                    <TextInput
                        placeholder="Prénom(s)"
                    />
                    <TextInput
                        placeholder="Région"
                    />
                    <TextInput
                        placeholder="Département"
                    />
                    <TextInput
                        placeholder="Adresse"
                    />
                    <Button 
                        title="Suivant"
                        color="tomato"
                        onPress={handlePress}
                    />
                </View>
			</View>
		);
	}
}

const styles = {
    authContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        padding: 20,
        height: 350,
        width: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        width: 300,
        height: 50,
        backgroundColor: 'tomato', 
        justifyContent: 'center',
        alignItems: 'center',
    }
}