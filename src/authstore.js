import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: null, // Initial user state
	uploadBox: false,
	setUser: (user) => set({ user }), // Function to set the user
	clearUser: () => set({ user: null }), // Function to clear the user
	setUploadBox: (uploadBox) => set({ uploadBox }),
}));

export default useAuthStore;
