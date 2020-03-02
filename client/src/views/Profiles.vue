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
                            label="Поиск пользователя"
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
                        <td class="id_cell">{{ rows.item.id_user }}</td>
                        <td class="links">{{ rows.item.login }}</td>
                        <td class="comments">{{ rows.item.password }}</td>
                        <td class="status">{{ rows.item.profile_status }}</td>
                        <td class="responsible">{{ rows.item.fio }}</td>
                        <td class="name_partner">{{ rows.item.phone_number }}</td>
                        <td class="action_cell">{{ rows.item.email }}</td>
                        <td class="placement">{{ rows.item.position }}</td>
                        <td class="type">{{ rows.item.subdivision }}</td>
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
                        <v-toolbar-title>Пользователи</v-toolbar-title>
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
                                  style="background-color: rgba(73, 138, 184, 0.8);"
                                        dark
                                        class="mb-2"
                                        v-on="on"
                                >
                                    Добавить
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Добавление пользователя</span>
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
                                                        v-model="addItem.id_user"
                                                        label="Номер пользователя"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="6"
                                            >

                                                <v-text-field
                                                        v-model="addItem.login"
                                                        label="Логин"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-text-field
                                                        v-model="addItem.password"
                                                        label="Пароль"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-select
                                                  :items="statusProfile"
                                                  item-text="text"
                                                  item-value="id"
                                                  label="Статус профиля"
                                                  @change="atSelectedStatusProfile($event)"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-text-field
                                                        v-model="addItem.fio"
                                                        label="ФИО"
                                                />
                                            </v-col>
                                            <v-col
                                                    class="d-flex"
                                                    cols="6"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        v-model="addItem.phone_number"
                                                        label="Телефон"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="6"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="addItem.email"
                                                        label="Почта"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="addItem.position"
                                                        label="Позиция"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="addItem.subdivision"
                                                        label="Подразделение"
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
                                    <span class="headline">Редактирование пользователя</span>
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
                                                        v-model="editItem.id_user"
                                                        label="Номер пользователя"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="editItem.login"
                                                        label="Логин"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-text-field
                                                        v-model="editItem.password"
                                                        label="Пароль"
                                                />
                                            </v-col>
                                            <v-col
                                              cols="12"
                                              sm="12"
                                              md="12"
                                            >
                                                <v-select
                                                  :items="statusProfile"
                                                  item-text="text"
                                                  item-value="id"
                                                  label="Статус профиля"
                                                  v-model="selectedStatusProfile"
                                                  @change="atSelectedStatusProfile($event)"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-text-field
                                                        v-model="editItem.fio"
                                                        label="ФИО"
                                                />
                                            </v-col>
                                            <v-col
                                                    class="d-flex"
                                                    cols="6"
                                                    sm="6"
                                            >
                                                <v-text-field
                                                        v-model="editItem.phone_number"
                                                        label="Телефон"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="6"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="editItem.email"
                                                        label="Почта"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                            >
                                                <v-text-field
                                                        v-model="editItem.position"
                                                        label="Позиция"
                                                />
                                            </v-col>
                                            <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="6"
                                            >
                                                <v-text-field
                                                        v-model="editItem.subdivision"
                                                        label="Подразделение"
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
                search: '',
                dialogAdd: false,
                dialogEditWindow: false,
                statusProfile: [
                    {id: 'admin', text: 'Администратор'},
                    {id: 'operator', text: 'Оператор'},
                ],
                headers: [
                    {text: 'Номер пользователя', align: 'left', sortable: false, value: 'id_user', class:'id_cell'},
                    {text: 'Логин', sortable: false, value: 'login', class:'links'},
                    {text: 'Пароль', value: 'password', sortable: false, class:'comments'},
                    {text: 'Статус', value: 'profile_status', sortable: false, class:'status'},
                    {text: 'ФИО', value: 'fio', sortable: false, class:'responsible'},
                    {text: 'Телефон', value: 'phone_number', sortable: false, class:'name_partner'},
                    {text: 'Почта', value: 'email', sortable: false, class:'action_cell'},
                    {text: 'Должность', value: 'position', sortable: false, class:'placement'},
                    {text: 'Подразделение', value: 'subdivision', sortable: false, class:'type'},
                    {text: 'Действия', value: 'action', sortable: false, class:'action_cell'}
                ],
                rows: [],
                addIndex: -1,
                editIndex: -1,
                addItem: {
                    id_user: 0,
                    login: '',
                    password: '',
                    profile_status: '',
                    fio: '',
                    phone_number: '+',
                    email: '',
                    position: '',
                    subdivision: ''

                },
                editItem: {
                    id_user: 0,
                    login: '',
                    password: '',
                    profile_status: '',
                    fio: '',
                    phone_number:'+',
                    email: '',
                    position: '',
                    subdivision: ''
                },
                defaultItem: {
                    id_user: 0,
                    login: '',
                    password: '',
                    profile_status: '',
                    fio: '',
                    phone_number: '+',
                    email: '',
                    position: '',
                    subdivision: ''
                },
                selectedSpacer: '',
                selectedSpacerNames: '',
                selectedStatusProfile: '',
                loader: true
            }
        },
        mounted() {
            this.getProfiels()
        },
        methods: {
            getProfiels() {
                axios.get('http://localhost:3000/profile_all').then(response => {
                    this.initialize(response.data)
                })
            },
            initialize(data) {
                this.rows = []
                data.map(item => {
                    console.log(item)
                    this.rows.push({
                        id_user: item.id_user,
                        login: item.login,
                        password: item.password,
                        profile_status: Helper.statusProfile(item.profile_status),
                        fio: item.fio,
                        phone_number: item.phone_number,
                        email: item.email,
                        position: item.position,
                        subdivision: item.subdivision
                    })
                    this.loader = false
                })
            },
            atSelectedStatusProfile(event) {
              this.selectedStatusProfile = event
            },
            dialogEdit(item) {
                this.dialogEditWindow = true
                this.editItem.id_user = item.id_user
                this.editItem.login = item.login
                this.editItem.password = item.password
                this.editItem.profile_status = Helper.revertStatusProfile(item.profile_status)
                this.editItem.fio = item.fio
                this.editItem.phone_number = item.phone_number
                this.editItem.email = item.email
                this.editItem.position = item.position
                this.editItem.subdivision = item.subdivision

                this.selectedStatusProfile = Helper.revertStatusProfile(item.profile_status)
            },
            editItemSave() {
                axios.put(`http://localhost:3000/profile_all/${this.editItem.id_user}`,
                    {
                        id_user: this.editItem.id_user,
                        login: this.editItem.login,
                        password: this.editItem.password,
                        profile_status: this.selectedStatusProfile ? this.selectedStatusProfile : this.editItem.profile_status,
                        fio: this.editItem.fio,
                        phone_number: this.editItem.phone_number,
                        email:  this.editItem.email,
                        position:  this.editItem.position,
                        subdivision:  this.editItem.subdivision
                    },
                ).then((res) => {
                    this.editItem.id_user = this.defaultItem.id_user
                    this.editItem.login = this.defaultItem.login
                    this.editItem.password = this.defaultItem.password
                    this.editItem.profile_status = this.defaultItem.profile_status
                    this.editItem.fio = this.defaultItem.fio
                    this.editItem.phone_number = this.defaultItem.phone_number
                    this.editItem.email = this.defaultItem.email
                    this.editItem.position = this.defaultItem.position,
                    this.editItem.subdivision = this.defaultItem.subdivision
                }).catch(err => console.log(err))
                this.dialogEditWindow = false

            },
            deleteItem(item) {
                const index = this.rows.indexOf(item)
                const result = confirm('Вы уверены, что хотите удалить запись?') && this.rows.splice(index, 1)
                if (result) {
                    axios.delete(`http://localhost:3000/profile_all/${item.id_user}`)
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
                axios.post('http://localhost:3000/profile_all', {
                    id_user: this.addItem.id_user,
                    login: this.addItem.login,
                    password:this.addItem.password,
                    profile_status: this.selectedStatusProfile,
                    fio: this.addItem.fio,
                    phone_number: this.addItem.phone_number,
                    email:this.addItem.email,
                    position: this.addItem.position,
                    subdivision: this.addItem.subdivision,
                }).then((res) => {
                    this.addItem.id_user = this.editItem.id_user,
                        this.addItem.login = '',
                        this.addItem.password = 0,
                        this.addItem.profile_status = '',
                        this.addItem.fio = '',
                        this.addItem.phone_number = 0.0,
                        this.addItem.email = '',
                        this.addItem.position = '',
                        this.addItem.subdivision = ''
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
