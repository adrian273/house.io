<template>
  <div class="container-fluid">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/" active-class="active"
          >Go to the Bedroom <i class="fas fa-bed"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/bathroom"
          class="nav-link"
          exact-active-class="exact-active"
          >Go to the Bathroom <i class="fas fa-toilet"></i
        ></router-link>
      </li>
    </ul>
    <div class="temperature" style="display: block">
      <b>Celcius: {{ temperature[0].celsius }}° </b> <br />
      <b>Fahrenheit: {{ temperature[0].fahrenheit }}° </b> <br />
      <b>kelvin: {{ temperature[0].kelvin }}° </b> <br />
      <img src="../assets/termo.gif" alt="" />
      <flash-message
        transitionIn="animate__animated animate__backInRight"
      ></flash-message>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      temperature: [{ celsius: "0", fahrenheit: "0", kelvin: "0" }],
    };
  },
  mounted() {
    this.$socket.$subscribe("user-connected", (data) => {
      console.log(data);
      this.temperature = [];
      this.temperature.push(data);
    });
    // -------------------------------------------------------------------
    // BedRoom
    this.$socket.$subscribe("openBedroomDoor", (data) => {
      this.flash("The bedroom door is open", "success", {
        timeout: 3000,
      });
      this.$router.push("/");
      this.$socket.client.emit("bathLedOn", { on: 0, id: "bathroom" });
      this.flash("The bathroom led is off", "warning", {
        timeout: 3000,
      });
    });
    this.$socket.$subscribe("closeBedroomDoor", (data) => {
      this.flash("The bedroom door is closed", "warning", {
        timeout: 3000,
      });
    });
    // -------------------------------------------------------------------
    // BathRoom
    this.$socket.$subscribe("openBathroomDoor", (data) => {
      this.flash("The bathroom door is open", "success", {
        timeout: 3000,
      });
      this.$socket.client.emit("ledOn", { on: 0, id: "bedroom" });
      this.flash("The bedroom led is off", "warning", {
        timeout: 3000,
      });
      this.$router.push("/bathroom");
    });

    this.$socket.$subscribe("closeBathroomDoor", (data) => {
      this.flash("The bathroom door is closed", "warning", {
        timeout: 3000,
      });
      this.$router.push("/");
    });
  },
};
</script>

<style>
.temperature {
  float: right;
  z-index: 11;
  padding-top: 0px;
  padding-right: 90px;
  color: gold;
}

.temperature img {
  width: 150px;
  padding-top: 10px;
}
</style>