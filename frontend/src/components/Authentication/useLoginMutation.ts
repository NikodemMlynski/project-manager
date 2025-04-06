import { API_URL, TOKEN_STORAGE_KEY } from "@/config/constants";
import { postData } from "@/utils/fetchUtils";
import { useMutation } from "@tanstack/react-query";

interface ILoginData {
    email: string;
    password: string;
}
export interface ITokenData {
    [TOKEN_STORAGE_KEY]: string;
    token_type: string;
}
export function useLoginMutation() {

    return useMutation<ITokenData, Error, ILoginData>({
        mutationFn: async (loginData: ILoginData) => 
            postData(`${API_URL}auth/login`, loginData)


    })
}