import { Route, Routes } from "react-router"
import { Footer } from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
import { createContext, type Dispatch, type SetStateAction } from "react";
import Home from "./Components/page/Home";
import { CardInfo } from "./Components/page/CardInfo";
import ProductСompare from "./Components/page/ProductСompare"
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
          <Route path="/" element={<Home/>} />
          <Route path="cardInfo/:id" element={<CardInfo /> } />
          <Route path="product_compare/" element={<ProductСompare /> } />
        </Routes>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
