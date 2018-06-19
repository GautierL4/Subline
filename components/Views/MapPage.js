import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';

class MapPage extends React.Component {

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
                   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                       <View style={styles.returnButton} >
                          <Text>Retour</Text>
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
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff'
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
  });

  export default MapPage;