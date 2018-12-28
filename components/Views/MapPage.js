import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, ScrollView, Dimensions, WebView } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import { Constants } from 'expo';

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
                    source={{ uri: source }} />

                <View style={styles.returnButton} >
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')} onPress={() => this.props.navigation.goBack()} >
                        <View>
                            <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        )
    }
}

export default MapPage;