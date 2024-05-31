"use server"

import ViewComp from "@/components/view/ViewComp";

import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts";
import New from "@/components/yachts/new";
import Charter from "@/components/charter";
import Nav from "@/components/nav";
import NewsletterPage from "@/components/newsletter/newsletter";

const App = () => {
    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-/10">
            <ViewComp comps={
                {
                    dashboard: <Dashboard />,
                    yachts: <Yachts />,
                    new: <New />,
                    charters: <Charter />,
                    destinations: <div>KYS</div>,
                    newsletter: <NewsletterPage />
                }
            } />
            <Nav />
        </main>
    );
};

export default App;
