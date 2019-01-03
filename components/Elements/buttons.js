import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import { styles } from '../../assets/styles/style';

export class BackButton extends React.Component {
    render() {
        return (
            <View style={styles.returnButton} >
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')} onPress={() => this.props.navigation.goBack()} >
                    <View>
                        <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

export class FavoriteButton extends React.Component {
    render() {
        return (
            <View style={styles.button} >
                <TouchableNativeFeedback onPress={() => console.log('favorite button')} >
                    <View>
                        <Image style={styles.returnArrow} source={require('../../assets/icons/star_off.png')} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

export class AlarmButton extends React.Component {
    render() {
        return (
            <View style={styles.button} >
                <TouchableNativeFeedback onPress={() => console.log('alarm button')} >
                    <View>
                        <Image style={styles.returnArrow} source={require('../../assets/icons/alarm_off.png')} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}