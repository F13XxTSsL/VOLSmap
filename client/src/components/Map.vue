<template>
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
                @click="getPointInfo(item)"
        >
        </gmap-marker>

        <gmap-polyline
                :key="index"
                v-for="(item, index) in lineMarkers"
                v-bind:path.sync="item"
                v-bind:options="{ strokeColor:'#008000'}">
        </gmap-polyline>

    </gmap-map>
</template>

<script>
    import axios from 'axios'
    import {gmapApi} from 'vue2-google-maps';

    export default {
        name: "Map",
        data() {
            return {
                markers: [],
                lineMarkers: [],
                path: [
                    {lat: 45.040038, lng: 38.92336},
                    {lat: 45.040965, lng: 38.927546},
                    {lat: 45.054704, lng: 38.933711}
                ],
            }
                ;
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
            getPointInfo(item) {
                axios.get(`http://localhost:3000/object/${item.id_object}`)
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
                        coords.push(obj.coordinates.coordinates)
                    })
                    coords.map(arr => {
                        let coords2 = []
                        arr.map(item => {
                            coords2.push({lat: item[0], lng: item[1]})
                        })
                        this.returnArrMarker(coords2)
                    })
                })
            },
            returnArrMarker(items) {
                this.lineMarkers.push(items)
            }
        }
    }
</script>

<style lang="scss" scoped>

    #map {
        height: 909px;
        max-height: 100%;
        width: 100%;
        margin: 0 auto;
    }
</style>
