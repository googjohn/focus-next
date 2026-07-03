"use client";

import type { ButtonProps } from "../lib/definitions";

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