import React, { Component } from 'react';
import { Text, View, TextInput, Image, Button } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

export default class Card extends Component {
	render() {
		return (
			<View style={styles.authContainer}>
                <View style={styles.header}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={styles.card}>
                    {this.props.children}
                </View>
			</View>
		);
	}
}

const styles = {
    authContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        padding: 20,
        height: 350,
        width: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        width: 300,
        height: 50,
        backgroundColor: 'tomato', 
        justifyContent: 'center',
        alignItems: 'center',
    }
}