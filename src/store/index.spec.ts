import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useUserStore from '.';

describe('useUserStore Zustand', () => {
  it('should add user to selectedUsers when selectUser is called', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.selectUser('user1');
    });

    expect(result.current.selectedUsers).toEqual(['user1']);
  });

  it('should remove user from selectedUsers when deselectUser is called', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.selectUser('user1');
      result.current.deselectUser('user1');
    });

    expect(result.current.selectedUsers).toEqual([]);
  });

  it('should move users from selectedUsers to removedUsers when removeSelectedUsers is called', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.selectUser('user1');
      result.current.selectUser('user2');
    });

    act(() => {
      result.current.removeSelectedUsers();
    });

    expect(result.current.selectedUsers).toEqual([]);
    expect(result.current.removedUsers).toEqual(['user1', 'user2']);
  });

  it('should clear selectedUsers when clearSelectedUsers is called', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.selectUser('user1');
    });

    act(() => {
      result.current.clearSelectedUsers();
    });

    expect(result.current.selectedUsers).toEqual([]);
  });
});
