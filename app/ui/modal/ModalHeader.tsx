import { XMarkIcon } from "@heroicons/react/24/outline";
import { ModalState } from "@/app/lib/definitions";
import Button from "../button";

export default function ModalHeader({ handleModalOpen }: Pick<ModalState, 'handleModalOpen'>) {
    return (
        <>
            <div className="modal-container border-b border-b-black/20 w-full relative flex justify-center items-center pb-5">
                <div className="modal-header">
                    <span className="text-2xl">Settings</span>
                </div>
                <Button
                    className="absolute right-0 mr-2.5 p-1.5 cursor-pointer hover:bg-black/5 rounded-md"
                    onClick={handleModalOpen}
                >
                    <XMarkIcon className="size-6" />
                </Button>
            </div>
        </>
    )
}