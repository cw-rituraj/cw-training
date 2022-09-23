
const initialState = {
    data: [],
    status: "default",
    maxPage: 0,
};

export default function (state = initialState, action) {
    console.log(action.payload);
    
    
    if (action.type === 'loading') {
        console.log('Loading state');
        return {
            ...state,
            status:'loading'
        }
    } else if (action.type === 'success') {
        let arr1 = action.payload.data;
        if (state.data) {
          arr1 = state.data.concat(action.payload.data);
        }
        
        return {
            ...state, 
            status: "success",
            data: arr1,
            maxPage:action.payload.maxPage
        } 
    }
    else {
        return state;
    }
}