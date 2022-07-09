import { createSelector } from "@reduxjs/toolkit";

const postSelector = (state) => {
  return state.post;
};

const postSelectorRemaining = createSelector(postSelector, (post) => {
  return post;
});

export default postSelectorRemaining;
