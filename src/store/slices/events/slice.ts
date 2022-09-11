import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
// Define a type of User Meta
export interface EventState {
    events: Record<string, any>[];
    copyEvents: Record<string, any>[];
}
const initialState: EventState = {
    events: [],
    copyEvents: []
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<{ event: object }>) => {
            const { event } = action.payload
            state.events = [...state.events, event]
            state.copyEvents = [...state.copyEvents, event]
        },
        editEvent: (state, action: PayloadAction<{ event: object, id: any }>) => {
            const { event, id } = action.payload
            const newEvent = [...state.events]
            const newCopyEvent = [...state.copyEvents]
            const eventIndex = newEvent.findIndex(item => item?.id == id)
            const copyEventIndex = newCopyEvent.findIndex(item => item?.id == id)            
            if (eventIndex > -1) {
                newEvent[eventIndex] = event
            }
            if (copyEventIndex > -1) {
                newCopyEvent[copyEventIndex] = event
            }
            state.events = newEvent
            state.copyEvents = newCopyEvent
        },
        deleteEvent: (state, action: PayloadAction<{  id: any }>) => {
            const { id } = action.payload
            const newEvent = [...state.events]
            const newCopyEvent = [...state.copyEvents]
            const eventIndex = newEvent.findIndex(item => item?.id == id)
            const copyEventIndex = newCopyEvent.findIndex(item => item?.id == id)    
            if (eventIndex > -1) {
                newEvent.splice(eventIndex,1)
            }
            if (copyEventIndex > -1) {
                newCopyEvent.splice(eventIndex,1)
            }
            state.events = newEvent
            state.copyEvents = newCopyEvent
        },
        filterEvent: (state, action: PayloadAction<{  eventType: string }>) => {
            const { eventType } = action.payload
            let filterEvent = [...state.copyEvents]
            if (eventType!='All') {
                 filterEvent=  state.copyEvents.filter(item => item?.eventType === eventType)       
            }
            state.events = filterEvent
        },
    },
});
// Actions
export const { addEvent,editEvent,deleteEvent,filterEvent } = eventSlice.actions
// Reducer
export const eventSliceReducer = eventSlice.reducer;
// Selectors
export const selectEvents = (state: RootState) => state.events.events;
export const selectCopyEvents = (state: RootState) => state.events.copyEvents;

export default eventSlice;