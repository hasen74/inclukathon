<script>
// this file deals with the login action
export default {
  inject: ["axios"],

  emits: ["submit"],

  methods: {
    // gets a token and a role with given email and password or refuses login
    async login() {
      const email = document.getElementById("form_email").value;
      const password = document.getElementById("form_password").value;
      let token = "";
      await this.axios
        .post("/users/auth/", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.token) {
            token = response.data.token;
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("token", token);
            this.axios
              .get(`/users/${email}`, {
                headers: { Authorization: "Bearer " + token },
              })
              .then((response) => {
                sessionStorage.setItem("role", response.data.role);
              });
            this.$emit("submit");
          } else {
            alert("Wrong e-mail or password");
          }
        })
        .catch((error) => console.log(error));
    },

    showPassword() {
      const checkbox = document.getElementById("form_password");
      checkbox.type === "password"
        ? (checkbox.type = "text")
        : (checkbox.type = "password");
    },
  },
};
</script>

<template>
  <div id="login_page">
    <div id="login_title">
      <h1>Inclusion Conseil - IncluKathon</h1>
    </div>
    <div id="form_wrapper">
      <form v-on:submit.prevent="login()" id="login_form">
        <div>
          <label for="form_email">E-mail: </label>
          <input
            type="text"
            placeholder="Type your e-mail here"
            id="form_email"
            name="form_email"
          />
        </div>
        <div>
          <label for="form_password">Mot de passe: </label>
          <input
            type="password"
            placeholder="Type your password here"
            id="form_password"
            name="form_password"
          />
          <input
            type="checkbox"
            id="show_password"
            name="show_password"
            @change="showPassword()"
          />
          <label id="opt_pass" for="show_password">afficher le mot de passe</label>
        </div>
        <button>Se connecter</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#login_page {
  height: 100%;
}

#login_title {
  background: rgb(163, 113, 208);
  background: radial-gradient(
    circle,
    rgba(163, 113, 208, 1) 0%,
    rgba(253, 146, 98, 1) 50%,
    rgba(245, 78, 162, 1) 100%
  );
  width: 100%;
  margin: 0;
  padding: 0;
  padding-top: 5vh;
  padding-bottom: 5vh;
}

h1 {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #ffffff;
}

#form_wrapper {
  width: 100%;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: max-content;
  display: table;
  align-items: center;
}

form div {
  display: table-row;
}

form div label,
input {
  display: table-cell;
  margin-bottom: 10px;
}

form div label {
  padding-right: 10px;
}
</style>
