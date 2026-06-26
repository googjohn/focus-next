import { cn } from "@/app/lib/utility";
import { SettingsState } from "@/app/lib/definitions";

export default function ModalBody({ settings, handleChangeSettings }: SettingsState) {
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
                                value={settings.focus}
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
                                value={settings.short}
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
                                value={settings.long}
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
                            value={settings.interval}
                            placeholder="4"
                            onChange={handleChangeSettings}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}