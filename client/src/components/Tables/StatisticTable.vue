<!--<template>-->
<!--    <div class="wrapper__toolbar grey darken-3">-->
<!--        <div>-->
<!--            <v-simple-table dark-->
<!--                            :dense="dense"-->
<!--                            :fixed-header="fixedHeader"-->
<!--                            :height="height"-->
<!--            >-->
<!--                <template-->
<!--                        v-slot:default>-->
<!--                    <thead>-->
<!--                    <tr>-->
<!--                        <th class="text-left text-title">Наименование</th>-->
<!--                        <th class="text-left text-title">Данные</th>-->
<!--                    </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                    <tr v-for="item in rows" :key="item.id_contract">-->
<!--                        <td class="text-body">{{ item.label }}</td>-->
<!--                        <td class="text-body"-->
<!--                        >{{ item.value }}-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                </template>-->
<!--            </v-simple-table>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    props: {-->
<!--      rows: {-->
<!--        type: Array-->
<!--      },-->
<!--      classes: {-->
<!--        type: String,-->
<!--        required: false-->
<!--      },-->
<!--    },-->
<!--    data: () => ({-->
<!--      dense: false,-->
<!--      fixedHeader: false,-->
<!--      height: 930-->
<!--    }),-->
<!--    methods: {-->
<!--      // getCellClasses(item) {-->
<!--      //   let classes = []-->
<!--      //   classes.push(item.statusClass === 'active' ? 'green' : 'red')-->
<!--      //   return classes.join('')-->
<!--      // }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--    td, th {-->
<!--        height: 65px;-->
<!--    }-->

<!--    .wrapper__toolbar {-->
<!--        width: 450px;-->
<!--        height: 100vh;-->
<!--        z-index: 100;-->
<!--        opacity: 0.7;-->
<!--        position: absolute;-->
<!--        bottom: 0;-->
<!--        top: 80px;-->
<!--    }-->

<!--    .text-title {-->
<!--        font-weight: 400;-->
<!--        font-size: 1rem;-->
<!--        color: #fff !important;-->
<!--    }-->

<!--    .text-body {-->
<!--        font-size: 0.80rem;-->
<!--    }-->
<!--    td.green {-->
<!--        background-color: green;-->
<!--    }-->
<!--</style>-->