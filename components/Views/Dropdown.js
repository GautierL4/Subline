import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';

class Dropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            displayOptions: {
                display:'none',
                flex:0,
            },
            display: {
                display:'flex',
                flex:1,
            },
            options: [
                'Maintenant',
                'Heure de départ',
                'Heure d\'arrivée',
            ]
        };
    }

    displayOptions() {
        if(this.state.displayOptions.display=='none') {
            this.setState({
                displayOptions: {display:'flex',flex:1},
                display: {display:'none',flex:0}
            });
        } else {
            this.setState({
                displayOptions: {display:'none',flex:0},
                display: {display:'flex',flex:1}
            });
        }        
    }

    async chooseDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(2020, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    render(){
        return (
            <View style={{ flex:1, flexDirection:'row'}}>
                <View style={{flex:0.9,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.displayOptions()} style={[this.state.display,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>{this.state.options[0]}</Text>
                            <Image style={{height:8,width:8,marginLeft:5}} source={require('../../assets/icons/sort-down.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.chooseDate()} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>{this.state.options[0]}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.chooseDate()} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>{this.state.options[1]}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.chooseDate()} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>{this.state.options[2]}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
         
    }

}
export default Dropdown;