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

import CustomTextInput from '~components/CustomTextInput';
import CustomPicker from '~components/CustomPicker';
import Card from '~components/Card';

import colors from '~theme/colors';

export default class FormSection extends Component {
  state = {
    values: {}
  };

  static defaultProps = {
    onSubmit: () => undefined
  };

  makeChangeHandler(key) {
    return val => {
      const { values } = this.state;
      set(values, key, val);
      this.setState({ values });
    };
  }

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

  renderTextInput(input) {
    return (
      <CustomTextInput
        {...input}
        onChangeText={this.makeChangeHandler(input.key)}
        key={input.key}
      />
    );
  }

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

  renderInput(input) {
    if (input.type === 'picker') {
      return this.renderPicker(input);
    } else {
      return this.renderTextInput(input);
    }
  }

  render() {
    const { inputs } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ paddingBottom: 40 }}>
          {inputs.map(this.renderInput.bind(this))}
        </View>
        <Button
          title="Suivant"
          color={colors.PRIMARY}
          onPress={this.submit.bind(this)}
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
})
