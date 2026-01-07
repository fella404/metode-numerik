<script setup>
import Card from "../components/Card.vue";
import Header from "../components/Header.vue";
import { reactive } from "vue";

const methods = reactive([
  {
    id: 1,
    title: "Metode Biseksi",
    description:
      "Pencarian akar persamaan non-linear melalui pembagian interval secara berulang.",
    url: "biseksi",
  },
  {
    id: 2,
    title: "Metode Newton",
    description:
      "Pendekatan solusi menggunakan garis singgung kurva fungsi turunan pertama.",
    url: "newton",
  },
  {
    id: 3,
    title: "Metode Secant",
    description:
      "Modifikasi metode Newton-Raphson tanpa memerlukan perhitungan turunan analitik.",
    url: "secant",
  },
]);
</script>

<template>
  <div
    class="min-h-screen text-[#1e293b] flex flex-col justify-center items-center p-8 overflow-x-hidden"
  >
    <Header />

    <main
      class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 w-full max-w-250"
    >
      <Card
        v-for="(method, index) in methods"
        :key="method.id"
        :methods="method"
        :index="index"
      />
    </main>
  </div>
</template>
