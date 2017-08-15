import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import set from 'lodash/set';

import Card from '~components/Card';

import colors from '~theme/colors';

export default class PersoInfosForm extends Component {
  state = {
    values: {}
  };

  handleNext() {
    this.props.onSubmit(this.state.values);
  }

  makeChangeHandler(key) {
    return val => {
      const { values } = this.state;
      set(values, key, val);
      this.setState({ values });
    };
  }

  render() {
    return (
      <Card title="Informations Personnelles">
        <TextInput
          placeholder="Nom"
          onChangeText={this.makeChangeHandler('lastName')}
        />
        <TextInput
          placeholder="Prénom(s)"
          onChangeText={this.makeChangeHandler('firstName')}
        />
        <TextInput
          keyboardType="phone-pad"
          placeholder="Autre numéro 1"
          onChangeText={this.makeChangeHandler('phoneNumbers[0]')}
        />
        <TextInput
          keyboardType="phone-pad"
          placeholder="Autre numéro 2"
          onChangeText={this.makeChangeHandler('phoneNumbers[1]')}
        />
        <Button
          title="Suivant"
          color={colors.PRIMARY}
          onPress={this.handleNext.bind(this)}
          disabled={this.props.loading}
        />
      </Card>
    );
  }
}
