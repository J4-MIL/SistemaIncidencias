-- Correcciones necesarias en Supabase para sincronizar el esquema con la app
-- Ejecútalo en el editor SQL de Supabase y luego recarga la app.

ALTER TABLE public.asignaciones
  ADD COLUMN IF NOT EXISTS activo boolean DEFAULT true;

ALTER TABLE public.incidencias
  ADD COLUMN IF NOT EXISTS fecha_actualizacion timestamp DEFAULT now();

ALTER TABLE public.seguimientos
  ADD COLUMN IF NOT EXISTS usuario_id bigint REFERENCES public.usuarios(id);

CREATE TABLE IF NOT EXISTS public.notificaciones (
  id bigserial PRIMARY KEY,
  usuario_id bigint REFERENCES public.usuarios(id),
  titulo varchar(120) NOT NULL,
  mensaje text NOT NULL,
  leida boolean DEFAULT false,
  fecha timestamp DEFAULT now()
);

-- Si el esquema cache está obsoleto, vuelve a cargar la app o reinicia el proyecto Supabase.
