import { create } from 'zustand';

interface UserStore {
  selectedUsers: string[];
  removedUsers: string[];
  selectUser: (id: string) => void;
  deselectUser: (id: string) => void;
  removeSelectedUsers: () => void;
  clearSelectedUsers: () => void;
}

const useUserStore = create<UserStore>()(set => ({
  selectedUsers: [],
  removedUsers: [],

  selectUser: (id: string) =>
    set(state => ({
      selectedUsers: [...state.selectedUsers, id],
    })),

  deselectUser: (id: string) =>
    set(state => ({
      selectedUsers: state.selectedUsers.filter(userId => userId !== id),
    })),

  removeSelectedUsers: () =>
    set(state => ({
      removedUsers: [...state.removedUsers, ...state.selectedUsers],
      selectedUsers: [],
    })),

  clearSelectedUsers: () => set({ selectedUsers: [] }),
}));

export default useUserStore;
