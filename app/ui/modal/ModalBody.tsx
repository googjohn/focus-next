import { cn } from "@/app/lib/utility";
import { ChangeEvent, ModalDispatch } from "@/app/lib/definitions";

export default function ModalBody({ localState, dispatch }: ModalDispatch) {

    const handleChangeSettings = (e: ChangeEvent) => {
        dispatch({
            type: "input_change",
            payload: {
                id: e.currentTarget.id,
                value: e.currentTarget.value,
            }
        })
    };

    return (
        <>
            <div className="modal-body-container w-full p-5">
                <div className="field-group w-full">
                    <h2 className="title mb-2.5">{'Time (minutes)'}</h2>
                    <div className="input-group flex gap-2.5 w-full mb-2.5">
                        <div className="group-focus w-full basis-1/3 grow-0">
                            <label
                                className="block font-semibold whitespace-nowrap text-lg"
                                htmlFor="focus">Focus
                            </label>
                            <input
                                className={cn(
                                    ' rounded-sm w-full px-5 py-2.5 bg-black/5'
                                )}
                                type="number"
                                id="focus"
                                value={localState.focus}
                                placeholder="25"
                                onChange={handleChangeSettings}
                            />
                        </div>
                        <div className="group-short basis-1/3 grow-0">
                            <label
                                className="block font-semibold whitespace-nowrap text-lg"
                                htmlFor="short">Short Break
                            </label>
                            <input
                                className={cn(
                                    ' rounded-sm w-full px-5 py-2.5 bg-black/5'
                                )}
                                type="number"
                                id="short"
                                value={localState.short}
                                placeholder="5"
                                onChange={handleChangeSettings}
                            />
                        </div>
                        <div className="group-long basis-1/3 grow-0">
                            <label
                                className="block font-semibold whitespace-nowrap text-lg"
                                htmlFor="long">Long Break
                            </label>
                            <input
                                className={cn(
                                    ' rounded-sm w-full px-5 py-2.5 bg-black/5'
                                )}
                                type="number"
                                id="long"
                                value={localState.long}
                                placeholder="15"
                                onChange={handleChangeSettings}
                            />
                        </div>
                    </div>
                </div>
                <div className="field-group">
                    {/* <h2 className="">{'Long Break Interval'}</h2> */}
                    <div className="long-break-interval flex gap-2.5 justify-between">
                        <label
                            className="block font-semibold whitespace-nowrap text-lg"
                            htmlFor="interval">Long Break Interval
                        </label>
                        <input
                            className={cn(
                                ' rounded-sm w-full px-5 py-2.5 max-w-35 bg-black/5'
                            )}
                            type="number"
                            id="interval"
                            value={localState.interval}
                            placeholder="4"
                            onChange={handleChangeSettings}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}