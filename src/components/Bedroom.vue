<template>
  <div
  class="container" id="hero" :class="[isOff ? 'hero-image' : 'hero-image-off' ]"
  >
    <div class="leds">
      <img src="../assets/off.png" alt="" class="led" v-if="leds.on == 0" />
      <img src="../assets/on.png" alt="" class="led" v-if="leds.on == 1" />
      <p-check
        class="p-icon p-fill p-tada"
        v-model="leds.on"
        :true-value="1"
        :false-value="0"
        @change="ledOn"
        color="warning"
      >
        <i slot="extra"  class="fas fa-power-off"></i>
      </p-check>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      leds: {
        on: "0",
        id: "bedroom",
      },
      isOff: false
    };
  },
  methods: {
    ledOn() {
      this.$socket.client.emit("ledOn", this.leds);
      if (this.isOff) {
          this.isOff = false;
          this.flash("The bedroom led is off", "warning", {
          timeout: 3000,
        });
      } else {
          this.isOff = true;
          this.flash("The bedroom led is on", "success", {
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>

.hero-image {
  background-image: url("../assets/wall.jpg");
  margin: 0;
  height: 90vh;
}

.hero-image-off {
  background-image: url("../assets/wall-off.jpg");
  margin: 0;
  height: 90vh;
}

.led {
    width: 250px;
    padding-left: 170px;
    float: left;
    z-index: 999;
    margin-left: 170px;
    margin-top: 100px;
}

.leds {
    width: 100%;
    float: left;
}
</style>