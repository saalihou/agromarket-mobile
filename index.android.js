/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Welcome from '~screens/Welcome';

export default class AgroMarket extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Welcome />
      </View>
    );
  }
}

AppRegistry.registerComponent('AgroMarket', () => AgroMarket);
