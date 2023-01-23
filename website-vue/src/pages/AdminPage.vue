<script>
export default {
  inject: ["axios"],

  emits: ["submit"],

  props: {
    token: String
  },

  data() {
    return {
      form_display: '',
      groupsData: []
    };
  },

  methods: {
    accountFunction() {
      if (!this.form_display || this.form_display === 'accountD' || this.form_display === 'group' || this.form_display === 'groupD') {
        this.form_display = 'account';
      }
      this.axios
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

    accountDeleteFunction() {
      if (!this.form_display || this.form_display === 'account' || this.form_display === 'group' || this.form_display === 'groupD') {
        this.form_display = 'accountD';
      }
    },

    groupFunction() {
      if (!this.form_display || this.form_display === 'account' || this.form_display === 'accountD' || this.form_display === 'groupD') {
        this.form_display = 'group';
      }
    },

    groupDeleteFunction() {
      if (!this.form_display || this.form_display === 'account' || this.form_display === 'accountD' || this.form_display === 'group') {
        this.form_display = 'groupD';
      }
    },

    async registerFunction() {
      const email = document.getElementById("account_email").value;
      const password = document.getElementById("account_password").value;
      const role = document.getElementById("role").value;
      const group = document.getElementById("peopleGroup").value;
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
          alert(`Nouveau compte ${userData.email} créé.`)
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    deleteUserFunction() {
      const email = document.getElementById("account_delete_email").value;
      let userDeletedData = {};
      this.axios
        .delete(`/users/${email}`,
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          userDeletedData = response.data;
          alert(`Compte ${userDeletedData.email} supprimé.`)
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    createGroupFunction() {
      const name = document.getElementById("group_name").value;
      let groupData = {};
      this.axios
        .post("/people-groups/", {
          name: name
        },
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          groupData = response.data;
          console.log(groupData);
          alert(`Nouveau groupe ${groupData.name} créé.`)
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    deleteGroupFunction() {
      const name = document.getElementById("group_delete_name").value;
      let groupDeletedData = {};
      this.axios
        .delete(`/people-groups/${name}`,
          { headers: { Authorization: "Bearer " + this.token } }
        )
        .then((response) => {
          groupDeletedData = response.data;
          alert(`Groupe ${groupDeletedData.name} supprimé.`)
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  }
}
</script>

<template>
  <div id="admin">
    <div class="account">
      <button @click="accountFunction()">
        <span>Créer un compte</span>
      </button>
    </div>
    <div class="accountD">
      <button @click="accountDeleteFunction()">
        <span>Supprimer un compte</span>
      </button>
    </div>
    <div class="group">
      <button @click="groupFunction()">
        <span>Créer un groupe</span>
      </button>
    </div>
    <div class="groupD">
      <button @click="groupDeleteFunction()">
        <span>Supprimer un groupe</span>
      </button>
    </div>
    <div id="form" v-show="form_display === 'account'">
      <form v-on:submit.prevent="registerFunction()" id="account_form">
        <div>
          <label for="account_email">Email : </label>
          <input type="text" placeholder="Email du compte" id="account_email" name="account_email" />
        </div>
        <div>
          <label for="account_password">Mot de passe : </label>
          <input type="password" placeholder="Mot de passe du compte" id="account_password"
            name="account_password" />
        </div>
        <div>
          <label for="peopleGroup-select">Groupe : </label>
          <select id="peopleGroup">
            <option :value="group.id" v-for="(group) in groupsData" :key="group.id">{{ group.name }}</option>
          </select>
        </div>
        <div>
          <label for="role">Role : </label>
          <select id="role">
            <option value="">Sélectionnez un rôle</option>
            <option value="USER">Utilisateur</option>
            <option value="COACH">Coach</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button>Enregister le compte</button>
      </form>
    </div>
    <div id="form" v-show="form_display === 'accountD'">
      <form v-on:submit.prevent="deleteUserFunction()" id="account_delete_form">
        <div>
          <label for="account_delete_email">Email : </label>
          <input type="text" placeholder="E-mail compte à supprimer" id="account_delete_email"
            name="account_delete_email" />
        </div>
        <button>Supprimer le compte</button>
      </form>
    </div>
    <div id="form" v-show="form_display === 'group'">
      <form v-on:submit.prevent="createGroupFunction()" id="group_form">
        <div>
          <label for="group_name">Nom du groupe : </label>
          <input type="text" placeholder="Nom du futur groupe" id="group_name" name="group_name" />
        </div>
        <button>Enregister le groupe</button>
      </form>
    </div>
    <div id="form" v-show="form_display === 'groupD'">
      <form v-on:submit.prevent="deleteGroupFunction()" id="group_delete_form">
        <div>
          <label for="group_delete_name">Nom du groupe : </label>
          <input type="text" placeholder="Nom groupe à supprimer" id="group_delete_name" name="group_delete_name" />
        </div>
        <button>Supprimer le groupe</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#admin {
  display: grid;
  margin-top: 15vh;
  column-gap: 10px;
  row-gap: 50px;
  grid-template-columns: "2fr 1fr 1fr 2fr";
  grid-template-rows: "auto auto";
  grid-template-areas: "account_create account_delete group_create group_delete"
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

.account {
  grid-area: account_create;
  display: flex;
  justify-content: right;
}

.accountD {
  grid-area: account_delete;
  display: flex;
  justify-content: center;
}

.group {
  grid-area: group_create;
  display: flex;
  justify-content: center;
}

.groupD {
  grid-area: group_delete;
  display: flex;
  justify-content: left;
}

#form {
  grid-area: form;
  display: flex;
  justify-content: center;
}
</style>
