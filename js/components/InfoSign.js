import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import colors from '../theme/colors';

export type InfoSignProps = {
  message: string,
  icon: string,
  onPress: () => undefined
};

class InfoSign extends Component {
  props: InfoSignProps;

  render() {
    const { icon, message, onPress, ...props } = this.props;
    return (
      <View style={styles.container}>
        <Icon name={icon} size={50} />
        <TouchableOpacity onPress={onPress} disabled={!onPress} {...props}>
          <Text style={styles.message}>{message}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  message: {
    fontSize: 30,
    textAlign: 'center'
  }
});

export default InfoSign;
