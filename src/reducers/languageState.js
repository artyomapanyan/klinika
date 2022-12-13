export default function languageState(state = "", action){

    if(action.type === 'LANGUAGE_STATE'){
        return action.payload
    }

    return state;
}