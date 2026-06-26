import { ChildrenProps } from "@/app/lib/definitions";

export default function Body({ children }: ChildrenProps) {
    return (
        <div className="w-full max-w-lg h-75 p-5 bg-white/40 rounded-xl mt-2.5 flex flex-col justify-between items-center">
            {children}
        </div>
    )
}