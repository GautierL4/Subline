import React from 'react';
import {
  View,
  BackHandler,
  Image,
  TouchableNativeFeedback,
  ToastAndroid,
  Animated,
  Easing
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';
import { styles } from '../../assets/styles/style';

/**
 * Class representing the back button
 *
 * @export
 * @class BackButton
 * @extends {React.Component}
 */
export class BackButton extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  /**
   * Replace the action from hardware button by the function goBack()
   * @memberof BackButton
   */
  handleBackPress = () => {
    this.goBack();
    return true;
  };

  /**
   * Go to the previous screen with React Navigation.
   * If onNavigateBack exists in the navigation state, call its function in previous screen.
   * @memberof BackButton
   */
  goBack() {
    const { navigation } = this.props;
    if (navigation.state.params.onNavigateBack !== undefined) {
      navigation.state.params.onNavigateBack();
    }
    navigation.goBack();
  }

  /**
   * Display the back button.
   * @returns
   * @memberof BackButton
   */
  render() {
    return (
      <View style={styles.returnButton}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#CCCCCC')}
          onPress={() => this.goBack()}
        >
          <View>
            <Image
              style={styles.returnArrow}
              source={require('../../assets/icons/go-back-left-arrow.png')}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

/**
 * Class representing the favorite button.
 * @export
 * @class FavoriteButton
 * @extends {React.Component}
 */
export class FavoriteButton extends React.Component {
  /**
   * Creates an instance of FavoriteButton.
   * @param {*} props
   * @memberof FavoriteButton
   */
  constructor(props) {
    super(props);
    this.state = {
      listOfFavorite: [],
      isAFavorite: false,
      isLoading: true
    };
  }

  /**
   * Set states.
   * @memberof FavoriteButton
   */
  async componentWillMount() {
    const { dataJourney } = this.props;
    let newListOfFavoriteJourneys = [];
    try {
      newListOfFavoriteJourneys = await this.getListOfFavoriteJourneys();
    } catch (e) {
      console.error(e);
    }
    this.setState(
      {
        listOfFavorite: newListOfFavoriteJourneys,
        isLoading: false
      },
      () => {
        this.setState({
          isAFavorite: this.checkIfJourneyIsAlreadyInFavorites(dataJourney)
        });
      }
    );
  }

  /**
   * Store favorite journeys from phone storage to component state.
   * Stop loading.
   * @memberof FavoriteButton
   */
  async getListOfFavoriteJourneys() {
    let newListOfFavoriteJourneys = [];
    try {
      newListOfFavoriteJourneys = await this.retrieveData();
    } catch (error) {
      console.error('erreur 8');
    }
    return newListOfFavoriteJourneys === null ? [] : JSON.parse(newListOfFavoriteJourneys);
  }

  /**
   * Check if the current journey is already in the list of favorite journeys of component state.
   * @param {object} dataJourney - The current journey
   * @returns {boolean} Return true if the journey is in favorite list and false if not.
   * @memberof FavoriteButton
   */
  checkIfJourneyIsAlreadyInFavorites(dataJourney) {
    const { listOfFavorite } = this.state;
    return JSON.stringify(listOfFavorite).includes(JSON.stringify(dataJourney));
  }

  /**
   * Store on phone the new list of favorite journeys in 'favoriteJourneys'.
   * @param {string} data - The new list of favorite journeys.
   * @memberof FavoriteButton
   */
  async storeData(data) {
    try {
      await AsyncStorage.setItem('favoriteJourneys', data);
    } catch (error) {
      console.error('erreur 3');
    }
  }

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
      console.error('erreur 4');
    }
    return value;
  }

  /**
   * Remove a specific journey from the list of favorite journeys in the component state and phone storage.
   * @param {object} dataJourney
   * @memberof FavoriteButton
   */
  removeJourneyFromFavoriteJourneys(dataJourney) {
    const { listOfFavorite } = this.state;
    const filtered = listOfFavorite.filter(function(value) {
      return JSON.stringify(value) !== JSON.stringify(dataJourney);
    });
    this.setState({ listOfFavorite: filtered, isAFavorite: false }, async () => {
      try {
        await this.storeData(JSON.stringify(listOfFavorite));
      } catch (e) {
        console.error('error 321');
      }
    });
    ToastAndroid.show("L'itinéraire a été retiré de vos favoris.", ToastAndroid.SHORT);
  }

  /**
   * Add a specific journey to the list of favorite journeys in the component state and phone storage.
   * @param {object} dataJourney
   * @memberof FavoriteButton
   */
  addJourneyToFavoriteJourneys(dataJourney) {
    const listOfFavorite = [...this.state.listOfFavorite];
    listOfFavorite.push(dataJourney);
    this.setState({ listOfFavorite: listOfFavorite, isAFavorite: true }, async () => {
      try {
        await this.storeData(JSON.stringify(this.state.listOfFavorite));
      } catch (e) {
        console.error('error 321');
      }
    });
    ToastAndroid.show("L'itinéraire a été ajouté à vos favoris.", ToastAndroid.SHORT);
  }

  /**
   * Add a specific journey to the favorite list (component state) if it is not already. Remove if it is.
   * @param {object} dataJourney
   * @memberof FavoriteButton
   */
  toggleAJourneyInFavoriteJourneys(dataJourney) {
    const { isAFavorite } = this.state;
    if (isAFavorite) {
      this.animation.reset();
      this.removeJourneyFromFavoriteJourneys(dataJourney);
    } else {
      this.animation.play();
      this.addJourneyToFavoriteJourneys(dataJourney);
    }
  }

  /**
   * Display the favorite button.
   * @returns
   * @memberof FavoriteButton
   */
  render() {
    const { isLoading, isAFavorite } = this.state;
    const { dataJourney } = this.props;
    if (isLoading) {
      return <View />;
    }
    return (
      <View style={[styles.button, { width: 60, height: 60, marginTop: 20 }]}>
        <TouchableNativeFeedback onPress={() => this.toggleAJourneyInFavoriteJourneys(dataJourney)}>
          <View>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              source={require('../../assets/animation/star.json')}
              duration={2000}
              loop={false}
              resizeMode="cover"
              style={{ width: 60, height: 60 }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

/**
 * Class representing the alarm button.
 * @export
 * @class AlarmButton
 * @extends {React.Component}
 */
export class AlarmButton extends React.Component {
  clickHandler() {
    AsyncStorage.clear();
  }

  /**
   * Display the alarm button.
   * @returns
   * @memberof AlarmButton
   */
  render() {
    return (
      <View style={styles.button}>
        <TouchableNativeFeedback onPress={() => this.clickHandler()}>
          <View>
            <Image
              style={styles.returnArrow}
              source={require('../../assets/icons/alarm_off.png')}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export class ReloadButton extends React.Component {
  startRotate() {
    this.animation.play();
  }

  reloadPage(handler) {
    this.startRotate();
    setTimeout(function() {
      handler();
    }, 200);
  }

  render() {
    const { handler } = this.props;

    return (
      <View style={styles.button}>
        <TouchableNativeFeedback onPress={() => this.reloadPage(handler)}>
          <View>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              source={require('../../assets/animation/reload.json')}
              duration={2000}
              loop={false}
              progress={1}
              resizeMode="cover"
              style={{ width: 50, height: 50 }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export class ReverseButton extends React.Component {
  constructor(props) {
    super(props);
    this.RotateValueHolder = new Animated.Value(0);
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  reverse(handler) {
    this.StartImageRotateFunction();
    handler();
  }

  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    });
    const { handler } = this.props;
    return (
      <View style={{ maxWidth: 20, maxHeight: 20 }}>
        <TouchableNativeFeedback onPress={() => this.reverse(handler)}>
          <View>
            <Animated.Image
              style={[{ maxWidth: 20, maxHeight: 20, transform: [{ rotate: RotateData }] }]}
              source={require('../../assets/icons/reverse.png')}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
