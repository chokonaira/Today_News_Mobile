import { FirestoreWrapper } from "../../redux/actions/FirestoreWrapper";
import firebase from "firebase";
import "firebase/firestore";
import { FakeFirestore } from "./FakeFirestore";

const refMock = {
  delete: jest.fn().mockResolvedValueOnce(),
};

const favoritedArticles = [
  {
    userEmail: "email.com",
    url: "url.com",
    publishedAt: "2021-01-01",
    ref: refMock,
  },
];
const myFirestore = new FakeFirestore(favoritedArticles);
jest.spyOn(firebase, "firestore").mockImplementation(() => myFirestore);

const article = {
  userEmail: "email.com",
  url: "url.com",
  publishedAt: "2021-01-01",
};

describe("Firestore", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("succesfully queries and removes a favorited article from firestore", async () => {
    const wrapper = new FirestoreWrapper();
    await wrapper.removeFavorite(article, article.userEmail);

    expect(myFirestore.collectionWasCalledWith).toEqual("favorites");
    expect(myFirestore.whereWasCalledWith[0]).toEqual([
      "userEmail",
      "==",
      article.userEmail,
    ]);
    expect(myFirestore.whereWasCalledWith[1]).toEqual([
      "url",
      "==",
      article.url,
    ]);
    expect(myFirestore.whereWasCalledWith[2]).toEqual([
      "publishedAt",
      "==",
      article.publishedAt,
    ]);
    // expect(refMock.deleteFn()).toHaveBeenCalled();
  });

});