<template>
<v-form ref="form" v-model="isValid" @submit.prevent="addDonor" :lazy-validation="isValid">
<v-card id="form" class="mx-auto" raised :loading="loading" >
    <v-card-title>Your informations</v-card-title>
   
    <v-card-text>
      
       <div v-if="validationErrors.length">
        <v-alert :key="error.value" v-for="error in validationErrors" dense outlined type="error">
          <li>{{error.msg}}</li>
        </v-alert>
       </div>
      
       <v-text-field 
       :counter="30"
       type="alphabet"
       label="Name" 
       :rules="nameRules"
       :maxlength="31"
       outlined 
       dense
       v-model="donor.name"
       />
       <v-text-field 
       :counter="10" 
       :rules="phoneRules"
       type="number"
       label="Phone" 
       :maxlength="10"
       outlined
       dense
       v-model="donor.phone"/>
       <v-select  dense :items="items" label="Blood Group" :rules="selectRules" outlined required v-model="donor.bloodGroup"/>
       <v-autocomplete
        dense
        v-model="donor.city"
        :items="cities"
        :rules="selectRules"
        hide-no-data
        label="city" 
        outlined
        hide-selected
        return-object
      ></v-autocomplete>
       <v-textarea
          outlined
          dense
          :rules="messageRules"
          :counter="100"
          label="Message"
          v-model="donor.message"
        ></v-textarea>
        <v-btn  block :loading="loading" :disabled="!isValid" type="submit" color="success">Submit</v-btn>
    </v-card-text>
    
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-on:click="openForm" text block color="error" >Hide</v-btn>
    </v-card-actions>
</v-card>
</v-form>

</template>

<script>
import {mapState , mapActions} from 'vuex';
export default {
    name : 'MForm',
    data () {
      return {
        items : ['A+', 'A-' , 'B+' ,'B-',
         'AB+', 'AB-', 'O+' , 'O-'],
        cities : [
  "Agadir",
  "Al Hoceïma‎",
  "Aoufous",
  "Arfoud",
  "Assilah",
  "Azilal",
  "Azrou",
  "Ben Guerir",
  "Benslimane",
  "Berkane",
  "Berrechid",
  "Bouarfa",
  "Boujdour‎",
  "Béni Mellal",
  "Casablanca",
  "Chefchaouen",
  "Chichaoua",
  "Dakhla",
  "El Hajeb",
  "El Jadida",
  "El Kelaâ des Sraghna",
  "Errachidia",
  "Es-Semara",
  "Essaouira",
  "Figuig",
  "Fnideq",
  "Fès",
  "Goulmima",
  "Guelmim",
  "Guercif‎",
  "Ifrane",
  "Inezgane",
  "Kasba Tadla",
  "Khouribga",
  "Khémisset",
  "Khénifra",
  "Ksar El Kébir",
  "Kénitra",
  "Laayoune‎",
  "Larache",
  "M'diq",
  "Marrakech",
  "Martil",
  "Meknès‎",
  "Midelt",
  "Missour",
  "Mohammadia",
  "Nador",
  "Ouarzazate",
  "Ouazzane",
  "Oued-Eddahab",
  "Oujda",
  "Rabat",
  "Rissani",
  "Safi",
  "Salé",
  "Saïdia",
  "Settat",
  "Sidi Ifni",
  "Sidi Kacem",
  "Skhirate",
  "Séfrou",
  "Tan-Tan",
  "Tanger‎",
  "Taounate‎",
  "Tarfaya‎",
  "Taroudannt",
  "Tata",
  "Taza‎",
  "Tiznit",
  "Témara",
  "Tétouan‎",
  "Youssoufia",
  "Zagora"
], 
        isValid : false,
        nameRules: [
           value => !!value || 'This field is required !',
           value => value.length <= 30 || 'Maximum of 20 characters only allowed',
           value => /^[A-Za-z\s]+$/.test(value) || 'Invalid name'
        ],
         phoneRules: [
           value => !!value || 'This field is required !',
           value => value.length == 10 || 'Max digits is 10 !',
           value => /^(0[6]|0[7])[1-9]\d{7}$/.test(value) || 'Invalid phone number !'
        ],
         selectRules: [
           value => !!value || 'this field is required !',
        ],
         messageRules: [
           value => !!value || 'This field is required !',
           value => value.length <= 100|| 'Max 100 characters',
           value => value.length >= 5 || 'Min 5 characters',
        ],
      }
    },
    methods: {
     ...mapActions(['addDonor','openForm'])
    },
    computed : {
      donor : {
        get () 
        {
           return this.$store.state.donor;
        },
        set (value) {
           this.$store.commit('setNewDonor', value);
        }
      },
      iDonated : {
        get () 
        {
           return this.$store.state.donor;
        }
      },
      validationErrors : {
        get () {
          return this.$store.state.validationErrors;
        }
      },
      ...mapState(['donor','isOpen','loading','validationErrors']),
      } 
}
</script>


<style scoped>

#form {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px !important;
    animation-name: formAnimation;
    animation-delay: 0;
    animation-duration: .5s;

}

@keyframes formAnimation {
    
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

@media only screen and (max-width: 768px) {

  [id="form"] {
    width: 95%;
    z-index: 10;
    top:0;
    left:0;
    right:0;
  }
}


</style>