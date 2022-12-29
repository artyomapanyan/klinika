export default function app(state = {}, action) {
    if(action.type==='APP'){
        return {
            ...action.payload
        }
    }
    if(action.type === 'LANGUAGE_STATE'){
        return {
            ...state,
            current_locale: action.payload
        }


    }
    return state

}