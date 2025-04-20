import { create } from "zustand";
import { axiosInstanace } from "../config/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstanace.get("/messages/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstanace.get(`/messages/${userId}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser:(selectedUser)=>set({selectedUser}),
}));
