import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Image,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import validate from 'validate.js';
import set from 'lodash/set';

import PropTypes from 'prop-types';

import CustomTextInput from './CustomTextInput';
import CustomPicker from './CustomPicker';
import Card from './Card';

import colors from '../theme/colors';

export type FormSectionProps = {
  validator?: object,
  onSubmit: (values: object) => undefined,
  loading?: boolean,
  submitLabel?: string,
  style?: object,
  inputs: Array<object>
};

export default class FormSection extends Component {
  props: FormSectionProps;

  /** @private */
  state = {
    values: {}
  };

  static defaultProps = {
    onSubmit: () => undefined
  };

  /** @private */
  makeChangeHandler(key) {
    return val => {
      const { values } = this.state;
      set(values, key, val);
      this.setState({ values });
    };
  }

  /** @private */
  submit() {
    const { validator } = this.props;
    const { values } = this.state;
    if (validator) {
      const errors = validate(values, validator, {
        format: 'flat'
      });
      if (errors) {
        Alert.alert(`Erreur`, errors[0]);
        return;
      }
    }
    this.props.onSubmit(values);
  }

  /** @private */
  renderTextInput(input) {
    return (
      <CustomTextInput
        {...input}
        onChangeText={this.makeChangeHandler(input.key)}
        key={input.key}
      />
    );
  }

  /** @private */
  renderPicker(input) {
    return (
      <CustomPicker
        {...input}
        selectedValue={this.state.values[input.key]}
        onValueChange={this.makeChangeHandler(input.key)}
        key={input.key}
      />
    );
  }

  /** @private */
  renderInput(input) {
    if (input.type === 'picker') {
      return this.renderPicker(input);
    } else {
      return this.renderTextInput(input);
    }
  }

  /** @private */
  render() {
    const { inputs, style, submitLabel, loading } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={{ paddingBottom: 40 }}>
          {inputs.map(this.renderInput.bind(this))}
        </View>
        <Button
          title={submitLabel || 'Suivant'}
          color={colors.PRIMARY}
          onPress={this.submit.bind(this)}
          disabled={loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
