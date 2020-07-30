<template>
    <v-dialog v-model="getDialog" max-width="1000">
        <v-card>
            <v-card-title>說明手冊</v-card-title>
            <v-carousel
                v-model="value"
                height="600"
                max-height="600"
                cycle
                hide-delimiter-background
                show-arrows-on-hover
            >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                    <v-sheet :color="colors[i]" height="100%">
                        <v-row class="fill-height" align="center" justify="center">
                            <div class="display-3">{{ slide }} Slide</div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['dialog'],
    data() {
        return {
            mydialog: true,
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
            value: 0,
        }
    },
    mounted() {
        console.log('Descript manual Page run')
    },
    computed: {
        getDialog: {
            get: function () {
                return this.dialog
            },
            set: function (value) {
                this.$emit('getDialog', value)
                this.value = 0
            },
        },
    },
}
</script>

<style scoped>
.jf-title {
    font-size: 36px;
}
</style>
