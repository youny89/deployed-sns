'use client';

import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
    // swr going to store it in its global store
    // so we are going to be able to reuse this useCurrent hook 
    // and it is not refetch it every time we use it
    // actually going to take a look andn see if data already exists
    // and it's going to decide whether data need to be re invalidated and fetched again.
    // so basically this is going to replace our global state like redux
    const { data, error, isLoading, mutate } = useSWR('/api/users/me',fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;
