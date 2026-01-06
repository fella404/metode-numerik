<script setup></script>

<template>
  <header class="text-center mb-10 header-animate">
    <h1
      class="text-5xl font-bold mb-2 bg-linear-to-br from-[#1e293b] to-[#2563eb] bg-clip-text text-transparent"
    >
      Metode Numerik
    </h1>
    <p class="text-lg text-[#64748b] font-light">Tugas Komputasi & Analisis</p>
  </header>
</template>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-animate {
  animation: fadeInDown 1s ease-out forwards; /* forwards menjaga state akhir */
}
</style>
