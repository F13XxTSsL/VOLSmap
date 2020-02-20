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
  rad (x) {
    return x * Math.PI / 180;
  },
  getDistancePoint (p1, p2) {
      const R = 6378137; // Earth’s mean radius in meter
      const dLat = this.rad(p2.lat() - p1.lat());
      const dLong = this.rad(p2.lng() - p1.lng());
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d; // returns the distance in meter
  }
}