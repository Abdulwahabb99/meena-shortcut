

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

export interface MaterialUIControllerState {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: string;
  layout: string;
  darkMode: boolean;
}

export type MaterialUIControllerAction =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "TRANSPARENT_SIDENAV"; value: boolean }
  | { type: "WHITE_SIDENAV"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "DIRECTION"; value: string }
  | { type: "LAYOUT"; value: string }
  | { type: "DARKMODE"; value: boolean };

export type MaterialUIDispatch = Dispatch<MaterialUIControllerAction>;

const MaterialUI = createContext<
  readonly [MaterialUIControllerState, MaterialUIDispatch] | null
>(null);

MaterialUI.displayName = "MaterialUIContext";

function reducer(
  state: MaterialUIControllerState,
  action: MaterialUIControllerAction,
): MaterialUIControllerState {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      const _x: never = action;
      throw new Error(String(_x));
    }
  }
}

function MaterialUIControllerProvider({ children }: { children: ReactNode }) {
  const initialState: MaterialUIControllerState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch] as const, [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController(): [
  MaterialUIControllerState,
  MaterialUIDispatch,
] {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider.",
    );
  }

  return [...context];
}

const setMiniSidenav = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch: MaterialUIDispatch, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch: MaterialUIDispatch, value: string) =>
  dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch: MaterialUIDispatch, value: string) =>
  dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch: MaterialUIDispatch, value: boolean) =>
  dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
