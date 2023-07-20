import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const apiUrl = 'http://localhost:3500'
const apiUrl = 'https://jsonplaceholder.typicode.com/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ['Post'],
  endpoints: builder => ({})
})