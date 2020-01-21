<template>
    <div class="contracts margin__top ">
        <v-container>
            <v-data-table
                    :headers="headers"
                    :items="rows"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Контракты</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogAdd" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Добавить</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Добавление контракта</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.id_contract"
                                                              label="ID контракта"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.data"
                                                              label="Дата"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.id_partner" label="ID партнера"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.links"
                                                              label="Ссылки"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.comments"
                                                              label="Комментарии"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.rent" label="Оплата"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-col class="d-flex" cols="12" sm="12">
                                                    <v-select
                                                            :items="itemsPlacement"
                                                            item-text="text"
                                                            item-value="id"
                                                            label="Способ прокладки"
                                                            @change="atSelected($event)"
                                                    ></v-select>
                                                </v-col>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Назад</v-btn>
                                    <v-btn color="blue darken-1" text @click="saveAdd">Сохранить</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogEditWindow" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Редактирование контракта</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.id_contract"
                                                              label="ID контракта"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.data"
                                                              label="Дата"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.id_partner" label="ID партнера"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.links"
                                                              label="Ссылки"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.comments"
                                                              label="Комментарии"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.rent" label="Оплата"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-col class="d-flex" cols="12" sm="12">
                                                    <v-select
                                                            :items="itemsPlacement"
                                                            item-text="text"
                                                            item-value="id"
                                                            label="Способ прокладки"
                                                            @change="atSelected($event)"
                                                    ></v-select>
                                                </v-col>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Назад</v-btn>
                                    <v-btn color="blue darken-1" text @click="editItemSave">Сохранить</v-btn>
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
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Восстановить</v-btn>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                dialogAdd: false,
                dialogEditWindow: false,
                  itemsPlacement: [
                    {id: 'indoor', text: 'В помещении'},
                    {id: 'sewage', text: 'В канализации'},
                    {id: 'prop', text: 'На опорах'},
                    {id: 'roof', text: 'По земле'}
                  ],
                headers: [
                    {text: 'ID контракта', align: 'left', sortable: false, value: 'id_contract',},
                    {text: 'Дата', sortable: false, value: 'data',},
                    {text: 'ID партнера', value: 'id_partner', sortable: false},
                    {text: 'Ссылки', value: 'links', sortable: false},
                    {text: 'Комментарии', value: 'comments', sortable: false},
                    {text: 'Оплата', value: 'rent', sortable: false},
                    {text: 'Cпособ прокладки', value: 'placement', sortable: false},
                    {text: 'Действия', value: 'action', sortable: false},
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
                    placement: this.itemsPlacement
                },
                editItem: {
                    id_contract: 0,
                    data: '',
                    id_partner: 0,
                    links: '',
                    comments: '',
                    rent: 0.0,
                    placement: this.itemsPlacement
                },
                defaultItem: {
                    id_contract: 0,
                    data: '',
                    id_partner: 0,
                    links: '',
                    comments: '',
                    rent: 0.0,
                    placement: this.itemsPlacement
                },
              selectedSpacer: ''
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
                  console.log(item)
                    this.rows.push({
                        id_contract: item.id_contract,
                        data: item.data,
                        id_partner: item.id_partner,
                        links: item.links,
                        comments: item.comments,
                        rent: item.rent,
                        placement: item.placement === 'indoor' ? item.placement = 'В помещении' :
                                   item.placement === 'sewage' ? item.placement = 'В канализации' :
                                   item.placement === 'prop' ? item.placement = 'На опорах' :
                                   item.placement === 'roof' ? item.placement = 'По земле' : ''
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
                        placement: this.selectedSpacer
                    },
                ).then((res) => {
                    this.editItem.id_contract = this.defaultItem.id_contract
                    this.editItem.data = this.defaultItem.data
                    this.editItem.id_partner = this.defaultItem.id_partner
                    this.editItem.links = this.defaultItem.links
                    this.editItem.comments = this.defaultItem.comments
                    this.editItem.rent = this.defaultItem.rent
                    this.editItem.placement = this.selectedSpacer
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
                    placement: this.selectedSpacer
                }).then((res) => {
                        this.addItem.id_contract = this.editItem.id_contract,
                        this.addItem.data = '',
                        this.addItem.id_partner = 0,
                        this.addItem.links = '',
                        this.addItem.comments = '',
                        this.addItem.rent = 0.0
                        this.addItem.placement = ''
                }).catch((err) => {
                    console.log(err)
                })
                this.close()
            },
        },
    }
</script>
