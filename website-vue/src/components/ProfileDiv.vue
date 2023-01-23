<script>
// this file is a component to display a user's data
export default {
  props: {
    userData: {},
    groupName: String,
    profile: Boolean,
  },

  emits: ["update", "password"],
};
</script>

<template>
  <div id="profile_div">
    <div id="div_wrapper">
      <div id="user_info">
        <div class="one_line">
          <p>Prénom:</p>
          <p>{{ userData.firstName }}</p>
        </div>
        <div class="one_line">
          <p>Nom:</p>
          <p>{{ userData.lastName }}</p>
        </div>
        <div class="one_line">
          <p>Genre:</p>
          <p>{{ userData.gender }}</p>
        </div>
        <div class="one_line">
          <p>Pronoms:</p>
          <p>{{ userData.pronouns }}</p>
        </div>
        <div class="one_line">
          <p>Email:</p>
          <p>{{ userData.email }}</p>
        </div>
        <div v-if="groupName" class="one_line">
          <p>Groupe:</p>
          <p>{{ groupName }}</p>
        </div>
        <div v-if="userData.disability" class="one_line">
          <p>Handicap:</p>
          <p>{{ userData.disability }}</p>
        </div>
        <div v-if="userData.description" class="multi_line">
          <p>Description:</p>
          <p id="description">{{ userData.description }}</p>
        </div>
      </div>
      <div id="btn_wrapper">
        <div v-if="profile" id="btn_pack">
          <button class="update_btn" @click="$emit('password')">
            Modifer le mot de passe
          </button>
          <button class="update_btn" @click="$emit('update')">
            Modifer le profil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#profile_div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#div_wrapper {
  width: fit-content;
  display: flex;
  flex-direction: column;
}

#user_info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: max-content;
  max-width: 70%;
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

.one_line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
  padding: 0 10px 0 20px;
}

.multi_line {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 0;
  margin: 20px;
}

p {
  padding: 0px 20px;
  margin: 0;
}

#btn_wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#btn_pack {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.update_btn {
  background-color: rgba(245, 78, 162, 1);
  border-color: #555;
}

.update_btn:hover {
  background-color: rgba(163, 113, 208, 1);
}
</style>
