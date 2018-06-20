import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableWithoutFeedback, ScrollView, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: null
        };
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        //Setting the loading screen for 3 seconds
        setTimeout(() => { this.setState({ isLoading: false })
        }, 3000);
    }

    render(){
        if(this.state.isLoading){
            return(
            <View style={{flex: 1, backgroundColor: 'black',width:screenWidth, height:screenHeight, alignItems: 'center',justifyContent: 'center'}}>
                <Image style={{width: 80, height: 80,}} source={require('../../assets/icons/loading-start.gif')} />
            </View>
            );
            
        }
        else{
            return(
                <View style={styles.container}>
                    <ScrollView horizontal={false} contentContainerStyle={{flexGrow: 1}}>
                        <View style={styles.header}>
                            <Image source={require('../../assets/icons/subline.png')} style={{width: 90, height: 90}}/>
                        </View>
                        <View style={styles.body}>
                            <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',position:'relative',top:-25}}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SearchPage')} style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',padding:5}}>
                                    <View style={styles.searchBar}>
                                        <Image source={require('../../assets/icons/search.png')} style={styles.ImageStyle} />
                                        <Text style={styles.input}>Où souhaitez-vous aller ?</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Text style={styles.title}>Vos arrêts</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={()=>console.log('hey')} style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                        <View style={styles.stopCardLine}>
                                            <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon}/>
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
                                </TouchableOpacity>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                        <View style={styles.stopCardLine}>
                                            <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon}/>
                                            <Text style={styles.stopCardLineDirection}>Aéroport Cdg1 RER B</Text>
                                            <Text style={styles.stopCardLineNumber}>95-01</Text>
                                        </View>
                                        <View style={styles.stopCardPlace}>
                                            <Text style={styles.stopCardPlaceText}>Jussieu</Text>
                                            <Text style={styles.stopCardPlaceNextPassageLabel}>Prochains passage :</Text>
                                            <View style={styles.stopCardPlaceNextPassage}>
                                                <Text style={styles.stopCardPlaceNextPassageTextHighLight}>10:05</Text>
                                                <Text style={styles.stopCardPlaceNextPassageText}>10:35</Text>
                                                <Text style={styles.stopCardPlaceNextPassageText}>11:23</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                        <View style={styles.stopCardLine}>
                                            <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon}/>
                                            <Text style={styles.stopCardLineDirection}>Aéroport Cdg1 RER B</Text>
                                            <Text style={styles.stopCardLineNumber}>95-01</Text>
                                        </View>
                                        <View style={styles.stopCardPlace}>
                                            <Text style={styles.stopCardPlaceText}>Aéroport Cdg1 RER B</Text>
                                            <Text style={styles.stopCardPlaceNextPassageLabel}>Prochains passage :</Text>
                                            <View style={styles.stopCardPlaceNextPassage}>
                                                <Text style={styles.stopCardPlaceNextPassageTextHighLight}>10:05</Text>
                                                <Text style={styles.stopCardPlaceNextPassageText}>10:35</Text>
                                                <Text style={styles.stopCardPlaceNextPassageText}>11:23</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.stopCardBox}>
                                    <View style={styles.stopCard}>
                                        <View style={styles.stopCardLine}>
                                            <Image source={require('../../assets/icons/icon_bus.png')} style={styles.stopCardLineIcon}/>
                                            <Text style={styles.stopCardLineDirection}>Aulnay-sous-Bois</Text>
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
                                </View>
                            </ScrollView>
                            <Text style={styles.title}>Vos itinéraires</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={styles.stopJourneyCard}>
                                    <View style={styles.journeyCard}>
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
                                </TouchableOpacity>
                                <View style={styles.stopJourneyCard}>
                                    <View style={styles.journeyCard}>
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
                                </View>
                                <View style={styles.stopJourneyCard}>
                                    <View style={styles.journeyCard}>
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
                                </View>
                                <View style={styles.stopJourneyCard}>
                                    <View style={styles.journeyCard}>
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
                                </View>
                            </ScrollView>
                            <Text style={styles.title}>Plans</Text>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('MapPage')}>
                                <View style={styles.mapCardBox}>
                                    <View style={styles.mapCard} >
                                        <Text>Plan Métro</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan RER et transiliens</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan des Bus</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Plan des Noctiliens</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Accès Aéroport</Text>
                                </View>
                            </View>
                            <View style={styles.mapCardBox}>
                                <View style={styles.mapCard}>
                                    <Text>Carte intéractive</Text>
                                </View>
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

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    header: {
        flex: 2,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 230,
    },
    title: {
        fontSize: 20, 
        textAlign: 'center', 
        margin: 10,
        color: "#898989",
        textAlign:'left',
        marginBottom: 10,
    },
    body: {
        flex: 3,
    },
    stopCardBox: {
        flex:1,
        height:160,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth-(screenWidth/13)
    },
    stopCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:130,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 7,
        flex:0.95,
        flexDirection:'row'
    },
    stopCardLine: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#e5e5e5',
        borderRightWidth: 1,
    },
    stopCardPlace: {
        flex: 2,
    },
    stopCardPlaceText: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    stopCardPlaceNextPassageLabel: {
        fontSize: 12,
        marginLeft: 10,
    },
    stopCardPlaceNextPassage: {
        flexDirection:'row',
    },
    stopCardLineDirection: {
        fontSize: 10,
    },    
    stopCardLineNumber: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    stopCardLineIcon: {
        width:30,
        height:30,
        marginBottom:5,
    },
    stopCardPlaceNextPassageTextHighLight: {
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    stopCardPlaceNextPassageText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#8A8A8A'
    },
    stopJourneyCard: {
        flex:1,
        height:170,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth-(screenWidth/13)
    },
    journeyCard: {
        flexDirection:'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        height:140,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 7,
        flex:0.95,
    },
    journeyCardTop: {
        flex: 3,
        marginLeft: 20,
        marginRight: 20,
        // marginBottom: 20,
        marginTop: 20,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    journeyCardBottom: {
        flex: 2,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    journeyCardTopRow: {
        flexDirection:'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    journeyCardTopRowImg: {
        height: 20,
        width: 20,
    },
    journeyCardTopRowTxt: {
        marginLeft: 10,
        fontSize: 15,
    },
    journeyCardBottomImg: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    journeyCardBottomImgDot: {
        width: 3,
        height: 3,
        marginRight: 5,
    },
    busCard: {
        flexDirection: 'row',
        borderRadius: 2,
        borderColor: '#e5e5e5',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        marginRight: 5,
    },
    busCardImgBus: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    busCardTxt: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    mapCardBox: {
        flex:1,
        height:75,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth
    },
    mapCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:60,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 5,
        //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        //android
        elevation: 5,
        flex:0.9,
        flexDirection:'row'
    },
    home: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    input: {
      color: "#666666",
      fontWeight: 'bold',
      fontSize: 18,
      padding: 10,
      flex:0.8,
    },
    ImageStyle: {
      margin: 10,
      paddingLeft: 5,
      resizeMode : 'contain',
      alignItems: 'center',
      maxHeight:20,
      flex:0.1,
    },
    searchBar: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
      //android
      elevation: 7,
      flex:0.9,
      flexDirection:'row'
    },
  });
  

export default HomePage;
