import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import { apiSlice } from "../api/apiSlice";

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const reactionsList = {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
}

const initialState = postAdapter.getInitialState()

const transformResponseData = responseData => {
    let min = 1
    const loadedPosts = responseData.map(post => {
        if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString()

        if (!post?.reactions)
            post.reactions = reactionsList
        
        return post
    })
    return postAdapter.setAll(initialState, loadedPosts)
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: transformResponseData,
            providesTags: (result, error, arg) => [
                // console.log(result),
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        getPostsByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: transformResponseData,
            providesTags: (result, error, arg) => {
                console.log(result)
                return [
                    ...result.ids.map(id => ({ type: 'Post', id }))
                ]
            }
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: reactionsList
                }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // in a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                console.log(reactions)
                // `updateQueryData` requires the endpoint name and cache key arguments
                // so it knows which piece of cache state to update
                // billy note:
                // optimistically updating the cache not to refetch the data
                // like instagram, ui update even though the data just do the request to api
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

//  Custom hooks
export const { useGetPostsQuery, useGetPostsByUserIdQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation } = extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Create memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids and entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
// defaultName: alias
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => selectPostsData(state) ?? initialState) //Pass in a selector that returns the posts slice of state
