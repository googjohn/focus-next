import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => twMerge(clsx(...input))

export const formatTime = (duration: number) => {
    if (!duration) {
        return {
            min: '00',
            sec: '00'
        }
    }

    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);

    return {
        min: String(min).padStart(2, '0'),
        sec: String(sec).padStart(2, '0'),
    }
}
