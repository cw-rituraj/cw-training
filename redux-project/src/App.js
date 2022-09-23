import { useEffect, useState } from "react";
import { started,success,error } from "./redux1/actions/data";
import Card from "./components/Card";
import { connect } from "react-redux";
import { getProduct } from "./redux1/actions/data";
const App = ({ getProduct, data: { data, status, maxPage } }) => {
  const [page, setpage] = useState(1);
    const [last, setLast] = useState(true);



  useEffect(() => {
    if (maxPage === 0 || page <= maxPage)
      getProduct(page);
    else setLast(false);
  }, [page]);

  let cards;

  if (data === null) {
    cards = <div>Please Wait the Content is Loading...</div>;
  } else {
    cards = data.map((ele, index) => {
      if (data.length === index + 1) {
        return (
          <Card
            last={last}
            setpage={setpage}
            page={page}
            className="card"
            key={ele.id}
            avatar={ele.avatar}
            email={ele.email}
            first_name={ele.first_name}
            last_name={ele.last_name}
          />
        );
      } else {
        return (
          <Card
            last={false}
            setpage={setpage}
            page={page}
            className="card"
            key={ele.id}
            avatar={ele.avatar}
            email={ele.email}
            first_name={ele.first_name}
            last_name={ele.last_name}
          />
        );
      }
    });
  }

  return (
    <div className="App">
      <h1 id="heading">CarWale</h1>
      <div className="card-wrapper">{cards}</div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  data: state.data,
  status: 'loading',
  maxPage:state.maxPage
});

export default connect(mapStateToProps, { getProduct })(App);
