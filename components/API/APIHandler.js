import { APIkey } from './key.js';


const header = { headers : 
                    {'Authorization': APIkey}
                };


const APIBaseURL = 'https://api.navitia.io/v1/';
const autoCompleteService = 'places?q=';
const autoCompleteLinesService = 'pt_objects?q=';
const lineOption = '&type%5B%5D=line&';
const to = 'journeys?to=';
const from = 'from=';
const departureDate = 'datetime_represents=departure&datetime=';
const arrivalDate = 'datetime_represents=arrival&datetime=';
const typeOption = '&type%5B%5D='
const countOption = '&count='
const line = '/lines?'
const minimumNbJourneys = 'min_nb_journeys='

class APIHandler{

    constructor(){
        this.coverage = 'coverage/fr-idf/';
    }

    //Make an HTTP Request to the API to request Places based on user input
    async getAutoCompletePlaces(userInput,type){
        var request = APIBaseURL + this.coverage + autoCompleteService + userInput + typeOption + type + countOption + 3;
        // console.log(request)
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        return responseJson;
    }

    //Get places base on user input and extract important value
    async getPlaces(userInput,type){
        try{
            response = await this.getAutoCompletePlaces(userInput,type);
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
            var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&' + minimumNbJourneys + 6;
            console.log(request)
        }
        else {
            if(represents == "arrival"){
                var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&' + arrivalDate + date + '&' + minimumNbJourneys + 6;
            }
            else{
                var request = APIBaseURL + this.coverage + to + arrival + '&' + from + departure + '&' + departureDate + date + '&' + minimumNbJourneys + 6;
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
            sections_without_waiting_and_transfer = []
            journey[i] = {
                durations : response.journeys[i].durations,
                duration : response.journeys[i].duration,
                sections: response.journeys[i].sections,
                departure_date_time: response.journeys[i].departure_date_time,
                requested_date_time: response.journeys[i].requested_date_time,
                type: response.journeys[i].type,
            };
            for(let j=0; j<journey[i].sections.length;j++) {
                let section = journey[i].sections[j]
                if(section.type !== 'transfer' && section.type !== 'waiting') {
                    sections_without_waiting_and_transfer.push(section)
                }
            }
            journey[i].sections_without_waiting_and_transfer = sections_without_waiting_and_transfer
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
                type : response.places[i].embedded_type,
            }
            if(response.places[i].embedded_type==='stop_area') {
                places[i].commercial_modes = response.places[i].stop_area.commercial_modes
            }
        }
        data = {
            places: places,
        }
        // console.log(data)
        return data;
    }

    // LINES

    async getAutoCompleteLines(userInput){
        var request = APIBaseURL + this.coverage + autoCompleteLinesService + userInput + lineOption;
        // console.log(request);
        try{
            let response = await fetch(request,header);
            responseJson = await response.json();
        } catch(e){
            console.error(e);
        }
        return responseJson;
    }

    extractLinesFromResponse(response){
        places = [];
        for(let i=0;i<response.pt_objects.length;i++){
            places[i] = {
                id : response.pt_objects[i].id,
                name : response.pt_objects[i].name,
                bgColor: response.pt_objects[i].line.color,
                color: response.pt_objects[i].line.text_color,
            }
        }
        data = {
            places: places,
        }
        return data;
    }

    async getLines(userInput) {
        try{
            response = await this.getAutoCompleteLines(userInput);
            if(!(response.message == "Search word absent") && (response.pt_objects)){
                var data = this.extractLinesFromResponse(response);
            }
        }
        catch(e){
            console.error(e);
        }
        return data;
    }

    // Stop areas

    extractStopAreasFromResponse(response){
        stop = []
        for(let i=0;i<response.stop_points.length;i++){
            stop[i] = {
                id : response.stop_points[i].id,
                name : response.stop_points[i].name,
            }
        }
        data = {
            stop: stop,
        }
        return data
    }

    async getStopAreas(line) {
        var request = APIBaseURL + this.coverage + 'lines/' + line + '/stop_points?count=100'
        try{
            let response = await fetch(request,header)
            responseJson = await response.json()
        } catch(e){
            console.error(e)
        }
        if(!(responseJson.message == "Search word absent") && (responseJson.stop_points)){
            var data = this.extractStopAreasFromResponse(responseJson);
        }
        return data
    }

}

module.exports = APIHandler;
