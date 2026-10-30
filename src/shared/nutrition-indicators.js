/**
 * Catalogo unico de indicadores nutricionales (datos_nutricionales.json).
 * Un indicador solo se ofrece en la interfaz cuando tiene al menos un valor
 * numerico en el año activo; asi un año sin dato (todo null) lo oculta solo.
 */
export const NUTRITION_INDICATORS = [
    { key: 'ENSIN', name: 'Desnutrición Crónica (ENSIN)' },
    { key: 'Cronica', name: 'Desnutrición Crónica (ICBF)' },
    { key: 'R_Cronica', name: 'Riesgo Desnutrición Crónica (ICBF)' },
    { key: 'Aguda', name: 'Desnutrición Aguda (ICBF)' },
    { key: 'R_Aguda', name: 'Riesgo Desnutrición Aguda (ICBF)' }
];

const NUTRITION_KEYS = new Set(NUTRITION_INDICATORS.map((item) => item.key));

export function isNutritionIndicatorId(indicatorId) {
    return NUTRITION_KEYS.has(indicatorId);
}

function isNumericValue(value) {
    return value !== null && value !== undefined && value !== '' && !Number.isNaN(Number(value));
}

export function hasNutritionValues(nutritionData, key) {
    if (!nutritionData || typeof nutritionData !== 'object') return false;
    return Object.values(nutritionData).some((row) => row && isNumericValue(row[key]));
}

export function getAvailableNutritionIndicators(nutritionData) {
    return NUTRITION_INDICATORS.filter((item) => hasNutritionValues(nutritionData, item.key));
}
