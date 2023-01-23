<script>
//This file is managing the send and the receive of the messages.
import { Socket } from "engine.io-client";

export default {
  inject: ["axios"],

  props: {
    firstName: String,
    messages: [],
    socket: Socket,
    name: String,
    token: String,
  },

  data() {
    return {
      textInput: "",
      isPopup: false,
      isUpdate: false,
      isDelete: false,
      temp_msg: {
        id: 0,
        name: "",
        message: "",
        updated: false,
        deleted: false,
        firstName: "",
      },
    };
  },

  methods: {
    // function to send a message to others and to the database
    sendMessage() {
      if (this.textInput !== "") {
        this.socket.emit("MESSAGE", {
          name: this.name,
          firstName: this.firstName,
          message: this.textInput,
        });
        this.axios.post(
          "/conv-groups/",
          {
            name: this.name,
            firstName: this.firstName,
            message: this.textInput,
          },
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        );
        this.textInput = "";
      }
    },

    // function to trigger Pop-up and deal with variables
    changePopup(item, clear) {
      if (item) {
        this.temp_msg = item;
      }
      if (clear) {
        this.isUpdate = false;
        this.isDelete = false;
      }
      this.isPopup ? (this.isPopup = false) : (this.isPopup = true);
    },

    // function to trigger update option and deal with variables
    async changeUpdate(done) {
      if (done) {
        // if update is done pacth corresponding message in the database
        this.temp_msg.message = document.getElementById("new_text").value;
        await this.axios.patch(
          `/conv-groups/${parseInt(this.temp_msg.id)}`,
          {
            name: this.temp_msg.name,
            firstName: this.temp_msg.firstName,
            message: this.temp_msg.message,
            updated: true,
            deleted: false,
          },
          { headers: { Authorization: "Bearer " + this.token } }
        );
        // tells others users that a message changed
        this.socket.emit("CHANGE");
        this.isPopup = false;
      }
      this.isUpdate ? (this.isUpdate = false) : (this.isUpdate = true);
    },

    // function to trigger delete option and to deal with variables
    async changeDelete(done) {
      if (done) {
        // if delete is done patch corresponding message in the database
        await this.axios.patch(
          `/conv-groups/${parseInt(this.temp_msg.id)}`,
          {
            name: this.temp_msg.name,
            firstName: this.temp_msg.firstName,
            message: this.temp_msg.message,
            updated: false,
            deleted: true,
          },
          { headers: { Authorization: "Bearer " + this.token } }
        );
        // tells others users that a message changed
        this.socket.emit("CHANGE");
        this.isPopup = false;
      }
      this.isDelete ? (this.isDelete = false) : (this.isDelete = true);
    },
  },

  // function to update display when a new message is sent or received
  updated() {
    const element = document.getElementById("conv");
    element.scrollTop = element.scrollHeight;
  },
};
</script>

<template>
  <div>
    <!-- Pop-up div -->
    <div v-if="isPopup" id="grey">
      <div id="popup">
        <div v-if="!isUpdate && !isDelete" id="options">
          <button @click.prevent="changeUpdate()">
            <img src="../images/icons8-pen-25.png" alt="pen icon by css man" />
            <p>Modifier le message</p>
          </button>
          <button @click.prevent="changeDelete()">
            <img
              src="../images/icons8-trash-can-64.png"
              alt="bin icon by css man"
            />
            <p>Supprimer le message</p>
          </button>
        </div>
        <div v-if="isUpdate">
          <input type="text" :value="temp_msg.message" id="new_text" />
          <button @click.prevent="changeUpdate(true)">
            Modifier le message
          </button>
        </div>
        <div v-if="isDelete" id="ask_del_msg">
          <div>Etes-vous sûr de vouloir supprimer ce message ?</div>
          <div id="choice">
            <button @click.prevent="changeDelete(true)">Oui</button>
            <button @click.prevent="changeDelete()">Non</button>
          </div>
        </div>
        <div id="btn_pack">
          <button
            v-if="isUpdate || isDelete"
            id="annul"
            @click.prevent="isUpdate ? changeUpdate() : changeDelete()"
          >
            Retour
          </button>
          <button id="annul" @click.prevent="changePopup(undefined, true)">
            Annuler
          </button>
        </div>
      </div>
    </div>
    <!-- Conversation div -->
    <div id="conv">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="msgItem"
        ref="msgContainer"
      >
        <div>
          <a v-if="firstName !== item.firstName">{{ item.firstName }}</a>
          <div :class="{ mine: firstName === item.firstName }">
            <p v-if="item.updated === true" id="updated_msg">
              Ce message a été modifié.
            </p>
          </div>

          <div :class="{ mine: firstName === item.firstName }">
            <p v-if="!item.deleted && item.firstName !== firstName">
              {{ item.message }}
            </p>
            <button
              v-if="!item.deleted && item.firstName === firstName"
              .class="msg_btn"
              @click.prevent="changePopup(item, false)"
            >
              <p>{{ item.message }}</p>
            </button>
            <p v-if="item.deleted" id="deleted_msg">
              Ce message a été supprimé par l'utilisateur.
            </p>
          </div>
        </div>
      </div>
    </div>
    <form id="form" v-on:submit.prevent="sendMessage">
      <input
        type="text"
        placeholder="Type your message here"
        v-model="textInput"
      />
      <button>Envoyer</button>
    </form>
  </div>
</template>

<style scoped>
#conv {
  overflow-y: auto;
}

#conv::-webkit-scrollbar {
  display: none;
}

p {
  width: max-content;
  max-width: 90%;
  margin-top: 2px;
  padding: 5px;
  border-radius: 50px 50px 50px 0;
  background-color: gray;
}

.mine {
  display: flex;
  justify-content: right;
  overflow-wrap: break-word;
}

.mine p {
  width: max-content;
  max-width: 90%;
  margin-top: 2px;
  padding: 6px 10px 6px 10px;
  border-radius: 50px 50px 0 50px;
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
  overflow-wrap: break-word;
}

.mine button {
  border: none;
  background: none;
}

#form {
  width: 98%;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 6px;
}

#form input {
  width: 90%;
  border-color: rgba(163, 113, 208, 0.5);
  border-radius: 4px;
}

#form input:focus {
  outline-color: rgba(163, 113, 208, 1);
}

#form button {
  width: 10%;
  min-width: max-content;
  border-style: none;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
}

#grey {
  background-color: rgba(0, 0, 0, 0.236);
  position: absolute;
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
}

#popup {
  background-color: white;
  border-radius: 10px;
  margin-top: 15%;
  margin-left: 15%;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#ask_del_msg {
  font-size: unset;
}

#options {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#options button {
  border: none;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#options button img {
  width: 25px;
  height: 25px;
}

#options button p {
  border-radius: 0px;
}

#btn_pack {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

#deleted_msg {
  font-style: italic;
  font-size: small;
}

#updated_msg {
  font-size: smaller;
  font-style: italic;
  background: none;
}
</style>
