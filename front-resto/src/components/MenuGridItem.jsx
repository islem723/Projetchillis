/* eslint-disable react/prop-types */

import "./MenuStyles.css";

import { API_URL } from "../utils/consts";

function MenuGridItem({ data }) {
  return (
    <div className="plate-card">
      <div className="plate-image-wrapper">
        <img src={`${API_URL}/img/${data.image}`} alt="plate-img" />
      </div>
      <p className="plate-title">{data.platname}</p>
      <p className="plate-price">{data.price} DT</p>
    </div>
  );
}

export default MenuGridItem;
