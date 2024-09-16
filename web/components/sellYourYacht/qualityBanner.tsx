export default function QualityOverQuantity() {
    return (
        <div className="w-full flex flex-row h-screen">
            <div className="w-1/2 flex flex-col justify-center bg-navy py-48 px-16 relative">
                <h1 className="text-8xl font-bold text-white z-[2] overflow-x-visible w-[70vw] drop-shadow-md">Quality Over Quantity</h1>
                <p className="text-white text-lg leading-8 mt-12 w-2/3">
                    G-Yachts prides itself on maintaining the highest quality and most customized
                    experience for our exclusive clientele. What makes us stand apart is that with
                    us you are truly valued and tailored to, not just a number.
                </p>
                <img
                    alt="Yacht"
                    src="/pictures/sell-your-yacht/yacht.png"
                    className="absolute left-0 top-50 translate-x-[40vw] z-[1] w-[60vw] h-auto"
                />
            </div>
        </div>
    );
}
