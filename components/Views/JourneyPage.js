import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class JourneyPage extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}}>
                    <View style={[styles.header,styles.headerMax]}>
                        <Image source={require('../../assets/icons/subline.png')} style={{width: 90, height: 90}}/>
                    </View>
                    <View style={styles.body}>

                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default JourneyPage;