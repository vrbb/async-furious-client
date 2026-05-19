import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref<{ id: string; email: string; role: string } | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });

    token.value = response.data.access_token;
    user.value = response.data.user;

    localStorage.setItem("token", response.data.access_token);
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  }

  return { token, user, isAuthenticated, login, logout };
});
