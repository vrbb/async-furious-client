<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

async function handleSubmit() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await authStore.login(email.value, password.value);
    router.push("/");
  } catch {
    errorMessage.value = "E-mail ou senha inválidos.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>

      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" placeholder="seu@email.com" />
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Entrando..." : "Entrar" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 320px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
