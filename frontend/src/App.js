function App() {
  const get = async () => {
    const bal = await fetch("http://localhost:8000");
    console.log(bal);
  };

  get();
  return <div>welcome to frontend</div>;
}

export default App;
