import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';

import colors from '~theme/colors';

export default class AuthForm extends Component {
  state = {
    values: {}
  };

  handleNext() {
    this.props.onSubmit(this.state.values);
  }

  makeChangeHandler(key) {
    return val => {
      const { values } = this.state;
      values[key] = val;
      this.setState({ values });
    };
  }

  render() {
    return (
      <Card title="Informations d'authentification">
        <TextInput
          keyboardType="phone-pad"
          placeholder="Numéro de téléphone principal"
          onChangeText={this.makeChangeHandler('phoneNumber')}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Mot de passe"
          onChangeText={this.makeChangeHandler('password')}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Confirmation du mot de passe"
          onChangeText={this.makeChangeHandler('passwordConfirmation')}
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
