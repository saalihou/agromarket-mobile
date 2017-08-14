import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

export default class SubscribePage extends Component {
    handleNext() {
        this.props.onSubmit({});
    }

	render() {
		return (
			<View style={styles.authContainer}>
                <View style={styles.header}>
                    <Text>Informations d'authentification</Text>
                </View>
                <View style={styles.card}>
                    <TextInput
                        keyboardType='phone-pad'
                        placeholder="Numéro de téléphone principal"
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Confirmation du mot de passe"
                    />
                    <Button 
                        title="Suivant"
                        color="tomato"
                        onPress={this.handleNext.bind(this)}
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