import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList, AsyncStorage, Easing  } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class JourneyPage extends React.Component {

    constructor () {
 
        super()
     
        this.RotateValueHolder = new Animated.Value(0);
     
      }
     
    //   componentDidMount() {
     
    //     this.StartImageRotateFunction();
     
    //   }
     
    StartImageRotateFunction () {
     
      this.RotateValueHolder.setValue(0)
      
      Animated.timing(
        this.RotateValueHolder,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear
        }
    ).start()
    // ).start(() => this.StartImageRotateFunction())
    //  Ligne dessus pour une boucle infini
    }

    async addBookmark(){
       await AsyncStorage.setItem('key', 'Je stock ça ici');
    }

    refresh() {
        console.log('ehehe')
        this.StartImageRotateFunction();
    }


    render(){

        const RotateData = this.RotateValueHolder.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-360deg']
        })
        
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
                                    <TouchableWithoutFeedback onPress={() => this.refresh()}>
                                        <View style={styles.buttonTop} >
                                            <Animated.Image style={[styles.returnArrow,{transform: [{rotate: RotateData}]}]} source={require('../../assets/icons/refresh.png')} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                        <View style={styles.buttonTop} >
                                            <Image style={styles.returnArrow} source={require('../../assets/icons/alarm_off.png')} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                        <View style={styles.buttonTop} >
                                            <Image style={styles.returnArrow} source={require('../../assets/icons/star_off.png')} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#ffffff',fontSize:70,fontWeight:'bold'}}>51</Text>
                            <Text style={{color:'#ffffff',fontSize:30,marginTop:30}}>min</Text>
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:18,height:18}} source={require('../../assets/icons/walk-white.png')} />
                            <Text style={{color:'#fff',fontSize:16}}>12min</Text>
                        </View>
                    </View>
                    <View style={styles.body}> 
                        <Image style={styles.returnArrow} source={require('../../assets/icons/star_off.png')} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default JourneyPage;