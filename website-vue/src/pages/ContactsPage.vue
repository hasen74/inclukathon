<script>
// this file display all other users
import ProfileDivVue from "@/components/ProfileDiv.vue";

export default {
  inject: ["axios"],

  components: {
    ProfileDivVue,
  },

  props: {
    email: String,
    token: String,
  },

  data() {
    return {
      usersData: [],
      userDisplay: false,
      userIndex: 0,
    };
  },

  beforeMount() {
    // fetchs all users' data
    this.axios
      .get("/users/", {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((response) => {
        this.usersData = response.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  },
};
</script>

<template>
  <!-- Display list of users -->
  <div v-if="!userDisplay" id="contact_wrapper">
    <div v-for="i in ['USER', 'COACH', 'ADMIN']" :key="i">
      <div class="cat_wrapper">
        <div class="bloc_title">{{ i }}</div>
        <div v-for="(item, index) in usersData" :key="index">
          <button
            class="profile_btn"
            v-if="item.email !== email && item.role === i"
            @click="(userDisplay = true), (userIndex = index)"
          >
            {{ item.firstName }} {{ item.lastName }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Display chosen user's data -->
  <div id="user_div" v-if="userDisplay">
    <div id="div_wrapper">
      <ProfileDivVue :userData="usersData[userIndex]" />
      <div id="btn_slide">
        <div id="button_wrapper">
          <button @click="userDisplay = false">Retour</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#contact_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.bloc_title {
  font-weight: bold;
  color: #ffffff;
  margin: 5px 0px 10px 0px;
}

.cat_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  min-width: max-content;
  background: rgb(163, 113, 208);
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
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

button:hover {
  background-color: rgba(163, 113, 208, 1);
}

#user_div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#div_wrapper {
  width: fit-content;
}

#btn_slide {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#button_wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#button_wrapper button {
  background-color: rgba(245, 78, 162, 1);
}

#button_wrapper button:hover {
  background-color: rgba(163, 113, 208, 1);
}
</style>
