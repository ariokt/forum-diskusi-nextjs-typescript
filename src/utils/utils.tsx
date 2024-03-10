import axios from "axios";

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const apiLogin = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {email, password});
  return response;
}

const apiRegister = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/register`, {name, email, password});
  return response;
}

const apiGetAllThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`, {
    cache: 'no-store'
  });
  const data = await response.json();
  return data.data.threads;
}

const apiGetAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    cache: 'no-store'
  });
  const data = await response.json();
  return data.data.users;
}

const apiGetUserDetail = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data.data.user;
}

const apiGetThreadDetail = async (id: string, token: any) => {
  const response = await fetch(`${BASE_URL}/threads/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data.data.detailThread;
}

const apiLoveThread = async (id: string, token: string) => {
  const response = await axios(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const apiUnloveThread = async (id: string, token: string) => {
  const response = await axios(`${BASE_URL}/threads/${id}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const apiLoveComment = async (idThread: string, idComment: string, token: string) => {
  const response = await axios(`${BASE_URL}/threads/${idThread}/comments/${idComment}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const apiUnloveComment = async (idThread: string, idComment: string, token: string) => {
  const response = await axios(`${BASE_URL}/threads/${idThread}/comments/${idComment}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const apiCreateThread = async (data: {title: string, body: string, category: string}, token: string) => {
  const response = await axios.post(`${BASE_URL}/threads`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}



export {
  apiLogin,
  apiRegister,
  apiGetAllThreads,
  apiGetAllUsers,
  apiGetUserDetail,
  apiGetThreadDetail,
  apiLoveThread,
  apiUnloveThread,
  apiLoveComment,
  apiUnloveComment,
  apiCreateThread,
}