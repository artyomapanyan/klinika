export default function app(state = {}, action) {
    if(action.type==='APP'){
        return {
            ...action.payload
        }
    }
    return state

}