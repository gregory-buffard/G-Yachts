import View from "@/components/view";
import Nav from "@/components/nav";
import Dashboard from "@/components/views/dashboard";
import Yachts from "@/components/views/yachts";

const App = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <View dashboard={<Dashboard />} yachts={<Yachts />} />
      <Nav />
      {/*<form
        action={async (formData) => {
          await uploadImages(formData, "662810408f1b183f77e99b57");
        }}
      >
        <input type={"file"} name={"images"} multiple />
        <button type={"submit"}>Upload</button>
      </form>*/}
    </main>
  );
};

export default App;
