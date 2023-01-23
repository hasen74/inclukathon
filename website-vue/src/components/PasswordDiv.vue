<script>
// this file deal with the password change
export default {
  inject: ["axios"],

  emits: ["updated"],

  props: {
    token: String,
    userId: Number,
  },

  methods: {
    // checks if both given passwords are the same
    // then updates user's password
    update() {
      const password = document.getElementById("password").value;
      const pass_test = document.getElementById("pass_test").value;
      if (password === pass_test) {
        this.axios.patch(
          `/users/${this.userId}`,
          {
            password: password,
          },
          { headers: { Authorization: "Bearer " + this.token } }
        );
        this.$emit("updated");
      } else {
        alert("Passwords are not the same.");
      }
    },
  },
};
</script>

<template>
  <div id="form_wrapper">
    <form id="form" v-on:submit.prevent="update()">
      <label for="password">Nouveau mot de passe: </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Nouveau mot de passe"
      />
      <input
        id="pass_test"
        name="password"
        type="password"
        placeholder="Retaper le mot de passe"
      />
      <div id="btn_wrapper">
        <button type="submit">Modifer le mot de passe</button>
        <button type="button" @click="$emit('updated')">Retour</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#form_wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background: rgb(163, 113, 208);
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
  color: #ffffff;
  margin-top: 5vh;
  border-style: solid;
  border-color: #555;
  border-width: 2px;
  border-radius: 4px;
}

#btn_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-top: 20px;
}

#btn_wrapper button {
  background-color: transparent;
  border-color: #555;
}

#btn_wrapper button:hover {
  background-color: rgba(163, 113, 208, 1);
}
</style>
