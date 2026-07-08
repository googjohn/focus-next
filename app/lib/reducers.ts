import {
    TimerState,
    TimerActions,
    TimerSettings,
    SettingsPayloadActionType,
} from "./definitions"

/* timer reducer */
export function timerReducer(
    state: TimerState,
    action: TimerActions
): TimerState {
    switch (action.type) {
        case "START": {

            return {
                ...state,
                timerStatus: "running",
                stamp: Date.now()
            }
        }
        case "PAUSE": {

            return {
                ...state,
                timerStatus: "paused",
                sessionDuration: state.timeLeft,
            }
        }
        case "SET_STATUS":
            return {
                ...state,
                timerStatus: action.payload.status
            }
        case "TICKING": {

            const elapsedTime = Math.floor((Date.now() - state.stamp) / 1000)
            const remainingTime = state.sessionDuration - elapsedTime;

            return {
                ...state,
                timeLeft: Math.max(0, remainingTime),
            }
        }
        case "UPDATE_TIME": {
            return {
                ...state,
                sessionDuration: action.payload.duration,
                timeLeft: action.payload.duration,
            }
        }
        case "UPDATE_SESSIONS": {
            return {
                ...state,
                sessions: state.sessions + 1
            }
        }
        default:
            return state;
    }
}

/* user settings reducer */
export const userSettingsReducer = (
    state: Omit<TimerSettings, "sessions">,
    action: SettingsPayloadActionType
): Omit<TimerSettings, "sessions"> => {
    switch (action.type) {
        case "input_change":
            return {
                ...state,
                [action.payload.id]: action.payload.value
            }
        default:
            return state;
    }
}