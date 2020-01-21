<template>
    <div class="wrapper__toolbar grey darken-3">
        <div>
            <v-simple-table dark
                    :dense="dense"
                    :fixed-header="fixedHeader"
                    :height="height"
            >
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Наименование</th>
                        <th class="text-left">Данные</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
  export default {
    data: () => ({
      dense: false,
      fixedHeader: false,
      height: 930,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }),
  }
</script>

<style scoped>
    .wrapper__toolbar {
        width: 400px;
        height: 100vh;
        z-index: 100;
        opacity: 0.9;
        position: absolute;
        bottom: 0;
        top: 80px;
    }
</style>