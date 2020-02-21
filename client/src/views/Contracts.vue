<template>
  <div class="contracts margin__top ">
    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Поиск контракта"
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
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="white"
          >
            <v-toolbar-title>Контракты</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer/>
            <v-dialog
              v-model="dialogAdd"
              max-width="500px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                >
                  Добавить
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Добавление контракта</span>
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
                          v-model="addItem.id_contract"
                          label="Номер контракта"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="addItem.id_partner"
                          label="Номер партнера"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="addItem.links"
                          label="Ссылки"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="addItem.comments"
                          label="Комментарии"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="addItem.responsible"
                          label="Ответственный"
                        />
                      </v-col>
                      <v-col
                        class="d-flex"
                        cols="12"
                        sm="12"
                      >
                        <v-select
                          :items="itemsPlacement"
                          item-text="text"
                          item-value="id"
                          label="Способ прокладки"
                          @change="atSelected($event)"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="addItem.rent"
                          label="Оплата"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="addItem.data"
                          label="Дата"
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
                    @click="saveAdd"
                  >
                    Добавить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dialogEditWindow"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Редактирование контракта</span>
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
                          v-model="editItem.id_contract"
                          label="Номер контракта"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editItem.id_partner"
                          label="Номер партнера"
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
                          v-model="editItem.responsible"
                          label="Ответственный"
                        />
                      </v-col>
                      <v-col
                        class="d-flex"
                        cols="12"
                        sm="12"
                      >
                        <v-select
                          :items="itemsPlacement"
                          item-text="text"
                          item-value="id"
                          label="Способ прокладки"
                          @change="atSelected($event)"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editItem.rent"
                          label="Оплата"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editItem.data"
                          label="Дата"
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
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="dialogEdit(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import Helper from "../api/Helper";
  import API from "../api/API";

  export default {
    data() {
      return {
        search: '',
        dialogAdd: false,
        dialogEditWindow: false,
        itemsPlacement: [
          {id: 'indoor', text: 'В помещении'},
          {id: 'sewage', text: 'В канализации'},
          {id: 'prop', text: 'На опорах'},
          {id: 'roof', text: 'По земле'}
        ],
        headers: [
          {text: 'Номер контракта', align: 'left', sortable: false, value: 'id_contract',},
          {text: 'Дата', sortable: false, value: 'data',},
          {text: 'Номер партнера', value: 'id_partner', sortable: false},
          {text: 'Ссылки', value: 'links', sortable: false},
          {text: 'Комментарии', value: 'comments', sortable: false},
          {text: 'Арендная плата', value: 'rent', sortable: false},
          {text: 'Cпособ прокладки', value: 'placement', sortable: false},
          {text: 'Ответственный', value: 'responsible', sortable: false},
          {text: 'Действия', value: 'action', sortable: false}
        ],
        rows: [],
        addIndex: -1,
        editIndex: -1,
        addItem: {
          id_contract: 0,
          data: '',
          id_partner: 0,
          links: '',
          comments: '',
          rent: 0.0,
          placement: this.itemsPlacement,
          responsible: this.responsible
        },
        editItem: {
          id_contract: 0,
          data: '',
          id_partner: 0,
          links: '',
          comments: '',
          rent: 0.0,
          placement: '',
          responsible: this.responsible
        },
        defaultItem: {
          id_contract: 0,
          data: '',
          id_partner: 0,
          links: '',
          comments: '',
          rent: 0.0,
          placement: this.itemsPlacement,
          responsible: this.responsible
        },
        selectedSpacer: '',
        nameResponsible: ''
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
        axios.get('http://localhost:3000/contracts').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        data.map(item => {
          this.rows.push({
            id_contract: item.id_contract,
            data: item.data,
            id_partner: item.id_partner,
            links: item.links,
            comments: item.comments,
            rent: item.rent,
            placement: Helper.typeDefinion(item.placement),
            responsible: item.responsible
          })
        })
      },
      atSelected(event) {
        this.selectedSpacer = event
      },
      dialogEdit(item) {
        this.dialogEditWindow = true
        this.editItem.id_contract = item.id_contract
        this.editItem.data = item.data
        this.editItem.id_partner = item.id_partner
        this.editItem.links = item.links
        this.editItem.comments = item.comments
        this.editItem.rent = item.rent
        this.editItem.placement = item.placement
        this.editItem.responsible = item.responsible
      },
      editItemSave() {
        axios.put(`http://localhost:3000/contracts/${this.editItem.id_contract}`,
          {
            id_contract: this.editItem.id_contract,
            data: this.editItem.data,
            id_partner: this.editItem.id_partner,
            links: this.editItem.links,
            comments: this.editItem.comments,
            rent: this.editItem.rent,
            placement: this.selectedSpacer,
            responsible: this.responsible
          },
        ).then((res) => {
          this.editItem.id_contract = this.defaultItem.id_contract
          this.editItem.data = this.defaultItem.data
          this.editItem.id_partner = this.defaultItem.id_partner
          this.editItem.links = this.defaultItem.links
          this.editItem.comments = this.defaultItem.comments
          this.editItem.rent = this.defaultItem.rent
          this.editItem.placement = this.selectedSpacer
          this.editItem.responsible = this.defaultItem.responsible
        }).catch(err => console.log(err))
        this.dialogEditWindow = false

      },
      deleteItem(item) {
        const index = this.rows.indexOf(item)
        const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
        if (result) {
          axios.delete(`http://localhost:3000/contracts/${item.id_contract}`)
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
        axios.post('http://localhost:3000/contracts', {
          id_contract: this.addItem.id_contract,
          data: this.addItem.data,
          id_partner: this.addItem.id_partner,
          links: this.addItem.links,
          comments: this.addItem.comments,
          rent: this.addItem.rent,
          placement: this.selectedSpacer,
          responsible: this.addItem.responsible,
        }).then((res) => {
          this.addItem.id_contract = this.editItem.id_contract,
            this.addItem.data = '',
            this.addItem.id_partner = 0,
            this.addItem.links = '',
            this.addItem.comments = '',
            this.addItem.rent = 0.0,
            this.addItem.placement = '',
            this.addItem.responsible = ''
        }).catch((err) => {
          console.log(err)
        })
        this.close()
      },
    },
  }
</script>
<style>
  .container {
    position: relative;
  }

  .v-progress-circular {
    position: absolute;
    z-index: 50;
    display: flex;
    align-self: center;
    width: 100%;
    top: 40%;
  }
</style>
