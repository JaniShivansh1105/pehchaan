import { fetchApi } from "./client";

// NOTE: These services form the foundation for Phase 3 integration.
// Currently, the frontend components continue to use local mock data
// to ensure the prototype remains functional without the backend.

export const ReadinessService = {
  getLatest: (userId: string) => 
    fetchApi(`/users/${userId}/readiness/latest`),
  
  getHistory: (userId: string) => 
    fetchApi(`/users/${userId}/readiness/history`),
    
  getFactors: (assessmentId: string) => 
    fetchApi(`/assessments/${assessmentId}/factors`),
};

export const UserService = {
  getProfile: (userId: string) => 
    fetchApi(`/users/${userId}/profile`),
    
  updateProfile: (userId: string, data: any) => 
    fetchApi(`/users/${userId}/profile`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

export const SimulationService = {
  runSimulation: (userId: string, scenarioId: string, inputs: any) =>
    fetchApi(`/users/${userId}/simulations`, {
      method: "POST",
      body: JSON.stringify({ scenario_id: scenarioId, inputs }),
    }),
};
