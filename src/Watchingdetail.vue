<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonTabBar,
  IonBackButton,
  IonContent,
  IonTabs,
  IonLabel,
  IonTabButton
} from '@ionic/vue'
import { info, list, watchInfo, watchHistory, historyItem, snapshotsDiff } from './changedetection'
import { toIsoString, capitalizeString } from './helpers'
</script>

<script>
export default {
  name: 'Watchingdetail',
  async created() {
    this.uuid = this.$route.params.uuid
    console.log('details component created for watching ' + this.uuid)
    this.watchingInfo = await watchInfo(this.uuid)
    console.log(this.watchingInfo)
    this.title = this.watchingInfo.title ? this.watchingInfo.title : this.watchingInfo.url
    this.keyFieldValues = Object.keys(this.watchingInfo).map((key) => {
      return {
        key: key,
        value: this.watchingInfo[key]
      }
    })
  },
  data() {
    return {
      uuid: null,
      watchingInfo: null,
      title: null,
      snapshots: null,
      lastDiff: null,
      keyFieldValues: null
    }
  },
  methods: {
    hi() {
      console.log(this.msg)
    },
    async fetchSnapshot(tmstmp) {
      return await historyItem(this.uuid, tmstmp)
    },
    async fillArea(tmstmp) {
      console.log('fillArea', tmstmp)
      let area = document.querySelector('textarea')
      area.innerHTML = await this.fetchSnapshot(tmstmp)
    }
  },

  computed: {
    detailFieldValues() {
      return null
    }
  },

  components: { IonPage, IonHeader, IonTitle, IonContent, IonTabs, IonLabel, IonTabButton }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar> </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-title> Details </ion-title>
      <table style="padding-left: 50px; padding-top: 15px; display: block " >
        <tr v-for="pkv in keyFieldValues" style="margin-top: 2pt;">
          <td
            style="font-weight: bold;  font-family: Arial, Helvetica, sans-serif: font-size: 1.1em"
          >
            {{ capitalizeString(pkv.key) }}
          </td>
          <td style="padding-left: 15px">
            {{ pkv.value }}
          </td>
        </tr>
      </table>
    </ion-content>
  </ion-page>
</template>
