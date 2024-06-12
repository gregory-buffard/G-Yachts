"use server"

import ViewComp from "@/components/view/ViewComp";
import Dashboard from "@/components/dashboard/dashboard";
import Yachts from "@/components/yachts/yachts";
import New from "@/components/yachts/new";
import Charter from "@/components/charters/charter";
import Nav from "@/components/nav";
import NewsletterPage from "@/components/newsletter/newsletter";
import Brokerino from "@/components/brokerino";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { fetchBrokerino } from "@/actions/brokerino";
import Destination from "@/components/destinations/destinations";
import ArticlePage from "@/components/article/articlePage";
import MessagesPage from "@/components/messages/messages";

const App = async () => {
  const { getUser } = getKindeServerSession(),
    user = await getUser();

    return (
        <main className="w-full h-screen flex justify-center items-center bg-stone-100">
            {user && <Brokerino data={await fetchBrokerino(user.id)} id={user.id} />}
            <ViewComp comps={
                {
                    dashboard: <Dashboard/>,
                    yachts: <Yachts/>,
                    new: <New/>,
                    charters: <Charter/>,
                    destinations: <Destination/>,
                    newsletter: <NewsletterPage />,
                    article: <ArticlePage />,
                    messages: <MessagesPage />
                }
            } />
            <Nav />
        </main>
    );
};

export default App;
