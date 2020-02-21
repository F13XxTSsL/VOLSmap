export default {
  typeDefinion(type) {
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
  disclosureCoordinates(coordinates) {
    return coordinates.coordinates
  },
  getDistancePoint(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(p2.lat() - p1.lat());
    const dLong = this.rad(p2.lng() - p1.lng());
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
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
  }
}