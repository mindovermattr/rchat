import { atom, computed } from "@reatom/core";
import type { User } from "../types";
import { CURRENT_USER_ID, mockUsers } from "../mocks/data";

export const currentUserIdAtom = atom(CURRENT_USER_ID, "currentUserIdAtom");

export const usersAtom = atom(mockUsers, "usersAtom");
export const userByIdAtom = computed(() => {
  const map: Record<string, User> = {};
  for (const u of usersAtom()) map[u.id] = u;
  return map;
}, "userByIdAtom");
