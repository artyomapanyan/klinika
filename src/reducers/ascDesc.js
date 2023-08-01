export default function ascDesc(state = null, action){

    if(action.type === 'ASC_DESC'){
        return action.payload
    }

    return state;
}