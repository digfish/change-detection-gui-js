// src/Home.vue
<script setup>
import { info, list } from './changedetection'
import { sortBy, reverse } from 'lodash'
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
  IonIcon,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { fetchFavicon, favicone } from './helpers'
import { stopwatch, home, albumsOutline } from 'ionicons/icons'
import { removeItem } from './storage'
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
        <ion-list>
          <ion-item
            style="cursor: pointer"
            v-for="[uuid, watch] in watchingsByLastModifed"
            v-on:click="gotoWatch(uuid)"
          >
            <img width="24" height="24" v-bind:src="favicon(watch.url)" />
            <!-- <ion-icon :icon="stopwatch" /> -->
            &nbsp; &nbsp;
            <ion-label>
              <span class="list-title">
                {{ watch.title ? watch.title : watch.url }}
              </span>
              <a v-bind:href="watch.url" target="_blank"> 
                <ion-icon name="link-outline"></ion-icon>
              </a>
              {{ toDatetime(watch.last_changed) }}
            </ion-label>
          </ion-item>
        </ion-list>
        <button v-on:click="purgeStorage">purge local Storage</button>
      </div>
    </ion-content>

    <!--ion-footer>
      <span style="font-family: monospace">
        {{ serverStatus }}
      </span>
    </ion-footer>-->
  </ion-page>
</template>

<style scoped>
.list-title {
  font-weight: bold;
  font-size: 1.2em;
}

#container {
  min-height: 100%;
  padding-left: 5pt;
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
  name: 'Home',
  setup() {
    console.log('Setupping...!')
  },
  async created() {
    // test if the configuration is valid
    info().catch((err) => {
      console.error(err)
      this.router.push({ name: 'fillparams', query: { error: err + 'info' } })
      return
    })

    list()
      .then((res) => {
        this.watchings = res
      })
      .catch((err) => {
        console.error(err)
        this.router.push({ name: 'fillparams', query: { error: err } })
      })
  },
  methods: {
    purgeStorage() {
      console.log('Purge storage!')
      removeItem('API_KEY')
      //removeItem('CHANGEDETECTION_BASE_URL');
    },
    gotoWatch(uuid) {
      console.log('Going to watch', uuid)
      this.router.push({ name: 'watch', params: { uuid: uuid } })
    },
    toDatetime(tmstmp) {
      let d = moment(new Date(tmstmp * 1000))
      return moment(d).format('YYYY-MM-DD HH:mm:ss')
    },
    favicon(url) {
      let _url = new URL(url)
      let iconUrl = favicone(_url)
      return iconUrl
    }
  },
  data() {
    return {
      watchings: null,
      router: useRouter()
    }
  },
  computed: {
    watchingsByLastModifed() {
      if (this.watchings != null) {
        let sorted = sortBy(Object.entries(this.watchings), ([uuid, object]) => object.last_changed)
        let reversed = reverse(sorted)

        return reversed
      }
    }
  }
}
</script>
