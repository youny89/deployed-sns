import useSWR from "swr";

const useNotificatinos = (userId?:string) => {
    const url = userId? `/api/notifications/${userId}`:null;
    const {data, error, isLoading, mutate} = useSWR(url);

    return {
        data, error, isLoading, mutate
    }
}

export default useNotificatinos;