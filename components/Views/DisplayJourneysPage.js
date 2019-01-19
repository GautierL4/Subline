import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TimePickerAndroid, DatePickerAndroid, Platform, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, ScrollView, Dimensions, FlatList, Picker, StatusBar, TouchableOpacity } from 'react-native';
import { styles, screenWidth, screenHeight, primaryColor } from '../../assets/styles/style';
import FileLoader from './FileLoader.js';
import APIHandler from '../API/APIHandler.js';
import APIGoogle from '../API/APIGoogle';
import { BackButton, ReloadButton, ReverseButton } from '../Elements/buttons'
import BusIcon from '../Elements/BusIcon'
import Dialog, { DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';

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
            popUpVisible: false,
            datetime: {
                type: '',
                date: {
                    day: null,
                    month: null,
                    year: null
                },
                time: {
                    hour: null,
                    minute: null,
                }
            },
            datetimeSaved: {
                type: '',
                date: {
                    day: null,
                    month: null,
                    year: null
                },
                time: {
                    hour: null,
                    minute: null,
                }
            },
        };
        this.handlerReload = this.handlerReload.bind(this)
        this.handlerReverse = this.handlerReverse.bind(this)
    }

    componentWillMount() {
        const today = new Date()
        this.setState({
            datetimeSaved: {
                type: 'now',
                date: {
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear()
                },
                time: {
                    hour: today.getHours(),
                    minute: today.getMinutes(),
                }
            }
        }, () => {
            this.setState({ datetime: this.state.datetimeSaved })
        })
    }

    componentDidMount() {
        console.log("get data from API");
        console.log(this.state.departure)
        this.searchJourney();
    }

    async searchJourney() {
        try {
            data = await APIManager.getJourneys(this.state.departure.id, this.state.destination.id, this.state.datetimeSaved, this.state.datetimeSaved.type);
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

    stringifyDate(date) {
        let { year, month, day } = date
        let monthString = ''
        switch (month) {
            case 1:
                monthString = 'Janvier'
                break
            case 2:
                monthString = 'Février'
                break
            case 3:
                monthString = 'Mars'
                break
            case 4:
                monthString = 'Avril'
                break
            case 5:
                monthString = 'Mai'
                break
            case 6:
                monthString = 'Juin'
                break
            case 7:
                monthString = 'Juillet'
                break
            case 8:
                monthString = 'Août'
                break
            case 9:
                monthString = 'Septembre'
                break
            case 10:
                monthString = 'Octobre'
                break
            case 11:
                monthString = 'Novembre'
                break
            case 12:
                monthString = 'Décembre'
                break
            default:
                monthString = ''
                break
        }
        return day + ' ' + monthString + ' ' + year
    }

    stringifyTime(time) {
        let { hour, minute } = time
        hour = hour.toString().padStart(2, '0')
        minute = minute.toString().padStart(2, '0')
        return hour + ':' + minute
    }

    async chooseDate() {
        let date = null
        let type = this.state.datetime.type === 'now' ? 'departure' : this.state.datetime.type
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                minDate: new Date(),
            })
            date = {
                day: day,
                month: month + 1,
                year: year,
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
        this.setState({
            datetime: {
                type,
                date,
                time: this.state.datetime.time
            },
        });
    }

    async chooseTime() {
        let time = null
        let type = this.state.datetime.type === 'now' ? 'departure' : this.state.datetime.type
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({});
            time = {
                hour: hour,
                minute: minute
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
        this.setState({
            datetime: {
                type,
                date: this.state.datetime.date,
                time
            },
        })
    }

    saveDateTimeAndClose() {
        this.setState({ datetimeSaved: this.state.datetime }, () => {
            this.closePopUp()
            this.searchJourney()
        })
    }

    closePopUp() {
        this.setState({ popUpVisible: false })
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
                            {/* <Dropdown /> */}
                        </View>
                        <View style={styles.body}>
                            <Dialog
                                visible={this.state.popUpVisible}
                                onTouchOutside={() => this.setState({ popUpVisible: false })}
                                width={0.9}
                                actions={[
                                    <DialogButton
                                        textStyle={{ color: '#AAA', fontSize: 14 }}
                                        text="Fermer"
                                        onPress={() => { this.closePopUp() }}
                                    />,
                                    <DialogButton
                                        textStyle={{ color: primaryColor, fontSize: 14 }}
                                        text="OK"
                                        onPress={() => { this.saveDateTimeAndClose() }}
                                    />,
                                ]}>
                                <DialogTitle title="Date et heure" />
                                <DialogContent>
                                    <View style={{ height: 100, flexDirection: 'column' }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Picker
                                                mode='dropdown'
                                                selectedValue={this.state.datetime.type}
                                                onValueChange={(itemValue, itemIndex) => this.setState({ datetime: { type: itemValue, date: this.state.datetime.date, time: this.state.datetime.time } })}>
                                                <Picker.Item label="Partir maintenant" value="now" />
                                                <Picker.Item label="Partir à" value="departure" />
                                                <Picker.Item label="Arriver à" value="arrival" />
                                            </Picker>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{flex: 0.9, flexDirection: 'row'}}>
                                                <View style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                    <TouchableNativeFeedback onPress={() => this.chooseDate()}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.stringifyDate(this.state.datetime.date)}</Text>
                                                    </TouchableNativeFeedback>
                                                </View>
                                                <View style={{ flex: 0.4, alignItems: 'flex-end', justifyContent: 'center' }}>
                                                    <TouchableNativeFeedback onPress={() => this.chooseTime()} >
                                                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.stringifyTime(this.state.datetime.time)}</Text>
                                                    </TouchableNativeFeedback>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </DialogContent>
                            </Dialog>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -15 }}>
                                <TouchableNativeFeedback onPress={() => this.setState({ popUpVisible: true })}>
                                    <View style={[styles.card, { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }]}>
                                        <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Départ maintenant</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
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