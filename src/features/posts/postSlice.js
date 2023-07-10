import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// nanoid is a helper to generate random id
import { sub } from "date-fns";
import axios from "axios";

const POSTS_API = 'https://jsonplaceholder.typicode.com/posts'

const postAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

// const initialState = {
//     posts: [],
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//     count: 0 //optimization testing purpose
// }

const initialState = postAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0 //optimization testing purpose
})

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

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.put(`${POSTS_API}/${id}`, initialPost)
        return response.data
    } catch (error) {
        // return error.message
        return initialPost //only for testing redux
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost
    try {
        const response = await axios.delete(`${POSTS_API}/${id}`, initialPost)
        if (response?.status === 200) return initialPost
        return `${response?.status}: ${response?.statusText}`
    } catch (error) {
        return error.message
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // look in video 36:15 || 2:22:23
        // createPost: {
        //     // action function
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     // callback
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 date: new Date().toISOString(),
        //                 userId,
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     wow: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     coffee: 0
        //                 },
        //             }
        //         }
        //     }
        // },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            // const existingPost = state.posts.find(post => post.id === postId)
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        increaseCount(state, action) {
            state.count = state.count + 1
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
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
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
                // state.posts = state.posts.concat(loadedPosts)

                // Changes in chapter 5: 2:39:30
                postAdapter.upsertMany(state, loadedPosts)
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
                // Changes in chapter 5: 2:39:30
                // state.posts.push(action.payload)
                postAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }

                action.payload.date = new Date().toISOString()

                // Changes in chapter 5: 2:39:30
                // const { id } = action.payload
                // const post = state.posts.filter(post => post.id !== id)
                // state.posts = [...post, action.payload]
                postAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete!')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload // or action.payload.id
                // Changes in chapter 5: 2:39:30
                // const post = state.posts.filter(post => post.id !== id)
                // state.posts = post
                postAdapter.removeOne(state, id)
            })
    }
})

// getSelectors creates these selectors and we rename them with aliases using destructuring
// defaultName: alias
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts) //Pass in a selector that returns the posts slice of state

// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId) // normal form
// momoized form
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId], // createSelector accepts one or more input functions inside bracket of array
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const getCount = (state) => state.posts.count;

export const { increaseCount, reactionAdded } = postsSlice.actions

export default postsSlice.reducer