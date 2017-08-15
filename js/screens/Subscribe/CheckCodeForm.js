import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';

export default class CheckCodeForm extends Component {

    handleNext() {
        this.props.onSubmit({});
    }

	render() {
		return (
            <Card title="Vérification">
                <TextInput
                    keyboardType='phone-pad'
                    placeholder="Code de vérification"
                />
                <Button 
                    title="Vérifier"
                    color="tomato"
                    onPress={this.handleNext.bind(this)}
                />
            </Card>
		);
	}
}
