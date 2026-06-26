"use client";

import Image from "next/image";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Clock() {
    return (
        <div className="flex justify-between items-center w-full">
            <span className="text-2xl">Keep Focus
                <Image src="https://fav.farm/clock" width={128} height={128} alt="icon"></Image>
            </span>
            <Cog6ToothIcon className="size-10 border py-1 px-2 rounded-md"></Cog6ToothIcon>
        </div>
    )
}