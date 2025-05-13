import axios from "axios";

const PlaceholderApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 3000,
});

export const getAlbums = async () => {
    const response = await PlaceholderApi.get("/albums");
    return response.data;
};

export const getAlbumsById = async (id) => {
    const response = await PlaceholderApi.get(`/albums/${id}`);
    return response.data;
};

export const getPhotosByAlbumId = async (id) => {
    const response = await PlaceholderApi.get(`/albums/${id}/photos`);
    return response.data;
};

export const getUsers = async () => {
    const response = await PlaceholderApi.get("/users");
    return response.data;
};

export const getUsersById = async (id) => {
    const response = await PlaceholderApi.get(`/users/${id}`);
    return response.data;
};

export const getAlbumsByUserId = async (id) => {
    const response = await PlaceholderApi.get(`/users/${id}/albums`);
    return response.data;
};

export default PlaceholderApi;