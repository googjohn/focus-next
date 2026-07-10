import {
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    ButtonHTMLAttributes,
    RefObject,
} from "react";

// type for timer status
export type TimerStatus = "paused" | "finished" | "running" | "stopped";

// timer state:: used by countdown
export interface TimerState {
    timerStatus: TimerStatus;
    sessions: number;
    timeLeft: number;
    sessionDuration: number;
    stamp: number; // in seconds stamp / 1000
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
    | { type: "START" }
    | { type: "PAUSE" }
    | { type: "SET_STATUS", payload: { status: TimerStatus } } // stopped | start | paused | finished
    | { type: "TICKING" } // updates timeleft
    | { type: "UPDATE_TIME", payload: { duration: number } } // updates total duration
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

export type Task = {
    checked: boolean,
    value: string,
    id: number,
}

export type TaskInputProps = {
    inputRef: RefObject<HTMLInputElement | null>;
    newTask: string;
    handleInputChange: (e: ChangeEvent) => void;
    handleAddTask: () => void;
}

export type TaskHandles = {
    handleClear: () => void;
    handleDelete: (id: number) => void;
    handleCheckboxChange: (index: number) => void;
}