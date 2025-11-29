// Estructuras de datos
//
// Las fechas se representan como cadenas de texto, de la forma YYYY-MM-DD:
//
//     "2020-10-07"  → significa: 7 de Octubre del 2020
//
// Las diferencias entre dos fechas se almacenan como arrays, de la
// forma [años, meses, días]. Por ejemplo:
//
//     [2, 1, 20]  → significa: hace dos años, 1 mes y 20 días.
//


function graficar_barra(diferencia) {
  const [_, meses, __] = diferencia;
  return "■".repeat(meses) + "□".repeat(12 - meses);
}


function días_en_el_mes(año, mes) {
  /**
   * Retorna la cantidad de días que tiene un mes en particular, teniendo
   * en cuenta que puede ser un año bisiesto.
   *
   * Por ejemplo:
   *
   *     días_en_el_mes(2024, 1)
   *     31
   *
   * donde 31 son los días que tiene Enero del 2024.
   *
   */

  // 1    enero        31 días
  // 2    febrero      28/29 días (28 días generalmente)/(29 en año bisiesto)
  // 3    marzo        31 días
  // 4    abril        30 dias
  // 5    Mayo         31 días
  // 6    junio        30 dias
  // 7    julio        31 días
  // 8    agosto       31 días
  // 9    septiembre   30 dias
  // 10   octubre      31 días
  // 11   noviembre    30 dias
  // 12   diciembre    31 días

  if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) {
    return 31;
  } else if ([4, 6, 9, 11].includes(mes)) {
    return 30;
  } else if (mes === 2) {
    //
    // De wikipedia: 
    //
    //   ¿Cómo saber si un año es bisiesto? Todos los años bisiestos
    //   son divisibles entre 4. Aquellos años que son divisibles
    //   entre 4, pero no entre 100, son bisiestos. Los años que son
    //   divisibles entre 100, pero no entre 400, no son bisiestos.
    //
    const es_año_bisiesto = (año % 4 === 0 && año % 100 !== 0) || (año % 4 === 0 && año % 100 === 0 && año % 400 === 0);

    if (es_año_bisiesto) {
      return 29;
    } else {
      return 28;
    }
  }
}


function obtener_diferencia(fecha_1, fecha_2) {
  /**
   * Retorna la diferencia de años, meses y días en
   * forma de array entre dos fechas.
   *
   * Por ejemplo:
   *
   *     obtener_diferencia("2022-01-01", "2022-05-06")
   *     [0, 4, 5]
   *
   * donde 0 son la cantidad de años, 4 los meses y 5 los días.
   */
  const [año_1, mes_1, día_1] = fecha_1.split("-").map(x => parseInt(x));
  const [año_2, mes_2, día_2] = fecha_2.split("-").map(x => parseInt(x));

  let años = año_2 - año_1;
  let meses = mes_2 - mes_1;
  let días = día_2 - día_1;

  if (días < 0) {
    días += días_en_el_mes(año_1, mes_1);
    meses -= 1;
  }

  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  return [años, meses, días];
}


function obtener_texto(diferencia) {
  const [años, meses, días] = diferencia;

  // Textos
  const _a = años > 1 ? "años" : "año";
  const _m = meses > 1 ? "meses" : "mes";
  const _d = días > 1 ? "días" : "día";

  if (años) {
    if (meses && días) {
      return `Hace ${años} ${_a}, ${meses} ${_m} y ${días} ${_d}`;
    } else if (meses) {
      return `Hace ${años} ${_a} y ${meses} ${_m}`;
    } else if (días) {
      return `Hace ${años} ${_a} y ${días} ${_d}`;
    } else {
      return `Hace ${años} ${_a}`;
    }
  }

  if (meses) {
    if (días) {
      return `Hace ${meses} ${_m} y ${días} ${_d}`;
    } else {
      return `Hace ${meses} ${_m}`;
    }
  }

  if (días) {
    return `Hace ${días} ${_d}`;
  }

  if (años === 0 && meses === 0 && días === 0) {
    return "Hoy";
  }

  return "??";
}


function obtener_texto_aniversario(fecha_de_hoy, diferencia) {
  const [año, mes, _] = fecha_de_hoy.split("-").map(x => parseInt(x));
  const [años, meses, días] = diferencia;

  const total_de_días = días_en_el_mes(año, mes);

  if (meses === 0 && días === 0) {
    return "hoy";
  }

  if (meses === 11) {
    const días_para_el_aniversario = total_de_días - días;
    if (días_para_el_aniversario === 1) {
      return "mañana";
    } else {
      return `aniversario en ${días_para_el_aniversario} días`;
    }
  } else {
    return "";
  }
}
