import "../index.css";
import { useRef, useCallback, useState } from "react";

const Card = (props) => {
  const [loading, setLoading] = useState(false);

  const targetRef = useRef(null);
  const temp = useCallback((node) => {
  });

  const lastElement = useCallback((node) => {
    console.log(node);
    if (loading == "success") return;
    if (targetRef.current || !props.last) targetRef.current.disconnect();
    targetRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("visible");
        props.setpage(props.page + 1);
      }
    });

    if (node) targetRef.current.observe(node);
  });

  let mail = `mailto:${props.email}?subject = Feedback&body = Message`;

  return (
    <div
      ref={props.last === true ? lastElement : temp}
      className="card-container"
    >
      <div className="img-container">
        <img src={props.avatar} alt="avatar" />
      </div>
      <div className="card-info-container">
        <p className="card-name">
          {props.first_name} {props.last_name}
        </p>
        <p className="card-email">
          <a href={mail}>
            {props.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Card;
