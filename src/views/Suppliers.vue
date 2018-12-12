<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Suppliers</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onNewItemClick()">New</v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field type="text" v-model="search" append-icon="search" label="Search" @click:append="onSearchClick"></v-text-field>
        <v-data-table :headers="headers" :items="suppliers" :pagination.sync="pagination" :total-items="total" :loading="loading" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="onItemClick(props.item)">
              <td>{{ props.item.companyName }}</td>
              <td>{{ props.item.contactName }}</td>
              <td>{{ props.item.contactTitle }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <div class="text-xs-center">
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Supplier
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <h3>User info</h3>

                <v-layout row wrap>
                  <v-flex xs12 md2>
                    <v-text-field type="text" v-model="supplier.id" label="ID" :disabled="true"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md10>
                    <v-text-field type="text" v-model="supplier.contactName" :rules="rules.name" label="Contact Name" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.contactTitle" label="Contact Title" required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.companyName" label="Company Name" required></v-text-field>
                  </v-flex>
                </v-layout>

                <h3>Address</h3>

                <v-layout>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.street" label="Street"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.city" label="City"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.region" label="Region"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.country" label="Country"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.postalCode" label="Postal Code"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="supplier.address.phone" label="Phone"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn flat color="red" @click="onDeleteClick()" v-if="supplier.id!=null">
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="onSaveClick()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogConfirm" max-width="290">
        <v-card>
          <v-card-title class="headline">Please confirm</v-card-title>

          <v-card-text>
            Confirm delete {{supplier.contactName}}?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn flat="flat" @click="dialogConfirm = false">
              No
            </v-btn>

            <v-btn color="red" flat="flat" @click="onDeleteClickConfirm()">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import supplier from '../services/supplier';

export default {
  name: 'Suppliers',
  data () {
    return {
      suppliers: [],
      total: 0,
      search: '',
      pagination: {},
      loading: false,
      headers: [
        { text: 'Company Name', value: 'companyName', sortable: false },
        { text: 'Contact Name', value: 'contactName', sortable: false },
        { text: 'Contact Title', value: 'contactTitle', sortable: false }
      ],
      dialog: false,
      dialogConfirm: false,
      valid: true,
      supplier: {
        address: {}
      },
      rules: {
        name: [v => !!v || 'Contact Name is required']
      }
    };
  },
  mounted () {
    console.log('Suppliers Mounted');
  },
  watch: {
    pagination: {
      handler () {
        this.getSuppliers();
      },
      deep: true
    }
  },
  methods: {
    getSuppliers () {
      const { page, rowsPerPage } = this.pagination;
      let start = (page - 1) * rowsPerPage;
      let end = page * rowsPerPage;
      this.loading = true;
      supplier.getByRange(start, end, this.search).then(r => {
        this.loading = false;
        this.total = parseInt(r.headers['x-total-count']);
        this.suppliers = r.data;
      });
    },
    onSearchClick () {
      this.getSuppliers();
    },
    onNewItemClick () {
      this.supplier = {
        address: {}
      }
      this.dialog = true;
    },
    onSaveClick () {
      supplier.save(this.supplier).then(result => {
        this.dialog = false
        this.getSuppliers()
      })
    },
    onItemClick (item) {
      this.supplier = item
      this.dialog = true
    },
    onDeleteClick () {
      this.dialogConfirm = true;
    },
    onDeleteClickConfirm () {
      supplier.delete(this.supplier.id).then( () => {
        this.dialogConfirm = false
        this.dialog = false
        this.getSuppliers()
      })
    }
  }
};
</script>
