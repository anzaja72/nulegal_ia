import { NOVEMBER_2026_QUERIES, PAY_AS_YOU_GO_TIERS, LegalQueryCategory } from '../data/legalQueriesData.ts';

export function getCategoryById(id: string): LegalQueryCategory | undefined {
  return NOVEMBER_2026_QUERIES.find((q) => q.id === id);
}

export function validateQueryInput(category: LegalQueryCategory, input: string): { isValid: boolean; message?: string } {
  const cleaned = input.trim();
  if (!cleaned) {
    return { isValid: false, message: 'El campo de consulta no puede estar vacío.' };
  }

  if (category.inputType === 'cedula') {
    const digitsOnly = cleaned.replace(/[\.\s-]/g, '');
    if (!/^\d{5,11}$/.test(digitsOnly)) {
      return { isValid: false, message: 'La cédula debe contener entre 5 y 11 dígitos numéricos.' };
    }
  }

  if (category.inputType === 'placa') {
    const cleanPlaca = cleaned.replace(/[\s-]/g, '').toUpperCase();
    if (cleanPlaca.length < 5 || cleanPlaca.length > 7) {
      return { isValid: false, message: 'La placa vehicular debe tener un formato estándar (ej: BKS412).' };
    }
  }

  if (category.inputType === 'radicado') {
    const digitsOnly = cleaned.replace(/[\.\s-]/g, '');
    if (digitsOnly.length !== 23) {
      return {
        isValid: false,
        message: `El radicado judicial de la Rama Judicial debe tener exactamente 23 dígitos (actual: ${digitsOnly.length}).`
      };
    }
  }

  return { isValid: true };
}

export function calculateTotalCredits(items: { categoryId: string; count: number }[]): number {
  return items.reduce((total, item) => {
    const cat = getCategoryById(item.categoryId);
    const cost = cat ? cat.creditCost : 1;
    return total + cost * Math.max(0, item.count);
  }, 0);
}

export function getRecommendedTierForCredits(neededCredits: number) {
  // Find the smallest tier that covers neededCredits, or the largest if needed exceeds all
  for (const tier of PAY_AS_YOU_GO_TIERS) {
    if (tier.credits >= neededCredits) {
      return tier;
    }
  }
  return PAY_AS_YOU_GO_TIERS[PAY_AS_YOU_GO_TIERS.length - 1];
}
