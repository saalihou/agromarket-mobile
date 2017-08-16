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
import Home from '~screens/Home';

export default class AgroMarket extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Home />
      </View>
    );
  }
}

AppRegistry.registerComponent('AgroMarket', () => AgroMarket);
