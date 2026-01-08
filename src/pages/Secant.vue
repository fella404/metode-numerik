<script setup>
import { ref, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useMethodStore } from "../stores/methodStore.js";
import { useToast } from "vue-toastification";

const method = useMethodStore();
const toast = useToast();

const x0 = ref("");
const x1 = ref("");
const { hasilSecant } = storeToRefs(method);

const handleSubmit = () => {
  if (x0.value === "" || x1.value === "") {
    return toast.error("All fields are required!", {
      position: "top-center",
      toastClassName: "mobile-view",
    });
  }

  method.secant(x0.value, x1.value);
  console.log(method.hasilSecant);
};

const cekWarna = (nilai) => {
  if (nilai < 0) {
    return "num-neg";
  } else {
    return "num-pos";
  }
};

onUnmounted(() => {
  method.hasilSecant = [];
});
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center gap-12 justify-center px-4 md:px-8 py-12"
  >
    <form
      @submit.prevent="handleSubmit"
      class="control-panel bg-[#ffffff] py-6 px-8 rounded-xl flex items-end gap-5 w-full max-w-200 border border-[#e5e7eb]"
    >
      <div class="flex flex-col gap-2 flex-1 relative">
        <label
          for="x0-input"
          class="text-sm font-semibold text-[#4b5563] uppercase tracking-[0.5px]"
          >X0
          <span
            class="italic text-[#6b7280] ml-1"
            style="font-family: 'Times New Roman', Times, serif"
          ></span
        ></label>
        <input
          type="number"
          v-model="x0"
          id="x0-input"
          class="py-3 px-4 border border-[#d1d5db] rounded-lg text-base text-[#111827] bg-[#f9fafb] transition-all duration-200 ease-out outline-none focus:bg-white focus:border-blue-500 focus:ring focus:ring-blue-500/15 focus:outline-none"
          style="font-family: 'Consolas', monospace"
          placeholder="Contoh: 0.8"
          step="any"
        />
      </div>
      <div class="flex flex-col gap-2 flex-1 relative">
        <label
          for="x1-input"
          class="text-sm font-semibold text-[#4b5563] uppercase tracking-[0.5px]"
          >X1
          <span
            class="italic text-[#6b7280] ml-1"
            style="font-family: 'Times New Roman', Times, serif"
          ></span
        ></label>
        <input
          type="number"
          v-model="x1"
          id="x1-input"
          class="py-3 px-4 border border-[#d1d5db] rounded-lg text-base text-[#111827] bg-[#f9fafb] transition-all duration-200 ease-out outline-none focus:bg-white focus:border-blue-500 focus:ring focus:ring-blue-500/15 focus:outline-none"
          style="font-family: 'Consolas', monospace"
          placeholder="Contoh: 0.9"
          step="any"
        />
      </div>

      <button
        class="btn-calculate flex items-center justify-center h-11.5 min-w-30 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-blue-800 active:scale-[0.97]"
      >
        Hitung
      </button>
    </form>

    <div
      class="w-full max-w-150 max-h-[80vh] overflow-auto bg-white border border-gray-300 rounded shadow-md"
    >
      <table class="excel-table w-full border-collapse text-sm text-[#333]">
        <thead>
          <tr>
            <th style="width: 50px">Iterasi</th>
            <th>x</th>
            <th>f(x)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="(row, index) in hasilSecant"
            :key="index"
          >
            <td>
              <p class="text-center">{{ index }}</p>
            </td>

            <td :class="cekWarna(Number(row[0]))">
              <p class="text-center">{{ row[0] }}</p>
            </td>

            <td :class="cekWarna(Number(row[1]))">
              <p class="text-center">{{ row[1] }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
.excel-table th {
  background-color: #f3f4f6;
  color: #1f2937;
  font-weight: 600;
  padding: 10px 12px;
  text-align: center;
  border: 1px solid #d1d5db;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.05);
}

.excel-table td {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  text-align: right;
  white-space: nowrap;
}

.excel-table td:first-child {
  text-align: center;
  background-color: #f9fafb;
  font-weight: bold;
  color: #6b7280;
}

.excel-table tbody tr:hover {
  background-color: #f0f9ff;
}

.excel-table td:hover {
  border: 1px solid #3b82f6;
  cursor: cell;
}

.num-neg {
  color: #dc2626;
}

.num-pos {
  color: #059669;
}

@media (max-width: 600px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-calculate {
    margin-top: 12px;
  }
}
</style>
