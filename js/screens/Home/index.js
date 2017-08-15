import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { PagerTitleIndicator, IndicatorViewPager } from 'rn-viewpager';
import FAB from 'react-native-fab';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <IndicatorViewPager
                    style={styles.viewPager}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'green'}}>
                        <Text >page three</Text>
                    </View>
                </IndicatorViewPager>
                <FAB buttonColor="red" iconTextColor="#FFFFFF"/>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator style={styles.indicatorContainer} titles={['hello', 'two']} />;
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: 'white',
    },
    indicatorContainer: {
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
})