<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" placeholder="Email" required />
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" placeholder="Password" required />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Login</button>
    </form>
    <footer class="footer">© 2025 Ticket App</footer>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    handleSubmit() {
      if (!this.email || !this.password) {
        this.error = 'All fields are required';
        toast.error(this.error);
        return;
      }
      if (this.password === 'password') {
        localStorage.setItem('ticketapp_session', 'mock_token');
        toast.success('Logged in successfully!');
        this.$router.push('/dashboard');
      } else {
        this.error = 'Invalid credentials';
        toast.error(this.error);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}
</style>