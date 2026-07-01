drop table if exists notificaciones cascade;
drop table if exists auditoria cascade;
drop table if exists seguimientos cascade;
drop table if exists asignaciones cascade;
drop table if exists incidencias cascade;
drop table if exists tecnicos cascade;
drop table if exists usuarios cascade;

create table usuarios (
  id bigserial primary key,
  nombre varchar(120) not null,
  correo varchar(120) unique not null,
  contrasena varchar(120) not null,
  rol varchar(20) not null check (rol in ('ADMIN','EMPLEADO','TECNICO')),
  area varchar(100),
  activo boolean default true,
  fecha_registro timestamp default now()
);

create table tecnicos (
  id bigserial primary key,
  usuario_id bigint references usuarios(id) on delete cascade,
  especialidad varchar(100) not null,
  nivel_soporte int not null check (nivel_soporte in (1,2,3)),
  disponible boolean default true
);

create table incidencias (
  id bigserial primary key,
  codigo varchar(30) unique,
  titulo varchar(160) not null,
  descripcion text not null,
  categoria varchar(80) default 'General',
  prioridad varchar(20) not null check (prioridad in ('BAJA','MEDIA','ALTA','CRITICA')),
  estado varchar(25) default 'ABIERTO' check (estado in ('ABIERTO','ASIGNADO','EN_PROCESO','RESUELTO','CERRADO')),
  nivel_soporte int not null check (nivel_soporte in (1,2,3)),
  usuario_id bigint references usuarios(id),
  fecha_creacion timestamp default now(),
  fecha_actualizacion timestamp default now()
);

create table asignaciones (
  id bigserial primary key,
  incidencia_id bigint references incidencias(id) on delete cascade,
  tecnico_id bigint references tecnicos(id),
  fecha_asignacion timestamp default now(),
  activo boolean default true
);

create table seguimientos (
  id bigserial primary key,
  incidencia_id bigint references incidencias(id) on delete cascade,
  usuario_id bigint references usuarios(id),
  comentario text not null,
  estado_nuevo varchar(25),
  fecha timestamp default now()
);

create table auditoria (
  id bigserial primary key,
  usuario_id bigint references usuarios(id),
  accion varchar(80) not null,
  tabla varchar(80),
  registro_id bigint,
  descripcion text,
  fecha timestamp default now()
);

create table notificaciones (
  id bigserial primary key,
  usuario_id bigint references usuarios(id),
  titulo varchar(120) not null,
  mensaje text not null,
  leida boolean default false,
  fecha timestamp default now()
);

insert into usuarios (nombre, correo, contrasena, rol, area, activo) values
('Administrador','admin@empresa.com','admin123','ADMIN','Sistemas',true),
('Jamil Alarcon','jamil@empresa.com','123456','EMPLEADO','Ventas',true),
('Alfred Alt','alfred@empresa.com','123456','TECNICO','Soporte',true);

insert into tecnicos (usuario_id, especialidad, nivel_soporte, disponible)
values ((select id from usuarios where correo='alfred@empresa.com'), 'Redes y conectividad', 1, true);

insert into incidencias (codigo,titulo,descripcion,categoria,prioridad,nivel_soporte,usuario_id,estado)
values ('INC-0001','Error de internet','El equipo no tiene conexión a internet desde la mañana.','Redes','ALTA',1,(select id from usuarios where correo='jamil@empresa.com'),'ABIERTO');
