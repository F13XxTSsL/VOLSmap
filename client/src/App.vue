<template>
  <v-app id="app">
    <Menu></Menu>
    <router-view></router-view>
  </v-app>
</template>
<script>

  import Menu from './components/Menu'


  export default {
    name: 'App',
    components: {
      Menu
    },
    data: () => ({}),
  };
</script>
<style lang="scss">
  .margin__top {
    margin-top: 100px;
  }

  .v-application {
    font-family: 'Montserrat', sans-serif !important;
  }

  body {
    overflow: hidden;

    &::-webkit-scrollbar {
      display: none
    }
  }

  .loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer-table {
    font-size: 0.875rem;
    height: 48px;
    padding: 16px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
    display: flex;
    justify-content: space-between;
    max-width: 830px;
    border-radius: 0px 0px 5px 5px;
  }

  .v-application--is-ltr .v-data-table th {
    white-space: nowrap;
  }

  thead {
    tr {
      background: rgba(73, 138, 184, 0.8);

      th {
        span {
          color: #fff;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background: rgba(77, 77, 77, 0.1);
      }
    }
  }

  .v-dialog__content {

    .map__wrapper {
      position: absolute;
      overflow: auto;
      left: 170px;
      max-width: 500px;
      height: 668px;
      border-radius: 4px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

      .help__wrapper {
        display: none;
      }

      .title_volsmap {
        display: none;
      }

      .close {
        display: none;
      }

      .theme--dark.v-data-table {
        display: none;

        .leftTableStatic {
          display: none;
        }
      }
    }
  }
  @media (max-width: 1880px) {
    .container {
      margin: 0px 0px!important;
      max-width: inherit!important;
    }
  }
  @media (max-width: 1070px) {
    .v-sheet {
      .v-toolbar__content {
        .v-btn {
          display: none;
        }
      }
    }

    .action_cell {
      display: none;
    }
  }
</style>
