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
import { observer } from 'mobx-react';

import GenInfos from './GenInfos.js';
import TypePrice from './TypePrice.js';
import AddressForm from './AddressForm.js';

import authStore from '~stores/auth';
import Card from '~components/Card';

@observer
export default class SubscribeScreen extends Component {
  state = {
    activePage: 0
  };

  gotoPage(page) {
    this.refs.viewPager.setPage(page);
  }

  onPageSelected({position}) {
    this.setState({ activePage: position })
  }

  render() {
    const { activePage } = this.state;
    return (
      <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 50, paddingBottom: 50 }}>
        <Image
          source={require('~assets/images/fruits.png')}
          style={styles.backgroundImage}
        />
        <Card animation={require('~assets/animations/pink_drink_machine.json')}>
          <IndicatorViewPager
            style={styles.viewPager}
            scrollEnabled={true}
            onPageSelected={this.onPageSelected.bind(this)}
            ref="viewPager"
          >
            <View>
              <GenInfos
                loading={authStore.loading}
                active={activePage === 0}
              />
            </View>
            <View>
              <TypePrice
                loading={authStore.loading}
                active={activePage === 1}
              />
            </View>
            <View>
              <AddressForm
                loading={authStore.loading}
                active={activePage === 3}
              />
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
