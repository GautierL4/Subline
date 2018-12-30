import React from 'react'
import { StyleSheet, Text, View, Image, Animated, Platform, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native'
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';

export default class BusIcon extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.busCard,this.props.style]}>
                <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                <Text style={styles.busCardTxt}>{this.props.lineName}</Text>
            </View>
        )
    }

}