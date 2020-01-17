<template>
    <gmap-map
            v-bind="options"
            id="map"
            @click="myclick"
    >
        <gmap-marker
                :key="index"
                v-for="(item, index) in markers"
                :position="getPosition(item)"
                :clickabke="true"
                @click:="toggleInfo(item, key)"
                :icon="markerOption"
        >
        </gmap-marker>
    </gmap-map>
</template>

<script>
  import axios from 'axios'
  import {gmapApi} from 'vue2-google-maps';

  export default {
    name: "GoogleMap",
    data() {
      return {
        options: {
          zoom: 14,
          center: {
            lat: 45.055399,
            lng: 38.967545
          },
          mapTypeId: 'terrain'
        },
        markerOption: {
          url: '../../../assets/pin.png'
        },
        markers: [{
          lat: 0,
          lng: 0
        }]
      };
    },
    computed: {
      google: gmapApi
    },
    mounted() {
      this.getObjects()
    },
    methods: {
      myclick() {
        console.log(1)
      },
      getObjects() {
        axios.get('http://localhost:3000/home').then(response => {
          this.initialize(response.data)
        })
      },
      initialize(data) {
        let coordinatesObj = {}
        data.forEach(item => {
          coordinatesObj = item.coordinates
        })
        for (let i in this.markers) {
          this.markers[i].lat = coordinatesObj.coordinates[0]
          this.markers[i].lng = coordinatesObj.coordinates[1]
        }
      },
      getPosition() {
      },
      toggleInfo() {
      }
    }
  }
</script>

<style lang="scss" scoped>

    #map {
        height: 945px;
        max-height: 100%;
        width: 100%;
        margin: 0 auto;
    }
</style>
