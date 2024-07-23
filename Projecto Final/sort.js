function GenerarNumeroAleatorio() {
    const RandomNumber = Math.random() * 10_000;
    const NumeroEntero = parseInt(RandomNumber);
    return NumeroEntero;
  }
  let arrayNumerosAleatorios = [];
  for (let index = 0; index < 10_000; index++) {
    arrayNumerosAleatorios.push(GenerarNumeroAleatorio());
  }
  
  function bubbleSort(arrayNumeros) {
    let cambiado =f false;
    let arrayNumerosClon = arrayNumeros.slice();
    for (let i = arrayNumerosClon.length; i > 0; i--) {
      cambiado = true;
      for (let j = 0; j < i - 1; j++) {
        const numeroActual = arrayNumerosClon[j];
        const numeroSiguiente = arrayNumerosClon[j + 1];
        if (numeroActual > numeroSiguiente) {
          cambiado = false;
          arrayNumerosClon[j] = numeroSiguiente;
          arrayNumerosClon[j + 1] = numeroActual;
        }
      }
      if (cambiado) break;
    }
    return arrayNumerosClon;
  }
  
  function selectionSort(arrayNumeros) {
    let arrayNumerosClon = arrayNumeros.slice();
    let valorMinimo;
    let posicionValorMinimo;
    for (let i = 0; i < arrayNumerosClon.length; i++) {
      valorMinimo = arrayNumerosClon[i];
      for (let j = i + 1; j < arrayNumerosClon.length; j++) {
        const valorAcomparar = arrayNumerosClon[j];
        if (valorMinimo > valorAcomparar) {
          valorMinimo = valorAcomparar;
          posicionValorMinimo = j;
        }
      }
      if (posicionValorMinimo !== undefined) {
        const valorActual = arrayNumerosClon[i];
        const nuevoValorMinimo = arrayNumerosClon[posicionValorMinimo];
        arrayNumerosClon[i] = nuevoValorMinimo;
        arrayNumerosClon[posicionValorMinimo] = valorActual;
        posicionValorMinimo = undefined;
      }
    }
    return arrayNumerosClon;
  }
  function insertionSort(arrayNumeros) {
    let arrayNumerosClon = arrayNumeros.slice();
    for (let i = 1; i < arrayNumerosClon.length; i++) {
      let valorActual = arrayNumerosClon[i];
      let j
      for (j = i-1; j >= 0 && arrayNumerosClon[j] > valorActual; j--) {
        arrayNumerosClon[j+1] = arrayNumerosClon[j];      
      }
      arrayNumerosClon[j+1] = valorActual
    }
    return arrayNumerosClon
  }
  function mergeSort(arrayNumeros) {
    let arrayNumerosClon = arrayNumeros.slice();
    if (arrayNumerosClon.length < 2) return arrayNumerosClon;
    const medio = Math.floor(arrayNumerosClon.length / 2);
    const arrayIzquierda = mergeSort(arrayNumerosClon.slice(0, medio));
    const arrayDerecha = mergeSort(
      arrayNumerosClon.slice(medio, arrayNumerosClon.length)
    );
    return Array.from(
      { length: arrayIzquierda.length + arrayDerecha.length },
      () => {
        if (!arrayIzquierda.length) {
          return arrayDerecha.shift();
        } else if (!arrayDerecha.length) {
          return arrayIzquierda.shift();
        } else {
          return arrayIzquierda[0] > arrayDerecha[0]
            ? arrayDerecha.shift()
            : arrayIzquierda.shift();
        }
      }
    );
  }
  function quickSort(arrayNumeros) {
    let arrayNumerosClon = arrayNumeros.slice();
    if (arrayNumerosClon.length <= 1) {
      return arrayNumerosClon;
    }
    const pivote = arrayNumerosClon[arrayNumerosClon.length - 1];
    const arrayIzquierda = [];
    const arrayDerecha = [];
    for (let i = 0; i < arrayNumerosClon.length - 1; i++) {
      if (arrayNumerosClon[i] < pivote) {
        arrayIzquierda.push(arrayNumerosClon[i]);
      } else {
        arrayDerecha.push(arrayNumerosClon[i]);
      }
    }
    return [...quickSort(arrayIzquierda), pivote, ...quickSort(arrayDerecha)];
  }
  
  const bubbleSortInicia = performance.now();
  const arrayNumerosBubbleSorted = bubbleSort(arrayNumerosAleatorios);
  const bubbleSortTermina = performance.now();
  console.log(`Bubble Sort Tardo ${bubbleSortTermina - bubbleSortInicia}ms`);
  
  const selectionSortInicia = performance.now();
  const arrayNumerosSelectionSorted = selectionSort(arrayNumerosAleatorios);
  const selectionSortTermina = performance.now();
  console.log(
    `Selection Sort Tardo ${selectionSortTermina - selectionSortInicia}ms`);
  
  const insertionSortInicia = performance.now();
  const arrayNumerosInsertionSorted = insertionSort(arrayNumerosAleatorios);
  const insertionSortTermina = performance.now();
  console.log(`insertion Sort Tardo ${insertionSortTermina - insertionSortInicia}ms`);
  
  const mergeSortInicia = performance.now();
  const arrayNumerosMergeSorted = mergeSort(arrayNumerosAleatorios);
  const mergeSortSortTermina = performance.now();
  console.log(`merge Sort Tardo ${mergeSortTermina - mergeSortSortInicia}ms`);
  
  const quickSortInicia = performance.now();
  const arrayNumerosQuickSorted = quickSort(arrayNumerosAleatorios);
  const quickSortTermina = performance.now();
  console.log(`quick Sort Tardo ${quickSortTermina - quickSortInicia}ms`)