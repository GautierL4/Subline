import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableNativeFeedback, ScrollView, Dimensions } from 'react-native';

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
                    <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.header}>
                            <Image source={require('../../icons/loading-start.gif')} style={{width: 90, height: 90}}/>
                        </View>
                        <View style={styles.body}>
                            <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../icons/search.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                                        <TextInput onChangeText={(text) => this.AutoCompleteResearch(text)} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Entrez votre ville ici..." autoFocus />
                                    </View>
                            </View>
                        </View>
                {/* <View style={{flex:8,alignItems: 'center'}}>
                    <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.cities} renderItem={({item}) => 
                        <TouchableNativeFeedback style={styles.resultClickable} onPress={() =>this.changeCityAndCountry(item.city,item.country,item.l)}><View style={styles.resultItem}><Text style={styles.resultItemText}>{item.name+", "+item.country}</Text></View></TouchableNativeFeedback>}
                    keyExtractor={(item, index) => index} />
                </View> */}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
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
      shadowOpacity: 0.3,
      shadowRadius: 50,
      shadowOffset: {
          height: 0,
          width: 0
      },
      //android
      elevation: 7,
      flex:0.9,
      flexDirection:'row'
    },
  });

  export default SearchPage;