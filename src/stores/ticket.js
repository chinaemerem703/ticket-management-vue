import { defineStore } from 'pinia';

export const useTicketStore = defineStore('tickets', {
  state: () => ({
    tickets: [],
  }),
  actions: {
    loadTickets() {
      const storedTickets = localStorage.getItem('tickets');
      if (storedTickets) {
        this.tickets = JSON.parse(storedTickets);
      }
    },
    addTicket(ticket) {
      const newTicket = { id: Date.now(), ...ticket };
      this.tickets.push(newTicket);
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex((t) => t.id === updatedTicket.id);
      if (index !== -1) {
        this.tickets[index] = updatedTicket;
        localStorage.setItem('tickets', JSON.stringify(this.tickets));
      }
    },
    deleteTicket(id) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
  },
});