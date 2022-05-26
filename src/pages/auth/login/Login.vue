<template>
  <div class="d-flex justify--center mt-3" v-if="loading">
    <va-progress-circle indeterminate v-if="loading"/>
  </div>
  <form @submit.prevent="loginHandler" v-else>
    <va-input
      class="mb-3"
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      class="mb-3"
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="stayLogged" class="mb-0" :label="$t('auth.keep_logged_in')"/>
      <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button @click="loginHandler" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script lang="ts">
import { supabase } from '../../../../supabase'
import { ApiError } from '@supabase/gotrue-js';
import CircleBars from '../../../../src/pages/admin/statistics/progress-bars/Widgets/CircleBars.vue'

export default {
  components: {
    CircleBars
  },

  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      stayLogged: false,
      emailErrors: [],
      passwordErrors: [],
      loading: false
    }
  },
  computed: {
    // formReady () {
    //   return !this.emailErrors.length && !this.passwordErrors.length
    // },
  },
  methods: {
    // onsubmit () {
    //   this.emailErrors = this.email ? [] : ['Email is required']
    //   this.passwordErrors = this.password ? [] : ['Password is required']
    //   if (!this.formReady) {
    //     return
    //   }
    //   this.$router.push({ name: 'dashboard' })
    // },

    async loginHandler() {
            const email = this.email;
            const password = this.password;
            const stayLogged = this.stayLogged;
            if(email && password) {
                try {
                    this.loading = true;
                    const { user, session, error } = await supabase.auth.signIn({
                        email: email,
                        password: password,
                    },
                    {
                        shouldCreateUser: false
                    })
                    if (error) {throw error}
                    if(stayLogged) {
                        localStorage.setItem('stayLogged', 'true');
                    }
                    else {
                        localStorage.setItem('stayLogged', 'false');
                    }
                } 
                catch (error: ApiError | any) {
                    // notification(error.error_description || error.message, TypeNotification.Danger);
                } 
                finally {
                    this.loading = false;
                }
            }
        },
  },
}
</script>
