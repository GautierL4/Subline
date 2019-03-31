import React from 'react';
import { View, WebView } from 'react-native';
import { Constants } from 'expo';
import { BackButton } from '../Elements/buttons'

/**
 * Class representing map page.
 *
 * @class MapPage
 * @extends {React.Component}
 */
class MapPage extends React.Component {

    /**
     * Creates an instance of MapPage.
     * 
     * @param {*} props
     * @memberof MapPage
     */
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            search: ''
        };
    }

    /**
     * Change page.
     *
     * @param {string} page
     * @param {*} parameters
     * @memberof MapPage
     */
    changeView(page, parameters) {
        this.props.navigation.navigate(page, parameters)
    }

    /**
     * Display the map page.
     *
     * @returns
     * @memberof MapPage
     */
    render() {
        const { navigation } = this.props;
        const source = navigation.getParam('param');
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>

                <WebView
                    bounces={false}
                    scrollEnabled={false}
                    source={{ uri: source }}
                    />
                <BackButton navigation={this.props.navigation} />
            </View>
        )
    }
}
export default MapPage;