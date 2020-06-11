<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --main-bg-color: #10314a;
  --faded-bg-color: #10314a55;
  --primary-color: #ac5239;
  --grey-color: #83838344;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
html {
  font-size: 62.5%; //rem  1rem = 10px
  border-color: var(--main-bg-color);
}
#app {
  max-width: 600px;
  margin: auto;
}
</style>
