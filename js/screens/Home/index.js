import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { PagerTitleIndicator, IndicatorViewPager } from 'rn-viewpager';
import FAB from 'react-native-fab';
import ProductList from '~screens/Home/components/ProductList.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import colors from '~theme/colors';

const placeholdText =
  'Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit';

const list = [
  {
    id: 1,
    label: 'Test 1',
    price: '1000',
    description: placeholdText,
    stock: 10,
    image: require('~assets/images/mixt.png')
  },
  {
    id: 2,
    label: 'Test 2',
    price: '1000',
    description: placeholdText,
    stock: 10,
    image: require('~assets/images/mixt.png')
  },
  {
    id: 3,
    label: 'Test 3',
    price: '1000',
    description: placeholdText,
    stock: 10,
    image: require('~assets/images/mixt.png')
  },
  {
    id: 4,
    label: 'Test 4',
    price: '1000',
    description: placeholdText,
    stock: 10,
    image: require('~assets/images/mixt.png')
  }
];

export default class HomeScreen extends Component {
  static navigatorStyle = {
    navBarTitleTextCentered: true
  };

  static navigatorButtons = {};

  state = {
    visible: true
  };

  displayFab(icon, id) {
    MaterialIcon.getImageSource(icon, 30, 'white').then(source => {
      this.props.navigator.setButtons({
        fab: {
          collapsedId: id,
          collapsedIcon: source,
          backgroundColor: colors.ACCENT
        }
      });
    });
  }

  removeFab() {
    this.props.navigator.setButtons({
      fab: {}
    });
  }

  componentWillMount() {
    this.props.navigator.setTitle({
      title: 'AgroMarket'
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.displayFab('shopping-cart', 'cart');
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear') {
      this.setState({ visible: true });
    }
  }

  onPageSelected({ position }) {
    if (position === 0) {
      this.displayFab('shopping-cart', 'cart');
    } else if (position === 1) {
      this.displayFab('add', 'add');
    } else {
      this.removeFab();
    }
  }

  onProductOpen(product) {
    this.props.navigator.push({
      screen: 'ProductDetail',
      title: product.label,
      passProps: { product },
      sharedElements: [`productImage${product.id}`]
    });
    setTimeout(() => this.setState({ visible: false }), 350 )
  }

  render() {
    const { visible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          style={[styles.viewPager, { flex: visible ? 1 : 0 }]}
          indicator={this._renderTitleIndicator()}
          onPageSelected={this.onPageSelected.bind(this)}
        >
          <View style={styles.home}>
            <ProductList data={list} onOpen={this.onProductOpen.bind(this)} />
          </View>
          <View style={{ backgroundColor: 'green' }}>
            <Text>page three</Text>
          </View>
          <View style={{ backgroundColor: 'yellow' }}>
            <Text>page three</Text>
          </View>
        </IndicatorViewPager>
      </View>
    );
  }

  _renderTitleIndicator() {
    return (
      <PagerTitleIndicator
        style={styles.indicatorContainer}
        titles={[
          <MaterialIcon color="green" name="home" size={30} />,
          <MaterialIcon color="green" name="list" size={30} />,
          <MaterialIcon color="green" name="person" size={30} />
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 51,
    zIndex: 2
  },
  indicatorContainer: {
    backgroundColor: '#ecf0f1',
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    elevation: 5
  },
  home: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  }
});
