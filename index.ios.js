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
import SubscribeScreen from '~screens/Subscribe';

export default class AgroMarket extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <SubscribeScreen />
      </View>
    );
  }
}

AppRegistry.registerComponent('AgroMarket', () => AgroMarket);
