import React, { Component } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import color from '~theme/colors.json'

export default class Welcome extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={{flex: 1, borderBottomColor: color.PRIMARY, borderWidth: 1}}>
                    <Image style={styles.image}
                        source={require('~assets/images/pasteque.jpeg')}
                    />
                </View>
                <View style={{flex: 1, borderBottomColor: color.PRIMARY, borderWidth: 1}}>
                    <Image style={styles.image}
                        source={require('~assets/images/cow.jpeg')}
                    />
                </View>
                <View style={{flex: 1,}}>
                    <Image style={styles.image}
                        source={require('~assets/images/fish.jpeg')}
                    />
                </View>
                <Text style={styles.agri}>Agriculture</Text>
                <Text style={styles.elev}>Élevage</Text>
                <Text style={styles.peche}>Pêche</Text>
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
    },
    agri: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    elev: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    peche: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
})