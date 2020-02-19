export default {
  typeDefinion (type) {
    if (type === 'indoor') {
      return type = 'В помещении'
    }
    if (type === 'sewage') {
      return type = 'В канализации'
    }
    if (type === 'prop') {
      return type = 'На опорах'
    }
    if (type === 'roof') {
      return type = 'По земле'
    }
  },
  typeObject (type) {
    if (type === 'active') {
      return type = 'Активна'
    }
    if (type === 'construction') {
      return type = 'Строительство'
    }
    if (type === 'error') {
      return type = 'Отключена'
    }
  },
  typeObjectItems (type) {
    if (type === 'BTS') {
      return type = 'Базовая станция'
    }
    if (type === 'Switch') {
      return type = 'Коммутатор'
    }
    if (type === 'Controller') {
      return type = 'Контроллер'
    }
    if (type === 'Coupling') {
      return type = 'Муфта'
    }
  },
  disclosureCoordinates (coordinates) {
    return  coordinates.coordinates
  },
  calcDistance (p1, p2) {
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
  },
  formulaCalcDistnace (lat1,lon1,lat2,lon2) {
    let R = 6371; //Радиус земли в км
    let dLat = this.deg2rad(lat2-lat1);
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  },
  deg2rad (deg) {
    return deg * (Math.PI/180)
  },
  distanceCalc (coordinates) {
    console.log(coordinates)

  }
}