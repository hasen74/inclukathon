<script>
// this file deals with the navigation bar
import io from "socket.io-client";

export default {
  inject: ["axios"],

  props: {
    logged: Boolean,
    display: String,
    role: String,
  },

  data() {
    return {
      socket: io("localhost:3001"),
    };
  },

  emits: ["display", "logout"],
};
</script>

<template>
  <div>
    <div id="navbar">
      <div id="page_display">
        <button
          :class="{ active_page: display === 'messages' }"
          @click="$emit('display', 'messages')"
        >
          <img src="../images/chat_logo.png" alt="chat logo" />
          <span>Messages</span>
        </button>
        <button
          :class="{ active_page: display === 'calendar' }"
          @click="$emit('display', 'calendar')"
        >
          <img src="../images/calendar_logo.png" alt="calendar logo" />
          <span>Calendrier</span>
        </button>
        <button
          :class="{ active_page: display === 'contacts' }"
          @click="$emit('display', 'contacts')"
        >
          <img src="../images/contacts_logo.png" alt="contacts logo" />
          <span>Contacts</span>
        </button>
        <button
          :class="{ active_page: display === 'profile' }"
          @click="$emit('display', 'profile')"
        >
          <img src="../images/profile_logo.png" alt="profile logo" />
          <span>Profil</span>
        </button>
        <button
          v-if="role === 'ADMIN'"
          :class="{ active_page: display === 'admin' }"
          @click="$emit('display', 'admin')"
        >
          <img src="../images/admin_logo.png" alt="admin logo" />
          <span>Admin board</span>
        </button>
        <button
          v-if="role === 'COACH'"
          :class="{ active_page: display === 'coach' }"
          @click="$emit('display', 'coach')"
        >
          <img src="../images/coach_logo.png" alt="coach logo" />
          <span>Coach board</span>
        </button>
      </div>
      <button @click="$emit('logout')" id="logout">
        <img src="../images/logout_logo.png" alt="logout logo" />
        <span>Déconnexion</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
#navbar {
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgb(163, 113, 208);
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
}

#page_display {
  display: flex;
  flex-direction: row;
}

button {
  display: flex;
  align-items: center;
  min-width: max-content;
  width: 10%;
  max-width: 100px;
  height: 5vh;
}

button:not(.active_page) {
  background-color: transparent;
}

.active_page {
  background-color: #f54ea2;
}

button:hover {
  background-color: #f54ea2;
}

img {
  height: 3vh;
  width: 3vh;
  margin-right: 3px;
}
</style>
