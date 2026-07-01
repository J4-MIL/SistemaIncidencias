import { db } from './baseService.js';

export const seguimientoService = {
  porIncidencia: (incidencia_id) =>
    db((s) =>
      s
        .from('seguimientos')
        .select('*')
        .eq('incidencia_id', incidencia_id)
        .order('fecha', { ascending: true })
    ),

  async crear(seg) {
    const r = await db((s) =>
      s
        .from('seguimientos')
        .insert(seg)
        .select()
        .single()
    );
    const err = String(r.error || '').toLowerCase();
    if (!r.ok) {
      if (err.includes('usuario_id') || err.includes('seguimientos') || err.includes('column') || err.includes('does not exist')) {
        const { usuario_id, ...fallback } = seg;
        return db((s) =>
          s
            .from('seguimientos')
            .insert(fallback)
            .select()
            .single()
        );
      }
    }
    return r;
  },
};