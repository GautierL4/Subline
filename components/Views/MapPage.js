import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, WebView } from 'react-native';
import { Constants } from 'expo';

class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            search: ''
        };
    }


    
    render(){

        return(
            <View style={styles.container}>
                
                   <WebView
          bounces={false}
          scrollEnabled={false} 
          source={{ uri: 'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-Metro.pdf' }} />
      
                   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                       <View style={styles.returnButton} >
                          <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                       </View>
                   </TouchableWithoutFeedback>
                                  
            </View>
        )
    }
}



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight
    },
    returnButton: {

        backgroundColor:'#000',
        position:'absolute',
        borderRadius:5,
        top:25,
        left:13,
        height:50,
        width:50
    },
    returnArrow: {

        height:25,
        width:25,
        margin:12
        
    }
  });

  export default MapPage;