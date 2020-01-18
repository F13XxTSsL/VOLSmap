<template class="home">
    <div class="home__wrapper">
        <Map/>
    </div>

</template>

<script>
  import Map from "../components/Map";

export default {
  name: 'Home',
  components: {
      Map
  }
}
</script>
<style>
    .home {
        overflow: hidden;
    }
</style>
