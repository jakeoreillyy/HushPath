import "./styles/global.css";

import Home from "./pages/Home.tsx";
import Header from "./components/Header/header.tsx";
import SearchBars from "./components/Search/search.tsx";

function App() {
  return (
    <>
      <Header></Header>
      <SearchBars></SearchBars> {/*input variables: 'start', 'end'*/}
      <Home></Home>
    </>
  );
}

export default App;
