<script setup>
import { IonPage, IonRouterOutlet, IonHeader, 
    IonToolbar, IonTitle, IonButtons, IonTabBar,
    IonBackButton, IonContent, IonTabs, IonLabel, IonTabButton, } from '@ionic/vue'
import { info, list, watchInfo, watchHistory, historyItem, snapshotsDiff } from './changedetection'
import { toIsoString } from './helpers'
import { RouterLink } from 'vue-router';
</script>

<script>

export default {
    name: "Watchingtabs",
    async created() {
        this.uuid = this.$route.params.uuid
        console.log('Watching-tabs component created for ' + this.uuid)
        this.watchingInfo = await watchInfo(this.uuid)
        console.log(this.watchingInfo)
        this.title = this.watchingInfo.title ? this.watchingInfo.title : this.watchingInfo.url
        

    },
    data() {
        return {
            uuid: null,
            watchingInfo: null,
            title: null,
            snapshots: null,
            lastDiff: null
        }
    },
	
	mounted() {
        console.log('current route',this.$router.currentRoute.value)
		//console.log("mounted => going to main tab");
        //if (this.$router.currentRoute.value.name == 'watch')
        //    this.$router.push({ name: 'watchingmain', params: { uuid: this.uuid }, replace: true })
		//this.$router.push({name:'watchingmain', params:{ uuid: this.uuid},replace:true})
	},
	
    methods: {
        async fetchSnapshot(tmstmp) {
            return await historyItem(this.uuid, tmstmp)
        },
        async fillArea(tmstmp) {
            console.log('fillArea', tmstmp)
            let area = document.querySelector('textarea')
            area.innerHTML = await this.fetchSnapshot(tmstmp)
        },
        gotoTabMain() {
            console.log(`gotoTabMain(): Going to ${this.mainTabUrl}`)
            this.$router.push(this.mainTabUrl);
        },
        gotoTabDetail() {
            console.log(`gotoTabDetail(): Going to ${this.detailTabUrl}`)
            this.$router.push(this.detailTabUrl);
        },

    },

    computed : {
        mainTabUrl() {
            return `/watch/${this.uuid}/main` ; 
        },
        detailTabUrl() {
            return `/watch/${this.uuid}/detail`;
        }

    },

    components: { IonPage, IonRouterOutlet, IonHeader, IonTitle, IonContent, IonTabs, IonLabel, IonTabButton }
}

</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar slot="secondary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{title}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content> <router-link to="/">Home</router-link>
        </ion-content>

        <ion-tabs>
            <ion-router-outlet>
            </ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button v-on:click="gotoTabMain" tab="main">
                    <ion-label>Main</ion-label>
                </ion-tab-button>
                <ion-tab-button v-on:click="gotoTabDetail" tab="detail">
                    <ion-label>Detail</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>