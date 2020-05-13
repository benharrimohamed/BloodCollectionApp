import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'



Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    center: [30.86451, -7.910156],
    zoom : 5,
    ApiForIp : 'https://ipapi.co/json',
    getURl : process.env.VUE_APP_GET_URL,
    postURL : process.env.VUE_APP_POST_URL,
    donor : {
      name : '',
      phone : '',
      bloodGroup : '',
      city: '',
      message : '',
      lat: '',
      lng : ''
    },
    iDonated : false,
    validationErrors : [],
    sheet: false,
    isAvailable: false,
    loading : false,
    isOpen: false,
    donors :'',
    options : {
      enableHighAccuracy: true,
      timeout: Infinity, 
      maximumAge: 0 
      }   
  },
  mutations: {
    setIDonated (state, value)
    {
      state.iDonated = value;
    },
    setIsAvailble (state, value)
    {
      state.isAvailable = value;
    },
    setNewDonor (state, value) {
       state.donor = value
    },
    fetchDonors (state, value) {
        state.donors = value;
    },
    setLatLng (state, value)
    {
       state.donor.lat = value.latitude;
       state.donor.lng = value.longitude;
    },
    setIsOpen (state,value){
      state.isOpen = !value;
    },
    setLoading (state, value){
      state.loading = value
    },
    setBottomSheet (state, value)
    {
      state.sheet = value;
    },
    setCenter (state,value)
    {
      state.center = value;
    },
    setZoom(state,value)
    {
      state.zoom = value;
    },
    setValidationErrors(state,value)
    {
      state.validationErrors = value;
    }

  },
  actions: {
    async openForm (context){
      if (!localStorage.Donated)
      {
     context.commit('setIsOpen',this.state.isOpen);
      }
     else
     {
     context.dispatch('updateCenter');
     
     context.commit('setBottomSheet',true);
     }
    },
    addDonor(context){
      context.commit('setValidationErrors',[]);
      context.commit('setLoading',true);
      axios.post(this.state.postURL,this.state.donor)
      .then ((res) => {
        context.commit('setLoading',false);
        context.dispatch('getDonors')
        context.commit('setIsOpen',this.state.isOpen)
        context.commit('setNewDonor', '')
        localStorage.Donated = true,
        localStorage.lat = res.data.lat,
        localStorage.lng = res.data.lng,
        context.commit('setIDonated',true);
      })
      .catch (err => {

        if(err.response.status == 412)
        {
          
          context.commit('setValidationErrors',err.response.data.errors);
          context.commit('setLoading',false);
        }
      })
    },
    getDonors(context){
      
      axios.get(this.state.getURl)
      .then(res => {
      
        context.commit('fetchDonors',res.data)
      })
      .catch(err =>{ throw err });
    },
    getLocationFromApi (context){
      axios.get(this.state.ApiForIp)
      .then(res => {
        context.commit('setLatLng',res.data);
        context.commit('setCenter',[res.data.latitude,res.data.longitude]);
        if(localStorage.Donated)
        {
        context.commit('setZoom',12);
        }
        context.commit('setIsAvailble', true);
      })
      .catch (err => {
        throw err;
      });
    },
    openSheet (context) {
      context.commit('setBottomSheet',true);
    },
    closeSheet (context) {
      context.commit('setBottomSheet',false);
    },
    updateCenter (context) {
      context.commit('setCenter',[localStorage.lat,localStorage.lng]);
    },
    updateZoom (context) {
      context.commit('setZoom',8);
    }
}
})
