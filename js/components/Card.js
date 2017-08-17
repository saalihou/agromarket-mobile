import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Animation from 'lottie-react-native';

import colors from '~theme/colors';

export default class Card extends Component {

  render() {
    const { animation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('~assets/images/logo.png')}
          />
        </View>
        <View style={styles.card}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    padding: 25,
    zIndex: 2
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 130,
    paddingTop: 10
  },
  headerText: {
    color: 'white'
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    resizeMode: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 0
  },
  animation: {
    width: 150,
    height: 150,
    opacity: 0.5
  },
  background: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom:0,
    opacity: 0.8,
    backgroundColor: '#ecf0f1',
    zIndex: -1
  },
  title: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black'
  }
};
