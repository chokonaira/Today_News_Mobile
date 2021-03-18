import * as types from "./types";
import * as firebase from "firebase";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { state } from "./getState";

const commentsLoading = () => ({
  type: types.COMMENTS_LOADING,
});

const addCommentsSuccess = (payload) => ({
  type: types.ADD_COMMENTS_SUCCESS,
  payload,
});

const fetchAllCommentsSuccess = (payload) => ({
  type: types.FETCH_ALL_COMMENTS_SUCCESS,
  payload,
});

const commentsError = (payload) => ({
  type: types.COMMENTS_ERROR,
  payload,
});

export const addComment = (comment, articleUrl) => async (dispatch) => {
  dispatch(commentsLoading());
  try {
    const { user } = await state();

    const commentedArticle = {
      id: uuidv4(),
      comment,
      userEmail: user.email,
      articleUrl,
    };

    await firebase
      .firestore()
      .collection("comments")
      .doc(commentedArticle.id)
      .set(commentedArticle);
    dispatch(addCommentsSuccess(commentedArticle));
  } catch (error) {
    dispatch(commentsError(error.message));
  }
};

export const fetchAllComments = (articleUrl) => async (dispatch) => {
  dispatch(commentsLoading());
  try {
    const commentRef = firebase.firestore().collection("comments");
    const snapshot = await commentRef
      .where("articleUrl", "==", articleUrl)
      .get();
    const result = snapshot.docs.map((doc) => {
      return doc.data();
    });
    dispatch(fetchAllCommentsSuccess(result));
  } catch (error) {
    dispatch(commentsError(error.message));
  }
};