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
        case "SET_STATUS":
            return {
                ...state,
                timerStatus: action.payload.status
            }
        case "FINISHED":
            return {
                ...state,
                timerStatus: "finished",
                timeLeft: 0,
            }
        case "TICKING":
            return {
                ...state,
                timeLeft: Math.max(0, state.timeLeft - 1),
            }
        case "UPDATE_TIME": {
            if (state.timeLeft === action.payload.duration) return state;
            return {
                ...state,
                timeLeft: action.payload.duration
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