import apiSlice from "../apiSlice/apiSlice";

const nofityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (email) => ({
        method: "GET",
        url: `/notifications/${email}`,
      }),
    }),
    seenNotification: builder.mutation({
      query: (id) => ({
        method: "PATCH",
        url: `/notifications/${id}`,
      }),
    }),
    getMessageUser: builder.query({
      query: () => ({
        method: "GET",
        url: `/messages`,
      }),
    }),

    sendMassege: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/send-messages`,
        body: data,
      }),
    }),

    conversation: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/conversation/${id}`,
      }),
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useSeenNotificationMutation,
  useGetMessageUserQuery,
  useSendMassegeMutation,
  useConversationQuery,
} = nofityApi;
