import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import Card from '~components/Card';
import CustomTextInput from '~components/CustomTextInput.js'
import colors from '~theme/colors';

export default class CheckCodeForm extends Component {
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
      <View>
        <CustomTextInput
          icon="lock-open"
          placeholder="Code de vérification"
          onChangeText={this.makeChangeHandler('code')}
        />
        <Button
          title="Vérifier"
          color={colors.PRIMARY}
          onPress={this.handleNext.bind(this)}
          disabled={this.props.loading}
        />
      </View>
    );
  }
}
