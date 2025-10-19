import { createStore } from "vuex";

export default createStore({
  state: {
    patients: JSON.parse(localStorage.getItem("patients")) || [],
  },
  mutations: {
    ADD_PATIENT(state, patient) {
      // Add unique ID and timestamp
      const newPatient = {
        ...patient,
        id: Date.now(),
        registeredAt: new Date().toISOString(),
      };
      state.patients.push(newPatient);
      // Persist to localStorage
      localStorage.setItem("patients", JSON.stringify(state.patients));
    },
    UPDATE_PATIENT(state, updatedPatient) {
      const index = state.patients.findIndex((p) => p.id === updatedPatient.id);
      if (index !== -1) {
        state.patients.splice(index, 1, updatedPatient);
        localStorage.setItem("patients", JSON.stringify(state.patients));
      }
    },
    DELETE_PATIENT(state, patientId) {
      state.patients = state.patients.filter((p) => p.id !== patientId);
      localStorage.setItem("patients", JSON.stringify(state.patients));
    },
  },
  actions: {
    addPatient({ commit }, patient) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("ADD_PATIENT", patient);
          resolve();
        }, 1000);
      });
    },
    updatePatient({ commit }, patient) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("UPDATE_PATIENT", patient);
          resolve();
        }, 1000);
      });
    },
    deletePatient({ commit }, patientId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("DELETE_PATIENT", patientId);
          resolve();
        }, 1000);
      });
    },
  },
  getters: {
    patientCount: (state) => state.patients.length,
    allPatients: (state) => state.patients,
    patientById: (state) => (id) => {
      return state.patients.find((patient) => patient.id === id);
    },
  },
});
