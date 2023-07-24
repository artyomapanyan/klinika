export default function dashboardMenuState(state = false, action){

    if(action.type === 'DASHBOARD_STATE'){
        return action.payload
    }

    return state;
}