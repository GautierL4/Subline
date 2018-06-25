import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, WebView } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
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

       
        
          const { navigation } = this.props;
        //  console.log(navigation.getParam('param', 'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-Metro.1496264586.pdf'));
        // if(navigation.getParam('param') {

             const source = navigation.getParam('param');

            
            //  console.log(source);
        // }


        return(
            <View style={styles.container}>
                
                   <WebView 
                        bounces={false}
                        scrollEnabled={false} 
                        source={{uri:source}} />
      
                   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                       <View style={styles.returnButtonBg} >
                          <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                       </View>
                   </TouchableWithoutFeedback>
                                  
            </View>
        )
    }
}

  export default MapPage;