<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    position="bottom"
    :offset="[0, 13]"
  >
    <template #anchor>
      <span class="profile-dropdown__anchor">
        <slot/>
        <va-icon
          class="px-2"
          :name="isShown ? 'angle_up' :'angle_down'"
          :color="theme.primary"
        />
      </span>
    </template>
    <va-dropdown-content class="profile-dropdown__content">
      <va-list-item
        v-for="option in options"
        :key="option.name"
        @click="functionCallHandler(option.click)"
      >
        <router-link
          :to="{name: option.redirectTo}"
          class="profile-dropdown__item"
        >
          {{ $t(`user.${option.name}`) }}
        </router-link>          
      </va-list-item>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { useGlobalConfig } from 'vuestic-ui'
import { supabase } from '../../../../../supabase'

export default {
  name: 'profile-section',
  data () {
    return {
      isShown: false,
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: 'profile',
          redirectTo: '',
        },
        {
          name: 'logout',
          redirectTo: 'login',
          click: 'disconnectHandler'
        },
      ],
    },
  },
  computed: {
    theme() { return useGlobalConfig().getGlobalConfig() },
  },
  methods: {
        async disconnectHandler() {
            try {
                // await startLoading("Loading");
                const { error } = await supabase.auth.signOut()
                if (error) {throw error}
                localStorage.clear();
                // notification("Disconnected", TypeNotification.Success);
            } 
            catch(error) {
                console.log("error is");
                console.log(error);
                // notification("An error occured", TypeNotification.Danger);
            } 
            finally {
                // stopLoading();
            }
        },
        functionCallHandler(functionName: string) {
          this[functionName]()
        },
    }
}
</script>

<style lang="scss">

.profile-dropdown {
  cursor: pointer;

  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    width: 8rem;
  }

  &__item {
    display: block;
    color: var(--va-gray);

    &:hover,
    &:active {
      color: var(--va-primary);
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
