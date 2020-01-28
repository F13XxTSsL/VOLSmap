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
  // typeDefinionColor (type) {
  //   if (type === 'indoor') {
  //     return {strokeColor:'#388E3C'}
  //   }
  //   if (type === 'sewage') {
  //     return type = 'В канализации'
  //   }
  //   if (type === 'prop') {
  //     return type = 'На опорах'
  //   }
  //   if (type === 'roof') {
  //     return type = 'По земле'
  //   }
  // }
}