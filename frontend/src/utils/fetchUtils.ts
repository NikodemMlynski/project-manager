
export async function fetchData<T>(url: string, token?: string): Promise<T> {
    const headers: HeadersInit = token ? {
        Authorization: `Bearer ${token}`
    } : {}
    const response = await fetch(url, {headers});
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Unknown error occured")
    }
    return response.json();
}

export async function postData<T>(url: string, data: unknown, token?: string): Promise<T> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if(token) headers["Authorization"] = `Bearer ${token}`;
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    })

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Unknown error occured")
    }
    return response.json();
}