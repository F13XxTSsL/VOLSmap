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
            rows: {type: Array},
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

<style lang="scss">
    .leftTableStatic {
        width: 500px;
        z-index: 100;
        opacity: 0.7;
        position: absolute;
        bottom: 0;
        top: 80px;
        border-radius: 0px;
        overflow: auto;
        &::-webkit-scrollbar { width: 5px; height: 3px;}
        &::-webkit-scrollbar-track {  background: rgba(255, 255, 255, 0.48);}
        &::-webkit-scrollbar-thumb { height: 10px; background-color: rgba(0, 0, 0, 0.77); border: none;}
        thead tr {
            background-color: inherit;
        }
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
    .theme--dark.v-data-table tbody tr {
        transition: all 0.3s;
    }
    @media (max-width: 940px) {
        .leftTableStatic {
            width: 320px!important;
        }
        .close {
            left: 320px!important;
            top: 350px!important;
        }
        .helper_description {
            font-size: 14px;
            display: flex;
            justify-content: flex-end;
            .button {
                display: flex;
                align-items: flex-end;
            }
            .description {
                width: 240px!important;
            }
        }

    }
    @media (max-width: 770px) {
        .leftTableStatic {
            top: 55px;
        }
        .help__wrapper {
            top: 60px!important;
            right: 0px!important;
        }
    }
    @media (max-width: 350px) {
        .leftTableStatic {
            width: 280px!important;
        }
        .close {
            left: 280px!important;
        }
    }

</style>