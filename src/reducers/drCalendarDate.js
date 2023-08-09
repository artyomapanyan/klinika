export default function drCalendarDate(state = null, action){

    if(action.type === 'CALENDAR_DATE'){
        return action.payload
    }

    return state;
}