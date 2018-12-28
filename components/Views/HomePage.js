import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, ScrollView, Dimensions, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { styles } from '../../assets/styles/style';

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(screenHeight),  // Initial value for opacity: 0
    }

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 230,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
                delay: 3000
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    height: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        //Setting the loading screen for 3 seconds
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 4000);
    }

    async displayBookmark() {
        const value = await AsyncStorage.getItem('key');
        console.log(value);
    }

    changeView(page, parameters) {
        // setTimeout(function () {
            this.props.navigation.navigate(page, parameters)
        // }.bind(this), 100)
    }

    render() {

        this.displayBookmark();

        if (this.state.isLoading) {
            return (
                <FadeInView style={{ backgroundColor: 'black', width: screenWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 80, height: 80, }} source={require('../../assets/icons/loading-start.gif')} />
                </FadeInView>
            );

        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={[styles.header, styles.headerMax, { justifyContent: 'center', }]}>
                            <Image source={require('../../assets/icons/subline.png')} style={{ width: 90, height: 90 }} />
                        </View>
                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', top: -25 }}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')} onPress={() => this.changeView('SearchPage', { type: 'firstInput', })} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <Text style={styles.title}>Vos arrêts</Text>
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
                            </ScrollView>
                            <Text style={styles.title}>Vos itinéraires</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.stopJourneyCard} onPress={() => this.props.navigation.navigate('JourneyPage')}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.journeyCard, styles.card]}>
                                            <View style={styles.journeyCardTop}>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/map-location.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>Châtelet-Les-Halles</Text>
                                                </View>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/target.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>43 rue de Bruxelles, Paris 75004</Text>
                                                </View>
                                            </View>
                                            <View style={styles.journeyCardBottom}>
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
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <View style={styles.stopJourneyCard} onPress={() => this.props.navigation.navigate('JourneyPage')}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.journeyCard, styles.card]}>
                                            <View style={styles.journeyCardTop}>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/map-location.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>Châtelet-Les-Halles</Text>
                                                </View>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/target.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>43 rue de Bruxelles, Paris 75004</Text>
                                                </View>
                                            </View>
                                            <View style={styles.journeyCardBottom}>
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
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <View style={styles.stopJourneyCard} onPress={() => this.props.navigation.navigate('JourneyPage')}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.journeyCard, styles.card]}>
                                            <View style={styles.journeyCardTop}>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/map-location.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>Châtelet-Les-Halles</Text>
                                                </View>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/target.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>43 rue de Bruxelles, Paris 75004</Text>
                                                </View>
                                            </View>
                                            <View style={styles.journeyCardBottom}>
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
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <View style={styles.stopJourneyCard} onPress={() => this.props.navigation.navigate('JourneyPage')}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}>
                                        <View style={[styles.journeyCard, styles.card]}>
                                            <View style={styles.journeyCardTop}>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/map-location.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>Châtelet-Les-Halles</Text>
                                                </View>
                                                <View style={styles.journeyCardTopRow}>
                                                    <Image style={styles.journeyCardTopRowImg} source={require('../../assets/icons/target.png')} />
                                                    <Text style={styles.journeyCardTopRowTxt}>43 rue de Bruxelles, Paris 75004</Text>
                                                </View>
                                            </View>
                                            <View style={styles.journeyCardBottom}>
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
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </ScrollView>
                            <Text style={styles.title}>Lignes</Text>

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
                            </View>
                            <Text style={styles.title}>Plans</Text>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-Metro.1496264586.pdf', })
                                    }}>
                                    <View style={styles.mapCard} >
                                        <Text>Plan Métro</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-RER-et-transiliens.1505744115.pdf', })
                                    }}>
                                    <View style={styles.mapCard} >
                                        <Text>Plan RER et Transiliens</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-des-Bus.1496264585.pdf', })
                                    }}>
                                    <View style={styles.mapCard} >
                                        <Text>Plan des bus</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Plan-des-Noctilien.1527497902.pdf', })
                                    }}>
                                    <View style={styles.mapCard} >
                                        <Text>Plan des Noctilien</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#CCCCCC')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.ratp.fr/sites/default/files/plans-lignes/Plans-essentiels/Acces-Aeroports.1496264586.pdf', })
                                    }}>
                                    <View style={styles.mapCard} >
                                        <Text>Accès Aéroports</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.mapCardBox}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('#ffffff')}
                                    onPress={() => {
                                        this.changeView('MapPage', { param: 'http://tracker.geops.de/?z=13&s=1&x=261676.7892&y=6251254.5413&l=transport', })
                                    }}>
                                    <View style={styles.interractiveMapCard} >
                                        <Text style={styles.interractiveMapColor}>Carte intéractive</Text>
                                        <Image source={require('../../assets/icons/connection-signal.png')} style={styles.interractiveImg} />
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default HomePage;
