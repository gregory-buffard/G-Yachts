"use server"

import ViewComp from "@/components/view/ViewComp";
import dashboard from "@/components/dashboard/dashboard";
import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts/yachts";
import New from "@/components/yachts/new";
import Charter from "@/components/charters/charter";
import Nav from "@/components/nav";
import Destination from "@/components/destinations/destinations";


const App = () => {

    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-/10">
            <ViewComp comps={
                {
                    dashboard: <Dashboard/>,
                    yachts: <Yachts/>,
                    new: <New/>,
                    charters: <Charter/>,
                    destinations: <Destination/>
                }
            }/>
            <Nav/>


        </main>
    );
};

export default App;
