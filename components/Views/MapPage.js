import React from 'react';
import { View, WebView } from 'react-native';
import { BackButton } from '../Elements/buttons';

/**
 * Class representing map page.
 *
 * @class MapPage
 * @extends {React.Component}
 */
class MapPage extends React.Component {
  /**
   * Change page.
   *
   * @param {string} page
   * @param {*} parameters
   * @memberof MapPage
   */
  changeView(page, parameters) {
    const { navigation } = this.props;
    navigation.navigate(page, parameters);
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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <WebView bounces={false} scrollEnabled={false} source={{ uri: source }} />
        <BackButton navigation={navigation} />
      </View>
    );
  }
}
export default MapPage;
