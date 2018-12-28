import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, ScrollView, Dimensions, WebView } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import { Constants } from 'expo';
import { BackButton } from '../Elements/buttons'

class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            search: ''
        };
    }

    changeView(page, parameters) {
        // setTimeout(function () {
        this.props.navigation.navigate(page, parameters)
        // }.bind(this), 100)
    }

    render() {

        const { navigation } = this.props;
        const source = navigation.getParam('param');


        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>

                <WebView
                    bounces={false}
                    scrollEnabled={false}
                    source={{ uri: source }}
                    />

                <BackButton navigation={this.props.navigation} />

            </View>
        )
    }
}

export default MapPage;