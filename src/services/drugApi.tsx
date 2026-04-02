/**
 * Drug API - Mock implementation for medication lookup by code.
 * Replace with real API call when backend is ready.
 *
 * @param {string} code - Drug code to look up
 * @returns {Promise<{ code: string, name: string } | null>} Drug data or null if not found
 */
export async function getDrugByCode(code) {
  const normalizedCode = String(code).trim();

  if (!normalizedCode) {
    return null;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const MOCK_DRUGS = {
    "123456": { code: "123456", name: "Aspirin 100mg", price: 12.5 },
    "234567": { code: "234567", name: "Paracetamol 500mg", price: 8.75 },
    "345678": { code: "345678", name: "Ibuprofen 400mg", price: 15.0 },
    "456789": { code: "456789", name: "Vitamin D3 1000IU", price: 45.0 },
    "567890": { code: "567890", name: "Metformin 500mg", price: 22.5 },
    "678901": { code: "678901", name: "Omeprazole 20mg", price: 18.0 },
    "789012": { code: "789012", name: "Amoxicillin 500mg", price: 25.0 },
  };

  return MOCK_DRUGS[normalizedCode] || null;
}
