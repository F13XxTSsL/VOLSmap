<template>
  <div class="line_objects margin__top ">
    <v-container>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Поиск линейные объекта"
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
            <v-toolbar-title>Линейные объекты</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
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
              <!--                            <v-card>-->
              <!--                                <v-card-title>-->
              <!--                                    <span class="headline">Добавление объекта</span>-->
              <!--                                </v-card-title>-->

              <!--                                <v-card-text>-->
              <!--                                    <v-container>-->
              <!--                                        <v-row>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="6"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.id_object"-->
              <!--                                                        label="Номер объекта"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="6"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.id_obj_contract"-->
              <!--                                                        label="Номер контракта"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="12"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.name_obj"-->
              <!--                                                        label="Имя объекта"-->
              <!--                                                />-->
              <!--                                            </v-col>-->

              <!--                                            <v-col-->
              <!--                                                    class="d-flex"-->
              <!--                                                    cols="12"-->
              <!--                                                    md="12"-->
              <!--                                                    sm="12"-->
              <!--                                            >-->
              <!--                                                <v-select-->
              <!--                                                        :items="typeObjects"-->
              <!--                                                        item-text="text"-->
              <!--                                                        item-value="id"-->
              <!--                                                        label="Тип объекта"-->
              <!--                                                        @change="atSelectedType($event)"-->
              <!--                                                />-->
              <!--                                            </v-col>-->

              <!--                                            <v-col-->
              <!--                                                    class="d-flex"-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="12"-->
              <!--                                            >-->
              <!--                                                <v-select-->
              <!--                                                        :items="statusObjects"-->
              <!--                                                        item-text="text"-->
              <!--                                                        item-value="id"-->
              <!--                                                        label="Статус"-->
              <!--                                                        @change="atSelectedStatus($event)"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="12"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.data_for_exploitation"-->
              <!--                                                        label="Дата эксплуатации"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="6"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.coordinate_lat"-->
              <!--                                                        label="Широта"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="6"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.coordinate_lng"-->
              <!--                                                        label="Долгота"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="12"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.adress"-->
              <!--                                                        label="Адрес"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="12"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.links"-->
              <!--                                                        label="Ссылки"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                            <v-col-->
              <!--                                                    cols="12"-->
              <!--                                                    sm="6"-->
              <!--                                                    md="12"-->
              <!--                                            >-->
              <!--                                                <v-text-field-->
              <!--                                                        v-model="addItem.comments"-->
              <!--                                                        label="Комментарии"-->
              <!--                                                />-->
              <!--                                            </v-col>-->
              <!--                                        </v-row>-->
              <!--                                    </v-container>-->
              <!--                                </v-card-text>-->

              <!--                                <v-card-actions>-->
              <!--                                    <v-spacer/>-->
              <!--                                    <v-btn-->
              <!--                                            color="blue darken-1"-->
              <!--                                            text-->
              <!--                                            @click="close"-->
              <!--                                    >-->
              <!--                                        Назад-->
              <!--                                    </v-btn>-->
              <!--                                    <v-btn-->
              <!--                                            color="blue darken-1"-->
              <!--                                            text-->
              <!--                                            @click="saveAdd"-->
              <!--                                    >-->
              <!--                                        Добавить-->
              <!--                                    </v-btn>-->
              <!--                                </v-card-actions>-->
              <!--                            </v-card>-->
            </v-dialog>
            <!--                        <v-dialog-->
            <!--                                v-model="dialogEditWindow"-->
            <!--                                max-width="500px"-->
            <!--                        >-->
            <!--                            <v-card>-->
            <!--                                <v-card-title>-->
            <!--                                    <span class="headline">Редактирование объекта</span>-->
            <!--                                </v-card-title>-->

            <!--                                <v-card-text>-->
            <!--                                    <v-container>-->
            <!--                                        <v-row>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="6"-->
            <!--                                                    md="6"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.id_object"-->
            <!--                                                        label="Номер объекта"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="6"-->
            <!--                                                    md="6"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.id_obj_contract"-->
            <!--                                                        label="Номер контракта"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                                    md="12"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.name_obj"-->
            <!--                                                        label="Имя объекта"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                                    md="12"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.data_for_exploitation"-->
            <!--                                                        label="Дата эксплуатации"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                                    md="12"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.adress"-->
            <!--                                                        label="Адрес"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    class="d-flex"-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                            >-->
            <!--                                                <v-select-->
            <!--                                                        :items="typeObjects"-->
            <!--                                                        item-text="text"-->
            <!--                                                        item-value="id"-->
            <!--                                                        label="Тип объекта"-->
            <!--                                                        @change="atSelectedType($event)"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    class="d-flex"-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                            >-->
            <!--                                                <v-select-->
            <!--                                                        :items="statusObjects"-->
            <!--                                                        item-text="text"-->
            <!--                                                        item-value="id"-->
            <!--                                                        label="Статус"-->
            <!--                                                        @change="atSelectedStatus($event)"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="6"-->
            <!--                                                    md="6"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.coordinate_lat"-->
            <!--                                                        label="Широта"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="6"-->
            <!--                                                    md="6"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.coordinate_lng"-->
            <!--                                                        label="Долгота"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                                    md="12"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.links"-->
            <!--                                                        label="Ссылки"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                            <v-col-->
            <!--                                                    cols="12"-->
            <!--                                                    sm="12"-->
            <!--                                                    md="12"-->
            <!--                                            >-->
            <!--                                                <v-text-field-->
            <!--                                                        v-model="editItem.comments"-->
            <!--                                                        label="Комментарии"-->
            <!--                                                />-->
            <!--                                            </v-col>-->
            <!--                                        </v-row>-->
            <!--                                    </v-container>-->
            <!--                                </v-card-text>-->

            <!--                                <v-card-actions>-->
            <!--                                    <v-spacer/>-->
            <!--                                    <v-btn-->
            <!--                                            color="blue darken-1"-->
            <!--                                            text-->
            <!--                                            @click="close"-->
            <!--                                    >-->
            <!--                                        Назад-->
            <!--                                    </v-btn>-->
            <!--                                    <v-btn-->
            <!--                                            color="blue darken-1"-->
            <!--                                            text-->
            <!--                                            @click="editItemSave"-->
            <!--                                    >-->
            <!--                                        Сохранить-->
            <!--                                    </v-btn>-->
            <!--                                </v-card-actions>-->
            <!--                            </v-card>-->
            <!--                        </v-dialog>-->
          </v-toolbar>
        </template>
        <!--                <template v-slot:item.action="{ item }">-->
        <!--                    <v-icon-->
        <!--                            small-->
        <!--                            class="mr-2"-->
        <!--                            @click="dialogEdit(item)"-->
        <!--                    >-->
        <!--                        mdi-pencil-->
        <!--                    </v-icon>-->
        <!--                    <v-icon-->
        <!--                            small-->
        <!--                            @click="deleteItem(item)"-->
        <!--                    >-->
        <!--                        mdi-delete-->
        <!--                    </v-icon>-->
        <!--                </template>-->
      </v-data-table>
      <!--      <div-->
      <!--        class="line__coordinates"-->
      <!--        style="margin-top: 10px"-->
      <!--      >-->
      <!--        <div-->
      <!--          class="coordinates"-->
      <!--        >-->
      <!--          <v-text-field-->
      <!--            label="Долгота"-->
      <!--            v-model="coordinateLat"-->
      <!--          />-->
      <!--          <v-text-field-->
      <!--            label="Широта"-->
      <!--            v-model="coordinateLng"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <v-btn-->
      <!--        small-->
      <!--        color="primary"-->
      <!--        @click="addInputsCoordinates"-->
      <!--      >-->
      <!--        Добавить-->
      <!--      </v-btn>-->
      <!--      <v-btn-->
      <!--        @click="addNewLineObject"-->
      <!--      >-->
      <!--        Сохранить-->
      <!--      </v-btn>-->
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import Helper from "../api/Helper";

  export default {
    data() {
      return {
        lat: '',
        lng: '',
        coordinates: [{lat: '', lng: ''}],
        search: '',
        dialogAdd: false,
        dialogEditWindow: false,
        itemsPlacement: [
          {id: 'indoor', text: 'В помещении'},
          {id: 'sewage', text: 'В канализации'},
          {id: 'prop', text: 'На опорах'},
          {id: 'roof', text: 'По земле'}
        ],
        statusObjects: [
          {id: 'active', text: 'Активен'},
          {id: 'construction', text: 'Строительство'},
          {id: 'error', text: 'Отключен'},
        ],
        headers: [
          {text: 'Номер объекта', value: 'id_line_object', align: 'left', sortable: false,},
          {text: 'Имя объекта', value: 'name', sortable: false},
          {text: 'Расстояние (км)', value: 'distance', sortable: false},
          {text: 'Начало', value: 'startPoint', sortable: false},
          {text: 'Конец', value: 'endPoint', sortable: false},
          {text: 'Номер контракта', value: 'id_contract', sortable: false},
          {text: 'Ссылки', value: 'links', sortable: false},
          {text: 'Комментарии', value: 'comments', sortable: false},
          {text: 'Статус работы', value: 'status', sortable: false},
          {text: 'Тип прокладки', value: 'placement', sortable: false},
          // {text: 'Действия', value: 'action', sortable: false}
        ],
        rows: [],
        addIndex: -1,
        editIndex: -1,
        addItem: {
          id_line_object: 0,
          name: '',
          distance: 0,
          startPoint: 0,
          endPoint: 0,
          id_contract: 0,
          links: '',
          comments: '',
          status: this.statusObjects,
          placement: this.itemsPlacement
        },
        editItem: {
          id_line_object: 0,
          name: '',
          distance: 0,
          startPoint: 0,
          endPoint: 0,
          id_contract: 0,
          links: '',
          comments: '',
          status: this.statusObjects,
          placement: this.itemsPlacement
        },
        defaultItem: {
          id_line_object: 0,
          name: '',
          distance: 0,
          startPoint: 0,
          endPoint: 0,
          id_contract: 0,
          links: '',
          comments: '',
          status: this.statusObjects,
          placement: this.itemsPlacement
        },
        selectedSpacer: '',
        selectedSpacer2: '',
        coordinateLat: 0,
        coordinateLng: 0
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    mounted() {
      this.getObjects()
    },
    methods: {
      addInputsCoordinates() {
        this.coordinates.push({lat: '', lng: ''})
      },
      getObjects() {
        axios.get('http://localhost:3000/line_objects_all').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        data.map(item => {
          this.rows.push({
            id_line_object: item.id_line_object,
            name: item.name,
            id_contract: item.id_contract,
            startPoint: item.id_point_one,
            endPoint: item.id_point_two,
            distance: 0,
            status: Helper.typeObject(item.status),
            placement: Helper.typeDefinion(item.placement),
            links: item.links,
            comments: item.comments
          })
        })
      },
      addNewLineObject() {
          let result = []
          result.push([this.coordinateLat, this.coordinateLng])
        axios.post('http://localhost:3000/line_objects_all', {
          coordinates: {type: "LINESTRING", coordinates: result},
        })
      }
      // atSelectedType(event) {
      //   this.selectedSpacer = event
      // },
      // atSelectedStatus(event) {
      //   this.selectedSpacer2 = event
      // },
      // dialogEdit(item) {
      //   this.dialogEditWindow = true
      //   this.editItem.id_object = item.id_object
      //   this.editItem.type = this.selectedSpacer
      //   this.editItem.id_obj_contract = item.id_obj_contract
      //   this.editItem.comments = item.comments
      //   this.editItem.status = this.selectedSpacer2
      //   this.editItem.coordinate_lat = item.coordinates[0]
      //   this.editItem.coordinate_lng = item.coordinates[1]
      //   this.editItem.name_obj = item.name_obj
      //   this.editItem.data_for_exploitation = item.data_for_exploitation
      //   this.editItem.adress = item.adress
      //   this.editItem.links = item.links
      // },
      // editItemSave() {
      //   axios.put(`http://localhost:3000/objects/${this.editItem.id_object}`,
      //     {
      //       id_object: this.editItem.id_object,
      //       type: this.selectedSpacer,
      //       coordinates: {type: "Point", coordinates: [this.editItem.coordinate_lat, this.editItem.coordinate_lng]},
      //       id_obj_contract: this.editItem.id_obj_contract,
      //       comments: this.editItem.comments,
      //       rent: this.editItem.rent,
      //       status: this.selectedSpacer2,
      //       name_obj: this.editItem.name_obj,
      //       data_for_exploitation: this.editItem.data_for_exploitation,
      //       adress: this.editItem.adress,
      //       links: this.editItem.links,
      //     },
      //   ).then((res) => {
      //     this.editItem.id_object = this.defaultItem.id_object
      //     this.editItem.type = this.selectedSpacer
      //     this.editItem.id_obj_contract = this.defaultItem.id_obj_contract
      //     this.editItem.comments = this.defaultItem.comments
      //     this.editItem.status = this.selectedSpacer2
      //     this.editItem.coordinate_lat = this.defaultItem.coordinate_lat
      //     this.editItem.coordinate_lng = this.defaultItem.coordinate_lng
      //     this.editItem.name_obj = this.defaultItem.name_obj
      //     this.editItem.data_for_exploitation = this.defaultItem.data_for_exploitation
      //     this.editItem.adress = this.defaultItem.adress
      //     this.editItem.links = this.defaultItem.links
      //   }).catch(err => console.log(err))
      //   this.dialogEditWindow = false
      //
      // },
      // deleteItem(item) {
      //   const index = this.rows.indexOf(item)
      //   const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
      //   if (result) {
      //     axios.delete(`http://localhost:3000/objects/${item.id_object}`)
      //   }
      //
      // },
      // close() {
      //   this.dialogAdd = false
      //   this.dialogEditWindow = false
      //   setTimeout(() => {
      //     this.addItem = Object.assign({}, this.defaultItem)
      //     this.addIndex = -1
      //   }, 300)
      // },
      // saveAdd() {
      //   axios.post('http://localhost:3000/objects', {
      //     id_object: this.addItem.id_object,
      //     type: this.selectedSpacer,
      //     coordinates: {type: "Point", coordinates: [this.addItem.coordinate_lat, this.addItem.coordinate_lng]},
      //     id_obj_contract: this.addItem.id_obj_contract,
      //     comments: this.addItem.comments,
      //     status: this.selectedSpacer2,
      //     name_obj: this.addItem.name_obj,
      //     data_for_exploitation: this.addItem.data_for_exploitation,
      //     adress: this.addItem.adress,
      //     links: this.addItem.links
      //   }).then((res) => {
      //     this.addItem.id_object = this.editItem.id_object,
      //       this.addItem.type = '',
      //       this.addItem.id_obj_contract = 0,
      //       this.addItem.comments = '',
      //       this.addItem.status = ''
      //     this.addItem.name_obj = ''
      //     this.addItem.data_for_exploitation = ''
      //     this.addItem.adress = ''
      //     this.addItem.links = ''
      //
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      //   this.close()
      // },
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




