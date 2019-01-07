import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList, AsyncStorage, Easing } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';
import PartOfJourney from '../Views/PartOfJourney';
import { BackButton, FavoriteButton, AlarmButton } from '../Elements/buttons'

const APIManager = new APIHandler();

class JourneyPage extends React.Component {

    constructor(props) {
        super(props)
        this.journeyData = this.props.navigation.getParam('journeyData')
        // this.state = {
        //     handleOnNavigateBack: this.props.navigation.getParam('onNavigateBack')
        // }
        this.RotateValueHolder = new Animated.Value(0);

    }


    StartImageRotateFunction() {

        this.RotateValueHolder.setValue(0)

        Animated.timing(
            this.RotateValueHolder,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start()
    }

    async addBookmark() {
        await AsyncStorage.setItem('key', 'Je stock ça ici');
    }

    convertSecondsToMinutes(seconds) {
        var minutes = Math.floor(seconds / 60);
        return minutes;
    }

    refresh() {
        console.log('ehehe')
        this.StartImageRotateFunction();
    }

    roundDecimal(value, precision){
        var precision = precision || 2;
        var tmp = Math.pow(10, precision);
        return Math.round( value*tmp )/tmp;
    }


    render() {

        // const RotateData = this.RotateValueHolder.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ['0deg', '-360deg']
        // })

        return (
            <View style={styles.container}>
                <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }} style={{ width: screenWidth }}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center', }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <BackButton navigation={this.props.navigation} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', }}>
                                <FavoriteButton dataJourney={this.journeyData} />
                                {/* <AlarmButton /> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 70, fontWeight: 'bold' }}>{this.convertSecondsToMinutes(this.journeyData.duration)}</Text>
                            <Text style={{ color: '#ffffff', fontSize: 30, marginTop: 30 }}>min</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -15 }}>
                            <View style={[styles.card, { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }]}>
                                <Image style={{ width: 17, height: 17 }} source={require('../../assets/icons/walk.png')} />
                                <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>{this.convertSecondsToMinutes(this.journeyData.durations.walking)} min</Text>
                            </View>
                            <View style={[styles.card, { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginLeft: 10 }]}>
                                <Image style={{ width: 17, height: 17 }} source={require('../../assets/icons/carbon-dioxide.png')} />
                                <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>{this.roundDecimal(this.journeyData.co2_emission.value,2) + " " + this.journeyData.co2_emission.unit} </Text>
                            </View>
                        </View>
                        {/* <Text style={styles.title}>Carte</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <View style={[styles.card, { flex: 0.9, flexDirection: 'column' }]}>
                                <TouchableNativeFeedback onPress={() => console.log('test touch')}>
                                    <View style={{ height: 110, flex: 1 }} ></View>
                                </TouchableNativeFeedback>
                            </View>
                        </View> */}
                        <Text style={styles.title}>Itinéraire</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                            <View style={[styles.card, { flex: 0.9, flexDirection: 'column' }]}>
                                <FlatList data={this.journeyData.sections} ItemSeparatorComponent={() => <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, }} />} renderItem={({ item }) => {
                                    return (
                                        <PartOfJourney sectionData={item} />
                                    )
                                }
                                } keyExtractor={(item, index) => index.toString()} />

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default JourneyPage;