import { CountryCode, TrendTopic, TrendItem, TrendHeatmapResponse } from '../types';

export interface CountryInfo {
  code: CountryCode;
  label: string;
  flag: string;
}

export interface TopicInfo {
  code: TrendTopic;
  label: string;
  icon: string;
}

export interface PlatformInfo {
  code: 'all' | 'tiktok' | 'instagram' | 'facebook';
  label: string;
  icon: string;
}

export const COUNTRIES_LIST: CountryInfo[] = [
  { code: 'global', label: 'Global', flag: '🌍' },
  { code: 'bo', label: 'Bolivia', flag: '🇧🇴' },
  { code: 'mx', label: 'México', flag: '🇲🇽' },
  { code: 'es', label: 'España', flag: '🇪🇸' },
  { code: 'ar', label: 'Argentina', flag: '🇦🇷' },
  { code: 'co', label: 'Colombia', flag: '🇨🇴' },
  { code: 'cl', label: 'Chile', flag: '🇨🇱' },
  { code: 'pe', label: 'Perú', flag: '🇵🇪' },
  { code: 'br', label: 'Brasil', flag: '🇧🇷' },
  { code: 'us', label: 'Estados Unidos', flag: '🇺🇸' },
];

export const PLATFORMS_LIST: PlatformInfo[] = [
  { code: 'all', label: 'Todas las Redes', icon: '📱' },
  { code: 'tiktok', label: 'TikTok', icon: '🎵' },
  { code: 'instagram', label: 'Instagram', icon: '📸' },
  { code: 'facebook', label: 'Facebook', icon: '📘' },
];

export const TOPICS_LIST: TopicInfo[] = [
  { code: 'all', label: 'Todos los Tópicos', icon: '🔥' },
  { code: 'entertainment', label: 'Entretenimiento & Viral', icon: '🎭' },
  { code: 'tech', label: 'Tecnología & IA', icon: '🤖' },
  { code: 'sports', label: 'Deportes & Fitness', icon: '⚽' },
  { code: 'fashion', label: 'Moda & Belleza', icon: '💄' },
  { code: 'food', label: 'Gastronomía & Foodies', icon: '🍔' },
  { code: 'business', label: 'Negocios & Finanzas', icon: '💼' },
  { code: 'music', label: 'Música & Sonidos', icon: '🎵' },
  { code: 'lifestyle', label: 'Viajes & Lifestyle', icon: '✈️' },
];

export const SEED_TRENDS: Record<string, Array<{ name: string; displayName: string; topic?: TrendTopic; topicLabel?: string; angle?: string }>> = {
  "bo-all": [
    {
      "name": "#SalarDeUyuni",
      "displayName": "El Espejo Natural Más Grande del Mundo",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CarnavalDeOruro",
      "displayName": "Obra Maestra del Patrimonio Oral e Intangible",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SeleccionBoliviana",
      "displayName": "La Verde en el Titán de Villa Ingenio (El Alto)",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#SalteñasBolivianas",
      "displayName": "El Jugoso Ritual de la Media Mañana",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CaporalesSanSimon",
      "displayName": "Pasos Virales y Fuerza Juvenil",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#TelefericoLaPaz",
      "displayName": "El Transporte Urbano Por Cable Más Alto",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaCholaBoliviana",
      "displayName": "Elegancia de Alta Costura y Tradición",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#EmprenderEnBolivia",
      "displayName": "Startups, Fintech y Pagos QR",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#LagoTiticaca",
      "displayName": "Isla del Sol y Misterios Sagrados",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#InteligenciaArtificial",
      "displayName": "IA Aplicada a Negocios y Educación",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    }
  ],
  "bo-tiktok": [
    {
      "name": "#CaporalesChallenge",
      "displayName": "Zapateos y Coreografías Virales de Caporal",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SalteñaTime",
      "displayName": "El Desafío de Comer Salteña Sin Derramar Jugo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CholitasSkateras",
      "displayName": "Trucos de Skateboard en Polleras",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#HumorCambaVsColla",
      "displayName": "Sketches de Costumbres del Oriente y Occidente",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#IllimaniTimelapse",
      "displayName": "Atardeceres Épicos del Nevado desde El Alto",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#TarijaVinosChallenge",
      "displayName": "Cata a Ciegas de Singanis y Vinos de Altura",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MorenadaRemix",
      "displayName": "El Rey Moreno con Bases Electrónicas",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#StreetFoodBolivia",
      "displayName": "Rellenos de Papa, Anticuchos y Silpancho",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#LaVerdeEnElAlto",
      "displayName": "Hinchada y Fiesta en el Estadio de Villa Ingenio",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#CarnavalDeOruroEnTikTok",
      "displayName": "Los Mejores Clips de Diablada y Caporales",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "bo-instagram": [
    {
      "name": "#UyuniAesthetic",
      "displayName": "Fotografía Minimalista y Reflejos Infinitos en el Salar",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#LaPazDesdeElCielo",
      "displayName": "Tomas Aéreas de la Geografía Paceña y Teleféricos",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaCholaElegance",
      "displayName": "Retratos Editoriales de Mantas de Vicuña y Filigrana",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#SamaipataRetreat",
      "displayName": "Cabañas en el Bosque y Viñedos de Altura",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CafesDeCochabamba",
      "displayName": "Ruta de Cafés de Especialidad y Brunch Gourmet",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#FotografiaAndina",
      "displayName": "Retratos de Miradas Profundas y Trajes Autóctonos",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MadidiBioReserva",
      "displayName": "El Parque Nacional Más Biodiverso del Planeta",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GastronomiaBolivianaGourmet",
      "displayName": "Cocina de Origen y Revalorización de Ingredientes Nativos",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#SucreCiudadBlanca",
      "displayName": "Patios Coloniales, Tejas Rojas y Calles de Ensueño",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#AtardecerEnElTiticaca",
      "displayName": "El Lago Sagrado con Luces Doradas y Barcos de Totora",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "bo-facebook": [
    {
      "name": "#DebateFutbolBoliviano",
      "displayName": "Polémicas de la División Profesional y Selección Nacional",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#ComunidadVecinalElAlto",
      "displayName": "Seguridad Ciudadana y Proyectos de Obras en Distritos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#MercadoCampesinoYPrecios",
      "displayName": "Monitoreo de Precios de la Canasta Familiar",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#NoticiasEnVivoBolivia",
      "displayName": "Transmisiones Ciudadanas de Acontecimientos de Último Minuto",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#QuejasDelTransporte",
      "displayName": "Debate de Rutas de Minibuses, Tarifas y Trameaje",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDeBoliviaDeAntaño",
      "displayName": "Fotografías Históricas de Ciudades y Ferrocarriles",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GastronomiaTradicionalCasera",
      "displayName": "Recetas de la Abuela: Picante Surtido y Chairo Caliente",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#DebatePoliticoYEconomico",
      "displayName": "Foro Ciudadano sobre Reservas, Dólar y Exportaciones",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#Feria16DeJulioHallazgos",
      "displayName": "Consejos de Compras, Repuestos y Ropa Americana",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SolidaridadBoliviana",
      "displayName": "Campañas de Apoyo Social, Salud y Refugios de Animales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "mx-all": [
    {
      "name": "#ChecoPerez",
      "displayName": "Checo Pérez en Fórmula 1",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#LaCasaDeLosFamososMX",
      "displayName": "La Casa de los Famosos México",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#InteligenciaArtificial",
      "displayName": "Herramientas de IA para Negocios",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#TacosAlPastor",
      "displayName": "Ruta del Mejor Pastor en CDMX",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PesoPluma",
      "displayName": "Nuevos Lanzamientos & Corridos",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#LigaMX",
      "displayName": "Jornada Decisiva y Clásico",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#FestivalArre",
      "displayName": "Outfits y Experiencia en Vivo",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FinanzasPersonales",
      "displayName": "Cetes y Estrategias Anti-Inflación",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#LuisMiguelTour",
      "displayName": "Conciertos Estadio GNP",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SkincareMexicano",
      "displayName": "Bloqueador y Rutina Anti-Brillo",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    }
  ],
  "mx-tiktok": [
    {
      "name": "#BaileDeLasCatrinas",
      "displayName": "Coreografías y Maquillaje de Catrina con Iluminación LED",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SonidoBandaViral",
      "displayName": "Lip-syncs y Bailes con Éxitos de Música Regional",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#TacosDeCanastaChallenge",
      "displayName": "El Reto de Comer Tacos de Canasta con Salsa Verde",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#StorytimeGodinCDMX",
      "displayName": "Anécdotas Cómicas de Oficina y Transporte en Metro",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#PesoPlumaTrend",
      "displayName": "El Pasito Prohibido y Remate de Trompetas",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#LaCasaDeLosFamososClips",
      "displayName": "Las Nominaciones Más Candentes y Peleas en Vivo",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#MaquillajeMexa",
      "displayName": "Tutoriales Rápidos con Delineado Tridimensional",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#HumorMexicanoPOV",
      "displayName": "Cuando Tu Mamá Te Manda a la Tienda por las Tortillas",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#GansitoPreparadoHack",
      "displayName": "Postres Callejeros Preparados con Crema y Fresas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ChecoPerezRadioMemes",
      "displayName": "Audios de Radio del Pit Wall y Humor Automovilístico",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    }
  ],
  "mx-instagram": [
    {
      "name": "#CDMXAesthetic",
      "displayName": "Fotografía de Fachadas Art Déco en Roma y Condesa",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#OaxacaEnFotos",
      "displayName": "Colores de Teotitlán del Valle, Textiles y Mezcales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaMexicanaLujo",
      "displayName": "Diseñadores Contemporáneos y Moda Sostenible",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#CafesDeEspecialidadRoma",
      "displayName": "Reels de Filtrados Geisha y Patios de Café",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PlayasDeSayulitaVibes",
      "displayName": "Atardeceres Dorados, Tablas de Surf y Palapas Bohemias",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ArteModernoTamayo",
      "displayName": "Exposiciones de Escultura y Galerías de San Miguel",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#BrunchAestheticPolanco",
      "displayName": "Desayunos Gourmet con Mimosas y Pan Artesanal",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#SkincareMexicanoGlow",
      "displayName": "Rutinas con Nopal, Tepezcohuite y Ácido Hialurónico",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#RutaMezcaleraArtesanal",
      "displayName": "Historias de Maestros Mezcaleros y Agaves Silvestres",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MinimalismoMexicano",
      "displayName": "Diseño de Interiores con Barro Negro y Maderas Nobles",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "mx-facebook": [
    {
      "name": "#DebateLigaMX",
      "displayName": "Polémicas Arbitrales del Clásico Nacional y Liguilla",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VecinosAlertaCDMX",
      "displayName": "Grupos de Seguridad Vecinal y Reporte Vial",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDeMexicoAyer",
      "displayName": "Fotografías del Zócalo y Tranvías en 1950",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MercadoLibreYMarketplaceMX",
      "displayName": "Ofertas de Compra y Venta Segura en Grupos Locales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#TraficoYClimaEnVivo",
      "displayName": "Reporte de Encharcamientos y Alternativas Viales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#RecetasDeLaAbuelaMexicana",
      "displayName": "Pozole Rojo, Mole Poblano y Tamales Tradicionales",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#QuejasDelTransportePublico",
      "displayName": "Retrasos en el Metro y Debate sobre Modernización",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#OrgulloMexicanoHistoria",
      "displayName": "Monumentos Históricos y Efemérides Patrias",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#MemesDeTiasYFamilia",
      "displayName": "Humor Familiar de Bendiciones y Buenos Días",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#OfertasYTianguis",
      "displayName": "Ubicación de Tianguis de Ropa de Paca y Antigüedades",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "es-all": [
    {
      "name": "#ElClasico",
      "displayName": "Real Madrid vs FC Barcelona",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#LaVeladaDelAno",
      "displayName": "La Velada del Año de Ibai Llanos",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#KingsLeague",
      "displayName": "Jornadas de la Kings League InfoJobs",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#AlquilerEspana",
      "displayName": "Precios de Vivienda y Alquileres Jóvenes",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RosaliaNuevoTema",
      "displayName": "Lanzamiento y Estética de Rosalía",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#RutaDelTapeo",
      "displayName": "Pintxos en Donostia y Tapas en Granada",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#Formula1Madrid",
      "displayName": "Gran Premio de Madrid y Circuito Urbano",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#FinanzasJovenesES",
      "displayName": "Inversión en Fondos Indexados y Autónomos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#ViviendaEnEspana",
      "displayName": "Debate sobre Acceso a Primera Vivienda",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#FestivalesVeranoES",
      "displayName": "Carteles del Primavera Sound y Mad Cool",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    }
  ],
  "es-tiktok": [
    {
      "name": "#TrendChuleria",
      "displayName": "El Trend Chulería con Bailes en Plazas de Madrid",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#HumorEspanolPOV",
      "displayName": "Cuando Viene Tu Abuela del Pueblo con Comida para 3 Meses",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#IbaiClipsVirales",
      "displayName": "Momentazos y Reacciones de Ibai con Invitados",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#TapaChallengeEspana",
      "displayName": "Probar Todas las Tapas Gratis de un Bar Granadino",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#VlogMadridVsBarcelona",
      "displayName": "Choque Cultural Amistoso y Rutas de Ocio",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SonidoFlamencoTrap",
      "displayName": "Fusiones Urbanas con Guitarras Españolas",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#PadelTrickshots",
      "displayName": "Remates por Tres y Salidas de Pista Virales",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#StorytimeErasmus",
      "displayName": "Historias Surrealistas de Estudiantes en España",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaZaraHacks",
      "displayName": "Clones Asequibles de Pasarela y Códigos de Descuento",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#ParrilladaDeAmigos",
      "displayName": "Barbacoas de Domingo con Paella y Risas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    }
  ],
  "es-instagram": [
    {
      "name": "#MadridAesthetic",
      "displayName": "Atardeceres en el Templo de Debod y Azoteas de Gran Vía",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CostaBravaSunset",
      "displayName": "Aguas Turquesas en Calas Escondidas de Girona",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#RooftopsDeSevilla",
      "displayName": "Vistas a la Giralda con Naranjos y Cócteles al Atardecer",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaEspanolaStudio",
      "displayName": "Lino Gallego, Zapatos Artesanales y Alta Sastrería",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#RestaurantesConEstrella",
      "displayName": "Emplatados Vanguardistas de la Guía Michelin",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ArquitecturaGaudiana",
      "displayName": "Mosaicos y Formas Orgánicas en el Modernismo Catalán",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#IbizaBohoStyle",
      "displayName": "Mercadillos Hippies, Vestidos Blancos y Casas Encaladas",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#CafeteriasDeAutor",
      "displayName": "Brunch en Malasaña y Gracia con Café de Finca",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#JoyeriaArtesanalES",
      "displayName": "Piezas en Plata de Ley y Perlas Barrocas del Mediterráneo",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#FotografiaUrbanaBCN",
      "displayName": "Calles del Barrio Gótico bajo la Luz Matutina",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "es-facebook": [
    {
      "name": "#DebateFutbolEspana",
      "displayName": "Polémicas del VAR, Ruedas de Prensa y LaLiga",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VecinosYBarriosDeMadrid",
      "displayName": "Foro Ciudadano sobre Limpieza, Ruidos y Convivencia",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#NostalgiaEspanaEGB",
      "displayName": "Objetos, Golosinas y Series de TV que Marcaron Época",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#NoticiasLocalesEnVivo",
      "displayName": "Seguimiento en Directo de Avisos Meteorológicos y Carreteras",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecetasTradicionalesDeTapas",
      "displayName": "Tortilla de Patatas Jugosa, Croquetas y Gazpacho Casero",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MercadilloSegundaMano",
      "displayName": "Compraventa de Muebles Rústicos y Bicicletas",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#QuejasRenfeYTrenes",
      "displayName": "Averías en Cercanías y Reclamaciones de Pasajeros",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#PensionesYActualidadES",
      "displayName": "Debate sobre Jubilación y Servicios Públicos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#SenderismoEnFamilia",
      "displayName": "Rutas por Picos de Europa, Pirineos y Sierra Nevada",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HistoriaDeNuestrosPueblos",
      "displayName": "Castillos Medievales, Leyendas y Tradiciones Populares",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "ar-all": [
    {
      "name": "#ColapintoF1",
      "displayName": "Franco Colapinto en la Fórmula 1",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#Messi",
      "displayName": "Goles de Leo Messi y La Scaloneta",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#BocaVsRiver",
      "displayName": "Superclásico en La Bombonera",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#Duki",
      "displayName": "Ameri World Tour & Featurings",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#AsadoArgentino",
      "displayName": "Técnicas de Fuego y Costillares",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#InteligenciaArtificial",
      "displayName": "Automatización y Trabajo Remoto en Dólares",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#MateArgentino",
      "displayName": "Yerba Mate Despalada y Curado de Calabaza",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GranHermanoAR",
      "displayName": "Galas de Eliminación y Clips Virales",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#EmprenderEnArgentina",
      "displayName": "Estrategias de Precios y Stock",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#EstiloUrbanoBsAs",
      "displayName": "Moda Oversize y Streetwear en Palermo",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    }
  ],
  "ar-tiktok": [
    {
      "name": "#MateChallenge",
      "displayName": "Armar la Montañita Perfecta sin que se Lave el Mate",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HumorArgentinoPOV",
      "displayName": "El Típico Amigo que Llega Tarde a Todas las Juntadas",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#TrapArgentinoBailes",
      "displayName": "Pasos Virales con los Nuevos Hits del Trap",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#ReaccionesColapinto",
      "displayName": "Gritos y Emoción en Vivo con los Sobrepasos en F1",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#StorytimeBondi",
      "displayName": "Situaciones Insólitas Viajando en Colectivo a las 7 AM",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CumbiaVilleraRemix",
      "displayName": "Audios Virales de Boliche con Bajo Acelerado",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#PiqueAlAsador",
      "displayName": "Tirar la Sal Gruesa y Aplaudir al Asador en TikTok",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MilanesaGiganteChallenge",
      "displayName": "Terminar una Milanesa Napolitana para 4 Personas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#TangoElectronicoTrend",
      "displayName": "Fusión de Acordeón Tradicional con Beats Electrónicos",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#ClipsStreamersAR",
      "displayName": "Mejores Momentos de Directos y Anécdotas de Streamers",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "ar-instagram": [
    {
      "name": "#BuenosAiresAesthetic",
      "displayName": "Cúpulas Francesas en Avenida de Mayo y Calles Adoquinadas",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SanTelmoVintage",
      "displayName": "Antigüedades, Fileteado Porteño y Cafés Notables",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CafesDeEspecialidadPalermo",
      "displayName": "Patios Arbolados con Medialunas Rellenas de Pistacho",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PatagoniaEnFotos",
      "displayName": "Glaciares Celestes y Montañas de El Chaltén al Amanecer",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaOversizeArg",
      "displayName": "Sacos Vintage, Jeans Anchos y Zapatillas de Skate",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#BodegasDeMendoza",
      "displayName": "Copas de Malbec con la Cordillera Nevada de Fondo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#VistasDePuertoMadero",
      "displayName": "Rascacielos Reflejados en los Diques al Caer la Noche",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CataDeVinosMalbec",
      "displayName": "Maridaje con Quesos Madurados y Carnes Estacionadas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#DisenoDeInterioresBsAs",
      "displayName": "Pisos de Pinotea, Cemento Alisado y Plantas Grandes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#AtardecerEnBariloche",
      "displayName": "El Lago Nahuel Huapi con Bosques de Arrayanes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "ar-facebook": [
    {
      "name": "#DebateSuperclasico",
      "displayName": "Polémicas del Partido, Cambios del DT y Folclore Futbolero",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#ComunidadVecinosGBA",
      "displayName": "Alertas Ciudadanas, Seguridad y Arreglos en el Barrio",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDeLaInfanciaAR",
      "displayName": "Figuritas, Juguetes y Golosinas de los Años 80 y 90",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ClubDelAsadoCriollo",
      "displayName": "Técnicas de Fuego con Quebracho y Salmuera Secreta",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CompraVentaAutosMarketplace",
      "displayName": "Ofertas de Vehículos Usados y Consejos Mecánicos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#NoticiasEnDirectoAR",
      "displayName": "Tránsito en Accesos a Capital y Estado de Trenes",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#PreciosYEconomiaFamiliar",
      "displayName": "Consejos para Estirar el Sueldo y Ofertas en Mayoristas",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#QuejasDelSubteYTrenes",
      "displayName": "Frecuencias, Molinetes y Reclamos de Pasajeros",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#HistoriasDelBarrio",
      "displayName": "Personajes Pintorescos de Cada Esquina y Solidaridad",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SolidaridadComunitariaAR",
      "displayName": "Donaciones para Comedores Infantiles y Refugios",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "co-all": [
    {
      "name": "#SeleccionColombia",
      "displayName": "La Fiebre Amarilla y Goles en Eliminatorias",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#CafeDelEjeCafetero",
      "displayName": "Fincas Tradicionales y Variedades Castillo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ShakiraYKarolG",
      "displayName": "Éxitos Globales y Colaboraciones Latinas",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#MedellinTransformacion",
      "displayName": "Innovación Urbana en la Comuna 13",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#BandejaPaisaTradicional",
      "displayName": "Frijoles con Chicharrón de 100 Patas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CumbiaYVallenato",
      "displayName": "Acordeones y Caja en el Festival de Valledupar",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#BiodiversidadColombiana",
      "displayName": "Aves Únicas y Parques Naturales Protegidos",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#StartupsBogota",
      "displayName": "Hub de Tecnología y Emprendimientos Digitales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#SanAndresIslas",
      "displayName": "El Mar de los Siete Colores y Cayo Bolívar",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FeriaDeLasFlores",
      "displayName": "Desfile de Silleteros en Santa Elena",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "co-tiktok": [
    {
      "name": "#CumbiaChallenge",
      "displayName": "Pasos Rápidos de Cumbia con Falda Amplia",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#HumorColombianoPOV",
      "displayName": "La Típica Mamá Colombiana cuando Visitas Familia",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#PaisaStorytime",
      "displayName": "Anécdotas Contadas con Acento Paisa Exagerado",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#KarolGCoreografia",
      "displayName": "El Paso de Baile Más Replicado en Fiestas",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#ArepaConQuesoTrend",
      "displayName": "El Queso Derretido Elástico que se Estira al Máximo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ChicharronCrocanteASMR",
      "displayName": "Sonido Crujiente del Chicharrón al Primer Bocado",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#BailesDeSalsaCali",
      "displayName": "Movimientos de Pies a Velocidad Imposible",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VallenatoRemix",
      "displayName": "Clásicos del Vallenato con Ritmo Electrónico",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#RutaDePueblitosAntioquia",
      "displayName": "Jardín y Guatapé en Escapadas de Fin de Semana",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#VibraColombiana",
      "displayName": "La Alegría y Calidez de la Gente en las Calles",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "co-instagram": [
    {
      "name": "#CartagenaAesthetic",
      "displayName": "Balcones con Buganvilias y Murallas de Piedra",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CafesDeEspecialidadMedellin",
      "displayName": "Terrazas Rodeadas de Naturaleza en El Poblado",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#GuatapeEnColores",
      "displayName": "Zócalos Tallados a Mano y la Piedra del Peñol",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaColombianaLujo",
      "displayName": "Diseños Tropicales y Alta Costura en Pasarelas",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#AtardecerEnTayrona",
      "displayName": "Playas Vírgenes Rodeadas de Selva Tropical",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ArquitecturaColonialBogota",
      "displayName": "Casonas Históricas de La Candelaria con Lluvia Suave",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#BrunchPoblado",
      "displayName": "Desayunos Saludables con Frutas Exóticas Colombianas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#FloraTropicalColombia",
      "displayName": "Orquídeas y Palmas de Cera del Valle de Cocora",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#BaricharaPuebloLindo",
      "displayName": "Tierra Amarilla y Casas de Tapia Pisada Impecables",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#DisenoArtesanalWayuu",
      "displayName": "Mochilas Tejidas a Mano con Diseños Ancestrales",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    }
  ],
  "co-facebook": [
    {
      "name": "#DebateFutbolColombiano",
      "displayName": "Liga BetPlay, Directores Técnicos y Convocatorias",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VecinosBogotaAlerta",
      "displayName": "Comunidad de Barrios, Movilidad y Seguridad Local",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDeColombiaDeAyer",
      "displayName": "Fotografías del Tranvía y la Bogotá de 1940",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MercadoCampesinoMayorista",
      "displayName": "Precios en Corabastos y Apoyo a Productores del Campo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#NoticiasEnVivoColombia",
      "displayName": "Seguimiento en Vivo del Clima y Carreteras Nacionales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecetasTradicionalesDeSancocho",
      "displayName": "Sancocho Trifásico en Leña para Toda la Familia",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#QuejasDelTransmilenio",
      "displayName": "Rutas, Transbordos y Debate de Infraestructura",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#HistoriasDeMiTierra",
      "displayName": "Cuentos, Leyendas y Orgullo de Cada Región",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CompraVentaLocalMarketplace",
      "displayName": "Comercio de Barrio y Emprendimientos Familiares",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#SolidaridadColombiana",
      "displayName": "Campañas de Donación y Apoyo en Zonas Rurales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "cl-all": [
    {
      "name": "#DesiertoDeAtacamaFlorido",
      "displayName": "El Fenómeno Único del Desierto Florido",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ColoColoVsUDeChile",
      "displayName": "El Superclásico del Fútbol Chileno",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#PedroPascalTendencia",
      "displayName": "Nuevas Series y el Carisma Chileno en Hollywood",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CompletoItalianoTradicional",
      "displayName": "Palta, Tomate y Mayo Casera en Pan Lengua",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MarraquetaCrujiente",
      "displayName": "El Pan Tradicional Chileno Recién Horneado",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MusicaUrbanaChilena",
      "displayName": "Artistas Chilenos Liderando las Listas de Streaming",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#TorresDelPaineAventura",
      "displayName": "Circuitos de Trekking en la Patagonia Austral",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#InnovacionYLitio",
      "displayName": "Tecnología de Baterías y Energías Renovables",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#CordilleraDeLosAndes",
      "displayName": "Centros de Esquí y Vistas Nevadas desde Santiago",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#FiestasPatriasChilenas",
      "displayName": "Fondas, Cueca, Empanadas de Pino y Terremoto",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "cl-tiktok": [
    {
      "name": "#HumorChilenoPOV",
      "displayName": "Situaciones Típicas con Modismos Chilenos en TikTok",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CompletoItalianoChallenge",
      "displayName": "Reto de Comer un Completo Gigante sin que Caiga la Palta",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MusicaUrbanaChileTrend",
      "displayName": "Bailes Virales con los Nuevos Hits del Género Urbano",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#ChilenismosExplicados",
      "displayName": "Explicando Palabras Chilenas a Extranjeros",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#PiscoSourChallenge",
      "displayName": "Preparación del Pisco Sour Casero Bien Espumoso",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CuecaChilenaModerna",
      "displayName": "Zapateos de Cueca Brava con Estilo Juvenil",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#StorytimeSantiago",
      "displayName": "Anécdotas en el Metro en Hora Punta",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#DobleMarraquetaASMR",
      "displayName": "El Sonido Crujiente al Partir la Marraqueta con la Mano",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ValparaisoEscaleras",
      "displayName": "Bajando las Escaleras y Callejones de los Cerros en Video",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PailitaYPolimaBailes",
      "displayName": "Coreografías de Concierto en Estadios",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    }
  ],
  "cl-instagram": [
    {
      "name": "#SantiagoAesthetic",
      "displayName": "Rascacielos con la Cordillera Nevada al Atardecer",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#AtacamaStargazing",
      "displayName": "Astroturismo y la Vía Láctea sobre los Volcanes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ValparaisoColores",
      "displayName": "Murales de Arte Callejero y Funiculares Patrimoniales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#VinosChilenosColchagua",
      "displayName": "Copas de Carménère en Bodegas de Arquitectura Moderna",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PatagoniaChilenaMagica",
      "displayName": "Fiordos, Glaciares y Aguas Color Turquesa Esmeralda",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CafesDeBarrioItalia",
      "displayName": "Casonas Antiguas Convertidas en Cafeterías de Diseño",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ArquitecturaCostanera",
      "displayName": "Reflejos de Cristal en el Mirador Más Alto de Sudamérica",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PlayaDePichilemuSurf",
      "displayName": "Olas Gigantes en Punta de Lobos con Luz Dorada",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#ModaUrbanaChile",
      "displayName": "Ropa de Abrigo Sostenible, Lanas del Sur y Capas",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#AtardecerEnElPlomo",
      "displayName": "Cumbres Andinas Teñidas de Rojo al Final del Día",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "cl-facebook": [
    {
      "name": "#DebateSuperclasicoChileno",
      "displayName": "Polémicas Arbitrales, Fichajes y Clásicos del Fútbol",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VecinosComunalesSantiago",
      "displayName": "Comunidad Vecinal, Alumbrado y Obras Públicas",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDeChileDeAyer",
      "displayName": "Fotos Antiguas del Santiago en Blanco y Negro",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FeriaLibreYPrecios",
      "displayName": "Frutas, Verduras y Pescado Fresco del Fin de Semana",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#NoticiasEnVivoChile",
      "displayName": "Reporte de Emergencias, Clima y Rutas del País",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecetasDeCazuelaYEmpanadas",
      "displayName": "Platos Típicos para el Invierno con Caldo Hirviendo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#QuejasDelMetroYMicros",
      "displayName": "Frecuencias del Transporte Público y Convivencia",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#HistoriasDelBarrioChileno",
      "displayName": "Tradiciones de las Antiguas Poblaciones y Vecindades",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MercadoChilenoMarketplace",
      "displayName": "Compra y Venta Directa entre Particulares",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#ComunidadSolidariaCL",
      "displayName": "Campañas de Solidaridad para Familias Vulnerables",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "pe-all": [
    {
      "name": "#MachuPicchuMaravilla",
      "displayName": "La Ciudadela Inca y el Misterio de los Andes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CevicheYCausaLimena",
      "displayName": "Platos Insignia de la Gastronomía Peruana",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#SeleccionPeruana",
      "displayName": "La Blanquirroja en el Estadio Nacional",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#DanzaDeTijerasTradicion",
      "displayName": "Acrobacias Ancestrales de los Andes Peruanos",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#FusionNikkeiGourmet",
      "displayName": "Tiraditos y Nigiris de Cocina Peruano Japonesa",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ValleSagradoIncas",
      "displayName": "Ollantaytambo, Maras y Andenes Agrícolas",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MisturaCulinaria",
      "displayName": "El Gran Encuentro de Sabores de Todas las Regiones",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#EmprendedoresDeGamarra",
      "displayName": "El Emporio Textil Más Grande de Sudamérica",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#AmazoniaPeruanaIquitos",
      "displayName": "Navegación por el Río Amazonas y Biodiversidad",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PiscoPeruano",
      "displayName": "Pisco Quebranta Artesanal y Chilcanos Refrescantes",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    }
  ],
  "pe-tiktok": [
    {
      "name": "#CevicheChallenge",
      "displayName": "Preparar Ceviche Carretillero en 60 Segundos",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#HumorPeruanoPOV",
      "displayName": "Cuando tu Mamá Te Manda a Comprar Pan a las 7 AM",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#DanzaDeTijerasViral",
      "displayName": "Saltos y Acrobacias Imposibles con Tijeras en TikTok",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CumbiaPeruanaTrend",
      "displayName": "Bailes Virales con Éxitos de Grupo 5 y Armonía 10",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#PiscoSourTutorial",
      "displayName": "La Fórmula 3-1-1 para que Quede Perfecto",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#StorytimeLima",
      "displayName": "Experiencias Curiosas Viajando en las Combis Limeñas",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#ChifaFusionChallenge",
      "displayName": "Arroz Chaufa al Wok a Fuego Máximo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#HuaynoRemixTikTok",
      "displayName": "Zapateos Modernos al Ritmo de Arpa y Sintetizadores",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#ComidaCallejeraPeru",
      "displayName": "Anticuchos con Rachi y Picarones Recién Fritos",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#OrgulloPeruanoViral",
      "displayName": "Reacciones de Extranjeros Probando la Comida Peruana",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "pe-instagram": [
    {
      "name": "#CuscoAesthetic",
      "displayName": "Muros Incas de Piedra Pulida y Balcones Coloniales",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#BarrancoBohemio",
      "displayName": "Casonas Pintorescas, Puente de los Suspiros y Galerías",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GastronomiaPeruanaGourmet",
      "displayName": "Emplatados de Alta Cocina en Central y Maido",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#LagunaHumantayMagica",
      "displayName": "Aguas Turquesas al Pie del Nevado Salkantay",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MirafloresAtardecer",
      "displayName": "El Malecón sobre los Acantilados con Vista al Pacífico",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#TextilesAndinosArte",
      "displayName": "Tejidos con Tintes Naturales y Lana de Alpaca Bebé",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#CafesDeEspecialidadLima",
      "displayName": "Variedades de Cusco y Villa Rica en Tostadurías",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#MontanaDe7Colores",
      "displayName": "Las Líneas Minerales de Vinicunca bajo el Cielo Azul",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ArquitecturaArequipaBlanca",
      "displayName": "Monasterio de Santa Catalina y Piedra de Sillar",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#JoyeriaDePlataPeruana",
      "displayName": "Orfebrería Fina en Plata de Ley con Diseños Ancestrales",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    }
  ],
  "pe-facebook": [
    {
      "name": "#DebateFutbolPeruano",
      "displayName": "Liga 1, Convocatorias a la Selección y VAR",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#VecinosDeLimaSeguridad",
      "displayName": "Comunidad Vecinal, Serenazgo y Reportes Barriales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecuerdosDelPeruAntiguo",
      "displayName": "Fotos Históricas del Jirón de la Unión en 1930",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MercadoCentralYPrecios",
      "displayName": "Precios de Pescado, Mariscos y Tubérculos Andinos",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#NoticiasEnVivoPeru",
      "displayName": "Transmisiones de Último Minuto del Tránsito y Clima",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#RecetasTradicionalesDeAjideGallina",
      "displayName": "Paso a Paso con Ají Amarillo Molido y Pecanas",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#QuejasDelMetropolitano",
      "displayName": "Colas en Estaciones, Frecuencias y Debate de Pasajes",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#FeriaGamarraOfertas",
      "displayName": "Precios de Mayoristas en Ropa de Algodón Pima",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#HistoriasDeNuestrosPueblosPE",
      "displayName": "Leyendas de la Costa, Sierra y Selva de Nuestros Abuelos",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SolidaridadPeruana",
      "displayName": "Ollas Comunes y Campañas de Frío en Zonas Altas",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "br-all": [
    {
      "name": "#CarnavalDoRio",
      "displayName": "Escolas de Samba no Sambódromo da Marquês de Sapucaí",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#FlamengoVsCorinthians",
      "displayName": "O Clássico das Multidões do Futebol Brasileiro",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#BossaNovaEFunk",
      "displayName": "Evolução Musical do Rio de Janeiro para o Mundo",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#PicanhaEChurrasco",
      "displayName": "Cortes Tradicionais no Fogo de Chão",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PraiasDeCopacabana",
      "displayName": "Calçadão de Pedras Portuguesas e Vôlei de Praia",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#AmazoniaEBiodiversidade",
      "displayName": "Preservação da Floresta e Povos Indígenas",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#EmpreendedorismoEPix",
      "displayName": "A Revolução dos Pagamentos Instantâneos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#ModaPraiaBrasil",
      "displayName": "Biquínis, Saídas de Banho e Tendências de Verão",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#CristoRedentorVistas",
      "displayName": "O Pão de Açúcar e a Baía de Guanabara do Alto",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GastronomiaBaiana",
      "displayName": "Acarajé com Dendê, Vatapá e Moqueca de Frutos do Mar",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    }
  ],
  "br-tiktok": [
    {
      "name": "#DancaDoFunkViral",
      "displayName": "Passos Sincronizados com Batidao de Funk Carioca",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#PassinhoChallenge",
      "displayName": "Acrobacias e Movimentos Rápidos de Perna",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#HumorBrasileiroPOV",
      "displayName": "Situações Hilárias do Cotidiano e Família",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#PicanhaNaBrasaASMR",
      "displayName": "Chiado da Carne na Grelha com Sal Grosso",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#StorytimeRio",
      "displayName": "Histórias Engraçadas do Dia a Dia no Transporte",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SertanejoRemix",
      "displayName": "Sucessos do Sertanejo Universitário em Remix",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#CapoeiraAcrobatics",
      "displayName": "Roda de Capoeira com Saltos Mortais na Praia",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#CaipirinhaTutorial",
      "displayName": "O Segredo do Limão Macerado com Cachaça Artesanal",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PraiaDoIpanemaVibes",
      "displayName": "Altinha na Areia e Aplauso ao Pôr do Sol",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#TrendsDoTiktokBrasil",
      "displayName": "Os Desafios Mais Engraçados da Semana",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "br-instagram": [
    {
      "name": "#RioDeJaneiroAesthetic",
      "displayName": "Mirantes da Vista Chinesa e Floresta da Tijuca",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SaoPauloStreetStyle",
      "displayName": "Grafites do Beco do Batman e Avenida Paulista",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PraiasDeBahia",
      "displayName": "Piscinas Naturais em Trancoso e Morro de São Paulo",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#ModaPraiaBrasil",
      "displayName": "Linhas Orgânicas, Estampas Tropicais e Palha",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#CafesDeEspecialidadeSP",
      "displayName": "Grãos de Minas Gerais em Cafés de Pinheiros",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ArquitecturaOscarNiemeyer",
      "displayName": "Curvas Concretas em Brasília e no MAM Rio",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FernandoDeNoronhaParadiso",
      "displayName": "Mergulho com Tartarugas na Baía do Sancho",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GastronomiaBrasileiraContemporanea",
      "displayName": "Ingredientes Amazônicos em Pratos de Alta Gastronomia",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#PoDoSolNoArpoador",
      "displayName": "A Luz Dourada Beijando o Morro Dois Irmãos",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#BossaNovaVibes",
      "displayName": "Som Suave de Violão em Dias Ensolarados",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    }
  ],
  "br-facebook": [
    {
      "name": "#DebateFutebolBrasileirao",
      "displayName": "Polêmicas da Rodada, Arbitragem e Escalações",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#ComunidadeVizinhosSP",
      "displayName": "Segurança no Bairro, Obras e Notícias Locais",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#LembrancasDoBrasilDeOntem",
      "displayName": "Fotos Antigas das Cidades Brasileiras nos Anos 60",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FeiraLivreEPrecos",
      "displayName": "Preço da Fruta Fresca, Pastel e Caldo de Cana",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#NoticiasAoVivoBrasil",
      "displayName": "Cobertura em Tempo Real do Trânsito e Previsão do Tempo",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#ReceitasTradicionaisDeFeijoada",
      "displayName": "Dicas para a Feijoada Completa de Sábado em Família",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#TransportePublicoDebate",
      "displayName": "Debates sobre Linhas de Ônibus e Metrô",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#FeiraDoBrazeCompras",
      "displayName": "Dicas de Roupas Baratas para Revenda e Negócios",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#HistoriasDoNossoBairro",
      "displayName": "Homenagem aos Moradores Históricos da Região",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#SolidariedadeBrasileira",
      "displayName": "Campanhas de Arrecadação de Alimentos e Apoio Social",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    }
  ],
  "us-all": [
    {
      "name": "#CaitlinClark",
      "displayName": "Caitlin Clark & WNBA Fever Phenomenon",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#AIRevolution",
      "displayName": "Next-Gen AI Agents & Autonomous Coding",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#BratSummer",
      "displayName": "Pop Culture & Aesthetic Trend",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SuperBowlHalftime",
      "displayName": "NFL Halftime Show Headliner Buzz",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#MatchaLatteArt",
      "displayName": "Ceremonial Matcha & Morning Rituals",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CleanGirlAesthetic",
      "displayName": "Dewy Skin & Minimalist Capsule Wardrobe",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#SaaSGrowthHacks",
      "displayName": "Bootstrapping to $100k MRR with Micro-SaaS",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#SoloTravelJapan",
      "displayName": "Shinkansen & Hidden Tokyo Izakayas",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HydrationStation",
      "displayName": "Stanley Tumbler Accessories & Water Recipes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HYROXFitness",
      "displayName": "Functional Fitness Racing Trend",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    }
  ],
  "us-tiktok": [
    {
      "name": "#TubeGirlTrend",
      "displayName": "Confidence in Transit & Wide Angle Spins",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CapCutViralAudio",
      "displayName": "Fast Beat Sync Edits with Millions of Uses",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#POVWorkplaceComedy",
      "displayName": "Corporate Zoom Calls and Corporate Lingo Skits",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#TargetHaulChallenge",
      "displayName": "Finding Secret Clearance Deals in Aisles",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FastFoodSecrets",
      "displayName": "Hidden Menu Items and Sauce Combinations",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#GymTokMotivation",
      "displayName": "Heavy Squats and Incredible Comeback Stories",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#ASMRPackagingOrders",
      "displayName": "Small Business Packing Orders with Crinkle Paper",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#DanceTrendUS",
      "displayName": "15-Second Choreographies Dominating the FYP",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#TechGadgetReview",
      "displayName": "Smart Ring Sleep Trackers & Transparent Screens",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#StreetInterviewFunny",
      "displayName": "Trivia on New York City Streets with Cash Prizes",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "us-instagram": [
    {
      "name": "#NYCStreetStyle",
      "displayName": "SoHo Sidewalk Looks, Leather Trench Coats & Boots",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#MinimalistDeskSetup",
      "displayName": "Walnut Wood Riser, Mechanical Keyboard & Warm Light",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#GoldenHourInSoHo",
      "displayName": "Cast Iron Architecture Bathed in Golden Sunset Rays",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#MatchaCeremonialGlow",
      "displayName": "Japanese Bamboo Whisk and Vanilla Cloud Foam",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#ArchitecturalDigestTours",
      "displayName": "Inside Celebrity Mid-Century Modern Homes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#EditorialFashionReels",
      "displayName": "Cinematic 35mm Film Transitions & Runway Looks",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#SpecialtyCoffeeRoasters",
      "displayName": "Pour-Over V60 and Single-Origin Ethiopian Beans",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#QuietLuxuryWardrobe",
      "displayName": "Cashmere Sweaters, Tailored Trousers & Loafers",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#PacificCoastHighwaySunset",
      "displayName": "Big Sur Cliffs and Ocean Spray at Golden Hour",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FineDiningAesthetic",
      "displayName": "Michelin Star Truffle Pasta and Artistic Plating",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    }
  ],
  "us-facebook": [
    {
      "name": "#LocalCommunityWatch",
      "displayName": "Neighborhood Safety Updates and Town Hall News",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#SmallBusinessSupportGroup",
      "displayName": "Local Artisans, Bakers and Farmers Market Vendors",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#ClassicCarsAndRestorations",
      "displayName": "1960s Muscle Cars Restored from Scratch",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HighSchoolSportsDebate",
      "displayName": "Friday Night Lights Football and Regional Playoffs",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#NeighborhoodGarageSales",
      "displayName": "Weekend Treasure Hunting and Vintage Finds",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#GrandmasSecretRecipes",
      "displayName": "Southern Biscuits, Peach Cobbler and Smoked Brisket",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#Nostalgia50s60s70s",
      "displayName": "Drive-In Theaters, Vinyl Records and Old Main Streets",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#HomeImprovementIdeas",
      "displayName": "Backyard Patio Builds and DIY Woodworking Projects",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CivicTownHallDebate",
      "displayName": "Public Transit Proposals and School District Discussions",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#MarketplaceBargains",
      "displayName": "Local Furniture and Appliance Deals in the Area",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    }
  ],
  "global-all": [
    {
      "name": "#GlobalTechSummit",
      "displayName": "Cumbre Global de Innovación y Modelos de IA",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#WorldTourConcerts",
      "displayName": "Giras Mundiales de Estadios y Festivales",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#OlympicsMoments",
      "displayName": "Momentos Históricos y Récords Mundiales",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#MinimalistLiving",
      "displayName": "Hogares Minimalistas y Hábitos Conscientes",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#StreetFoodWorldTour",
      "displayName": "Rutas Gastronómicas Callejeras del Mundo",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#CleanBeautyRoutine",
      "displayName": "Skincare Natural y Maquillaje Glowy",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#RemoteWorkProductivity",
      "displayName": "Trabajo Remoto y Herramientas Digitales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#CinemaMasterpieces",
      "displayName": "Nuevos Estrenos y Análisis Cinematográfico",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#SpaceExplorationX",
      "displayName": "Misiones Espaciales y Fotografías de Galaxias",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#MarathonTrainingClub",
      "displayName": "Comunidad de Running y Carreras de Fondo",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    }
  ],
  "global-tiktok": [
    {
      "name": "#TubeGirlEffect",
      "displayName": "Confianza y Grabaciones Dinámicas en Tránsito",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#CapCutTemplateViral",
      "displayName": "Plantillas de Sincronización Automática con Música",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#POVStorytime",
      "displayName": "Storytimes de Humor y Situaciones Cotidianas",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#FoodTokHack",
      "displayName": "Hacks de Cocina Rápida en Sartén o Airfryer",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#DanceChallenge2026",
      "displayName": "Coreografía Viral de 15 Segundos en Tendencia",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#AIPromptMagic",
      "displayName": "Trucos de Prompts de IA para Trabajos y Tareas",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#GRWMForTonight",
      "displayName": "Get Ready With Me con Anécdotas Íntimas",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#BookTokPicks",
      "displayName": "Libros Que Te Hacen Llorar en el Capítulo Final",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    },
    {
      "name": "#GymTokPRs",
      "displayName": "Récords Personales en Levantamiento y Motivación",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#SideHustleHacks",
      "displayName": "Monetización y Negocios Digitales Rápidos",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    }
  ],
  "global-instagram": [
    {
      "name": "#MinimalistAesthetic",
      "displayName": "Diseño de Interiores, Paletas Neutras y Luz Solar",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PhotoDumpSunday",
      "displayName": "Carruseles Espontáneos de Fin de Semana",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#QuietLuxuryStyle",
      "displayName": "Elegancia Silenciosa y Telas Nobles",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#SpecialtyCoffeeReels",
      "displayName": "Extracciones de Espresso y Latte Art de Cisne",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#WanderlustTravelMoments",
      "displayName": "Tomas Aéreas de Calas Secretas y Acantilados",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#CleanGirlSkincareGlow",
      "displayName": "Piel Jugosa de Cristal y Rutina Hidratante",
      "topic": "fashion",
      "topicLabel": "Moda & Belleza"
    },
    {
      "name": "#ArchitecturalSpaces",
      "displayName": "Líneas Geométricas, Hormigón Visto y Cristal",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#DeskSetupInspo",
      "displayName": "Espacios de Trabajo Productivos y Minimalistas",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#FineDiningPlating",
      "displayName": "Presentación de Alta Cocina y Texturas Gourmet",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#GoldenHourPortraits",
      "displayName": "Fotografía con Luz Dorada Natural al Atardecer",
      "topic": "entertainment",
      "topicLabel": "Entretenimiento & Viral"
    }
  ],
  "global-facebook": [
    {
      "name": "#GlobalCommunityDebate",
      "displayName": "Debate Ciudadano: El Impacto de la IA en el Empleo",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#ClassicRockNostalgia",
      "displayName": "Recuerdos de Bandas Legendarias de los 70s y 80s",
      "topic": "music",
      "topicLabel": "Música & Sonidos"
    },
    {
      "name": "#VintagePhotosOfThePast",
      "displayName": "Fotografías Históricas Restauradas en Alta Definición",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#HomeImprovementDIYGroup",
      "displayName": "Trucos Caseros de Carpintería y Restauración",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#FamilyRecipesExchange",
      "displayName": "El Cuaderno Secreto de Recetas Caseras de la Abuela",
      "topic": "food",
      "topicLabel": "Gastronomía & Foodies"
    },
    {
      "name": "#SportsDebateLive",
      "displayName": "Análisis Pospartido y Polémicas Arbitrales",
      "topic": "sports",
      "topicLabel": "Deportes & Fitness"
    },
    {
      "name": "#SeniorTechSupportTips",
      "displayName": "Consejos Sencillos para Protegerse de Fraudes",
      "topic": "tech",
      "topicLabel": "Tecnología & IA"
    },
    {
      "name": "#GardeningTipsAndCuttings",
      "displayName": "Cultivo de Tomates en Maceta y Esquejes Fáciles",
      "topic": "lifestyle",
      "topicLabel": "Viajes & Lifestyle"
    },
    {
      "name": "#PublicServicesWatch",
      "displayName": "Alertas Ciudadanas de Tránsito y Obras Comunales",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    },
    {
      "name": "#LocalMarketplaceDeals",
      "displayName": "Compra y Venta Directa en la Comunidad",
      "topic": "business",
      "topicLabel": "Negocios & Finanzas"
    }
  ]
};

export const TOPIC_TEMPLATES: Record<string, Record<string, Array<{ name: string; displayName: string; angle: string }>>> = {
  "entertainment": {
    "tiktok": [
      {
        "name": "#MemeViralDelDia",
        "displayName": "El Meme que Inundó TikTok Hoy con Remate Inesperado",
        "angle": "Crea tu versión del meme con gancho de 3 segundos y audio viral."
      },
      {
        "name": "#CapCutComedyEdit",
        "displayName": "Ediciones Rápidas de Humor con Plantilla CapCut",
        "angle": "Sincroniza la risa o remate con el efecto de cámara rápida."
      },
      {
        "name": "#POVStorytimeViral",
        "displayName": "Storytimes Dramáticos con Final Surrealista",
        "angle": "Usa texto en pantalla grande con la pregunta que despierta curiosidad."
      },
      {
        "name": "#FandomEnLlamas",
        "displayName": "Teorías de Fans y Easter Eggs de Series",
        "angle": "Muestra los 3 detalles ocultos que casi nadie notó en el tráiler."
      },
      {
        "name": "#ComediaStandUpClip",
        "displayName": "Micro-clips de Monólogos sobre la Vida Adulta",
        "angle": "Recorte de 20 segundos con el mejor chiste y subtítulos dinámicos."
      },
      {
        "name": "#DetrasDeCamarasBloopers",
        "displayName": "Errores de Grabación y Risas Incontrolables",
        "angle": "Comparte la toma fallida antes del resultado perfecto."
      },
      {
        "name": "#RealityShowMomentazos",
        "displayName": "La Eliminación Más Polémica y Reacciones en Vivo",
        "angle": "Graba tu reacción en pantalla dividida al ver la votación."
      },
      {
        "name": "#EntrevistasCallejeras",
        "displayName": "Preguntas Rápidas en la Calle con Premios",
        "angle": "Haz preguntas absurdas a peatones con ritmo ágil de edición."
      },
      {
        "name": "#CineEn30Segundos",
        "displayName": "Recomendación de Joya Oculta de Streaming",
        "angle": "Sinopsis electrizante que convence de verla hoy mismo."
      },
      {
        "name": "#CelebrityGossipShorts",
        "displayName": "La Noticia del Espectáculo que Nadie Esperaba",
        "angle": "Línea de tiempo cronológica con fotos y opinión reflexiva."
      }
    ],
    "instagram": [
      {
        "name": "#CineAestheticReels",
        "displayName": "Planos Cinemáticos de Películas de Culto y Colorimetría",
        "angle": "Reel con paleta de colores y frases memorables."
      },
      {
        "name": "#AlfombraRojaGala",
        "displayName": "Mejores Vestidos, Joyas y Looks de la Noche de Premios",
        "angle": "Carrusel detallando marcas de alta costura y estilismo."
      },
      {
        "name": "#DetrasDeEscenaArtistas",
        "displayName": "Fotografías 35mm en el Camerino y Ensayos Íntimos",
        "angle": "Fotografía analógica en blanco y negro con textura."
      },
      {
        "name": "#CriticaDeCineAutor",
        "displayName": "Análisis Visual de Planos Secuencia y Dirección de Fotografía",
        "angle": "Guía en carrusel con 5 razones por las que esta obra es maestra."
      },
      {
        "name": "#FestivalesDeCine",
        "displayName": "Diario Visual desde Venecia, Cannes y San Sebastián",
        "angle": "Tomas de atardeceres en el festival y entrevistas exclusivas."
      },
      {
        "name": "#DisenoDeProduccion",
        "displayName": "La Arquitectura y Escenografía de tus Series Favoritas",
        "angle": "Desglose arquitectónico de los sets más icónicos."
      },
      {
        "name": "#RetratosDeActores",
        "displayName": "Sesiones Editoriales de Portada con Iluminación Dramática",
        "angle": "Retratos de estudio con luces de neón y mirada penetrante."
      },
      {
        "name": "#GuionistasEnRedes",
        "displayName": "Lecciones de Estructura Narrativa y Creación de Personajes",
        "angle": "Carrusel educativo para creadores y escritores."
      },
      {
        "name": "#BandaSonoraOriginal",
        "displayName": "Piezas Orquestales que Emocionaron al Mundo en Pantalla",
        "angle": "Audio de piano emotivo sincronizado con escenas clave."
      },
      {
        "name": "#EstrenosEnCartelera",
        "displayName": "Guía Visual de Qué Ver este Fin de Semana en Cines",
        "angle": "Reseñas visuales puntuadas con estética cuidada."
      }
    ],
    "facebook": [
      {
        "name": "#DebateCineYSeries",
        "displayName": "Foro de Opinión: ¿El Final de Temporada Estuvo a la Altura?",
        "angle": "Pregunta comunitaria con encuesta de debate sin spoilers."
      },
      {
        "name": "#NostalgiaTelevisionAyer",
        "displayName": "Las Series y Telenovelas que Paralizaban al País en los 80s",
        "angle": "Recordar a los actores legendarios y compartir memorias."
      },
      {
        "name": "#NoticiasDelEspectaculo",
        "displayName": "Trayectoria, Homenajes y Comunicados de Figuras Públicas",
        "angle": "Homenaje a grandes artistas con respeto y biografías."
      },
      {
        "name": "#RecomendacionesFamiliares",
        "displayName": "Películas Clásicas para Ver el Domingo con los Hijos",
        "angle": "Lista comentada con mensajes positivos y valores familiares."
      },
      {
        "name": "#TeatroYComediaLocal",
        "displayName": "Funciones Comunitarias, Obras y Actores de Barrio",
        "angle": "Apoyo a las salas de teatro independientes y cartelera."
      },
      {
        "name": "#BandasDeNuestraVida",
        "displayName": "Conciertos Inolvidables que Vivimos Hace 20 Años",
        "angle": "¿Quién recuerda la entrada a 5 pesos de aquel concierto mítico?"
      },
      {
        "name": "#GrandesActoresHomenaje",
        "displayName": "Escenas Legendarias del Cine Clásico que No Pasan de Moda",
        "angle": "Debate sobre el talento actoral antes del exceso de CGI."
      },
      {
        "name": "#FestivalesTradicionales",
        "displayName": "Fiestas Patronales, Danzas y Comparsas de Nuestras Regiones",
        "angle": "Transmisiones en vivo de las celebraciones populares."
      },
      {
        "name": "#HumorSanoEnFamilia",
        "displayName": "Chistes Blancos y Anécdotas Divertidas para Compartir",
        "angle": "Humor familiar respetuoso para alegrar el día a amigos."
      },
      {
        "name": "#CulturaYMemoriaColectiva",
        "displayName": "Entrevistas a Historiadores Locales y Cronistas Urbanos",
        "angle": "Crónicas ciudadanas sobre la evolución de los cines de barrio."
      }
    ]
  },
  "tech": {
    "tiktok": [
      {
        "name": "#AIPromptHacks10s",
        "displayName": "Prompts Secretos de IA que Hacen tu Tarea en 10 Segundos",
        "angle": "Muestra la pantalla con zoom en el resultado mágico."
      },
      {
        "name": "#GadgetsDelFuturoPOV",
        "displayName": "Probando el Anillo Inteligente que Mide tus Pulsaciones",
        "angle": "Unboxing dinámico mostrando las funciones más futuristas."
      },
      {
        "name": "#ProgramadorHumor",
        "displayName": "Cuando el Código Compila al Primer Intento sin Saber Por Qué",
        "angle": "Sketch humorístico actuando el alivio de un desarrollador."
      },
      {
        "name": "#AppsSecretasGratis",
        "displayName": "3 Aplicaciones Gratuitas que Deberías Descargar Hoy",
        "angle": "Corte rápido mostrando el icono y la función clave de cada una."
      },
      {
        "name": "#CiberseguridadBasica",
        "displayName": "Cómo Saber si Alguien Está Mirando tus Mensajes de WhatsApp",
        "angle": "Tutorial paso a paso en 20 segundos desactivando sesiones activas."
      },
      {
        "name": "#SetupGamerBarato",
        "displayName": "Cómo Transformar tu Escritorio con Luces LED de 5 Dólares",
        "angle": "Antes y después con transición al ritmo del beat drop."
      },
      {
        "name": "#NuevosCelulares2026",
        "displayName": "Test de Caídas y Batería de los Nuevos Teléfonos",
        "angle": "Pruebas extremas de resistencia con humor y datos reales."
      },
      {
        "name": "#ExtensionesParaChrome",
        "displayName": "Extensiones que Resumen Videos de YouTube al Instante",
        "angle": "Demostración de resumen en viñetas en un clic."
      },
      {
        "name": "#AtajosDeTecladoPro",
        "displayName": "Atajos de Windows y Mac que los Profesionales No Te Cuentan",
        "angle": "Manos sobre el teclado con texto en pantalla de cada comando."
      },
      {
        "name": "#RobotsYFuturo",
        "displayName": "Perros Robóticos Haciendo Piruetas y Entregando Paquetes",
        "angle": "Tomas callejeras del robot interactuando con peatones asombrados."
      }
    ],
    "instagram": [
      {
        "name": "#MinimalistWorkspaceDesk",
        "displayName": "Escritorios de Roble, Luz Cálida y Teclados Mecánicos",
        "angle": "Carrusel de setups ultra limpios con enlaces a periféricos."
      },
      {
        "name": "#ArteGenerativoAI",
        "displayName": "Obras Digitales Creadas con Modelos de Difusión y Prompting",
        "angle": "Galería artística con descripción de la paleta y estilo visual."
      },
      {
        "name": "#DisenoUIUXInspo",
        "displayName": "Interfaces Móviles con Microinteracciones y Tipografía Impecable",
        "angle": "Reel mostrando la animación fluida de un botón o checkout."
      },
      {
        "name": "#FotografiaMovilPro",
        "displayName": "Cómo Lograr Fotos Profesionales con tu Smartphone sin Filtros",
        "angle": "Guía de cuadrícula, regla de tercios y ajuste manual de ISO."
      },
      {
        "name": "#StartupsSiliconValley",
        "displayName": "Oficinas de Innovación y Rutinas de Fundadores Tecnológicos",
        "angle": "Vlog estético de un día en la vida de un fundador de software."
      },
      {
        "name": "#AccesoriosTechElegantes",
        "displayName": "Fundas de Cuero Italiano y Soportes de Aluminio Anodizado",
        "angle": "Fotografía editorial de producto con luz cenital suave."
      },
      {
        "name": "#ProductividadConNotion",
        "displayName": "Plantillas Estéticas para Organizar Finanzas y Metas",
        "angle": "Recorrido visual por el dashboard personal interactivo."
      },
      {
        "name": "#AppleVsAndroidCamera",
        "displayName": "Comparativa de Rango Dinámico y Tonos de Piel al Sol",
        "angle": "Imágenes divididas al 50% invitando a elegir en comentarios."
      },
      {
        "name": "#DesarrolloWebModerno",
        "displayName": "Componentes de React y Tailwind con Efecto Glassmorphism",
        "angle": "Reel con música chill mostrando el código y el componente final."
      },
      {
        "name": "#TecnologiaSostenible",
        "displayName": "Dispositivos Modulares Reparables y Plásticos Reciclados",
        "angle": "Desmontaje fácil sin tornillos especiales demostrando durabilidad."
      }
    ],
    "facebook": [
      {
        "name": "#DebateIAYEmpleo",
        "displayName": "Foro Ciudadano: ¿Qué Profesiones Cambiarán con la IA?",
        "angle": "Pregunta de debate sobre reconversión laboral para mayores de 40 años."
      },
      {
        "name": "#AlertaEstafasTelefonicas",
        "displayName": "Consejos Urgentes para No Caer en Fraudes por Mensajes",
        "angle": "Guía clara con capturas de pantalla de estafas comunes para avisar a la familia."
      },
      {
        "name": "#ComunidadInternetYFibra",
        "displayName": "Opiniones sobre Proveedores de Internet, Tarifas y Cortes",
        "angle": "Debate vecinal sobre qué empresa ofrece la señal más estable."
      },
      {
        "name": "#AyudaInformaticaMayor",
        "displayName": "Consejos Fáciles para Usar el Celular y Trámites del Banco",
        "angle": "Paso a paso con letras grandes explicando cómo pedir turnos online."
      },
      {
        "name": "#HistoriaDeLaComputacion",
        "displayName": "Los Primeros Computadores que Llegaron a Nuestras Escuelas",
        "angle": "Fotografías de monitores de tubo y disquetes recordando viejos tiempos."
      },
      {
        "name": "#EmprendimientoTecnologico",
        "displayName": "Cómo Crear una Tienda Online Fácil para Pequeños Comercios",
        "angle": "Consejos prácticos para dueños de tiendas físicas que quieren vender por redes."
      },
      {
        "name": "#SeguridadEnRedesSociales",
        "displayName": "Cómo Evitar que Te Roben tu Cuenta de Facebook o WhatsApp",
        "angle": "Instrucciones de verificación en dos pasos explicadas con sencillez."
      },
      {
        "name": "#ReparacionDeElectrodomesticos",
        "displayName": "Aprender a Limpiar y Reparar Ventiladores y Neveras en Casa",
        "angle": "Tutoriales mecánicos de barrio que ahorran visitas al técnico."
      },
      {
        "name": "#EnergiaSolarParaElHogar",
        "displayName": "Paneles Solares y Ahorro en la Factura de Luz Comunitaria",
        "angle": "Cálculo real de inversión y retorno para casas de familia."
      },
      {
        "name": "#MercadoTecnologicoUsado",
        "displayName": "Compra y Venta de Laptops y Teléfonos Usados en el Barrio",
        "angle": "Consejos para probar la batería y pantalla antes de pagar."
      }
    ]
  },
  "sports": {
    "tiktok": [
      {
        "name": "#SkillsFutbolCalletjero",
        "displayName": "Caños y Regates Imposibles en Canchas de Barrio",
        "angle": "Cámara lenta del regate y festejo eufórico de los amigos."
      },
      {
        "name": "#GymFailsPOV",
        "displayName": "Cuando se Te Cae la Pesa Haciendo Press Banca",
        "angle": "Comedia de gimnasio con la mirada de complicidad del compañero."
      },
      {
        "name": "#BailesDeCelebracionGol",
        "displayName": "Los Festejos de Gol Más Virales de las Ligas Europeas",
        "angle": "Imita el festejo oficial y desafía a tus amigos a hacerlo."
      },
      {
        "name": "#CalisteniaAcrobatica",
        "displayName": "Banderas Humanas y Muscle Ups con una Sola Mano",
        "angle": "Demostración de fuerza pura en barras del parque público."
      },
      {
        "name": "#RetoDelTravesano",
        "displayName": "5 Tiros desde el Córner Buscando el Poste Travesaño",
        "angle": "Competencia de tiro de precisión con remate final."
      },
      {
        "name": "#PadelLoversViral",
        "displayName": "Puntos Infinitos con Salvadas Milagrosas en el Cristal",
        "angle": "Punto de 40 segundos de alta intensidad con aplausos del público."
      },
      {
        "name": "#RunningHumorPOV",
        "displayName": "Diciendo 'Hoy Corro Suave' y Terminando en Sprint Máximo",
        "angle": "Reloj marcando ritmo cardíaco alto con audio cómico de fondo."
      },
      {
        "name": "#BoxeoTrainingShadow",
        "displayName": "Velocidad de Manos y Esquivas Frente al Espejo",
        "angle": "Combinaciones de golpes sincronizados con el golpe de bombo de la música."
      },
      {
        "name": "#F1RadioMemes",
        "displayName": "Audios de Ingenieros y Pilotos Gritando por la Radio",
        "angle": "Sincroniza el audio con situaciones absurdas de la vida diaria."
      },
      {
        "name": "#TransformacionFisica1Ano",
        "displayName": "De Cero a Atleta con Constancia y Alimentación Sana",
        "angle": "Timelapse de fotos mensuales demostrando que la disciplina paga."
      }
    ],
    "instagram": [
      {
        "name": "#FotografiaDeportivaPro",
        "displayName": "El Momento Exacto del Remate con Gotas de Sudor Volando",
        "angle": "Fotografía deportiva a 1/2000s con desenfoque de fondo perfecto."
      },
      {
        "name": "#TunelDeJugadoresModa",
        "displayName": "Los Outfits de los Atletas al Llegar al Estadio",
        "angle": "Carrusel de moda urbana y accesorios de lujo de futbolistas y basquetbolistas."
      },
      {
        "name": "#EsteticaRunningClub",
        "displayName": "Gorras Técnicas, Zapatillas de Competición y Café Post-Run",
        "angle": "Reel aesthetic de la mañana de sábado corriendo en grupo."
      },
      {
        "name": "#AtardecerEnElEstadio",
        "displayName": "El Césped Impecable Iluminado por los Focos bajo el Cielo Violeta",
        "angle": "Tomas cinemáticas de tribunas llenas y bengalas al atardecer."
      },
      {
        "name": "#NutricionParaAtletas",
        "displayName": "Platos Balanceados de Carbohidratos Complejos y Proteínas",
        "angle": "Emplatados coloridos con macros calculados para alto rendimiento."
      },
      {
        "name": "#YogaYMovilidadArticular",
        "displayName": "Posturas de Apertura de Cadera y Flexibilidad al Amanecer",
        "angle": "Movimientos fluidos en esterilla de corcho frente al mar."
      },
      {
        "name": "#CiclismoRutasEpicas",
        "displayName": "Puertos de Montaña con Curvas de Herradura en los Andes y Pirineos",
        "angle": "Fotografía POV desde el manillar con niebla en el horizonte."
      },
      {
        "name": "#HYROXTrainingReels",
        "displayName": "Empuje de Trineo y Balones Medicinales a Ritmo Olímpico",
        "angle": "Edición acompasada con música electrónica oscura motivacional."
      },
      {
        "name": "#TenisYEstiloVintage",
        "displayName": "Polos Blancos, Raquetas Clásicas y Pistas de Tierra Batida",
        "angle": "Estética retro de tenis inspirada en los años 70 y 80."
      },
      {
        "name": "#DeportesExtremosPOV",
        "displayName": "Descenso en Nieve Virgen con Drones de Seguimiento Rápido",
        "angle": "Tomas de dron FPV a centímetros de los esquís en nieve polvo."
      }
    ],
    "facebook": [
      {
        "name": "#DebateFutbolSemanal",
        "displayName": "Polémicas Arbitrales, Decisiones del VAR y Tabla de Posiciones",
        "angle": "Foro de debate con encuesta: ¿Mereció ganar el equipo local?"
      },
      {
        "name": "#NostalgiaFutbolera",
        "displayName": "Las Camisetas Legendarias y Jugadores de Nuestra Juventud",
        "angle": "Fotografías de formaciones históricas recordando anécdotas de cancha."
      },
      {
        "name": "#LigaDeBarrioYVeteranos",
        "displayName": "Campeonatos de Fútbol de Fin de Semana en Nuestras Comunidades",
        "angle": "Fotos de la final de la liga local con premiación y parrillada."
      },
      {
        "name": "#SaludYDeporteSenior",
        "displayName": "Caminatas Diarias y Ejercicios Suaves para Articulaciones",
        "angle": "Consejos médicos respaldados para mantenerse activo después de los 50 años."
      },
      {
        "name": "#HomenajeALosIdolos",
        "displayName": "Biografías y Logros de los Grandes Deportistas Nacionales",
        "angle": "Homenaje con respeto a quienes llevaron la bandera patria a la gloria."
      },
      {
        "name": "#CiclismoUrbanoSeguro",
        "displayName": "Reclamo de Ciclovías Protegidas y Respeto al Ciclista",
        "angle": "Campaña comunitaria para educar a conductores sobre el metro y medio de distancia."
      },
      {
        "name": "#EscuelasDeportivasNinos",
        "displayName": "Inscripciones a Clases de Natación y Fútbol para los Hijos",
        "angle": "Compartir opciones accesibles y becas para niños del barrio."
      },
      {
        "name": "#MundialesHistoricos",
        "displayName": "Dónde Estabas y Cómo Festejaste Aquel Gol Inolvidable",
        "angle": "Pregunta abierta invitando a revivir la emoción colectiva con anécdotas."
      },
      {
        "name": "#SenderismoComunitario",
        "displayName": "Grupos de Caminata por Cerros y Rutas Naturales de la Región",
        "angle": "Puntos de encuentro y consejos de hidratación para senderistas principiantes."
      },
      {
        "name": "#SolidaridadEnElDeporte",
        "displayName": "Rifas y Torneos a Beneficio para Tratamientos Médicos",
        "angle": "El deporte como motor de unión y ayuda entre vecinos ante emergencias."
      }
    ]
  },
  "food": {
    "tiktok": [
      {
        "name": "#FoodHackEn20s",
        "displayName": "El Secreto para que el Queso Quede Dorado y Crujiente",
        "angle": "Sonido ASMR al primer corte con cuchillo caliente."
      },
      {
        "name": "#PostreDe3Ingredientes",
        "displayName": "Tarta de Chocolate Saludable Sin Horno ni Azúcar",
        "angle": "Mezcla rápida en licuadora y desmolde perfecto frente a cámara."
      },
      {
        "name": "#RutaCallejeraExtrema",
        "displayName": "Probando el Puesto de Tacos Más Picante de la Ciudad",
        "angle": "Reacciones sinceras al probar la salsa de habanero tostado."
      },
      {
        "name": "#AirfryerMagia",
        "displayName": "Alitas de Pollo Ultracrujientes en Menos de 15 Minutos",
        "angle": "Paso a paso rápido con condimentos medidos a ojo y agite de canasta."
      },
      {
        "name": "#CafedeEspecialidadHack",
        "displayName": "Espuma Fría de Vainilla Casera con Prensa Francesa",
        "angle": "Bate la leche fría durante 20 segundos y viértela sobre el café."
      },
      {
        "name": "#CenaEn10Minutos",
        "displayName": "Fideos Salteados con Verduras y Salsa de Soja Dulce",
        "angle": "Wok caliente con humo aromático y emplatado rápido para cenar."
      },
      {
        "name": "#PizzaCaseraSinAmasar",
        "displayName": "Masa de Fermentación Lenta en Nevera que Crece Sola",
        "angle": "Burbujas en la masa al estirar y borde inflado en el horno."
      },
      {
        "name": "#SalsaSecretaDeLaCasa",
        "displayName": "La Salsa de Ajo y Cilantro que le Queda Bien a Todo",
        "angle": "Ingredientes en el vaso de la minipimer y emulsión instantánea."
      },
      {
        "name": "#DesayunoGourmetRapido",
        "displayName": "Huevos Revueltos Cremosos con Mantequilla Fría",
        "angle": "Técnica de fuego lento retirando la sartén para lograr textura de terciopelo."
      },
      {
        "name": "#BebidasViralesFrescas",
        "displayName": "Limonada de Coco y Menta Licuada con Mucho Hielo",
        "angle": "Vaso escarchado con sal y rodaja de lima fresca decorando."
      }
    ],
    "instagram": [
      {
        "name": "#EspecialidadLatteArt",
        "displayName": "Extracciones de Café de Origen con Diseños de Cisne",
        "angle": "Reel en primer plano con el vertido de leche creando figuras perfectas."
      },
      {
        "name": "#PanDeMasaMadreArtesano",
        "displayName": "Alveolos Abiertos y Corteza Crujiente Recién Horneada",
        "angle": "Fotografía cenital con harina espolvoreada y cuchillo de pan."
      },
      {
        "name": "#BrunchAestheticEnPatios",
        "displayName": "Tostadas de Masa Madre con Palta, Huevo Poché y Flores",
        "angle": "Paleta de colores pasteles en mesas de mármol con luz matutina."
      },
      {
        "name": "#AltaCocinaEmplatados",
        "displayName": "Puntos de Emulsión y Reducciones en Vajilla de Cerámica",
        "angle": "Composición de revista gourmet con contrastes de texturas y brillos."
      },
      {
        "name": "#TablasDeQuesosYVinos",
        "displayName": "Quesos Madurados, Higos Frescos, Nueces y Tintos de Reserva",
        "angle": "Fotografía de bodegón moderno invitando a reuniones elegantes."
      },
      {
        "name": "#CocteleriaDeAutorVisual",
        "displayName": "Hielos Cristalinos Tallados a Mano y Ahumados con Romero",
        "angle": "Copa labrada con destellos de luz ámbar y botánicos seleccionados."
      },
      {
        "name": "#PostresDePasteleriaFina",
        "displayName": "Glaseados Espejo en Mousses de Frutos Rojos y Pistacho",
        "angle": "Reflejo nítido en la superficie del pastel con corte perfecto."
      },
      {
        "name": "#HuertosOrganicosCulinarios",
        "displayName": "Tomates Reliquia de Colores Recién Cosechados de la Mata",
        "angle": "Texturas naturales con gotas de rocío matutino en la cesta."
      },
      {
        "name": "#PastasCaserasAlHuevo",
        "displayName": "Ravioles Rellenos de Ricota y Salvia con Manteca Avellanada",
        "angle": "Harina sobre la mesa de madera con rodillo y pasta fresca extendida."
      },
      {
        "name": "#FotografiaGastronomicaPro",
        "displayName": "Iluminación Lateral Suave para Resaltar el Humo del Plato",
        "angle": "Consejos fotográficos para elevar fotos de comida a nivel comercial."
      }
    ],
    "facebook": [
      {
        "name": "#RecetasDeLaAbuelaFamilia",
        "displayName": "Guisos Tradicionales que Calientan el Alma los Domingos",
        "angle": "Receta paso a paso explicada con cariño para cocinar en familia."
      },
      {
        "name": "#ComidaCaseraEconomica",
        "displayName": "Menús Semanales Nutritivos para 4 Personas con Poco Dinero",
        "angle": "Ideas prácticas para aprovechar sobras y estirar el presupuesto del mercado."
      },
      {
        "name": "#DulcesYPostresTradicionales",
        "displayName": "Arroz con Leche Cremoso con Canela y Flan Casero de Huevo",
        "angle": "El truco para que el caramelo no se queme y el flan no tenga agujeros."
      },
      {
        "name": "#LosMejoresPuestosDeBarrio",
        "displayName": "Recomendaciones Vecinales de Panaderías y Carnicerías de Confianza",
        "angle": "Apoyo a los comerciantes de toda la vida que atienden con una sonrisa."
      },
      {
        "name": "#ConservasYEncurtidosCaseros",
        "displayName": "Cómo Esterilizar Frascos para Tomate Frito y Mermeladas",
        "angle": "Guía de seguridad alimentaria para conservar verduras y frutas de temporada."
      },
      {
        "name": "#GuisosDeCucharaDeInvierno",
        "displayName": "Lentejas con Verduras, Fabadas y Cocidos al Fuego Lento",
        "angle": "El placer de mojar el pan en el caldo espeso en los días de frío."
      },
      {
        "name": "#SecretosDeLaMasaCasera",
        "displayName": "Empanadas al Horno con Rellenos Jugosos que No se Abren",
        "angle": "Cómo hacer el repulgue a mano y pintar con yema para brillo dorado."
      },
      {
        "name": "#FiestasYPlatosTipicos",
        "displayName": "La Comida que Marca Nuestras Fiestas de Fin de Año y Santos",
        "angle": "Compartir fotos de la mesa servida recordando a los abuelos que cocinaban."
      },
      {
        "name": "#MercadosMunicipalesVivos",
        "displayName": "Pescado Fresco del Día y Conversaciones con los Caseros",
        "angle": "La importancia de comprar en los mercados públicos de nuestras ciudades."
      },
      {
        "name": "#SolidaridadEnLaCocina",
        "displayName": "Recetas para Compartir con Vecinos Mayores que Viven Solos",
        "angle": "Un plato de sopa caliente llevado al vecino de al lado hace comunidad."
      }
    ]
  },
  "fashion": {
    "tiktok": [
      {
        "name": "#OutfitCheckRapido",
        "displayName": "3 Formas de Combinar el Mismo Pantalón Ancho",
        "angle": "Transición con salto cambiando de estilo casual a formal en 5 segundos."
      },
      {
        "name": "#DelineadoGraficoHack",
        "displayName": "El Truco con Cinta Adhesiva para un Delineado Perfecto",
        "angle": "Retira la cinta frente al espejo con línea limpia impecable."
      },
      {
        "name": "#ClonesDeZaraEconomicos",
        "displayName": "Prendas Idénticas a Marcas de Lujo por una Fracción del Precio",
        "angle": "Comparativa lado a lado con códigos de búsqueda exactos en la app."
      },
      {
        "name": "#PeloLimpioSinLavarlo",
        "displayName": "Peinados con Gomina y Moño Tirante para Días de Apuro",
        "angle": "Cepillo de cerdas naturales aplicando fijador para acabado impecable."
      },
      {
        "name": "#ZapatillasEnTendencia",
        "displayName": "Las Sneakers que Todo el Mundo Lleva este Mes y Cómo Limpiarlas",
        "angle": "Limpieza de suelas con producto especial dejándolas como nuevas."
      },
      {
        "name": "#ColorimetriaPersonalPOV",
        "displayName": "Descubriendo si Eres Paleta Invierno Frío o Primavera Cálida",
        "angle": "Prueba de telas doradas vs plateadas bajo el mentón notando el cambio de luz."
      },
      {
        "name": "#GRWMFiestaEn5Minutos",
        "displayName": "Arreglándose a las Corridas con Vestido Negro Básico y Joyas",
        "angle": "Energía divertida bailando mientras te aplicas el labial rojo."
      },
      {
        "name": "#JoyasWaterproofTest",
        "displayName": "Probando si los Anillos de Acero Inoxidable se Ponen Verdes",
        "angle": "Prueba con agua con sal demostrando que conservan el brillo dorado."
      },
      {
        "name": "#SegundaManoHallazgos",
        "displayName": "Joyas Vintage y Chaquetas de Cuero Encontradas en Tiendas Thrift",
        "angle": "Muestra el precio en la etiqueta y cómo se ve puesto el outfit."
      },
      {
        "name": "#RutinaSkincareNocturna",
        "displayName": "Doble Limpieza Facial con Aceite y Sérum Reparador",
        "angle": "Masaje facial relajante con gua sha eliminando tensión del día."
      }
    ],
    "instagram": [
      {
        "name": "#StreetStyleLookbook",
        "displayName": "Fotografía Editorial en Aceras Urbanas con Iluminación Natural",
        "angle": "Carrusel de fotos caminando con abrigo largo y gafas de sol oscuras."
      },
      {
        "name": "#ArmarioCapsulaNeutro",
        "displayName": "10 Prendas Básicas de Máxima Calidad para 30 Outfits Diferentes",
        "angle": "Composición ordenada en plano cenital con perchas de madera noble."
      },
      {
        "name": "#AltaCosturaDetalles",
        "displayName": "Bordados a Mano, Plumas y Seda en Desfiles de Semanas de la Moda",
        "angle": "Primerísimos planos de la textura y maestría de los talleres artesanos."
      },
      {
        "name": "#PaletaDeColoresTierra",
        "displayName": "Tonos Marfil, Chocolate, Camel y Terracota en Texturas Suaves",
        "angle": "Cuadrícula estética manteniendo la coherencia cromática en el feed."
      },
      {
        "name": "#AccesoriosDeLujoSilencioso",
        "displayName": "Bolsos de Piel sin Logotipos Grandes y Mocasines Clásicos",
        "angle": "Tomas de detalles con reloj vintage y anillos minimalistas en la mano."
      },
      {
        "name": "#RutinaPielDeCristal",
        "displayName": "Hidratación Profunda con Capas de Esencia y Bloqueador Fluido",
        "angle": "Piel limpia y luminosa con luz solar matutina sin retoques artificiales."
      },
      {
        "name": "#PerfumeriaDeNichoAromas",
        "displayName": "Fragancias con Notas de Sándalo, Higo y Cuero Ahumado",
        "angle": "Frasco de vidrio pesado sobre mármol con reseña poética de sus notas."
      },
      {
        "name": "#DisenoTextilSostenible",
        "displayName": "Lino Orgánico, Tintes Botánicos y Ropa Hecha para Durar Décadas",
        "angle": "Historias de los talleres locales que rescatan oficios tradicionales."
      },
      {
        "name": "#FotografiaDeModaAnaloga",
        "displayName": "Retratos en Película de 35mm con Grano Cálido y Tonos Nostálgicos",
        "angle": "Luz suave de atardecer capturada en rollo Kodak Portra."
      },
      {
        "name": "#JoyeriaContemporaneaArtesanal",
        "displayName": "Metales Reciclados con Formas Orgánicas Inspiradas en la Naturaleza",
        "angle": "Piezas escultóricas que funcionan como pequeñas obras de arte portátiles."
      }
    ],
    "facebook": [
      {
        "name": "#ModaComodaYPractica",
        "displayName": "Consejos para Vestir Elegante y Cómoda a Cualquier Edad",
        "angle": "Prendas favorecedoras que no aprietan y permiten libertad de movimiento."
      },
      {
        "name": "#CosturaYArreglosEnCasa",
        "displayName": "Cómo Subir el Dobladillo de un Pantalón a Mano sin que se Note",
        "angle": "Paso a paso con hilo y aguja para arreglar la ropa de toda la familia."
      },
      {
        "name": "#CuidadoDelCabelloNatural",
        "displayName": "Remedios Caseros con Romero y Aceite de Coco para el Brillo",
        "angle": "Consejos tradicionales de las abuelas para fortalecer el pelo sin químicos."
      },
      {
        "name": "#RopaDeSegundaManoComunidad",
        "displayName": "Intercambio y Venta de Ropa Infantil y de Abrigo en el Barrio",
        "angle": "Espacio para donar o comprar ropa en perfecto estado a precios solidarios."
      },
      {
        "name": "#EleganciaSinGastosExcesivos",
        "displayName": "Cómo Renovar tu Armario Usando Pañuelos, Cinturones y Accesorios",
        "angle": "Ideas ingeniosas para darle vida nueva a vestidos y camisas básicas."
      },
      {
        "name": "#ConsejosParaLavarLaRopa",
        "displayName": "El Secreto del Vinagre Blanco para Toallas Suaves y Blancos Impecables",
        "angle": "Trucos ecológicos de lavandería que cuidan las telas y ahorran dinero."
      },
      {
        "name": "#ZapatosComodosParaElTrabajo",
        "displayName": "Calzado que Protege la Espalda para Quienes Trabajan Muchas Horas de Pie",
        "angle": "Recomendaciones comunitarias de hormas anchas y plantillas ergonómicas."
      },
      {
        "name": "#TejidoACrochetYPalillos",
        "displayName": "Patrones Gratis para Tejer Mantas, Bufandas y Chalecos de Invierno",
        "angle": "El placer relajante de tejer en las tardes frías compartiendo fotos del avance."
      },
      {
        "name": "#HistoriasDeLaModaDeAntes",
        "displayName": "Los Vestidos Hechos a Medida por Modistas de Barrio en los Años 60",
        "angle": "Homenaje a las costureras que confeccionaban vestidos de novia inolvidables."
      },
      {
        "name": "#PrendasDeTradicionLocal",
        "displayName": "Mantas, Ponchos y Trajes Autóctonos que Forman Nuestra Identidad",
        "angle": "Puesta en valor de la vestimenta tradicional de nuestros pueblos y regiones."
      }
    ]
  },
  "business": {
    "tiktok": [
      {
        "name": "#EmprendimientoSinCapital",
        "displayName": "Cómo Validar tu Idea de Negocio con Cero Pesos de Inversión",
        "angle": "Crea una preventa antes de fabricar y usa herramientas gratuitas."
      },
      {
        "name": "#FinanzasParaJovenes",
        "displayName": "La Regla 50/30/20 para Separar Ahorro, Gastos Fijos y Gustos",
        "angle": "Animación sencilla con billetes y frascos de vidrio para entenderlo al instante."
      },
      {
        "name": "#VentasEnVozAlta",
        "displayName": "La Frase que Duplica tu Conversión al Responder por WhatsApp",
        "angle": "Responde con preguntas abiertas en lugar de enviar un catálogo en PDF frío."
      },
      {
        "name": "#TrabajosRemotosEnDolares",
        "displayName": "Plataformas Seguras para Trabajar de Asistente Virtual o Editor",
        "angle": "Muestra la pantalla con los filtros de búsqueda recomendados."
      },
      {
        "name": "#ErroresDePrimerizaEmprendedora",
        "displayName": "Lo que Nadie Te Dice de los Costos de Envío y Embalaje",
        "angle": "Anécdota graciosa de la primera venta donde perdiste dinero por no calcular bien."
      },
      {
        "name": "#HabitosDeProductividadMananera",
        "displayName": "La Regla de los Primeros 90 Minutos sin Tocar Redes Sociales",
        "angle": "Café, libreta en mano y avance profundo en la tarea más difícil del día."
      },
      {
        "name": "#MicroSaaSMonetizacion",
        "displayName": "Cómo una Herramienta Simple Puede Generar Ingresos Recurrentes",
        "angle": "Panel de Stripe en pantalla con crecimiento honesto mes a mes."
      },
      {
        "name": "#EstrategiaDePreciosPsicologicos",
        "displayName": "Por Qué Poner 3 Planes Hace que la Mayoría Elija el del Medio",
        "angle": "Efecto anclaje explicado con vasos de café pequeño, mediano y grande."
      },
      {
        "name": "#AutomatizacionesSinCodigo",
        "displayName": "Conectar Formularios con Excel y Correo Automático en 5 Minutos",
        "angle": "Tutorial con Zapier o Make resolviendo una tarea repetitiva."
      },
      {
        "name": "#MentalidadEmprendedoraReal",
        "displayName": "La Diferencia Entre Tener un Negocio y Haber Comprado un Autoempleo",
        "angle": "Sistemas y procesos que permiten que la empresa funcione sin que estés encima."
      }
    ],
    "instagram": [
      {
        "name": "#BrandingParaMarcasDeLujo",
        "displayName": "Tipografías Serias, Empaques Minimalistas y Experiencia Unboxing",
        "angle": "Carrusel visual analizando la identidad de marcas icónicas globales."
      },
      {
        "name": "#EstrategiaDeContenidosB2B",
        "displayName": "Cómo Atraer Clientes Corporativos con Información de Alto Valor",
        "angle": "Gráficas limpias con estadísticas e insights del mercado actual."
      },
      {
        "name": "#EspaciosDeCoworkingCreativo",
        "displayName": "Oficinas con Luz Natural, Plantas y Salas de Reunión Acústicas",
        "angle": "Tomas de diseño interior fomentando la colaboración profesional."
      },
      {
        "name": "#FinanzasCorporativasSanas",
        "displayName": "Gestión de Flujo de Caja y Fondo de Emergencia de 6 Meses",
        "angle": "Gráficos de barras con colores elegantes explicando márgenes operativos."
      },
      {
        "name": "#LiderazgoYEquiposRemotos",
        "displayName": "Cultura de Confianza, Trabajo Asíncrono y Menos Reuniones Inútiles",
        "angle": "Guía en carrusel para coordinar equipos en diferentes husos horarios."
      },
      {
        "name": "#NegociosSosteniblesB-Corp",
        "displayName": "Empresas con Triple Impacto: Económico, Social y Ambiental",
        "angle": "Casos de éxito que combinan rentabilidad con cuidado del planeta."
      },
      {
        "name": "#DisenoDeEmpaquesPremium",
        "displayName": "Papel Kraft Reciclado con Estampado en Oro Mate y Sellos de Cera",
        "angle": "Fotografía de producto con texturas táctiles que transmiten exclusividad."
      },
      {
        "name": "#NegociacionEstrategica",
        "displayName": "El Arte de Escuchar Antes de Presentar tu Propuesta Comercial",
        "angle": "Principios del método Harvard de negociación aplicados al día a día."
      },
      {
        "name": "#InversionBienesRaices",
        "displayName": "Análisis de Rentabilidad por Alquileres Temporales y Plusvalía",
        "angle": "Renders y fotografías arquitectónicas de proyectos inmobiliarios."
      },
      {
        "name": "#RutinasDeEnfoqueProfundo",
        "displayName": "Espacios Libres de Distracciones para Escribir y Planificar el Trimestre",
        "angle": "Luz cenital suave sobre agenda de piel y pluma estilográfica."
      }
    ],
    "facebook": [
      {
        "name": "#ApoyoAlComercioDeBarrio",
        "displayName": "Directorio de Negocios Locales: Peluquerías, Talleres y Almacenes",
        "angle": "Publicación comunitaria para que cada comerciante deje su teléfono y dirección."
      },
      {
        "name": "#ConsejosParaAhorrarEnCasa",
        "displayName": "Cómo Administrar el Sueldo para Llegar a Fin de Mes sin Deudas",
        "angle": "Consejos realistas de economía doméstica compartidos entre familias trabajadoras."
      },
      {
        "name": "#TramitesYDerechosLaborales",
        "displayName": "Información Clara sobre Liquidaciones, Aguinaldos y Vacaciones",
        "angle": "Respuestas a dudas comunes sobre contratos y derechos de los trabajadores."
      },
      {
        "name": "#EmprendimientosFamiliares",
        "displayName": "Historias de Familias que Salieron Adelante con Panadería o Costura",
        "angle": "Homenaje al esfuerzo diario de quienes construyen su futuro con sus manos."
      },
      {
        "name": "#CuidadoConLasEstafasPiramidales",
        "displayName": "Alerta sobre Negocios Mágicos que Prometen Hacerte Millonario",
        "angle": "Aviso preventivo para proteger los ahorros de vecinos y amigos de promesas falsas."
      },
      {
        "name": "#CooperativasYComunidades",
        "displayName": "El Poder de Unirse en Cooperativas de Crédito y Consumo Solidario",
        "angle": "Ventajas del cooperativismo para acceder a préstamos a tasas justas."
      },
      {
        "name": "#ConsejosParaJubilados",
        "displayName": "Fechas de Cobro, Trámites de Supervivencia y Descuentos en Farmacias",
        "angle": "Información de servicio público clara y actualizada para nuestros adultos mayores."
      },
      {
        "name": "#FeriaDeEmpleoLocal",
        "displayName": "Ofertas de Trabajo en la Zona y Consejos para Armar el Currículum",
        "angle": "Publicación semanal de avisos laborales verificados en la comunidad."
      },
      {
        "name": "#ReparacionesYOficios",
        "displayName": "Recomendaciones de Fontaneros, Electricistas y Pintores Honrados",
        "angle": "El boca a boca vecinal que premia al buen profesional que cumple y cobra lo justo."
      },
      {
        "name": "#SolidaridadYMicrocreditos",
        "displayName": "Iniciativas Vecinales para Apoyar a Vecinos que Sufrieron Emergencias",
        "angle": "Cajas de ahorro barriales que prestan ayuda en momentos difíciles."
      }
    ]
  },
  "music": {
    "tiktok": [
      {
        "name": "#AudioViralParaReels",
        "displayName": "El Sonido con el Beat Drop que Todos Están Usando en TikTok",
        "angle": "Usa este audio en los primeros 3 segundos para multiplicar tus visualizaciones."
      },
      {
        "name": "#DanceChoreoChallenge",
        "displayName": "Paso a Paso en Cámara Lenta del Baile Viral de la Semana",
        "angle": "Desglose de los movimientos de manos y cadera con música ralentizada."
      },
      {
        "name": "#CoverAcusticoIntimo",
        "displayName": "Cantando el Éxito Urbano en Versión Balada con Solo Guitarra",
        "angle": "Primer plano íntimo cantando con emoción y mirada a la cámara."
      },
      {
        "name": "#ComoHacerUnBeatTrap",
        "displayName": "Creando una Base Pegadiza en 30 Segundos con la Batería 808",
        "angle": "Pantalla del DAW con el teclado MIDI sonando al instante."
      },
      {
        "name": "#TransicionConElBeat",
        "displayName": "Cambio de Ropa Justo en el Golpe Fuerte de la Canción",
        "angle": "Truco de edición para sincronizar el corte con el milisegundo exacto del sonido."
      },
      {
        "name": "#LipSyncPerfecto",
        "displayName": "La Expresión Facial Justa que Hace Creer que Tú Cantas el Tema",
        "angle": "Actuación con fuerza y emoción transmitiendo la letra con naturalidad."
      },
      {
        "name": "#ArtistasEmergentesTikTok",
        "displayName": "La Canción que Compuse en mi Cuarto y que Llegó a 1M de Reproducciones",
        "angle": "Contar la historia personal detrás de la letra que nació de una ruptura."
      },
      {
        "name": "#RemixLatinElectro",
        "displayName": "Cuando Mezclas Cumbia Clásica con Ritmo Electrónico Acelerado",
        "angle": "El resultado que pone a bailar a todos en las fiestas universitarias."
      },
      {
        "name": "#DueloDeGuitarras",
        "displayName": "Dos Amigos Respondiéndose Solos de Rock Improvisados",
        "angle": "Intercambio de riffs virtuosos con complicidad y sonrisas."
      },
      {
        "name": "#ConciertoDesdeLaPrimeraFila",
        "displayName": "El Momento Exacto en que el Cantante Baja al Público",
        "angle": "Tomas verticales temblorosas de euforia pura con todo el estadio cantando."
      }
    ],
    "instagram": [
      {
        "name": "#ConciertosEnEstadiosLuz",
        "displayName": "Tomas Cinemáticas de Miles de Linternas Iluminando la Noche",
        "angle": "Fotografía panorámica del estadio entero cantando a oscuras con luces de móviles."
      },
      {
        "name": "#VinilosDeColeccionista",
        "displayName": "Ediciones Especiales en Vinilo de Color y Tocadiscos Vintage",
        "angle": "La aguja posándose sobre el surco con la portada del disco apoyada al lado."
      },
      {
        "name": "#SesionesAcusticasEnEstudio",
        "displayName": "Micrófonos de Válvula, Iluminación Cálida y Pianos de Cola",
        "angle": "Reel en blanco y negro con audio masterizado de alta fidelidad."
      },
      {
        "name": "#DetrasDelVideoclip",
        "displayName": "Tomas de Cámaras de Cine ARRI y Luces en el Set de Filmación",
        "angle": "El equipo de rodaje preparando la escena de lluvia artificial para el cantante."
      },
      {
        "name": "#FestivalesDeMusicaLineup",
        "displayName": "Carteles Oficiales y Momentos Dorados en el Escenario Principal",
        "angle": "Carrusel con los mejores momentos de los artistas cabezas de cartel."
      },
      {
        "name": "#EsteticaMúsicosUrbanos",
        "displayName": "Joyas de Plata, Gafas Oscuras y Moda Oversize en el Escenario",
        "angle": "Retratos editoriales con luces estroboscópicas y humo tenue."
      },
      {
        "name": "#LanzamientoDeSingle",
        "displayName": "La Portada Oficial y el Concepto Visual del Nuevo Álbum",
        "angle": "Diseño gráfico de portada con tipografía experimental y texturas."
      },
      {
        "name": "#ProduccionMusicalAnalogica",
        "displayName": "Sintetizadores Modulares con Cables de Colores y Cintas de Carrete",
        "angle": "El amor por el sonido cálido de los procesadores analógicos de estudio."
      },
      {
        "name": "#LetrasConSignificadoProfundo",
        "displayName": "Versos que Parecen Poesía Escritos a Mano en Cuadernos de Viaje",
        "angle": "Primer plano del papel con tachaduras y la letra que luego fue hit."
      },
      {
        "name": "#CelloYViolinContemporaneo",
        "displayName": "Instrumentos Clásicos Interpretando Temas Modernos con Elegancia",
        "angle": "Tomas en salas de conciertos con acústica perfecta y vestidos de noche."
      }
    ],
    "facebook": [
      {
        "name": "#LaMusicaDeNuestraEpoca",
        "displayName": "Las Canciones Románticas que Bailábamos en los Años 70 y 80",
        "angle": "¿Con qué canción te enamoraste de tu pareja? Compartan sus recuerdos."
      },
      {
        "name": "#BandasDePuebloYFolklore",
        "displayName": "Músicos Locales que Alegran las Fiestas Patronales de Nuestras Tierras",
        "angle": "Homenaje a los músicos de toda la vida que tocan por amor al arte y la tradición."
      },
      {
        "name": "#RecuerdosDeLaRadioAM",
        "displayName": "Los Locutores Inolvidables que Nos Despertaban con Buenas Noticias",
        "angle": "Nostalgia de los transistores que acompañaban el desayuno de la familia."
      },
      {
        "name": "#GrandesCantantesDeSiempre",
        "displayName": "Homenaje a las Voces Privilegiadas que Dejaron Huella Imborrable",
        "angle": "Biografías y videos de presentaciones históricas de grandes baladistas."
      },
      {
        "name": "#GuitarradasEnFamilia",
        "displayName": "Reuniones de Domingo donde Siempre Alguien Saca la Guitarra",
        "angle": "Toda la familia cantando en corro alrededor de la mesa con emoción."
      },
      {
        "name": "#ClasesDeMusicaParaNinos",
        "displayName": "Iniciación en Piano y Flauta en Academias y Centros de Barrio",
        "angle": "La música como disciplina formativa hermosa para el desarrollo infantil."
      },
      {
        "name": "#LetrasQueNoPasanDeModa",
        "displayName": "Canciones que Tenían Mensaje, Poesía y Respeto en sus Letras",
        "angle": "Debate reflexivo sobre la calidad poética de las composiciones de antaño."
      },
      {
        "name": "#CorosComunitariosYParroquiales",
        "displayName": "Ensayos de Villancicos y Música Coral en Nuestras Ciudades",
        "angle": "Convocatorias a integrarse a grupos vocales de adultos mayores y jóvenes."
      },
      {
        "name": "#DiscosQueMarcaronUnaVida",
        "displayName": "El Primer Casete o Disco de Vinilo que Guardas como un Tesoro",
        "angle": "Fotos de portadas gastadas por el tiempo que traen miles de recuerdos."
      },
      {
        "name": "#SolidaridadEntreMusicos",
        "displayName": "Conciertos a Beneficio para Apoyar a Maestros de la Música",
        "angle": "La comunidad unida para devolverle el cariño a quienes nos hicieron felices con su arte."
      }
    ]
  },
  "lifestyle": {
    "tiktok": [
      {
        "name": "#RutinaDeMananaPOV",
        "displayName": "Luz Solar en la Cara, Vaso de Agua y 10 Minutos sin Pantalla",
        "angle": "Estira el cuerpo y abre las ventanas con audio relajante de pájaros de fondo."
      },
      {
        "name": "#HacksDeViajeEquipaje",
        "displayName": "Cómo Meter Ropa para 10 Días en una Mochila de Cabina sin Pagar Extra",
        "angle": "Técnica del enrollado en tubos compactos y bolsas de compresión al vacío."
      },
      {
        "name": "#GlampingYFogatas",
        "displayName": "Cabañas Transparentes en el Bosque para Ver las Estrellas",
        "angle": "Asando malvaviscos con luces cálidas colgadas entre los árboles."
      },
      {
        "name": "#TrucosParaPlantasInterior",
        "displayName": "El Riego por Inmersión que Salva a tus Monsteras de Secarse",
        "angle": "Sumerge la maceta en un balde con agua y mira cómo suben las burbujas."
      },
      {
        "name": "#PaseosConMiPerroPOV",
        "displayName": "La Emoción de mi Mascota al Escuchar la Palabra 'Vamos a la Calle'",
        "angle": "Cámara en el arnés del perro mostrando su trote feliz por el parque."
      },
      {
        "name": "#CafeYLibroDeTarde",
        "displayName": "Rincón de Lectura Acogedor con Manta Suave en Día Lluvioso",
        "angle": "Gotas golpeando el cristal mientras pasas la página de tu novela favorita."
      },
      {
        "name": "#HostalesParaViajarSolo",
        "displayName": "Cómo Conocer Gente de Todo el Mundo en tu Primer Viaje en Solitario",
        "angle": "Desayuno comunitario en el albergue intercambiando anécdotas con mochileros."
      },
      {
        "name": "#LimpiezaSatisfactoriaHogar",
        "displayName": "Antes y Después de Limpiar la Alfombra con Máquina de Inyección",
        "angle": "Sonido de la suciedad desapareciendo dejando la tela como recién salida de tienda."
      },
      {
        "name": "#DesconexionDigitalDomingo",
        "displayName": "Apagar el Móvil durante 12 Horas y Volver a Cocinar o Caminar",
        "angle": "Reloj de agujas avanzando con sensación de calma y presencia absoluta."
      },
      {
        "name": "#BiciUrbanaAlAtardecer",
        "displayName": "Paseo en Bicicleta por la Ciclovía Costera con Brisa Fresca",
        "angle": "Manillar recorriendo el paseo marítimo con luces doradas reflejadas en el asfalto."
      }
    ],
    "instagram": [
      {
        "name": "#EsteticaDeVidaConsciente",
        "displayName": "Luz Tenue, Cerámica Artesanal y Flores Frescas en la Mesa",
        "angle": "Composiciones fotográficas equilibradas que transmiten paz visual."
      },
      {
        "name": "#CabañasEnLaMontana",
        "displayName": "Grandes Ventanales Frente al Bosque con Humo Saliendo de la Chimenea",
        "angle": "Tazas humeantes apoyadas en alféizares de madera con vista al valle."
      },
      {
        "name": "#AstroturismoVistasNocturnas",
        "displayName": "La Vía Láctea Cruzando el Cielo Despejado sobre Formaciones Rocosas",
        "angle": "Exposiciones prolongadas de 25 segundos con nitidez milimétrica de estrellas."
      },
      {
        "name": "#DisenoDeInterioresZen",
        "displayName": "Espacios Despejados con Maderas Nobles y Esteras de Bambú",
        "angle": "Transiciones cinemáticas mostrando la circulación de luz natural en el hogar."
      },
      {
        "name": "#RinconesDeLecturaCalidos",
        "displayName": "Sillones de Cuero Vintage con Lámparas de Pie de Luz Amarilla",
        "angle": "Pilares de libros bien encuadernados con mantas de lana merina."
      },
      {
        "name": "#AtardeceresEnLaCosta",
        "displayName": "El Sol Ocultándose en el Océano Teñido de Tonos Melocotón y Violeta",
        "angle": "Siluetas caminando tranquilas por la orilla mojada con destellos dorados."
      },
      {
        "name": "#JardinesBotanicosPaseos",
        "displayName": "Invernaderos de Hierro Forjado con Helechos Gigantes y Nenúfares",
        "angle": "Paseos lentos con luz cenital filtrada entre las hojas tropicales."
      },
      {
        "name": "#PicnicAestheticEnElParque",
        "displayName": "Cestas de Mimbre, Pan Crujiente, Quesos y Uvas sobre Manta a Cuadros",
        "angle": "Bodegón campestre al aire libre con sombras de copas de árboles."
      },
      {
        "name": "#HotelBoutiqueHistorico",
        "displayName": "Casonas Antiguas Restauradas con Patios Interiores y Fuentes de Agua",
        "angle": "El sonido del agua cayendo sobre piedra y arquitectura de época."
      },
      {
        "name": "#ViajesEnCarreteraRoadtrip",
        "displayName": "Caminos Solitarios Bordeando Costas y Cordilleras Infinitas",
        "angle": "Espejo retrovisor reflejando el camino dejado atrás bajo el cielo azul."
      }
    ],
    "facebook": [
      {
        "name": "#RecuerdosDeMiInfanciaYBarrio",
        "displayName": "Jugar a la Pelota en la Calle sin Miedo y con Amigos de Toda la Vida",
        "angle": "¿Quién recuerda cuando la única alarma para volver a casa era la luz del farol?"
      },
      {
        "name": "#ConsejosParaElHuertoCasero",
        "displayName": "Cómo Cuidar los Árboles Frutales y Protegerlos de las Heladas",
        "angle": "Intercambio comunitario de abonos naturales y podas correctas según la luna."
      },
      {
        "name": "#PueblosConEncantoDeNuestraTierra",
        "displayName": "Rincones Escondidos de Nuestras Provincias que Merecen una Visita",
        "angle": "Fotografías de iglesias de piedra, plazas principales y hospitalidad de su gente."
      },
      {
        "name": "#AmorPorLosAnimalesYRescate",
        "displayName": "Historias de Mascotas Rescatadas que Transformaron Hogares",
        "angle": "Homenaje al amor incondicional de los perritos y gatitos adoptados."
      },
      {
        "name": "#PlatillosYCostumbresDominicales",
        "displayName": "El Ritual de Juntarse Toda la Familia Alrededor de una Gran Mesa",
        "angle": "La alegría de compartir el almuerzo con abuelos, tíos, primos y nietos reunidos."
      },
      {
        "name": "#PlantasDeInteriorYBalcon",
        "displayName": "Los Secretos para que los Geranios y Helechos Estén Siempre Verdes",
        "angle": "Respuestas solidarias entre amantes de las plantas con fotos de balcones floridos."
      },
      {
        "name": "#CaminatasDeSaludMatutina",
        "displayName": "Grupos de Vecinos que Salen a Caminar por el Parque Todas las Mañanas",
        "angle": "La buena costumbre de salud física y charla amena para empezar el día con ánimo."
      },
      {
        "name": "#HistoriasDeSuperacionVecinal",
        "displayName": "Homenaje a Vecinos Ejemplares que Dedican su Vida a los Demás",
        "angle": "Reconocimiento con cariño a maestras, enfermeros y líderes de barrio queridos."
      },
      {
        "name": "#FeriasYArtesaniasLocales",
        "displayName": "Puestos de Tejidos, Cerámica y Mermeladas Hechas por Manos Locales",
        "angle": "Invitación a recorrer las ferias artesanales del fin de semana apoyando lo local."
      },
      {
        "name": "#PazYTranquilidadEnElHogar",
        "displayName": "Aprender a Disfrutar de las Cosas Simples de la Vida sin Tantas Prisas",
        "angle": "Reflexiones sobre el valor del tiempo compartido, la salud y los afectos verdaderos."
      }
    ]
  }
};

// Procedural generator that creates high-quality contextual Top 10 trends for any country + topic + platform combination
export function getTop10TrendsFor(
  country: CountryCode,
  topic: TrendTopic,
  timeframe: string = '24h',
  platform: 'all' | 'tiktok' | 'instagram' | 'facebook' = 'all'
): TrendHeatmapResponse {
  const countryObj = COUNTRIES_LIST.find((c) => c.code === country) || COUNTRIES_LIST[0];
  const topicObj = TOPICS_LIST.find((t) => t.code === topic) || TOPICS_LIST[0];

  let rawCandidates: Array<{ name: string; displayName: string; topic?: TrendTopic; topicLabel?: string; angle?: string }> = [];

  if (topic === 'all') {
    // 1. Look for specific country + platform seed
    const specificKey = `${country}-${platform}`;
    const countryAllKey = `${country}-all`;
    const globalPlatformKey = `global-${platform}`;
    const globalAllKey = `global-all`;

    if (SEED_TRENDS[specificKey] && SEED_TRENDS[specificKey].length > 0) {
      rawCandidates = SEED_TRENDS[specificKey];
    } else if (SEED_TRENDS[countryAllKey] && SEED_TRENDS[countryAllKey].length > 0) {
      rawCandidates = SEED_TRENDS[countryAllKey];
    } else if (SEED_TRENDS[globalPlatformKey] && SEED_TRENDS[globalPlatformKey].length > 0) {
      rawCandidates = SEED_TRENDS[globalPlatformKey];
    } else {
      rawCandidates = SEED_TRENDS[globalAllKey] || [];
    }
  } else {
    // Specific topic selected
    const templates = TOPIC_TEMPLATES[topic] || TOPIC_TEMPLATES.entertainment;
    const platformList = (platform !== 'all' && templates[platform]) ? templates[platform] : (templates.all || templates.tiktok || []);
    rawCandidates = platformList.map((t) => ({
      ...t,
      topic: topic,
      topicLabel: topicObj.label,
    }));
  }

  // Map into pristine 10 TrendItems
  const top10: TrendItem[] = rawCandidates.slice(0, 10).map((item, idx) => {
    // Unique ID combining country, platform, topic, and rank
    const id = `trend-${country}-${platform}-${topic}-${idx + 1}`;
    const rank = idx + 1;
    const name = item.name;
    const displayName = item.displayName;
    const itemTopic = item.topic || topicObj.code;
    const itemTopicLabel = item.topicLabel || topicObj.label;

    // Heat score & velocity
    const heatScore = Math.max(60, Math.min(100, Math.round(99 - idx * 2.8)));
    const velocityPercent = platform === 'tiktok'
      ? Math.round(115 - idx * 4 + Math.random() * 10)
      : platform === 'instagram'
      ? Math.round(92 - idx * 3.5 + Math.random() * 8)
      : platform === 'facebook'
      ? Math.round(84 - idx * 3 + Math.random() * 6)
      : Math.round(95 - idx * 3.8 + Math.random() * 7);

    // Volume formatted
    const baseVol = platform === 'tiktok' ? 4200000 : platform === 'instagram' ? 3600000 : platform === 'facebook' ? 2900000 : 3800000;
    const volNum = Math.round((baseVol - idx * 240000) * (0.9 + Math.random() * 0.2));
    const volumeFormatted = volNum > 1000000 ? `${(volNum / 1000000).toFixed(1)}M menciones` : `${Math.round(volNum / 1000)}K menciones`;

    // Platform share & hourly heat
    let topPlatforms: Array<{ platform: 'tiktok' | 'instagram' | 'facebook'; share: number }>;
    let peakTimeLabel: string;
    let hourlyHeat: number[];
    let sampleComments: string[];
    let realPostUrl: string;

    if (platform === 'tiktok') {
      topPlatforms = [{ platform: 'tiktok', share: 88 }, { platform: 'instagram', share: 9 }, { platform: 'facebook', share: 3 }];
      peakTimeLabel = '20:00 - 01:30';
      hourlyHeat = [35, 10, 15, 60, 94, 99];
      sampleComments = [
        `¡Ese audio y trend está pegadísimo en ${countryObj.label}! 😂🔥`,
        'Guardado para grabarlo hoy mismo con mi grupo',
        'Parte 2 por favor 🙏 No me esperaba ese remate jaja',
      ];
      realPostUrl = 'https://www.tiktok.com/@scout2015/video/6718335390845095173';
    } else if (platform === 'instagram') {
      topPlatforms = [{ platform: 'instagram', share: 86 }, { platform: 'tiktok', share: 10 }, { platform: 'facebook', share: 4 }];
      peakTimeLabel = '17:00 - 21:30';
      hourlyHeat = [15, 5, 25, 75, 98, 72];
      sampleComments = [
        'Qué estética y paleta de colores tan hermosa 😍✨',
        'Pásame la referencia y ubicación exacta por DM porfa',
        'Inspiración pura para mi próximo contenido de fin de semana',
      ];
      realPostUrl = 'https://www.instagram.com/p/DcWoXGLSXSp/';
    } else if (platform === 'facebook') {
      topPlatforms = [{ platform: 'facebook', share: 88 }, { platform: 'tiktok', share: 7 }, { platform: 'instagram', share: 5 }];
      peakTimeLabel = '11:00 - 15:30';
      hourlyHeat = [10, 15, 88, 95, 70, 45];
      sampleComments = [
        'Compartido con el grupo familiar y vecinos de la zona',
        'Muy de acuerdo con lo expuesto, gran iniciativa comunitaria',
        'Dejen su opinión con respeto en los comentarios',
      ];
      realPostUrl = 'https://www.facebook.com/watch/?v=10153231379946729';
    } else {
      topPlatforms = [{ platform: 'tiktok', share: 55 }, { platform: 'instagram', share: 32 }, { platform: 'facebook', share: 13 }];
      peakTimeLabel = '18:00 - 22:30';
      hourlyHeat = [25, 10, 25, 65, 95, 88];
      sampleComments = [
        `Tendencia viral muy comentada hoy en todo ${countryObj.label} 📱`,
        'Totalmente de acuerdo con el enfoque que le dieron en redes',
        'Excelente análisis y debate en la comunidad',
      ];
      realPostUrl = 'https://www.tiktok.com/@tiktok/video/7339798958212156715';
    }

    return {
      id,
      rank,
      name,
      displayName,
      topic: itemTopic as TrendTopic,
      topicLabel: itemTopicLabel,
      country: countryObj.code,
      countryLabel: countryObj.label,
      countryFlag: countryObj.flag,
      volumeFormatted,
      volumeNumber: volNum,
      velocityPercent,
      heatScore,
      sentiment: {
        positive: Math.min(96, Math.round(78 + (Math.random() * 14 - 7))),
        neutral: Math.round(14 + Math.random() * 6),
        negative: Math.max(2, Math.round(8 - Math.random() * 4)),
        netScore: Math.round(70 + Math.random() * 15),
      },
      topPlatforms,
      peakTimeLabel,
      hourlyHeat,
      contentAngle: item.angle || `Estrategia de contenido recomendada para conectar con la audiencia en ${platform === 'all' ? 'redes sociales' : platform}.`,
      sampleComments,
      viralSound: (platform === 'tiktok' ? `${name.replace('#', '')} Viral Sound Remix` : undefined),
      realPostUrl,
    };
  });

  const totalVolume = top10.reduce((acc, curr) => acc + curr.volumeNumber, 0);
  const avgVelocity = Math.round(top10.reduce((acc, curr) => acc + curr.velocityPercent, 0) / top10.length);
  const avgNetSentiment = Math.round(top10.reduce((acc, curr) => acc + curr.sentiment.netScore, 0) / top10.length);

  return {
    country: countryObj.code,
    countryLabel: countryObj.label,
    countryFlag: countryObj.flag,
    topic: topicObj.code,
    topicLabel: topicObj.label,
    platform,
    timeframe: timeframe || '24h',
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    top10Trends: top10,
    kpis: {
      topTrendName: top10[0]?.name || '#Tendencia1',
      totalVolumeFormatted: totalVolume > 1000000 ? `${(totalVolume / 1000000).toFixed(1)}M menciones` : `${Math.round(totalVolume / 1000)}K menciones`,
      averageVelocity: avgVelocity,
      dominantSentiment: avgNetSentiment > 50 ? 'Muy Positivo' : (avgNetSentiment > 0 ? 'Favorable' : 'Mixto'),
      netSentimentAverage: avgNetSentiment,
    },
  };
}
