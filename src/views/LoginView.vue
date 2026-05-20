<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

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
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-6 w-80 bg-white p-8 rounded-xl shadow-md"
    >
      <h1 class="text-2xl font-bold text-center text-blue-900">Async & Furious</h1>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium text-gray-700" for="email">E-mail</label>
        <input
          class="px-3 py-2 border border-gray-300 rounded-lg w-full"
          id="email"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="password">Senha</label>
        <input
          class="px-3 py-2 border border-gray-300 rounded-lg w-full"
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <button
        type="submit"
        :disabled="isLoading"
        class="bg-blue-800 text-white py-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer"
      >
        {{ isLoading ? "Entrando..." : "Entrar" }}
      </button>
    </form>
  </div>
</template>
