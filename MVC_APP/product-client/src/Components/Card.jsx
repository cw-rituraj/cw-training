import { useRef, useCallback, useState } from "react";
import "../App.css";

const Card = (props) => {

  return (
    <div
      className="card-container"
    >
      <div className="img-container">
        <img src={props.thumbnail} alt="product-image" />
      </div>
      <div className="card-info-container">
        <p className="card-name"> {props.title}
        </p>
        <p className="card-price">
            Price : {props.price}
        </p>
        <p className="card-price">
            Rating : {props.rating}
        </p>
      </div>
    </div>
  );
};

export default Card;