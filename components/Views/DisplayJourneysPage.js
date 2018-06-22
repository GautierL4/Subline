import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class DisplayJourneysPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departure: {
                id: "",
                name: "Ma position",
            },
            destination: {
                id: "",
                name: "Destination",
            }
        };
    }
    
    getPlaceData(id,name,type){
        console.log(id,name,type);
        if(type == "destination"){
            console.log('destination');
            this.getDestinationData(id,name);
        }
        else if(type == "departure"){
            console.log('departure');
            this.getDepartureData(id,name);
        }
    }

    getDepartureData(id,name){
        var departure = this.state.departure;
        departure.id = id;
        departure.name = name;
        this.setState({
            departure: departure,
        });
        console.log(this.state.departure);
    }

    getDestinationData(id,name){
        var destination = this.state.destination;
        destination.id = id;
        destination.name = name;
        this.setState({
            destination: destination,
        });
        console.log(this.state.destination);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center', marginBottom: 15 }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DepartureSearchPage',{ type:'departure', placeholder: 'Point de départ'})} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                <Text style={styles.input}>{this.state.departure.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SearchPage')} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
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