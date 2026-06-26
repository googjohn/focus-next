"use client";

import type { ButtonProps } from "../lib/definitions";
type ModalProps = {
    isOpen: boolean;
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={className}
        >
            {children}
        </button>
    )
}