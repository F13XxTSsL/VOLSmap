<template>
  <div class="partners margin__top">
    <v-container>
      <div class="loader" v-if="loader">
        <v-progress-circular
          :size="70"
          :width="7"
          color="darken"
          indeterminate
        />
      </div>
      <div v-else>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              label="Поиск контрагента"
              single-line
              hide-details
            />
          </v-card-title>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="rows"
          class="elevation-1"
          :search="search"
          :mobile-breakpoint="320"
        >
          <template #item="rows">
            <tr>
              <td class="table-cell id_cell">{{ rows.item.id_partner }}</td>
              <td class="table-cell name_partner">{{ rows.item.name }}</td>
              <td class="table-cell inn_partner">{{ rows.item.INN }}</td>
              <td class="contacts_partner">{{ rows.item.contacts }}</td>
              <td class="table-cell comments">{{ rows.item.comments }}</td>
              <td class="table-cell links">{{ rows.item.links }}</td>
              <td class="table-cell action_cell">
                <v-icon class="mr-2" small @click="dialogEdit(rows.item)">{{ rows.item.action }} mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(rows.item)">{{ rows.item.action }} mdi-delete</v-icon>
              </td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar
              flat
              color="white"
            >
              <v-toolbar-title>Контрагенты</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer/>
              <v-dialog v-model="dialogAdd" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn style="background-color: rgba(73, 138, 184, 0.8);" dark class="mb-2"
                         v-on="on"
                  >
                    Добавить
                  </v-btn>
                </template>

                <v-card>

                  <v-card-title>
                    <span class="headline">Добавление контрагента</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field v-model="addItem.id_partner" label="Номер контрагента"/>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field v-model="addItem.name" label="Наименование"/>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="addItem.INN" label="ИНН"/>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="addItem.contacts" label="Контакты"/>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="addItem.comments" label="Комментарии"/>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="addItem.links" label="Ссылки"/>
                        </v-col>
                      </v-row>
                    </v-container>

                  </v-card-text>

                  <v-card-actions>
                    <v-spacer/>
                    <v-btn color="blue darken-1" text @click="close">Назад</v-btn>
                    <v-btn color="blue darken-1" text @click="saveAdd">Добавить</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogEditWindow"
                max-width="500px"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">Редактирование контрагента</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editItem.id_partner"
                            label="Номер контрагента"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editItem.name"
                            label="Наименование"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.INN"
                            label="ИНН"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.contacts"
                            label="Контакты"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.comments"
                            label="Комментарии"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.links"
                            label="Ссылки"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Назад
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="editItemSave"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-data-table>

      </div>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import EventBus from "../components/EventBus";

  export default {
    data() {
      return {
        search: '',
        dialogAdd: false,
        dialogEditWindow: false,
        headers: [
          {text: '№', sortable: false, value: 'id_partner', class: 'id_cell'},
          {text: 'Наименование', sortable: false, value: 'name', class: 'name_partner'},
          {text: 'ИНН', value: 'INN', sortable: false, class: 'inn_partner'},
          {text: 'Контакты', value: 'contacts', sortable: false, class: 'contacts_partner'},
          {text: 'Комментарии', value: 'comments', sortable: false, class: 'comments'},
          {text: 'Ссылки', value: 'links', sortable: false, class: 'links'},
          {text: 'Действия', value: 'action', sortable: false, class: 'action_cell'},
        ],
        rows: [],
        addIndex: -1,
        editIndex: -1,
        addItem: {
          id_partner: '',
          name: '',
          INN: 0,
          contacts: '',
          comments: '',
          links: '',
        },
        editItem: {
          id_partner: '',
          name: '',
          INN: 0,
          contacts: '',
          comments: '',
          links: '',
        },
        defaultItem: {
          id_partner: '',
          name: '',
          INN: 0,
          contacts: '',
          comments: '',
          links: '',
        },
        loader: true
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    mounted() {
      this.getPartners()
    },
    methods: {
      getPartners() {
        axios.get('http://localhost:3000/partners').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        data.map(item => {
          this.rows.push({
            id_partner: item.id_partner,
            name: item.name,
            INN: item.INN,
            contacts: item.contacts,
            comments: item.comments,
            links: item.links
          })
        })
        this.loader = false
      },
      dialogEdit(item) {
        this.dialogEditWindow = true
        this.editItem.id_partner = item.id_partner
        this.editItem.name = item.name
        this.editItem.INN = item.INN
        this.editItem.contacts = item.contacts
        this.editItem.comments = item.comments
        this.editItem.links = item.links
      },
      editItemSave() {
        axios.put(`http://localhost:3000/partners/${this.editItem.id_partner}`,
          {
            id: this.editItem.id_partner,
            name: this.editItem.name,
            INN: this.editItem.INN,
            contacts: this.editItem.contacts,
            comments: this.editItem.comments,
            links: this.editItem.links,
          },
        ).then((res) => {
          this.editItem.id_partner = this.defaultItem.id_partner
          this.editItem.name = this.defaultItem.name
          this.editItem.INN = this.defaultItem.INN
          this.editItem.contacts = this.defaultItem.contacts
          this.editItem.comments = this.defaultItem.comments
          this.editItem.links = this.defaultItem.links
        }).catch(err => console.log(err))
        this.dialogEditWindow = false

      },
      deleteItem(item) {
        const index = this.rows.indexOf(item)
        const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
        if (result) {
          axios.delete(`http://localhost:3000/partners/${item.id_partner}`)
        }
      },
      close() {
        this.dialogAdd = false
        this.dialogEditWindow = false
        setTimeout(() => {
          this.addItem = Object.assign({}, this.defaultItem)
          this.addIndex = -1
        }, 300)
      },
      saveAdd() {
        axios.post('http://localhost:3000/partners', {
          id_partner: this.addItem.id_partner,
          name: this.addItem.name,
          INN: this.addItem.INN,
          contacts: this.addItem.contacts,
          comments: this.addItem.comments,
          links: this.addItem.links
        }).then((res) => {
          this.addItem.id_partner = this.editItem.id_partner,
            this.addItem.name = '',
            this.addItem.INN = 0,
            this.addItem.contacts = '',
            this.addItem.comments = '',
            this.addItem.links = ''
        }).catch((err) => {
          console.log(err)
        })
        this.close()
      },
    },
  }
</script>

