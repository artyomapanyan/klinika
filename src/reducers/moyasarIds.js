export default function moyasarIds(state = {}, action){
    if(action.type === 'APP_INV_ID'){
        return action.payload
    }

    return state;
}