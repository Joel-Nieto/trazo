function gaussJordan({ A, b }) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);
  const iteraciones = [];

  const snapshot = () => M.map(row => [...row]);

  for (let col = 0; col < n; col++) {
    let pivotRow = -1;
    for (let row = col; row < n; row++) {
      if (M[row][col] !== 0) {
        pivotRow = row;
        break;
      }
    }

    if (pivotRow === -1) {
      throw new Error("Pivote nulo: el sistema no tiene solución única");
    }

    if (pivotRow !== col) {
      [M[col], M[pivotRow]] = [M[pivotRow], M[col]];
      iteraciones.push({ tipo: "swap", filas: [col, pivotRow], matriz: snapshot() });
    }

    const pivot = M[col][col];
    for (let j = col; j <= n; j++) {
      M[col][j] /= pivot;
    }
    iteraciones.push({ tipo: "normalizar", fila: col, matriz: snapshot() });

    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = M[row][col];
        if (factor !== 0) {
          for (let j = col; j <= n; j++) {
            M[row][j] -= factor * M[col][j];
          }
          iteraciones.push({ tipo: "eliminar", desde: col, hasta: row, matriz: snapshot() });
        }
      }
    }
  }

  const resultado = M.map(row => row[n]);

  return { resultado, iteraciones };
}

export { gaussJordan };
