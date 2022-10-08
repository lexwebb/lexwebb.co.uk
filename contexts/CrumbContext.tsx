import React, { useCallback } from "react";

type Crumb = {
  name: string;
  path: string;
};

interface CrumbState {
  crumbs: Crumb[];
  currentPage?: Crumb;
}

interface CrumbContextType extends CrumbState {
  addCrumb: (crumb: string, path: string) => void;
  resetCrumbs: () => void;
  registerPage: (name: string, path: string) => void;
}

const CrumbContext = React.createContext<CrumbContextType>(
  null as unknown as CrumbContextType
);

type CrumbReducerAction =
  | { type: "add"; crumb: string; path: string }
  | { type: "reset" }
  | { type: "register"; name: string; path: string };

const crumbReducer = (
  state: CrumbState,
  action: CrumbReducerAction
): CrumbState => {
  switch (action.type) {
    case "add":
      const indexof = state.crumbs.findIndex(
        (crumb) => crumb.path === action.path
      );
      if (indexof !== -1) {
        return {
          ...state,
          crumbs: state.crumbs.slice(0, indexof + 1),
        };
      }
      return {
        crumbs: [...state.crumbs, { name: action.crumb, path: action.path }],
        currentPage: state.currentPage,
      };
    case "register":
      console.log("register", action.name, action.path);
      return {
        crumbs: state.crumbs,
        currentPage: {
          name: action.name,
          path: action.path,
        },
      };
    case "reset":
      return {
        crumbs: [],
        currentPage: state.currentPage,
      };
  }
};

export const CrumbContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [crumbs, dispatch] = React.useReducer(crumbReducer, { crumbs: [] });

  const addCrumb = useCallback(
    (crumb: string, path: string) => dispatch({ type: "add", crumb, path }),
    []
  );
  const resetCrumbs = useCallback(() => dispatch({ type: "reset" }), []);
  const registerPage = useCallback(
    (name: string, path: string) => dispatch({ type: "register", name, path }),
    []
  );

  return (
    <CrumbContext.Provider
      value={{
        crumbs: crumbs.crumbs,
        currentPage: crumbs.currentPage,
        addCrumb,
        resetCrumbs,
        registerPage,
      }}
    >
      {children}
    </CrumbContext.Provider>
  );
};

export const useCrumbs = () => React.useContext(CrumbContext);

export default CrumbContext;
