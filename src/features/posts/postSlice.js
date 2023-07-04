import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// nanoid is a helper to generate random id
import { sub } from "date-fns";
import axios from "axios";
const POSTS_API = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// async thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_API)
    return response.data
})

export const createNewPost = createAsyncThunk('posts/createNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_API, initialPost)
        return response.data
    } catch (error) {
        return error.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: {
            // action function
            reducer(state, action) {
                state.posts.push(action.payload)
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
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
                console.log(action)
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post
                })
                // Add any fetched posts to array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const { createPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer