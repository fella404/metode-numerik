import { defineStore } from "pinia";

export const useMethodStore = defineStore("method", {
  state: () => ({
    hasilBiseksi: [],
  }),
  actions: {
    biseksi(batasBawah, batasAtas) {
      this.hasilBiseksi = [];

      const nilaiToleransi = 0.001;

      const range = [-1, 0];
      const nimA = batasBawah;
      const nimB = batasAtas;

      let a = range[0];
      let b = range[1];
      let x;
      const fxMulfa = [];
      const listX = [];

      for (let i = 0; i < 15; i++) {
        if (i === 1) {
          a = listX[0];
          b = range[1];
        }

        x = (a + b) / 2;

        const fx =
          nimB +
          0.34 -
          (nimA + 20.97) * x +
          16.3 * Math.pow(x, 3) -
          Number(`${nimA}.${nimB}`) * Math.pow(x, 5);

        const fa =
          nimB +
          0.34 -
          (nimA + 20.97) * a +
          16.3 * Math.pow(a, 3) -
          Number(`${nimA}.${nimB}`) * Math.pow(a, 5);

        const productFxFa = fx * fa;
        fxMulfa.push(productFxFa);
        listX.push(x);

        // Menentukan Keterangan (Lawan/Tidak) dan Status (Berhenti/Lanjut)
        const ket = productFxFa < 0 ? "Lawan" : "Tidak";
        const diff = Math.abs(b - a);
        const status = diff < nilaiToleransi ? "Berhenti" : "Lanjut";

        // Simpan data ke array sebagai row baru
        // Format: [a, b, x, fx, fa, ket, b-a, status]
        this.hasilBiseksi.push([
          a.toFixed(6),
          b.toFixed(6),
          x.toFixed(6),
          fx.toFixed(6),
          fa.toFixed(6),
          ket,
          diff.toFixed(6),
          status,
        ]);

        // Update nilai a atau b untuk iterasi berikutnya
        if (i !== 0 && fxMulfa[i] > 0) {
          a = listX[i];
        } else if (i !== 0 && fxMulfa[i] < 0) {
          b = listX[i];
        }
      }
    },
  },
});
