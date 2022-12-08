export default function auth(state = {}, action) {
        if(action.type==='AUTH'){
            return {
                ...action.payload,
                token:'Bearer ' +action.payload.token,
                user:{
                    ...action.payload.user,
                    permissions:action.payload.selected_role.permissions.map(e=>e.name)
                }

            }
        }
    if(action.type==='LOGOUT'){
        return {

        }
    }
    return state

}
