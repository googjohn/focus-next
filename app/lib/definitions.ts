import {
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    ButtonHTMLAttributes,
} from "react";

// type for timer status
export type TimerStatus = "paused" | "finished" | "running" | "stopped";

// timer state:: used by countdown
export interface TimerState {
    timerStatus: TimerStatus;
    timeLeft: number;
    sessions: number;
}

// type for current mode selected
export type SelectedMode = "focus" | "short" | "long";

// reusable generic state setter
export type SetState<T> = Dispatch<SetStateAction<T>>;

// type for modal
export type ModalState = {
    isModalOpen: boolean;
    handleModalOpen: () => void;
}

// children props
export type ChildrenProps = Readonly<PropsWithChildren>

// mode selection ['focus', 'short', 'long']
export type SelectedModeState = {
    selectedMode: SelectedMode;
    handleSelectedMode: (mod: SelectedMode) => void;
}

// default timer settings
export interface TimerSettings {
    focus: number,
    short: number,
    long: number,
    interval: number,
}

export type SettingsState = {
    settings: TimerSettings;
    handleChangeSettings: (localState: TimerSettings) => void;
}

export type ModalProps = {
    modalProp: ModalState;
    settingsProp: SettingsState;
    selectedMode: SelectedMode;
}

export type TimerProps = {
    selectedMode: SelectedMode;
    timerStatus: TimerStatus
}

/* timer types for reducer */
export type TimerActions =
    | { type: "SET_STATUS", payload: { status: TimerStatus } }
    | { type: "FINISHED" }
    | { type: "TICKING" }
    | { type: "UPDATE_TIME", payload: { duration: number } }
    | { type: "UPDATE_SESSIONS" }

/* payload, modal local state, props reducer types */
export interface SettingsPayloadAction {
    id: string;
    value: string;
}
export type SettingsPayloadActionType = {
    type: "input_change";
    payload: SettingsPayloadAction;
}

export interface ModalDispatch {
    localState: TimerSettings;
    dispatch: Dispatch<SettingsPayloadActionType>;
}

/* events type */
export type MouseEvent = React.MouseEvent<HTMLButtonElement>

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type SubmitEvent = React.SubmitEvent<HTMLFormElement>

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
// export type BtnProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>

// setTimeout and setInterval types
export type IntervalRefType = ReturnType<typeof setInterval> | null
export type TimeoutRefType = ReturnType<typeof setTimeout> | null