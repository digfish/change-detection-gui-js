<script setup>
import {
    IonPage, IonHeader,
    IonToolbar, IonTitle, IonButtons, IonTabBar,
    IonBackButton, IonContent, IonTabs, IonLabel, IonTabButton, IonButton, IonIcon, IonSelect, IonSelectOption
} from '@ionic/vue'
import { home } from 'ionicons/icons';
import { info, list, watchInfo, watchHistory, historyItem, snapshotsDiff } from './changedetection'
import { toIsoString,toDatetime } from './helpers'
</script>

<script>

export default {
    name: "Watchingmain",
    async created() {
        this.uuid = this.$route.params.uuid
        console.log('main component created for watching ' + this.uuid)
        this.watchingInfo = await watchInfo(this.uuid)
        console.log(this.watchingInfo)
        this.title = this.watchingInfo.title ? this.watchingInfo.title : this.watchingInfo.url
        this.snapshots = await watchHistory(this.uuid)
        console.log('timestamps')
        this.tmstmps = Object.keys(this.snapshots)
        console.log(this.tmstmps)
        this.mostRecentTmstmp = this.tmstmps[this.tmstmps.length - 1]
        this.selectedTmsmtp = this.mostRecentTmstmp
        //const laterTmstmp = tmstmps[this.tmstmps.length - 2]
		this.selectedSnapshot = await historyItem(this.uuid,this.selectedTmsmtp);
        //this.lastDiff = await snapshotsDiff(this.uuid, mostRecentTmstmp, laterTmstmp)
    },
    setup() {
        return { home }
    },
    data() {
        return {
            uuid: null,
            watchingInfo: null,
            title: null,
            snapshots: null,
            lastDiff: null,
            mostRecentTmstmp: null,
			mostRecentSnapshot: null,
            selectedTmsmtp: null,
            tmstmps: null,
            selectedSnapshot: null,
            tmstmpLabel: null
        }
    },
    methods: {
        async nextSnapshot() {
            console.log('nextSnapshot >>')
            let currIdx = this.tmstmps.indexOf(this.selectedTmsmtp)
            console.log(currIdx)
            if (currIdx+1 < this.tmstmps.length) { 
                this.selectedTmsmtp = this.tmstmps[currIdx + 1]
                //this.selectedSnapshot = await this.fetchSnapshot( this.selectedTmsmtp);
            }
        },
        async previousSnapshot() {
            console.log('previousSnapshot <<')
            let currIdx = this.tmstmps.indexOf(this.selectedTmsmtp)
            console.log(currIdx)
            if (currIdx - 1 >= 0) {
                this.selectedTmsmtp = this.tmstmps[currIdx - 1]
                //this.selectedSnapshot = await this.fetchSnapshot(this.selectedTmsmtp);
            }
        },
        async fetchSnapshot(tmstmp) {
            return await historyItem(this.uuid, tmstmp)
        },
        async fillArea(tmstmp) {
            console.log('fillArea', tmstmp)
            let area = document.querySelector('textarea')
            area.innerHTML = await this.fetchSnapshot(tmstmp)
        },
        toDatetime(tmstmp) {
            return toDatetime(tmstmp)
        }
    },

    computed: {

    },
    watch: {
        async selectedTmsmtp(tmstmp) {
            this.tmstmpLabel = toDatetime(tmstmp)
            this.selectedSnapshot = await this.fetchSnapshot(tmstmp)
        }
    },

    components: { IonPage, IonHeader, IonTitle, IonContent, IonTabs, IonLabel, IonTabButton, IonIcon, IonButton }
}

</script>

<style>
#container {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
}

ion-title.big {
    font-size: 2em;
    display: inline-block
}

pre {
    margin: 5px;
    border-style: dashed;
    padding-left: 5px;
    padding-top: 10px;
    text-wrap: balance;
}

</style>

<template>

    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title> {{ title }} </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="content-inline">
        <div id="container">
            <div class="big">
                Snapshot at
                <ion-select v-model="selectedTmsmtp">
                    <ion-select-option v-for="tmstmp in tmstmps" v-bind:value="tmstmp">
                        {{ toDatetime(tmstmp) }}
                    </ion-select-option>
                </ion-select>
            </div>


            <ion-button v-on:click="previousSnapshot">
                <ion-icon icon="arrow-back"></ion-icon>
            </ion-button>

            <ion-button v-on:click="nextSnapshot">
                <ion-icon icon="arrow-forward"></ion-icon>
            </ion-button>
            <pre>{{ selectedSnapshot }}</pre>
        </div>
        </ion-content>
    </ion-page>
</template>