import axios from "axios";

export const started = () => {
  return { type: "loading" };
};

export const success = (data) => {
    return {
        type: "success",
        payload: data
    };
};

export const error = () => {
  return { type: "error" };
};

export const getProduct = (page) => async (dispatch) => {
    dispatch(started());
  try {
    console.log("Product", page);
    const response = await axios.get(
      `https://reqres.in/api/users/?page=${page}`
    );
        console.log(response.data.data);
    dispatch(success({
      data: response.data.data,
      maxPage: response.data.total_pages
    }));
    } catch (err) { 
        dispatch(error());   
    }

};

