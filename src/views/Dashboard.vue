<template>
  <div class="container">
    <h2>Dashboard</h2>
    <div class="stats">
      <div class="card">Total Tickets: {{ totalTickets }}</div>
      <div class="card">Open: {{ openTickets }}</div>
      <div class="card">In Progress: {{ inProgressTickets }}</div>
      <div class="card">Closed: {{ closedTickets }}</div>
    </div>
    <nav>
      <router-link to="/tickets" class="btn">Manage Tickets</router-link>
      <button @click="logout" class="btn">Logout</button>
    </nav>
    <footer class="footer">© 2025 Ticket App</footer>
  </div>
</template>

<script>
import { useTicketStore } from '../stores/ticket';
import { onMounted, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  setup() {
    const ticketStore = useTicketStore();
    const router = useRouter();

    onMounted(() => {
      ticketStore.loadTickets();
    });

    const totalTickets = computed(() => ticketStore.tickets.length);
    const openTickets = computed(() => ticketStore.tickets.filter(t => t.status === 'open').length);
    const inProgressTickets = computed(() => ticketStore.tickets.filter(t => t.status === 'in_progress').length);
    const closedTickets = computed(() => ticketStore.tickets.filter(t => t.status === 'closed').length);

    const logout = () => {
      localStorage.removeItem('ticketapp_session');
      toast.info('Logged out.');
      router.push('/');
    };

    return { totalTickets, openTickets, inProgressTickets, closedTickets, logout };
  },
};
</script>

<style scoped>
.stats {
  margin: 20px 0;
}
nav {
  margin-top: 20px;
}
</style>