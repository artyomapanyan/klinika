export default function statusCode(state = null, action){

    if(action.type === 'STATUS_CODE'){
        return action.payload
    }

    return state;
}