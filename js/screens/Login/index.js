import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button, StyleSheet } from 'react-native';

import Card from '~components/Card';

export default class LoginScreen extends Component {
	render() {
        const handlePress = () => false;
		return (
            <Image
                source={require('~assets/images/cocktails.png')}
                style={styles.backgroundImage}
            >
                <Card title="Connexion">
                        
                    <TextInput
                        keyboardType='phone-pad'
                        placeholder="Numéro de téléphone principal"
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Mot de passe"
                    />
                    <Button 
                        title="Se Connecter"
                        color="tomato"
                        onPress={handlePress}
                    />
                    <Text
                        style={{textDecorationLine: "underline"}}
                        onPress={handlePress}
                    >
                        Téléphone ou Mot de passe oublié ?
                    </Text>
                    <Text
                        style={{textDecorationLine: "underline"}}
                        onPress={handlePress}
                    >
                        Pas encore de compte ? S'inscrire
                    </Text>
                </Card>
            </Image>
		);
	}
    
}

const styles = StyleSheet.create({
    backgroundImage: {
		width: '100%',
        height: '100%',
    },
})