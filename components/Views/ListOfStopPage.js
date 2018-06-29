import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

const APIManager = new APIHandler();

class ListOfStopPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            line: this.props.navigation.getParam('line'),
            blocTitleStyle: {
                backgroundColor: this.props.navigation.getParam('line').bgColor,
            },
            titleStyle: {
                color: this.props.navigation.getParam('line').color,
            },
        };
        
    }

    toTheTimeTablePage(item) {
        console.log(JSON.stringify(item, null, 4))
        this.props.navigation.navigate('TimeTablePage',{stop:item,line:this.state.line})
    }

    render(){
        return(
            <View style={[styles.container]}>
                <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}} style={{width:screenWidth}}>
                    <View style={{flexDirection:'row',height:100,backgroundColor:'#000',width:500}}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                            <View style={styles.returnButton} >
                                <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.body}>
                        <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                            <View style={[styles.searchBar,this.state.blocTitleStyle,{alignItems: 'center',justifyContent: 'center'}]}>
                                <Text style={[this.state.titleStyle,{fontWeight: 'bold',fontSize: 18,padding: 10,}]}>{this.state.line.name}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Liste des arrêts (A-Z)</Text>
                        <View style={styles.resultCardBox}>
                            <View style={[styles.card,styles.resultCard]}>
                                <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.line.stopList.stop} renderItem={({item}) => 
                                        <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.toTheTimeTablePage(item)}>
                                            <View style={styles.resultItem}>
                                                <Text style={styles.resultItemText}>{item.name}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>
                        
                    </View> 
                </ScrollView>
            </View>
        )
    }
}
export default ListOfStopPage;