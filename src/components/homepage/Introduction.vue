<template>
    <v-container class="ma-0 pa-0" fluid fill-height>
        <v-carousel
            ref="carousel"
            id="carousel"
            v-model="getValue"
            class="ma-0 pa-0"
            height="100%"
            vertical
            vertical-delimiters
            hide-delimiter-background
        >
            <v-carousel-item>
                <v-sheet :color="colors[0]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2"
                                >情境式環境音訓練平台首頁</v-card-text
                            >
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[1]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">平台簡介</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[2]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">遊戲系統</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[3]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">模式介紹</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
            <v-carousel-item>
                <v-sheet :color="colors[4]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-card
                            class="text-center"
                            light
                            color="#FF000000"
                            width="800"
                        >
                            <v-card-text class="text-h2">幫助我們</v-card-text>
                        </v-card>
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script>
export default {
    props: ["value"],
    data() {
        return {
            colors: [
                "indigo",
                "warning",
                "pink darken-2",
                "red lighten-1",
                "deep-purple accent-4",
            ],

            slides: [
                "index1",
                "Introduction1",
                "Introduction2",
                "Introduction3",
                "help",
            ],
            scrollable: true,
        };
    },
    mounted() {
        document.querySelector(".v-carousel__controls").style.right = 0;
        this.setCarouselEvent();
    },
    computed: {
        getValue: {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.$emit("getValue", value);
                // this.value = 0;
            },
        },
    },
    methods: {
        setCarouselEvent() {
            var app = this;
            window.addEventListener("wheel", function (event) {
                console.log(app.scrollable);
                if (!app.scrollable) return;
                let offset = event.deltaY < 0 ? -1 : 1;
                let slides_length = app.$refs["carousel"].$slots.default.length;
                app.scrollable = false;
                let value =
                    app.getValue + offset < slides_length &&
                    app.getValue + offset >= 0
                        ? app.getValue + offset
                        : app.getValue;
                app.getValue = value;
                if (
                    !(
                        app.getValue + offset < slides_length &&
                        app.getValue + offset >= 0
                    )
                ) {
                    app.scrollable = true;
                }

                console.log("wheel end", app.scrollable);
                this.setTimeout(() => (app.scrollable = true), 1000);
            });
            const transition = document.querySelector("#carousel");
            transition.addEventListener("transitionend", (e) => {
                console.log("transitionend", app.scrollable);
                if (e.propertyName.indexOf("transform") != -1)
                    app.scrollable = true;
                console.log("transitionend2", app.scrollable);
            });
        },
    },
};
</script>

<style scoped>
.v-window-x-transition-enter-active,
.v-window-x-transition-leave-active,
.v-window-x-reverse-transition-enter-active,
.v-window-x-reverse-transition-leave-active,
.v-window-y-transition-enter-active,
.v-window-y-transition-leave-active,
.v-window-y-reverse-transition-enter-active,
.v-window-y-reverse-transition-leave-active {
    transition: all 1000ms ease 0s;
}
</style>