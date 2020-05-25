const initialState = {
    address:[
        {latlng:{latitude:28.6984071,longitude:77.1340403}, address:"96 Kapil Vihar, Pitampura, Delhi - 110034 1"},
        {latlng:{latitude:29.6984071,longitude:77.1340403}, address:"96 Kapil Vihar, Pitampura, Delhi - 110034 2"},
        {latlng:{latitude:30.6984071,longitude:77.1340403}, address:"96 Kapil Vihar, Pitampura, Delhi - 110034 3"},
    ]
}

const locationReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'ADD':
            state = {...state}
            state.address.push(action.payload);
            break;
        case 'REMOVE':
            state = {...state}
            const index = state.address.indexOf(action.payload);
            state.address.splice(index,1);            
            break;            
        case 'REMOVEALL':{
            state = {address:[]}
            break;
        }
        default:
            console.log("default action type");
            break;                        
    }    
    return state;
}

export {locationReducer};