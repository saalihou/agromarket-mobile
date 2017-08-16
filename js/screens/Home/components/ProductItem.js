import React, { PureComponent } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icone from 'react-native-vector-icons/FontAwesome';

export default class ProductItem extends React.PureComponent {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.profilePic} source={require('~assets/images/mixt.png')} />
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Seynou</Text>
              </View>
              <View style={styles.price}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', marginRight: 5}}>CFA {this.props.price}</Text>
                <Icone name='tags' size={15} color='orange' />
              </View>
            </View>
            <Image
              style={styles.picture}
              source={require('~assets/images/mixt.png')}
            />
            <View style={styles.stock}>
              <Text style={{fontWeight: 'bold', color: 'black',  backgroundColor: 'white', justifyContent:'center', textAlign: 'center', borderRadius: 75}}>20 Kg</Text>
            </View>
            <View style={styles.footer}>
              <Icon name='favorite-border' size={37} color='#e67e22' />
              <Icon name='add-shopping-cart' size={37} color='green' />
            </View>
            <View style={styles.description}>
              <Text style={{color: 'black'}}>{this.props.description}</Text>
            </View>
        </View>

    )
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
    shadowColor: 'black',
  },
  picture: {
    flex: 1,
    height: 200,
    width: 'auto',
  },
  profilePic: {
    height: 30,
    width: 30,
    borderRadius: 30,
    margin: 10,
    marginLeft: 0,
  },
  container: {
    margin: 10,
    backgroundColor: 'grey',
    elevation: 5,
  },
  description: {
    backgroundColor: 'white',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 7,
    paddingBottom: 0,
  },
  stock: {
    position: 'absolute',
    top: 220,
    paddingLeft: 20,
    height: 75, width: 75,
    opacity: 0.8,
  },
  price: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    opacity: 0.8,
  }
})