import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
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
        console.log("DisplayJourneyPage",this.state);
    }

    componentDidMount(){
        this.searchJourney();
    }

    async searchJourney(){
        try{
            data = await APIManager.getJourneys(this.state.departure.id, this.state.destination.id);
        }
        catch(e){
            console.error(e);
        }
        console.log("Data from API",data);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row',height:60,justifyContent:'center'}}>
                        <View style={{flex:0.9,flexDirection:'row',}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                    <View style={styles.buttonTop} >
                                        <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent: 'flex-end'}}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                    <View style={styles.buttonTop} >
                                        <Image style={styles.returnArrow} source={require('../../assets/icons/inverse.png')} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DepartureSearchPage',{ type:'departure', placeholder: 'Point de départ', savedParams: this.state.savedParams})} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../assets/icons/map-location.png')} style={styles.ImageStyle} />
                                <Text style={styles.input}>{this.state.departure.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',marginTop:15}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.replace('SearchPage',{ type: "destination" ,savedParams: this.state.savedParams })} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                            <View style={styles.searchBar}>
                                <Image source={require('../../assets/icons/target.png')} style={styles.ImageStyle} />
                                <Text style={styles.input}>{this.state.destination.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ height:50, flexDirection:"row"}}>
                      <ModalDropdown style={{width:100,backgroundColor:'#000000', marginTop:20, marginBottom:0, marginRight:0}}
                                     textStyle={{ color:'#ffffff',fontSize:17}}
                                     dropdownStyle={{ height:103,marginTop:3 }} defaultValue="Maintenant" options={['Maintenant', "Heure d'arrivée","Heure de départ"]}/>
                                      <Image source={require('../../assets/icons/sort-down.png')} style={{ height:8, width:8, marginTop:20, marginBottom:0, marginLeft:-8 }} />
                    </View>
                    
                </View>

                 <View style={styles.body}>
                      
                 </View>
            </View>
        )
    }
}

export default DisplayJourneysPage;