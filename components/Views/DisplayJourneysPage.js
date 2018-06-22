import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class DisplayJourneysPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            departure: this.props.navigation.getParam('departure', {
                id: null,
                name: "Ma position",
            }),
            destination: this.props.navigation.getParam('destination', {
                id: null,
                name: "Destination",
            }),
            savedParams: this.props.navigation.getParam('savedParams')
        };
        console.log(this.state);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center', marginBottom: 15 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DepartureSearchPage',{ type:'departure', placeholder: 'Point de départ', savedParams: this.state.savedParams})} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                <Text style={styles.input}>{this.state.departure.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.replace('SearchPage',{ type: "destination" ,savedParams: this.state.savedParams })} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                <Text style={styles.input}>{this.state.destination.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                 <View style={styles.body}>
                 </View>
            </View>
        )
    }
}

export default DisplayJourneysPage;