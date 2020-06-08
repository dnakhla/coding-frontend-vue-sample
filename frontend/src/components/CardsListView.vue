<template>
  <div>
    <h2>List</h2>
    <ul id="example-1">
      <li v-for="card in list" :key="card.id">
        {{ card.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>
