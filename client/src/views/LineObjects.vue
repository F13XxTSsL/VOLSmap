<template>
  <div class="line_objects margin__top ">
    <v-container>
      <div class="loader" v-if="rows.length<0">
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
              label="Поиск линейного объекта"
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
          id="exportable"
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
                  <v-btn
                    color="#FF9800"
                    dark
                    class="mb-2"
                    @click="exportExcel"
                    style="margin-right: 20px"
                  >
                    Экспорт
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Добавление линейного объекта</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="addItem.id_line_object"
                            label="Номер объекта"
                          />
                        </v-col>

                        <v-col
                          class="d-flex"
                          cols="6"
                          sm="6"
                        >
                          <v-select
                            :items="numberContract"
                            item-text="name"
                            item-value="id"
                            label="Номер договора"
                            @change="atSelectedNumberContract($event)"
                          />
                        </v-col>

                        <v-col
                          class="d-flex"
                          cols="6"
                          sm="6"
                        >
                          <v-select
                            :items="numberPointOne"
                            item-text="name"
                            item-value="id"
                            label="Начало пути"
                            @change="atSelectedNumberPointOne($event)"
                          />
                        </v-col>

                        <v-col
                          class="d-flex"
                          cols="6"
                          sm="6"
                        >
                          <v-select
                            :items="numberPointTwo"
                            item-text="name"
                            item-value="id"
                            label="Конец пути"
                            @change="atSelectedNumberPointTwo($event)"
                          />
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="addItem.links"
                            label="Ссылки"
                          />
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
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
                          <v-select
                            :items="statusObjects"
                            item-text="text"
                            item-value="id"
                            v-model="selectedStatusObjects"
                            label="Статус"
                            @change="atSelectedStatus($event)"
                          />
                        </v-col>

                      </v-row>
                    </v-container>
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
                        @click="addLineObj"
                      >
                        Добавить
                      </v-btn>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps';
  import Helper from "../api/Helper";
  import FileSaver from 'file-saver'

  export default {
    computed: {
      google: gmapApi
    },
    data() {
      return {
        lat: '',
        lng: '',
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
          {text: '№', value: 'id_line_object', sortable: false, align: 'left', class: 'object',},
          {text: 'Имя объекта', value: 'name', sortable: false},
          {text: 'Расстояние(м)', value: 'distance', sortable: false},
          {text: 'Арендная плата', value: 'rent', sortable: false},
          {text: 'Стоимость за 1(м)', value: 'cost_rent'},
          {text: 'Начало', value: 'startPoint', sortable: false},
          {text: 'Конец', value: 'endPoint', sortable: false},
          {text: '№ договора', value: 'id_contract', sortable: false},
          {text: 'Ссылки', value: 'links', sortable: false},
          {text: 'Комментарии', value: 'comments', sortable: false},
          {text: 'Статус работы', value: 'status', sortable: false},
          {text: 'Тип прокладки', value: 'placement', sortable: false},
          {text: 'Ответственный', value: 'responsible', sortable: false},
          {text: 'Действия', value: 'action', sortable: false}
        ],
        rows: [],
        addIndex: -1,
        editIndex: -1,
        addItem: {
          id_line_object: 0,
          name: '',
          distance: 0,
          rent: 0,
          cost_rent: 0,
          id_point_one: 0,
          id_point_two: 0,
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
          id_point_one: 0,
          id_point_two: 0,
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
          id_point_one: 0,
          id_point_two: 0,
          id_contract: 0,
          links: '',
          comments: '',
          status: this.statusObjects,
          placement: this.itemsPlacement
        },
        selectedSpacer: '',
        selectedSpacer2: '',
        selectedNumberContract: '',
        selectedNumberPointOne: '',
        selectedNumberPointTwo: '',
        selectedStatusObjects: '',
        numberContract: [],
        numberPointOne: [],
        numberPointTwo: []
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    mounted() {
      this.getObjects()
      axios.get('http://localhost:3000/line_objects_all_contract').then(response => {
        response.data.forEach(item => {
          this.numberContract.push(item.id_contract)
        })
      })

      axios.get('http://localhost:3000/line_objects_all_object').then(response => {
        response.data.forEach(item => {
          this.numberPointOne.push({id: item.id_object, name: item.name_obj})
          this.numberPointTwo.push({id: item.id_object, name: item.name_obj})
        })
      })
    },
    methods: {
      atSelectedType(event) {
        this.selectedSpacer = event
      },
      atSelectedStatus(event) {
        this.selectedSpacer2 = event
      },
      atSelectedNumberContract(event) {
        this.selectedNumberContract = event
      },
      atSelectedNumberPointOne(event) {
        this.selectedNumberPointOne = event
      },
      atSelectedNumberPointTwo(event) {
        this.selectedNumberPointTwo = event
      },
      getObjects() {
        const data = new Promise(function (resolve) {
          axios.get('http://localhost:3000/line_objects_all').then(response => {
            resolve(response.data)
          })
        })
        data.then(data => {
          data.map(item => {
            console.log(item)
            axios.get(`http://localhost:3000/line_objects_all_one/${item.id_point_one}`).then(one => {
              axios.get(`http://localhost:3000/line_objects_all_two/${item.id_point_two}`).then(two => {
                axios.get(`http://localhost:3000/line_objects_all_rent/${item.id_contract}`).then(contract => {
                  // axios.get(`http://localhost:3000/line_objects_all_responsible/${contract.data.responsible}`).then(responsible => {
                  this.rows.push({
                    id_line_object: item.id_line_object,
                    name: item.name,
                    distance: (Helper.translateCoordinates(item.coordinates.coordinates)).toFixed(2) + ' м.',
                    rent: contract.data.rent + ' руб.',
                    cost_rent: (contract.data.rent / (Helper.translateCoordinates(item.coordinates.coordinates))).toFixed(2) + ' руб.',
                    id_point_one: one.data.name_obj,
                    id_point_two: two.data.name_obj,
                    id_contract: item.id_contract,
                    links: item.links,
                    comments: item.comments,
                    status: Helper.typeObject(item.status),
                    placement: Helper.typeDefinion(item.placement),
                    // responsible: responsible.data.fio
                    // })
                  })
                })
              })
            })
          })
        })
      },
      addLineObj() {
        axios.post('http://localhost:3000/line_objects_all', {
          id_line_object: this.addItem.id_line_object,
          type: this.selectedTypeObjects,
          id_contract: this.selectedNumberContract,
          id_point_one: this.selectedNumberPointOne,
          id_point_two: this.selectedNumberPointTwo,
          comments: this.addItem.comments,
          status: this.selectedStatusObjects,
          name_obj: this.addItem.name_obj,
          links: this.addItem.links
        }).then((res) => {
          this.addItem.id_line_object = this.editItem.id_line_object,
            this.addItem.type = '',
            this.addItem.id_contract = 0,
            this.addItem.comments = '',
            this.addItem.status = ''
          this.addItem.name_obj = ''
          this.addItem.links = ''

        }).catch((err) => {
          console.log(err)
        })
        this.close()
      },
      deleteItem(item) {
        const index = this.rows.indexOf(item)
        const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
        if (result) {
          axios.delete(`http://localhost:3000/line_objects_all/${item.id_line_object}`)
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
      exportExcel() {
        let idTable = document.getElementById('exportable')
        let doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>
        <meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/>
        </x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`
        doc += idTable.innerHTML
        FileSaver.saveAs(new Blob([doc], {
          encoding: 'UTF-8',
          type: 'application/octet-stream'
        }), `line_objects.xls`)
      },
    },
    // dialogEdit(item) {
    //   this.dialogEditWindow = true
    //   this.editItem.id_line_object = item.id_line_object
    //   this.editItem.id_obj_contract = item.id_obj_contract
    //   this.editItem.type = Helper.revertTypeObjectItems(item.type)
    //   this.editItem.comments = item.comments
    //   this.editItem.status = Helper.revertTypeObject(item.status)
    //   this.editItem.coordinate_lat = item.coordinates[0]
    //   this.editItem.coordinate_lng = item.coordinates[1]
    //   this.editItem.name_obj = item.name_obj
    //   this.editItem.data_for_exploitation = item.data_for_exploitation
    //   this.editItem.adress = item.adress
    //   this.editItem.links = item.links
    //
    //   this.selectedStatusObjects = Helper.revertTypeObject(item.status)
    //   // this.selectedTypeObjects = Helper.revertTypeObjectItems(item.type)
    // },
    // editItemSave() {
    //   axios.put(`http://localhost:3000/objects/${this.editItem.id_object}`,
    //     {
    //       id_object: this.editItem.id_object,
    //       type: this.selectedSpacer ? this.selectedSpacer : this.editItem.type,
    //       coordinates: {
    //         type: "Point",
    //         coordinates: [this.editItem.coordinate_lat, this.editItem.coordinate_lng]
    //       },
    //       comments: this.editItem.comments,
    //       rent: this.editItem.rent,
    //       status: this.selectedSpacer2 ? this.selectedSpacer2 : this.editItem.status,
    //       name_obj: this.editItem.name_obj,
    //       data_for_exploitation: this.editItem.data_for_exploitation,
    //       adress: this.editItem.adress,
    //       links: this.editItem.links,
    //     },
    //   ).then((res) => {
    //     this.editItem.id_object = this.defaultItem.id_object
    //     this.editItem.type = this.selectedSpacer
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

  /*.object {*/
  /*    background-color: #F06292;*/
  /*    color: #fff !important;*/
  /*    font-weight: 400;*/
  /*}*/
</style>




