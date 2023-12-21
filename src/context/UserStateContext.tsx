import { Dispatch, ReactNode, createContext, useReducer } from "react";

export const UserStateContextProvider = createContext<TDefaultValue>({
  state: {
    token: null,
  },
  dispatch: () => {},
});

type TAction = {
  type: "USER_LOGIN" | "USER_LOGOUT";
  payload: string | null;
};

type TState = {
  token: string | null;
};

type TDefaultValue = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case "USER_LOGIN":
      localStorage.setItem("token", JSON.stringify(action.payload));
      return { token: action.payload };
    case "USER_LOGOUT":
      localStorage.clear();
      sessionStorage.clear();
      return { token: action.payload };
    default:
      return state;
  }
}

function UserStateContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { token: null });

  return (
    <>
      <UserStateContextProvider.Provider value={{ dispatch, state }}>
        {children}
      </UserStateContextProvider.Provider>
    </>
  );
}

export default UserStateContext;
