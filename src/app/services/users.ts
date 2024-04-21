// import { User } from "@prisma/client";
import { api } from "./api";
type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  isBlocked: boolean;
  createdAt: Date;
};

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/homepage",
        method: "GET",
      }),
    }),
    removeUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/homepage/remove/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
    blockUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/homepage/block/${id}`,
        method: "PATCH",
        body: { id },
      }),
    }),
    unblockUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/homepage/unblock/${id}`,
        method: "PATCH",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = usersApi;

export const {
  endpoints: { getAllUsers, removeUser, unblockUser, blockUser },
} = usersApi;
