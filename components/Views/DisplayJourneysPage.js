import React from 'react';
import { StyleSheet, Text, View, Image, Animated,Platform, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import FileLoader from './FileLoader.js';
import APIHandler from '../API/APIHandler.js';
import Dropdown from '../Views/Dropdown';

const APIManager = new APIHandler();
const IconLoader = new FileLoader();

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
            savedParams: this.props.navigation.getParam('savedParams'),
            isLoading: true,
        };
        // console.log("DisplayJourneyPage",this.state);
    }

    componentDidMount(){
        console.log("get data from API");
        this.searchJourney();
    }

    async searchJourney(){
        try{
            data = await APIManager.getJourneys(this.state.departure.id, this.state.destination.id);
        }
        catch(e){
            console.error(e);
        }
        this.setState({data: data, isLoading: false});
        
    }

    convertSecondsToMinutes(seconds){
        var minutes = Math.floor(seconds / 60);
        return minutes;
    }

    renderBestJourney(){
        for(var journey in this.state.data.journeys){
            if(journey.type == "best"){
                return(
                    <View>
                    <Text style={styles.title}>Meilleur itinéraire</Text>
                            <View style={styles.mapCardBox}>
                                <TouchableOpacity style={[styles.card,styles.mapCard]}>
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
                                </TouchableOpacity>
                            </View>
                        </View>
                );
            }
        }
    }

    
    render(){

        

        const _renderSeparator = () => (
            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
        )

        if(this.state.isLoading){
            return(
                <View style={{width: screenWidth, height: screenHeight, flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                    <Image style={{width: 80, height: 80,}} source={require('../../assets/icons/loading-start.gif')} />
                </View>
                );
        }
        else if(Platform.OS === 'android'){
            return(
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
                        <View style={styles.header}>
                            <View style={{flexDirection:'row',height:80,justifyContent:'center'}}>
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
                            <Dropdown />
                        </View>
                        <View style={styles.body}>
                        
                            <Text style={styles.title}>Itinéraires</Text>
                            <View style={styles.mapCardBox}>
                                <View style={[styles.card,styles.mapCard,{flexDirection:'column'}]}>
                                    <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:3,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                                <FlatList data={this.state.data[0].sections} horizontal={true} ItemSeparatorComponent={_renderSeparator} renderItem={({item})=> 
                                                    {
                                                        let icon = IconLoader.getIconBySection(item);
                                                        return(
                                                            <Image style={styles.journeyCardBottomImg} source={icon} />
                                                        )
                                                    }
                                                }keyExtractor={(item, index) => index.toString} />
                                                <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                                    <Text style={{fontSize:16,fontWeight:"bold"}}>{this.convertSecondsToMinutes(this.state.data[0].duration)}</Text>
                                                    <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:3,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                                <FlatList data={this.state.data[1].sections} horizontal={true} ItemSeparatorComponent={_renderSeparator} renderItem={({item})=> 
                                                    {
                                                        let icon = IconLoader.getIconBySection(item);
                                                        return(
                                                            <Image style={styles.journeyCardBottomImg} source={icon} />
                                                        )
                                                    }
                                                }keyExtractor={(item, index) => index.toString} />
                                                <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                                    <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                                    <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:3,flexDirection:'row',alignItems:'center',flexWrap: 'wrap',}}>
                                                <FlatList data={this.state.data[2].sections} horizontal={true} ItemSeparatorComponent={_renderSeparator} renderItem={({item})=> 
                                                    {
                                                        let icon = IconLoader.getIconBySection(item);
                                                        return(
                                                            <Image style={styles.journeyCardBottomImg} source={icon} />
                                                        )
                                                    }
                                                }keyExtractor={(item, index) => index.toString} />
                                                <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                                    <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                                    <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity> */}
                                    {/* <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
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
                                            </View>
                                            <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-end',alignItems:'center'}}>
                                                <Text style={{fontSize:24,fontWeight:"bold"}}>14</Text>
                                                <Text style={{fontSize:12,marginTop:9,marginLeft:5}}>min</Text>
                                            </View>
                                        </View>
                                        <View style={{marginBottom:10}}>
                                            <Text style={{fontSize:12,color:'#898989'}}>Le moins de marche à pied</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
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
                                        <View style={{marginBottom:10}}>
                                            <Text style={{fontSize:12,color:'#898989',}}>Le moins de correspondance</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            </View> 
                        </View>
                    </ScrollView>
                </View>
            )
        } else {

             return(
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
                        <View style={styles.header}>
                            <View style={{flexDirection:'row',height:80,justifyContent:'center'}}>
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

                           
                        </View>
                        <View style={styles.body}>
                        { this.renderBestJourney() }
                            <Text style={styles.title}>Autres itinéraires</Text>
                            <View style={styles.mapCardBox}>
                                <View style={[styles.card,styles.mapCard,{flexDirection:'column'}]}>
                                    <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
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
                                        <View style={{marginBottom:10}}>
                                            <Text style={{fontSize:12,color:'#898989'}}>Le moins de marche à pied</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'column',alignSelf: 'stretch',borderBottomColor: '#e5e5e5',borderBottomWidth: 1,marginLeft:20,marginRight:20,paddingTop:10}}>
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
                                        <View style={{marginBottom:10}}>
                                            <Text style={{fontSize:12,color:'#898989',}}>Le moins de correspondance</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> 
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default DisplayJourneysPage;