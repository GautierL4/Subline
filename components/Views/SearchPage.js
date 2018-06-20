import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

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

    async 

    
    render(){
        return(
            <View style={styles.container}>
                    <View style={styles.header}>
                    </View>
                    <View style={styles.body}>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',top:-25}}>
                                <View style={styles.searchBar}>
                                    <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                    <TextInput onChangeText={(text) => this.AutoCompleteResearch(text)} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Votre destination" autoFocus />
                                </View>
                        </View>
                        
                        <View style={{flex:2,alignItems: 'center'}}>
                            <Text style={styles.title}>Stations</Text>
                            <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.stops} renderItem={({item}) => 
                                <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.changeCityAndCountry(item.id)}>
                                    <View style={styles.resultItem}>
                                        <Text style={styles.resultItemText}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>}
                            keyExtractor={(item, index) => index} />
                        </View>

                        <View style={{flex:2,alignItems: 'center'}}>
                            <Text style={styles.title}>Lieux</Text>
                            <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.places} renderItem={({item}) => 
                                <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.changeCityAndCountry(item.id)}>
                                    <View style={styles.resultItem}>
                                        <Text style={styles.resultItemText}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>}
                            keyExtractor={(item, index) => index} />
                        </View>

                    </View>
            </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         alignItems: 'center', 
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     },
//     header: {
//         backgroundColor: '#000',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'stretch',
//         height: 100
//     },
//     title: {
//         fontSize: 20, 
//         textAlign: 'center', 
//         margin: 10,
//         color: "#898989",
//         textAlign:'left',
//         marginBottom: 10,
//     },
//     body: {
//         flex: 3,
//         width: screenWidth,
//     },
//     stopCardBox: {
//         flex:1,
//         height:160,
//         flexDirection:'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width:screenWidth-(screenWidth/13)
//     },
//     stopCard: {
//         flexDirection:'row',
//         alignItems: 'center',
//         height:130,
//         backgroundColor: '#ffffff',
//         borderRadius: 5,
//         //IOS
//         shadowOpacity: 0.2,
//         shadowRadius: 7,
//         shadowOffset: {
//             height: 4,
//             width: 0
//         },
//         //android
//         elevation: 7,
//         flex:0.95,
//         flexDirection:'row'
//     },
//     mapCardBox: {
//         flex:1,
//         height:75,
//         flexDirection:'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width:screenWidth
//     },
//     mapCard: {
//         flexDirection:'row',
//         alignItems: 'center',
//         height:60,
//         backgroundColor: '#ffffff',
//         justifyContent: 'center',
//         borderRadius: 5,
//         //IOS
//         shadowOpacity: 0.2,
//         shadowRadius: 7,
//         shadowOffset: {
//             height: 4,
//             width: 0
//         },
//         //android
//         elevation: 7,
//         flex:0.9,
//         flexDirection:'row'
//     },
//     home: {
//       flex:1,
//       alignItems: 'center',
//       justifyContent: 'center',

//     },
//     resultClickable: {
//         flex:1,
//         borderRadius: 50,
//       },
//     resultItem: {
//         height:50,
//         alignItems: 'center', 
//         flexDirection: 'row',
//         flex:1,
//       },
//       resultItemText: {
//         fontSize: 17,
//         color: 'black',
//       },
//     input: {
//       color: "#666666",
//       fontWeight: 'bold',
//       fontSize: 18,
//       padding: 10,
//       flex:0.8,
//     },
//     ImageStyle: {
//       margin: 10,
//       paddingLeft: 5,
//       resizeMode : 'contain',
//       alignItems: 'center',
//       maxHeight:20,
//       flex:0.1,
//     },
//     searchBar: {
//       backgroundColor: '#ffffff',
//       borderRadius: 5,
//       //IOS
//         shadowOpacity: 0.2,
//         shadowRadius: 7,
//         shadowOffset: {
//             height: 4,
//             width: 0
//         },
//       //android
//       elevation: 7,
//       flex:0.9,
//       flexDirection:'row'
//     },
//   });

  export default SearchPage;