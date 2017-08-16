import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import CustomTextInput from '~components/CustomTextInput.js';

import Card from '~components/Card';

import colors from '~theme/colors';

export default class AuthForm extends Component {
  render() {
    return (
      <View>
        <View style={{paddingBottom: 40}}>
          <CustomTextInput
            placeholder="Label"
            icon="mode-edit"
          />
          <CustomTextInput
            multiline={true}
            numberOfLines={5}
            placeholder="Description"
            icon="description"
          />
        </View>
          <Button
            title="Suivant"
            color={colors.PRIMARY}
          />
      </View>
    );
  }
}
