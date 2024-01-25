export default function auth(state = {}, action) {
    if(action.type==='AUTH'){
            return {
                ...action.payload,
                token:'Bearer ' +action.payload.token,
                user:{
                    ...action.payload.user,
                    permissions:action.payload.selected_role.permissions.map(e=>e.name),
                    roles: action.payload.user.roles.filter(item => item.key !== 'temp-patient' && item.key !== 'user')
                }

            }
    }
    if(action.type==='ROLES_UPDATE'){
            return {
                ...state,
                user:{
                    ...state.user,
                    roles:state.user.roles.map(role=>{
                     return   action.payload.find(e=>e.id===role.id)
                    })
                }

            }
    }
    if(action.type==='LOGOUT'){
        return {

        }
    }
    if(action.type==='ROLE_CHANGE'){
        return {
            ...state,
            selected_role:action.payload,
            user:{
                ...state.user,
                permissions: action.payload.permissions.map(e=>e.name)
            }

        }
    }

    if(action.type==='USER_UPDATE'){
        return {
           ...state,

            user:{
                ...state.user,
                ...action.payload
            }

        }
    }
    return state

}
