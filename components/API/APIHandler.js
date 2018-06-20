import { APIkey } from './key.js';

const header = { headers : 
                    {'Authorization': APIkey}
                };


const APIBaseURL = 'https://api.navitia.io/v1/';
const autoCompleteService = 'places?q=';

class APIHandler{

    constructor(){
        this.coverage = 'coverage/fr-idf/';
    }

    async getAutoCompletePlaces(userInput){
        var request = APIBaseURL + this.coverage + autoCompleteService + userInput;
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        console.log(responseJson);
        return responseJson;
    }

}

module.exports = APIHandler;