<script setup>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton } from '@ionic/vue'
import { info, list, watchInfo, watchHistory, historyItem, snapshotsDiff } from './changedetection'
import { toIsoString } from './helpers'
</script>

<script>
export default {
  name: 'Watchingpage',

  async created() {
    this.uuid = this.$route.params.uuid
    console.log('Watchingpage component created for ' + this.uuid)
    this.watchingInfo = await watchInfo(this.uuid)
    console.log(this.watchingInfo)
    this.title = this.watchingInfo.title ? this.watchingInfo.title : this.watchingInfo.url
    this.snapshots = await watchHistory(this.uuid)
    console.log('snapshots')
    const tmstmps = Object.keys(this.snapshots)
    console.log(tmstmps)
    const mostRecentTmstmp = tmstmps[tmstmps.length - 1]
    const laterTmstmp = tmstmps[tmstmps.length - 2]
    this.lastDiff = await snapshotsDiff(this.uuid, mostRecentTmstmp, laterTmstmp)
  },

  mounted() { },

  data() {
    return {
      msg: 'Hi!',
      uuid: null,
      watchingInfo: null,
      title: null,
      snapshots: null,
      lastDiff: null
    }
  },
  computed: {},
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
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>
          Watching page for <i>{{ title }}</i>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <pre>
      {{ lastDiff }}
      </pre>
      <select v-on:change="fillArea($event.target.value)">
        <option v-for="(snapshot, tmstmp) in snapshots" v-bind:value="tmstmp">
          {{ toIsoString(tmstmp) }}
        </option>
      </select>
      <textarea rows="30" cols="80"> </textarea>
      <pre>
    {{ watchingInfo }}
  </pre>
    </ion-content>
  </ion-page>
</template>
