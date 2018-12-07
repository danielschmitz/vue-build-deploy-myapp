<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Employees</h2>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onNewItemClick()">New</v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field type="text" v-model="search" append-icon="search" label="Search" @click:append="onSearchClick"></v-text-field>
        <v-data-table :headers="headers" :items="employees" :pagination.sync="pagination" :total-items="total" :loading="loading" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="onItemClick(props.item)">
              <td>{{ props.item.firstName }}</td>
              <td>{{ props.item.lastName }}</td>
              <td>{{ props.item.title }}</td>
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
            Employees
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <h3>Employee info</h3>

                <v-layout row wrap>
                  <v-flex xs12 md2>
                    <v-text-field type="text" v-model="employee.id" label="ID" :disabled="true"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md10>
                    <v-text-field type="text" v-model="employee.firstName" :rules="rules.name" label="First Name" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.lastName" label="Last Name" required></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.title" label="Title" required></v-text-field>
                  </v-flex>
                </v-layout>

                <h3>Address</h3>

                <v-layout>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.street" label="Street"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.city" label="City"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.region" label="Region"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.country" label="Country"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.postalCode" label="Postal Code"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field type="text" v-model="employee.address.phone" label="Phone"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn flat color="red" @click="onDeleteClick()" v-if="employee.id!=null">
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
            Confirm delete {{employee.contactName}}?
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
import employee from '../services/employee';

export default {
  name: 'employees',
  data () {
    return {
      employees: [],
      total: 0,
      search: '',
      pagination: {},
      loading: false,
      headers: [
        { text: 'First Name', value: 'firstName', sortable: false },
        { text: 'Last Name', value: 'lastName', sortable: false },
        { text: 'Title', value: 'title', sortable: false }
      ],
      dialog: false,
      dialogConfirm: false,
      valid: true,
      employee: {
        address: {}
      },
      rules: {
        firstName: [v => !!v || 'Employee First Name is required'],
        lasttName: [v => !!v || 'Employee Last Name is required'],
      }
    };
  },
  mounted () {
    console.log('employees Mounted');
  },
  watch: {
    pagination: {
      handler () {
        this.getEmployees();
      },
      deep: true
    }
  },
  methods: {
    getEmployees () {
      const { page, rowsPerPage } = this.pagination;
      let start = (page - 1) * rowsPerPage;
      let end = page * rowsPerPage;
      this.loading = true;
      employee.getByRange(start, end, this.search).then(r => {
        this.loading = false;
        this.total = parseInt(r.headers['x-total-count']);
        this.employees = r.data;
      });
    },
    onSearchClick () {
      this.getEmployees();
    },
    onNewItemClick () {
      this.employee = {
        address: {}
      }
      this.dialog = true;
    },
    onSaveClick () {
      employee.save(this.employee).then(result => {
        this.dialog = false
        this.getEmployees()
      })
    },
    onItemClick (item) {
      this.employee = item
      this.dialog = true
    },
    onDeleteClick () {
      this.dialogConfirm = true;
    },
    onDeleteClickConfirm () {
      employee.delete(this.employee.id).then( () => {
        this.dialogConfirm = false
        this.dialog = false
        this.getEmployees()
      })
    }
  }
};
</script>
