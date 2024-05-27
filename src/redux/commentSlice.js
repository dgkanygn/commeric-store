import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getCommentsData = createAsyncThunk("data/fetch", async (id) => {
  const querySnapshot = await getDocs(
    query(collection(db, "comments"), where("productId", "==", id))
  );

  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return docs;
});

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },

    removeAllComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsData.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addComment, removeComment, removeAllComments } =
  commentSlice.actions;
export default commentSlice.reducer;
