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
    if (type === 'error') {
      return type = 'Отключена'
    }
  },
  typeObjectItems (type) {
    if (type === 'BS') {
      return type = 'Базовая станция'
    }
    if (type === 'Eq') {
      return type = 'Другой объект'
    }
  },
  disclosureCoordinates (coordinates) {
    return  coordinates.coordinates
  }
}