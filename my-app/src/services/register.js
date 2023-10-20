import api from "./api";

export const postRegister = async () => {
    const {data} = await api.post(`/users`)
    return data
}

// , {headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`}
// },