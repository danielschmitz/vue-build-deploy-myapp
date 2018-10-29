<template>
    <v-container fluid>

        <v-card class="card--flex-toolbar">
            <v-card-title primary-title>
                <h2>Customers</h2>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat>
                    New
                </v-btn>
            </v-card-actions>
            <v-card-text>
                <div class="text-xs-center">
                    <v-pagination v-model="page" :length="pagination_length" @input="onPageChange()"></v-pagination>
                </div>  
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
                page_length: 10,
                page: 1
            }
        },
        mounted() {
            console.log('Customers Mounted');
            this.getAll(1); //on load, get All from page 1
        },
        methods: {
            getAll(page) {
                page--
                let start = page * this.page_length
                let end = (page * this.page_length) + this.page_length
                customer.getByRange(start, end).then(r => {
                    this.total = r.headers['x-total-count']
                    this.customers = r.data
                })
            },
            onPageChange() {
                this.getAll(this.page)
            }
        },
        computed: {
            pagination_length: function () {
                return Math.round(this.total / this.page_length)
            }
        }
    }
</script>