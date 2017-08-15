import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';

export default class AuthForm extends Component {
    handleNext() {
        this.props.onSubmit({});
    }

	render() {
		return (
			<Card title="Informations d'authentification">
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
            </Card>
		);
	}
}