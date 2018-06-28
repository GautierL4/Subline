import { APIkey } from './key.js';
//import base64 from "base-64";

//const EncodedKey = base64.encode(`${APIkey}:${""}`);


const header = { headers : 
                    {'Authorization': APIkey}
                };


const APIBaseURL = 'https://api.navitia.io/v1/';
const autoCompleteService = 'places?q=';
const to = 'journeys?to=';
const from = 'from=';
const departureDate = 'datetime_represents=departure&datetime=';
const arrivalDate = 'datetime_represents=arrival&datetime=';

class APIHandler{

    constructor(){
        this.coverage = 'coverage/fr-idf/';
    }

    //Make an HTTP Request to the API to request Places based on user input
    async getAutoCompletePlaces(userInput){
        var request = APIBaseURL + this.coverage + autoCompleteService + userInput;
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        return responseJson;
    }

    //Get places base on user input and extract important value
    async getPlaces(userInput){
        try{
            response = await this.getAutoCompletePlaces(userInput);
            // console.log(response);
            if(!(response.message == "Search word absent") && (response.places)){
                var data = this.extractPlacesFromResponse(response);
            }
        }
        catch(e){
            console.error(e);
        }
        return data;
    }

    //Make an HTTP Request based on different cases
    async getJourneysFromAPI(departure,arrival,date=null,represents=null){
        if(date == null){
            var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&';
        }
        else {
            if(represents == "arrival"){
                var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&' + arrivalDate + date + '&';
            }
            else{
                var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&' + departureDate + date + '&';
            }
        }       
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        return responseJson;
    }

    //Get journeys base on different cases and extract important value
    async getJourneys(departure, arrival, date=null, represents=null){
        try{
            response = await this.getJourneysFromAPI(departure,arrival,date,represents);
            data = this.extractJourneysFromResponse(response);
        }
        catch(e){
            console.error(e);
        }
        return data;
    }

    //Extract journeys data from API Response
    extractJourneysFromResponse(response){
        journey = [];
        for(let i=0;i<response.journeys.length;i++){
            journey[i] = {
                duration : response.journeys[i].id,
                sections: response.journeys[i].sections,
                type: response.journeys[i].type,
            };
        }
        return journey;
    }

    //Extract stop area and places from API Response
    extractPlacesFromResponse(response){
        places = [];
        for(let i=0;i<response.places.length;i++){
            places[i] = {
                id : response.places[i].id,
                name : response.places[i].name,
                type : response.places[i].embedded_type
            }
        }
        data = {
            places: places,
        }
        return data;
    }

}

module.exports = APIHandler;
