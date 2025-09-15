import React from 'react';
import {Loader} from "lucide-react";

export default function LoadingPage() {
    return (
        <div className={`flex justify-center items-center h-screen`}>
            <Loader className={`animate-spin`} size={70}/>
        </div>
    );
}
