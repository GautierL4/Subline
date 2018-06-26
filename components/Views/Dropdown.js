import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';

class Dropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            display: {
                display:'none',
                flex:0,
            }
        };
    }

    displayOptions() {
        if(this.state.display.display=='none') {
            this.setState({
                display: {display:'flex',flex:1}

            });
        } else {
            this.setState({
                display: {display:'none',flex:0}
            });
        }
        // console.log(this.state.display)
        
    }

    render(){
        
        return (
            <View style={{ flex:1, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>this.displayOptions()} style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:14}}>Maintenant</Text>
                        <Image style={{height:8,width:8,marginLeft:5}} source={require('../../assets/icons/sort-down.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.displayOptions()} style={[this.state.display,{justifyContent:'center',alignItems:'center'}]}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:14}}>Heure de départ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.displayOptions()} style={[this.state.display,{justifyContent:'center',alignItems:'center'}]}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:14}}>Heure d'arrivée</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
         
    }

}
export default Dropdown;