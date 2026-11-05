export interface LegalSource {
  name: string;
  entity: string;
  certifies: string;
  status: 'active' | 'down_at_source' | 'next_update';
  requirement?: string;
  note?: string;
}

export interface LegalQueryCategory {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  creditCost: number;
  sampleInputPlaceholder: string;
  sampleInputLabel: string;
  inputType: 'cedula' | 'nit' | 'placa' | 'radicado' | 'marca' | 'texto' | 'sentencia';
  sources: LegalSource[];
  summaryPoints: string[];
  caveats?: string[];
  demoData: Record<string, any>;
}

export interface PricingTier {
  id: string;
  name: string;
  priceUSD: number;
  credits: number;
  costPerCreditUSD: number;
  popular?: boolean;
  /** Cargo único de implementación (USD), p. ej. cargue de la información de la empresa. */
  setupFeeUSD?: number;
  /** true = se factura cada mes; false/undefined = pago único de créditos. */
  monthly?: boolean;
  /** true = no se compra en línea: se activa hablando con ventas. */
  contactSales?: boolean;
  idealFor: string;
  features: string[];
}

export const PAY_AS_YOU_GO_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Pack Básico',
    priceUSD: 25,
    credits: 100,
    costPerCreditUSD: 0.25,
    idealFor: 'Abogados independientes y consultas puntuales',
    features: [
      '100 créditos sin fecha de expiración',
      'Acceso a las 11 fuentes verificadas de noviembre 2026',
      'Descarga de certificados en PDF oficial',
      'Búsquedas de antecedentes y RUNT ilimitadas (1 crédito c/u)',
      'Soporte técnico por correo'
    ]
  },
  {
    id: 'pro',
    name: 'Pack Profesional',
    priceUSD: 40,
    credits: 200,
    costPerCreditUSD: 0.20,
    popular: true,
    idealFor: 'Litigantes, consultores y pequeñas firmas',
    features: [
      '200 créditos sin fecha de expiración',
      'Estados y procesos por radicado de 23 dígitos (3 créditos por consulta)',
      'Dossiers completos de sociedades (RUES + Supersociedades)',
      'Expedientes de marcas y patentes SIC',
      'Auditoría de contratación SECOP I y II (94 variables)',
      'Redacción automatizada de tutelas y peticiones'
    ]
  },
  {
    id: 'firm',
    name: 'Pack Despacho',
    priceUSD: 95,
    credits: 500,
    costPerCreditUSD: 0.19,
    idealFor: 'Firmas medianas y departamentos jurídicos in-house',
    features: [
      '500 créditos transferibles entre miembros del equipo',
      'Reporte consolidado de SAGRILAFT y beneficiarios reales',
      'Monitoreo continuo de notificaciones por Estados',
      'Exportación masiva de datos en Excel y JSON',
      'API de integración para sistemas de gestión interna'
    ]
  },
  {
    id: 'corporate',
    name: 'Pack Corporativo',
    priceUSD: 180,
    credits: 1000,
    costPerCreditUSD: 0.18,
    setupFeeUSD: 500,
    monthly: true,
    contactSales: true,
    idealFor: 'Empresas, firmas grandes y entidades que exigen un entorno exclusivo',
    features: [
      'US$500 de setup único: cargue de la información de tu empresa',
      'Alojamiento de modelo exclusivo para tu empresa',
      'Acceso solo desde el dominio empresarial',
      '1.000 créditos cada mes por US$180 (US$0,18 por crédito)',
      'Acceso multi-usuario concurrente',
      'Módulo catastral IGAC con distribución transaccional'
    ]
  }
];

export const QUERY_COST_GUIDE = [
  {
    type: 'Consultas de Antecedentes e Inhabilidades (5 fuentes en 1 clic)',
    credits: 1,
    description: 'Procuraduría + Policía + RNMC + BDME Contaduría + SICAAC'
  },
  {
    type: 'Consulta RUNT & SIMIT (Vehículos, prendas y multas)',
    credits: 1,
    description: 'Placa, VIN, propietario, prendas activas, SOAT, RTM y proyección de multas'
  },
  {
    type: 'Consulta ADRES & ReTHUS (Salud y profesionales)',
    credits: 1,
    description: 'EPS, régimen, fecha y validación de títulos médicos con sanciones'
  },
  {
    type: 'Dossier Societario RUES (Existencia y Representación)',
    credits: 2,
    description: 'Sustituto de Cámara de Comercio: 12 años de historial y 13 de finanzas'
  },
  {
    type: 'Diagnóstico Financiero e Insolvencia Supersociedades',
    credits: 2,
    description: '10 ejercicios contables, razones ROA/ROE/liquidez y cuestionario SAGRILAFT'
  },
  {
    type: 'Expediente Completo de Marca o Patente SIC',
    credits: 2,
    description: 'Clases Niza, expediente digital, actuaciones, titulares y vencimientos'
  },
  {
    type: 'Auditoría SECOP I & II (Contratación Estatal)',
    credits: 2,
    description: '94 datos por contrato, adiciones, pagos, interventor y PAA'
  },
  {
    type: 'Procesos Judiciales (23 dígitos & Estados de los últimos 5 días hábiles)',
    credits: 3,
    description: 'Historial completo de actuaciones, despacho, partes y autos en estados'
  },
  {
    type: 'Redacción Automatizada de Documento Legal (Tutela / Petición / Contrato)',
    credits: 5,
    description: 'Documento fundamentado con jurisprudencia 2026, listo para radicar'
  }
];

export const NOVEMBER_2026_QUERIES: LegalQueryCategory[] = [
  {
    id: 'antecedentes',
    number: 1,
    title: 'Antecedentes e inhabilidades de una persona',
    subtitle: 'Lo que un abogado necesita antes de contratar, posesionar o demandar a alguien.',
    creditCost: 1,
    sampleInputPlaceholder: 'Ej: 79.982.140',
    sampleInputLabel: 'Número de Cédula de Ciudadanía',
    inputType: 'cedula',
    summaryPoints: [
      'Procuraduría General: Antecedentes disciplinarios e inhabilidades vigentes',
      'Policía Nacional: Antecedentes penales y requerimientos judiciales',
      'Policía — RNMC: Medidas correctivas pendientes bajo el Código de Policía',
      'Contaduría General: Inclusión en el Boletín de Deudores Morosos del Estado (BDME) — inhabilidad para contratar y posesionarse',
      'SICAAC: Procesos de insolvencia de persona natural'
    ],
    caveats: [
      'Requisito obligatorio: Para la consulta de medidas correctivas (RNMC) se requiere la fecha de expedición de la cédula.',
      'Aviso de Fuente: La Contraloría General (responsabilidad fiscal) está caída en la fuente; en Legal-IA se informa como "NO CONSULTADO POR CAÍDA DE SERVIDOR", jamás como "sin antecedentes".',
      'Vigencia de cédula (Registraduría Nacional): No está conectada en noviembre de 2026; entra en la siguiente actualización programada.'
    ],
    sources: [
      { name: 'Procuraduría General', entity: 'PGN', certifies: 'Antecedentes disciplinarios e inhabilidades', status: 'active' },
      { name: 'Policía Nacional', entity: 'PONAL', certifies: 'Antecedentes penales', status: 'active' },
      { name: 'Policía — RNMC', entity: 'RNMC', certifies: 'Medidas correctivas pendientes (Código de Policía)', status: 'active', requirement: 'Requiere fecha de expedición de la cédula' },
      { name: 'Contaduría General', entity: 'CGN', certifies: 'Boletín de Deudores Morosos del Estado (BDME)', status: 'active' },
      { name: 'SICAAC MinJusticia', entity: 'MinJusticia', certifies: 'Procesos de insolvencia de persona natural', status: 'active' },
      { name: 'Contraloría General', entity: 'CGR', certifies: 'Boletín de Responsabilidad Fiscal', status: 'down_at_source', note: 'Caída en la fuente oficial. Se reporta como No Consultado.' },
      { name: 'Registraduría Nacional', entity: 'RNEC', certifies: 'Vigencia de cédula de ciudadanía', status: 'next_update', note: 'Prevista para la siguiente actualización.' }
    ],
    demoData: {
      documento: 'CC 79.982.140 (Bogotá D.C.)',
      fechaExpedicion: '14 de mayo de 1998',
      nombre: 'CARLOS ALBERTO RESTREPO JARAMILLO',
      procuraduria: {
        estado: 'SIN SANCIONES NI INHABILIDADES VIGENTES',
        codigoVerificacion: 'PGN-2026-981240-B',
        fechaConsulta: 'Noviembre 2026'
      },
      policia: {
        estado: 'NO REGISTRA ANTECEDENTES PENALES',
        asunto: 'Artículo 248 Constitución Política de Colombia'
      },
      rnmc: {
        estado: 'PAZ Y SALVO EN MEDIDAS CORRECTIVAS',
        expediente: 'Sin comparendos pendientes de pago'
      },
      bdme: {
        estado: 'NO REPORTADO EN BOLETÍN DE DEUDORES MOROSOS',
        habilidadContratar: 'HABILITADO PARA CONTRATAR Y EJERCER CARGOS PÚBLICOS'
      },
      sicaac: {
        estado: 'SIN PROCESOS DE INSOLVENCIA DE PERSONA NATURAL',
        centroConciliacion: 'Ningún trámite en curso'
      },
      contraloria: {
        estado: 'NO CONSULTADO (FUENTE OFICIAL CGR EN MANTENIMIENTO)',
        alerta: 'Legal-IA nunca asume ausencia de responsabilidad si el servidor oficial no responde.'
      }
    }
  },
  {
    id: 'sociedad',
    number: 2,
    title: 'Existencia y representación legal de una sociedad',
    subtitle: 'Sustituye un certificado de cámara de comercio en una sola consulta estructurada.',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: 900.123.456-1 o razón social',
    sampleInputLabel: 'NIT o Razón Social',
    inputType: 'nit',
    summaryPoints: [
      'Matrícula mercantil y cámara de comercio de jurisdicción',
      'Estado del registro, categoría y tipo societario (SAS, SA, Ltda.)',
      'Fechas de constitución, última renovación y vigencia de la sociedad',
      'Actividad económica principal y secundaria (Códigos CIIU)',
      '12 años de historial verificado de renovaciones mercantiles',
      '13 años de cifras financieras históricas reportadas',
      'Representante legal principal y suplentes con cédula y rol exacto',
      'Búsqueda inteligente por razón social cuando no se dispone del NIT'
    ],
    sources: [
      { name: 'RUES / Confecámaras', entity: 'Cámaras de Comercio', certifies: 'Matrícula, estado, renovación, representantes y CIIU', status: 'active' },
      { name: 'Registro Mercantil Histórico', entity: 'RUES', certifies: '12 años de renovaciones y 13 años de finanzas', status: 'active' }
    ],
    demoData: {
      nit: '900.123.456-1',
      razonSocial: 'INVERSIONES Y TECNOLOGÍA ANDINA S.A.S.',
      camaraComercio: 'Cámara de Comercio de Bogotá',
      matricula: '02894102',
      estado: 'ACTIVA (Renovada año 2026)',
      tipo: 'Sociedad por Acciones Simplificada (S.A.S.)',
      fechaConstitucion: '22 de Marzo de 2011',
      vigencia: 'Indefinida',
      ciiu: '6201 (Desarrollo de software) / 6202 (Consultoría informática)',
      representantes: [
        { rol: 'Representante Legal Principal', nombre: 'MARÍA FERNANDA OSPINA DUQUE', cedula: 'CC 52.891.440' },
        { rol: 'Representante Legal Suplente', nombre: 'ANDRÉS FELIPE MEJÍA GÓMEZ', cedula: 'CC 80.114.730' }
      ],
      historialRenovaciones: '12 años consecutivos al día (2014 - 2026)',
      cifrasFinancierasRecientes: {
        activosTotales: '$ 4.820.000.000 COP',
        pasivos: '$ 1.290.000.000 COP',
        patrimonioNeto: '$ 3.530.000.000 COP'
      }
    }
  },
  {
    id: 'financiera-insolvencia',
    number: 3,
    title: 'Situación financiera y de insolvencia de una sociedad',
    subtitle: 'Auditoría profunda en Superintendencia de Sociedades con indicadores precalculados.',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: 860.001.234-5',
    sampleInputLabel: 'NIT de la Sociedad',
    inputType: 'nit',
    summaryPoints: [
      'Grado de supervisión oficial: inspección, vigilancia o control',
      'Procesos de insolvencia activos y cerrados (Ley 1116 de 2006)',
      '10 ejercicios completos de estados financieros',
      'Razones financieras ya calculadas: endeudamiento, liquidez, ROA, ROE y margen neto',
      'Notas a los estados financieros, incluido cuestionario SAGRILAFT y beneficiarios reales',
      'Número de empleados directos y domicilio judicial'
    ],
    caveats: [
      'Nota de alcance: El estado de resultados viene agregado en la fuente; en varios ejercicios anuales Supersociedades no publica ingresos desglosados ni costo de ventas.'
    ],
    sources: [
      { name: 'Superintendencia de Sociedades', entity: 'Supersociedades', certifies: 'Grado de supervisión, Ley 1116, 10 balances, SAGRILAFT', status: 'active' },
      { name: 'Sistema Integrado de Información Societaria (SIIS)', entity: 'Supersociedades', certifies: 'Ratios financieros e historial de insolvencia', status: 'active' }
    ],
    demoData: {
      nit: '860.001.234-5',
      sociedad: 'CONSTRUCTORA METROPOLITANA DE COLOMBIA S.A.',
      supervision: 'VIGILANCIA (Decreto 1074 de 2015)',
      insolvencia: 'SIN PROCESOS DE INSOLVENCIA NI REORGANIZACIÓN (Ley 1116)',
      ejerciciosDisponibles: '10 ejercicios reportados (2016-2025)',
      ratiosCalculados: {
        endeudamiento: '34.8%',
        liquidezCorriente: '2.14x',
        roa: '8.4%',
        roe: '14.2%',
        margenEbitda: '18.7%'
      },
      sagrilaft: 'Cuestionario SAGRILAFT radicado y sin hallazgos restrictivos',
      empleados: '142 directos',
      domicilio: 'Calle 93B # 12-48, Bogotá D.C.'
    }
  },
  {
    id: 'marcas',
    number: 4,
    title: 'Marcas, patentes y diseños industriales',
    subtitle: 'Acceso total a la base de la Superintendencia de Industria y Comercio (SIC).',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: LEGAL-IA o nombre del titular',
    sampleInputLabel: 'Denominación de Marca o Titular',
    inputType: 'marca',
    summaryPoints: [
      'Búsqueda de marca por denominación, estado, clases de Niza y titular',
      'Expediente completo: naturaleza del signo (mixto, nominativo, figurativo)',
      'Fechas de radicación, publicación en gaceta y vigencia',
      'Clases de Niza con su descripción literal transcrita',
      'Partes involucradas con documento de identidad y dirección de notificación',
      'Historial de actuaciones, imágenes del signo y PDFs del trámite',
      'Portafolio completo de marcas registradas a nombre de un titular'
    ],
    sources: [
      { name: 'Superintendencia de Industria y Comercio', entity: 'SIC (SIPI)', certifies: 'Expediente marcario, oposiciones, títulos y clases Niza', status: 'active' }
    ],
    demoData: {
      denominacion: 'LEGAL-IA',
      claseNiza: 'Clase 42 (Servicios tecnológicos y software SaaS) y Clase 45 (Servicios jurídicos)',
      estado: 'REGISTRO CONCEDIDO',
      expediente: 'SD2024/0084912',
      titular: 'TECNOLOGÍA JURÍDICA COLOMBIANA S.A.S. (NIT 901.884.210)',
      vigencia: 'Vence el 15 de Noviembre de 2034',
      oposiciones: 'Superada sin oposiciones de terceros',
      documentosDisponibles: 'Certificado de registro digital en PDF descargable'
    }
  },
  {
    id: 'vehiculos',
    number: 5,
    title: 'Vehículos, comparendos y conductores',
    subtitle: 'Interrogación combinada en tiempo real de las bases RUNT y SIMIT.',
    creditCost: 1,
    sampleInputPlaceholder: 'Ej: BKS-412 o VIN',
    sampleInputLabel: 'Placa del Vehículo o Código VIN',
    inputType: 'placa',
    summaryPoints: [
      'Identificación completa del automotor por placa o por VIN',
      'Propietario registrado y expediente unificado en una sola consulta',
      'Prendas y limitaciones a la propiedad con NIT del acreedor financiero',
      'SOAT vigente y vencidos con aseguradora emisora y fechas',
      'Revisión técnico-mecánica y de emisiones contaminantes',
      'Historial de trámites y traspasos previos',
      'Comparendos proyectados a tres momentos: hoy (descuento), en resolución y en cobro coactivo',
      'Licencia de conducción del titular: categorías, vigencia y estado'
    ],
    sources: [
      { name: 'Registro Único Nacional de Tránsito', entity: 'RUNT', certifies: 'Datos del vehículo, propietario, prendas, SOAT y RTM', status: 'active' },
      { name: 'Sistema Integrado de Multas e Infracciones', entity: 'SIMIT', certifies: 'Comparendos, resoluciones y cobros coactivos', status: 'active' }
    ],
    demoData: {
      placa: 'BKS-412',
      marcaLinea: 'TOYOTA COROLLA CROSS XEI HÍBRIDO',
      modelo: '2023',
      vin: '9BRBL3HEXPP104821',
      propietario: 'ALEJANDRO VARGAS PINZÓN (CC 1.018.420.914)',
      prendas: 'Prenda activa a favor de BANCO DAVIVIENDA S.A. (NIT 860.034.313-7)',
      soat: 'VIGENTE hasta 18/09/2027 (Seguros del Estado)',
      rtm: 'EXENTO POR MODELO (Primera RTM requerida en 2028)',
      comparendos: {
        total: 1,
        infraccion: 'C02 (Estacionar en sitio prohibido)',
        valorHoyConDescuento: '$ 290.000 COP (Con curso pedagógico)',
        valorEnResolucion: '$ 580.000 COP',
        valorCobroCoactivo: '$ 715.000 COP (+ costas procesales)'
      },
      licenciaConduccion: 'Categorías B1 y C1 VIGENTES hasta 2032'
    }
  },
  {
    id: 'salud',
    number: 6,
    title: 'Salud y acreditación profesional médica',
    subtitle: 'Verificación en ADRES y Registro de Talento Humano en Salud (ReTHUS).',
    creditCost: 1,
    sampleInputPlaceholder: 'Ej: 52.341.980',
    sampleInputLabel: 'Cédula del Paciente o Profesional',
    inputType: 'cedula',
    summaryPoints: [
      'ADRES: EPS actual, régimen (contributivo o subsidiado) y tipo de afiliado (cotizante/beneficiario)',
      'ADRES: Estado y fecha exacta de afiliación al sistema general de salud',
      'ADRES: Deudas por accidentes de tránsito atendidos sin SOAT',
      'ReTHUS: Profesionales de la salud: títulos universitarios, servicio social obligatorio y sanciones ético-disciplinarias'
    ],
    sources: [
      { name: 'ADRES BDUA', entity: 'ADRES', certifies: 'EPS, régimen, cotizante y deudas no SOAT', status: 'active' },
      { name: 'ReTHUS MinSalud', entity: 'MinSalud', certifies: 'Títulos de médicos/especialistas, servicio social y sanciones', status: 'active' }
    ],
    demoData: {
      documento: 'CC 52.341.980',
      nombre: 'DRA. CLAUDIA PATRICIA GÓMEZ NAVAS',
      adres: {
        eps: 'SANITAS EPS',
        regimen: 'CONTRIBUTIVO',
        tipoAfiliado: 'COTIZANTE PRINCIPAL',
        estado: 'ACTIVO',
        fechaAfiliacion: '01/04/2008',
        deudaAccidenteSinSoat: 'SIN DEUDAS REGISTRADAS'
      },
      rethus: {
        profesion: 'MÉDICO Y CIRUJANO (Universidad Nacional de Colombia - 2004)',
        especialidad: 'ORTOPEDIA Y TRAUMATOLOGÍA (Pontificia Universidad Javeriana - 2009)',
        servicioSocial: 'CUMPLIDO (Hospital San Rafael de Facatativá)',
        sancionesTribunalEtica: 'SIN SANCIONES DEL TRIBUNAL DE ÉTICA MÉDICA'
      }
    }
  },
  {
    id: 'contratacion-estatal',
    number: 7,
    title: 'Contratación estatal (SECOP I y II)',
    subtitle: '94 variables por contrato público, adiciones, pagos y planes anuales de compras.',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: 900.555.123-4 o Código de Proceso',
    sampleInputLabel: 'NIT del Proveedor o Entidad',
    inputType: 'nit',
    summaryPoints: [
      'Contratos de un proveedor o entidad con 94 campos estructurados por contrato',
      'Adiciones en tiempo y dinero, valor facturado y valor efectivamente pagado',
      'Anticipos otorgados, estado de amortización y pólizas de cumplimiento',
      'Fuentes de financiación, supervisor asignado y ordenador del gasto',
      'Procesos en curso: fase, estado, oferentes invitados y ofertas radicadas',
      'Adjudicaciones oficiales y actas de liquidación',
      'Planes Anuales de Adquisiciones (PAA), con presupuesto y umbrales de menor cuantía'
    ],
    caveats: [
      'Aviso de Fuente: La verificación de sanciones e inhabilidades contractuales dentro de SECOP está caída en la fuente oficial; se advierte expresamente en el informe.'
    ],
    sources: [
      { name: 'SECOP I & II (Colombia Compra Eficiente)', entity: 'CCE', certifies: '94 variables contractuales, adiciones, pagos y PAA', status: 'active' },
      { name: 'Módulo de Sanciones SECOP', entity: 'CCE', certifies: 'Historial de multas y sanciones contractuales', status: 'down_at_source', note: 'Caída en la fuente oficial de CCE.' }
    ],
    demoData: {
      entidadOProveedor: 'NIT 900.555.123-4 (SOLUCIONES DE INFRAESTRUCTURA VIAL S.A.S.)',
      contratosTotal: 18,
      montoTotalContratado: '$ 34.200.000.000 COP',
      contratoDestacado: {
        idContrato: 'CO1.PCCNTR.4819021',
        objeto: 'Mantenimiento preventivo de malla vial rural secundaria fase IV',
        entidad: 'Gobernación de Cundinamarca',
        valorInicial: '$ 4.100.000.000 COP',
        adicion: '$ 1.200.000.000 COP (29.2% - Dentro del tope legal del 50%)',
        valorPagado: '$ 5.300.000.000 COP',
        estado: 'LIQUIDADO POR MUTUO ACUERDO',
        supervisor: 'Ing. Mauricio Henao (Secretaría de Obras Públicas)'
      },
      procesosEnCurso: '2 licitaciones públicas en fase de evaluación de ofertas',
      sancionesSecop: 'NO CONSULTADO POR INTERMITENCIA EN EL SERVIDOR DE COLOMBIA COMPRA EFICIENTE'
    }
  },
  {
    id: 'tributario-comercio',
    number: 8,
    title: 'Tributario y comercio exterior (DIAN)',
    subtitle: 'Doctrina oficial íntegra, 10 años de comercio exterior y rankings sectoriales.',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: 800.222.333-8 o Tema tributario',
    sampleInputLabel: 'NIT o Término de Doctrina DIAN',
    inputType: 'nit',
    summaryPoints: [
      'DIAN Doctrina: Conceptos jurídicos, oficios y providencias tributarias con su texto íntegro',
      'DIAN Comercio Exterior: 10 años completos de importaciones y exportaciones asociadas a un NIT',
      'Valores declarados en dólares FOB/CIF, peso neto en kilogramos y partidas arancelarias declaradas',
      'DIAN Directorio: Ranking oficial de importadores y exportadores por sector económico'
    ],
    sources: [
      { name: 'DIAN — Doctrina', entity: 'DIAN', certifies: 'Conceptos, oficios y resoluciones con texto completo', status: 'active' },
      { name: 'DIAN — Comercio Exterior', entity: 'DIAN', certifies: '10 años de operaciones aduaneras por NIT', status: 'active' },
      { name: 'DIAN — Directorio y Estadísticas', entity: 'DIAN', certifies: 'Posición y ranking de importador/exportador', status: 'active' }
    ],
    demoData: {
      nit: '800.222.333-8',
      razonSocial: 'AGROEXPORTACIONES DEL CARIBE S.A.',
      comercioExterior10Anos: {
        totalExportadoUSD: '$ 78.450.000 USD (2016-2026)',
        partidasArancelarias: '0803.90.11.00 (Plátanos frescos), 0901.11.90.00 (Café especial)',
        destinosPrincipales: 'Estados Unidos (44%), Países Bajos (32%), Alemania (18%)',
        importacionesInsumosUSD: '$ 4.120.000 USD'
      },
      rankingDian: 'Top 50 Exportadores del sector agroindustrial',
      doctrinaRecienteAplicable: 'Concepto DIAN 01429 de 2025: Tratamiento de IVA en fletes internacionales'
    }
  },
  {
    id: 'jurisprudencia',
    number: 9,
    title: 'Jurisprudencia y doctrina estructurada',
    subtitle: 'Consejo de Estado (SAMAI), Corte Constitucional por sentencia y Disciplina Judicial.',
    creditCost: 2,
    sampleInputPlaceholder: 'Ej: C-055/22 o T-025/04',
    sampleInputLabel: 'Número de Sentencia o Despacho',
    inputType: 'sentencia',
    summaryPoints: [
      'Consejo de Estado (SAMAI): Problema jurídico, respuesta de fondo, tesis doctrinal, descriptores y fuentes formales estructurados por la relatoría, más procesos por parte',
      'Corte Constitucional: Sentencia exacta por número, con derechos fundamentales invocados y protegidos, síntesis de instancias previas, decisión resolutiva y texto completo',
      'Comisión Nacional de Disciplina Judicial: Providencias disciplinarias contra abogados y funcionarios',
      'Superintendencia Financiera: Doctrina vinculante, fallos en funciones jurisdiccionales y circulares externas'
    ],
    caveats: [
      'Aviso de Fuente: La búsqueda abierta por texto libre en Corte Suprema, Corte Constitucional y Consejo de Estado está caída en la fuente oficial. En Legal-IA la Corte Constitucional se consulta con precisión por número de sentencia y la jurisdicción contenciosa se cubre mediante SAMAI.'
    ],
    sources: [
      { name: 'Consejo de Estado (SAMAI)', entity: 'SAMAI', certifies: 'Tesis, problema jurídico, relatoría y procesos por parte', status: 'active' },
      { name: 'Corte Constitucional', entity: 'Relatoría', certifies: 'Sentencia por número, derechos tutelados y ratio decidendi', status: 'active', requirement: 'Consulta por número de sentencia (Ej: T-123/24 o C-055/22)' },
      { name: 'Comisión Nal. de Disciplina Judicial', entity: 'CNDJ', certifies: 'Providencias disciplinarias de jueces y litigantes', status: 'active' },
      { name: 'Superintendencia Financiera', entity: 'SFC', certifies: 'Doctrina, fallos jurisdiccionales y circulares', status: 'active' },
      { name: 'Búsqueda Texto Libre Cortes', entity: 'Rama Judicial', certifies: 'Búsqueda abierta por texto en CSJ, CC y CE', status: 'down_at_source', note: 'Caída en la fuente oficial.' }
    ],
    demoData: {
      sentenciaConsultada: 'Sentencia C-055 de 2022 (M.P. Antonio José Lizarazo y Alberto Rojas)',
      derechosInvocados: 'Dignidad humana, libre desarrollo de la personalidad, salud reproductiva e igualdad',
      problemaJuridico: '¿Vulnera el artículo 122 del Código Penal los derechos de las mujeres al tipificar la IVE sin excepciones temporales?',
      decision: 'INEXEQUIBILIDAD CONDICIONADA: La conducta solo es típica a partir de la semana 24 de gestación; sin límite en las causales de la Sentencia C-355 de 2006.',
      samaiVinculado: '14 procesos contencioso-administrativos con doctrina asimilada en Consejo de Estado',
      textoCompletoDisponible: 'Gaceta Constitucional digital con firma digital'
    }
  },
  {
    id: 'procesos-judiciales',
    number: 10,
    title: 'Procesos judiciales y estados',
    subtitle: 'Radicación de 23 dígitos y verificación de notificaciones por Estados electrónicos.',
    creditCost: 3,
    sampleInputPlaceholder: 'Ej: 11001310300120230045600 (23 dígitos)',
    sampleInputLabel: 'Radicado Judicial de 23 Dígitos',
    inputType: 'radicado',
    summaryPoints: [
      'Consulta judicial completa por número de radicación único de 23 dígitos',
      'Despacho judicial de conocimiento, estado actual del trámite y etapas procesales',
      'Partes procesales (demandante, demandado, apoderados y llamados en garantía)',
      'Historial cronológico de todas las actuaciones registradas en el sistema',
      'Verificación automatizada de inclusión en notificaciones por Estados electrónicos',
      'Número de estado, fecha exacta de fijación y transcripción íntegra de la anotación del auto'
    ],
    sources: [
      { name: 'Rama Judicial — Justicia XXI Web', entity: 'Consejo Superior de la Judicatura', certifies: '23 dígitos, actuaciones, autos y estados electrónicos', status: 'active' },
      { name: 'Portal de Estados Electrónicos', entity: 'Rama Judicial', certifies: 'Fijación de estados, fecha de ejecutoria y auto', status: 'active' }
    ],
    demoData: {
      radicado: '11001310300120230045600',
      despacho: 'JUZGADO 01 CIVIL DEL CIRCUITO DE BOGOTÁ',
      claseProceso: 'Verbal de Mayor Cuantía (Responsabilidad Civil Contractual)',
      demandante: 'LOGÍSTICA INTERNACIONAL S.A.S.',
      demandado: 'ASEGURADORA DE GARANTÍAS GLOBALES S.A.',
      ultimaActuacion: {
        fecha: '28 de Octubre de 2026',
        actuacion: 'Auto resuelve solicitud de pruebas decretadas de oficio',
        anotacion: 'Se fija fecha para continuación de audiencia del artículo 373 del CGP para el día 18 de Noviembre de 2026.'
      },
      notificacionPorEstado: {
        estadoNumero: 'Estado Electrónico No. 142',
        fechaFijacion: '29 de Octubre de 2026',
        terminoEjecutoria: '30 de Octubre al 4 de Noviembre de 2026'
      }
    }
  },
  {
    id: 'herramientas-apoyo',
    number: 11,
    title: 'Herramientas de apoyo judicial y catastral',
    subtitle: 'Directorio oficial de despachos, trámites SUIT y estadísticas de transacciones IGAC.',
    creditCost: 1,
    sampleInputPlaceholder: 'Ej: Juzgado 15 Civil Bogotá o Municipio',
    sampleInputLabel: 'Despacho, Trámite o Municipio',
    inputType: 'texto',
    summaryPoints: [
      'Rama Judicial: Directorio oficial de despachos judiciales con código de despacho y correo electrónico institucional de radicación',
      'SUIT / gov.co: Catálogo oficial de trámites del Estado: tiempo de respuesta, si es 100% en línea y enlace directo al portal',
      'IGAC: Estadísticas catastrales a nivel municipal',
      'IGAC: Distribución transaccional (mediana, valor mínimo y valor máximo) según tipo de acto: compraventa, hipoteca, leasing habitacional y fiducia mercantil'
    ],
    sources: [
      { name: 'Rama Judicial — Directorio', entity: 'CSJ', certifies: 'Correo oficial, dirección física y código de juzgados', status: 'active' },
      { name: 'SUIT / gov.co (Función Pública)', entity: 'MinTIC / DAFP', certifies: 'Trámites del Estado, requisitos y tiempos oficiales', status: 'active' },
      { name: 'IGAC (Catastro)', entity: 'IGAC', certifies: 'Mediana, mínimos y máximos por compraventa/hipoteca/leasing', status: 'active' }
    ],
    demoData: {
      municipio: 'MEDELLÍN (Antioquia)',
      directorioDespachos: [
        { despacho: 'Juzgado 01 Administrativo Oral de Medellín', codigo: '050013333001', correo: 'jadmin01med@cendoj.ramajudicial.gov.co' },
        { despacho: 'Juzgado 05 Laboral del Circuito de Medellín', codigo: '050013105005', correo: 'jlab05med@cendoj.ramajudicial.gov.co' }
      ],
      suitTramite: {
        nombre: 'Expedición de Certificado de Tradición y Libertad',
        entidad: 'Superintendencia de Notariado y Registro',
        esEnLinea: '100% En Línea',
        tiempoRespuesta: 'Inmediato (descarga PDF con código seguro)'
      },
      igacTransacciones: {
        tipoActo: 'Compraventa de Inmuebles Urbanos (Últimos 12 meses)',
        medianaTransaccion: '$ 420.000.000 COP',
        valorMinimo: '$ 95.000.000 COP (Vivienda VIS)',
        valorMaximo: '$ 3.850.000.000 COP (Sector El Poblado)',
        tipoHipotecas: 'Mediana de gravamen hipotecario: $ 260.000.000 COP'
      }
    }
  }
];

export const LEGAL_AGENTS = [
  {
    code: 'LEX-01',
    name: 'Lex Litigia',
    role: 'Especialista en Procesal Civil & Constitucional',
    avatar: '⚖️',
    description: 'Calcula términos de ejecutoria, elabora tutelas, desacatos y monitorea estados judiciales 24/7.',
    tools: ['Rama Judicial', 'Corte Constitucional', 'SAMAI']
  },
  {
    code: 'CON-02',
    name: 'Contractia',
    role: 'Arquitectura Contractual & Riesgo Societario',
    avatar: '🏢',
    description: 'Cruza RUES, Supersociedades y SAGRILAFT para redactar contratos blindados contra insolvencia.',
    tools: ['RUES', 'Supersociedades', 'Cámaras de Comercio']
  },
  {
    code: 'LAB-03',
    name: 'Laboris',
    role: 'Derecho Laboral Individual y Seguridad Social',
    avatar: '🩺',
    description: 'Valida cotizaciones en ADRES, liquida indemnizaciones complejas y atiende requerimientos de la UGPP.',
    tools: ['ADRES BDUA', 'ReTHUS', 'UGPP']
  },
  {
    code: 'PUB-04',
    name: 'Jus Publica',
    role: 'Contratación Estatal & Administrativo',
    avatar: '🏛️',
    description: 'Examina 94 métricas de SECOP I y II, auditoría de adiciones, PAA y demandas de nulidad y restablecimiento.',
    tools: ['SECOP I', 'SECOP II', 'SUIT']
  },
  {
    code: 'CORP-05',
    name: 'Corporia IP',
    role: 'Propiedad Intelectual & Marcas',
    avatar: '🛡️',
    description: 'Vigila oposiciones en la SIC, clases de Niza y diseña defensas de signos distintivos y patentes.',
    tools: ['Superintendencia SIC', 'Gaceta de PI', 'Clases Niza']
  },
  {
    code: 'TRIB-06',
    name: 'Tributar-ia',
    role: 'Especialista Tributario y Contable',
    avatar: '🧾',
    description: 'Resuelve consultas tributarias y contables con la doctrina de la DIAN con texto íntegro y los datos de comercio exterior de un NIT.',
    tools: ['DIAN Doctrina', 'DIAN Comercio exterior', 'DIAN Directorio']
  }
];


/**
 * Enlaces de pago (Stripe Checkout) por precio en USD. Los packs sin enlace propio van al chat.
 * IMPORTANTE: los enlaces checkout.stripe.com/c/pay/cs_... son sesiones de Checkout y caducan.
 * Para un botón permanente usa un Payment Link (buy.stripe.com/...).
 */
export const CHAT_URL = 'https://chat.legal-ia.co/';
export const CHECKOUT_URL_BY_PRICE: Record<number, string> = {
  25: 'https://checkout.stripe.com/c/pay/cs_live_b1XlVQpygtjv5P8PYrI0UywH3zf5jWiaMa7zKNH5527ih79EBqgxhvoQyc#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicyc%2FNSkndnF3bHVgRGZmanBrcSc%2FJ2RmZnFaNFEySmRTV2gzSlVyN2RfZicpJ2R1bE5gfCc%2FJ3VuWmlsc2BaMDRLaGNRbUFBQEZVVkxKdnN8X1N3UlRVQGBuNzwxQ1A3UUhiTVBNb2hnYDRcNV9ONm9vcHRKbUZncm92TDBRbmxhNUFKXFRfYTRpMldcVHNWZ2lAU3RkXTU1NVVMSVBJaUY2JyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJ3gl',
  40: 'https://checkout.stripe.com/c/pay/cs_live_b1WA3Tb0JzTQShawrDafj8JfGOsAFu1dkVblHS2Nh9H7HViaqppiLmjnbd#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicyc%2FNSkndnF3bHVgRGZmanBrcSc%2FJ2RmZnFaNFEySmRTV2gzSlVyN2RfZicpJ2R1bE5gfCc%2FJ3VuWmlsc2BaMDRLaGNRbUFBQEZVVkxKdnN8X1N3UlRVQGBuNzwxQ1A3UUhiTVBNb2hnYDRcNV9ONm9vcHRKbUZncm92TDBRbmxhNUFKXFRfYTRpMldcVHNWZ2lAU3RkXTU1NVVMSVBJaUY2JyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJ3gl',
};
export const checkoutUrlFor = (priceUSD: number): string => CHECKOUT_URL_BY_PRICE[priceUSD] ?? CHAT_URL;
