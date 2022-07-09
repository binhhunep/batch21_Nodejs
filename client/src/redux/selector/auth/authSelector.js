import { createSelector } from "@reduxjs/toolkit";

const usersSelector = (state) => {
  return state.auth;
};

const usersSelectorRemaining = createSelector(usersSelector, (auth) => {
  return auth;
});

export default usersSelectorRemaining;
