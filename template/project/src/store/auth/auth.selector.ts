import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AuthState } from "./auth.reducer";

const getAuth = (store: { auth: AuthState }) => store.auth


const getIsLogin = createSelector(getAuth, (auth) => auth.login)

export const useAuth = () => useSelector(getAuth)

export const useIsLogin = () => useSelector(getIsLogin)
