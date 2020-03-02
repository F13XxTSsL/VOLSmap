<template>
    <div class="map__wrapper">
        <gmap-map
                id="map"
                :options="optionsMap"
                :center="centerMap"
                :clickable="true"
                @click="clickMap($event)"
        >
            <gmap-info-window
              class="info__window"
              :options="infoOptionsClickCoords"
              :position="infoWindowPosClickCoords"
              :opened="infoWinOpenClickCoords"
              @closeclick="infoWinOpenClose"
            >
                <div v-html="infoContentClickCoords"/>
            </gmap-info-window>
            <gmap-marker
                    :key="item.id_object"
                    v-for="item in markers"
                    :position="{lat:item.coordinates.coordinates[0], lng:item.coordinates.coordinates[1]}"
                    :clickable="true"
                    @click="getPointInfoClick(item)"
                    :icon="typeIcon(item.status, item.type)"
                    :animation="4"
            />
            <gmap-info-window
                    class="info__window"
                    :options="infoOptions"
                    :position="infoWindowPos"
                    :opened="infoWinOpen"
                    @closeclick="infoWinOpenClose"
            >
                <div v-html="infoContent"/>
            </gmap-info-window>
            <div
                    :key="index[items]"
                    v-for="(items, index) in lineMarkers"
            >
                <gmap-polyline
                        :key="item.id"
                        v-for="item in items"
                        :path.sync="item.position"
                        :options="item.placement === 'sewage' ? {strokeColor: '#00ACC1', strokeWeight: 5} :
                                  item.placement === 'prop' ? {strokeColor: '#FF9100', strokeWeight: 5} :
                                  item.placement === 'roof' ? {strokeColor: '#8D6E63', strokeWeight: 5} :
                                  {strokeColor: '#689F38', strokeWeight: 5}"
                        :clickable="true"
                        @click="getLineInfoClick(item)"
                />
            </div>
        </gmap-map>

        <transition name="slide-fade">
            <LeftStatisticTable
                    :rows="rows"
                    v-show="showLeftBar"
                    class="LeftToolbar"
            />
        </transition>

        <transition name="slide-fade">
            <div
                    v-show="closeLeftToolBar"
                    class="close"
                    @click="close"
            >
                <v-icon
                        dark
                        class="fas fa-caret-left"
                />
            </div>
        </transition>
        <h1 class="title_volsmap">
            VOLSmap
        </h1>
        <Help/>
    </div>
</template>

<script>
    import axios from 'axios'
    import {gmapApi} from 'vue2-google-maps';
    import Helper from "../api/Helper";
    import Help from "./Help";
    import LeftStatisticTable from "./Tables/LeftStatisticTable";
    import EventBus from "./EventBus";

    export default {
        name: "Map",
        data() {
            return {
                loading: false,
                optionsMap: {
                    zoom: 17,
                    mapTypeId: 'roadmap',
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: false,
                    styles: [
                        {
                            "featureType": "administrative",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#444444"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#000000"
                                },
                                {
                                    "weight": "10.00"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "weight": "0.01"
                                },
                                {
                                    "color": "#000000"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#46bcec"
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        }
                    ]
                },
                centerMap: {
                    lat: 45.056575,
                    lng: 38.967578
                },
                markers: [],
                lineMarkers: [],
                objLine: {
                    coordinates: []
                },
                rows: [],
                showLeftBar: false,
                closeLeftToolBar: false,
                infoWinOpen: false,
                infoWinOpenClickCoords: false,
                infoContent: '',
                infoWindowPos: {
                    lat: 45.055399,
                    lng: 38.967545
                },
                infoOptions: {},
                distance: 0.0,
                infoContentClickCoords: '',
                infoWindowPosClickCoords: {},
                infoOptionsClickCoords: {}
            }
        },
        components: {
            Help,
            LeftStatisticTable
        },
        computed: {
            google: gmapApi
        },
        mounted() {
            this.getObjects()
            this.getLineObjects()
        },
        methods: {
            clickMap(event) {
                this.infoWinOpen = false
                this.showLeftBar = false
                this.closeLeftToolBar = false
                EventBus.$emit('Location', event.latLng)
                let lat = event.latLng.lat()
                let lng = event.latLng.lng()
                this.infoWindowPosClickCoords = {lat: lat, lng: lng}
                this.infoContentClickCoords = `<div style="display: flex; flex-direction: column;">
                                                  <div class="info__window-text">${lat.toFixed(8)}</div>
                                                <div class="info__window-text">${lng.toFixed(8)}</div></div>`
                this.infoWinOpenClickCoords = {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                }
                this.infoWinOpenClickCoords = true
            },
            typeIcon(status, type) {
                return Helper.iconType(status, type)
            },
            getObjects() {
                axios.get('http://localhost:3000/objects').then(response => {
                    this.initialize(response.data)
                })
            },
            initialize(data) {
                for (let i in data) {
                    this.markers.push(data[i])
                }
            },
            getPointInfoClick(item) {
                this.infoWinOpenClickCoords = false
                if (item.type === 'BTS' || item.type === 'Switch' || item.type === 'Controller') {
                    this.rows = []
                    this.rows.push(
                        {
                            name: 'Номер объекта :',
                            Категория: 'Объект',
                            data: item.id_object
                        },
                        {
                            name: 'Имя объекта :',
                            Категория: 'Объект',
                            data: item.name_obj
                        },
                        {
                            name: 'Тип объекта :',
                            Категория: 'Объект',
                            data: Helper.typeObjectItems(item.type)
                        },
                        {
                            name: 'Дата ввода в эксплуатацию :',
                            Категория: 'Объект',
                            data: item.data_for_exploitation
                        },
                        {
                            name: 'Адрес :',
                            Категория: 'Объект',
                            data: item.adress
                        },
                        {
                            name: 'Сслыки на объект :',
                            Категория: 'Объект',
                            data: item.links
                        },
                        {
                            name: 'Cтатус работы :',
                            Категория: 'Объект',
                            data: Helper.typeObject(item.status)
                        },
                    )
                    const contract = new Promise(function (resolve) {
                        axios.get(`http://localhost:3000/objects_contract/${item.id_obj_contract}`).then(contract => {
                            resolve(contract.data)
                        })
                    })
                    contract.then(data => {
                        axios.get(`http://localhost:3000/objects_partner/${data.id_partner}`).then(partner => {
                            this.rows.push(
                                {
                                    name: 'Номер договора :',
                                    Категория: 'Договор',
                                    data: data.id_contract
                                },
                                {
                                    name: 'Дата заключения :',
                                    Категория: 'Договор',
                                    data: data.data
                                },
                                {
                                    name: 'Наименование контрагента :',
                                    Категория: 'Договор',
                                    data: partner.data.name
                                },
                                {
                                    name: 'Ссылки на договор :',
                                    Категория: 'Договор',
                                    data: data.links
                                },
                                {
                                    name: 'Арендная плата :',
                                    Категория: 'Договор',
                                    data: data.rent + " Руб."
                                },
                                {
                                    name: 'Тип размещения :',
                                    Категория: 'Договор',
                                    data: Helper.typeDefinion(data.placement)
                                },
                            )
                        })
                    })
                    contract.then(data => {
                        axios.get(`http://localhost:3000/objects_responsible/${data.responsible}`).then(responsible => {
                            this.rows.push(
                                {
                                    name: 'ФИО :',
                                    Категория: 'Ответственный',
                                    data: responsible.data.fio
                                },
                                {
                                    name: 'Номер телефона :',
                                    Категория: 'Ответственный',
                                    data: responsible.data.phone_number
                                },
                                {
                                    name: 'Электронная почта',
                                    Категория: 'Ответственный',
                                    data: responsible.data.email
                                },
                            )
                        })
                    })
                } else {
                    this.rows = []
                    this.rows.push(
                        {
                            name: 'Номер объекта :',
                            Категория: 'Объект',
                            data: item.id_object
                        },
                        {
                            name: 'Имя объекта :',
                            Категория: 'Объект',
                            data: item.name_obj
                        },
                        {
                            name: 'Тип объекта :',
                            Категория: 'Объект',
                            data: Helper.typeObjectItems(item.type)
                        },
                        {
                            name: 'Адрес :',
                            Категория: 'Объект',
                            data: item.adress
                        },
                    )
                }
                this.showLeftBar = true
                this.closeLeftToolBar = true
                this.openInfoObject(item)
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
                        axios.get(`http://localhost:3000/line_objects_contract/${obj.id_contract}`).then(placement => {
                            coords.push({
                                id_line_object: obj.id_line_object,
                                name: obj.name,
                                id_contract: obj.id_contract,
                                position: Helper.translateCoordinatesArray(obj.coordinates.coordinates),
                                placement: placement.data.placement,
                                status: obj.status
                            })
                        })
                    })
                    this.lineMarkers.push(coords)
                })
            },
            getLineInfoClick(item) {
                this.infoWinOpen = false
                this.infoWinOpenClickCoords = false
                this.rows = []
                this.rows.push(
                    {
                        name: 'Номер линейного объекта :',
                        Категория: 'Объект',
                        data: item.id_line_object
                    },
                    {
                        name: 'Название линейного объекта :',
                        Категория: 'Объект',
                        data: item.name
                    },
                    {
                        name: 'Тип размещения :',
                        Категория: 'Объект',
                        data: Helper.typeDefinion(item.placement)
                    },
                    {
                        name: 'Статус работы :',
                        Категория: 'Объект',
                        data: Helper.typeObject(item.status)
                    }
                )
                const contract = new Promise(function (resolve) {
                    axios.get(`http://localhost:3000/line_objects_contract/${item.id_contract}`).then(contract => {
                        resolve(contract)
                    })
                })
                contract.then(contract => {
                    axios.get(`http://localhost:3000/line_objects_partner/${contract.data.id_partner}`).then(partner => {
                        this.rows.push(
                            {
                                name: 'Номер договора :',
                                Категория: 'Договор',
                                data: contract.data.id_contract
                            },
                            {
                                name: 'Дата заключения:',
                                Категория: 'Договор',
                                data: contract.data.data
                            },
                            {
                                name: 'Наименование контрагента :',
                                Категория: 'Договор',
                                data: partner.data.name
                            },
                            {
                                name: 'Ссылки по договору:',
                                Категория: 'Договор',
                                data: contract.data.links
                            },
                            {
                                name: 'Арендная плата :',
                                Категория: 'Договор',
                                data: contract.data.rent + " Руб."
                            }
                        )
                    })
                })
                contract.then(contract => {
                    axios.get(`http://localhost:3000/objects_line_responsible/${contract.data.responsible}`).then(responsible => {
                        this.rows.push(
                            {
                                name: 'ФИО :',
                                Категория: 'Ответственный',
                                data: responsible.data.fio
                            },
                            {
                                name: 'Номер телефона :',
                                Категория: 'Ответственный',
                                data: responsible.data.phone_number
                            },
                            {
                                name: 'Электронная почта',
                                Категория: 'Ответственный',
                                data: responsible.data.email
                            },
                        )
                    })
                })

                this.showLeftBar = true
                this.closeLeftToolBar = true
                this.openInfoObjectLine(item)
            },
            close() {
                this.showLeftBar = false
                this.closeLeftToolBar = false
                this.infoWinOpen = false
            },
            openInfoObject(item) {
                this.infoWindowPos.lat = item.coordinates.coordinates[0]
                this.infoWindowPos.lng = item.coordinates.coordinates[1]
                this.infoContent = `<div class="info__window-text"> ${Helper.typeObjectItems(item.type)} </div>
                            <div class="info__window-text"> ${item.name_obj}</div>
                            <div class="info__window-text"> ${item.adress}</div>`
                this.infoOptions = {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                    this.infoWinOpen = true
            },
            infoWinOpenClose() {
                this.showLeftBar = false
                this.closeLeftToolBar = false
                this.infoWinOpen = false
            },
            openInfoObjectLine(item) {
                let arrayItems = []
                let distanceSum = 0
                for (let i = 0; i < item.position.length - 1; i++) {
                    let loc1 = new google.maps.LatLng(item.position[i].lat, item.position[i].lng)
                    let loc2 = new google.maps.LatLng(item.position[i + 1].lat, item.position[i + 1].lng)
                    let distance = Helper.getDistancePoint(loc1, loc2)
                    arrayItems.push(distance)
                    distanceSum = arrayItems.reduce((total, amount) => total + amount)
                }
                this.infoWindowPos.lat = item.position[1].lat
                this.infoWindowPos.lng = item.position[1].lng
                this.infoContent = `
                            <div> ${Helper.typeDefinion(item.placement)}</div>
                            <div class="info__window-text"> ${item.name}</div>
                            <div class="info__window-text">${distanceSum.toFixed(2)} м.</div>
                                `
                this.infoOptions = {
                    pixelOffset: {
                        width: 0,
                        height: -3
                    }
                },
                    this.infoWinOpen = true
            }
            ,
        }
    }
</script>

<style lang="scss">

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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-450px);
        opacity: 0;
    }

    .close {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        height: 110px;
        width: 30px;
        position: fixed;
        cursor: pointer;
        top: 176px;
        left: 500px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }

    .gm-style-iw.gm-style-iw-c {
        padding: 12px !important;
        padding-bottom: 0px !important;
    }

    .info__window-text {
        font-size: 14px;
        padding-bottom: 5px;
    }

</style>