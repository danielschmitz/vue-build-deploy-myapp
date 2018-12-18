<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Edit Product {{product.name}}</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

import productService from '@/services/product'

export default {
  name: 'EditProduct',
  data () {
    return {
      id: '',
      product: {},
      valid: true,
    };
  },
  mounted () {
    console.log('EditProduct Mounted');
    this.id = this.$route.params.id
    productService.getById(this.id).then(result => {
      this.product = result.data
      console.log(this.product)
    }

    )
  },

};
</script>
