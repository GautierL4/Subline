import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList, AsyncStorage } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class JourneyPage extends React.Component {

    async addBookmark(){

       await AsyncStorage.setItem('key', 'Je stock ça ici');
      
    }

    render(){

        
        return(
            <View style={styles.container}>
                <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
                    <View style={{flexDirection:'row',height:230,backgroundColor:'#000',width:500}}>
                        <View style={{flexDirection:'row'}}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                <View style={styles.buttonTop} >
                                    <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                <View style={styles.buttonTop} >
                                    <Image style={styles.returnArrow} source={require('../../assets/icons/refresh.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                <View style={styles.buttonTop} >
                                    <Image style={styles.returnArrow} source={require('../../assets/icons/alarm_off.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.addBookmark }>
                                <View style={styles.buttonTop} >
                                    <Image style={styles.returnArrow} source={require('../../assets/icons/star_off.png')} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>  
                        </View>
                        <View></View>
                    </View>
                    <View style={styles.body}>

                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default JourneyPage;