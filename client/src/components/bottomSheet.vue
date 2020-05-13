<template>
    <div class="text-center bottomSheet">
    <v-bottom-sheet v-model="sheet" persistent inset>
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          color="error"
          @click="closeSheet"
        >close</v-btn>
        <div class="my-3">THANK YOU !</div>
        <div class="my-3">You're already in </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import {mapState,mapActions}  from 'vuex';

export default {
    name : 'BottomSheet',
    methods: {
        ...mapActions(['closeSheet']),
    },
    computed: mapState (['sheet'])
}
</script>
<style scoped>

.bottomSheet {
    position: absolute;
    z-index: 2;
}

</style>