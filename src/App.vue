<template>
  <div id="app">
    <header>
      <h1>Clinic Management System</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/patients">Patients</router-link>
      </nav>
    </header>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="scss">
header {
  background: linear-gradient(135deg, #2a90bd 0%, #1a6a8d 100%);
  color: white;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 1rem 0;
    text-align: center;
    font-size: 2rem;
  }

  nav {
    text-align: center;

    a {
      color: white;
      text-decoration: none;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.router-link-exact-active {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: bold;
      }
    }
  }
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
</style>
