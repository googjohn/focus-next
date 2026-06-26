import { lusitana } from "@/app/ui/fonts";
import { ModalState } from "@/app/lib/definitions";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import KeepFocusLogo from "@/app/ui/keep-focus-logo";

export default function Header({ handleModalOpen }: Pick<ModalState, 'handleModalOpen'>) {
    return (
        <div className="flex justify-between items-center w-full py-2.5 px-2  border-white/80">
            <div className={`${lusitana.className} antialiased title-logo`}>
                <KeepFocusLogo />
            </div>
            <div className="settings">
                <button
                    onClick={handleModalOpen}
                    className="py-1.5 px-2.5 rounded-lg  block bg-white/20 hover:bg-white/10 hover:text-white/10"
                >
                    <Cog6ToothIcon className="size-6 sm:size-8 text-white/80" />
                </button>
            </div>
        </div>
    )
}