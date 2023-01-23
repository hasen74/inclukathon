<script>
// this file deals with the site, it will import all components and chose which one to display
import LoginPageVue from "./pages/LoginPage.vue";
import MessagesPageVue from "./pages/MessagesPage.vue";
import ContactsPageVue from "./pages/ContactsPage.vue";
import ProfilePageVue from "./pages/ProfilePage.vue";
import CalendarPageVue from "./pages/CalendarPage.vue";
import AdminPageVue from "./pages/AdminPage.vue";
import CoachPageVue from "./pages/CoachPage.vue";
import NavbarDivVue from "./components/NavbarDiv.vue";

export default {
  inject: ["axios"],

  data() {
    return {
      email: "",
      token: "",
      logged: false,
      display: "profile",
      role: "",
    };
  },

  components: {
    LoginPageVue,
    MessagesPageVue,
    ContactsPageVue,
    ProfilePageVue,
    CalendarPageVue,
    AdminPageVue,
    CoachPageVue,
    NavbarDivVue,
  },

  beforeMount() {
    // defines title and icon before page rendering
    document.title = "IncluKathon";
    const link = document.createElement("link");
    link.rel = "icon";
    link.sizes = "32x32";
    link.href = require("./images/cropped-favicon-Inclusion-conseil-32x32.png");
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
    // and looks if a user is already logged
    const sessionEmail = sessionStorage.getItem("email");
    const sessionToken = sessionStorage.getItem("token");
    const sessionDisplay = sessionStorage.getItem("display");
    const sessionRole = sessionStorage.getItem("role");
    if (sessionEmail && sessionToken) {
      this.email = sessionEmail;
      this.token = sessionToken;
      this.display = sessionDisplay;
      this.role = sessionRole;
      this.logged = true;
    }
  },

  methods: {
    // function to set the displayed page
    changeDisplay(value) {
      if (this.display === "messages" && value !== "messages") {
        this.display = value;
        sessionStorage.setItem("display", this.display);
      } else if (this.display !== "messages" && value === "messages") {
        this.display = value;
        sessionStorage.setItem("display", this.display);
      } else if (this.display === "contacts" && value === "contacts") {
        window.location.reload();
      } else if (this.display !== value) {
        this.display = value;
        sessionStorage.setItem("display", this.display);
      }
    },

    //function to register needed data when user login
    login() {
      this.display = "profile";
      sessionStorage.setItem("display", this.display);
      this.email = sessionStorage.getItem("email");
      this.token = sessionStorage.getItem("token");
      this.role = sessionStorage.getItem("role");
      this.logged = true;
      window.location.reload();
    },

    // function to clear all data when user logout
    logout() {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("display");
      sessionStorage.removeItem("role");
      this.display = "profile";
      this.email = "";
      this.token = "";
      this.role = "";
      this.logged = false;
    },
  },
};
</script>

<template>
  <LoginPageVue v-if="!logged" @submit="login()" />
  <div v-else-if="logged">
    <NavbarDivVue
      :display="display"
      :logged="logged"
      :role="role"
      @display="(value) => changeDisplay(value)"
      @logout="logout()"
    />
    <MessagesPageVue
      v-if="display === 'messages'"
      :email="email"
      :token="token"
      :role="role"
    />
    <CalendarPageVue
      v-else-if="display === 'calendar'"
      :token="token"
      :role="role"
    />
    <ContactsPageVue
      v-else-if="display === 'contacts'"
      :email="email"
      :token="token"
    />
    <ProfilePageVue
      v-else-if="display === 'profile'"
      :email="email"
      :token="token"
      @emailUpdate="logout()"
    />
    <AdminPageVue v-else-if="display === 'admin'" :token="token" />
    <CoachPageVue
      v-else-if="display === 'coach'"
      :token="token"
      :email="email"
    />
  </div>
</template>

<style>
body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  font-family: "Muli";
  font-weight: 600;
}

#app {
  height: inherit;
  width: inherit;
  overflow-y: inherit;
  overflow-x: hidden;
}
</style>
