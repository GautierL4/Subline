import React from 'react';
import { View } from 'react-native';
import PDFView from 'react-native-view-pdf';
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
      <View style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1, height: 3000 }}
          resource={source.src}
          resourceType={source.type}
          onLoad={() => console.log(`PDF rendered from ${source.type}`)}
          onError={() => console.log('Cannot render PDF')}
        />
        <BackButton navigation={navigation} />
      </View>
    );
  }
}
export default MapPage;
