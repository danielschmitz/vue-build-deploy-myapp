<template>
    <v-container fluid>

        <v-card class="card--flex-toolbar">
            <v-card-title primary-title>
                <h2>Customers</h2>
            </v-card-title>

            <v-card-text>

                <v-data-table :headers="headers" :items="customers" :pagination.sync="pagination" :total-items="total"
                    :loading="loading" class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.companyName }}</td>
                        <td>{{ props.item.contactName }}</td>
                        <td>{{ props.item.contactTitle }}</td>
                    </template>
                </v-data-table>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>

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
                pagination: {},
                loading: false,
                headers: [
                    { text: 'Company Name', value: 'companyName', sortable: false, },
                    { text: 'Contact Name', value: 'contactName', sortable: false, },
                    { text: 'Contact Title', value: 'contactTitle', sortable: false, },
                ]
            }
        },
        mounted() {
            console.log('Customers Mounted');
        },
        watch: {
            pagination: {
                handler() {
                    const { page, rowsPerPage } = this.pagination
                    let start = (page-1) * rowsPerPage
                    let end = page * rowsPerPage
                    this.loading= true
                    customer.getByRange(start, end).then(r => {
                        this.loading = false
                        this.total = parseInt(r.headers['x-total-count'])
                        this.customers = r.data
                    })
                },
                deep: true
            }
        },
        methods: {
            
        }
    }
</script>