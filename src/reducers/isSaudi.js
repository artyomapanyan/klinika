export default function isSaudi(state = true, action){
    if(action.type === 'IS_SAUDI'){
        return action.payload
    }

    return state;
}