import { getDataFromLocalStorage, LOCAL_STORAGE_KEYS } from "@/shared/utils/localstorage";
import { ofetch, type FetchContext } from "ofetch";

const HOST_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const instance = ofetch.create({
  baseURL: HOST_URL,
});

const protectedInstance = ofetch.create({
  baseURL: HOST_URL,
  onRequest: ({ options }: FetchContext) => {
    const user = getDataFromLocalStorage(LOCAL_STORAGE_KEYS.USER);
    if (!user) return;
    options.headers.set("Authorization", `Bearer ${user.token}`);
  },
});

export { instance, protectedInstance };
