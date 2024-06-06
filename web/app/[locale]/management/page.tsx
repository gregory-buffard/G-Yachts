import dynamic from 'next/dynamic';
import Bar from '@/components/nav/bar';
import Hero from '@/components/management/hero';

const View = dynamic(() => import('@/components/view'));
const Footer = dynamic(() => import('@/components/footer'));

const Management = () => {
    return (
        <main className="w-full flex flex-col justify-start items-center">
            <Bar dynamicColor={100} />
            <View />
            <Hero />
            <Footer />
        </main>
    );
}

export default Management;
