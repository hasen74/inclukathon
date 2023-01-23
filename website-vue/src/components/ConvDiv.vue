<script>
//This file is setting the differents conversations for the user to choose the one he wants.
export default {
  props: {
    convList: [],
    convId: Number,
  },

  emits: ["changeConv"],
};
</script>

<template>
  <div class="contenor" :key="convId">
    <div v-for="(item, index) in convList" :key="index">
      <button
        :class="{ actualConv: item === convList[convId] }"
        @click.prevent="
          item !== convList[convId] ? $emit('changeConv', index) : null
        "
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.actualConv {
  background: linear-gradient(
    90deg,
    rgba(163, 113, 208, 1) 0%,
    rgba(245, 78, 162, 1) 100%
  );
}

button {
  width: 96%;
  height: 80px;
  margin: 5px;
  border-style: none;
  margin-top: 20px;
  max-height: 60px;
}

button:hover:not(.actualConv) {
  background: lightgray;
}
.contenor {
  align-items: center;
  width: 100%;
}
</style>
