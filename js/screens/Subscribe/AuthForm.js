import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import CustomTextInput from '~components/CustomTextInput.js';

import Card from '~components/Card';

import colors from '~theme/colors';

export default class AuthForm extends Component {
  state = {
    values: {}
  };

  makeChangeHandler(key) {
      return val => {
      const { values } = this.state;
      values[key] = val;
      this.setState({ values });
      };
  }

  handleNext() {
    this.props.onSubmit(this.state.values);
  }

  render() {
    return (
      <View>
        <View style={{paddingBottom: 40}}>
          <CustomTextInput
            placeholder="Téléphone"
            icon="smartphone"
            keyboardType="phone-pad"
            onChangeText={this.makeChangeHandler('phoneNumber')}
          />
          <CustomTextInput
            secureTextEntry={true}
            placeholder="Mot de passe"
            icon="lock"
            onChangeText={this.makeChangeHandler('password')}
          />
            <CustomTextInput
              secureTextEntry={true}
              placeholder="Confirmation"
              icon="lock"
              onChangeText={this.makeChangeHandler('passwordConfirmation')}
            />
        </View>
          <Button
            title="Suivant"
            color={colors.PRIMARY}
            onPress={this.handleNext.bind(this)}
            disabled={this.props.loading}
          />
      </View>
    );
  }
}
