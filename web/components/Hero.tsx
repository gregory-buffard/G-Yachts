import React from "react";

const Hero = () => {
    return (
        <div className="bg-hero-bg-image bg-center h-screen w-screen justify-center overflow-hidden font-slick text-5xl md:text-4xl text-center">Superyachts<span className="font-classic inline-flex flex-col">
            <ul className="block text-left leading-tight [&_li]:block">
                <li>SALES</li>
                <li>CHARTER</li>
                <li>MANAGEMENT</li>
                <li>NEW CONSTRUCTIONS</li>
            </ul>
        </span></div>
    );
}

export default Hero;
