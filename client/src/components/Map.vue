<template>
    <div class="map__wrapper">
        <gmap-map
                id="map"
                :options="optionsMap"
                :center="centerMap"
                :clickable="true"
        >
            <div class="marker">
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
            </div>
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
            <LeftToolbar
                    :rows="rows"
                    v-show="showLeftBar"
                    class="LeftToolbar"
            >
            </LeftToolbar>

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
  import LeftToolbar from '../components/LeftToolbar'
  import Helper from "../api/Helper";
  import Help from "./Help";

  export default {
    name: "Map",
    data() {
      return {
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
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
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
        showLeftBar: false
      }
    },
    components: {
      LeftToolbar,
      Help
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
        console.log(item)
        axios.get(`http://localhost:3000/objects/${item.id_obj_contract}`).then(response => {
          this.rows = []
          this.rows.push(
            {
              label: 'Номер объекта :',
              value: item.id_object
            },
            {
              label: 'Имя объекта :',
              value: item.name_obj
            },
            {
              label: 'Тип объекта :',
              value: Helper.typeObjectItems(item.type)
            },
            {
              label: 'Дата эксплуатации :',
              value: item.data_for_exploitation
            },
            {
              label: 'Адрес :',
              value: item.adress
            },
            {
              label: 'Сслыки на объект :',
              value: item.links
            },
            {
              label: 'Комментарии по объекту :',
              value: item.comments
            },
            {
              label: 'Номер контракта :',
              value: response.data.id_contract
            },
            {
              label: 'Дата заключения :',
              value: response.data.data
            },
            {
              label: 'Номер партнера :',
              value: response.data.id_partner
            },
            {
              label: 'Ссылки на контракт :',
              value: response.data.links
            },
            {
              label: 'Комментарии к контракту:',
              value: response.data.comments
            },
            {
              label: 'Оплата :',
              value: response.data.rent + " Руб."
            },
            {
              label: 'Тип размещения :',
              value: Helper.typeDefinion(response.data.placement)
            },
            {
              label: 'Ответственный',
              value: response.data.responsible
            },
            {
              label: 'Cтатус работы :',
              value: Helper.typeObject(item.status)
            },
          )
        })
        this.showLeftBar = true
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
        axios.get(`http://localhost:3000/objects/${item.id_line_object}`).then(response => {
          this.rows = []
          this.rows.push(
            {
              label: 'Номер линейного объекта :',
              value: item.id_line_object
            },
            {
              label: 'Название объекта :',
              value: item.name
            },
            {
              label: 'Номер контракта :',
              value: response.data.id_contract
            },
            {
              label: 'Дата :',
              value: response.data.data
            },
            {
              label: 'Номер партнера :',
              value: response.data.id_partner
            },
            {
              label: 'Ссылки :',
              value: response.data.links
            },
            {
              label: 'Комментарии к объекту :',
              value: response.data.comments
            },
            {
              label: 'Оплата :',
              value: response.data.rent + " Руб."
            },
            {
              label: 'Тип размещения :',
              value: Helper.typeDefinion(item.placement)
            },
            {
              label: 'Статус работы :',
              value: Helper.typeObject(item.status)
            },
            {
              label: 'Комментарии :',
              value: response.data.comments
            }
          )
        })
        this.showLeftBar = true
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-450px);
        opacity: 0;
    }
</style>