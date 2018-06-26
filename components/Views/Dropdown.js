import React from 'react';
import { StyleSheet, Text, View, DatePickerAndroid, TimePickerAndroid, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import DatePicker from 'react-native-datepicker'

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
            title: 'Maintenant',
            when: {
                datetime:null,
                type:'now'
            },
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

    async chooseDate(type) {
        var datetime = null
        var title = type=='departure' ? 'Partir le ' : type=='arrival' ? 'Arrivé le ' : null
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            try {
                const {action, hour, minute} = await TimePickerAndroid.open({});
                title+=day+'/'+this.addAZeroBeforeADigit(month+1)+'/'+year+' à '+this.addAZeroBeforeADigit(hour)+'h'+this.addAZeroBeforeADigit(minute)
                datetime = year + '' + this.addAZeroBeforeADigit(month+1) + '' + this.addAZeroBeforeADigit(day) + 'T' + this.addAZeroBeforeADigit(hour) + '' + this.addAZeroBeforeADigit(minute) + '00'
            } catch ({code, message}) {
                console.warn('Cannot open time picker', message);
            } 
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
        this.setState({
            when: {datetime:datetime,type:type},
            title: title,
        });      
        this.displayOptions()
    }

    addAZeroBeforeADigit(digit) {
        return digit<10 ? '0'+digit : digit
    }

    resetToNow() {
        this.setState({
            when: {datetime:null,type:'now'},
            title: 'Maintenant',
        });      
        this.displayOptions()
    }

    render(){
        return (
            <View style={{ flex:1, flexDirection:'row'}}>
                <View style={{flex:0.9,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.displayOptions()} style={[this.state.display,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>{this.state.title}</Text>
                            <Image style={{height:8,width:8,marginLeft:5}} source={require('../../assets/icons/sort-down.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.resetToNow()} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>Maintenant</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.chooseDate('departure')} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>Heure de départ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.chooseDate('arrival')} style={[this.state.displayOptions,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:14}}>Heure d'arrivée</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
         
    }

}
export default Dropdown;