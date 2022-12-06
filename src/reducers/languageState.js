export default function languageState(state = false, action){

    if(action.type === 'LANGUAGE_STATE'){
        return action.payload
    }

    return state;
}