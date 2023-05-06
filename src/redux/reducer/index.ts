export const initialState = {
  limit: 10,
  offset: 0,
  searchedName: ''
};

export interface InitialState {
  limit: number;
  offset: number;
  searchedName: string;
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_PAGE_LIMIT':
      return {
        ...state,
        limit: action.payload
      };
    case 'SET_PAGE_OFFSET':
      return {
        ...state,
        offset: action.payload
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchedName: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
