"use client";
import Nav from "@/components/nav";
import Yachts from "@/components/yachts";
import {useEffect, useState} from "react";
import Dashboard from "@/components/dashboard";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Auth from "@/components/auth";
import {redirect} from "next/navigation";
import New from "@/components/new";

const App = () => {
    const [active, setActive] = useState<"dashboard"|"yachts"| "new">("dashboard");
    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    const comps = {
        dashboard: <Dashboard setActive={setActive}/>,
        yachts: <Yachts/>,
        new: <New setActive={setActive}/>
    };



    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) redirect('/api/auth/login?post_login_redirect_url=/')

    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-/10">
            <Nav active={active} setActive={setActive}/>
            {comps[active]}
        </main>
    );
};

export default App;
