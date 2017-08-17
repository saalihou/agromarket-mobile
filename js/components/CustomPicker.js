import React, { Component } from 'react';
import { Picker, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CustomPicker extends Component {
    static defaultProps = {
        items: []
    }
    render() {
        const { items } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name={this.props.icon} color='white' size={25} />
                </View>
                <Picker itemStyle={styles.item} {...this.props} style={[styles.picker, this.props.style]}>
                    {items.map(item => (
                        <Picker.Item label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 1,
    },
    picker: {
        flex: 1,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        height: 57
    },
    item: {
        fontWeight: 'bold'
    },
    icon: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: 'center',
        padding: 15
    }
})