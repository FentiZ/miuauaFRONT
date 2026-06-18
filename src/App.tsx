import { Route, Routes } from "react-router"
import { Footer } from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
import { createContext, type Dispatch, type SetStateAction } from "react";

interface MenuContextType {
  setTab: Dispatch<SetStateAction<number>>;
}
export const MenuContext = createContext<MenuContextType | undefined>(undefined);

function App() {

  return (
    <>
      <Header></Header>
      <main>
        <Routes>
          <Route index element={<div></div>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
