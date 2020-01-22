<template>
    <div class="map__wrapper">
        <gmap-map
                id="map"
                :options="{
                    zoom: 14,
                    mapTypeId: 'terrain',
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
            }"
                :center="{
                        lat: 45.055399,
                        lng: 38.967545
                    }"
        >
            <gmap-marker
                    :key="item.id_object"
                    v-for="item in markers"
                    :position="{lat:item.coordinates.coordinates[0], lng:item.coordinates.coordinates[1]}"
                    :clickable="true"
                    @click="getPointInfoClick(item)"
                    :icon="markerOptions"
            >
            </gmap-marker>
            <div
                    :key="index[items]"
                    v-for="(items, index) in lineMarkers"
            >
                <gmap-polyline
                        :key="item.id"
                        v-for="item in items"
                        v-bind:path.sync="item.position"
                        v-bind:options="{ strokeColor:'#008000'}"
                        :clickable="true"
                        @click="getLineInfoClick(item)"
                >
                </gmap-polyline>
            </div>
        </gmap-map>
        <LeftToolbar
                :rows="rows"
        ></LeftToolbar>
        <h1 class="title_volsmap">VOLSmap</h1>
    </div>
</template>

<script>
    import axios from 'axios'
    import {gmapApi} from 'vue2-google-maps';
    import LeftToolbar from '../components/LeftToolbar'

    export default {
        name: "Map",
        data() {
            return {
                markers: [],
                markerOptions: {
                    url: require('../assets/bs.png'),
                    size: {width: 60, height: 90, f: 'px', b: 'px',},
                    scaledSize: {width: 40, height: 40, f: 'px', b: 'px',},
                },
                lineMarkers: [],
                objLine: {
                    coordinates: []
                },
                rows: []
            }
        },
        components: {
            LeftToolbar
        },
        computed: {
            google: gmapApi
        },
        mounted() {
            this.getObjects()
            this.getLineObjects()
        },
        methods: {
            getObjects() {
                axios.get('http://localhost:3000/object').then(response => {
                    this.initialize(response.data)
                })
            },
            initialize(data) {
                for (let i in data) {
                    this.markers.push(data[i])
                }
            },
            getPointInfoClick(item) {
                console.log(item)
                axios.get(`http://localhost:3000/object/${item.id_obj_contract}`).then(response => {
                    this.rows = []
                    this.rows.push(
                        {
                            label: 'Номер контракта',
                            value: response.data.id_contract
                        },
                        {
                            label: 'Дата',
                            value: response.data.data
                        },
                        {
                            label: 'Номер партнера',
                            value: response.data.id_partner
                        },
                        {
                            label: 'Ссылки',
                            value: response.data.links
                        },
                        {
                            label: 'Комментарии',
                            value: response.data.comments
                        },
                        {
                            label: 'Оплата',
                            value: response.data.rent
                        },
                        {
                            label: 'Тип размещения',
                            value: response.data.placement
                        }
                    )
                })
            },
            getLineObjects() {
                let coordinates = new Promise(function (resolve) {
                    axios.get('http://localhost:3000/line_objects').then(response => {
                        resolve(response.data)
                    })
                })
                coordinates.then(items => {
                    let coords = []
                    items.forEach(obj => {
                        coords.push({id_line_object: obj.id_line_object, name: obj.name, id_contract: obj.id_contract, position: obj.coordinates.coordinates})
                    })
                    coords.map(arr => {
                        let coords2 = [{id_line_object: arr.id_line_object, name: arr.name, id_contract: arr.id_contract, position: []}]
                        arr.position.map(item => {
                            for (let i in coords2) {
                                coords2[i].position.push({lat: item[0], lng: item[1]})
                            }
                        })
                        this.lineMarkers.push(coords2)
                    })

                })
            },
            getLineInfoClick(item) {
                axios.get(`http://localhost:3000/object/${item.id_line_object}`).then(response => {
                    console.log(response.data)
                    this.rows = []
                    this.rows.push(
                        {
                            label: 'Номер контракта',
                            value: response.data.id_contract
                        },
                        {
                            label: 'Дата',
                            value: response.data.data
                        },
                        {
                            label: 'Номер партнера',
                            value: response.data.id_partner
                        },
                        {
                            label: 'Ссылки',
                            value: response.data.links
                        },
                        {
                            label: 'Комментарии',
                            value: response.data.comments
                        },
                        {
                            label: 'Оплата',
                            value: response.data.rent
                        },
                        {
                            label: 'Тип размещения',
                            value: response.data.placement
                        }
                    )
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    #map {
        height: 100vh;
        max-height: 100%;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
    }

    .title_volsmap {
        position: absolute;
        font-size: 45px;
        bottom: 20px;
        right: 20px;
        opacity: 0.7;
    }
</style>
