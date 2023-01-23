<script>
// this file will display a form and update a user's data with given parameters
export default {
  inject: ["axios"],

  emits: ["updated", "email", "return"],

  props: {
    token: String,
    userData: {},
  },

  methods: {
    emitCheck(oldEmail, email) {
      if (oldEmail !== email) {
        this.$emit("email");
      } else {
        this.$emit("updated");
      }
    },

    // function to update user's data with given parameters
    async update() {
      const oldEmail = this.userData.email;
      let emailCheck = true;
      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let gender = document.getElementById("gender").value;
      let pronouns = document.getElementById("pronouns").value;
      let email = document.getElementById("email").value;
      let disability = document.getElementById("disability").value;
      let description = document.getElementById("description").value;
      // looks if data was given and if not use old data
      if (!firstName) {
        firstName = this.userData.firstName;
      }
      if (!lastName) {
        lastName = this.userData.lastName;
      }
      if (!gender) {
        gender = this.userData.gender;
      }
      if (!pronouns) {
        pronouns = this.userData.pronouns;
      }
      if (!email) {
        email = this.userData.email;
      } else {
        // checks if email is already in use
        this.axios
          .get("/users/", {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            response.data.forEach((element) => {
              if (element.email === email) {
                emailCheck = false;
              }
            });
          });
      }
      if (!disability) {
        disability = this.userData.disability;
      }
      if (!description) {
        description = this.userData.description;
      }
      if (emailCheck) {
        await this.axios
          .patch(
            `/users/${this.userData.id}`,
            {
              firstName: firstName,
              lastName: lastName,
              gender: gender,
              pronouns: pronouns,
              email: email,
              disability: disability,
              description: description,
            },
            { headers: { Authorization: "Bearer " + this.token } }
          )
          .then(alert("Profile updated !"), this.emitCheck(oldEmail, email));
      } else {
        alert("E-mail already used.");
      }
    },
  },
};
</script>

<template>
  <div id="update_div">
    <form v-on:submit.prevent="update()">
      <div class="input_wrapper">
        <label for="firstName">Prénom: </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          :placeholder="userData.firstName"
        />
      </div>
      <div class="input_wrapper">
        <label for="lastName">Nom: </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          :placeholder="userData.lastName"
        />
      </div>
      <div class="input_wrapper">
        <label for="gender">Genre: </label>
        <input
          id="gender"
          name="gender"
          type="text"
          :placeholder="userData.gender"
        />
      </div>
      <div class="input_wrapper">
        <label for="pronouns">Pronoms: </label>
        <input
          id="pronouns"
          name="pronouns"
          type="text"
          :placeholder="userData.pronouns"
        />
      </div>
      <div class="input_wrapper">
        <label for="email"
          >E-mail(Vous serez déconnecté si vous le changez):
        </label>
        <input
          id="email"
          name="email"
          type="text"
          :placeholder="userData.email"
        />
      </div>
      <div class="input_wrapper">
        <label for="disability">Handicap: </label>
        <input
          id="disability"
          name="disability"
          type="text"
          :placeholder="userData.disability"
        />
      </div>
      <div class="input_wrapper">
        <label for="description">Description: </label>
        <input
          id="description"
          name="description"
          type="text"
          :placeholder="userData.description"
        />
      </div>
      <div id="btn_pack">
        <button type="submit">Modifier</button>
        <button type="button" @click="$emit('return')">Retour</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#update_div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#update_div form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
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

.input_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding: 10px;
}

.input_wrapper label,
input {
  margin: 10px, 20px;
}

#btn_pack {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding-top: 20px;
}

#btn_pack button {
  background-color: transparent;
  border-color: #555;
}

#btn_pack button:hover {
  background-color: rgba(163, 113, 208, 1);
}
</style>
