<script setup>
import { RouterLink } from "vue-router";
import { defineProps, onMounted, ref } from "vue";

const props = defineProps(["methods", "index"]);
const isVisible = ref(false);

onMounted(() => {
  // Logika delay bertahap: 200ms * (urutan + 1)
  // index 0 = 200ms, index 1 = 400ms, dst.
  setTimeout(() => {
    isVisible.value = true;
  }, 200 * (props.index + 1));
});
</script>

<template>
  <div
    class="bg-[#ffffff] py-10 px-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]] text-center transition-all duration-300 ease-in-out border border-white/50 relative overflow-hidden opacity-0 translate-y-5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
    ]"
  >
    <div
      class="w-15 h-15 bg-[#eff6ff] text-[#2563eb] rounded-full flex items-center justify-center mt-0 mx-auto mb-6 text-2xl font-bold"
    >
      {{ props.methods.id }}
    </div>
    <h2 class="text-2xl font-bold mb-3 text-[#1e293b]">
      {{ props.methods.title }}
    </h2>
    <p class="text-base font-medium leading-[1.6] text-[#64748b] mb-8">
      {{ props.methods.description }}
    </p>
    <router-link
      class="inline-block py-3 px-8 bg-[#1e293b] text-white rounded-4xl font-medium text-sm hover:bg-[#293850] transition-colors duration-300"
      :to="`/${props.methods.url}`"
      >Buka Metode</router-link
    >
  </div>
</template>
