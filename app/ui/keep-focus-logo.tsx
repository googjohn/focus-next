import { ClockIcon } from "@heroicons/react/24/outline"

export default function KeepFocusLogo() {
    return (
        <div className="text-2xl sm:text-3xl flex flex-row items-center gap-1">
            <span>
                <ClockIcon className="size-6 sm:size-8 text-white/80" />
            </span>
            <span className="text-white/80">Keep Focus</span>
        </div>
    )
}