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
          const source = navigation.getParam('param');


        return(
            <View style={{flex:1,backgroundColor: '#fff',paddingTop: Constants.statusBarHeight}}>
                
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