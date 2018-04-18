import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import color from '../../theme/colors.json'

import screen from '../../hoc/screen';

class Welcome extends Component {
    async componentWillMount() {
        const { navigator } = this.props;
        navigator.setTitle({
            title: 'AgroMarket'
        });
    }

    handlePress(field) {
        this.props.navigator.push({
            screen: 'Home',
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.fieldContainer} onPress={this.handlePress.bind(this)}>
                    <Image style={styles.image}
                        source={require('~assets/images/kani_black.jpg')}
                    />
                    <Text style={styles.content}>Agriculture</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.fieldContainer} onPress={this.handlePress.bind(this)}>
                    <Image style={styles.image}
                        source={require('~assets/images/guinar_black.jpg')}
                    />
                    <Text style={styles.content}>Élevage</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.fieldContainer} onPress={this.handlePress.bind(this)}>
                    <Image style={styles.image}
                        source={require('~assets/images/fish_black.jpg')}
                    />
                    <Text style={styles.content}>Pêche</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right:0,
    },
    
    fieldContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: color.PRIMARY,
        borderWidth: 1,
    },

    content: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 37,
    },
})

export default screen(Welcome);