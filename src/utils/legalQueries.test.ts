import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCategoryById,
  validateQueryInput,
  calculateTotalCredits,
  getRecommendedTierForCredits,
} from './legalQueriesLogic.ts';
import { NOVEMBER_2026_QUERIES, PAY_AS_YOU_GO_TIERS } from '../data/legalQueriesData.ts';

test('NOVEMBER_2026_QUERIES contains all 11 verified Colombian registries', () => {
  assert.equal(NOVEMBER_2026_QUERIES.length, 11);
  const ids = NOVEMBER_2026_QUERIES.map((q) => q.id);
  assert.ok(ids.includes('antecedentes'));
  assert.ok(ids.includes('sociedad'));
  assert.ok(ids.includes('financiera-insolvencia'));
  assert.ok(ids.includes('marcas'));
  assert.ok(ids.includes('vehiculos'));
  assert.ok(ids.includes('salud'));
  assert.ok(ids.includes('contratacion-estatal'));
  assert.ok(ids.includes('tributario-comercio'));
  assert.ok(ids.includes('jurisprudencia'));
  assert.ok(ids.includes('procesos-judiciales'));
  assert.ok(ids.includes('herramientas-apoyo'));
});

test('Pay As You Go tiers include mandated $40 for 200 credits', () => {
  const proTier = PAY_AS_YOU_GO_TIERS.find((t) => t.priceUSD === 40);
  assert.ok(proTier, 'Tier of 40 USD must exist');
  assert.equal(proTier.credits, 200, 'Tier of 40 USD must give exactly 200 credits');
  assert.equal(proTier.costPerCreditUSD, 0.20);
});

test('Query validation handles cédula, placa, and 23-digit radicado', () => {
  const antecedentes = getCategoryById('antecedentes')!;
  assert.ok(validateQueryInput(antecedentes, '79.982.140').isValid);
  assert.ok(validateQueryInput(antecedentes, '1018420914').isValid);
  assert.equal(validateQueryInput(antecedentes, 'abc').isValid, false);

  const vehiculos = getCategoryById('vehiculos')!;
  assert.ok(validateQueryInput(vehiculos, 'BKS-412').isValid);
  assert.ok(validateQueryInput(vehiculos, 'bks412').isValid);
  assert.equal(validateQueryInput(vehiculos, 'B').isValid, false);

  const procesos = getCategoryById('procesos-judiciales')!;
  assert.ok(validateQueryInput(procesos, '11001310300120230045600').isValid);
  assert.equal(validateQueryInput(procesos, '110013103001').isValid, false);
});

test('calculateTotalCredits correctly calculates combined query costs', () => {
  const total = calculateTotalCredits([
    { categoryId: 'antecedentes', count: 3 }, // 3 * 1 = 3
    { categoryId: 'sociedad', count: 2 },     // 2 * 2 = 4
    { categoryId: 'procesos-judiciales', count: 1 } // 1 * 3 = 3
  ]);
  assert.equal(total, 10);
});

test('getRecommendedTierForCredits picks appropriate tier without expiring credits', () => {
  const rec50 = getRecommendedTierForCredits(50);
  assert.equal(rec50.credits, 100);

  const rec150 = getRecommendedTierForCredits(150);
  assert.equal(rec150.priceUSD, 40);
  assert.equal(rec150.credits, 200);
});
