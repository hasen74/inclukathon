<script>
import ProfileDivVue from "@/components/ProfileDiv.vue";

export default {
  inject: ["axios"],

  emits: ["submit"],

  components: {
    ProfileDivVue,
  },

  props: {
    token: String,
    email: String
  },

  data() {
    return {
      form_display: '',
      usersInGroupData: [],
      userData: {},
      groupName: String,
      groupId: 0,
      userDisplay: false,
      userIndex: 0,
    };
  },

  methods: {
    async getInfo() {
      await this.axios
        .get(`/users/${this.email}`, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          this.userData = response.data;
          this.groupName = this.userData.group.name;
          this.groupId = this.userData.peopleGroupId;
        })
        .catch((error) => {
          alert(error.message);
        });
      await this.axios
        .get(`/users/bygroup/${this.groupId}`, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          this.usersInGroupData = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
      await this.axios
        .get('/people-groups/', {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((response) => {
          this.groupsData = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    async registerGroupFunction() {
      const email = document.getElementById("account_email").value;
      const password = document.getElementById("account_password").value;
      const role = 'USER';
      const group = this.groupId;
      let userData = {};
      await this.axios
        .post(`/users/signUp/${group}`, {
          email: email,
          password: password,
          role: role,
        },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          userData = response.data;
          console.log(this.userData);
          alert(`Nouveau compte ${userData.email} créé. Demandez à votre collaborateur de se connecter pour remplir son profil.`)
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  },

  beforeMount() {
    this.getInfo();
  }
}
</script>

<template>
  <div id="coach">
    <div class="titre">
      <div>
        <p>COACH BOARD {{ groupName }}</p>
      </div>
    </div>
    <div class="profils">
      <!-- Display list of users in group -->
      <div v-if="!userDisplay" class="group_wrapper">
        <div class="cat_wrapper">
          <div v-for="(item, index) in usersInGroupData" :key="index">
            <button class="profile_btn" v-if="item.email !== email" @click="(userDisplay = true), (userIndex = index)">
              {{ item.firstName }} {{ item.lastName }}
            </button>
          </div>
        </div>
      </div>
      <!-- Display chosen user's data -->
      <div v-if="userDisplay">
        <ProfileDivVue :userData="usersInGroupData[userIndex]" />
        <div id="button_wrapper">
          <button @click="userDisplay = false">Retour</button>
        </div>
      </div>
    </div>
    <div class="form">
      <form v-on:submit.prevent="registerGroupFunction()" id="account_form">
        <div>
          Créer un compte dans mon groupe :
        </div>
        <div>
          <label for="account_email">Email : </label>
          <input type="text" placeholder="Email du compte" id="account_email" name="account_email" />
        </div>
        <div>
          <label for="account_password">Mot de passe : </label>
          <input type="password" placeholder="Mot de passe du compte" id="account_password" name="account_password" />
        </div>
        <button>
          Créer
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#coach {
  display: grid;
  column-gap: 10px;
  row-gap: 30px;
  grid-template-columns: "1fr 1fr 1fr 1fr";
  grid-template-rows: "1fr 5fr 3fr";
  grid-template-areas: "titre titre titre titre"
    "profils profils profils profils"
    "form form form form"
}

button {
  display: flex;
  align-items: center;
  min-width: max-content;
  width: 10%;
  max-width: 100px;
  height: 5vh;
  padding: 5px;
  background: rgb(163, 113, 208);
  border-radius: 5px;
}

button:hover {
  background-color: #f54ea2;
}

.titre {
  grid-area: titre;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}

.profils {
  grid-area: profils;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.form {
  grid-area: form;
  display: flex;
  justify-content: center;
}

.cat_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  min-width: max-content;
  background: rgb(163, 113, 208);
  background: linear-gradient(90deg,
      rgba(163, 113, 208, 1) 0%,
      rgba(245, 78, 162, 1) 100%);
  color: #ffffff;
  margin-top: 5vh;
  margin-left: 5vw;
  margin-right: 5vw;
  border-style: solid;
  border-color: #555;
  border-width: 2px;
  border-radius: 4px;
}

.profile_btn {
  background-color: transparent;
  margin: 10px 20px 10px 20px;
  padding: 5px;
  height: 40px;
  width: 15vw;
  min-width: max-content;
}

#button_wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#button_wrapper button {
  background-color: rgba(245, 78, 162, 1);
}
</style>
