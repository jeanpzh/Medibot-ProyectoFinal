"use client";

import { TreatmentPlan } from "@/app/dashboard/tratamiento/types";

export const getTreatmentPlan = (covidStatus: 0 | 1): TreatmentPlan => {
  if (covidStatus === 1) {
    // COVID-19 POSITIVO - Tratamiento según CDC
    return POSITIVE_TREATMENT_PLAN;
  } else {
    // COVID-19 NEGATIVO - Medidas preventivas según CDC/OMS
    return NEGATIVE_TREATMENT_PLAN;
  }
};

export const POSITIVE_TREATMENT_PLAN: TreatmentPlan = {
  title: "Plan de Tratamiento COVID-19 Positivo",
  description:
    "Protocolo de tratamiento y cuidados para pacientes con COVID-19 confirmado según guías del CDC",
  status: "positive",
  urgency_level: "high",
  symptoms_analysis: [
    "El modelo de machine learning ha predicho un resultado positivo para COVID-19.",
    "Los factores más influyentes fueron la dificultad para respirar y la asistencia a grandes reuniones, ambos factores de alto riesgo.",
    "La ausencia de fiebre, tos seca y dolor de garganta no descarta la posibilidad de COVID-19, ya que la presentación clínica puede variar. La dificultad para respirar es especialmente preocupante y requiere monitoreo estricto.",
  ],
  monitoring_analysis: [
    "Tu historial de monitoreo muestra fluctuaciones en la temperatura corporal (entre 36.2°C y 40°C), lo cual requiere atención. La temperatura elevada de 40°C indica una posible infección activa.",
    "Los niveles de oxígeno se mantienen relativamente estables (entre 92% y 98%), pero la dificultad para respirar reportada, aun con niveles de oxígeno relativamente altos, necesita observación continua. Un descenso sostenido en el porcentaje de oxígeno es una señal de alerta.",
  ],
  monitoring_recommendations: [
    "Monitorea tu temperatura, nivel de oxígeno y la dificultad para respirar con mayor frecuencia (cada 4 horas). Registra cualquier cambio significativo en tu estado.",
    "Si experimentas un empeoramiento de la dificultad para respirar, disminución significativa en la saturación de oxígeno (por debajo de 94%), dolor torácico, o confusión, busca atención médica inmediatamente. No esperes a que los síntomas empeoren.",
  ],
  prevention_measures: [
    "Mantén un aislamiento estricto para evitar la propagación del virus. Informa a tus contactos cercanos sobre tu situación.",
    "Prioriza el reposo, bebe abundante líquido, y sigue una dieta nutritiva. Evita el esfuerzo físico extenuante. Si tienes acceso, considera la suplementación con vitamina D y C, siempre bajo la supervisión de un profesional de la salud.",
  ],
  medications: [
    "Paracetamol 650-1000mg cada 6-8 horas para fiebre y dolor (máximo 4g/día)",
    "Ibuprofeno 400-600mg cada 6-8 horas si no hay contraindicaciones",
    "Paxlovid (nirmatrelvir-ritonavir) si está dentro de los primeros 5 días de síntomas",
    "Dextrometorfano para tos seca persistente",
    "Suplementos: Vitamina D3 (4000 UI), Vitamina C (1000mg), Zinc (30mg) diarios",
  ],
  homecare: [
    "Aislamiento completo en habitación separada por mínimo 5 días",
    "Uso de mascarilla N95 o KN95 cuando esté cerca de otros",
    "Reposo absoluto y evitar actividad física intensa",
    "Hidratación abundante: 8-10 vasos de agua al día",
    "Posición semi-incorporada para dormir (45 grados)",
    "Ventilación cruzada en la habitación de aislamiento",
    "Desinfección de superficies con alcohol al 70% dos veces al día",
  ],
  monitoring: [
    "Temperatura corporal cada 6 horas",
    "Saturación de oxígeno con oxímetro de pulso cada 8 horas",
    "Frecuencia respiratoria en reposo",
    "Síntomas respiratorios y su progresión",
    "Tolerancia a alimentos y líquidos",
    "Nivel de energía y fatiga",
  ],
  isolation: [
    "Aislamiento mínimo de 5 días desde inicio de síntomas",
    "Puede terminar aislamiento si: 24 horas sin fiebre SIN medicamentos",
    "Síntomas mejorando significativamente",
    "Usar mascarilla por 5 días adicionales al salir del aislamiento",
    "Evitar contacto con personas de alto riesgo por 10 días",
  ],
  prevention: [
    "Todos los contactos cercanos deben hacerse prueba",
    "Desinfección completa del hogar después del aislamiento",
    "Lavado de ropa y sábanas con agua caliente",
    "Ventilación mejorada en espacios compartidos",
  ],
  warning_signs: [
    "Dificultad para respirar o falta de aire",
    "Dolor persistente o presión en el pecho",
    "Confusión o incapacidad para mantenerse despierto",
    "Labios o cara azulados (cianosis)",
    "Saturación de oxígeno menor a 95%",
    "Fiebre alta persistente (>39°C) por más de 3 días",
    "Deshidratación severa o incapacidad para retener líquidos",
  ],
  when_to_seek_help:
    "Busque atención médica inmediata si presenta cualquier signo de alarma. Contacte a su médico diariamente durante los primeros 5 días.",
  duration: "5-10 días de síntomas agudos. Recuperación completa: 2-6 semanas",
  follow_up: [
    "Consulta médica virtual en día 3 y 7 de síntomas",
    "Evaluación presencial si no hay mejoría en día 10",
    "Seguimiento post-COVID a las 4 semanas",
    "Evaluación cardiológica si síntomas cardíacos",
  ],
  emergency_contacts: [
    "Emergencias: 106",
    "Línea COVID-19: 113",
    "Telemedicina 24h: [número local]",
    "Médico de cabecera",
  ],
};

export const NEGATIVE_TREATMENT_PLAN: TreatmentPlan = {
  title: "Medidas Preventivas COVID-19",
  description:
    "Protocolo de prevención y cuidados para mantener la salud y prevenir el contagio de COVID-19",
  status: "negative",
  urgency_level: "low",
  symptoms_analysis: [
    "El modelo de machine learning ha predicho un resultado negativo para COVID-19.",
    "Tus síntomas actuales (o la ausencia de ellos) y tu historial de exposición no sugieren una infección activa por COVID-19 en este momento.",
    "Es importante recordar que un resultado negativo no excluye futuras infecciones. Mantén las medidas de prevención.",
  ],
  monitoring_analysis: [
    "Tu historial de monitoreo no muestra signos vitales fuera de los rangos normales. No se observan tendencias preocupantes.",
    "Continúa con el automonitoreo ocasional, especialmente si te sientes mal o has estado en situaciones de mayor riesgo.",
  ],
  monitoring_recommendations: [
    "No se requiere un monitoreo estricto en este momento. Sigue las pautas de un estilo de vida saludable.",
    "Presta atención a la aparición de cualquier síntoma nuevo como fiebre, tos o dificultad para respirar. Si aparecen, considera realizar una nueva evaluación.",
  ],
  prevention_measures: [
    "Sigue practicando el lavado de manos frecuente y el uso de mascarilla en lugares concurridos o de alto riesgo.",
    "Asegúrate de tener tu esquema de vacunación contra el COVID-19 al día, incluyendo los refuerzos recomendados.",
    "Mantén un estilo de vida saludable para fortalecer tu sistema inmunitario: dieta balanceada, ejercicio regular y sueño adecuado.",
  ],
  medications: [
    "Vitamina D3: 1000-2000 UI diarias para fortalecer el sistema inmune",
    "Vitamina C: 500-1000mg diarias",
    "Multivitamínico completo según edad",
    "Mantener vacunación COVID-19 actualizada según calendario",
    "Vacuna anual de influenza",
  ],
  homecare: [
    "Mantener rutina de ejercicio regular (150 min/semana)",
    "Dieta balanceada rica en frutas y verduras",
    "Sueño reparador de 7-9 horas diarias",
    "Manejo del estrés con técnicas de relajación",
    "Hidratación adecuada: 6-8 vasos de agua al día",
  ],
  monitoring: [
    "Automonitoreo diario de síntomas respiratorios",
    "Temperatura corporal si se siente mal",
    "Atención a cambios en olfato y gusto",
    "Monitoreo de contactos con casos positivos",
  ],
  isolation: [
    "No requiere aislamiento",
    "Mantener distanciamiento físico en espacios cerrados",
    "Evitar multitudes y espacios mal ventilados",
    "Cuarentena preventiva si exposición conocida a COVID-19",
  ],
  prevention: [
    "Uso de mascarilla KN95/N95 en transporte público y espacios cerrados",
    "Lavado de manos frecuente por mínimo 20 segundos",
    "Uso de gel antibacterial con 70% alcohol",
    "Distanciamiento físico de 2 metros cuando sea posible",
    "Ventilación cruzada en espacios cerrados",
    "Evitar tocarse cara, ojos, nariz y boca",
    "Desinfección regular de superficies de alto contacto",
  ],
  warning_signs: [
    "Aparición de fiebre (≥38°C)",
    "Tos nueva o persistente",
    "Dificultad para respirar",
    "Pérdida súbita del olfato o gusto",
    "Fatiga inusual o debilidad",
    "Dolor de garganta intenso",
    "Dolor de cabeza severo",
  ],
  when_to_seek_help:
    "Contacte a su médico si desarrolla síntomas compatibles con COVID-19 o si tuvo exposición conocida a un caso positivo.",
  duration: "Medidas preventivas continuas",
  follow_up: [
    "Evaluación médica anual de rutina",
    "Actualización de vacunas según calendario",
    "Consulta inmediata si desarrolla síntomas",
    "Prueba COVID-19 si exposición conocida",
  ],
  emergency_contacts: [
    "Emergencias: 911",
    "Línea COVID-19: 113",
    "Centro de salud local",
    "Médico de cabecera",
  ],
};
