import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button, Picker } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Card from '~components/Card';
import CustomTextInput from '~components/CustomTextInput.js'
import CustomPicker from '~components/CustomPicker.js'
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
        <CustomPicker icon="palette"/>
        <CustomTextInput
          icon="monetization-on"
          placeholder="Prix"
          keyboardType="numeric"
        />
        <CustomTextInput
          icon="unarchive"
          placeholder="Stock"
          keyboardType="numeric"
        />
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
