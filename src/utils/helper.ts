import { showMessage } from 'react-native-flash-message';
import moment from 'moment'
export const  _showMessage = (description:string) => {
    showMessage({
        message: 'Error',
        description: description,
        type: 'danger',
        duration: 2000,
        position: 'top'
    });
}
export function isIntervalValid(startTime:string|any, endTime:string|any, format = "hh:mm A") {
    function to24FormatMinutes(time:string) {
        let hours = moment(time, format).get('hours');
        let minutes = moment(time, format).get('minutes');
        minutes += hours * 60;
        if (moment(time, format).format("A") == "PM")
           { minutes += (12 * 60)}
        return minutes
    }
    return (to24FormatMinutes(startTime) < to24FormatMinutes(endTime))
}
export function isGreater(startTime,endTime) {
    return !isIntervalValid.apply(null, arguments)
}
export function isLesser(startTime,endTim) {
    return isIntervalValid.apply(null, arguments)
}
//slotA = {startTime:...,endTime:...}
export function areSlotsConflicting(slotA: { startTime: string; endTime: string; }, slotB: { startTime: string; endTime: string; }) {
    if (isGreater(slotA.startTime, slotB.startTime) && isGreater(slotB.endTime, slotA.startTime))
        return true
    if (isGreater(slotA.endTime, slotB.startTime) && isGreater(slotB.endTime, slotA.endTime))
        return true
    if (isLesser(slotA.startTime, slotB.startTime) && isGreater(slotA.endTime, slotB.endTime))
        return true
}