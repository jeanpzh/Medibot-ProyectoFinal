"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getDashboardStats() {
  try {
    const supabase = await createClerkSupabaseClient();
    const [evaluationsRes, visitsRes] = await Promise.all([
      supabase
        .from("evaluaciones")
        .select("risk_level, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("section_visits").select("section_key"),
    ]);

    if (evaluationsRes.error)
      throw new Error(
        `Error fetching evaluations: ${evaluationsRes.error.message}`
      );
    if (visitsRes.error)
      throw new Error(
        `Error fetching section visits: ${visitsRes.error.message}`
      );
    const evaluations = evaluationsRes.data || [];
    const visitedSections =
      visitsRes.data?.map((v: { section_key: string }) => v.section_key) || [];

    return {
      totalEvaluations: evaluations.length,
      lastEvaluation: evaluations[0]?.created_at || null,
      riskLevel: evaluations[0]?.risk_level || null,
      completedModules: visitedSections.length,
      visitedSections: visitedSections,
      error: null,
    };
  } catch (error: any) {
    console.error("Error in getDashboardStats:", error);
    return {
      totalEvaluations: 0,
      lastEvaluation: null,
      riskLevel: null,
      completedModules: 0,
      visitedSections: [],
      error: error.message,
    };
  }
}

export async function addEvaluation(evaluationData: {
  symptoms: string[];
  riskLevel: string;
  predictedCovid: number;
  confidence: number;
}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const supabase = await createClerkSupabaseClient();
    const { symptoms, riskLevel, predictedCovid, confidence } = evaluationData;

    const { error } = await supabase.from("evaluaciones").insert({
      user_id: userId,
      sintomas: symptoms,
      risk_level: riskLevel,
      covid_prediction: predictedCovid,
      confidence: confidence,
    });

    if (error) {
      throw new Error(`Error adding evaluation: ${error.message}`);
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/explicacion");
    revalidatePath("/dashboard/tratamiento");
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Error in addEvaluation:", error);
    return { success: false, error: error.message };
  }
}

export async function addSectionVisit(sectionKey: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const supabase = await createClerkSupabaseClient();
    const { error } = await supabase
      .from("section_visits")
      .upsert(
        { section_key: sectionKey, user_id: userId },
        { onConflict: "user_id, section_key", ignoreDuplicates: true }
      );

    if (error) {
      throw new Error(`Error adding section visit: ${error.message}`);
    }

    revalidatePath("/dashboard");
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Error in addSectionVisit:", error);
    return { success: false, error: error.message };
  }
}

export async function getDiagnosis(formData: Record<string, 0 | 1>) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    if (!backendUrl) {
      throw new Error(
        "La URL del backend no está configurada en las variables de entorno."
      );
    }

    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error del backend: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    const result = await response.json();

    // La lógica de guardado ha sido movida al store de Zustand (useEvaluationStore)
    // para asegurar que todos los datos (síntomas, predicción, etc.) se guarden juntos.
    // La función addEvaluation ya no se llama desde aquí.

    revalidatePath("/dashboard");
    return { success: true, data: result, error: null };
  } catch (error: any) {
    console.error("Error en getDiagnosis:", error.message);
    return { success: false, data: null, error: error.message };
  }
}

export async function getLatestEvaluation() {
  try {
    const { userId } = await auth();
    if (!userId) {
      // Si no hay usuario, no hay evaluación que mostrar
      return { success: true, data: null, error: null };
    }
    const supabase = await createClerkSupabaseClient();
    const { data, error } = await supabase
      .from("evaluaciones")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116: 'exact-cardinality-violation' - se ignora si no hay filas
      console.error("Supabase error:", error);
      throw new Error(`Error fetching latest evaluation: ${error.message}`);
    }

    return { success: true, data: data || null, error: null };
  } catch (error: any) {
    console.error("Error in getLatestEvaluation:", error.message);
    return { success: false, data: null, error: error.message };
  }
}

export async function getLatestEvaluationResult() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: true, data: null, error: "User not authenticated" };
    }
    const supabase = await createClerkSupabaseClient();
    const { data, error } = await supabase
      .from("evaluaciones")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116: 'exact-cardinality-violation' - se ignora si no hay filas
      console.error("Supabase error:", error);
      throw new Error(`Error fetching latest evaluation: ${error.message}`);
    }

    return { success: true, data: data || null, error: null };
  } catch (error: any) {
    console.error("Error in getLatestEvaluationResult:", error.message);
    return { success: false, data: null, error: error.message };
  }
}

// --- ACCIONES PARA EL MONITOREO ---

// Tipo para una entrada de monitoreo (debe coincidir con el frontend)
export type MonitoringEntry = {
  id: string;
  entry_date: string;
  temperature?: number;
  oxygen_level?: number;
  heart_rate?: number;
  symptoms?: string[];
  overall_feeling?: number;
  notes?: string;
  treatment_compliance?: number;
  user_id?: string;
  created_at: string;
};

/**
 * Obtiene todos los registros de monitoreo para el usuario autenticado.
 */
export async function getMonitoringEntries() {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Usuario no autenticado." };
  }
  const supabase = await createClerkSupabaseClient();

  const { data, error } = await supabase
    .from("monitoring_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching monitoring entries:", error);
    return { error: "No se pudieron cargar los registros de monitoreo." };
  }

  // Mapear para asegurar consistencia con el tipo del frontend
  const entries: MonitoringEntry[] = data.map((entry) => ({
    ...entry,
    id: entry.id!,
    entry_date: entry.entry_date!,
    created_at: entry.created_at!,
  }));

  return { data: entries };
}

/**
 * Crea o actualiza un registro de monitoreo para una fecha específica.
 * @param entry - Los datos del registro de monitoreo.
 */
export async function addOrUpdateMonitoringEntry(
  entry: Omit<MonitoringEntry, "id" | "created_at"> & { id?: string }
) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Usuario no autenticado." };
  }
  const supabase = await createClerkSupabaseClient();

  // Asegurar que el user_id esté incluido en el registro
  const entryWithUserId = {
    ...entry,
    user_id: userId,
  };

  // Si hay un ID, es una actualización; si no, es una inserción nueva
  if (entry.id) {
    // Actualizar registro existente específico
    const { data, error } = await supabase
      .from("monitoring_entries")
      .update(entryWithUserId)
      .eq("id", entry.id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating monitoring entry:", error);
      return { error: "No se pudo actualizar el registro." };
    }

    return { data };
  } else {
    // Insertar nuevo registro (permite múltiples registros por día)
    const { data, error } = await supabase
      .from("monitoring_entries")
      .insert(entryWithUserId)
      .select()
      .single();

    if (error) {
      console.error("Error inserting monitoring entry:", error);
      return { error: "No se pudo guardar el registro." };
    }

    return { data };
  }
}

/**
 * Elimina un registro de monitoreo.
 * @param entryId - El ID del registro a eliminar.
 */
export async function deleteMonitoringEntry(entryId: string) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Usuario no autenticado." };
  }
  const supabase = await createClerkSupabaseClient();

  const { error } = await supabase
    .from("monitoring_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting monitoring entry:", error);
    return { error: "No se pudo eliminar el registro." };
  }

  return { success: true };
}

/**
 * Genera una explicación detallada usando la IA, incluyendo el historial de monitoreo como contexto.
 * @param features - Los síntomas y factores de la evaluación inicial
 * @param predictionLabel - El resultado de la predicción (ej. "COVID-19" o "NO COVID-19")
 */
export async function generateExplanationWithMonitoring(
  features: Record<string, 0 | 1>,
  predictionLabel: string
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Usuario no autenticado." };
    }

    // Obtener el historial de monitoreo del usuario
    const monitoringResult = await getMonitoringEntries();
    let monitoringData: MonitoringEntry[] = [];

    if (monitoringResult.data) {
      // Tomar solo los últimos 5 registros para el contexto
      monitoringData = monitoringResult.data.slice(0, 5);
    }

    // Preparar los datos para el backend
    const requestData = {
      features,
      prediction_label: predictionLabel,
      monitoring_data: monitoringData.map((entry) => ({
        entry_date: entry.entry_date,
        temperature: entry.temperature,
        oxygen_level: entry.oxygen_level,
        heart_rate: entry.heart_rate,
        symptoms: entry.symptoms || [],
        overall_feeling: entry.overall_feeling,
        notes: entry.notes || "",
      })),
    };

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    const response = await fetch(`${backendUrl}/explain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error del backend: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const explanationData = await response.json();

    return { success: true, data: explanationData, error: null };
  } catch (error: any) {
    console.error("Error generating explanation with monitoring:", error);
    return { success: false, data: null, error: error.message };
  }
}
