import React from 'react';
import { Text, View, Dimensions, ScrollView, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native';

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
        }, 3000 );
    }

    render(){
        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;
        if(this.state.isLoading){
            return(
            <View style={{flex: 1, backgroundColor: 'black',width:screenWidth, height:screenHeight, alignItems: 'center',justifyContent: 'center'}}>
                <Image style={{width: 80, height: 80,}} source={require('../../icons/loading.gif')} />
            </View>
            );
        }
        else{
            return(
                <View style={{flex:1,width:screenWidth, height:screenHeight,alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize:25}}>Chargement terminé</Text>
                </View>
            )
        }
    }
}

export default HomePage;
