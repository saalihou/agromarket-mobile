import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  BackAndroid,
  StyleSheet
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import GenInfos from './GenInfos.js';
import TypePrice from './TypePrice.js';
import AddressForm from './AddressForm.js';

import Card from '~components/Card';

import screen from '~hoc/screen';

class ProductFormScreen extends Component {
  state = {};

  gotoPage(page) {
    this.refs.viewPager.setPage(page);
  }

  async componentWillMount() {
    const { navigator } = this.props;
    navigator.setTitle({
      title: 'Publier un produit'
    });
  }

  render() {
    const { activePage } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 50,
          paddingBottom: 50
        }}
      >
        <Image
          source={require('~assets/images/fruits.png')}
          style={styles.backgroundImage}
        />
        <Card animation={require('~assets/animations/pink_drink_machine.json')}>
          <IndicatorViewPager
            style={styles.viewPager}
            scrollEnabled={true}
            ref="viewPager"
          >
            <View>
              <GenInfos />
            </View>
            <View>
              <TypePrice />
            </View>
            <View>
              <AddressForm />
            </View>
          </IndicatorViewPager>
        </Card>
      </View>
    );
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  viewPager: {
    flex: 1,
    zIndex: 2
  }
});

export default screen(ProductFormScreen, { buffer: true });
