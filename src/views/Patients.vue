<template>
  <div class="patients">
    <div class="page-header">
      <h2>Patient Management</h2>
      <p>Register and manage patient records</p>
    </div>

    <div class="content-grid">
      <!-- Registration Form -->
      <div class="form-section">
        <h3>Patient Registration</h3>
        <form @submit.prevent="handleSubmit" class="patient-form">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              id="name"
              v-model="patient.name"
              placeholder="Enter full name"
              required
            />
          </div>

          <div class="form-group">
            <label for="contact">Contact Information *</label>
            <input
              id="contact"
              v-model="patient.contact"
              placeholder="Phone number or email"
              required
            />
          </div>

          <div class="form-group">
            <label for="age">Age</label>
            <input
              id="age"
              v-model.number="patient.age"
              type="number"
              placeholder="Age"
              min="0"
              max="120"
            />
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" v-model="patient.gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              v-model="patient.medicalHistory"
              placeholder="Any relevant medical history..."
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="loading || !patient.name || !patient.contact"
          >
            <span v-if="loading">Registering...</span>
            <span v-else>Register Patient</span>
          </button>
        </form>
      </div>

      <!-- Patients List -->
      <div class="list-section">
        <div class="list-header">
          <h3>Registered Patients ({{ patients.length }})</h3>
          <div class="search-box">
            <input v-model="searchQuery" placeholder="Search patients..." />
          </div>
        </div>

        <div v-if="filteredPatients.length === 0" class="empty-state">
          <p v-if="patients.length === 0">No patients registered yet.</p>
          <p v-else>No patients match your search.</p>
        </div>

        <div v-else class="patients-list">
          <div
            v-for="patient in filteredPatients"
            :key="patient.id"
            class="patient-card"
          >
            <div class="patient-info">
              <h4>{{ patient.name }}</h4>
              <p><strong>Contact:</strong> {{ patient.contact }}</p>
              <p v-if="patient.age"><strong>Age:</strong> {{ patient.age }}</p>
              <p v-if="patient.gender">
                <strong>Gender:</strong> {{ patient.gender }}
              </p>
              <p v-if="patient.medicalHistory">
                <strong>Medical History:</strong> {{ patient.medicalHistory }}
              </p>
              <p class="registration-date">
                Registered: {{ formatDate(patient.registeredAt) }}
              </p>
            </div>
            <div class="patient-actions">
              <button
                class="delete-btn"
                @click="deletePatient(patient.id)"
                title="Delete patient"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Patients",
  setup() {
    const store = useStore();
    const loading = ref(false);
    const searchQuery = ref("");

    const patient = reactive({
      name: "",
      contact: "",
      age: null,
      gender: "",
      medicalHistory: "",
    });

    const filteredPatients = computed(() => {
      if (!searchQuery.value) return store.state.patients;

      const query = searchQuery.value.toLowerCase();
      return store.state.patients.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.contact.toLowerCase().includes(query) ||
          (p.medicalHistory && p.medicalHistory.toLowerCase().includes(query))
      );
    });

    const handleSubmit = async () => {
      loading.value = true;
      try {
        await store.dispatch("addPatient", { ...patient });
        // Reset form
        Object.assign(patient, {
          name: "",
          contact: "",
          age: null,
          gender: "",
          medicalHistory: "",
        });
      } catch (error) {
        console.error("Error adding patient:", error);
      } finally {
        loading.value = false;
      }
    };

    const deletePatient = async (patientId) => {
      if (confirm("Are you sure you want to delete this patient?")) {
        await store.dispatch("deletePatient", patientId);
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      patient,
      handleSubmit,
      loading,
      patients: store.state.patients,
      searchQuery,
      filteredPatients,
      deletePatient,
      formatDate,
    };
  },
};
</script>

<style scoped lang="scss">
.patients {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    color: #2a90bd;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.form-section,
.list-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #2a90bd;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.patient-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #2a90bd;
      }
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #2a90bd;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: #1a6a8d;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    margin-bottom: 0;
  }
}

.search-box {
  input {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    width: 250px;

    &:focus {
      outline: none;
      border-color: #2a90bd;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.patients-list {
  max-height: 600px;
  overflow-y: auto;
}

.patient-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.patient-info {
  flex: 1;

  h4 {
    color: #2a90bd;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 0.25rem;
    color: #555;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .registration-date {
    font-size: 0.9rem;
    color: #888;
    margin-top: 0.5rem;
  }
}

.patient-actions {
  margin-left: 1rem;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background: #c0392b;
  }
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .list-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box input {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .patient-card {
    flex-direction: column;
  }

  .patient-actions {
    margin-left: 0;
    margin-top: 1rem;
    align-self: flex-end;
  }
}
</style>
