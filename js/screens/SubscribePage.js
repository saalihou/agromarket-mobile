import React, { Component } from 'react';
import { Text, View, Image, BackAndroid, StyleSheet } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import AuthSubscribe from './AuthSubscribe.js';
import PersoInfosSubscribe from './PersoInfosSubscribe.js';

export default class SubscribePage extends Component {
	gotoPage(page) {
		this.refs.viewPager.setPage(page);
	}

	onAuthSubmit(authInfos) {
		this.gotoPage(1);
	}

	render() {
		return (
			<View style={{flex:1}}>
                <Image
                    source={require('../../assets/images/cocktails.png')}
                    style={styles.backgroundImage}
                />
				<IndicatorViewPager
					style={styles.viewPager}
					scrollEnabled={false}
					ref='viewPager'
				>
					<View>
						<AuthSubscribe onSubmit={this.onAuthSubmit.bind(this)} />
					</View>
					<View>
						<PersoInfosSubscribe />
					</View>
					<View style={{backgroundColor:'#1AA094'}}>
						<Text>Page Three</Text>
					</View>
				</IndicatorViewPager>
			</View>
		);
	}

	_renderDotIndicator() {
			return <PagerDotIndicator pageCount={3} />;
	}
}

const styles = StyleSheet.create({
    backgroundImage: {
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
		zIndex: 0
    },
	viewPager: {
		flex: 1,
		zIndex: 2
	}
})
