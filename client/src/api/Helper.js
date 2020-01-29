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
  }
}