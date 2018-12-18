<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Products</h2>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="onNewItemClick()"
        >New</v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          v-model="search"
          append-icon="search"
          label="Search"
          @click:append="onSearchClick"
        ></v-text-field>
        <v-container
          fluid
          grid-list-md
        >
          <v-data-iterator
            :items="products"
            :pagination.sync="pagination"
            :total-items="total"
            :loading="loading"
            content-tag="v-layout"
            row
            wrap
          >
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md4
              lg3
            >
              <v-card color="grey lighten-4">
                <v-card-title>
                  <h4>{{ props.item.name }}</h4>
                </v-card-title>

                <v-list two-line>

                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon>category</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ props.item.category.name }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ props.item.category.description }} {{ props.item.supplier.address.country }} </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-group dense>
                    <v-list-tile slot="activator">
                      <v-list-tile-avatar>
                        <v-icon>local_shipping</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ props.item.supplier.contactName }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ props.item.supplier.companyName }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ props.item.supplier.address.street }} {{ props.item.supplier.address.city }} </v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ props.item.supplier.address.region }} {{ props.item.supplier.address.country }} </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-avatar>
                        <v-icon>phone</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ props.item.supplier.address.phone }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>

                  </v-list-group>

                  <v-divider></v-divider>

                  <v-subheader>Product information</v-subheader>

                  <v-list-tile>

                    <v-list-tile-content>
                      <v-list-tile-title>Quantity per Unity</v-list-tile-title>
                      <v-list-tile-sub-title>{{ props.item.quantityPerUnit }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Unity in Stock</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.unitsInStock }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Actions</v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon @click="onClickEditProduct(props.item)">edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <v-icon @click="onClickDeleteProduct(props.item)">delete</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>

                </v-list>
              </v-card>
            </v-flex>
          </v-data-iterator>
          <div class="text-xs-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="total"
            ></v-pagination>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

  </v-container>
</template>
<script>
import product from '../services/product';

export default {
  name: 'products',
  data () {
    return {
      products: [],
      total: 0,
      search: '',
      pagination: {},
      loading: false,
    };
  },
  mounted () {
    console.log('products Mounted');
  },
  watch: {
    pagination: {
      handler () {
        this.getProducts();
      },
      deep: true
    }
  },
  methods: {
    getProducts () {
      const { page, rowsPerPage } = this.pagination;
      let start = (page - 1) * rowsPerPage;
      let end = page * rowsPerPage;
      this.loading = true;
      product.getByRange(start, end, this.search).then(r => {
        this.loading = false;
        this.total = parseInt(r.headers['x-total-count']);
        this.products = r.data;
      });
    },

    onSearchClick () {
      this.getProducts();
    },
    onNewItemClick () {
      //TODO
    },
    onClickEditProduct (item) {
      this.$router.push(`/editproduct/${item.id}`)
    }
  }
};
</script>
