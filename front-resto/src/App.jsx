import LandingSection from "./components/LandingSection";
import ContactSection from "./components/ContactSection";
import chillieRight from "./assets/chillies-2.png";
import chillieLeft from "./assets/chillies-1.png";

import { MENU_URL } from "./utils/consts";

import MenuSection from "./components/MenuSection";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [mealsGrouped, setMealsGrouped] = useState([]);

  useEffect(function () {
    async function callApi() {
      const url = `${MENU_URL}/getMealsGrouped`;

      const resp = await fetch(url);

      if (resp.status === 200) {
        const json = await resp.json();
        setMealsGrouped(json);
      }
    }
    callApi();
  }, []);
  return (
    <div className="app">
      <LandingSection />
      <div id="menu" className="big-title">
        <img src={chillieLeft} alt="" />
        <p className="my-menu">Notre Menu</p>
        <img src={chillieRight} alt="" />
      </div>
      <hr className="line" />
      {mealsGrouped.map((m) => {
        return (
          <MenuSection
            key={mealsGrouped.indexOf(m)}
            category={m.category}
            meals={m.data}
          />
        );
      })}
      <ContactSection />
    </div>
  );
}

export default App;
