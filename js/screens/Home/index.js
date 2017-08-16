import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { PagerTitleIndicator, IndicatorViewPager } from 'rn-viewpager';
import FAB from 'react-native-fab';
import ProductList from './Components/ProductList.js';
import Icone from 'react-native-vector-icons/FontAwesome';



const placeholdText = 'Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit Lorem Ipsum Dolor Sit Amet Consectetur Adispising Elit'

const list = [
    {"id": 1, title: "Test 1", price: "1000", description: placeholdText, stock: 10, image: '~assets/images/mixt.png'},
    {"id": 2, title: "Test 2", price: "1000", description: placeholdText, stock: 10, image: '~assets/images/mixt.png'},
    {"id": 3, title: "Test 3", price: "1000", description: placeholdText, stock: 10, image: '~assets/images/mixt.png'},
    {"id": 4, title: "Test 4", price: "1000", description: placeholdText, stock: 10, image: '~assets/images/mixt.png'},
]

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <IndicatorViewPager
                    style={styles.viewPager}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={styles.home}>
                        <ProductList data={list}  />
                    </View>
                    <View style={{backgroundColor:'green'}}>
                        <Text >page three</Text>
                    </View>
                    <View style={{backgroundColor:'yellow'}}>
                        <Text >page three</Text>
                    </View>
                </IndicatorViewPager>
                <FAB buttonColor="green" iconTextColor="#FFFFFF"/>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator style={styles.indicatorContainer} titles={[<Icone color='green' name='home' size={30} />, <Icone color='green' name='id-card' size={30} />, <Icone color='green' name='user' size={30} />]} />;
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 51,
    },
    indicatorContainer: {
        backgroundColor: '#ecf0f1',
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        elevation: 5,
    },
    home: {
        flex: 1,
        backgroundColor: "#ecf0f1"
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    },
})