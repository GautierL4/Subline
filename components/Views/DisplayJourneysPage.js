import React from 'react';
import {
  Text,
  View,
  Image,
  TimePickerAndroid,
  DatePickerAndroid,
  Platform,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Picker,
  TouchableOpacity
} from 'react-native';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { Rect } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import { styles, screenWidth, screenHeight, primaryColor } from '../../assets/styles/style';
import FileLoader from './FileLoader';
import APIHandler from '../API/APIHandler';
import { BackButton, ReloadButton, ReverseButton } from '../Elements/buttons';
import BusIcon from '../Elements/BusIcon';

const APIManager = new APIHandler();
const IconLoader = new FileLoader();

/**
 * Class representing the page that contains the list of journeys
 *
 * @class DisplayJourneysPage
 * @extends {React.Component}
 */
class DisplayJourneysPage extends React.Component {
  /**
   * Creates an instance of DisplayJourneysPage.
   *
   * @param {*} props
   * @memberof DisplayJourneysPage
   */
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      departure: navigation.getParam('departure', {
        id: null,
        name: 'Position actuelle',
        address: null
      }),
      destination: navigation.getParam('destination', {
        id: null,
        name: 'Destination'
      }),
      savedParams: navigation.getParam('savedParams'),
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
          minute: null
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
          minute: null
        }
      }
    };
    this.handlerReload = this.handlerReload.bind(this);
    this.handlerReverse = this.handlerReverse.bind(this);
  }

  componentWillMount() {
    const today = new Date();
    this.setState(
      {
        datetimeSaved: {
          type: 'now',
          date: {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
          },
          time: {
            hour: today.getHours(),
            minute: today.getMinutes()
          }
        }
      },
      () => {
        const { datetimeSaved } = this.state;
        this.setState({ datetime: datetimeSaved });
      }
    );
  }

  componentDidMount() {
    this.searchJourney();
  }

  /**
   * Search journeys with the departure location, destination location and when. Save the results in the state.
   *
   * @memberof DisplayJourneysPage
   */
  async searchJourney() {
    const { departure, destination, datetimeSaved } = this.state;
    let data = null;
    try {
      data = await APIManager.getJourneys(
        departure.id,
        destination.id,
        datetimeSaved,
        datetimeSaved.type
      );
    } catch (e) {
      console.error(e);
    }
    const dataBestJourney = data.shift();
    this.setState({ dataBestJourney, dataOtherJourneys: data, isLoading: false });
  }

  /**
   * Convert seconds to minutes.
   *
   * @param {number} seconds
   * @returns {number} minutes
   * @memberof DisplayJourneysPage
   */
  convertSecondsToMinutes(seconds) {
    return Math.floor(seconds / 60);
  }

  /**
   * Navigate to the page 'JourneyPage' to see all informations about the journey.
   *
   * @param {Object} journey
   * @memberof DisplayJourneysPage
   */
  displayJourneyDetails(journey) {
    const { navigation } = this.props;
    navigation.navigate('JourneyPage', {
      journeyData: journey
    });
  }

  /**
   * Re-search the journeys.
   *
   * @memberof DisplayJourneysPage
   */
  handlerReload() {
    this.setState(
      {
        isLoading: true
      },
      () => this.searchJourney()
    );
  }

  /**
   * Switch departure location with destination location and re-search.
   *
   * @memberof DisplayJourneysPage
   */
  handlerReverse() {
    const { departure, destination } = this.state;
    this.setState(
      {
        isLoading: true,
        departure: destination,
        destination: departure,
        savedParams: {
          departure: destination,
          destination: departure
        }
      },
      () => this.searchJourney()
    );
  }

  /**
   *
   *
   * @param {Object} date
   * @returns {string} French date.
   * @memberof DisplayJourneysPage
   */
  stringifyDate(date) {
    const { year, month, day } = date;
    let monthString = '';
    switch (month) {
      case 1:
        monthString = 'Janvier';
        break;
      case 2:
        monthString = 'Février';
        break;
      case 3:
        monthString = 'Mars';
        break;
      case 4:
        monthString = 'Avril';
        break;
      case 5:
        monthString = 'Mai';
        break;
      case 6:
        monthString = 'Juin';
        break;
      case 7:
        monthString = 'Juillet';
        break;
      case 8:
        monthString = 'Août';
        break;
      case 9:
        monthString = 'Septembre';
        break;
      case 10:
        monthString = 'Octobre';
        break;
      case 11:
        monthString = 'Novembre';
        break;
      case 12:
        monthString = 'Décembre';
        break;
      default:
        monthString = '';
        break;
    }
    return `${day} ${monthString} ${year}`;
  }

  /**
   *
   *
   * @param {Object} time
   * @returns {string} Hour and minute.
   * @memberof DisplayJourneysPage
   */
  stringifyTime(time) {
    let { hour, minute } = time;
    hour = hour.toString().padStart(2, '0');
    minute = minute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  /**
   * Display the datepicker and save the chosen date to state.
   *
   * @memberof DisplayJourneysPage
   */
  async chooseDate() {
    let date = null;
    const { datetime } = this.state;
    const type = datetime.type === 'now' ? 'departure' : datetime.type;
    try {
      const { year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date()
      });
      date = {
        day,
        month: month + 1,
        year
      };
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
    this.setState({
      datetime: {
        type,
        date,
        time: datetime.time
      }
    });
  }

  /**
   * Display the timepicker and save the chosen time to state.
   *
   * @memberof DisplayJourneysPage
   */
  async chooseTime() {
    let time = null;
    const { datetime } = this.state;
    const type = datetime.type === 'now' ? 'departure' : datetime.type;
    try {
      const { hour, minute } = await TimePickerAndroid.open({});
      time = {
        hour,
        minute
      };
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
    this.setState({
      datetime: {
        type,
        date: datetime.date,
        time
      }
    });
  }

  /**
   * Save the date, the time and the type to another state, close the pop-up and re-search.
   *
   * @memberof DisplayJourneysPage
   */
  saveDateTimeAndClose() {
    const { datetime } = this.state;
    this.setState({ datetimeSaved: datetime }, () => {
      this.closePopUp();
      this.searchJourney();
    });
  }

  /**
   * Close the pop-up.
   *
   * @memberof DisplayJourneysPage
   */
  closePopUp() {
    this.setState({ popUpVisible: false });
  }

  /**
   * Display the page.
   *
   * @returns
   * @memberof DisplayJourneysPage
   */
  render() {
    const {
      isLoading,
      savedParams,
      departure,
      destination,
      popUpVisible,
      datetime,
      dataBestJourney,
      dataOtherJourneys
    } = this.state;
    const { navigation } = this.props;
    const renderSeparator = () => (
      <Image
        style={styles.journeyCardBottomImgDot}
        source={require('../../assets/icons/dot.png')}
      />
    );
    if (isLoading) {
      return (
        <View style={styles.container}>
          <View style={{ width: screenWidth, flex: 1 }}>
            <View style={styles.header} />
            <View style={styles.body}>
              <ContentLoader
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
                width={screenWidth}
                height={screenHeight}
              >
                <Rect x="10" y="40" rx="5" ry="5" width="150" height="25" />
                <Rect x="20" y="80" rx="5" ry="5" width={screenWidth - 40} height="75" />
                <Rect x="10" y="170" rx="5" ry="5" width="150" height="25" />
                <Rect x="20" y="210" rx="5" ry="5" width={screenWidth - 40} height="75" />
                <Rect x="20" y="300" rx="5" ry="5" width={screenWidth - 40} height="75" />
                <Rect x="20" y="390" rx="5" ry="5" width={screenWidth - 40} height="75" />
              </ContentLoader>
            </View>
          </View>
        </View>
      );
    }
    if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          <ScrollView
            horizontal={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ width: screenWidth }}
          >
            <View style={styles.header}>
              <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <BackButton navigation={navigation} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                  <ReloadButton handler={this.handlerReload} />
                </View>
              </View>
              <View
                style={{
                  alignSelf: 'stretch',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View style={{ alignSelf: 'stretch', flex: 0.9, flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'column', flex: 0.9, alignSelf: 'stretch' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate('DepartureSearchPage', {
                            type: 'departure',
                            placeholder: 'Point de départ',
                            savedParams
                          })
                        }
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 5
                        }}
                      >
                        <View style={[styles.searchBar, { flex: 1 }]}>
                          <Image
                            source={require('../../assets/icons/map-location.png')}
                            style={styles.ImageStyle}
                          />
                          {departure.address !== undefined ? (
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.input, { padding: 0 }]}>{departure.name}</Text>
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: '#BBBBBB',
                                  fontWeight: 'bold',
                                  marginTop: -20
                                }}
                              >
                                {departure.address.address_components[0].long_name}
                              </Text>
                            </View>
                          ) : (
                            <Text style={styles.input}>{departure.name}</Text>
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 15
                      }}
                    >
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.replace('SearchPage', {
                            type: 'destination',
                            savedParams
                          })
                        }
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 5
                        }}
                      >
                        <View style={[styles.searchBar, { flex: 1 }]}>
                          <Image
                            source={require('../../assets/icons/target.png')}
                            style={styles.ImageStyle}
                          />
                          {destination.address !== undefined ? (
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.input, { padding: 0 }]}>{destination.name}</Text>
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: '#BBBBBB',
                                  fontWeight: 'bold',
                                  marginTop: -20
                                }}
                              >
                                {destination.address.address_components[0].long_name}
                              </Text>
                            </View>
                          ) : (
                            <Text style={styles.input}>{destination.name}</Text>
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 0.1,
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ReverseButton handler={this.handlerReverse} />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <Dialog
                visible={popUpVisible}
                onTouchOutside={() => this.setState({ popUpVisible: false })}
                width={0.9}
              >
                <DialogTitle title="Date et heure" />
                <DialogContent>
                  <View style={{ height: 130, flexDirection: 'column' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Picker
                        mode="dropdown"
                        selectedValue={datetime.type}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({
                            datetime: {
                              type: itemValue,
                              date: datetime.date,
                              time: datetime.time
                            }
                          })
                        }
                      >
                        <Picker.Item label="Partir maintenant" value="now" />
                        <Picker.Item label="Partir à" value="departure" />
                        <Picker.Item label="Arriver à" value="arrival" />
                      </Picker>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <View style={{ flex: 0.9, flexDirection: 'row' }}>
                        <View
                          style={{ flex: 0.6, alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                          <TouchableNativeFeedback onPress={() => this.chooseDate()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                              {this.stringifyDate(datetime.date)}
                            </Text>
                          </TouchableNativeFeedback>
                        </View>
                        <View
                          style={{ flex: 0.4, alignItems: 'flex-end', justifyContent: 'center' }}
                        >
                          <TouchableNativeFeedback onPress={() => this.chooseTime()}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                              {this.stringifyTime(datetime.time)}
                            </Text>
                          </TouchableNativeFeedback>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        marginTop: 20
                      }}
                    >
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableNativeFeedback onPress={() => this.closePopUp()}>
                          <Text style={{ color: '#AAA', fontWeight: 'bold' }}>Fermer</Text>
                        </TouchableNativeFeedback>
                      </View>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableNativeFeedback onPress={() => this.saveDateTimeAndClose()}>
                          <Text style={{ color: primaryColor, fontWeight: 'bold' }}>Valider</Text>
                        </TouchableNativeFeedback>
                      </View>
                    </View>
                  </View>
                </DialogContent>
              </Dialog>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  top: -15
                }}
              >
                <TouchableNativeFeedback onPress={() => this.setState({ popUpVisible: true })}>
                  <View
                    style={[
                      styles.card,
                      {
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        flexDirection: 'row'
                      }
                    ]}
                  >
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
                      {`Départ maintenant`}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <Text style={styles.title}>Meilleur itinéraire</Text>
              <View style={styles.mapCardBox}>
                <TouchableNativeFeedback
                  onPress={() => this.displayJourneyDetails(dataBestJourney)}
                >
                  <View style={[styles.card, styles.mapCard, { flexDirection: 'column' }]}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        marginLeft: 20,
                        marginRight: 20
                      }}
                    >
                      <Text
                        style={{
                          color: '#898989',
                          fontSize: 14,
                          textAlign: 'left',
                          alignSelf: 'flex-start',
                          fontWeight: 'bold',
                          marginBottom: 5
                        }}
                      >
                        {`Départ à ${dataBestJourney.departure_date_time.substring(
                          9,
                          11
                        )}:${dataBestJourney.departure_date_time.substring(11, 13)}`}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flex: 3,
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                          }}
                        >
                          <FlatList
                            style={{ flexWrap: 'wrap', flex: 1 }}
                            data={dataBestJourney.sections_without_waiting_and_transfer}
                            horizontal
                            ItemSeparatorComponent={renderSeparator}
                            renderItem={({ item }) => {
                              const icon = IconLoader.getIconBySection(item);
                              if (
                                item.display_informations !== undefined &&
                                (item.display_informations.physical_mode === 'Bus' ||
                                  item.display_informations.commercial_mode === 'Bus')
                              ) {
                                return (
                                  <BusIcon
                                    lineName={item.display_informations.label}
                                    style={{ marginTop: 4 }}
                                  />
                                );
                              }
                              return <Image style={styles.journeyCardBottomImg} source={icon} />;
                            }}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          }}
                        >
                          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            {this.convertSecondsToMinutes(dataBestJourney.duration)}
                          </Text>
                          <Text style={{ fontSize: 12, marginTop: 8, marginLeft: 5 }}>min</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <Text style={styles.title}>Autres itinéraires</Text>
              <View style={styles.mapCardBox}>
                <View
                  style={[
                    styles.card,
                    styles.mapCard,
                    { flexDirection: 'row', paddingTop: 0, paddingBottom: 0, marginBottom: 50 }
                  ]}
                >
                  <FlatList
                    style={{ flex: 1 }}
                    data={dataOtherJourneys}
                    keyboardShouldPersistTaps="handled"
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          borderBottomColor: '#e5e5e5',
                          borderBottomWidth: 1,
                          marginLeft: 20,
                          marginRight: 20
                        }}
                      />
                    )}
                    renderItem={({ item }) => (
                      <TouchableNativeFeedback onPress={() => this.displayJourneyDetails(item)}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: '#898989',
                              fontSize: 14,
                              textAlign: 'left',
                              alignSelf: 'flex-start',
                              fontWeight: 'bold',
                              marginBottom: 5
                            }}
                          >
                            {`Départ à ${item.departure_date_time.substring(
                              9,
                              11
                            )}:${item.departure_date_time.substring(11, 13)}`}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <View
                              style={{
                                flex: 3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                              }}
                            >
                              <FlatList
                                style={{ flexWrap: 'wrap', flex: 1 }}
                                data={item.sections_without_waiting_and_transfer}
                                horizontal
                                ItemSeparatorComponent={renderSeparator}
                                renderItem={({ item }) => {
                                  const icon = IconLoader.getIconBySection(item);
                                  if (
                                    item.display_informations !== undefined &&
                                    (item.display_informations.physical_mode === 'Bus' ||
                                      item.display_informations.commercial_mode === 'Bus')
                                  ) {
                                    return (
                                      <BusIcon
                                        lineName={item.display_informations.label}
                                        style={{ marginTop: 4 }}
                                      />
                                    );
                                  }
                                  return (
                                    <Image style={styles.journeyCardBottomImg} source={icon} />
                                  );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                              />
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                              }}
                            >
                              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                {this.convertSecondsToMinutes(item.duration)}
                              </Text>
                              <Text style={{ fontSize: 12, marginTop: 8, marginLeft: 5 }}>min</Text>
                            </View>
                          </View>
                          <Text
                            style={{
                              color: '#898989',
                              fontSize: 14,
                              textAlign: 'left',
                              alignSelf: 'flex-start',
                              marginTop: 5
                            }}
                          >
                            {APIManager.translateType(item.type)}
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: screenWidth }}
        >
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center' }}>
              <View style={{ flex: 0.9, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('HomePage')}>
                    <View style={styles.buttonTop}>
                      <Image
                        style={styles.returnArrow}
                        source={require('../../assets/icons/go-back-left-arrow.png')}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('HomePage')}>
                    <View style={styles.buttonTop}>
                      <Image
                        style={styles.returnArrow}
                        source={require('../../assets/icons/inverse.png')}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('DepartureSearchPage', {
                    type: 'departure',
                    placeholder: 'Point de départ',
                    savedParams
                  })
                }
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5
                }}
              >
                <View style={styles.searchBar}>
                  <Image
                    source={require('../../assets/icons/map-location.png')}
                    style={styles.ImageStyle}
                  />
                  <Text style={styles.input}>{departure.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15
              }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.replace('SearchPage', {
                    type: 'destination',
                    savedParams
                  })
                }
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5
                }}
              >
                <View style={styles.searchBar}>
                  <Image
                    source={require('../../assets/icons/target.png')}
                    style={styles.ImageStyle}
                  />
                  <Text style={styles.input}>{destination.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.body}>
            {this.renderBestJourney()}
            <Text style={styles.title}>Autres itinéraires</Text>
            <View style={styles.mapCardBox}>
              <View style={[styles.card, styles.mapCard, { flexDirection: 'column' }]}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    borderBottomColor: '#e5e5e5',
                    borderBottomWidth: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    paddingTop: 10
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/RERBgenRVB.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/RERAgenRVB.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/walk.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <View style={styles.busCard}>
                        <Image
                          source={require('../../assets/icons/icon_bus.png')}
                          style={styles.busCardImgBus}
                        />
                        <Text style={styles.busCardTxt}>95-01</Text>
                      </View>
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/M7bisgenRVB.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/M7bisgenRVB.png')}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>14</Text>
                      <Text style={{ fontSize: 12, marginTop: 9, marginLeft: 5 }}>min</Text>
                    </View>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, color: '#898989' }}>
                      {`Le moins de marche à pied`}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    borderBottomColor: '#e5e5e5',
                    borderBottomWidth: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    paddingTop: 10
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/RERBgenRVB.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/lines/RERAgenRVB.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImg}
                        source={require('../../assets/icons/walk.png')}
                      />
                      <Image
                        style={styles.journeyCardBottomImgDot}
                        source={require('../../assets/icons/dot.png')}
                      />
                      <View style={styles.busCard}>
                        <Image
                          source={require('../../assets/icons/icon_bus.png')}
                          style={styles.busCardImgBus}
                        />
                        <Text style={styles.busCardTxt}>95-01</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    >
                      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>14</Text>
                      <Text style={{ fontSize: 12, marginTop: 9, marginLeft: 5 }}>min</Text>
                    </View>
                  </View>
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, color: '#898989' }}>
                      {`Le moins de correspondance`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default DisplayJourneysPage;
