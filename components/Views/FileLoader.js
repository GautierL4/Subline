const icons = {
    walkIcon: require('../../assets/icons/walk.png'),
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
    T1: require('../../assets/icons/lines/T1genRVB.png'),
    T2: require('../../assets/icons/lines/T2genRVB.png'),
    T3a: require('../../assets/icons/lines/T3a-genRVB.png'),
    T3b: require('../../assets/icons/lines/T3b-genRVB.png'),
    T5: require('../../assets/icons/lines/T5genRVB.png'),
    T6: require('../../assets/icons/lines/T6genRVB.png'),
    T7: require('../../assets/icons/lines/T7genRVB.png'),
    T8: require('../../assets/icons/lines/T8genRVB.png'),
    Bus: require('../../assets/icons/icon_bus.png'),
};

class FileLoader {

    async getIconForJourney(sections){
        console.log("Starting Loaded Icons");
        let iconList = [];
        for(let i=0;i<sections.length;i++){
            console.log("Get "+i+" Icon");
            iconList[i] = await this.getIconBySection(sections[i]);
            console.log("Icon "+i+" Loaded");
        }
        console.log("Icon Loaded",icons);
        return iconList;
    }

    getIconBySection(section){
        console.log("Get Icon from Section");
        if(section.type == "street_network" || section.type == "crow_fly" || section.type == "transfer"){
            console.log("Get Walk Icon");
            return icons.walkIcon;
        }
        else if(section.type == "waiting"){
            console.log("Get Wait Icon");
            return "waitIcon";
        }
        else{
            console.log("Get Public Transportation Icon");
            icon = this.getPublicTransportIcon(section);
            return icon;
        }
    }

    getPublicTransportIcon(section){
        let icon = null;
        console.log(section.type);
        if(section.type == "public_transport" && section.display_informations != null){
            console.log(section.display_informations.label);
            switch(section.display_informations.label){
                case 'A':
                    icon = icons.RERA;
                    break;
                case 'B':
                    icon = icons.RERB;
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
        return icon
    }
}

export default FileLoader;