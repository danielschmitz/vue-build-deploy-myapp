<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Edit Product {{product.name}}</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                md2
              >
                <v-text-field
                  type="text"
                  v-model="product.id"
                  label="ID"
                  :disabled="true"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md10
              >
                <v-text-field
                  type="text"
                  v-model="product.name"
                  :rules="nameRules"
                  label="Product Name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="text"
                  v-model="product.quantityPerUnit"
                  label="Quantity per Unit"
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="text"
                  v-model="product.unitPrice"
                  label="Unit Price"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="text"
                  v-model="product.unitsInStock"
                  :rules="nameRules"
                  label="Units in Stock"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                md6
              >
                <v-select
                  :items="categories"
                  v-model="product.categoryId"
                  item-text="name"
                  item-value="id"
                  label="Ctegory"
                ></v-select>

              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-select
                  :items="suppliers"
                  v-model="product.supplierId"
                  item-text="companyName"
                  item-value="id"
                  label="Supplier"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="onSaveProductClick()"
          :disabled="!valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

import productService from '@/services/product'
import categoryService from '@/services/category'
import supplierService from '@/services/supplier'

export default {
  name: 'EditProduct',
  data () {
    return {
      id: '',
      product: {},
      valid: true,
      nameRules: [v => !!v || 'Name is required'],
      categories: [],
      suppliers: []
    };
  },
  mounted () {
    console.log('EditProduct Mounted')
    this.id = this.$route.params.id
    productService.getById(this.id).then(result => {
      this.product = result.data
    })

    categoryService.getAll().then(result => {
      this.categories = result.data
    })

    supplierService.getAll().then(result => {
      this.suppliers = result.data
    })

  },
  methods: {
    onSaveProductClick () {
      productService.save(this.product).then(result => {
        this.$router.push('/products')
      }
      )
    }
  }
}
</script>
