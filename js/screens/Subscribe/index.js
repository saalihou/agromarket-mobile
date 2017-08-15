import React, { Component } from 'react';
import { Text, View, Image, BackAndroid, StyleSheet } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import AuthForm from './AuthForm.js';
import PersoInfosForm from './PersoInfosForm.js';
import CheckCodeForm from './CheckCodeForm.js';
import AddressForm from './AddressForm.js';

export default class SubscribeScreen extends Component {
	gotoPage(page) {
		this.refs.viewPager.setPage(page);
	}

	onAuthSubmit(authInfos) {
		this.gotoPage(1);
	}

	onCheckCodeSubmit(authInfos) {
		this.gotoPage(2);
	}

	onPersoInfoSubmit(authInfos) {
		this.gotoPage(3);
	}

	onAddressSubmit(authInfos) {
		this.gotoPage(3);
	}

	render() {
		return (
			<View style={{flex:1}}>
                <Image
                    source={require('~assets/images/cocktails.png')}
                    style={styles.backgroundImage}
                />
				<IndicatorViewPager
					style={styles.viewPager}
					scrollEnabled={false}
					ref='viewPager'
				>
					<View>
						<AuthForm onSubmit={this.onAuthSubmit.bind(this)} />
					</View>
					<View>
						<CheckCodeForm onSubmit={this.onCheckCodeSubmit.bind(this)} />
					</View>
					<View>
						<PersoInfosForm onSubmit={this.onPersoInfoSubmit.bind(this)} />
					</View>
					<View>
						<AddressForm onSubmit={this.onAddressSubmit.bind(this)} />
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
