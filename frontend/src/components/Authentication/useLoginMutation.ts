import { API_URL } from "@/config/constants";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {

    return useMutation({
        mutationFn: async (loginData: {email: string, password: string}) => {
            const response = await fetch(`${API_URL}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Unknown error occured")
            }
            return response.json();
        }

    })
}
    // const response = await fetch(`${API_URL}users`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         if(!response.ok) throw new Error("Błąd logowania");
    //         return response.json();
    //     },
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["user"], data);
    //         navigate("/");
    //     },
    //     onError: () => {
    //         logout();
    //     }