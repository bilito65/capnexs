import { MarketAsset, AiAgent } from '../types';

export const MARKET_ASSETS: MarketAsset[] = [
  {
    id: 'usd-dop',
    name: 'Dólar Estadounidense / Peso Dominicano',
    symbol: 'USD / DOP',
    category: 'currency',
    price: 62.35,
    change24h: 0.34,
    currency: 'RD$',
    sparkline: [61.90, 62.05, 62.15, 62.10, 62.25, 62.30, 62.35],
    high24h: 62.42,
    low24h: 62.18,
    description: 'Cotización interbancaria referencial del mercado de divisas dominicano.',
    nexaInsight: 'La presión alcista responde a demanda corporativa de fin de trimestre y ajuste de tasas de la Reserva Federal. Oportunidad para inversionistas que perciben ingresos en USD y estructuran activos inmobiliarios en República Dominicana.'
  },
  {
    id: 'eur-dop',
    name: 'Euro / Peso Dominicano',
    symbol: 'EUR / DOP',
    category: 'currency',
    price: 67.85,
    change24h: -0.12,
    currency: 'RD$',
    sparkline: [68.10, 68.00, 67.95, 68.05, 67.90, 67.88, 67.85],
    high24h: 68.20,
    low24h: 67.75,
    description: 'Par de cambio Euro a Peso Dominicano en transacciones turísticas y corporativas.',
    nexaInsight: 'Estabilidad relativa en el corredor europeo-caribeño. Inversionistas españoles y franceses mantienen alta liquidez para adquisición en Cap Cana y Las Terrenas.'
  },
  {
    id: 'eur-usd',
    name: 'Euro / Dólar Estadounidense',
    symbol: 'EUR / USD',
    category: 'currency',
    price: 1.088,
    change24h: -0.21,
    currency: '$',
    sparkline: [1.092, 1.091, 1.089, 1.090, 1.087, 1.089, 1.088],
    high24h: 1.093,
    low24h: 1.086,
    description: 'Par de divisas más líquido a nivel global.',
    nexaInsight: 'La paridad refleja políticas monetarias divergentes del BCE y la FED, favoreciendo financiamientos en USD para proyectos con flujos turísticos.'
  },
  {
    id: 'sp500',
    name: 'S&P 500 Index',
    symbol: 'S&P 500',
    category: 'market',
    price: 5864.20,
    change24h: 0.68,
    currency: 'USD',
    sparkline: [5810, 5830, 5825, 5845, 5850, 5860, 5864],
    high24h: 5872.10,
    low24h: 5820.00,
    description: 'Rendimiento de las 500 mayores corporaciones de Estados Unidos.',
    nexaInsight: 'Continuidad en el ciclo expansivo impulsado por tecnología e inteligencia artificial. Buen momento para diversificar ganancias bursátiles en activos tangibles inmobiliarios.'
  },
  {
    id: 'nasdaq',
    name: 'Nasdaq Composite',
    symbol: 'NASDAQ',
    category: 'market',
    price: 18518.60,
    change24h: 0.85,
    currency: 'USD',
    sparkline: [18300, 18350, 18400, 18420, 18490, 18500, 18518],
    high24h: 18550.00,
    low24h: 18310.00,
    description: 'Índice de alta concentración tecnológica y crecimiento global.',
    nexaInsight: 'Los flujos de capital institucional buscan refugio en vehículos de deuda estructurada y private equity caribeño.'
  },
  {
    id: 'gold',
    name: 'Oro al Contado (Onza Troy)',
    symbol: 'GOLD (XAU)',
    category: 'commodity',
    price: 2738.50,
    change24h: 0.42,
    currency: 'USD',
    sparkline: [2710, 2715, 2728, 2725, 2732, 2735, 2738],
    high24h: 2745.00,
    low24h: 2712.00,
    description: 'Activo de reserva global y cobertura inflacionaria histórica.',
    nexaInsight: 'Máximos históricos sostenidos por compras de bancos centrales y tensiones geopolíticas.'
  },
  {
    id: 'oil',
    name: 'Petróleo Crudo WTI',
    symbol: 'CRUDE OIL',
    category: 'commodity',
    price: 71.40,
    change24h: -1.15,
    currency: 'USD',
    sparkline: [73.2, 72.8, 72.5, 71.9, 72.1, 71.8, 71.4],
    high24h: 73.50,
    low24h: 71.05,
    description: 'Referencia para costos energéticos y transporte internacional.',
    nexaInsight: 'Precios moderados reducen presión inflacionaria en República Dominicana, favoreciendo el consumo y la inversión en infraestructura.'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC / USD',
    category: 'crypto',
    price: 68420.00,
    change24h: 2.14,
    currency: 'USD',
    sparkline: [66200, 66800, 67100, 67400, 67900, 68100, 68420],
    high24h: 69100.00,
    low24h: 66300.00,
    description: 'Oro digital descentralizado y activo de reserva institucional.',
    nexaInsight: 'Adopción institucional acelerada. Clientes de CAPNEXS utilizan liquidez cripto para colateralizar o fondear adquisiciones de bienes raíces premium.'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH / USD',
    category: 'crypto',
    price: 2640.50,
    change24h: 1.62,
    currency: 'USD',
    sparkline: [2560, 2580, 2605, 2595, 2620, 2630, 2640],
    high24h: 2675.00,
    low24h: 2570.00,
    description: 'Plataforma líder para finanzas descentralizadas y contratos inteligentes.',
    nexaInsight: 'Base de tokenización para activos del mundo real (RWA).'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL / USD',
    category: 'crypto',
    price: 172.80,
    change24h: 4.35,
    currency: 'USD',
    sparkline: [162, 164, 166, 168, 170, 171, 172.8],
    high24h: 175.50,
    low24h: 161.80,
    description: 'Blockchain de alto rendimiento para pagos y microtransacciones instantáneas.',
    nexaInsight: 'Fuerte volumen transaccional y liquidez en tesorerías fintech.'
  },
  {
    id: 'tpm-bcrds',
    name: 'Tasa Política Monetaria (Banco Central RD)',
    symbol: 'TPM RD',
    category: 'dominican',
    price: 6.25,
    change24h: 0.00,
    currency: '%',
    sparkline: [7.00, 6.75, 6.50, 6.50, 6.25, 6.25, 6.25],
    high24h: 6.25,
    low24h: 6.25,
    description: 'Tasa de referencia oficial del Banco Central de la República Dominicana.',
    nexaInsight: 'La estabilidad de la TPM proyecta un entorno favorable para financiamientos hipotecarios y préstamos corporativos en DOP a mediano plazo.'
  },
  {
    id: 'mortgage-rate-rd',
    name: 'Tasa Hipotecaria Promedio Ponderada RD',
    symbol: 'HIPOTECA RD',
    category: 'dominican',
    price: 11.45,
    change24h: -0.15,
    currency: '%',
    sparkline: [12.10, 11.90, 11.80, 11.65, 11.55, 11.50, 11.45],
    high24h: 11.60,
    low24h: 11.40,
    description: 'Tasa de mercado promedio para préstamos a la vivienda en bancos múltiples dominicanos.',
    nexaInsight: 'Las condiciones de intermediación de CAPNEXS permiten acceder a tasas preferenciales de hasta 9.95% fija a 3 años mediante acuerdos directos de banca privada.'
  },
  {
    id: 'mortgage-rate-usd-rd',
    name: 'Tasa Hipotecaria en Dólares (Banca RD)',
    symbol: 'HIPOTECA USD RD',
    category: 'dominican',
    price: 7.75,
    change24h: -0.05,
    currency: '%',
    sparkline: [8.25, 8.10, 8.00, 7.90, 7.85, 7.80, 7.75],
    high24h: 7.90,
    low24h: 7.70,
    description: 'Financiamiento en moneda extranjera para inversionistas no residentes y turismo.',
    nexaInsight: 'Excelente vehículo para compradores de villas y condominios en Punta Cana y Cap Cana con flujos generados en USD por renta vacacional.'
  }
];

export const AI_AGENTS: AiAgent[] = [
  {
    id: 'nexa-orchestrator',
    name: 'NEXA',
    title: 'Financial Intelligence Orchestrator',
    specialty: 'Orquestación general, diagnóstico y síntesis integral de capital.',
    avatarIcon: 'Brain',
    description: 'Interfaz central que analiza tu caso y convoca a los agentes especializados necesarios para presentarte un diagnóstico unificado.',
    presetQueries: [
      '¿Cuál es la mejor estrategia para financiar una propiedad de US$500,000 en República Dominicana?',
      'Vivo en el extranjero y quiero invertir en Punta Cana, ¿por dónde empiezo?',
      '¿Qué requisitos exige la banca dominicana para abrir una cuenta siendo no residente?'
    ]
  },
  {
    id: 'mortgage-advisor',
    name: 'Mortgage Advisor Agent',
    title: 'Especialista en Estructuración Hipotecaria',
    specialty: 'Hipotecas, DTI, amortización, tasas fijas vs variables y precalificación.',
    avatarIcon: 'Home',
    description: 'Especializado en préstamos inmobiliarios personales e institucionales en USD y DOP.',
    presetQueries: [
      'Gano US$8,500 mensuales y tengo deudas de US$1,200. ¿Qué monto hipotecario puedo calificar?',
      '¿Me conviene financiar en dólares (USD) o en pesos dominicanos (DOP)?',
      '¿Cuál es el porcentaje mínimo de inicial para un inversionista extranjero?'
    ]
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst Agent',
    title: 'Analista de Capacidad y Riesgo',
    specialty: 'Evaluación de estados financieros, liquidez, ratios de endeudamiento y patrimonio.',
    avatarIcon: 'LineChart',
    description: 'Modela la solvencia patrimonial y calcula con precisión tu CAPNEXS SCORE™ antes de solicitar financiamiento.',
    presetQueries: [
      '¿Cómo calculan los bancos mi ratio Debt-to-Income (DTI)?',
      'Tengo activos ilíquidos en mi país de origen, ¿cómo influyen en mi capacidad crediticia?',
      '¿Qué ratio de cobertura de deuda requiere un banco dominicano para una empresa?'
    ]
  },
  {
    id: 'regulation-expert',
    name: 'Financial Regulation & Compliance',
    title: 'Experto en Normativa Bancaria & KYC',
    specialty: 'Regulación de la Superintendencia de Bancos (SIB), prevención de lavado (AML) y debida diligencia.',
    avatarIcon: 'ShieldCheck',
    description: 'Garantiza que la documentación y origen de fondos cumplan estrictamente con las directrices regulatorias dominicanas e internacionales.',
    presetQueries: [
      '¿Qué documentos se necesitan para justificar fondos de un comprador extranjero?',
      '¿Puedo comprar una propiedad en RD a nombre de una sociedad extranjera o local?',
      '¿Cuáles son los tiempos habituales de compliance bancario en República Dominicana?'
    ]
  },
  {
    id: 'investment-analyst',
    name: 'Investment Analyst Agent',
    title: 'Modelador de Retorno & Capital',
    specialty: 'ROI, Cash-on-Cash, Cap Rates, análisis de escenarios y modelos de rentabilidad de activos.',
    avatarIcon: 'TrendingUp',
    description: 'Evalúa la rentabilidad esperada de proyectos inmobiliarios y hoteleros coordinados con el ecosistema Payote.',
    presetQueries: [
      'Comprar una villa de US$750,000 en Cap Cana: ¿cuál es el retorno Cash-on-Cash estimado con renta vacacional?',
      '¿Cómo impacta una tasa hipotecaria del 7.5% sobre la rentabilidad neta de un condominio en Punta Cana?',
      '¿Cuál es el punto de equilibrio (break-even) en ocupación anual para una propiedad de lujo?'
    ]
  }
];

export const ECOSYSTEM_NODES = [
  {
    id: 'dream',
    name: 'DREAM',
    subtitle: 'Opportunity Discovery',
    tagline: 'Identificación y selección de propiedades exclusivas en Punta Cana, Cap Cana y Santo Domingo.',
    step: '01',
    color: '#8394A6'
  },
  {
    id: 'capnexs',
    name: 'CAPNEXS',
    subtitle: 'Capital & Intelligence',
    tagline: 'Estructuración financiera, precalificación hipotecaria y conexiones de banca privada.',
    step: '02',
    color: '#C9A84C',
    isHero: true
  },
  {
    id: 'avranza',
    name: 'AVRANZA',
    subtitle: 'Corporate & Tax Structure',
    tagline: 'Creación de vehículos corporativos, optimización fiscal y holding patrimonial.',
    step: '03',
    color: '#C8D1DA'
  },
  {
    id: 'alenza',
    name: 'ALENZA',
    subtitle: 'Legal Architecture',
    tagline: 'Debida diligencia inmobiliaria, contratos, títulos y blindaje legal.',
    step: '04',
    color: '#8394A6'
  },
  {
    id: 'acougos',
    name: 'ACOGUS',
    subtitle: 'Interior & Architectural Execution',
    tagline: 'Reformas de alto nivel, amueblamiento e interiorismo de lujo para maximizar el valor del activo.',
    step: '05',
    color: '#EEE8DE'
  },
  {
    id: 'ocevia',
    name: 'OCEVIA',
    subtitle: 'Asset Management',
    tagline: 'Administración integral de la propiedad, mantenimiento concierge y operación de rentas.',
    step: '06',
    color: '#C8D1DA'
  },
  {
    id: 'payote-luxury',
    name: 'PAYOTE LUXURY',
    subtitle: 'Experiences & Lifestyle',
    tagline: 'Operación hotelera boutique, experiencias de alta gama y valorización de marca.',
    step: '07',
    color: '#E2C775'
  }
];
