<template>
  <div class="map__wrapper">
    <gmap-map
      id="map"
      :options="optionsMap"
      :center="centerMap"
      :clickable="true"
    >
      <gmap-marker
        :key="item.id_object"
        v-for="item in markers"
        :position="{lat:item.coordinates.coordinates[0], lng:item.coordinates.coordinates[1]}"
        :clickable="true"
        @click="getPointInfoClick(item)"
        :icon="item.status === 'error' ?
          {url: require('../assets/bs_error.png'),
           size: {width: 40, height: 40, f: 'px', b: 'px'},
           scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}}
          :
          item.status === 'construction' ?
            {url: require('../assets/bs_construction.png'),
             size: {width: 40, height: 40, f: 'px', b: 'px'},
             scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}}
            :
            {url: require('../assets/bs.png'),
             size: {width: 40, height: 40, f: 'px', b: 'px'},
             scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}}"
        :animation="4"
      />

      <gmap-info-window
        class="info__window"
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpenClose"
      >
        <div v-html="infoContent" />
      </gmap-info-window>

      <div
        :key="index[items]"
        v-for="(items, index) in lineMarkers"
      >
        <gmap-polyline
          :key="item.id"
          v-for="item in items"
          :path.sync="item.position"
          :options="item.placement === 'sewage' ? {strokeColor: '#42A5F5', strokeWeight: 4} :
            item.placement === 'prop' ? {strokeColor: '#FFD600', strokeWeight: 4} :
            item.placement === 'roof' ? {strokeColor: '#8D6E63', strokeWeight: 4} :
            {strokeColor: '#388E3C', strokeWeight: 4}"
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
    <Help />
  </div>
</template>

<script>
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps';
  import Helper from "../api/Helper";
  import Help from "./Help";
  import LeftStatisticTable from "./Tables/LeftStatisticTable";

  export default {
    name: "Map",
    data() {
      return {
        loading: false,
        optionsMap: {
          zoom: 14,
          mapTypeId: 'terrain',
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false,
          styles: [
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        },
        centerMap: {
          lat: 45.055399,
          lng: 38.967545
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
        infoContent: '',
        infoWindowPos: {
          lat: 45.055399,
          lng: 38.967545
        },
        infoOptions: {},
        distance: 0.0
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
            name: 'Дата эксплуатации :',
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
        axios.get(`http://localhost:3000/objects/${item.id_obj_contract}`).then(response => {
          this.rows.push(
            {
              name: 'Номер договора :',
              Категория: 'Договор',
              data: response.data.id_contract
            },
            {
              name: 'Дата заключения :',
              Категория: 'Договор',
              data: response.data.data
            },
            {
              name: 'Номер партнера :',
              Категория: 'Договор',
              data: response.data.id_partner
            },
            {
              name: 'Ссылки на контракт :',
              Категория: 'Договор',
              data: response.data.links
            },
            {
              name: 'Арендная плата :',
              Категория: 'Договор',
              data: response.data.rent + " Руб."
            },
            {
              name: 'Тип размещения :',
              Категория: 'Договор',
              data: Helper.typeDefinion(response.data.placement)
            },
          )
          axios.get(`http://localhost:3000/objects_responsible/${response.data.responsible}`).then(response => {
            this.rows.push(
              {
                name: 'ФИО :',
                Категория: 'Ответственный',
                data: response.data.fio
              },
              {
                name: 'Номер телефона :',
                Категория: 'Ответственный',
                data: response.data.phone_number
              },
              {
                name: 'Электронная почта',
                Категория: 'Ответственный',
                data: response.data.email
              },
            )
          })
        })
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
            coords.push({
              id_line_object: obj.id_line_object,
              name: obj.name,
              id_contract: obj.id_contract,
              position: obj.coordinates.coordinates,
              placement: obj.placement,
              status: obj.status
            })
          })
          coords.map(arr => {
            let coords2 = [{
              id_line_object: arr.id_line_object,
              name: arr.name,
              id_contract: arr.id_contract,
              placement: arr.placement,
              status: arr.status,
              position: []
            }]
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
        this.infoWinOpen = false
        this.rows = []
        this.rows.push(
          {
            name: 'Номер линейного объекта :',
            Категория: 'Объект',
            data: item.id_line_object
          },
          {
            name: 'Название объекта :',
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
          },
          {
            name: 'Количество метров :',
            Категория: 'Объект',
            data: this.distance.toFixed(2) + ' км.'
          }
        )
        axios.get(`http://localhost:3000/objects/${item.id_line_object}`).then(response => {
          this.rows.push(
            {
              name: 'Номер контракта :',
              Категория: 'Договор',
              data: response.data.id_contract
            },
            {
              name: 'Дата заключения:',
              Категория: 'Договор',
              data: response.data.data
            },
            {
              name: 'Номер партнера :',
              Категория: 'Договор',
              data: response.data.id_partner
            },
            {
              name: 'Ссылки по договору:',
              Категория: 'Договор',
              data: response.data.links
            },
            {
              name: 'Арендная оплата :',
              Категория: 'Договор',
              data: response.data.rent + " Руб."
            }
          )
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
        // 569.48 м. + 902.77 м. = 1 472,25 м.
        //876.04 м. + 1013.07 м. + 320.85 м. = 2 209,96‬ м.
        let arrayItems= []
        let distanceSum = 0
        for (let i = 0; i < item.position.length - 1; i++) {
          let loc1 = new google.maps.LatLng(item.position[i].lat, item.position[i].lng)
          let loc2 = new google.maps.LatLng(item.position[i+1].lat, item.position[i+1].lng)
          let distance = Helper.getDistancePoint(loc1, loc2)
          arrayItems.push(distance)
          distanceSum = arrayItems.reduce((total, amount) => total + amount)
        }
        this.infoWindowPos.lat = item.position[0].lat
        this.infoWindowPos.lng = item.position[0].lng
        this.infoContent = `
                            <div> ${Helper.typeDefinion(item.placement)}</div>
                            <div class="info__window-text"> ${item.name}</div>
                            <div class="info__window-text">${distanceSum.toFixed(0)} м.</div>
                                `
        this.infoOptions = {
          pixelOffset: {
            width: 0,
            height: -3
          }
        },
          this.infoWinOpen = true
      },
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