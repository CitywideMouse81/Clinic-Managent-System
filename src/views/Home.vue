<template>
  <div class="home">
    <div class="welcome-card">
      <h2>Welcome to Clinic Management System</h2>
      <p class="subtitle">Efficient patient management for modern healthcare</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">{{ patientCount }}</div>
          <div class="stat-label">Total Patients</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ todayAppointments }}</div>
          <div class="stat-label">Today's Appointments</div>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Quick Actions</h3>
        <div class="action-buttons">
          <router-link to="/patients" class="action-button primary">
            Manage Patients
          </router-link>
          <button class="action-button secondary" @click="scheduleAppointment">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const patientCount = computed(() => store.getters.patientCount);

    // Mock data for today's appointments
    const todayAppointments = computed(() => {
      return Math.min(patientCount.value, 5); // Mock value
    });

    const scheduleAppointment = () => {
      alert("Appointment scheduling feature coming soon!");
    };

    return {
      patientCount,
      todayAppointments,
      scheduleAppointment,
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #2a90bd;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-card {
  background: linear-gradient(135deg, #2a90bd, #1a6a8d);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.quick-actions {
  margin-top: 3rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background: #2a90bd;
    color: white;

    &:hover {
      background: #1a6a8d;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #e0e0e0;
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 768px) {
  .welcome-card {
    padding: 2rem 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
