import * as types from "./types";
import * as firebase from "firebase";
import "firebase/firestore";
import { Controllers } from "../../helpers/controllers";
import { v4 as uuidv4 } from "uuid";
import { state } from "./getState";
import { FirestoreWrapper } from "./FirestoreWrapper";
const wrapper = new FirestoreWrapper();

const favoriteLoading = () => ({
  type: types.FAVOURITE_LOADING,
});
const addFavoriteSuccess = (payload) => ({
  type: types.ADD_FAVOURITE_SUCCESS,
  payload,
});
const removeFavoriteSuccess = (payload) => ({
  type: types.REMOVE_FAVOURITE_SUCCESS,
  payload,
});
const fetchAllFavoriteSuccess = (payload) => ({
  type: types.FETCH_ALL_FAVOURITE_SUCCESS,
  payload,
});
const favoriteError = (payload) => ({
  type: types.FAVOURITE_ERROR,
  payload,
});

export const addFavorite = (article, email) => async (dispatch) => {
  try {
    if (article.favorited) return;
    const favoriteArticle = {
      ...article,
      id: uuidv4(),
      favorited: true,
      userEmail: email,
    };
    console.log('email')

    await firebase
      .firestore()
      .collection("favorites")
      .doc(favoriteArticle.id)
      .set(favoriteArticle);
    dispatch(addFavoriteSuccess(favoriteArticle));
  } catch (error) {
    dispatch(favoriteError(error.message));
  }
};

export const removeFavorite = (article, email) => async (dispatch) => {
  try {
    const { favorites } = await state();

    await wrapper.removeFavorite(article, email);
    const newFavorites = Controllers.filterFavorites(favorites, article);
    dispatch(removeFavoriteSuccess(newFavorites));
  } catch (error) {
    dispatch(favoriteError(error.message));
  }
};

export const fetchAllFavorite = (email) => async (dispatch) => {
  dispatch(favoriteLoading());
  try {
    const result = await wrapper.fetchAllFavorite(email);
    dispatch(fetchAllFavoriteSuccess(result));
  } catch (error) {
    dispatch(favoriteError(error.message));
  }
};
