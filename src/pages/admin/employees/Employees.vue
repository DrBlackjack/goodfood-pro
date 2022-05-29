<template>
  <va-data-table :items="items" :columns="columns" :hoverable="true">
    <template #headerAppend>
      <tr class="table-example--slot">
        <th
          v-for="key in Object.keys(createdItem)"
          :key="key"
          colspan="1"
        >
          <va-input
            :placeholder="key"
            v-model="createdItem[key]"
            v-if="key !== 'role'"
          />
          <va-select v-model="createdItem[key]" :options="options" v-if="key === 'role'" />
        </th>
        <th colspan="1">
          <va-button
            @click="addNewItem()"
            :disabled="!isNewData"
          >
            Add
          </va-button>
        </th>
      </tr>
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="openModalToEditItemById(rowIndex)" />
      <va-button flat icon="delete" @click="deleteItemById(rowIndex)" />
    </template>
  </va-data-table>

  <va-modal
    :model-value="!!editedItem"
    message="Edit item"
    @ok="editItem()"
    @cancel="resetEditedItem()"
  >
    <slot>
      <va-input
        v-for="key in Object.keys(editedItem).filter(key => key !== 'role')"
        :key="key"
        class="my-3"
        :label="key"
        v-model="editedItem[key]"
      />
      <va-select v-for="key in Object.keys(editedItem).filter(key => key === 'role')" :key="key" v-model="editedItem[key]" :options="options" />
    </slot>
  </va-modal>
  <div class="d-flex justify--center mt-3" v-if="loading">
    <va-progress-circle indeterminate/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios, { AxiosError } from 'axios';
import { supabase } from '../../../../supabase';

const defaultItem = {
  firstName: '',
  lastName: '',
  email: '',
  role: ''
}

enum AccountType {
  "Administrateur Goodfood" = 1,
  "Gérant" = 2,
  "Community manager" = 3,
  "Compabilité" = 4,
  "Caissier" = 5
}

export default defineComponent({
  data () {
    const items = [
      {
        firstName: 'Leanne Graham',
        lastName: 'Bret',
        email: 'Sincere@april.biz',
        role: AccountType[2]
      },
      {
        firstName: 'Ervin Howell',
        lastName: 'Antonette',
        email: 'Shanna@melissa.tv',
        role: AccountType[2]
      },
      {
        firstName: 'Clementine Bauch',
        lastName: 'Samantha',
        email: 'Nathan@yesenia.net',
        role: AccountType[2]
      },
      {
        firstName: 'Patricia Lebsack',
        lastName: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        role: AccountType[2]
      },
    ]

    const columns = [
      { key: 'firstName', sortable: true },
      { key: 'lastName', sortable: true },
      { key: 'email', sortable: true },
      { key: 'role', sortable: true },
      { key: 'actions', width: 80 },
    ]

    return {
      items,
      columns,
      options: [AccountType[5], AccountType[4], AccountType[3], AccountType[2], AccountType[1]],

      editedItemId: null,
      editedItem: null,
      createdItem: { ...defaultItem },

      loading: false
    }
  },

  computed: {
    isNewData () {
      return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
    },
  },

  methods: {
    resetEditedItem () {
      this.editedItem = null
      this.editedItemId = null
    },
    resetCreatedItem () {
      this.createdItem = { ...defaultItem }
    },
    deleteItemById (id: number) {
      this.items = [
        ...this.items.slice(0, id),
        ...this.items.slice(id + 1),
      ]
    },
    async addNewItem () {
      const registeredUser: boolean = await this.registerHandler()
      if(registeredUser === true) {
        this.items = [...this.items, { ...this.createdItem }]
      }
      this.resetCreatedItem()
    },
    editItem () {
      this.items = [
        ...this.items.slice(0, this.editedItemId),
        { ...this.editedItem },
        ...this.items.slice(this.editedItemId + 1),
      ]
      this.resetEditedItem()
    },
    openModalToEditItemById (id: number) {
      this.editedItemId = id
      this.editedItem = { ...this.items[id] }
    },

    async registerHandler() {
      let success = false;
      try {
        this.loading = true;
        // Send a POST request
        await axios({
          headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          method: 'post',
          url: 'http://localhost:3000/api/employee',
          data: {
            authToken: supabase.auth.session()?.access_token,
            firstName: this.createdItem['firstName'],
            lastName: this.createdItem['lastName'],
            email: this.createdItem['email'],
            accountType: AccountType[this.createdItem['role']]
          }
        });
        success = true;
        this.$vaToast.init({ message: 'Employé créé', color:'success', duration: 3000 })
      }
      catch(e) {
        const reason = e as AxiosError;
        const responseCode = reason.response?.status;
        console.log(e);
        let message = "";
        if(responseCode === 409) {
          message = "Account already registered";
        }

        if(message === "") {
          message = "An Error has occured";
        }
        this.$vaToast.init({ message: message, color:'danger', duration: 3000 })
      }
      finally {
        this.loading = false;
        return success;
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.table-example--slot {
  th {
    padding-top: 5px;
    padding-bottom: 5px;
    vertical-align: middle;
  }
}
</style>
