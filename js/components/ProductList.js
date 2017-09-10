import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';

import ProductCard from './ProductCard.js';
import CustomTextInput from '~components/CustomTextInput.js';

import colors from '~theme/colors';

export default class ProductList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(ProductCard.propTypes.item),
    onOpen: ProductCard.propTypes.onOpen,
    sharedElementPrefix: ProductCard.propTypes.sharedElementPrefix
  };

  _renderItem = ({ item }) =>
    item === 'spinner' ? (
      <ActivityIndicator
        size="large"
        color={colors.ACCENT}
        style={{ marginTop: 10 }}
      />
    ) : (
      <ProductCard
        sharedElementPrefix={this.props.sharedElementPrefix}
        item={item}
        onOpen={this.props.onOpen}
      />
    );

  _keyExtractor = (item, index) => item.id;

  render() {
    const { data, loading, ...props } = this.props;
    return (
      <View>
        <FlatList
          data={this.props.data.concat(loading ? 'spinner' : [])}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {}
});
