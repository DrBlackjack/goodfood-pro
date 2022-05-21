<template>
  <card>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Email"
                  placeholder="Email"
                  v-model="model.email">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Password"
                  v-model="model.password"
                  type="password"
                  placeholder="Password">
        </base-input>
      </div>
    </div>
    <a href="/#/forgot">Mot de passe oublié</a>
    <base-checkbox>
        Rester connecté
     </base-checkbox>
    <base-button slot="footer" type="primary" fill>Login</base-button>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
