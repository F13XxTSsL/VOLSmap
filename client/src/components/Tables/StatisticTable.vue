<!--<template>-->
<!--  <div class="container">-->
<!--    <v-data-table-->
<!--      :headers="headers"-->
<!--      :items="rows"-->
<!--      class="elevation-1"-->
<!--    >-->
<!--      <template v-slot:top>-->
<!--        <v-toolbar flat color="white">-->
<!--          <v-toolbar-title>My CRUD</v-toolbar-title>-->
<!--          <v-divider-->
<!--            class="mx-4"-->
<!--            inset-->
<!--            vertical-->
<!--          ></v-divider>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-container>-->
<!--            <v-row></v-row>-->
<!--          </v-container>-->
<!--          <v-dialog v-model="dialog" max-width="500px">-->
<!--            <template v-slot:activator="{ on }">-->
<!--              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>-->
<!--            </template>-->
<!--            <v-card>-->
<!--              <v-card-title>-->
<!--                <span class="headline">{{ formTitle }}</span>-->
<!--              </v-card-title>-->

<!--              <v-card-text>-->
<!--                <v-container>-->
<!--                  <v-row>-->
<!--                    <v-col cols="12" sm="6" md="4">-->
<!--                      <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col cols="12" sm="6" md="4">-->
<!--                      <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col cols="12" sm="6" md="4">-->
<!--                      <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col cols="12" sm="6" md="4">-->
<!--                      <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>-->
<!--                    </v-col>-->
<!--                    <v-col cols="12" sm="6" md="4">-->
<!--                      <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                </v-container>-->
<!--              </v-card-text>-->

<!--              &lt;!&ndash;            <v-card-actions>&ndash;&gt;-->
<!--              &lt;!&ndash;              <v-spacer></v-spacer>&ndash;&gt;-->
<!--              &lt;!&ndash;              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>&ndash;&gt;-->
<!--              &lt;!&ndash;              <v-btn color="blue darken-1" text @click="save">Save</v-btn>&ndash;&gt;-->
<!--              &lt;!&ndash;            </v-card-actions>&ndash;&gt;-->
<!--            </v-card>-->
<!--          </v-dialog>-->
<!--        </v-toolbar>-->
<!--      </template>-->
<!--&lt;!&ndash;      <template v-slot:item.action="{ item }">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-icon&ndash;&gt;-->
<!--&lt;!&ndash;          small&ndash;&gt;-->
<!--&lt;!&ndash;          class="mr-2"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="editItem(item)"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          mdi-edit&ndash;&gt;-->
<!--&lt;!&ndash;        </v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-icon&ndash;&gt;-->
<!--&lt;!&ndash;          small&ndash;&gt;-->
<!--&lt;!&ndash;          @click="deleteItem(item)"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          mdi-delete&ndash;&gt;-->
<!--&lt;!&ndash;        </v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;      </template>&ndash;&gt;-->
<!--    </v-data-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    props: {-->
<!--      headers: {-->
<!--        type: Array-->
<!--      },-->
<!--      rows: {-->
<!--        type: Array-->
<!--      }-->
<!--    },-->
<!--    data: () => ({-->
<!--      editedItem: {-->
<!--        name: '',-->
<!--        calories: 0,-->
<!--        fat: 0,-->
<!--        carbs: 0,-->
<!--        protein: 0,-->
<!--      },-->
<!--      defaultItem: {-->
<!--        name: '',-->
<!--        calories: 0,-->
<!--        fat: 0,-->
<!--        carbs: 0,-->
<!--        protein: 0,-->
<!--      },-->
<!--    }),-->

<!--    methods: {-->
<!--      // editItem (item) {-->
<!--      //   this.editedIndex = this.desserts.indexOf(item)-->
<!--      //   this.editedItem = Object.assign({}, item)-->
<!--      //   this.dialog = true-->
<!--      // },-->

<!--      // deleteItem (item) {-->
<!--      //   const index = this.desserts.indexOf(item)-->
<!--      //   confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)-->
<!--      // },-->

<!--      // close () {-->
<!--      //   this.dialog = false-->
<!--      //   setTimeout(() => {-->
<!--      //     this.editedItem = Object.assign({}, this.defaultItem)-->
<!--      //     this.editedIndex = -1-->
<!--      //   }, 300)-->
<!--      // },-->

<!--      // save () {-->
<!--      //   if (this.editedIndex > -1) {-->
<!--      //     Object.assign(this.desserts[this.editedIndex], this.editedItem)-->
<!--      //   } else {-->
<!--      //     this.desserts.push(this.editedItem)-->
<!--      //   }-->
<!--      //   this.close()-->
<!--      // },-->
<!--    },-->
<!--  }-->
<!--</script>-->