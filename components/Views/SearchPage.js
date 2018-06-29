import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';


const APIManager = new APIHandler();



class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: {places: null},
            search: '',
            savedParams: this.props.navigation.getParam('savedParams',{ destination:null, departure: null })
        };
        this.placeholder = this.props.navigation.getParam('placeholder','Votre destination');
        this.typename = this.props.navigation.getParam('type');
    }

    componentDidMount(){
        this.getCurrentLocation();
    }

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
                (position) => {
                    var departure = {
                        id: position.coords.longitude + ";" +position.coords.latitude,
                        name: "Ma position"
                    }
                    this.setState({departure: departure});
                },
                (error) => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
    }

    async AutoCompleteResearch(input){
        this.setState({search: input});
        if(this.typename != "line") {
            try{
                data = await APIManager.getPlaces(this.state.search)
            }
            catch(e){
                console.error(e);
            }
            
        } else {
            try{
                data = await APIManager.getLines(this.state.search)
            }
            catch(e){
                console.error(e);
            }
        }
        if(!(typeof data === "undefined")){
            this.setState({locations: data})
        }

    }

    async sendFirstInputData(id,name){
        try{
            params = {
                departure: {
                    id: this.state.departure.id,
                    name: this.state.departure.name,
                },
                destination : {
                    id: id,
                    name: name,
                },
            };
            this.props.navigation.navigate('DisplayJourneysPage', {
                departure: this.state.departure,
                destination: params.destination,
                savedParams: params
            });
        }
        catch(e){
            console.error(e);
        }
        
        
    }

    sendDepartureData(id,name){
        params = {
            destination : this.state.savedParams.destination,
            departure : {
                id: id,
                name: name,
            }
        };
        this.redirectWithPreviousParams(params);
    }

    sendDestinationData(id,name){
        params = {
            destination : {
                id: id,
                name: name,
            },
            departure: this.state.savedParams.departure,
        };
        this.redirectWithPreviousParams(params);
    }

    redirectWithPreviousParams(params){
        this.props.navigation.replace('DisplayJourneysPage', {
            destination: params.destination,
            departure: params.departure,
            savedParams: params,
        });
    }

    async sendLineData(item) {        // console.log(bgColor)
        params = {
            line : {
                id: item.id,
                name: item.name,
                bgColor: '#'+item.bgColor,
                color: '#'+item.color,
                stopList: await APIManager.getStopAreas(item.id)
            },
        };
        console.log('aha')
        console.log(JSON.stringify(params, null, 4))
        this.redirectToListOfStopWithPreviousParams(params);
    }

    redirectToListOfStopWithPreviousParams(params){
        this.props.navigation.replace('ListOfStopPage', {
            line: params.line,
        });
    }

    async selectPlace(item){ 
        if(this.typename == "firstInput"){
            this.sendFirstInputData(item.id,item.name);
        }
        else if(this.typename == "departure"){
            this.sendDepartureData(item.id,item.name);
        }
        else if(this.typename == "destination"){
            this.sendDestinationData(item.id,item.name);
        }
        else if(this.typename == "line"){
            // console.log(JSON.stringify(item, null, 4))
            this.sendLineData(item);
        }
    }


    
    render(){
             
        return(
            <View style={[styles.container]}>
                <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
                    <View style={{flexDirection:'row',height:100,backgroundColor:'#000',width:500}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                            <View style={styles.returnButton} >
                                <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.body}>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                                <View style={styles.searchBar}>
                                    <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                    <TextInput onChangeText={(text) => this.AutoCompleteResearch(text)} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder={this.placeholder} autoFocus />
                                </View>
                        </View>

                        <Text style={styles.title}>Résultats</Text>
                        <View style={styles.resultCardBox}>
                            <View style={[styles.card,styles.resultCard]}>
                                <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.places} renderItem={({item}) => 
                                    <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.selectPlace(item)}>
                                        <View style={styles.resultItem}>
                                            <Text style={styles.resultItemText}>{item.name} </Text>
                                        </View>
                                    </TouchableWithoutFeedback>}
                                keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>

                    </View> 
                </ScrollView>
            </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

  export default SearchPage;