import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid is a helper to generate random id
import sub from "date-fns/sub";

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        },
        // userId: "2"
    },
    {
        id: '2',
        title: 'Frontend Developer for Beginner',
        content: "The more i say slice, the more i want pizza!",
        date: sub(new Date(), { minutes: 34 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        },
        // userId: "0"
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: {
            // action function
            reducer(state, action) {
                state.push(action.payload)
            },
            // callback
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        },
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts
export const { createPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer