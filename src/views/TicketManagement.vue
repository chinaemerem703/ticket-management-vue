<template>
  <div class="container">
    <h2>Ticket Management</h2>
    <form @submit.prevent="handleSubmit">
      <label for="title">Title</label>
      <input id="title" v-model="title" placeholder="Title" required />
      <label for="description">Description (optional)</label>
      <textarea id="description" v-model="description" placeholder="Description (optional)" />
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit">{{ editingId ? 'Update Ticket' : 'Create Ticket' }}</button>
    </form>
    <div class="tickets-list">
      <div v-for="ticket in tickets" :key="ticket.id" class="card" :class="`status-${ticket.status}`">
        <h3>{{ ticket.title }}</h3>
        <p v-if="ticket.description">{{ ticket.description }}</p>
        <span class="status-tag">{{ ticket.status }}</span>
        <button @click="editTicket(ticket)">Edit</button>
        <button @click="deleteTicket(ticket.id)">Delete</button>
      </div>
    </div>
    <footer class="footer">© 2025 Ticket App</footer>
  </div>
</template>

<script>
import { useTicketStore } from '../stores/ticket';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';

export default {
  name: 'TicketManagement',
  setup() {
    const ticketStore = useTicketStore();
    const title = ref('');
    const description = ref('');
    const status = ref('open');
    const error = ref('');
    const editingId = ref(null);

    onMounted(() => {
      ticketStore.loadTickets();
    });

    const handleSubmit = () => {
      if (!title.value) {
        error.value = 'Title is required';
        toast.error(error.value);
        return;
      }
      if (!['open', 'in_progress', 'closed'].includes(status.value)) {
        error.value = 'Invalid status';
        toast.error(error.value);
        return;
      }
      if (description.value && description.value.length > 500) {
        error.value = 'Description too long (max 500 chars)';
        toast.error(error.value);
        return;
      }

      const ticket = { title: title.value, description: description.value, status: status.value };

      if (editingId.value) {
        ticket.id = editingId.value;
        ticketStore.updateTicket(ticket);
        toast.success('Ticket updated successfully!');
      } else {
        ticketStore.addTicket(ticket);
        toast.success('Ticket created successfully!');
      }

      title.value = '';
      description.value = '';
      status.value = 'open';
      editingId.value = null;
      error.value = '';
    };

    const editTicket = (ticket) => {
      title.value = ticket.title;
      description.value = ticket.description || '';
      status.value = ticket.status;
      editingId.value = ticket.id;
    };

    const deleteTicket = (id) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        ticketStore.deleteTicket(id);
        toast.info('Ticket deleted');
      }
    };

    return {
      tickets: ticketStore.tickets,
      title,
      description,
      status,
      error,
      editingId,
      handleSubmit,
      editTicket,
      deleteTicket,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto 20px;
}
.tickets-list {
  margin-top: 20px;
}
.card {
  padding: 15px;
  margin-bottom: 10px;
}
.status-tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}
.status-open .status-tag { background: green; }
.status-in_progress .status-tag { background: #d97706; }
.status-closed .status-tag { background: gray; }
</style>