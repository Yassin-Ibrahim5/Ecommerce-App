"use client";
import React from 'react';
import {useSession} from "next-auth/react";

export default function BrandsPage() {
    const session = useSession();
    console.log(session, "session from client component");
    if (!session.data) return (
        <p>Need to log in</p>
    )
    return <div>Brands</div>;
}