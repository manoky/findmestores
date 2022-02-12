import { createContext, useContext, useReducer } from "react";
import { CoffeeStoreDataType } from "types";

interface StateProps {
  latLong: string;
  nearByStores: CoffeeStoreDataType[];
  searchTerm: string;
}

interface StoreContextProps {
  dispatch: React.Dispatch<ACTIONS>;
  state: StateProps;
}

const initialState: StateProps = {
  latLong: "",
  nearByStores: [],
  searchTerm: "coffee",
};

type ACTIONS =
  | { type: "SET_STORES"; payload: CoffeeStoreDataType[] }
  | { type: "SET_LOC"; payload: string }
  | { type: "SET_QUERY"; payload: string };

const reducer = (state: StateProps, action: ACTIONS): StateProps => {
  switch (action.type) {
    case "SET_STORES":
      return {
        ...state,
        nearByStores: action.payload,
      };

    case "SET_LOC":
      return {
        ...state,
        latLong: action.payload,
      };

    case "SET_QUERY":
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};

const StoreContext = createContext({} as StoreContextProps);

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
