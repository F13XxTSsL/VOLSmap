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
                    @click="getPointInfo(item)"
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
                        @click="getLineInfo(item)"
                >
                </gmap-polyline>
            </div>
        </gmap-map>
        <LeftToolbar/>
        <h1 class="title_volsmap">VOLSmap</h1>
        <Help/>
    </div>
</template>

<script>
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps';
  import LeftToolbar from '../components/LeftToolbar'
  import Help from "./Help";

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
        path: [
          {lat: 45.040038, lng: 38.92336},
          {lat: 45.040965, lng: 38.927546},
          {lat: 45.054704, lng: 38.933711}
        ],
        objLine: {
          coordinates: []
        }
      }
        ;
    },
    components: {
      Help,
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
            coords.push({id: obj.id_line_object, name: obj.name, position: obj.coordinates.coordinates})
          })
          coords.map(arr => {
            let coords2 = [{id: arr.id, name: arr.name, position: []}]
            arr.position.map(item => {
              for (let i in coords2) {
                coords2[i].position.push({lat: item[0], lng: item[1]})
              }
            })
            this.lineMarkers.push(coords2)
          })

        })
      },
      getLineInfo(item) {
        console.log(item)
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
