// lib/axios.ts
import axios from "axios"

const token = typeof window !== "undefined" ? await localStorage.getItem("auth_token") : null

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: token ? {
    Authorization: `Bearer ${token}`,
  } : {},
})

export default api
