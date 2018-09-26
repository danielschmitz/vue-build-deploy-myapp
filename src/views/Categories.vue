<template>
  <v-container fluid>

    <v-card class="card--flex-toolbar">
      <v-card-title primary-title>
        <h2>Categories</h2>
      </v-card-title>
      <v-card-text>
        <span>
          <v-list two-line>
            <template v-for="(item, index) in categories">
              <v-list-tile :key="item.title" @click="onItemClick(item)">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index"></v-divider>
            </template>
          </v-list>
        </span>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
  import category from '@/services/category';

  export default {
    name: 'Categories',
    data() {
      return {
        categories: []
      };
    },
    mounted() {
      console.log('Categories Mounted');
      category.getAll().then( r => {
        this.categories = r.data;
      })
    },
    methods: {
      onItemClick(item) {
        console.log(item);
      }
    }
  };
</script>