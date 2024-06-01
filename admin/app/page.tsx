"use server";

import ViewComp from "@/components/view/ViewComp";
import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts";
import New from "@/components/yachts/new";
import Charter from "@/components/charter";
import Nav from "@/components/nav";
import Brokerino from "@/components/brokerino";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchBrokerino } from "@/actions/brokerino";

const App = async () => {
  const { getUser } = getKindeServerSession(),
    user = await getUser();

  return (
    <main className="w-full h-screen flex justify-center items-center bg-stone-100">
      {user && <Brokerino data={await fetchBrokerino(user.id)} id={user.id} />}
      <ViewComp
        comps={{
          dashboard: <Dashboard />,
          yachts: <Yachts />,
          new: <New />,
          charters: <Charter />,
          destinations: <div>KYS</div>,
        }}
      />
      <Nav />
    </main>
  );
};

export default App;
