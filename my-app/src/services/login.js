import api from "./api";

export const postAuth = async () => {
    const {data} = await api.post(`/auth`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}