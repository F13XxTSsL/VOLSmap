<template>
    <div class="wrapper__toolbar grey darken-3">
        <div>
            <v-simple-table dark
                            :dense="dense"
                            :fixed-header="fixedHeader"
                            :height="height"
            >
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Наименование</th>
                        <th class="text-left">Данные</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in rows" :key="item.id_contract">
                        <td>{{ item.label }}</td>
                        <td>{{ item.value }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rows: {
                type: Array
            }
        },
        data: () => ({
            dense: false,
            fixedHeader: false,
            height: 930
        }),
    }
</script>

<style scoped>
    .wrapper__toolbar {
        width: 400px;
        height: 100vh;
        z-index: 100;
        opacity: 0.9;
        position: absolute;
        bottom: 0;
        top: 80px;
    }
</style>