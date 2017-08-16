import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem.js';
import CustomTextInput from '~components/CustomTextInput.js'

export default class MyList extends React.PureComponent {
  _renderItem = ({item}) => (
    <ProductItem
      id={item.id}
      title={item.title}
      image={item.image}
      description={item.description}
      price={item.price}
      stock={item.stock}
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
        <CustomTextInput icon='search' style={{opacity: 0.6}} />
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