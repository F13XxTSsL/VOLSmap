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
  }
}