"use server"

import ViewComp from "@/components/view/ViewComp";
import dashboard from "@/components/dashboard/dashboard";
import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts";
import New from "@/components/new";
import Charter from "@/components/charter";
import Nav from "@/components/nav";


const App = () => {

    return (
        <main className="w-full h-screen flex justify-center items-center bg-gray-/10">
            <ViewComp comps={
                {
                    dashboard: <Dashboard/>,
                    yachts: <Yachts/>,
                    new: <New/>,
                    charters: <Charter/>,
                    destinations: <div>KYS</div>
                }
            }/>
            <Nav/>


        </main>
    );
};

export default App;
