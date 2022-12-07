export default function auth(state = {}, action) {
        if(action.type==='AUTH'){
            return {
                ...action.payload,
                token:'Bearer ' +action.payload.token

            }
        }
    if(action.type==='LOGOUT'){
        return {

        }
    }
    return state

}
