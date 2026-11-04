/**
 * Mensaje por audiencia. Cada versión de la landing vive en su propio dominio:
 *   1 · legal-ia.co               → abogados que quieren acelerar su flujo de trabajo
 *   2 · emprendedor.legal-ia.co   → emprendedores y pymes sin presupuesto para un abogado de planta
 *   3 · contador.legal-ia.co      → contadores y asesores tributarios, con el especialista Tributar-ia
 *   4 · estados.legal-ia.co       → abogados que siguen procesos: estados y consulta por radicado
 */
export type Variant = 1 | 2 | 3 | 4;

export interface ComparisonCopy {
  /** Nombres de las dos primeras opciones si difieren de los predeterminados. */
  labels?: { traditional: string; generic: string };
  heading: string;
  subheading: string;
  traditional: { price: string; priceUnit: string; points: string[]; footer: string };
  generic: { price: string; priceUnit: string; points: string[]; footer: string };
  legalia: { price: string; priceUnit: string; points: string[]; footer: string };
}

export interface HeroCopy {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  lead: string;
}

/** Puntos de datos compartidos entre audiencias (privacidad). */
const GENERIC_PRIVACY = [
  'Comparte los datos que escribes para entrenar sus modelos.',
  'Riesgo de incumplir la Ley 1581 de 2012 (Habeas Data) al cargar datos de clientes o de terceros.'
];
const LEGALIA_ZDR =
  'ZDR (Zero Data Retention): lo que escribes y los documentos que generas no se almacenan en el proveedor del modelo ni se usan para entrenarlo.';

const GENERIC_BASE = [
  'Alucina leyes colombianas que no existen o inventa sentencias T inexistentes.',
  'Cita artículos derogados por el CGP o el CPACA.',
  'No consulta en tiempo real RUES, SIMIT, RUNT ni notificaciones de la Rama Judicial.'
];

export const COMPARISON: Record<Variant, ComparisonCopy> = {
  1: {
    heading: 'Hasta hoy solo existían dos caminos insatisfactorios',
    subheading:
      'Redactar todo a mano consume tu tiempo facturable y una IA genérica pone en riesgo la reserva de tus clientes. Legal-IA asume la ejecución del trabajo.',
    traditional: {
      price: '~$800.000 COP',
      priceUnit: '/ consulta o tutela',
      points: [
        'Tarda de 15 a 30 días hábiles en radicar un documento básico.',
        'Cobro por horas: cada borrador redactado a mano es tiempo que no dedicas al criterio jurídico.',
        'Errores humanos frecuentes en el cómputo de términos de ejecutoria.'
      ],
      footer: 'Lento, manual y costoso.'
    },
    generic: {
      price: '$20 USD/mes',
      priceUnit: '/ suscripción pasiva',
      points: [...GENERIC_BASE, ...GENERIC_PRIVACY],
      footer: 'Peligroso para actuaciones procesales y para la reserva de tus clientes.'
    },
    legalia: {
      price: '$40 USD = 200 créditos',
      priceUnit: 'Pay As You Go',
      points: [
        'Borrador fundamentado en minutos para que tú lo revises, ajustes y radiques.',
        '11 registros oficiales para verificar partes, procesos y contratos (RUES, SAMAI, SECOP).',
        LEGALIA_ZDR,
        'Tus créditos nunca vencen. Cero suscripciones mensuales forzadas.'
      ],
      footer: 'Rápido, verificado a noviembre de 2026 y con privacidad ZDR.'
    }
  },
  2: {
    heading: '¿Por qué el modelo actual no funciona para una pyme?',
    subheading:
      'Un abogado de planta es inalcanzable para un emprendimiento y una IA genérica expone los datos de tu empresa. Esta es la comparativa entre las alternativas que tienes hoy en Colombia.',
    traditional: {
      price: '~$800.000 COP',
      priceUnit: '/ consulta o tutela',
      points: [
        'Tarda de 15 a 30 días hábiles en radicar un documento básico.',
        'Honorarios por horas o mínimos que una pyme no puede sostener mes a mes.',
        'Solo atiende en horario de oficina y por la disponibilidad de una persona.'
      ],
      footer: 'Lento, manual y prohibitivo para empezar.'
    },
    generic: {
      price: '$20 USD/mes',
      priceUnit: '/ suscripción pasiva',
      points: [...GENERIC_BASE, ...GENERIC_PRIVACY],
      footer: 'Peligroso para trámites formales y para los datos de tu empresa.'
    },
    legalia: {
      price: '$40 USD = 200 créditos',
      priceUnit: 'Pay As You Go',
      points: [
        'Documento listo sin contratar un abogado de planta ni pagar honorarios por hora.',
        'Verifica a tu proveedor, cliente o arrendador en RUES, Supersociedades y SECOP antes de firmar.',
        LEGALIA_ZDR,
        'Pagas solo lo que usas y tus créditos nunca vencen.'
      ],
      footer: 'Disponible 24/7, a tu medida y con privacidad ZDR.'
    }
  },
  3: {
    heading: 'Tres formas de resolver una consulta tributaria',
    subheading:
      'Compara el costo, el riesgo y la privacidad de la información de tus clientes entre un asesor externo, una IA genérica y Tributar-ia.',
    traditional: {
      price: '~$800.000 COP',
      priceUnit: '/ consulta',
      points: [
        'Buscar y leer doctrina de la DIAN a mano consume horas por cada consulta.',
        'Honorarios por horas que no escalan con tu cartera de clientes.',
        'Depende de la disponibilidad de una sola persona.'
      ],
      footer: 'Lento, manual y difícil de escalar.'
    },
    generic: {
      price: '$20 USD/mes',
      priceUnit: '/ suscripción pasiva',
      points: [
        'Alucina conceptos y oficios de la DIAN que no existen.',
        'No consulta en tiempo real la doctrina ni el comercio exterior de un NIT.',
        ...GENERIC_PRIVACY
      ],
      footer: 'Peligroso para la reserva de la información de tus clientes.'
    },
    legalia: {
      price: '$40 USD = 200 créditos',
      priceUnit: 'Pay As You Go',
      points: [
        'Tributar-ia consulta la doctrina de la DIAN (conceptos, oficios y providencias) con el texto íntegro.',
        'Comercio exterior: 10 años de importaciones y exportaciones de un NIT.',
        LEGALIA_ZDR,
        'Pagas por consulta y tus créditos nunca vencen.'
      ],
      footer: 'Especialista tributario, verificado a noviembre de 2026 y con privacidad ZDR.'
    }
  },
  4: {
    labels: { traditional: 'Revisión manual', generic: 'IA genérica (ChatGPT, etc.)' },
    heading: 'Tres formas de saber si tu proceso se movió',
    subheading:
      'Entrar despacho por despacho consume tu día y una IA genérica no puede revisar los estados en tiempo real. Compara las alternativas.',
    traditional: {
      price: 'Horas de tu semana',
      priceUnit: '/ cartera de procesos',
      points: [
        'Revisar los estados de cada despacho, uno por uno, todos los días.',
        'Riesgo de que un auto con términos pase sin que lo veas a tiempo.',
        'Cada proceso nuevo en tu cartera suma más tiempo de revisión.'
      ],
      footer: 'Lento, repetitivo y fácil de olvidar.'
    },
    generic: {
      price: '$20 USD/mes',
      priceUnit: '/ suscripción pasiva',
      points: [
        'No consulta en tiempo real los estados ni los procesos de la Rama Judicial.',
        'Puede inventar actuaciones o autos que no existen.',
        ...GENERIC_PRIVACY
      ],
      footer: 'Peligroso para el seguimiento de procesos y para la reserva de tus clientes.'
    },
    legalia: {
      price: '3 créditos',
      priceUnit: 'por consulta',
      points: [
        'Le das el radicado al chat y revisa los estados de los últimos 5 días hábiles.',
        'Si salió en estado: número de estado, fecha y anotación del auto.',
        'Consulta también la información del proceso publicada en la Rama Judicial.',
        LEGALIA_ZDR
      ],
      footer: 'Si una fuente no responde, te lo dice. Nunca informa «sin movimiento» por error.'
    }
  }
};

export const HERO: Record<Variant, HeroCopy> = {
  1: {
    eyebrow: 'Para abogados y firmas · Colombia',
    headline: 'Tú pones los hechos.',
    headlineAccent: 'Nosotros ponemos el derecho.',
    lead:
      'Legal-IA es el copiloto de los abogados que quieren acelerar su flujo de trabajo: redacta el primer borrador fundamentado, verifica a las partes en 11 registros oficiales colombianos y te devuelve tiempo para lo que sí requiere tu criterio.'
  },
  2: {
    eyebrow: 'Para emprendedores y pymes · Colombia',
    headline: 'Un área jurídica disponible 24/7.',
    headlineAccent: 'Sin nómina de abogados.',
    lead:
      'Si tu empresa todavía no alcanza para tener un abogado de planta, Legal-IA te acompaña. Cuéntale lo que pasó con tus palabras y recibe el documento listo. Verifica a tu proveedor, cliente o arrendador en registros oficiales antes de firmar. En asuntos de alto riesgo te recomienda un abogado humano.'
  },
  3: {
    eyebrow: 'Para contadores y asesores tributarios · Colombia',
    headline: 'Tributar-ia, tu especialista',
    headlineAccent: 'tributario y contable.',
    lead:
      'Consulta la doctrina de la DIAN con el texto íntegro, revisa 10 años de importaciones y exportaciones de un NIT y resuelve las dudas tributarias de tus clientes con un especialista que trabaja cuando tú lo necesitas.'
  },
  4: {
    eyebrow: 'Para abogados que siguen procesos · Colombia',
    headline: '¿Se movió tu proceso?',
    headlineAccent: 'Pregúntale al chat con el radicado.',
    lead:
      'Dale a Legal-IA el número de radicado y revisa en segundos los estados de los últimos 5 días hábiles, además de la información del proceso publicada en la Rama Judicial.'
  }
};

export const RETURNING_TERMS_LAWYERS = [
  'el borrador de tu tutela',
  'tu derecho de petición',
  'tu contestación de demanda',
  'tu recurso de apelación',
  'el dossier de antecedentes de tu cliente',
  'el estado de un proceso por radicado'
];

export const DOCS_SECTION: Record<Variant, { kicker: string; title: string; intro: string }> = {
  1: {
    kicker: 'BORRADORES PARA TU PRÁCTICA',
    title: 'Documentos Definitivos Listos para Radicar',
    intro:
      'No son plantillas prefabricadas. Legal-IA redacta cada acápite integrando los hechos de tu caso con la jurisprudencia de las altas cortes y la normatividad vigente. Tú revisas y radicas.'
  },
  2: {
    kicker: 'DOCUMENTOS PARA TU EMPRESA',
    title: 'Los documentos que tu empresa necesita, listos para firmar o radicar',
    intro:
      'Contratos de servicios, respuestas a una contraparte, reclamaciones y recursos. Describes la situación y Legal-IA redacta cada acápite con la normatividad vigente.'
  },
  3: {
    kicker: 'DOCUMENTOS Y ACTUACIONES',
    title: 'Peticiones y solicitudes listas para presentar',
    intro:
      'Cuando una consulta termina en una actuación formal, como un derecho de petición o una solicitud administrativa, Legal-IA redacta el documento con la normatividad vigente.'
  },
  4: {
    kicker: 'MÁS ALLÁ DEL SEGUIMIENTO',
    title: 'Cuando el proceso se mueve, el documento sigue',
    intro:
      'Si un auto exige respuesta, Legal-IA redacta el documento con la normatividad vigente. Tú revisas y radicas.'
  }
};
