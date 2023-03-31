export default function publicClinicId(state = '', action){

    if(action.type === 'CLINIC_ID'){
        return action.payload
    }

    return state;
}