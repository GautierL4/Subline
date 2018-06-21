import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';
import DisplayJourneysPage from './DisplayJourneysPage.js';

const journeysPage = new DisplayJourneysPage();

const APIManager = new APIHandler();

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: {stops: null,
                        places: null},
            search: ''
        };
    }


    async AutoCompleteResearch(input){
        this.setState({search: input});
        try{
            data = await APIManager.getPlaces(this.state.search)
        }
        catch(e){
            console.error(e);
        }
        if(!(typeof data === "undefined")){
            this.setState({locations: data})
        }
    }

    selectPlace(id,name){
        console.log(id,name);
        journeysPage.getPlaceData(id,name);
        this.props.navigation.navigate('DisplayJourneysPage');
    }

    
    render(){
        return(
            <View style={[styles.container,]}>
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
                                    <TextInput onChangeText={(text) => this.AutoCompleteResearch(text)} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Votre destination" autoFocus />
                                </View>
                        </View>

                        <Text style={styles.title}>Stations</Text>
                        <View style={styles.resultCardBox}>
                            <View style={[styles.card,styles.resultCard]}>
                                <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.stops} renderItem={({item}) => 
                                    <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.selectPlace(item.id,item.name)}>
                                        <View style={styles.resultItem}>
                                            <Text style={styles.resultItemText}>{item.name}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>}
                                keyExtractor={(item, index) => index} />
                            </View>
                        </View>

                        <Text style={styles.title}>Lieux</Text>
                        <View style={styles.resultCardBox}>
                            <View style={[styles.card,styles.resultCard]}>
                                <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.places} renderItem={({item}) => 
                                    <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.selectPlace(item.id,item.name)}>
                                        <View style={styles.resultItem}>
                                            <Text style={styles.resultItemText}>{item.name}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>}
                            keyExtractor={(item, index) => index} />
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