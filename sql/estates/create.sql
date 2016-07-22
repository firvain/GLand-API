CREATE TABLE public.estates (
  gid                  serial NOT NULL PRIMARY KEY,
  category_id          integer,
  living_area          integer,
  construction_year    integer,
  level_numer          integer,
  bedrooms             integer,
  kitchens             integer,
  living_rooms         integer,
  bathrooms            integer,
  parking              boolean NOT NULL DEFAULT false,
  furnished            boolean NOT NULL DEFAULT false,
  has_storage          boolean NOT NULL DEFAULT false,
  elevator             boolean NOT NULL DEFAULT false,
  balcony              boolean NOT NULL DEFAULT false,
  corner               boolean NOT NULL DEFAULT false,
  airy                 boolean NOT NULL DEFAULT false,
  double_glass         boolean NOT NULL DEFAULT false,
  satellite            boolean NOT NULL DEFAULT false,
  lot_size             integer,
  solar_water_heating  boolean NOT NULL DEFAULT false,
  has_view             boolean NOT NULL DEFAULT false,
  garden               boolean NOT NULL DEFAULT false,
  air_condition        boolean NOT NULL DEFAULT false,
  shared_expenses      boolean NOT NULL DEFAULT false,
  night_power          boolean NOT NULL DEFAULT false,
  pool                 boolean NOT NULL DEFAULT false,
  playroom             boolean NOT NULL DEFAULT false,
  secure_door          boolean NOT NULL DEFAULT false,
  penthouse            boolean NOT NULL DEFAULT false,
  window_screens       boolean NOT NULL DEFAULT false,
  attic                boolean NOT NULL DEFAULT false,
  alarm                boolean NOT NULL DEFAULT false,
  awning               boolean NOT NULL DEFAULT false,
  fireplace            boolean NOT NULL DEFAULT false,
  road_type            integer,
  heating_system       integer,
  frames_type          integer,
  floors_type          integer,
  street_name          text,
  street_number        text,
  ps_code              text,
  city                 text,
  country              text,
  the_geom             public.geometry,
  /* Keys */
  CONSTRAINT estates_pkey
    PRIMARY KEY (gid),
  /* Foreign keys */
  CONSTRAINT foreign_key01
    FOREIGN KEY (category_id)
    REFERENCES public.categories(id),
  CONSTRAINT foreign_key02
    FOREIGN KEY (road_type)
    REFERENCES public.road_types(id),
  CONSTRAINT foreign_key03
    FOREIGN KEY (frames_type)
    REFERENCES public.frames_type(id)
) WITH (
    OIDS = FALSE
  );
