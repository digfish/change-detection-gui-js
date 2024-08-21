// src/FillParams.vue
<script setup>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonIcon
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { stopwatch, home } from 'ionicons/icons'
import { setItem } from './storage'
import { info } from './changedetection'
</script>

<template>
  <ion-page>
    <ion-header translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-buttons :collapse="true" slot="start">
          <ion-button href="/">
            <ion-title>change detection</ion-title>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <div id="container">
        <div class="error" v-if="error !== null">
          <p>{{ error }}</p>
        </div>
        You need to enter your base domain (https://) and your API key.
        <form v-on:submit.prevent="onSubmit">
          <p><label for="base">Base Domain</label>
          <input type="text" id="base" requred v-model="baseDomain" />
          </p>
          <p>
          <label for="key">API Key</label>
          <input type="text" id="key" required v-model="apiKey" />
        </p>
        
          <ion-button type="submit">Submit</ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.error {
color: red;
}
.list-title {
  font-weight: bold;
  font-size: 1.2em;
}

#container {
  min-height: 100%;
}
label {
  display:block;
  font-size: 1.1em;
  font-weight: bold;
  text-transform: uppercase
}

form p {
  padding-bottom: 15px;
}

input {
  min-width: 90%;
  font-size: 1.3em;
}
</style>

<script>
export default {
  components: {
    IonContent,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonPage,
    IonHeader,
    IonTitle
  },
  name: 'FillParams',
  setup() {
    console.log('Setupping...!')
  },
  async created() {
    console.log(this.error)
  },
  methods: {
		fillConfig(baseDomain, apiKey) {
		return new Promise((resolve,reject) => {
			setItem('CHANGEDETECTION_BASE_URL', baseDomain)
			setItem('API_KEY', apiKey)
			console.log('config filled!')
			resolve({'baseDomain':baseDomain,'apiKey':apiKey})
	  });
    },
    async onSubmit() {
      console.log('Submitting...')
      this.fillConfig(this.baseDomain, this.apiKey).then((config) => {
		console.log('fillConfig then',config);
        info()
          .then((data) => {
            console.log('success calling API!')
            console.log(data)
            this.$router.push('/')
          })
          .catch((error) => {
            console.error(error)
            console.info('Try again!')
			this.error = error;
            return
          })
      })
    }
  },
  data() {
    return {
      baseDomain: '',
      apiKey: '',
      error: null
    }
  },
  computed: {}
}
</script>
