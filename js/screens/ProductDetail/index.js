import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SharedElementTransition } from 'react-native-navigation';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import colors from '../../theme/colors';

import screen from '../../hoc/screen';

class ProductDetailScreen extends Component {
  componentWillMount() {}

  checkout = () => {
    Alert.alert(
      'Commander',
      `Confirmez-vous la commande de ${this.props.product.label} ?`,
      [
        {
          text: 'Non annuler',
          style: 'cancel',
        },
        {
          text: 'Oui, commander',
          onPress() {
            setTimeout(() => {
              Alert.alert(
                `Bien reçu`,
                'Votre commande a bien été enregistrée. Nous vous contacterons pour achever le processus. Merci!',
              );
            }, 1000);
          },
        },
      ],
    );
  };

  render() {
    const { product, sharedElementPrefix } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SharedElementTransition
          sharedElementId={`${sharedElementPrefix || ''}productImage${
            product.id
          }`}
          showDuration={350}
          hideDuration={350}
          showInterpolation={{
            type: 'linear',
            easing: 'FastOutSlowIn',
          }}
          hideInterpolation={{
            type: 'linear',
            easing: 'FastOutSlowIn',
          }}
        >
          <Image
            style={styles.image}
            source={product.image || require('~assets/images/logo.png')}
            resizeMode={product.image ? 'cover' : 'contain'}
          />
        </SharedElementTransition>
        <View style={styles.content}>
          <View style={styles.footer}>
            <Icon name="favorite-border" size={37} color="#e67e22" />
            <Icon name="add-shopping-cart" size={37} color="green" />
          </View>
          <View style={styles.description}>
            <Text style={{ color: 'black' }}>{product.description}</Text>
          </View>
          <View style={styles.priceAndWeight}>
            <View style={styles.priceText}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                  marginRight: 5,
                }}
              >
                CFA {product.unitPrice}
              </Text>
              <FAIcon name="tags" size={15} color="orange" />
            </View>
            <View style={styles.weightText}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                  marginRight: 5,
                }}
              >
                {product.stock} KG disponibles
              </Text>
              <FAIcon name="tags" size={15} color="orange" />
            </View>
          </View>
          <View style={styles.checkoutButton}>
            <Button onPress={this.checkout} title="Commander" color="green" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 5,
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 7,
    paddingBottom: 0,
  },
  priceAndWeight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'green',
    borderRadius: 10,
    opacity: 0.8,
  },
  priceText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButton: {
    marginTop: 10,
  },
});

export default screen(ProductDetailScreen);
