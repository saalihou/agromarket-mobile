import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SharedElementTransition } from 'react-native-navigation';
import ParallaxScrollView from 'react-native-parallax-scrollview';

import colors from '~theme/colors';

import screen from '~hoc/screen';

class ProductDetailScreen extends Component {
  componentWillMount() {}

  render() {
    const { product, sharedElementPrefix } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SharedElementTransition
          sharedElementId={`${sharedElementPrefix ||
            ''}productImage${product.id}`}
          showDuration={350}
          hideDuration={350}
          showInterpolation={{
            type: 'linear',
            easing: 'FastOutSlowIn'
          }}
          hideInterpolation={{
            type: 'linear',
            easing: 'FastOutSlowIn'
          }}
        >
          <Image style={styles.image} source={product.image} />
        </SharedElementTransition>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    resizeMode: 'cover'
  }
});

export default screen(ProductDetailScreen);
