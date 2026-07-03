import { useReducer } from "react"
import { cn } from "@/app/lib/utility"
import { inter } from "../fonts"
import { localUserSettings } from "@/app/lib/constants"
import { userSettingsReducer } from "@/app/lib/reducers"
import { ModalProps } from "@/app/lib/definitions"
import ModalHeader from "./ModalHeader"
import ModalBody from "./ModalBody"
import Button from "../button"



export default function Modal({
    modalProp,
    selectedMode,
    settingsProp,
}: ModalProps) {

    const { isModalOpen, handleModalOpen } = modalProp
    const { settings, handleChangeSettings, saveSettings } = settingsProp
    const [localState, dispatch] = useReducer(userSettingsReducer, localUserSettings)

    const handleSaveSettings = () => {
        handleChangeSettings(localState)
        saveSettings(settings)
        alert('New settings saved.')
        handleModalOpen()
    }

    return (
        <>
            <div className={cn(
                "w-full h-full fixed inset-0 bg-black/30",
                isModalOpen ? "block" : 'hidden',
            )}>
                <div
                    className={cn(
                        "modal-container rounded-xl max-w-130  w-full m-auto mt-16 bg-white/95 p-5",
                    )}
                >
                    <div className="modal-header w-full">
                        <ModalHeader handleModalOpen={handleModalOpen} />
                        <ModalBody
                            localState={localState}
                            dispatch={dispatch}
                        />
                        <Button
                            className={cn(
                                `${inter.className} font-bold  bg-black/5  antialiased tracking-wider px-7 py-2 rounded-lg text-2xl m-auto block hover:bg-black/10 cursor-pointer`,
                                {
                                    "text-focus": selectedMode === 'focus',
                                    "text-short": selectedMode === 'short',
                                    "text-long": selectedMode === 'long',
                                }
                            )}
                            onClick={handleSaveSettings}
                        >
                            {'SAVE'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}