/* eslint-disable react/prop-types */

import MenuGrid from "./MenuGrid";

import "./MenuStyles.css";

function MenuSection({ category, meals }) {
  return (
    <div className="menu-section">
      <p className="category-title">Nos {category}</p>
      <MenuGrid items={meals} />
      <a className="view-more-link" href="#">
        Voir Plus
      </a>
    </div>
  );
}

export default MenuSection;
