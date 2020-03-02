<template>
  <div class="objects margin__top ">
    <v-container>
      <div
        class="loader"
        v-if="loader"
      >
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
              label="Поиск объекта"
              single-line
              hide-details
            />
          </v-card-title>
        </v-card>
        <div id="exportable">
        <v-data-table
          :headers="headers"
          :items="rows"
          class="elevation-1"
          :search="search"
          hide-default-footer
          disable-pagination
          :mobile-breakpoint="320"

        >
          <template #item="rows">
            <tr>
              <td class="table-cell id_cell">{{ rows.item.id_object }}</td>
              <td class="table-cell type">{{ rows.item.type }}</td>
              <td class="table-cell name_partner">{{ rows.item.name_obj }}</td>
              <td class="table-cell data_cell">{{ rows.item.data_for_exploitation }}</td>
              <td class="table-cell id_cell">{{ rows.item.id_obj_contract }}</td>
              <td class="table-cell rent_cell">{{ rows.item.rent }}</td>
              <td class="table-cell adress">{{ rows.item.adress }}</td>
              <td class="table-cell links">{{ rows.item.links }}</td>
              <td class="table-cell comments">{{ rows.item.comments }}</td>
              <td class="table-cell coords">{{ rows.item.coordinates[0] }} - {{ rows.item.coordinates[1] }}</td>
              <td class="table-cell status">{{ rows.item.status }}</td>
              <td class="table-cell responsible">{{ rows.item.responsible }}</td>
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
              <v-toolbar-title>Объекты</v-toolbar-title>
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
                <Map/>
                <template v-slot:activator="{ on }">
                  <v-btn
                    style="background-color: rgba(73, 138, 184, 0.8);"
                    dark
                    class="mb-2"
                    v-on="on"
                    v-show="showAdd"
                  >
                    Добавить
                  </v-btn>
                  <v-btn
                    color="#FF9800"
                    dark
                    class="mb-2"
                    @click="exportExcel"
                    style="margin-right: 20px"
                    v-show="showExc"
                  >
                    Экспорт
                  </v-btn>
                </template>
                <v-card style="padding-bottom: 20px;">
                  <v-card-title>
                    <span class="headline">Добавление объекта</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container style="margin-bottom: 0px;">
                      <v-row>
                        <v-col
                          class="d-flex"
                          cols="12"
                          md="12"
                          sm="12"
                        >
                          <v-select
                            :items="typeObjects"
                            item-text="text"
                            item-value="id"
                            label="Тип объекта"
                            @change="atSelectedType($event)"
                          />
                        </v-col>
                        <v-col
                          cols="6"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="addItem.id_object"
                            label="Номер объекта"
                          />
                        </v-col>
                        <v-col
                          class="d-flex"
                          cols="6"
                          sm="6"
                        >
                          <v-autocomplete
                            v-model="selectNumberContract"
                            :items="numberContract"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchNumberContract"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedNumberContract($event)"
                            label="Номер договора"
                            :disabled="selectedSpacer === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="addItem.name_obj"
                            label="Имя объекта"
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
                            label="Статус"
                            @change="atSelectedStatus($event)"
                            :disabled="selectedSpacer === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="addItem.data_for_exploitation"
                            label="Дата ввода в эксплуатацию"
                            :disabled="selectedSpacer === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="addItem.coordinate_lat"
                            label="Широта"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="addItem.coordinate_lng"
                            label="Долгота"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="addItem.adress"
                            label="Адрес"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="addItem.links"
                            label="Ссылки"
                            :disabled="selectedSpacer === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="12"
                        >
                          <v-text-field
                            v-model="addItem.comments"
                            label="Комментарии"
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
                    <span class="headline">Редактирование объекта</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="12"
                        >
                          <v-select
                            :items="typeObjects"
                            item-text="text"
                            item-value="id"
                            v-model="selectedTypeObjects"
                            label="Тип объекта"
                            @change="atSelectedType($event)"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editItem.id_object"
                            label="Номер объекта"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-autocomplete
                            v-model="editItem.id_obj_contract"
                            :items="numberContract"
                            item-text="name"
                            item-value="id"
                            :search-input.sync="searchNumberContract"
                            cache-items
                            flat
                            hide-no-data
                            hide-details
                            @change="atSelectedNumberContract($event)"
                            label="Номер договора"
                            :disabled="editItem.type === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.name_obj"
                            label="Имя объекта"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.data_for_exploitation"
                            label="Дата ввода в эксплуатацию"
                            :disabled="editItem.type === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="editItem.adress"
                            label="Адрес"
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
                            :disabled="editItem.type === 'Coupling'"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editItem.coordinate_lat"
                            label="Широта"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editItem.coordinate_lng"
                            label="Долгота"
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
                            :disabled="editItem.type === 'Coupling'"
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
        <div class="footer-table rent_cell">
          <div class="average_title">
            Средняя стоимость:
          </div>
          <div class="average_value">
            {{ countAverage }} руб.
          </div>
        </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import Map from "../components/Map";
  import Helper from "../api/Helper";
  import FileSaver from "file-saver";

  export default {
    data() {
      return {
        showExc: true,
        showAdd: true,
        selectNumberContract: '',
        searchNumberContract: null,
        search: '',
        dialogAdd: false,
        dialogEditWindow: false,
        typeObjects: [
          {id: 'BTS', text: 'Базовая станция'},
          {id: 'Switch', text: 'Коммутатор'},
          {id: 'Controller', text: 'Контроллер'},
          {id: 'Coupling', text: 'Муфта'},
        ],
        statusObjects: [
          {id: 'active', text: 'Активен'},
          {id: 'construction', text: 'Строительство'},
          {id: 'error', text: 'Отключен'},
        ],
        headers: [
          {text: '№', sortable: false, value: 'id_object', class: 'id_cell'},
          {text: 'Тип объекта', sortable: false, value: 'type', class: 'type'},
          {text: 'Имя объекта', value: 'name_obj', sortable: false, class: 'name_partner'},
          {
            text: 'Дата ввода в эксплуатацию',
            value: 'data_for_exploitation',
            sortable: false,
            class: 'data_cell',
          },
          {text: '№ договора', value: 'id_obj_contract', sortable: false, class: 'id_cell'},
          {text: 'Арендная плата', value: 'rent', sortable: false, class: 'rent_cell'},
          {text: 'Адрес', value: 'adress', sortable: false, class: 'adress'},
          {text: 'Ссылки', value: 'links', sortable: false, class: 'links'},
          {text: 'Комментарии', value: 'comments', sortable: false, class: 'comments'},
          {text: 'Координаты', sortable: false, value: 'coordinates', class: 'coords'},
          {text: 'Статус работы', value: 'status', sortable: false, class: 'status'},
          {text: 'Ответственный', value: 'responsible', sortable: false, class: 'responsible'},
          {text: 'Действия', value: 'action', sortable: false, class: 'action_cell'},
        ],
        rows: [],
        addIndex: -1,
        editIndex: -1,
        addItem: {
          id_object: 0,
          type: '',
          id_obj_contract: 0,
          comments: '',
          status: '',
          coordinate_lat: this.coordinate_lat,
          coordinate_lng: this.coordinate_lng,
          name_obj: '',
          data_for_exploitation: '',
          adress: '',
          links: ''

        },
        editItem: {
          id_object: 0,
          type: '',
          id_obj_contract: 0,
          comments: '',
          status: '',
          coordinate_lat: this.coordinate_lat,
          coordinate_lng: this.coordinate_lng,
          name_obj: '',
          data_for_exploitation: '',
          adress: '',
          links: ''
        },
        defaultItem: {
          id_object: 0,
          type: '',
          comments: '',
          status: '',
          coordinate_lat: 0,
          coordinate_lng: 0,
          name_obj: '',
          data_for_exploitation: '',
          adress: '',
          links: ''
        },
        selectedSpacer: '',
        selectedSpacer2: '',
        selectedNumberContract: '',
        numberContract: [],
        selectedTypeObjects: '',
        selectedStatusObjects: '',
        loader: false,
        countAverage: '0.00'
      }
    },
    components: {
      Map
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    mounted() {
      this.loader = true
      axios.get('http://localhost:3000/objects_contract').then(response => {
        response.data.forEach(item => {
          this.numberContract.push(item.id_contract)
        })
      })
      this.getObjects()
    },
    methods: {
      getObjects() {
        axios.get('http://localhost:3000/objects').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        let rentItems = []
        this.countAverage = 0
        this.rows = []
        data.map((item, i) => {
          if (item.type === 'BTS' || item.type === 'Controller' || item.type === 'Switch') {
            axios.get(`http://localhost:3000/objects_contract/${item.id_obj_contract}`).then(contract => {
              axios.get(`http://localhost:3000/objects_responsible/${contract.data.responsible}`).then(responsible => {
                this.rows.push({
                  id_object: item.id_object,
                  type: Helper.typeObjectItems(item.type),
                  coordinates: Helper.disclosureCoordinates(item.coordinates),
                  id_obj_contract: item.id_obj_contract ? item.id_obj_contract: null,
                  rent: contract.data.rent + ' руб.',
                  comments: item.comments,
                  status: Helper.typeObject(item.status),
                  name_obj: item.name_obj,
                  data_for_exploitation: item.data_for_exploitation,
                  adress: item.adress,
                  links: item.links,
                  responsible: responsible.data.fio
                })
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                if (contract.data.rent > 0) {
                  rentItems.push(parseFloat(contract.data.rent))
                }
                let sumRentValue = rentItems.reduce(reducer)
                let sumRentCount = rentItems.length
                let resultAverage = sumRentValue / sumRentCount
                this.countAverage = resultAverage.toFixed(2)
              })
            })
          } if( item.type === 'Coupling' && item.id_object) {
            this.rows.push({
              id_object: item.id_object,
              type: Helper.typeObjectItems(item.type),
              coordinates: Helper.disclosureCoordinates(item.coordinates),
              comments: item.comments,
              name_obj: item.name_obj,
              adress: item.adress
            })
          }
            this.loader = false
        })
      },
      atSelectedType(event) {
        this.selectedSpacer = event
      },
      atSelectedStatus(event) {
        this.selectedSpacer2 = event
      },
      atSelectedNumberContract(event) {
        this.selectedNumberContract = event
      },
      dialogEdit(item) {
        this.dialogEditWindow = true
        this.editItem.id_object = item.id_object
        this.editItem.id_obj_contract = item.id_obj_contract
        this.editItem.type = Helper.revertTypeObjectItems(item.type)
        this.editItem.comments = item.comments
        this.editItem.status = Helper.revertTypeObject(item.status)
        this.editItem.coordinate_lat = item.coordinates[0]
        this.editItem.coordinate_lng = item.coordinates[1]
        this.editItem.name_obj = item.name_obj
        this.editItem.data_for_exploitation = item.data_for_exploitation
        this.editItem.adress = item.adress
        this.editItem.links = item.links

        this.selectedStatusObjects = Helper.revertTypeObject(item.status)
        this.selectedTypeObjects = Helper.revertTypeObjectItems(item.type)
      },
      editItemSave() {
        axios.put(`http://localhost:3000/objects/${this.editItem.id_object}`,
          {
            id_object: this.editItem.id_object,
            type: this.selectedSpacer ? this.selectedSpacer : this.editItem.type,
            coordinates: {
              type: "Point",
              coordinates: [this.editItem.coordinate_lat, this.editItem.coordinate_lng]
            },
            id_obj_contract: this.selectedNumberContract ? this.selectedNumberContract : this.editItem.id_obj_contract || '',
            comments: this.editItem.comments,
            rent: this.editItem.rent,
            status: this.selectedSpacer2 ? this.selectedSpacer2 : this.editItem.status,
            name_obj: this.editItem.name_obj,
            data_for_exploitation: this.editItem.data_for_exploitation,
            adress: this.editItem.adress,
            links: this.editItem.links,
          },
        ).then((res) => {
          this.editItem.id_object = this.defaultItem.id_object
          this.editItem.type = this.selectedSpacer
          this.editItem.comments = this.defaultItem.comments
          this.editItem.status = this.selectedSpacer2
          this.editItem.coordinate_lat = this.defaultItem.coordinate_lat
          this.editItem.coordinate_lng = this.defaultItem.coordinate_lng
          this.editItem.name_obj = this.defaultItem.name_obj
          this.editItem.data_for_exploitation = this.defaultItem.data_for_exploitation
          this.editItem.adress = this.defaultItem.adress
          this.editItem.links = this.defaultItem.links
        }).catch(err => console.log(err))
        this.dialogEditWindow = false

      },
      deleteItem(item) {
        const index = this.rows.indexOf(item)
        const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
        if (result) {
          axios.delete(`http://localhost:3000/objects/${item.id_object}`)
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
        axios.post('http://localhost:3000/objects', {
          id_object: this.addItem.id_object,
          type: this.selectedSpacer,
          coordinates: {
            type: "Point",
            coordinates: [this.addItem.coordinate_lat, this.addItem.coordinate_lng]
          },
          id_obj_contract: this.selectedNumberContract ? this.selectedNumberContract : null,
          comments: this.addItem.comments,
          status: this.selectedSpacer2,
          name_obj: this.addItem.name_obj,
          data_for_exploitation: this.addItem.data_for_exploitation,
          adress: this.addItem.adress,
          links: this.addItem.links
        }).then((res) => {
          this.addItem.id_object = this.editItem.id_object,
            this.addItem.type = '',
            this.addItem.id_obj_contract = this.selectedNumberContract ? this.selectedNumberContract : null,
            this.addItem.comments = '',
            this.addItem.status = ''
          this.addItem.name_obj = ''
          this.addItem.data_for_exploitation = ''
          this.addItem.adress = ''
          this.addItem.links = ''

        }).catch((err) => {
          console.log(err)
        })
        this.close()
      },
      exportExcel() {
        this.showExc = false
        this.showAdd = false
        let idTable = document.getElementById('exportable')
        let doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>
        <meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/>
        </x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>`
        doc += idTable.innerHTML
        FileSaver.saveAs(new Blob([doc], {
          encoding: 'UTF-8',
          type: 'application/octet-stream'
        }), `objects.xls`)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    position: relative;
    margin-bottom: 45px;
  }

  .footer-table {
    position: fixed;
    bottom: 5px;
    width: 764px;
    padding-right: 29px;
    background-color: #fff;
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




