<template>
  <div class="container">
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" placeholder="Email" required />
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" placeholder="Password" required />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">Signup</button>
    </form>
    <footer class="footer">© 2025 Ticket App</footer>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';

export default {
  name: 'SignupPage',
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
      localStorage.setItem('ticketapp_session', 'mock_token');
      toast.success('Signed up successfully!');
      this.$router.push('/dashboard');
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