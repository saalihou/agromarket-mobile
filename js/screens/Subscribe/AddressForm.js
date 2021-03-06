import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import set from 'lodash/set';

import Card from '../../components/Card';
import CustomTextInput from '../../components/CustomTextInput.js';

import colors from '../../theme/colors';

export default class AddressForm extends Component {
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
      <View>
        <CustomTextInput
          placeholder="Région"
          icon="place"
          onChangeText={this.makeChangeHandler('region')}
        />
        <CustomTextInput
          icon="near-me"
          placeholder="Département"
          onChangeText={this.makeChangeHandler('department')}
        />
        <CustomTextInput
          icon="navigation"
          placeholder="Quartier"
          onChangeText={this.makeChangeHandler('district')}
        />
        <CustomTextInput
          icon="person-pin"
          placeholder="Détails de localisation"
          onChangeText={this.makeChangeHandler('details')}
        />
        <Button
          title="Terminer"
          color={colors.PRIMARY}
          onPress={this.handleNext.bind(this)}
          disabled={this.props.loading}
        />
      </View>
    );
  }
}
