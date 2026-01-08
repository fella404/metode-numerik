import { defineStore } from "pinia";

export const useMethodStore = defineStore("method", {
  state: () => ({
    hasilBiseksi: [],
    hasilNewton: [],
    hasilSecant: [],
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

        const ket = productFxFa < 0 ? "Lawan" : "Tidak";
        const diff = Math.abs(b - a);
        const status = diff < nilaiToleransi ? "Berhenti" : "Lanjut";

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

        if (i !== 0 && fxMulfa[i] > 0) {
          a = listX[i];
        } else if (i !== 0 && fxMulfa[i] < 0) {
          b = listX[i];
        }
      }
    },
    newtonRaphson(initialX = 0) {
      // 1. Reset array agar bersih sebelum hitung ulang
      this.hasilNewton = [];

      let x = initialX; // Nilai awal (default 0 sesuai kode asli)

      // Loop 20 kali sesuai kode asli
      for (let i = 0; i < 20; i++) {
        // f(x) = -e^(-x) + x
        const fx = -Math.exp(-x) + x;

        // f'(x) = e^(-x) + 1
        // (Turunan dari -e^(-x) adalah e^(-x), turunan x adalah 1)
        const fAksen = Math.exp(-x) + 1;

        // Cek Status Error (Berhenti/Lanjut)
        const absFx = Math.abs(fx);
        const status01 = absFx < 0.1 ? "Berhenti" : "Lanjut";
        const status001 = absFx < 0.01 ? "Berhenti" : "Lanjut";
        const status0001 = absFx < 0.001 ? "Berhenti" : "Lanjut";
        const status00001 = absFx < 0.0001 ? "Berhenti" : "Lanjut"; // Perbaikan logika

        // Masukkan ke array state
        // Format: [Iterasi, x, fx, fAksen, Error 0.1, Error 0.01, Error 0.001, Error 0.0001]
        this.hasilNewton.push([
          x.toFixed(6), // Index 1: x
          fx.toFixed(6), // Index 2: fx
          fAksen.toFixed(6), // Index 3: fAksen
          status01, // Index 4
          status001, // Index 5
          status0001, // Index 6
          status00001, // Index 7
        ]);

        // Update nilai x untuk iterasi selanjutnya
        // Rumus Newton Raphson: x_baru = x_lama - (f(x) / f'(x))
        if (fAksen !== 0) {
          x = x - fx / fAksen;
        } else {
          console.error("Pembagian dengan nol terjadi (fAksen = 0)");
          break;
        }
      }
      console.log(this.hasilNewton);
    },
    secant(inputX0, inputX1) {
      // 1. Reset state
      this.hasilSecant = [];

      // 2. Konversi input ke Number (penting!)
      let x0 = Number(inputX0);
      let x1 = Number(inputX1);

      // Variable sementara
      let x_prev2 = x0; // x(i-2) / x0
      let x_prev1 = x1; // x(i-1) / x1
      let x_curr; // x(i)

      let fx_prev2;
      let fx_prev1;
      let fx_curr;

      // Fungsi Rumus f(x) = x^2 - (x + 1) * e^(-x)
      const hitungFx = (val) => Math.pow(val, 2) - (val + 1) * Math.exp(-val);

      // Loop Iterasi
      for (let i = 0; i <= 10; i++) {
        let rowData = [];

        if (i === 0) {
          // Iterasi 0 (Inisialisasi Awal)
          x_curr = x_prev2;
          fx_curr = hitungFx(x_curr);

          // Simpan nilai fx untuk perhitungan iterasi berikutnya
          fx_prev2 = fx_curr;
        } else if (i === 1) {
          // Iterasi 1 (Inisialisasi Kedua)
          x_curr = x_prev1;
          fx_curr = hitungFx(x_curr);

          // Simpan nilai fx
          fx_prev1 = fx_curr;
        } else {
          // Iterasi 2 ke atas (Rumus Secant)
          // Rumus: x_new = x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))

          const pembilang = x_prev1 - x_prev2;
          const penyebut = fx_prev1 - fx_prev2;

          if (penyebut === 0) {
            console.error("Pembagian dengan nol pada iterasi " + i);
            break;
          }

          x_curr = x_prev1 - fx_prev1 * (pembilang / penyebut);
          fx_curr = hitungFx(x_curr);

          x_prev2 = x_prev1;
          fx_prev2 = fx_prev1;

          x_prev1 = x_curr;
          fx_prev1 = fx_curr;
        }

        const absFx = Math.abs(fx_curr);
        const status1 = absFx < 0.1 ? "Berhenti" : "Lanjut";
        const status2 = absFx < 0.01 ? "Berhenti" : "Lanjut";
        const status3 = absFx < 0.001 ? "Berhenti" : "Lanjut";
        const status4 = absFx < 0.0001 ? "Berhenti" : "Lanjut";

        this.hasilSecant.push([
          x_curr.toFixed(10),
          fx_curr.toFixed(10),
          // status1,
          // status2,
          // status3,
          // status4,
        ]);
      }
    },
  },
});
