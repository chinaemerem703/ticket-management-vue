<template>
  <div class="container">
    <div class="hero">
      <h1>Ticket Management App</h1>
      <p>A robust ticket management system for seamless issue tracking.</p>
      <router-link to="/auth/login" class="btn">Login</router-link>
      <router-link to="/auth/signup" class="btn">Get Started</router-link>
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="wave"></div>
    </div>
    <footer class="footer">© 2025 Ticket App</footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}
</style>