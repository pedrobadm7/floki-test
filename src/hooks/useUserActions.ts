import useUserStore from '../store';

export const useUserActions = () => {
  const selectedUsers = useUserStore(state => state.selectedUsers);
  const removedUsers = useUserStore(state => state.removedUsers);
  const selectUser = useUserStore(state => state.selectUser);
  const deselectUser = useUserStore(state => state.deselectUser);
  const removeSelectedUsers = useUserStore(state => state.removeSelectedUsers);

  return {
    selectedUsers,
    removedUsers,
    selectUser,
    deselectUser,
    removeSelectedUsers,
  };
};
