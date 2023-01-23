<script>
//this file display profile page
import ProfileDivVue from "@/components/ProfileDiv.vue";
import UpdateDivVue from "@/components/UpdateDiv.vue";
import PasswordDivVue from "@/components/PasswordDiv.vue";

export default {
  inject: ["axios"],

  emits: ["emailUpdate"],

  components: {
    ProfileDivVue,
    UpdateDivVue,
    PasswordDivVue,
  },

  props: {
    email: String,
    token: String,
  },

  data() {
    return {
      userData: {},
      groupName: String,
      update: false,
      password: false,
    };
  },

  beforeMount() {
    // fetchs user's data
    this.axios
      .get(`/users/${this.email}`, {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((response) => {
        this.userData = response.data;
        this.groupName = this.userData.group.name;
      })
      .catch((error) => {
        alert(error.message);
      });
  },

  methods: {
    // function to change page's display and fecth user's new data
    updated() {
      (this.update = false),
        this.axios
          .get(`/users/${this.email}`, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            this.userData = response.data;
          })
          .catch((error) => {
            alert(error.message);
          });
    },

    emailUpdate() {
      this.$emit("emailUpdate");
    },
  },
};
</script>

<template>
  <ProfileDivVue
    v-if="!update && !password"
    :userData="userData"
    :groupName="groupName"
    :profile="true"
    @update="update = true"
    @password="password = true"
  />
  <UpdateDivVue
    v-if="update"
    :userData="userData"
    :token="token"
    @updated="updated()"
    @return="this.update = false"
    @email="emailUpdate()"
  />
  <PasswordDivVue
    v-if="password"
    :userId="userData.id"
    :token="token"
    @updated="password = false"
  />
</template>
