import api from "./api";

export const getUserSkills = async () => {
    const {data} = await api.get(`/users/user-skills/${idUsers}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}

export const putLevel = async () => {
    const {data} = await api.put(`/user-skills/${idUserSkills}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}

export const deleteLevel = async () => {
    const {data} = await api.delete(`/user-skills/${idUserSkills}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`}
    },)
    return data
}

