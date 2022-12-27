export default function globalState(state = false, action){

    if(action.type === 'GLOBAL_STATE'){
        return action.payload
    }

    return state;
}