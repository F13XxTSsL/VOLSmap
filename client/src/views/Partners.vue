<template>
    <div class="partners">
        <v-container>
            <v-data-table
                    :headers="headers"
                    :items="rows"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Партнеры</v-toolbar-title>
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
                                    <span class="headline">Добавление партнера</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.id_partner"
                                                              label="ID партенра"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.name"
                                                              label="Наименование"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.INN" label="ИНН"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.contacts"
                                                              label="Контакты"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.comments"
                                                              label="Комментарии"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="addItem.links" label="Ссылки"></v-text-field>
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
                                    <span class="headline">Редактирование партнера</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.id_partner"
                                                              label="ID партенра"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.name"
                                                              label="Наименование"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.INN" label="ИНН"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.contacts"
                                                              label="Контакты"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.comments"
                                                              label="Комментарии"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editItem.links" label="Ссылки"></v-text-field>
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
    import GoogleMap from "../components/Map";

    export default {
        data() {
            return {
                dialogAdd: false,
                dialogEditWindow: false,
                headers: [
                    {text: 'ID партнера', align: 'left', sortable: false, value: 'id_partner',},
                    {text: 'Наименование', sortable: false, value: 'name',},
                    {text: 'ИНН', value: 'INN', sortable: false},
                    {text: 'Контакты', value: 'contacts', sortable: false},
                    {text: 'Комментарии', value: 'comments', sortable: false},
                    {text: 'Ссылки', value: 'links', sortable: false},
                    {text: 'Действия', value: 'action', sortable: false},
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
                console.log(data)
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
                        this.addItem.id_partner = this.editedItem.id_partner,
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
