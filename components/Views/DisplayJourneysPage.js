import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class DisplayJourneysPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    getPlaceData(id,name){
        console.log(id,name);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                </View>
            </View>
        )
    }
}

export default DisplayJourneysPage;