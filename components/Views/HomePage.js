import React from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  Animated,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  Easing
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { styles } from '../../assets/styles/style';
import BusIcon from '../Elements/BusIcon';
import FileLoader from './FileLoader';

const IconLoader = new FileLoader();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      favoritesJourneys: [],
      scaleAnim: new Animated.Value(screenHeight + 50),
      scrollEnabled: false
    };
  }

  componentWillMount() {
    this.getFavoritesJourneys();
  }

  componentDidMount() {}

  onSelect = data => {
    this.setState(data);
  };

  async getFavoritesJourneys() {
    let value = null;
    try {
      value = await this.retrieveData();
      this.setState({ favoritesJourneys: JSON.parse(value) });
    } catch (error) {}
  }

  handleOnNavigateBack = () => {
    this.getFavoritesJourneys();
  };

  /**
   * Return the list of the 'favoriteJourneys' from phone storage.
   * @returns {string} The list of favorites from phone storage.
   * @memberof FavoriteButton
   */
  async retrieveData() {
    let value = null;
    try {
      value = await AsyncStorage.getItem('favoriteJourneys');
    } catch (error) {
      console.error('erreur 4826');
    }
    return value === null ? [] : value;
  }

  async displayBookmark() {
    const value = await AsyncStorage.getItem('key');
    console.log(value);
  }

  changeView(page, parameters) {
    const { navigation } = this.props;
    navigation.navigate(page, parameters);
  }

  displayJourneyDetails(journey) {
    const { navigation } = this.props;
    navigation.navigate('JourneyPage', {
      journeyData: journey,
      onNavigateBack: this.handleOnNavigateBack
    });
  }

  openAppAnimation() {
    const { scaleAnim } = this.state;
    Animated.timing(scaleAnim, {
      easing: Easing.elastic(1),
      toValue: 230,
      duration: 1500
    }).start();
    this.setState({
      scrollEnabled: true
    });
  }

  render() {
    const { isLoading, favoritesJourneys, scaleAnim, scrollEnabled } = this.state;
    this.displayBookmark();
    const renderSeparator = () => (
      <Image
        style={styles.journeyCardBottomImgDot}
        source={require('../../assets/icons/dot.png')}
      />
    );

    if (isLoading) {
      return (
        <Animated.View
          style={{
            backgroundColor: 'black',
            width: screenWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: scaleAnim
          }}
        >
          <LottieView
            source={require('../../assets/animation/start.json')}
            autoPlay
            duration={2000}
            loop={false}
            style={{ width: 90, height: 90 }}
            onAnimationFinish={() => this.openAppAnimation()}
          />
        </Animated.View>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={scrollEnabled}
        >
          <Animated.View
            style={[
              styles.header,
              styles.headerMax,
              { justifyContent: 'center', height: scaleAnim }
            ]}
          >
            <LottieView
              source={require('../../assets/animation/start.json')}
              autoPlay
              duration={2000}
              loop={false}
              style={{ width: 90, height: 90 }}
              onAnimationFinish={() => this.openAppAnimation()}
            />
          </Animated.View>
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
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() =>
                  this.changeView('SearchPage', {
                    type: 'firstInput',
                    onNavigateBack: this.handleOnNavigateBack
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
                    source={require('../../assets/icons/search.png')}
                    style={styles.ImageStyle}
                  />
                  <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            {/* <Text style={styles.title}>Vos arrêts</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View onPress={() => console.log('hey')} style={styles.stopCardBox}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.stopCard, styles.card]}>
                                            <View style={styles.stopCardLine}>
                                                <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon} />
                                                <Text style={styles.stopCardLineDirection}>Aéroport Cdg1 RER B</Text>
                                                <Text style={styles.stopCardLineNumber}>95-01</Text>
                                            </View>
                                            <View style={styles.stopCardPlace}>
                                                <Text style={styles.stopCardPlaceText}>Hôtel de ville</Text>
                                                <Text style={styles.stopCardPlaceNextPassageLabel}>Prochains passage :</Text>
                                                <View style={styles.stopCardPlaceNextPassage}>
                                                    <Text style={styles.stopCardPlaceNextPassageTextHighLight}>10:05</Text>
                                                    <Text style={styles.stopCardPlaceNextPassageText}>10:35</Text>
                                                    <Text style={styles.stopCardPlaceNextPassageText}>11:23</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <View onPress={() => console.log('hey')} style={styles.stopCardBox}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.stopCard, styles.card]}>
                                            <View style={styles.stopCardLine}>
                                                <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon} />
                                                <Text style={styles.stopCardLineDirection}>Aéroport Cdg1 RER B</Text>
                                                <Text style={styles.stopCardLineNumber}>95-01</Text>
                                            </View>
                                            <View style={styles.stopCardPlace}>
                                                <Text style={styles.stopCardPlaceText}>Hôtel de ville</Text>
                                                <Text style={styles.stopCardPlaceNextPassageLabel}>Prochains passage :</Text>
                                                <View style={styles.stopCardPlaceNextPassage}>
                                                    <Text style={styles.stopCardPlaceNextPassageTextHighLight}>10:05</Text>
                                                    <Text style={styles.stopCardPlaceNextPassageText}>10:35</Text>
                                                    <Text style={styles.stopCardPlaceNextPassageText}>11:23</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </ScrollView> */}
            <Text style={styles.title}>Vos itinéraires</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                horizontal
                style={{ flexDirection: 'row' }}
                data={favoritesJourneys}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      height: 170,
                      width: screenWidth,
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View style={{ flex: 0.9 }}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#898989' }}>
                        {`Vous n'avez pas d'itinéraires favoris pour le moment.`}
                      </Text>
                      <Text style={{ fontSize: 10, color: '#898989' }}>
                        {`Recherchez un itinéraire et cliquez sur l'étoile pour l'ajouter en favoris.`}
                      </Text>
                    </View>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View style={styles.stopJourneyCard}>
                    <TouchableNativeFeedback
                      onPress={() => this.displayJourneyDetails(item)}
                      background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                    >
                      <View style={[styles.journeyCard, styles.card]}>
                        <View style={styles.journeyCardTop}>
                          <View style={styles.journeyCardTopRow}>
                            <Image
                              style={styles.journeyCardTopRowImg}
                              source={require('../../assets/icons/map-location.png')}
                            />
                            <Text style={styles.journeyCardTopRowTxt}>
                              {item.sections[0].from.name}
                            </Text>
                          </View>
                          <View style={styles.journeyCardTopRow}>
                            <Image
                              style={styles.journeyCardTopRowImg}
                              source={require('../../assets/icons/target.png')}
                            />
                            <Text style={styles.journeyCardTopRowTxt}>
                              {item.sections[item.sections.length - 1].to.name}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.journeyCardBottom}>
                          <FlatList
                            horizontal
                            style={{ flexDirection: 'row' }}
                            data={item.sections_without_waiting_and_transfer}
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
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
            {/* <Text style={styles.title}>Lignes</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', height: 75 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                        onPress={() => {
                                            this.changeView('SearchPage', { type: 'line', placeholder: 'Votre ligne' })
                                        }}>
                                        <View style={styles.searchBar}>
                                            <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                            <Text style={styles.input}>Quelle ligne recherchez-vous ?</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View> */}
            <Text style={styles.title}>Plans</Text>
            <View style={styles.mapCardBox}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() => {
                  this.changeView('MapPage', {
                    param: {
                      src:
                        'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-Metro.1553075320.pdf',
                      type: 'url'
                    }
                  });
                }}
              >
                <View style={styles.mapCard}>
                  <Text>Plan Métro</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.mapCardBox}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() => {
                  this.changeView('MapPage', {
                    param: {
                      src:
                        'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-RER-et-transiliens.1505744115.pdf',
                      type: 'url'
                    }
                  });
                }}
              >
                <View style={styles.mapCard}>
                  <Text>Plan RER et Transiliens</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.mapCardBox}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() => {
                  this.changeView('MapPage', {
                    param: {
                      src:
                        'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-des-Bus.1496264585.pdf',
                      type: 'url'
                    }
                  });
                }}
              >
                <View style={styles.mapCard}>
                  <Text>Plan des bus</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.mapCardBox}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() => {
                  this.changeView('MapPage', {
                    param: {
                      src:
                        'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-des-Noctilien.1527497902.pdf',
                      type: 'url'
                    }
                  });
                }}
              >
                <View style={styles.mapCard}>
                  <Text>Plan des Noctilien</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.mapCardBox}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                onPress={() => {
                  this.changeView('MapPage', {
                    param: {
                      src:
                        'https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Acces-Aeroports.1496264586.pdf',
                      type: 'url'
                    }
                  });
                }}
              >
                <View style={styles.mapCard}>
                  <Text>Accès Aéroports</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomePage;
