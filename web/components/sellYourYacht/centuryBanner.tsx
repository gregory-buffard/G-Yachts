export default function QualityOverQuantity() {
    return (
        <div className="w-full flex flex-row h-screen mt-20">
            <div className="w-1/2 flex flex-col justify-center py-48 px-16">
                <img
                    src="/pictures/sell-your-yacht/world.png"
                    className="object-cover w-full h-auto"
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center bg-navy py-48 px-16">
                <h1 className="text-8xl font-bold text-white z-[2]  drop-shadow-md text-right">
                    A Quarter Century of Expertise
                </h1>
                <p className="text-white text-lg leading-8 mt-12 text-right w-full">
                    G-Yacht's passion for yachting is exceeded only by our pride in the
                    relationships we've built over 25 years. Our history relies on strong
                    connections, each built on a foundation of expertise, integrity and strategic
                    thinking. Headquartered in the heart of Monaco, we benefit from a network of our
                    associates located in more than 20 countries across 4 continents. G-Yachts is a
                    “gold” member of many international companies organizations including MYBA
                    (Mediterranean Yacht Broker Association), showing our commitment to professional
                    yachting.
                </p>
            </div>
        </div>
    );
}
