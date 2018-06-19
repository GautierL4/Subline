import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            search: ''
        };
    }


    AutoCompleteResearch(input){
        this.setState({search: input});
    }

    
    render(){
        return(
            <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../../icons/loading-start.gif')} style={{width: 90, height: 90}}/>
                    </View>
                    <View style={styles.body}>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',top:-25}}>
                                <View style={styles.searchBar}>
                                    <Image source={require('../../icons/search.png')} style={styles.ImageStyle} />
                                    <TextInput onChangeText={(text) => this.AutomaticResearch(text)} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Votre destination" autoFocus />
                                </View>
                        </View>
                    </View>
            </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    header: {
        flex: 2,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 250,
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        margin: 10,
        color: "#898989",
        textAlign:'left',
        marginBottom: 10,
    },
    body: {
        flex: 3,
        width: screenWidth,
    },
    stopCardBox: {
        flex:1,
        height:160,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth-(screenWidth/13)
    },
    stopCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:130,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 7,
        flex:0.95,
        flexDirection:'row'
    },
    mapCardBox: {
        flex:1,
        height:75,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth
    },
    mapCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 7,
        flex:0.9,
        flexDirection:'row'
    },
    home: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    input: {
      color: "#666666",
      fontWeight: 'bold',
      fontSize: 18,
      padding: 10,
      flex:0.8,
    },
    ImageStyle: {
      margin: 10,
      paddingLeft: 5,
      resizeMode : 'contain',
      alignItems: 'center',
      maxHeight:20,
      flex:0.1,
    },
    searchBar: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
      //android
      elevation: 7,
      flex:0.9,
      flexDirection:'row'
    },
  });

  export default SearchPage;