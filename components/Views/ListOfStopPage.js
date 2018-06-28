import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';

class ListOfStopPage extends React.Component {

    

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
                            <View style={[styles.searchBar,{alignItems: 'center',justifyContent: 'center',backgroundColor:'#70BD88'}]}>
                                <Text style={{color: "#000000",fontWeight: 'bold',fontSize: 18,padding: 10,}}>Rer b</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Liste des arrêts</Text>
                        <View style={styles.resultCardBox}>
                            <FlatList style={{flex:1,flexDirection:'column'}} data={this.state.locations.places} renderItem={({item}) => 
                                        <TouchableWithoutFeedback style={styles.resultClickable} onPress={() =>this.selectPlace(item.id,item.name)}>
                                            <View style={styles.resultItem}>
                                                <Text style={styles.resultItemText}>{item.name}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>}
                                    keyExtractor={(item, index) => index.toString} />
                        </View>
                        
                    </View> 
                </ScrollView>
            </View>
        )
    }
}
export default ListOfStopPage;