// API service for communicating with the FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AnalysisResult {
  status: string;
  filename: string;
  analysis: {
    bias_detected: boolean;
    results: {
      Gender: {
        attribute: string;
        rates: Record<string, number>;
        bias_detected: boolean;
        difference: number;
      };
      College: {
        attribute: string;
        rates: Record<string, number>;
        bias_detected: boolean;
        difference: number;
      };
    };
    cgpa_insight: {
      cgpa_selection_rate: number;
      skill_selection_rate: number;
      insight: string;
    };
  };
  ai_explanation: string;
}

/**
 * Upload CSV file to backend for bias analysis
 * @param file - CSV file to analyze
 * @returns Analysis results from backend
 */
export async function uploadAndAnalyze(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error occurred' }));
    throw new Error(error.detail || 'Failed to analyze file');
  }

  return response.json();
}

/**
 * Check if backend API is running
 * @returns true if API is healthy
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
