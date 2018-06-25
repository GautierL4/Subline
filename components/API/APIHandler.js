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
const departureArivalDate = 'datetime_represents=departure&datetime=';
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
            console.log(response);
            if(!(response.message == "Search word absent") && (response.places)){
                var data = this.extractDataFromResponse(response);
            }
        }
        catch(e){
            console.error(e);
        }
        return data;
    }


    async getJourney(departure,arrival,date){

        if(date == null){

            var request = APIBaseURL + this.coverage + to + departure + '&' + from + arrival + '&';
        } else {

             var request = APIBaseURL + this.coverage + to + departure + '&' + from + arrival + '&' + arrivalDate + date + '&';
        }


       
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        return responseJson;
    }

    //Extract stop area and places from API Response
    extractDataFromResponse(response){
        places = [];
        stops = [];
        var j = 0;
        var k = 0;
        for(let i=0;i<response.places.length;i++){
            if(response.places[i].embedded_type != "stop_area"){
                places[j] = {
                    id : response.places[i].id,
                    name : response.places[i].name
                }
                j++;
            }
            else{
                stops[k] = {
                    id : response.places[i].id,
                    name : response.places[i].name
                }
                k++;
            }
        }

        data = {
            places: places,
            stops: stops
        }

        return data;
    }


}

module.exports = APIHandler;