<template>
  <div
    class="container"
    id="hero"
    :class="[isOff ? 'hero-restroom' : 'hero-restroom-off']"
  >
    <div class="leds2">
      <img
        src="../assets/rest-off.png"
        alt=""
        class="led2"
        v-if="led.on == 0"
      />
      <img src="../assets/rest-on.png" alt="" class="led2" v-if="led.on == 1" />
    </div>
    <div class="leds">
      <img src="../assets/rest-off.png" alt="" class="led" v-if="led.on == 0" />
      <img src="../assets/rest-on.png" alt="" class="led" v-if="led.on == 1" />
      <p-check
        class="p-icon p-fill p-tada"
        v-model="led.on"
        :true-value="1"
        :false-value="0"
        @change="ledOn"
        color="warning"
      >
        <i slot="extra" class="fas fa-power-off"></i>
      </p-check>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      led: {
        on: "0",
        id: "bathroom",
      },
      isOff: false,
    };
  },
  methods: {
    ledOn() {
      this.$socket.client.emit("bathLedOn", this.led);
      if (this.isOff) {
        this.isOff = false;
        this.flash("The bathroom led is off", "warning", {
          timeout: 3000,
        });
      } else {
        this.isOff = true;
        this.flash("The bathroom led is on", "success", {
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<style sce>
.hero-restroom {
  background-image: url("../assets/restroom-on.png");
  margin: 0;
  height: 90vh;
  background-repeat: no-repeat;
}

.hero-restroom-off {
  background-image: url("../assets/restroom-off.png");
  margin: 0;
  height: 90vh;
  background-repeat: no-repeat;
}

.led {
  width: 250px;
  padding-left: 170px;
  float: left;
  z-index: 999;
  margin-left: 170px;
}

.leds {
  width: 100%;
  float: left;
}

.led2 {
  width: 80px;
  float: left;
  margin-left: 83px;
}

.leds2 {
  width: 100%;
  float: left;
}
</style>