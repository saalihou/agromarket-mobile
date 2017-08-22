import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SharedElementTransition } from 'react-native-navigation';

export default class ProductItem extends React.PureComponent {
  static defaultProps = {
    onOpen: () => undefined
  };

  render() {
    const { item, onOpen } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onOpen(item)}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.profilePic}
                source={require('~assets/images/mixt.png')}
              />
              <Text
                style={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}
              >
                {item.label}
              </Text>
            </View>
            <View style={styles.price}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                  marginRight: 5
                }}
              >
                CFA {item.unitPrice}
              </Text>
              <FAIcon name="tags" size={15} color="orange" />
            </View>
          </View>

          <SharedElementTransition sharedElementId={`productImage${item.id}`}>
            <Image
              style={styles.picture}
              source={item.image || require('~assets/images/logo.png')}
              resizeMode={item.image ? 'cover' : 'contain'}
            />
          </SharedElementTransition>

          <View style={styles.stock}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                backgroundColor: 'white',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: 75
              }}
            >
              {item.stock} Kg
            </Text>
          </View>
          <View style={styles.footer}>
            <Icon name="favorite-border" size={37} color="#e67e22" />
            <Icon name="add-shopping-cart" size={37} color="green" />
          </View>
          <View style={styles.description}>
            <Text style={{ color: 'black' }}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black'
  },
  picture: {
    flex: 1,
    height: 200,
    width: 'auto'
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
    marginLeft: 0
  },
  container: {
    margin: 10,
    backgroundColor: 'grey',
    elevation: 5
  },
  description: {
    backgroundColor: 'white',
    padding: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 7,
    paddingBottom: 0
  },
  stock: {
    position: 'absolute',
    top: 220,
    paddingLeft: 20,
    height: 75,
    width: 75,
    opacity: 0.8
  },
  price: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    opacity: 0.8
  }
});
