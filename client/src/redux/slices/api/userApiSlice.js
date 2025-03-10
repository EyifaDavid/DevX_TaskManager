import { apiSLice } from "../apiSlice"
 
const USER_URL ="/user"


export const userApiSlice= apiSLice.injectEndpoints({
    endpoints: (builder)=> ({
        updateUser: builder.mutation({
            query: (data)=> ({
                url:`${USER_URL}/profile`,
                method:"PUT",
                body: data,
                credentials: "include",
            }),
        }),
        getTeamList: builder.query({
            query: (data)=> ({
                url:`${USER_URL}/get-team`,
                method:"GET",
                credentials: "include",
            }),
        }),
    }),
});


export const {useUpdateUserMutation,useGetTeamListQuery,}= userApiSlice
