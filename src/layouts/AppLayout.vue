<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function logout(): void {
  authStore.logout();
  router.push("/login");
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-blue-900 text-white flex flex-col">
      <div class="p-6 text-xl font-bold border-b border-blue-700">Async & Furious</div>
      <nav class="flex-1 p-4">
        <p class="text-blue-300 text-xs uppercase mb-2">Menu</p>
        <RouterLink to="/" class="block py-2 px-3 rounded hover:bg-blue-700">
          Dashboard
        </RouterLink>
      </nav>
      <div class="p-4 border-t border-blue-700">
        <button
          @click="logout"
          class="w-full text-left py-2 px-3 rounded hover:bg-blue-700 text-sm"
        >
          Sair
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>
