<template>
    <v-app>
    <bottom-sheet/>
    <v-btn v-if="!isOpen" class="btn-add" :disabled="!isAvailable" v-on:click="openForm" color="success">
      <span v-if="!isAvailable">Getting location ...</span>
      <span v-else >Add blood type</span>
    </v-btn>
    <m-form v-if="isOpen"/>
    <l-map class="vmap"  :center="center" :zoom="zoom">
      <l-tile-layer 
      :url="tileType.url"
      ></l-tile-layer>
      <l-marker class="btn-add" v-bind:key="donor.id" v-for="donor in donors" :lat-lng="donor" >
        <l-popup id="pop-up">
         {{donor.name}}:
         <br>
         "{{donor.message}}"
        </l-popup>
      </l-marker>
    </l-map>

    <v-snackbar v-model="iDonated" :timeout="3000">
      Thank you for making this world a better place !
    </v-snackbar>
    </v-app>
</template>

<script>
import {LMap, LTileLayer , LMarker , LPopup} from 'vue2-leaflet';
import MForm from './VForm';
import BottomSheet from './bottomSheet';
import {mapState,mapActions}  from 'vuex';


export default {
  name : 'Vmap',
  components: { 
    MForm,
    LPopup,  
    LMarker,
    LMap,
    LTileLayer,
    BottomSheet

  },
  data () {
    return {
      s: true,
      overlay : true,
      absolute: true,
      tileType : {
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',   
      },
      marker: null,
    };
  },
  methods: {

    ...mapActions(['openForm','closeSheet']),
    getLocation () {   
    this.$getLocation(this.options)
   .then((coordinates) => { 
    this.$store.commit('setCenter',[coordinates.lat,coordinates.lng]);
    this.donor.lat = coordinates.lat,
    this.donor.lng = coordinates.lng,
    this.centerUpdated(this.center);
    this.$store.commit('setZoom',12);
    this.$store.commit('setIsAvailble',true);
    }).catch (() => {
      this.$store.dispatch('getLocationFromApi');
    });
    },
    setMap ()
    {
        if (localStorage.Donated)
        {
         this.$store.commit('setCenter',[localStorage.lat,localStorage.lng]);
         this.$store.commit('setIsAvailble',true);
        }
        else 
        {
        this.getLocation();
        }
    }
  },
  mounted() {
    this.setMap()
  },
  computed: mapState (['donors','donor','isOpen','sheet','zoom','center','isAvailable','validationError','iDonated']),
  created(){ 
    this.$store.dispatch('getDonors');
    }

}
</script>

<style scoped>
.vmap {
    z-index: 0 !important;
    width: 100% !important;
    height: 100%;
    position: absolute !important;
    right :0;
    left : 0;
}

.btn-add {
    z-index: 999;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px !important;
    animation-name: btnAnimation;
    animation-delay: 0;
    animation-duration: .3s;
}

@keyframes btnAnimation {
    
    0%  {
      transform: scale(0.2);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

#pop-up {

  padding: 5px;
  color : #000;
  font-size: 15px;
}


</style>
