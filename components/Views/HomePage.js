import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

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
                            <Image source={require('../../icons/subline.png')} style={{width: 90, height: 90}}/>
                        </View>
                        <View style={styles.body}>
                            <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SearchPage')} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../icons/search.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Text style={styles.title}>Vos arrêts</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                            </ScrollView>
                            <Text style={styles.title}>Vos itinéraires</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                    <Text>95-01</Text>
                                    </View>
                                </View>
                            </ScrollView>
                            <Text style={styles.title}>Plans</Text>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan Métro</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan RER et transiliens</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan des Bus</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan des Noctiliens</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Accès Aéroport</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Carte intéractive</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
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
        height: 230,
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
        elevation: 5,
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
  

export default HomePage;
