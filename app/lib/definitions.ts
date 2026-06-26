import {
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    ButtonHTMLAttributes,
} from "react";

// type for timer status
export type TimerStatus = "running" | "stopped";

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
export type TimerSettings = {
    focus: number,
    short: number,
    long: number,
    sessions: number,
    interval: number,
}

export type SettingsState = {
    settings: TimerSettings;
    handleChangeSettings: (e: ChangeEvent) => void;
    handleSaveSettings?: () => void;
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


export type MouseEvent = React.MouseEvent<HTMLButtonElement>

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type SubmitEvent = React.SubmitEvent<HTMLFormElement>

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
// export type BtnProps = React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>

// setTimeout and setInterval types
export type IntervalRefType = ReturnType<typeof setInterval> | null
export type TimeoutRefType = ReturnType<typeof setTimeout> | null