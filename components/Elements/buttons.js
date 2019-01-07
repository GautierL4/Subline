import React from 'react';
import { View, BackHandler, Image, TouchableNativeFeedback, AsyncStorage, ToastAndroid } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';


/**
 * Class representing the back button
 *
 * @export
 * @class BackButton
 * @extends {React.Component}
 */
export class BackButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            reload: true
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }

    /**
     * Replace the action from hardware button by the function goBack()
     * @memberof BackButton
     */
    handleBackPress = () => {
        this.goBack()
        return true
    }

    /**
     * Go to the previous screen with React Navigation.
     * If onNavigateBack exists in the navigation state, call its function in previous screen. 
     * @memberof BackButton
     */
    goBack() {
        if (this.props.navigation.state.params.onNavigateBack !== undefined) {
            this.props.navigation.state.params.onNavigateBack()
        }
        this.props.navigation.goBack();
    }

    /**
     * Display the back button.
     * @returns
     * @memberof BackButton
     */
    render() {
        return (
            <View style={styles.returnButton} >
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')} onPress={() => this.goBack()} >
                    <View>
                        <Image style={styles.returnArrow} source={require('../../assets/icons/go-back-left-arrow.png')} />
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
        super(props)
        this.state = {
            listOfFavorite: [],
            isAFavorite: false,
            isLoading: true
        }
    }

    /**
     * Add a specific journey to the favorite list (component state) if it is not already. Remove if it is. 
     * @param {object} dataJourney
     * @memberof FavoriteButton
     */
    toggleAJourneyInFavoriteJourneys(dataJourney) {
        if (this.state.isAFavorite) {
            this.removeJourneyFromFavoriteJourneys(dataJourney)
        } else {
            this.addJourneyToFavoriteJourneys(dataJourney)
        }
    }

    /**
     * Add a specific journey to the list of favorite journeys in the component state and phone storage. 
     * @param {object} dataJourney
     * @memberof FavoriteButton
     */
    addJourneyToFavoriteJourneys(dataJourney) {
        let listOfFavorite = [...this.state.listOfFavorite]
        listOfFavorite.push(dataJourney)
        this.setState({ listOfFavorite: listOfFavorite, isAFavorite: true }, async () => {
            try {
                await this._storeData(JSON.stringify(this.state.listOfFavorite))
            } catch (e) {
                console.error('error 321')
            }
        })
        ToastAndroid.show('L\'itinéraire a été ajouté à vos favoris.', ToastAndroid.SHORT);
    }

    /**
     * Remove a specific journey from the list of favorite journeys in the component state and phone storage.  
     * @param {object} dataJourney
     * @memberof FavoriteButton
     */
    removeJourneyFromFavoriteJourneys(dataJourney) {
        // let listOfFavorite = [...this.state.listOfFavorite]
        let filtered = this.state.listOfFavorite.filter(function (value, index, arr) {
            return JSON.stringify(value) !== JSON.stringify(dataJourney)
        })
        this.setState({ listOfFavorite: filtered, isAFavorite: false }, async () => {
            try {
                await this._storeData(JSON.stringify(this.state.listOfFavorite))
            } catch (e) {
                console.error('error 321')
            }
        })
        ToastAndroid.show('L\'itinéraire a été retiré de vos favoris.', ToastAndroid.SHORT);
    }

    /**
     * Check if the current journey is already in the list of favorite journeys of component state. 
     * @param {object} dataJourney - The current journey
     * @returns {boolean} Return true if the journey is in favorite list and false if not.
     * @memberof FavoriteButton
     */
    checkIfJourneyIsAlreadyInFavorites(dataJourney) {
        return JSON.stringify(this.state.listOfFavorite).includes(JSON.stringify(dataJourney))
    }

    /**
     * Store on phone the new list of favorite journeys in 'favoriteJourneys'. 
     * @param {string} data - The new list of favorite journeys.
     * @memberof FavoriteButton
     */
    async _storeData(data) {
        try {
            await AsyncStorage.setItem('favoriteJourneys', data);
        } catch (error) {
            console.error('erreur 3')
        }
    }

    /**
     * Return the list of the 'favoriteJourneys' from phone storage.
     * @returns {string} The list of favorites from phone storage.
     * @memberof FavoriteButton
     */
    async _retrieveData() {
        var value = null
        try {
            value = await AsyncStorage.getItem('favoriteJourneys');
        } catch (error) {
            console.error('erreur 4')
        }
        return value
    }

    /**
     * Store favorite journeys from phone storage to component state.
     * Stop loading.
     * @memberof FavoriteButton
     */
    async getListOfFavoriteJourneys() {
        let newListOfFavoriteJourneys = []
        try {
            newListOfFavoriteJourneys = await this._retrieveData()
        } catch (error) {
            console.error('erreur 8')
        }
        return newListOfFavoriteJourneys === null ? [] : JSON.parse(newListOfFavoriteJourneys)
    }

    /**
     * Set states. 
     * @memberof FavoriteButton
     */
    async componentWillMount() {
        newListOfFavoriteJourneys = []
        try {
            newListOfFavoriteJourneys = await this.getListOfFavoriteJourneys()
        } catch (e) {
            console.error(e)
        }
        this.setState({
            listOfFavorite: newListOfFavoriteJourneys,
            isLoading: false,
        }, () => {
            this.setState({ isAFavorite: this.checkIfJourneyIsAlreadyInFavorites(this.props.dataJourney) })
        })
    }

    /**
     * Display the favorite button.
     * @returns
     * @memberof FavoriteButton
     */
    render() {
        const icon = this.state.isAFavorite ? require('../../assets/icons/star_on.png') : require('../../assets/icons/star_off.png')
        if (this.state.isLoading) {
            return (
                <View></View>
            )
        }
        else {
            return (
                <View style={styles.button} >
                    <TouchableNativeFeedback onPress={() => this.toggleAJourneyInFavoriteJourneys(this.props.dataJourney)} >
                        <View>
                            <Image style={styles.returnArrow} source={icon} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )
        }
    }
}

/**
 * Class representing the alarm button.
 * @export
 * @class AlarmButton
 * @extends {React.Component}
 */
export class AlarmButton extends React.Component {

    test() {
        AsyncStorage.clear()
    }

    /**
     * Display the alarm button.
     * @returns
     * @memberof AlarmButton
     */
    render() {
        return (
            <View style={styles.button} >
                <TouchableNativeFeedback onPress={() => this.test()} >
                    <View>
                        <Image style={styles.returnArrow} source={require('../../assets/icons/alarm_off.png')} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}