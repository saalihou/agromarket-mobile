import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import colors from '~theme/colors';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.authContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = {
  authContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: 20,
    height: 350,
    width: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    width: 300,
    height: 50,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: 'white'
  }
};
