import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList, AsyncStorage, Easing } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

class PartOfJourney extends React.Component {

    constructor() {
        super();
        this.state = {
            showOrHideDropDown: {
                display:'none'
            }
        }
    }

    toggleDisplayStopAreas() {
        var value = this.state.showOrHideDropDown.display == 'none' ? 'flex' : 'none'
        this.setState({
            showOrHideDropDown: {
                display:value,
            }
        }); 
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20, borderBottomColor: '#e5e5e5', borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                    <Image style={{ height: 25, width: 25 }} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>16:29</Text>
                    <View style={{ flexDirection: 'column', flex: 3 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Les dix Arpents (Vémars)</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/arrow-direction.png')} />
                            <Text style={{ fontSize: 12, color: "#898989", marginLeft: 5 }}>Aéroport Cdg1 RER B</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={()=>this.toggleDisplayStopAreas()} style={{ flexDirection: 'row', marginTop: 10, height:30, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#898989', fontSize: 14 }}>9 arrêts</Text>
                        <Image style={{ width: 7, height: 7, marginLeft: 5 }} source={require('../../assets/icons/sort-down-grey.png')} />
                    </TouchableOpacity>
                    <View style={[this.state.showOrHideDropDown,{ marginLeft: 10, marginRight: 10 }]}>
                        <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginTop: 2, paddingBottom: 2 }}>
                            <Text style={{ fontSize: 14, color: "#898989" }}>Parc des expositions</Text>
                        </View>
                        <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginTop: 2, paddingBottom: 2 }}>
                            <Text style={{ fontSize: 14, color: "#898989" }}>Villepinte</Text>
                        </View>
                        <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginTop: 2, paddingBottom: 2 }}>
                            <Text style={{ fontSize: 14, color: "#898989" }}>Sevran Beaudotte</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>17:05</Text>
                    <View style={{ flexDirection: 'column', flex: 3 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Aéroport Cdg1 RER B</Text>
                    </View>
                </View>
            </View>
        )
    }

}
export default PartOfJourney;