import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableNativeFeedback, ScrollView, Dimensions } from 'react-native';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: null
        };
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        //Setting the loading screen for 3 seconds
        setTimeout(() => { this.setState({ isLoading: false })
        }, 3000);
    }

    render(){
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        if(this.state.isLoading){
            return(
            <View style={{flex: 1, backgroundColor: 'black',width:screenWidth, height:screenHeight, alignItems: 'center',justifyContent: 'center'}}>
                <Image style={{width: 80, height: 80,}} source={require('../../icons/loading-start.gif')} />
            </View>
            );
            
        }
        else{
            return(
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.header}>
                            <Image source={require('../../icons/loading-start.gif')} style={{width: 90, height: 90}}/>
                        </View>
                        <View style={styles.body}>
                            <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                                <TouchableNativeFeedback onPress={()=> this.props.navigation.navigate('SearchPages')} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../icons/search.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                                    </View>
                                </TouchableNativeFeedback >
                            </View>
                            <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Vos arrêts</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flex:1,backgroundColor:'red',width:screenWidth/3,height:100}}>
                                <Text>95-01</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'blue',width:screenWidth/3,height:100}}>
                                <Text>95-01</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'red',width:screenWidth/3,height:100}}>
                                <Text>95-01</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'blue',width:screenWidth/3,height:100}}>
                                <Text>95-01</Text>
                                </View>
                            </ScrollView>
                            <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Vos itinéraires</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{flex:1,backgroundColor:'red',width:screenWidth/3,height:100}}>
                                <Text>10 arpents - Jussieu</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'blue',width:screenWidth/3,height:100}}>
                                <Text>Les Halles - Bibliothèque François Mittérant</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'red',width:screenWidth/3,height:100}}>
                                <Text>Noisy-Champs - Gare de Lyon</Text>
                                </View>
                                <View style={{flex:1,backgroundColor:'blue',width:screenWidth/3,height:100}}>
                                <Text>Strasbourg Saint-Denis - Odéon</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

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
    },
    body: {
        flex: 3,
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
  

export default HomePage;
