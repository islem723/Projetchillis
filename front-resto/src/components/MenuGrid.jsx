/* eslint-disable react/prop-types */
import MenuGridItem from "./MenuGridItem";

import "./MenuStyles.css";

function MenuGrid({ items }) {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuGridItem key={item._id} data={item} />
      ))}
    </div>
  );
}

export default MenuGrid;
