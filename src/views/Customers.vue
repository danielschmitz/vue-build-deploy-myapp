<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Customers</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onNewItemClick()">New</v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          v-model="search"
          append-icon="search"
          label="Search"
          @click:append="onSearchClick"
        ></v-text-field>
        <v-data-table
          :headers="headers"
          :items="customers"
          :pagination.sync="pagination"
          :total-items="total"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.companyName }}</td>
            <td>{{ props.item.contactName }}</td>
            <td>{{ props.item.contactTitle }}</td>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions> <v-spacer></v-spacer> </v-card-actions>
    </v-card>

    <div class="text-xs-center">
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Customer
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <h3>User info</h3>

                <v-layout row wrap>
                  <v-flex xs12 md2>
                    <v-text-field
                      type="text"
                      v-model="customer.id"
                      label="ID"
                      :disabled="true"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md10>
                    <v-text-field
                      type="text"
                      v-model="customer.contactName"
                      :rules="rules.name"
                      label="Contact Name"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.contactTitle"
                      label="Contact Title"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.companyName"
                      label="Company Name"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <h3>Address</h3>

                <v-layout>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.street"
                      label="Street"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.city"
                      label="City"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.region"
                      label="Region"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.country"
                      label="Country"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.postalCode"
                      label="Postal Code"
                    ></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      type="text"
                      v-model="customer.address.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="onSaveClick()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
  import customer from '@/services/customer';

  export default {
    name: 'Customers',
    data() {
      return {
        customers: [],
        total: 0,
        search: '',
        pagination: {},
        loading: false,
        headers: [
          { text: 'Company Name', value: 'companyName', sortable: false },
          { text: 'Contact Name', value: 'contactName', sortable: false },
          { text: 'Contact Title', value: 'contactTitle', sortable: false }
        ],
        dialog: true,
        valid: true,
        customer: {
          address: {}
        },
        rules: {
          name: [v => !!v || 'Contact Name is required']
        }
      };
    },
    mounted() {
      console.log('Customers Mounted');
    },
    watch: {
      pagination: {
        handler() {
          this.getCustomers();
        },
        deep: true
      }
    },
    methods: {
      getCustomers() {
        const { page, rowsPerPage } = this.pagination;
        let start = (page - 1) * rowsPerPage;
        let end = page * rowsPerPage;
        this.loading = true;
        customer.getByRange(start, end, this.search).then(r => {
          this.loading = false;
          this.total = parseInt(r.headers['x-total-count']);
          this.customers = r.data;
        });
      },
      onSearchClick() {
        this.getCustomers();
      },
      onNewItemClick() {
        this.dialog = true;
      },
      onSaveClick() {
        customer.save(this.customer).then( result => {
          this.dialog = false
          this.getCustomers()
        })
      }
    }
  };
</script>
