<template class="home">
    <div>
        <google-map/>
    </div>

</template>

<script>
  import GoogleMap from "../components/GoogleMap";

export default {
  name: 'Home',
  components: {
    GoogleMap
  }
}
</script>
<style>
    .home {
        overflow: hidden;
    }
</style>
