<template>
    <div class="help__wrapper">
        <div class="helper_description">
            <v-btn
                    class="ma-2 btn__question"
                    dark
                    @click="hidden = !hidden"
            >
                <v-icon dark>fas fa-question-circle</v-icon>
            </v-btn>
            <transition name="slide-fade">
            <div class="description" v-show="hidden">
                <div class="text description__title">Способы прокладки кабеля :</div>
                <div class="type indoor">
                    <div class="line indoor__line"></div>
                    <div class="text indoor__text"> - Кровля</div>
                </div>
                <div class="type prop">
                    <div class="line prop__line"></div>
                    <div class="text prop__text"> - Опоры</div>
                </div>
                <div class="type sewage">
                    <div class="line sewage__line"></div>
                    <div class="text sewage__text"> - Канализация</div>
                </div>
                <div class="type roof">
                    <div class="line roof__line"></div>
                    <div class="text roof__text"> - Земля</div>
                </div>
                <div class="text description__title">Объекты :</div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/bs_active.svg"></div>
                    <div class="text bs__text"> - Базовая станция (активна) </div>
                </div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/bs_construction.svg"></div>
                    <div class="text bs__text"> - Базовая станция (строительство)</div>
                </div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/bs_error.svg"></div>
                    <div class="text bs__text"> - Базовая станция (отключена)</div>
                </div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/commutator.svg"></div>
                    <div class="text bs__text"> - Коммутатор</div>
                </div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/controller.svg"></div>
                    <div class="text bs__text"> - Контроллер</div>
                </div>
                <div class="type bs">
                    <div class="object bs__object"><img src="../assets/mufta.svg"></div>
                    <div class="text bs__text"> - Муфта</div>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Help",
    data: () => ({
      hidden: false,
    }),
  }
</script>

<style lang="scss" scoped>
    .help__wrapper {
        position: absolute;
        top: 100px;
        right: 20px;
        .bs__text {
            margin-left: 5px;
        }
    }
    .btn__question {
        opacity: 0.7;
        z-index: 100;
    }
    .helper_description .description {
        width: 380px;
        background-color: rgba(0,0,0,0.6);
        position: absolute;
        top: 50px;
        right: 8px;
        padding: 20px 20px 20px;
        border-radius: 4px;
    }
    .description__title {
        margin-bottom: 10px;
    }
    .indoor__line {
        background-color: #388E3C;
    }
    .prop__line {
        background-color: #FF9100;
    }
    .sewage__line {
        background-color: #00ACC1;
    }
    .roof__line {
        background-color: #A1887F;
    }
    .object img {
        width: 40px;
    }
    .line {
        width: 70px;
        height: 5px;
        margin-right: 5px;
    }
    .type {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .type:last-child {
        margin-bottom: 0px;
    }
    .text {
        color: #fff;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(450px);
        opacity: 0;
    }

</style>