import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem.js';
import CustomTextInput from '~components/CustomTextInput.js'

export default class MyList extends React.PureComponent {
  _renderItem = ({item}) => (
    <ProductItem
      item={item}
      onOpen={this.props.onOpen}
    />
  );

  _keyExtractor = (item, index) => item.id;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {

  }
})