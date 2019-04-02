import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler';
import APIGoogle from '../API/APIGoogle';
import { BackButton } from '../Elements/buttons';
import FileLoader from './FileLoader';

const APIManager = new APIHandler();
const IconLoader = new FileLoader();
const APIGoogleManager = new APIGoogle();

/**
 * Class representig the search page.
 *
 * @class SearchPage
 * @extends {React.Component}
 */
class SearchPage extends React.Component {
  /**
   * Creates an instance of SearchPage.
   *
   * @param {*} props
   * @memberof SearchPage
   */
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      locations: { places: null },
      search: '',
      geoLocation: null,
      savedParams: navigation.getParam('savedParams', {
        destination: null,
        departure: null
      })
    };
    this.placeholder = navigation.getParam('placeholder', 'Votre destination');
    this.typename = navigation.getParam('type');
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  /**
   * Get the current geographic location of user.
   *
   * @memberof SearchPage
   */
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { longitude, latitude } = position.coords;
        let address = null;
        try {
          address = await APIGoogleManager.getAddressFromLocation(latitude, longitude);
        } catch (e) {
          console.error(e);
        }
        const geoLocation = {
          id: `${longitude};${latitude}`,
          name: 'Ma position',
          address
        };
        this.setState({ geoLocation });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  /**
   * Display the results for a search.
   *
   * @memberof SearchPage
   */
  async AutoCompleteResearch() {
    const { search } = this.state;
    let data = { stop_areas: null, address: null, poi: null };
    if (this.typename !== 'line') {
      try {
        data.stop_areas = await APIManager.getPlaces(search, 'stop_area');
        data.address = await APIManager.getPlaces(search, 'address');
        data.poi = await APIManager.getPlaces(search, 'poi');
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        data = await APIManager.getLines(search);
      } catch (e) {
        console.error(e);
      }
    }
    if (
      !(
        typeof data.stop_areas === 'undefined' ||
        typeof data.address === 'undefined' ||
        typeof data.poi === 'undefined'
      )
    ) {
      this.setState({ locations: data });
    }
  }

  /**
   *
   *
   * @param {*} id
   * @param {*} name
   * @memberof SearchPage
   */
  async sendFirstInputData(id, name) {
    const { geoLocation } = this.state;
    const { navigation } = this.props;
    try {
      const params = {
        departure: {
          id: geoLocation.id,
          name: geoLocation.name,
          address: geoLocation.address
        },
        destination: {
          id,
          name
        }
      };
      navigation.navigate('DisplayJourneysPage', {
        departure: params.departure,
        destination: params.destination,
        savedParams: params
      });
    } catch (e) {
      console.error(e);
    }
  }

  sendDepartureData(id, name) {
    const { savedParams } = this.state;
    const params = {
      destination: savedParams.destination,
      departure: {
        id,
        name
      }
    };
    this.redirectWithPreviousParams(params);
  }

  sendDestinationData(id, name) {
    const { savedParams } = this.state;
    const params = {
      destination: {
        id,
        name
      },
      departure: savedParams.departure
    };
    this.redirectWithPreviousParams(params);
  }

  redirectWithPreviousParams(params) {
    const { navigation } = this.props;
    navigation.replace('DisplayJourneysPage', {
      destination: params.destination,
      departure: params.departure,
      savedParams: params
    });
  }

  async sendLineData(item) {
    const params = {
      line: {
        id: item.id,
        name: item.name,
        bgColor: `#${item.bgColor}`,
        color: `#${item.color}`,
        stopList: await APIManager.getStopAreas(item.id)
      }
    };
    console.log(JSON.stringify(params, null, 4));
    this.redirectToListOfStopWithPreviousParams(params);
  }

  redirectToListOfStopWithPreviousParams(params) {
    const { navigation } = this.props;
    navigation.replace('ListOfStopPage', {
      line: params.line
    });
  }

  async selectPlace(item) {
    if (this.typename === 'firstInput') {
      this.sendFirstInputData(item.id, item.name);
    } else if (this.typename === 'departure') {
      this.sendDepartureData(item.id, item.name);
    } else if (this.typename === 'destination') {
      this.sendDestinationData(item.id, item.name);
    } else if (this.typename === 'line') {
      this.sendLineData(item);
    }
  }

  changeView(page, parameters) {
    const { navigation } = this.props;
    navigation.navigate(page, parameters);
  }

  render() {
    const { navigation } = this.props;
    const { search, locations } = this.state;
    const screenWidth = Dimensions.get('window').width;
    return (
      <KeyboardAvoidingView style={[styles.container]} behavior="padding" enabled>
        <ScrollView
          keyboardShouldPersistTaps="always"
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: screenWidth }}
        >
          <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#000', width: 500 }}>
            <BackButton navigation={navigation} />
          </View>
          <View style={styles.body}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                top: -25
              }}
            >
              <View style={styles.searchBar}>
                {search.length === 0 ? (
                  <Image
                    source={require('../../assets/icons/search.png')}
                    style={styles.ImageStyle}
                  />
                ) : (
                  <TouchableNativeFeedback onPress={() => this.setState({ search: '' })}>
                    <Image
                      source={require('../../assets/icons/close.png')}
                      style={styles.ImageStyle}
                    />
                  </TouchableNativeFeedback>
                )}
                <TextInput
                  value={search}
                  onChangeText={input =>
                    this.setState({ search: input }, () => this.AutoCompleteResearch())
                  }
                  style={styles.input}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder={this.placeholder}
                  autoFocus
                />
              </View>
            </View>
            {locations.places !== null && search !== '' ? (
              <View>
                {locations.stop_areas.places[0] !== undefined && (
                  <View>
                    <Text style={styles.title}>Arrêts / Gares</Text>
                    <View style={styles.resultCardBox}>
                      <View style={[styles.card, styles.resultCard]}>
                        <FlatList
                          style={{ flex: 1, flexDirection: 'column' }}
                          data={locations.stop_areas.places}
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
                            <TouchableNativeFeedback onPress={() => this.selectPlace(item)}>
                              <View style={styles.resultItem}>
                                <Text style={styles.resultItemText}>{item.name}</Text>
                                <FlatList
                                  horizontal
                                  data={item.commercial_modes}
                                  renderItem={({ item }) => {
                                    const icon = IconLoader.getIconForTypeOfPublicTransportation(
                                      item.name
                                    );
                                    return (
                                      <Image style={styles.journeyCardBottomImg} source={icon} />
                                    );
                                  }}
                                  keyExtractor={(item, index) => index.toString()}
                                />
                              </View>
                            </TouchableNativeFeedback>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {locations.address.places[0] !== undefined && (
                  <View>
                    <Text style={styles.title}>Adresses</Text>
                    <View style={styles.resultCardBox}>
                      <View style={[styles.card, styles.resultCard]}>
                        <FlatList
                          style={{ flex: 1, flexDirection: 'column' }}
                          data={locations.address.places}
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
                            <TouchableNativeFeedback onPress={() => this.selectPlace(item)}>
                              <View style={styles.resultItem}>
                                <Text style={styles.resultItemText}>{item.name}</Text>
                              </View>
                            </TouchableNativeFeedback>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {locations.poi.places[0] !== undefined && (
                  <View>
                    <Text style={styles.title}>Points d'intérêt</Text>
                    <View style={styles.resultCardBox}>
                      <View style={[styles.card, styles.resultCard]}>
                        <FlatList
                          style={{ flex: 1, flexDirection: 'column' }}
                          data={locations.poi.places}
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
                            <TouchableNativeFeedback onPress={() => this.selectPlace(item)}>
                              <View style={styles.resultItem}>
                                <Text style={styles.resultItemText}>{item.name}</Text>
                              </View>
                            </TouchableNativeFeedback>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View style={{ flex: 1, alignItems: 'center' }}>
                {/* <Text style={{ margin: 10, color: "#A9A9A9", fontSize: 30, marginTop: 50 }}>Aucun résultat :(</Text> */}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default SearchPage;
