<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Edit Product {{id}}</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        Form...
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: 'EditProduct',
  data () {
    return {
      id: ''
    };
  },
  mounted () {
    console.log('EditProduct Mounted');
    this.id = this.$route.params.id
  },

};
</script>
