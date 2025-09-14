import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Eye, EyeOff} from "lucide-react";

export default function ShowHidePassword({placeholder, ...restProps}: {
    placeholder: string
} & React.ComponentProps<typeof Input>) {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <Input {...restProps} className={`p-5 my-5 focus-visible:ring-[#717FE080]`}
                   type={showPassword ? 'text' : 'password'} placeholder={placeholder}>
            </Input>
            <button type="button" onClick={togglePasswordVisibility}
                    className={`absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-none border-0 cursor-pointer hover:text-[#717FE0] transition-all duration-400`}>
                {showPassword ? <Eye/> : <EyeOff/>}
            </button>
        </>
    );
}