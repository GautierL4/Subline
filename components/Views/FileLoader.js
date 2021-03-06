const icons = {
  walkIcon: require('../../assets/icons/walk.png'),
  wait: require('../../assets/icons/wait.png'),
  M1: require('../../assets/icons/lines/M1genRVB.png'),
  M2: require('../../assets/icons/lines/M2genRVB.png'),
  M3: require('../../assets/icons/lines/M3genRVB.png'),
  M4: require('../../assets/icons/lines/M4genRVB.png'),
  M5: require('../../assets/icons/lines/M5genRVB.png'),
  M6: require('../../assets/icons/lines/M6genRVB.png'),
  M7: require('../../assets/icons/lines/M7genRVB.png'),
  M7bis: require('../../assets/icons/lines/M7bisgenRVB.png'),
  M8: require('../../assets/icons/lines/M8genRVB.png'),
  M9: require('../../assets/icons/lines/M9genRVB.png'),
  M10: require('../../assets/icons/lines/M10genRVB.png'),
  M11: require('../../assets/icons/lines/M11genRVB.png'),
  M12: require('../../assets/icons/lines/M12genRVB.png'),
  M13: require('../../assets/icons/lines/M13genRVB.png'),
  M14: require('../../assets/icons/lines/M14genRVB.png'),
  RERA: require('../../assets/icons/lines/RERAgenRVB.png'),
  RERB: require('../../assets/icons/lines/RERBgenRVB.png'),
  RERC: require('../../assets/icons/lines/RERCgenRVB.png'),
  RERD: require('../../assets/icons/lines/RERDgenRVB.png'),
  RERE: require('../../assets/icons/lines/REREgenRVB.png'),
  T1: require('../../assets/icons/lines/T1genRVB.png'),
  T2: require('../../assets/icons/lines/T2genRVB.png'),
  T3a: require('../../assets/icons/lines/T3a-genRVB.png'),
  T3b: require('../../assets/icons/lines/T3b-genRVB.png'),
  T5: require('../../assets/icons/lines/T5genRVB.png'),
  T6: require('../../assets/icons/lines/T6genRVB.png'),
  T7: require('../../assets/icons/lines/T7genRVB.png'),
  T8: require('../../assets/icons/lines/T8genRVB.png'),
  T4: require('../../assets/icons/lines/tn-icon-t4.png'),
  TRAINH: require('../../assets/icons/lines/tn-icon-trah.png'),
  TRAINJ: require('../../assets/icons/lines/tn-icon-traj.png'),
  TRAINK: require('../../assets/icons/lines/tn-icon-trak.png'),
  TRAINL: require('../../assets/icons/lines/tn-icon-tral.png'),
  TRAINN: require('../../assets/icons/lines/tn-icon-tran.png'),
  TRAINP: require('../../assets/icons/lines/tn-icon-trap.png'),
  TRAINR: require('../../assets/icons/lines/tn-icon-trar.png'),
  TRAINU: require('../../assets/icons/lines/tn-icon-trau.png'),
  Bus: require('../../assets/icons/icon_bus.png'),
  general_bus: require('../../assets/icons/ratp_icon_bus.png'),
  general_metro: require('../../assets/icons/icon_metro.png'),
  general_rer: require('../../assets/icons/icon_rer.png'),
  general_tram: require('../../assets/icons/icon_tram.png')
};

/**
 * Class representing everything related to files .
 *
 * @class FileLoader
 */
class FileLoader {
  /**
   * Get icons for a specific journey.
   *
   * @param {Object} sections
   * @returns {Array} List of icons.
   * @memberof FileLoader
   */
  async getIconForJourney(sections) {
    const iconList = [];
    for (let i = 0; i < sections.length; i++) {
      iconList[i] = await this.getIconBySection(sections[i]);
    }
    return iconList;
  }

  /**
   * Get icon for a section of the journey.
   *
   * @param {Object} section
   * @returns {function} The icon.
   * @memberof FileLoader
   */
  getIconBySection(section) {
    if (
      section.type === 'street_network' ||
      section.type === 'crow_fly' ||
      section.type === 'transfer'
    ) {
      return icons.walkIcon;
    }
    if (section.type === 'waiting') {
      return icons.wait;
    }
    return this.getPublicTransportIcon(section);
  }

  /**
   * Get the icon for a type of public transport.
   *
   * @param {String} name
   * @returns {function} The icon.
   * @memberof FileLoader
   */
  getIconForTypeOfPublicTransportation(name) {
    let icon = null;
    switch (name) {
      case 'Métro':
        icon = icons.general_metro;
        break;
      case 'Bus':
        icon = icons.general_bus;
        break;
      case 'RER':
        icon = icons.general_rer;
        break;
      case 'Tramway':
        icon = icons.general_tram;
        break;
      default:
        break;
    }
    return icon;
  }

  /**
   * Get the icon of the public transport.
   *
   * @param {object} section
   * @returns {function} The icon.
   * @memberof FileLoader
   */
  getPublicTransportIcon(section) {
    let icon = null;
    if (section.type === 'public_transport' && section.display_informations != null) {
      switch (section.display_informations.label) {
        case 'A':
          icon = icons.RERA;
          break;
        case 'B':
          icon = icons.RERB;
          break;
        case 'C':
          icon = icons.RERC;
          break;
        case 'D':
          icon = icons.RERD;
          break;
        case 'E':
          icon = icons.RERE;
          break;
        case 'H':
          icon = icons.TRAINH;
          break;
        case 'J':
          icon = icons.TRAINJ;
          break;
        case 'K':
          icon = icons.TRAINK;
          break;
        case 'L':
          icon = icons.TRAINL;
          break;
        case 'N':
          icon = icons.TRAINN;
          break;
        case 'P':
          icon = icons.TRAINP;
          break;
        case 'R':
          icon = icons.TRAINR;
          break;
        case 'U':
          icon = icons.TRAINU;
          break;
        case '1':
          icon = icons.M1;
          break;
        case '2':
          icon = icons.M2;
          break;
        case '3':
          icon = icons.M3;
          break;
        case '4':
          icon = icons.M4;
          break;
        case '5':
          icon = icons.M5;
          break;
        case '6':
          icon = icons.M6;
          break;
        case '7':
          icon = icons.M7;
          break;
        case '7B':
          icon = icons.M7bis;
          break;
        case '8':
          icon = icons.M8;
          break;
        case '9':
          icon = icons.M9;
          break;
        case '10':
          icon = icons.M10;
          break;
        case '11':
          icon = icons.M11;
          break;
        case '12':
          icon = icons.M12;
          break;
        case '13':
          icon = icons.M13;
          break;
        case '14':
          icon = icons.M14;
          break;
        case 'T1':
          icon = icons.T1;
          break;
        case 'T2':
          icon = icons.T2;
          break;
        case 'T3A':
          icon = icons.T3a;
          break;
        case 'T3B':
          icon = icons.T3b;
          break;
        case 'T4':
          icon = icons.T4;
          break;
        case 'T5':
          icon = icons.T5;
          break;
        case 'T6':
          icon = icons.T6;
          break;
        case 'T7':
          icon = icons.T7;
          break;
        case 'T8':
          icon = icons.T8;
          break;
        default:
          icon = icons.Bus;
      }
    }
    return icon;
  }
}
export default FileLoader;
