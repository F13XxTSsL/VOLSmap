<template class="leftTableStatic__wrapper">
    <v-data-table
            :headers="headers"
            :items="rows"
            item-key="name"
            group-by="Категория"
            class="elevation-1 leftTableStatic"
            dark
            disable-sort
            disable-filtering
            disable-pagination
            :hide-default-footer="true"
    ></v-data-table>
</template>

<script>
    export default {
        props: {
            rows: {
                type: Array
            },
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Наименования',
                        align: 'left',
                        value: 'name',
                    },
                    {
                        text: 'Данные',
                        align: 'left',
                        value: 'data',
                    },
                ],
            }
        },
    }
</script>

<style>
    .leftTableStatic {
        width: 500px;
        z-index: 100;
        opacity: 0.7;
        position: absolute;
        bottom: 0;
        top: 80px;
        border-radius: 0px;
        overflow: auto;
    }

    .leftTableStatic .v-icon.notranslate.fas.fa-times.theme--dark {
        display: none;
    }

    .leftTableStatic th.text-left {
        font-size: 16px;
        font-weight: 400;
    }

    .leftTableStatic td.text-left {
        font-size: 13px;
    }

</style>