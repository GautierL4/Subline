import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
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
        // console.log("DisplayJourneyPage",this.state);
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
                <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
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
                        <Text style={styles.title}>Meilleur itinéraire</Text>
                        <View style={styles.mapCardBox}>
                            <View style={[styles.card,styles.mapCard]}>
                                <View style={{flex:3,marginLeft:20,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                                    <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERAgenRVB.png')} />
                                    <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/walk.png')} />
                                    <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <View style={styles.busCard}>
                                        <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                                        <Text style={styles.busCardTxt}>95-01</Text>
                                    </View>
                                    <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                    <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                    {/*<Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                    <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />*/}
                                </View>
                                <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center',marginRight:20}}>
                                    <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                    <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                </View>
                            </View>
                        </View> 
                        <Text style={styles.title}>Autres itinéraires</Text>
                        <View style={styles.mapCardBox}>
                            <View style={[styles.card,styles.mapCard,{flexDirection:'column'}]}>
                                <View style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:3,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERAgenRVB.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/walk.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <View style={styles.busCard}>
                                                <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                                                <Text style={styles.busCardTxt}>95-01</Text>
                                            </View>
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                            {/*<Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />*/}
                                        </View>
                                        <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                            <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                            <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:12,color:'#898989'}}>Le moins de marche à pied</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:3,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERAgenRVB.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/walk.png')} />
                                            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                            <View style={styles.busCard}>
                                                <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                                                <Text style={styles.busCardTxt}>95-01</Text>
                                            </View>
                                        </View>
                                        <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                            <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                            <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:12,color:'#898989'}}>Le moins de correspondance</Text>
                                    </View>
                                </View>
                            </View>
                        </View> 
                    </View>
                 </ScrollView>
            </View>
        )
    }
}

export default DisplayJourneysPage;