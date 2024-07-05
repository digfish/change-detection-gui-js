<script setup>
import { info, list } from './changedetection'

import { IonApp, IonRouterOutlet, IonFooter } from '@ionic/vue'
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
export default {
  components: {},
  name: 'App',
  async created() {
    //let _info = await info()
    //this.serverStatus = await info()
    //console.log(this.serverStatus)
  },
  data() {
    return {
      serverStatus: null
    }
  }
}
</script>

<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-color: lightyellow;
  color: navy;
}

nav a {
  color: navy;
}

/* Set the footer element */
footer {
  /* Set the background color */
  background-color: #f2f2f2;

  /* Set the text color */
  color: #555;

  /* Add some padding for spacing */
  padding: 20px;

  /* Set the position to always stick to the bottom */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  /* Set a border and its properties */
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  /* Adjust the text alignment */
  text-align: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
