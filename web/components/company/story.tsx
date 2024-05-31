import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from "react";

const Story = () => {
    const t = useTranslations('company.story');
    return (
        <section className={"h-full w-full overflow-hidden bg-rock-100"}>
            <h1 className={"py-[5vw] pl-[10vw]"}>{t.rich("header.title", {
                classic: (chunks) => (
                    <span className={"font-classic font-normal uppercase"}>
                        {chunks}
              </span>
                ),
            })}</h1>
            <div className={"h-screen w-[0.10vw] ml-[50vw] bg-gray-400"}>
                <h1>dsads</h1>
            </div>
        </section>
    );
}

export default Story;
