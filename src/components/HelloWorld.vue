<template>
  <v-container fluid>

    <v-card class="card--flex-toolbar" v-if="!isLogged">
      <v-card-title primary-title><h2>Login</h2></v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field type="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field @click:append="showP = !showP" v-model="password" :rules="passwordRules" label="Senha" required :type="showP ? 'text' : 'password'"
            :append-icon="showP ? 'visibility_off' : 'visibility'"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat big color="primary" @click="tryLogin()" :disabled="!valid">Login</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="card--flex-toolbar" v-if="isLogged">
      <v-card-text>
        Hello user!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat big color="primary" @click="logout()">Logout</v-btn>
      </v-card-actions>
    </v-card>


  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        email: '',
        password: '',
        valid: true,
        showP: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail is invalid'
        ],
        passwordRules: [v => !!v || 'Password is required']
      };
    },
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      }
    },
    methods: {
      tryLogin() {
        this.$store.dispatch('tryLogin', {
          email: this.email,
          password: this.password
        });
      },
      logout() {
        this.$store.dispatch('logout');
      }
    }
  };
</script>