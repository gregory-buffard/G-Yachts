import Bar from "@/components/bar";

const Home = () => {
  return (
    <main className={"m-auto w-screen"}>
      <Bar />
      <section
        className={
          "w-full h-screen bg-hero-banner bg-center bg-cover containerize"
        }
      ></section>
    </main>
  );
};

export default Home;
