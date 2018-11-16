<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title primary-title> <h2>Categories</h2> </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onNewItemClick()"> New </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-list two-line>
          <template v-for="(item, index) in categories">
            <v-list-tile :key="item.title" @click="onItemClick(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.description"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions> <v-spacer></v-spacer> </v-card-actions>
    </v-card>

    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Category: &nbsp; <b>{{ category.name }}</b>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                type="text"
                v-model="category.name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                type="text"
                v-model="category.description"
                :rules="descRules"
                label="Description"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              color="warning"
              flat
              @click="onDeleteCategoryClick()"
              v-if="category.id!=null"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="onSaveCategoryClick()"
              :disabled="!valid"
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
  import category from '@/services/category';

  export default {
    name: 'Categories',
    data() {
      return {
        dialog: false,
        valid: true,
        category: {},
        categories: [],
        nameRules: [v => !!v || 'Name is required'],
        descRules: [v => !!v || 'Description is required']
      };
    },
    mounted() {
      console.log('Categories Mounted');
      this.getAll();
    },
    methods: {
      getAll() {
        category.getAll().then(r => {
          this.categories = r.data;
        })
      },
      onItemClick(item) {
        this.category = {
          id: item.id,
          name: item.name,
          description: item.description
        }
        this.dialog = true;
      },
      onSaveCategoryClick() {
        category.save(this.category).then(r => {
          this.dialog = false
          this.getAll();
        })
      },
      onNewItemClick() {
        this.category = {}
        this.dialog = true;
      },
      onDeleteCategoryClick() {
        this.$confirm('Do you really want to delete?').then(res => {
          if (res) {
            category.delete(this.category.id).then(r => {
              this.dialog = false
              this.getAll();
            })
          }
        })
      }
    }
  };
</script>
