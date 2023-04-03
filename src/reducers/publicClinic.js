export default function publicClinic(state = {}, action){

    if(action.type === 'PUBLIC_CLINIC'){
        return {
            ...state,
            ...action.payload
        }
    }

    return state;
}