import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';

export default class PersoInfosForm extends Component {
    handleNext() {
        this.props.onSubmit({});
    }
	render() {
		return (
			<Card title="Informations Personnelles">
                <TextInput
                    placeholder="Nom"
                />
                <TextInput
                    placeholder="Prénom(s)"
                />
                <TextInput
                    keyboardType='phone-pad'
                    placeholder="Autres numéros 1"
                />
                <TextInput
                    keyboardType='phone-pad'
                    placeholder="Autres numéros 2"
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