<template>
    <div class="line_objects margin__top ">
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
                        hide-default-footer
                >
                    <template #item="rows">
                        <tr>
                            <td class="table-cell id_cell">{{ rows.item.id_line_object }}</td>
                            <td class="table-cell name_partner">{{ rows.item.name }}</td>
                            <td class="table-cell distance">{{ rows.item.distance }}</td>
                            <td class="table-cell rent_cell">{{ rows.item.rent }}</td>
                            <td class="table-cell rent_cell_one">{{ rows.item.cost_rent }}</td>
                            <td class="table-cell start_point">{{ rows.item.startPoint }}</td>
                            <td class="table-cell end_point">{{ rows.item.endPoint }}</td>
                            <td class="table-cell id_cell">{{ rows.item.id_contract }}</td>
                            <td class="table-cell links">{{ rows.item.links }}</td>
                            <td class="table-cell comments">{{ rows.item.comments }}</td>
                            <td class="table-cell status">{{ rows.item.status }}</td>
                            <td class="table-cell placement">{{ rows.item.placement }}</td>
                            <td class="table-cell responsible">{{ rows.item.responsible }}</td>
                            <td class="table-cell action_cell">
                                <v-icon class="mr-2" small @click="dialogEdit(rows.item)">{{ rows.item.action }}
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="deleteItem(rows.item)">{{ rows.item.action }} mdi-delete</v-icon>
                            </td>
                        </tr>
                    </template>
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
                                <Map/>
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
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field
                                                            v-model="addItem.name"
                                                            label="Имя объекта"
                                                    />
                                                </v-col>

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
                                                    <v-autocomplete
                                                            v-model="searchNumberContract"
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
                                                    ></v-autocomplete>
                                                </v-col>

                                                <v-col
                                                        class="d-flex"
                                                        cols="6"
                                                        sm="6"
                                                >
                                                    <v-autocomplete
                                                            v-model="selectedNumberPointOne"
                                                            :items="numberPointOne"
                                                            item-text="name"
                                                            item-value="id"
                                                            :search-input.sync="searchNumberPointOne"
                                                            cache-items
                                                            flat
                                                            hide-no-data
                                                            hide-details
                                                            @change="atSelectedNumberPointOne($event)"
                                                            label="Начало пути"
                                                    ></v-autocomplete>
                                                </v-col>

                                                <v-col
                                                        class="d-flex"
                                                        cols="6"
                                                        sm="6"
                                                >
                                                    <v-autocomplete
                                                            v-model="selectedNumberPointTwo"
                                                            :items="numberPointTwo"
                                                            item-text="name"
                                                            item-value="id"
                                                            :search-input.sync="searchNumberPointTwo"
                                                            cache-items
                                                            flat
                                                            hide-no-data
                                                            hide-details
                                                            @change="atSelectedNumberPointTwo($event)"
                                                            label="Конец пути"
                                                    ></v-autocomplete>
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
                                                <v-col
                                                        cols="12"
                                                        sm="12"
                                                        class="coords"
                                                >
                                                    <div :key="i" v-for="(item, i) in itemCoords">Точка {{i}} - Широта:
                                                        <span style="color: green">{{item[0]}}</span> Долгота: <span
                                                                style="color: green">{{item[1]}}</span></div>
                                                    <div class="item_coord" style="margin-top: 20px;">
                                                        <v-text-field
                                                                v-model="itemCoordLat"
                                                                label="Широта"
                                                                @change="itemCoordLat"
                                                        />
                                                        <v-text-field
                                                                v-model="itemCoordLng"
                                                                label="Долгота"
                                                                style="margin-left: 20px;"
                                                        />
                                                        <v-icon class="btn-coords" color="green" @click="addCoords">
                                                            mdi-plus
                                                        </v-icon>
                                                    </div>
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
                </v-data-table>
                <div class="footer-table rent_cell">
                    <div class="average_title">Средняя стоимость:</div>
                    <div class="average_value">{{countAverage}} руб.</div>
                </div>
            </div>
        </v-container>
    </div>
</template>
<script>
    import axios from 'axios'
    import {gmapApi} from 'vue2-google-maps';
    import Helper from "../api/Helper";
    import FileSaver from 'file-saver'
    import Map from "../components/Map";
    import EventBus from "../components/EventBus";

    export default {
        components: {
            Map
        },
        computed: {
            google: gmapApi
        },
        data() {
            return {
                searchNumberPointOne: null,
                searchNumberPointTwo: null,
                selectNumberContract: '',
                searchNumberContract: null,
                loader: true,
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
                    {
                        text: '№',
                        value: 'id_line_object',
                        sortable: false,
                        align: 'left',
                        class: 'id_cell',
                        align: 'center'
                    },
                    {text: 'Имя объекта', value: 'name', sortable: false, class: 'name_partner', align: 'center'},
                    {text: 'Расстояние(м)', value: 'distance', sortable: false, class: 'distance', align: 'center'},
                    {text: 'Арендная плата', value: 'rent', sortable: false, class: 'rent_cell', align: 'center'},
                    {text: 'Стоимость за 1(м)', value: 'cost_rent', class: 'rent_cell_one', align: 'center'},
                    {text: 'Начало', value: 'startPoint', sortable: false, class: 'start_point', align: 'center'},
                    {text: 'Конец', value: 'endPoint', sortable: false, class: 'end_point', align: 'center'},
                    {text: '№ договора', value: 'id_contract', sortable: false, class: 'id_cell', align: 'center'},
                    {text: 'Ссылки', value: 'links', sortable: false, class: 'links', align: 'center'},
                    {text: 'Комментарии', value: 'comments', sortable: false, class: 'comments', align: 'center'},
                    {text: 'Статус работы', value: 'status', sortable: false, class: 'status', align: 'center'},
                    {text: 'Тип прокладки', value: 'placement', sortable: false, class: 'placement', align: 'center'},
                    {
                        text: 'Ответственный',
                        value: 'responsible',
                        sortable: false,
                        class: 'responsible',
                        align: 'center'
                    },
                    {text: 'Действия', value: 'action', sortable: false, class: 'action_cell', align: 'center'}
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
                    startPoint: 0,
                    endPoint: 0,
                    id_contract: 0,
                    links: '',
                    comments: '',
                    status: this.statusObjects,
                    placement: this.itemsPlacement,
                    coordinates: {}
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
                    placement: ''
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
                    placement: ''
                },
                selectedSpacer: '',
                selectedSpacer2: '',
                selectedNumberContract: '',
                selectedNumberPointOne: '',
                selectedNumberPointTwo: '',
                selectedStatusObjects: '',
                numberContract: [],
                numberPointOne: [],
                numberPointTwo: [],
                arrayCoords: [],
                itemCoords: [],
                itemCoordLat: 0,
                itemCoordLng: 0,
                countAverage: '0.00'
            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
        mounted() {
            this.getObjects()
            EventBus.$on('Location', function (location) {
                this.itemCoordLat = location.lat()
                this.itemCoordLng = location.lng()
                console.log(this.itemCoordLat,  this.itemCoordLng)
            })
            axios.get('http://localhost:3000/line_objects_all_contract').then(response => {
                response.data.forEach(item => {
                    this.numberContract.push(item.id_contract)
                })
            })
            axios.get('http://localhost:3000/line_objects_all_object').then(response => {
                response.data.forEach(item => {
                    this.numberPointOne.push({
                        id: item.id_object,
                        name: item.name_obj,
                        lat: item.coordinates.coordinates[0],
                        lng: item.coordinates.coordinates[1]
                    })
                    this.numberPointTwo.push({
                        id: item.id_object,
                        name: item.name_obj,
                        lat: item.coordinates.coordinates[0],
                        lng: item.coordinates.coordinates[1]
                    })
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
                    let rentItems = []
                    this.countAverage = 0
                    data.map(item => {
                        this.rows = []
                        axios.get(`http://localhost:3000/line_objects_all_one/${item.id_point_one}`).then(one => {
                            axios.get(`http://localhost:3000/line_objects_all_two/${item.id_point_two}`).then(two => {
                                axios.get(`http://localhost:3000/line_objects_all_rent/${item.id_contract}`).then(contract => {
                                    axios.get(`http://localhost:3000/line_objects_all_responsible/${contract.data.responsible}`).then(responsible => {
                                        this.rows.push({
                                            id_line_object: item.id_line_object,
                                            name: item.name ? item.name : '',
                                            distance: (Helper.translateCoordinates(item.coordinates.coordinates)).toFixed(2) + ' м.',
                                            rent: contract.data.rent + ' руб.',
                                            cost_rent: (contract.data.rent / (Helper.translateCoordinates(item.coordinates.coordinates))).toFixed(2) + ' руб.',
                                            startPoint: one.data ? one.data.name_obj : '',
                                            endPoint: two.data ? two.data.name_obj : '',
                                            id_contract: item.id_contract,
                                            links: item.links,
                                            comments: item.comments,
                                            status: Helper.typeObject(item.status),
                                            placement: Helper.typeDefinion(contract.data.placement),
                                            responsible: responsible.data.fio
                                        })
                                        const reducer = (accumulator, currentValue) => accumulator + currentValue;
                                        rentItems.push(parseFloat(contract.data.rent))
                                        let sumRentValue = rentItems.reduce(reducer)
                                        let sumRentCount = rentItems.length
                                        let sumAverage = sumRentValue / sumRentCount
                                        this.countAverage = sumAverage.toFixed(2)
                                        this.loader = false
                                    })
                                })
                            })
                        })
                    })
                })
            },
            addCoords() {
                this.itemCoords.push([this.itemCoordLat, this.itemCoordLng])
                this.itemCoordLat = ''
                this.itemCoordLng = ''
            },
            addLineObj() {
                axios.post('http://localhost:3000/line_objects_all', {
                    id_line_object: this.addItem.id_line_object,
                    name: this.addItem.name,
                    type: this.selectedTypeObjects,
                    id_contract: this.selectedNumberContract,
                    id_point_one: this.selectedNumberPointOne ? this.selectedNumberPointOne : null,
                    id_point_two: this.selectedNumberPointTwo ? this.selectedNumberPointTwo : null,
                    comments: this.addItem.comments,
                    status: this.selectedStatusObjects,
                    links: this.addItem.links,
                    coordinates: {
                        type: "LineString",
                        coordinates: this.itemCoords
                    },
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
            dialogEdit(item) {
                console.log(item)
                // this.dialogEditWindow = true
                // this.editItem.id_line_object = item.id_line_object
                // this.editItem.id_obj_contract = item.id_obj_contract
                // this.editItem.type = Helper.revertTypeObjectItems(item.type)
                // this.editItem.comments = item.comments
                // this.editItem.status = Helper.revertTypeObject(item.status)
                // this.editItem.coordinate_lat = item.coordinates[0]
                // this.editItem.coordinate_lng = item.coordinates[1]
                // this.editItem.name_obj = item.name_obj
                // this.editItem.data_for_exploitation = item.data_for_exploitation
                // this.editItem.adress = item.adress
                // this.editItem.links = item.links
                //
                // this.selectedStatusObjects = Helper.revertTypeObject(item.status)
                // this.selectedTypeObjects = Helper.revertTypeObjectItems(item.type)
            },
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
        },
    }
</script>
<style lang="scss" scoped>
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

    .item_coord {
        display: flex;
    }

    .footer-table {
        max-width: 467px;
        padding-right: 29px;
    }

    .map__wrapper {
        position: absolute;
        overflow: auto;
        left: 170px;
        max-width: 500px;
        height: 810px;
        border-radius: 4px;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
</style>




