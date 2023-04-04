export default function owner(state = {}, action){

    if(action.type === 'CLINIC_ID'){
        return {
            ...state,
            ...action.payload
        }
    }
    if(action.type === 'MONTH'){
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
}