import Nav from "@/components/nav";

const App = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-red-300 to-blue-600">
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
