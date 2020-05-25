export const addLocation=(address) =>{
    return{
        type:'ADD',
        payload: address
    }
}

export const removeLocation=(address)=>{
    return{
        type:'REMOVE',
        payload: address
    }
}

export const removeAllLocations=()=>{
    return{
        type:'REMOVEALL',
        payload:null
    }
}