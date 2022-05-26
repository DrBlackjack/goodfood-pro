<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from '../supabase';

export default defineComponent({
  name: 'App',
  created() {
    // This method is called when the page is closing
    window.addEventListener('beforeunload', (event) => {
        const stayLogged = localStorage.getItem('stayLogged');
        if(stayLogged === 'false' || !stayLogged) {
          // Log out the user and then clear the local storage
          this.signOut();
          localStorage.clear();
        }
    });
  },

  methods: {
    // Method that signs out the user
    async signOut() {
      try {
        console.log("signOut function");
          // await startLoading("Loading");
          const { error } = await supabase.auth.signOut()
          if (error) {throw error}
          // notification("Disconnected", TypeNotification.Success);
        } 
        catch(error) {
            console.log(error);
            // notification("An error occured", TypeNotification.Danger);
        } 
        finally {
            // stopLoading();
        }
    }
  }
});
</script>



<style lang="scss">
@import '~@/sass/main.scss';
#app {
  font-family: 'Source Sans Pro', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  background: var(--va-background);
}
</style>
