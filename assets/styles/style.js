import { StyleSheet, Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const primaryColor = "#70bd88"
const secondaryColor = "#000"
const tertiaryColor = "#fff"

export const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: tertiaryColor,
    },
    card: {
        backgroundColor: tertiaryColor,
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
    },
    header: {
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',  
        height: 230,
        flexDirection: 'column',
    },
    headerMax: {
        height: 230,
    },
    headerMini: {
        height: 50,
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
        color: secondaryColor
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
        marginTop:4,
        marginBottom: 4,
    },
    journeyCardBottomImgDot: {
        width: 3,
        height: 3,
        marginRight: 5,
        marginTop:4,
        marginBottom: 4,
        alignSelf: 'center',
    },
    resultCardBox: {
        flex:1,
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width:screenWidth,
    },
    resultCard: {
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex:0.9,
        flexDirection:'row',
        marginBottom: 10,
    },
    resultItem: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    resultItemText: {
        fontSize: 17,
        fontWeight: 'bold',
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
        paddingLeft: 3,
        paddingRight: 3,
    },
    busCardImgBus: {
        width: 15,
        height: 15,
        marginRight: 2,
    },
    interractiveImg: {

         width: 15,
        height: 15,
        transform: [{ rotate: '20deg'}],
        marginLeft:2,
        marginBottom:2,
    },
    busCardTxt: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    select: {

        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:0,
        borderWidth:1,
        borderColor:'#ff0000',
    },
    mapCardBox: {
        minHeight:75,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:screenWidth
    },
    mapCard: {
        flexDirection:'row',
        alignItems: 'center',
        minHeight: 60,
        backgroundColor: tertiaryColor,
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
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    interractiveMapCard: {
        flexDirection:'row',
        alignItems: 'center',
        height:60,
        backgroundColor: secondaryColor,
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
    interractiveMapColor: {
        color: tertiaryColor
    },
    home: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

    },
    input: {
      color: "#666666",
      fontWeight: 'bold',
      fontSize: 17,
      padding: 10,
      flex:0.9,
    },
    ImageStyle: {
      marginLeft: 10,
      marginTop:12,
      paddingLeft: 5,
      resizeMode : 'contain',
      alignItems: 'center',
      justifyContent:'center',
      maxHeight:20,
      flex:0.1,
    },
    searchBar: {
      backgroundColor: tertiaryColor,
      borderRadius: 5,
      //IOS
        shadowOpacity: 0.2,
        shadowRadius: 7,
        shadowOffset: {
            height: 4,
            width: 0
        },
        height:45,
      //android
      elevation: 7,
      flex:0.9,
      flexDirection:'row',
    },
    returnButtonBg: {
        backgroundColor: secondaryColor,
        position:'absolute',
        borderRadius:5,
        top:25,
        left:13,
        height:50,
        width:50
    },
    returnButton: {
        position:'absolute',
        borderRadius:5,
        top:25,
        left:13,
        height:50,
        width:50,
        backgroundColor: secondaryColor,
    },
    button: {
        borderRadius:5,
        marginTop:25,
        marginRight:13,
        height:50,
        width:50,
        backgroundColor: secondaryColor,
    },
    returnArrow: {
        height:25,
        width:25,
        margin:12
    },
    buttonTop: {
        height:50,
        width:50 
    },
  });