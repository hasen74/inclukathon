<script>
import {iterator} from "core-js/stable/dom-collections";

let today = new Date();
let currentYear = today.getFullYear()
let yearIter = 0

let monthIter = today.getMonth()
let currentMonth = monthIter
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let monthName =
  [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ]

let currentDay = today.getDate()

let eventDate = ""
let eventName = ""
let eventColor = ""
let eventTime = ""

let parsedDay = 0
let parsedMonth = 0
let parsedYear = 0

let isUpdated = true
let deletion = false

let k = 0;

let events = []

export default {
  inject: ['axios'],

  data() {
    return {
      monthIter,
      currentMonth,
      months,
      monthName,
      currentYear,
      yearIter,
      currentDay,
      eventDate,
      eventName,
      eventColor,
      eventTime,
      parsedDay,
      parsedMonth,
      parsedYear,
      events,
      isUpdated,
      deletion,
      k,
    }
  },
  props: {
    token: String,
    role: String,
  },
  methods: {
    iterator,

    roundUp() {
      if (this.monthIter > 11) {
        this.monthIter = 0
        this.yearIter += 1
      }
    },

    roundDown() {
      if (this.monthIter < 0) {
        this.monthIter = 11
        this.yearIter -= 1
      }
    },

    async postEvent() {
      eventDate = document.getElementById('datePicker').value
      eventName = document.getElementById('name').value
      eventColor = document.getElementById('colorPicker').value
      eventTime = document.getElementById('hour').value

      await this.axios.post("/calendar-entries", {
        date: eventDate,
        time: eventTime,
        name: eventName,
        color: eventColor,
      }, {
        headers: { Authorization: "Bearer " + this.token }
      })
        .then((response) => {
          this.events.push(response.data)
          console.log(this.events)
      })
        .catch(function (error) {
        console.log(error)
      })
      await this.fetchApi()
      window.location.reload()
      this.k += 1
    },

    deleteApi(x) {

      if (this.role === 'ADMIN' || this.role === 'COACH') {
      this.axios
          .delete(`/calendar-entries/${x}`, {
            headers: { Authorization: "Bearer " + this.token }
          })
      }
      window.location.reload()
    },

    deleteFront(x) {
      if (this.role === 'ADMIN' || this.role === 'COACH') {
      events.splice(x, 1)
      }
    },


    async fetchApi() {

      events = []

      await this.axios
        .get(`/calendar-entries/`, {
          headers: { Authorization: "Bearer " + this.token }
        })
        .then((response) => {
            for (let i = 0; i < response.data.length; i += 1) {
            this.events.push({
              id: response.data[i].id,
              theDate: {
                day: parseInt(response.data[i].date.split('-').at(2)),
                month: parseInt(response.data[i].date.split('-').at(1)),
                year: parseInt(response.data[i].date.split('-').at(0))
              },
              name: response.data[i].name,
              time: response.data[i].time,
              color: response.data[i].color,
            })
          }
        })
      console.log(this.events)
    }
  },

  beforeMount() {
    this.fetchApi()
  },
}

</script>

<template>
  <div id="view" :key="k">
    <div id="sideMenu" v-if ="role === 'ADMIN' || role === 'COACH'">
      <h3>Nouvel évènement</h3>
      <form v-on:submit.prevent="postEvent()">
        <div>
          <label for="datePicker">Date: </label>
          <input type="date" name="date" id="datePicker" placeholder="jj/mm/year" required>
        </div>

        <div>
          <label for="name">Nom de l'évènement </label>
          <input type="text" name="name" id="name" placeholder="ex: Meet">
        </div>

        <div>
          <label for="hour">Heure: </label>
          <input type="time" name="hour" id="hour">
        </div>

        <div>
          <label for="colorPicker">Couleur du tag: </label>
          <input type="color" name="colorPicker" id="colorPicker" placeholder="#000000"/>
        </div>
        <button>Envoyer</button>
      </form>
    </div>

    <div id="calendarWrapper">
      <div id="calendarHead">
        <h2>{{monthName[monthIter]}}</h2>
        <h2>{{currentYear + yearIter}}</h2>
        <div id="buttonWrapper">
          <button @click="monthIter -= 1; roundDown()">{{'<<'}}</button>
          <button @click="monthIter += 1; roundUp()">{{'>>'}}</button>
        </div>
      </div>
      <div id="calendar">
        <div class="days" v-for="i in months[monthIter]" :key="i">
          <div class="dayLabel">
            {{ i }}
            <div
              v-if="i === currentDay &&
              monthIter === currentMonth &&
              currentYear + yearIter === currentYear"
              id="circle">
            </div>
          </div>

          <div v-for="(item, index) in events" :key="item.name">
            <div
              class="event"
              v-if="i === item.theDate.day &&
              item.theDate.month - 1 === monthIter &&
              item.theDate.year === currentYear + yearIter"
              @click="deleteFront(index); deleteApi(parseInt(item.id))"
              >
              <div class="pin" v-bind:style="{ backgroundColor: item.color} "></div>
              {{ item.time }}
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
:root {
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

* {
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin: 20px 0 20px 0;
}

input:focus {
  outline-color: rgba(255, 105, 180, 0.5);
}

#view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #ffffff;
  height: 590px;
  width: 90%;
  position: relative;
  left: 5%;
}

#sideMenu {
  display: flex;
  flex-direction: column;
  width: 19.88%;
  padding: 10px;
  border-right-style: solid;
  border-right-width: 2px;
  border-color: #555;
  border-radius: 4px;
  background: #eeeeee;
}

#sideMenu h3 {
  text-align: center;
}

#calendar {
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(100px, auto);
  width: 100%;
  height: 100%;
}

#calendarWrapper {
  display: flex;
  flex-direction: column;
  width: 79.88%;
  height: auto;
}

#calendarHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 14px;
}

#calendarHead h2 {
  width: 8%;
}

#buttonWrapper {
  width: 40%;
  height: fit-content;
}

#buttonWrapper button {
  position: relative;
  width: 48%;
  margin: 1%;
  background: hotpink;
  border-radius: 4px;
  border-style: solid;
  border-width: 0 0 3px 3px;
  border-color: #ab487d;
}

#buttonWrapper button:hover {
  top: 1px;
  border-width: 0 0 2px 2px;
}

#buttonWrapper button:active {
  top: 2px;
  border-width: 0 0 1px 1px;
}

#circle {
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background: dodgerblue;
  margin: 4px;
}

.days {
  display: flex;
  flex-direction: column;
  background: #eeeeee;
  border-color: #e8e8e8;
  border-radius: 4px;
}

.dayLabel {
  display: flex;
  flex-direction: row;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(163,113,208, 0.5) 0%, rgba(245,78,162, 0.5) 100%);
}

.event {
  margin: 3px;
}

.pin {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin: 7px 2px 0 5px;
}
</style>
