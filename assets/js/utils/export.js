export function exportarCSV(nombreArchivo = "reporte.csv", filas = []) {
  if (!Array.isArray(filas) || filas.length === 0) {
    console.warn("No hay datos para exportar.");
    return;
  }

  const columnas = Object.keys(filas[0]);

  const escapar = (valor) => {
    const texto = String(valor ?? "");
    return `"${texto.replaceAll('"', '""')}"`;
  };

  const contenido = [
    columnas.join(","),
    ...filas.map((fila) =>
      columnas.map((columna) => escapar(fila[columna])).join(",")
    ),
  ].join("\n");

  const blob = new Blob([contenido], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");

  enlace.href = url;
  enlace.download = nombreArchivo.endsWith(".csv")
    ? nombreArchivo
    : `${nombreArchivo}.csv`;

  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  URL.revokeObjectURL(url);
}