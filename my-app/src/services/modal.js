import api from "./api";

export const getAllSkills = async () => {
    const {data} = await api.get(`/skills`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}

export const postUserSkills = async () => {
    const {data} = await api.post(`/user-skills`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}