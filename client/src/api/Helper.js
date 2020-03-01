export default {
  typeDefinion(type) {
    if (type === 'indoor') {
      return type = 'Кровля'
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
  revertTypeDefinion(type) {
    if (type === 'Кровля') {
      return type = 'indoor'
    }
    if (type === 'В канализации') {
      return type = 'sewage'
    }
    if (type === 'На опорах') {
      return type = 'prop'
    }
    if (type === 'По земле') {
      return type = 'roof'
    }
  },
  typeObject(type) {
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
  revertTypeObject(type) {
    if (type === 'Активна') {
      return type = 'active'
    }
    if (type === 'Строительство') {
      return type = 'construction'
    }
    if (type === 'Отключена') {
      return type = 'error'
    }
  },
  typeObjectItems(type) {
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
  revertTypeObjectItems(type) {
    if (type === 'Базовая станция') {
      return type = 'BTS'
    }
    if (type === 'Коммутатор') {
      return type = 'Switch'
    }
    if (type === 'Контроллер') {
      return type = 'Controller'
    }
    if (type === 'Муфта') {
      return type = 'Coupling'
    }
  },
  statusProfile(status) {
    if (status === 'admin') {
      return status = 'Администратор'
    }
    if (status === 'operator') {
      return status = 'Оператор'
    }
  },
  revertStatusProfile(status) {
    if (status === 'Администратор') {
      return status = 'admin'
    }
    if (status === 'Оператор') {
      return status = 'operator'
    }
  },
  disclosureCoordinates(coordinates) {
    return coordinates.coordinates
  },
  getDistancePoint(p1, p2) {
    const R = 6378137;
    const dLat = this.rad(p2.lat() - p1.lat());
    const dLong = this.rad(p2.lng() - p1.lng());
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  },
  rad(x) {
    return x * Math.PI / 180;
  },
  getDistancePointTable(lat1, lon1, lat2, lon2) {
    let R = 6378137; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  },
  deg2rad(deg) {
    return deg * Math.PI / 180;
  },
  translateCoordinatesArray(array) {
    let coords = []
    array.forEach(item => {
      coords.push({lat: item[0], lng: item[1]})
    })
    return coords
  },
  translateCoordinates(data) {
    let arrCoordLatLng = []
    data.forEach(item => [
      arrCoordLatLng.push({lat: item[0], lng: item[1]})
    ])
    let sumCoordLatLng = 0
    let newArrCoordLatLng = []
    for (let i = 0; i < arrCoordLatLng.length - 1; i++) {
      newArrCoordLatLng.push(this.getDistancePointTable(arrCoordLatLng[i].lat, arrCoordLatLng[i].lng, arrCoordLatLng[i+1].lat, arrCoordLatLng[i+1].lng))
      sumCoordLatLng = newArrCoordLatLng.reduce((total, amount) => total + amount)
    }
   return sumCoordLatLng
  },
  iconType(status, type) {
    if (type === 'BTS' && status === 'active') {
      return {
        url: require('../assets/bs_active.svg'),
        size: {width: 40, height: 40, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}
      }
    }
    if (type === 'BTS' && status === 'construction') {
      return {
        url: require('../assets/bs_construction.svg'),
        size: {width: 40, height: 40, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}
      }
    }
    if (type === 'BTS' && status === 'error') {
      return {
        url: require('../assets/bs_error.svg'),
        size: {width: 40, height: 40, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}
      }
    }
    if (type === 'Switch') {
      return {
        url: require('../assets/commutator.svg'),
        size: {width: 40, height: 40, f: 'px', b: 'px'},
        scaledSize: {width: 40, height: 40, f: 'px', b: 'px',}
      }
    }
    if (type === 'Controller') {
      return {
        url: require('../assets/controller.svg'),
        size: {width: 35, height: 35, f: 'px', b: 'px'},
        scaledSize: {width: 35, height: 35, f: 'px', b: 'px',}
      }
    }
    if (type === 'Coupling') {
      return {
        url: require('../assets/mufta.svg'),
        size: {width: 15, height: 15, f: 'px', b: 'px'},
        scaledSize: {width: 15, height: 15, f: 'px', b: 'px',}
      }
    }
  }
}