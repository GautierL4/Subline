import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Platform, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import FileLoader from './FileLoader.js';
import APIHandler from '../API/APIHandler.js';
import APIGoogle from '../API/APIGoogle';
import Dropdown from '../Views/Dropdown';
import { BackButton, ReloadButton, ReverseButton } from '../Elements/buttons'
import BusIcon from '../Elements/BusIcon'

const APIManager = new APIHandler();
const APIGoogleManager = new APIGoogle()
const IconLoader = new FileLoader();

class DisplayJourneysPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departure: this.props.navigation.getParam('departure', {
                id: null,
                name: "Position actuelle",
                address: null,
            }),
            destination: this.props.navigation.getParam('destination', {
                id: null,
                name: "Destination",
            }),
            savedParams: this.props.navigation.getParam('savedParams'),
            isLoading: true,
        };
        this.handlerReload = this.handlerReload.bind(this)
        this.handlerReverse = this.handlerReverse.bind(this)
    }

    componentDidMount() {
        console.log("get data from API");
        console.log(this.state.departure)
        this.searchJourney();
    }

    async searchJourney() {
        try {
            data = await APIManager.getJourneys(this.state.departure.id, this.state.destination.id);
        }
        catch (e) {
            console.error(e);
        }
        dataBestJourney = data.shift()
        this.setState({ dataBestJourney: dataBestJourney, dataOtherJourneys: data, isLoading: false });

    }

    convertSecondsToMinutes(seconds) {
        var minutes = Math.floor(seconds / 60);
        return minutes;
    }

    displayJourneyDetails(journey) {
        this.props.navigation.navigate('JourneyPage',
            {
                journeyData: journey,
            });
    }

    setAddress() {
        test = this.state.departure
        // console.log(test.address.address_components[0].long_name)
    }

    handlerReload() {
        this.setState({
            isLoading: true
        }, () => this.searchJourney())

    }

    handlerReverse() {
        let { departure, destination } = this.state
        this.setState({
            isLoading: true,
            departure: destination,
            destination: departure,
            savedParams: {
                departure: destination,
                destination: departure
            }
        }, () => this.searchJourney())

    }

    render() {
        this.setAddress()

        const _renderSeparator = () => (
            <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
        )

        if (this.state.isLoading) {
            return (
                <View style={{ width: screenWidth, height: screenHeight, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                    <Image style={{ width: 80, height: 80, }} source={require('../../assets/icons/loading-start.gif')} />
                </View>
            );
        }
        else if (Platform.OS === 'android') {
            return (
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }} style={{ width: screenWidth }}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center', }}>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <BackButton navigation={this.props.navigation} />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', }}>
                                    <ReloadButton handler={this.handlerReload} />
                                </View>
                            </View>
                            <View style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ alignSelf: 'stretch', flex: 0.9, flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', flex: 0.9, alignSelf: 'stretch' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DepartureSearchPage', { type: 'departure', placeholder: 'Point de départ', savedParams: this.state.savedParams })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                                <View style={[styles.searchBar, { flex: 1 }]}>
                                                    <Image source={require('../../assets/icons/map-location.png')} style={styles.ImageStyle} />
                                                    {this.state.departure.address !== undefined ?
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.input, { padding: 0 }]}>{this.state.departure.name}</Text>
                                                            <Text style={{ fontSize: 11, color: "#BBBBBB", fontWeight: 'bold', marginTop: -20 }}>{this.state.departure.address.address_components[0].long_name}</Text>
                                                        </View>
                                                        :
                                                        <Text style={styles.input}>{this.state.departure.name}</Text>
                                                    }
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                                            <TouchableWithoutFeedback onPress={() => this.props.navigation.replace('SearchPage', { type: "destination", savedParams: this.state.savedParams })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                                <View style={[styles.searchBar, { flex: 1 }]}>
                                                    <Image source={require('../../assets/icons/target.png')} style={styles.ImageStyle} />
                                                    {this.state.destination.address !== undefined ?
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.input, { padding: 0 }]}>{this.state.destination.name}</Text>
                                                            <Text style={{ fontSize: 11, color: "#BBBBBB", fontWeight: 'bold', marginTop: -20 }}>{this.state.destination.address.address_components[0].long_name}</Text>
                                                        </View>
                                                        :
                                                        <Text style={styles.input}>{this.state.destination.name}</Text>
                                                    }

                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 0.1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                                        <ReverseButton handler={this.handlerReverse} />
                                    </View>
                                </View>
                            </View>
                            <Dropdown />
                        </View>
                        <View style={styles.body}>

                            <Text style={styles.title}>Meilleur itinéraire</Text>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback onPress={() => this.displayJourneyDetails(this.state.dataBestJourney)} >
                                    <View style={[styles.card, styles.mapCard, { flexDirection: 'column' }]}>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', marginLeft: 20, marginRight: 20 }}>
                                            <Text style={{ color: "#898989", fontSize: 14, textAlign: 'left', alignSelf: 'flex-start', fontWeight: 'bold', marginBottom: 5 }}>Départ à {this.state.dataBestJourney.departure_date_time.substring(9, 11)}:{this.state.dataBestJourney.departure_date_time.substring(11, 13)}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                                                    <FlatList style={{ flexWrap: 'wrap', flex: 1, }} data={this.state.dataBestJourney.sections_without_waiting_and_transfer} horizontal={true} ItemSeparatorComponent={_renderSeparator} renderItem={({ item }) => {
                                                        let icon = IconLoader.getIconBySection(item);
                                                        if (item.display_informations !== undefined && (item.display_informations.physical_mode === 'Bus' || item.display_informations.commercial_mode === 'Bus')) {
                                                            return (
                                                                <BusIcon lineName={item.display_informations.label} style={{ marginTop: 4 }} />
                                                            )
                                                        } else {
                                                            return (
                                                                <Image style={styles.journeyCardBottomImg} source={icon} />
                                                            )
                                                        }
                                                    }
                                                    } keyExtractor={(item, index) => index.toString()} />
                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{this.convertSecondsToMinutes(this.state.dataBestJourney.duration)}</Text>
                                                    <Text style={{ fontSize: 12, marginTop: 8, marginLeft: 5 }}>min</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <Text style={styles.title}>Autres itinéraires</Text>
                            <View style={styles.mapCardBox}>
                                <View style={[styles.card, styles.mapCard, { flexDirection: 'row', paddingTop: 0, paddingBottom: 0, marginBottom: 50 }]}>
                                    <FlatList style={{ flex: 1 }} data={this.state.dataOtherJourneys} keyboardShouldPersistTaps={'handled'} ItemSeparatorComponent={() => <View style={{ borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, }} />} renderItem={({ item }) =>
                                        <TouchableNativeFeedback onPress={() => this.displayJourneyDetails(item)} >
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, }}>
                                                <Text style={{ color: "#898989", fontSize: 14, textAlign: 'left', alignSelf: 'flex-start', fontWeight: 'bold', marginBottom: 5 }}>Départ à {item.departure_date_time.substring(9, 11)}:{item.departure_date_time.substring(11, 13)}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                                                        <FlatList style={{ flexWrap: 'wrap', flex: 1, }} data={item.sections_without_waiting_and_transfer} horizontal={true} ItemSeparatorComponent={_renderSeparator} renderItem={({ item }) => {
                                                            let icon = IconLoader.getIconBySection(item);
                                                            if (item.display_informations !== undefined && (item.display_informations.physical_mode === 'Bus' || item.display_informations.commercial_mode === 'Bus')) {
                                                                return (
                                                                    <BusIcon lineName={item.display_informations.label} style={{ marginTop: 4 }} />
                                                                )
                                                            } else {
                                                                return (
                                                                    <Image style={styles.journeyCardBottomImg} source={icon} />
                                                                )
                                                            }
                                                        }
                                                        } keyExtractor={(item, index) => index.toString()} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{this.convertSecondsToMinutes(item.duration)}</Text>
                                                        <Text style={{ fontSize: 12, marginTop: 8, marginLeft: 5 }}>min</Text>
                                                    </View>
                                                </View>
                                                <Text style={{ color: "#898989", fontSize: 14, textAlign: 'left', alignSelf: 'flex-start', marginTop: 5 }}>{APIManager.translateType(item.type)}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    } keyExtractor={(item, index) => index.toString()} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View >
            )
        } else {

            return (
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }} style={{ width: screenWidth }}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center' }}>
                                <View style={{ flex: 0.9, flexDirection: 'row', }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                            <View style={styles.buttonTop} >
                                                <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomePage')}>
                                            <View style={styles.buttonTop} >
                                                <Image style={styles.returnArrow} source={require('../../assets/icons/inverse.png')} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('DepartureSearchPage', { type: 'departure', placeholder: 'Point de départ', savedParams: this.state.savedParams })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../assets/icons/map-location.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>{this.state.departure.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.replace('SearchPage', { type: "destination", savedParams: this.state.savedParams })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../assets/icons/target.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>{this.state.destination.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>


                        </View>
                        <View style={styles.body}>
                            {this.renderBestJourney()}
                            <Text style={styles.title}>Autres itinéraires</Text>
                            <View style={styles.mapCardBox}>
                                <View style={[styles.card, styles.mapCard, { flexDirection: 'column' }]}>
                                    <TouchableOpacity style={{ flexDirection: 'column', alignSelf: 'stretch', borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, paddingTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERAgenRVB.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/walk.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <View style={styles.busCard}>
                                                    <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                                                    <Text style={styles.busCardTxt}>95-01</Text>
                                                </View>
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/M7bisgenRVB.png')} />
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 24, fontWeight: "bold" }}>14</Text>
                                                <Text style={{ fontSize: 12, marginTop: 9, marginLeft: 5 }}>min</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#898989' }}>Le moins de marche à pied</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'column', alignSelf: 'stretch', borderBottomColor: '#e5e5e5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20, paddingTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERBgenRVB.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/lines/RERAgenRVB.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <Image style={styles.journeyCardBottomImg} source={require('../../assets/icons/walk.png')} />
                                                <Image style={styles.journeyCardBottomImgDot} source={require('../../assets/icons/dot.png')} />
                                                <View style={styles.busCard}>
                                                    <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
                                                    <Text style={styles.busCardTxt}>95-01</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 24, fontWeight: "bold" }}>14</Text>
                                                <Text style={{ fontSize: 12, marginTop: 9, marginLeft: 5 }}>min</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#898989', }}>Le moins de correspondance</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default DisplayJourneysPage;