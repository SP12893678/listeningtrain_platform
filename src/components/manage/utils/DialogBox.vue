<template>
  <v-dialog
    v-model="$store.state.dialogBox.dialog"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title>{{ dialog.title }}</v-card-title>
      <v-card-text>{{ dialog.text }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :color="dialog.cancelBtn.color"
          text
          @click="cancelButtonEvent"
        >
          <v-icon
            v-if="dialog.cancelBtn.icon"
            left
          >
            {{ dialog.cancelBtn.icon }}
          </v-icon>{{ dialog.cancelBtn.text }}
        </v-btn>
        <v-btn
          text
          :color="dialog.confirmBtn.color"
          @click="confirmButtonEvent"
        >
          <v-icon
            v-if="dialog.confirmBtn.icon"
            left
          >
            {{ dialog.confirmBtn.icon }}
          </v-icon>{{ dialog.confirmBtn.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialog: {
                title: '標題',
                text: '敘述',
                confirmBtn: {
                    color: 'blue',
                    icon: null,
                    text: '確定',
                    show: true,
                    event: () => {}
                },
                cancelBtn: {
                    color: 'red',
                    icon: null,
                    text: '取消',
                    show: false,
                    event: () => {}
                }
            }
        }
    },
    updated () {
        const option = this.$store.state.dialogBox.option
        Object.assign(this.dialog, option)
    },
    methods: {
        confirmButtonEvent () {
            this.dialog.confirmBtn.event()
            this.$store.commit('dialogBox', { dialog: false })
        },
        cancelButtonEvent () {
            this.dialog.cancelBtn.event()
            this.$store.commit('dialogBox', { dialog: false })
        }
    }
}
</script>

<style>

</style>
