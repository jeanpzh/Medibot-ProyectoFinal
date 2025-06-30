-- =================================================================
-- Function: request_user_id
-- =================================================================
-- Función utilizada para obtener el id del usuario que está realizando la solicitud (CLERK)
CREATE OR REPLACE function request_user_id()
returns text
language sql stable
as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
$$;

-- =================================================================
-- Table: evaluaciones
-- =================================================================
CREATE TABLE public.evaluaciones (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    sintomas text[] NULL,
    risk_level text NULL,
    covid_prediction smallint NULL,
    confidence double precision NULL,
    CONSTRAINT evaluaciones_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.evaluaciones ENABLE ROW LEVEL SECURITY;

-- Policies for evaluaciones
CREATE POLICY "Los usuarios pueden ver sus propias evaluaciones."
ON public.evaluaciones
FOR SELECT
USING (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden crear sus propias evaluaciones."
ON public.evaluaciones
FOR INSERT
WITH CHECK (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propias evaluaciones."
ON public.evaluaciones
FOR UPDATE
USING (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propias evaluaciones."
ON public.evaluaciones
FOR DELETE
USING (request_user_id() = user_id);

-- =================================================================
-- Table: section_visits
-- =================================================================
CREATE TABLE public.section_visits (
    id bigserial NOT NULL,
    user_id text NOT NULL,
    section_key character varying NOT NULL,
    visited_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT section_visits_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.section_visits ENABLE ROW LEVEL SECURITY;

-- Policies for section_visits
CREATE POLICY "Los usuarios pueden ver sus propias visitas a secciones."
ON public.section_visits
FOR SELECT
USING (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden insertar sus propias visitas a secciones."
ON public.section_visits
FOR INSERT
WITH CHECK (request_user_id() = user_id);

-- =================================================================
-- Table: monitoring_entries
-- =================================================================
CREATE TABLE public.monitoring_entries (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id text NOT NULL,
    entry_date date NOT NULL,
    temperature numeric NULL,
    oxygen_level numeric NULL,
    heart_rate integer NULL,
    symptoms text[] NULL,
    overall_feeling integer NULL,
    notes text NULL,
    treatment_compliance integer NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT monitoring_entries_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.monitoring_entries ENABLE ROW LEVEL SECURITY;

-- Policies for monitoring_entries
CREATE POLICY "Los usuarios pueden ver sus propios registros de monitoreo."
ON public.monitoring_entries
FOR SELECT
USING (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden crear sus propios registros de monitoreo."
ON public.monitoring_entries
FOR INSERT
WITH CHECK (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden actualizar sus propios registros de monitoreo."
ON public.monitoring_entries
FOR UPDATE
USING (request_user_id() = user_id);

CREATE POLICY "Los usuarios pueden eliminar sus propios registros de monitoreo."
ON public.monitoring_entries
FOR DELETE
USING (request_user_id() = user_id); 