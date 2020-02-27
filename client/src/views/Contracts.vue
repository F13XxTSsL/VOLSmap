<template>
  <div class="contracts margin__top ">
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
              label="Поиск договора"
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
          <template #item="rows">
            <tr>
              <td class="id_cell">{{ rows.item.id_contract }}</td>
              <td class="name_partner">{{ rows.item.data }}</td>
              <td class="inn_partner">{{ rows.item.id_partner }}</td>
              <td class="links">{{ rows.item.links }}</td>
              <td class="comments">{{ rows.item.comments }}</td>
              <td class="rent_cell">{{ rows.item.rent }}</td>
              <td class="placement">{{ rows.item.placement }}</td>
              <td class="responsible">{{ rows.item.responsible }}</td>
              <td class="action_cell">
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
              <v-toolbar-title>Договоры</v-toolbar-title>
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
                    <span class="headline">Добавление договора</span>
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
                            label="Номер договора"
                          />
                        </v-col>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="12"
                        >
                          <v-autocomplete
                            v-model="selectPartnersNames"
                            :items="partnersNames"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchPartnersNames"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedPartnersNames($event)"
                            label="Наименование контрагента"
                          ></v-autocomplete>
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
                          class="d-flex"
                          cols="12"
                          sm="12"
                        >
                          <v-autocomplete
                            v-model="selectResponsibleNames"
                            :items="responsibleNames"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchResponsibleNames"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedResponsibleNames($event)"
                            label="Ответственный"
                          ></v-autocomplete>
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
                    <span class="headline">Редактирование договора</span>
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
                            label="Номер договора"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-autocomplete
                            v-model="editItem.id_partner"
                            :items="partnersNames"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchPartnersNames"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedPartnersNames($event)"
                            label="Наименование контрагента"
                          ></v-autocomplete>
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
                          class="d-flex"
                          cols="12"
                          sm="12"
                        >
                          <v-autocomplete
                            v-model="editResponsibleNames"
                            :items="responsibleNames"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchResponsibleNames"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedResponsibleNames($event)"
                            label="Ответственный"
                          ></v-autocomplete>
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
                            v-model="editItemsPlacement"
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
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import Helper from "../api/Helper";

  export default {
    data() {
      return {
        selectPartnersNames: '',
        searchPartnersNames: null,
        selectResponsibleNames: '',
        searchResponsibleNames: null,
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
          {text: 'Номер договора', sortable: false, value: 'id_contract', class: 'id_cell'},
          {text: 'Дата', sortable: false, value: 'data', class: 'name_partner'},
          {text: 'Наименование контрагента', value: 'id_partner', sortable: false, class: 'inn_partner'},
          {text: 'Ссылки', value: 'links', sortable: false, class: 'links'},
          {text: 'Комментарии', value: 'comments', sortable: false, class: 'comments'},
          {text: 'Оплата', value: 'rent', sortable: false, class: 'rent_cell'},
          {text: 'Cпособ прокладки', value: 'placement', sortable: false, class: 'placement'},
          {text: 'Ответственный', value: 'responsible', sortable: false, class: 'responsible'},
          {text: 'Действия', value: 'action', sortable: false, class: 'action_cell'}
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
          rent: 0,
          placement: '',
          responsible: ''
        },
        editItem: {
          id_contract: 0,
          data: '',
          id_partner: '',
          links: '',
          comments: '',
          rent: 0,
          placement: '',
          responsible: this.selectedSpacerResponsibleNames
        },
        defaultItem: {
          id_contract: 0,
          data: '',
          links: '',
          comments: '',
          rent: 0,
          placement: '',
          responsible: this.selectedSpacerResponsibleNames
        },
        selectedSpacer: '',
        selectedSpacerNames: '',
        selectedSpacerResponsibleNames: '',
        partnersNames: [],
        responsibleNames: [],
        editResponsibleNames: '',
        editItemsPlacement: '',
        loader: true
      }
    },
    mounted() {
      this.getPartners()
      axios.get('http://localhost:3000/contracts_partners').then(partners => {
        partners.data.forEach(item => {
          this.partnersNames.push({id: item.id_partner, name: item.name})
        })
      })
      axios.get('http://localhost:3000/contracts_responsible').then(responsible => {
        responsible.data.forEach(item => {
          this.responsibleNames.push({id: item.id_user, name: item.fio})
        })
      })
    },
    methods: {
      getPartners() {
        axios.get('http://localhost:3000/contracts').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        this.rows = []
        data.map(item => {
          axios.get(`http://localhost:3000/contracts_responsible/${item.responsible}`).then(responsible => {
            axios.get(`http://localhost:3000/contracts_partner/${item.id_partner}`).then(partner => {
              this.rows.push({
                id_contract: item.id_contract,
                data: item.data,
                id_partner: partner.data.name,
                links: item.links,
                comments: item.comments,
                rent: item.rent + ' руб.',
                placement: Helper.typeDefinion(item.placement),
                responsible: responsible.data.fio
              })
              this.loader = false
            })
          })
        })
      },
      atSelectedPartnersNames(event) {
        this.selectedSpacerNames = event
      },
      atSelectedResponsibleNames(event) {
        this.selectedSpacerResponsibleNames = event
      },
      atSelected(event) {
        this.selectedSpacer = event
      },
      dialogEdit(item) {
        let responsibleSelect = ''
        this.responsibleNames.forEach(val => {
          if (val.name === item.responsible) {
            responsibleSelect = val.id
          }
        })
        let nameContractSelect = ''
        this.partnersNames.forEach(val => {
          if (val.name === item.id_partner) {
            nameContractSelect = val.id
          }
        })
        this.dialogEditWindow = true
        this.editItem.id_contract = item.id_contract
        this.editItem.data = item.data
        this.editItem.id_partner = nameContractSelect
        this.editItem.links = item.links
        this.editItem.comments = item.comments
        this.editItem.rent = item.rent
        this.editItem.placement = Helper.revertTypeDefinion(item.placement)
        this.editItem.responsible = responsibleSelect

        this.editResponsibleNames = responsibleSelect
        this.editItemsPlacement = Helper.revertTypeDefinion(item.placement)
      },
      editItemSave() {
        axios.put(`http://localhost:3000/contracts/${this.editItem.id_contract}`,
          {
            id_contract: this.editItem.id_contract,
            data: this.editItem.data,
            id_partner: this.selectedSpacerNames ? this.selectedSpacerNames: this.editItem.id_partner,
            links: this.editItem.links,
            comments: this.editItem.comments,
            rent: parseFloat(this.editItem.rent),
            placement: this.selectedSpacer ? this.selectedSpacer : this.editItem.placement,
            responsible: this.selectedSpacerResponsibleNames ? this.selectedSpacerResponsibleNames : this.editItem.responsible
          },
        ).then((res) => {
          this.editItem.id_contract = this.defaultItem.id_contract
          this.editItem.data = this.defaultItem.data
          this.editItem.links = this.defaultItem.links
          this.editItem.comments = this.defaultItem.comments
          this.editItem.rent = this.defaultItem.rent
          this.editItem.placement = this.defaultItem.placement
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
          id_partner: this.selectedSpacerNames,
          links: this.addItem.links,
          comments: this.addItem.comments,
          rent: this.addItem.rent,
          placement: this.selectedSpacer,
          responsible: this.selectedSpacerResponsibleNames,
        }).then((res) => {
          this.addItem.id_contract = this.editItem.id_contract,
            this.addItem.data = '',
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
