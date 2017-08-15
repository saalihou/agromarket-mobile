import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';

export default class AddressForm extends Component {

    handleNext() {
        this.props.onSubmit({});
    }

	render() {
		return (
            <Card title="Adresse">
                <TextInput
                    placeholder="Région"
                />
                <TextInput
                    placeholder="Département"
                />
                <TextInput
                    placeholder="Adresse"
                />
                <TextInput
                    placeholder="Détails de localisation"
                />
                <Button 
                    title="Terminer"
                    color="tomato"
                    onPress={this.handleNext.bind(this)}
                />
            </Card>
		);
	}
}
