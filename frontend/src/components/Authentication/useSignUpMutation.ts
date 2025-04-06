import { API_URL } from "@/config/constants";
import { postData } from "@/utils/fetchUtils";
import { useMutation } from "@tanstack/react-query";

export interface IUserIn {
    username: string;
    email: string;
    password: string;
}

export function useSignUpMutation() {
    return useMutation<IUserIn, Error, IUserIn>({
        mutationFn: async (signupData: IUserIn) => 
            postData(`${API_URL}users`, signupData)
    })
}