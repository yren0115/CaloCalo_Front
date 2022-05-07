<template>
  <v-container>
      <v-row lg="12">
          <v-col cols="12" class="left-col">
            <div class="upper-container">
              <v-label><h1 class="left-title">個人設定ページ</h1></v-label>
            </div>
          </v-col>
      </v-row>
      <v-row lg="10" justify="center">
          <v-col cols="10">
            <div class="lower-container">
              <v-label><h2 class="lower-title">目標カロリーを入力してください</h2></v-label>
              <v-form ref="form">
                <v-textarea solo height="200px" name="input-7-4" label="目標カロリーを入力" v-model="user.goalCalorie">
                </v-textarea>
                <div class="btn-container">
                  <v-btn class="mr-4" v-on:click="submitGoalCalo(); clear()">SUBMIT</v-btn>
                </div>
              </v-form>
            </div>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>

export default ({
  name: 'UserSet',
  components: {
  },
  data: ()=> ({
    drawer: null,
    user: {},
    menuflag: 0,
  }),
   computed: {
    getintakeCalorie: function() {
      return this.$store.state.intakeCalorie;
    },
    getoalCalorie: function() {
      return this.$store.state.goalCalorie;
    },
  },
  methods: {
    submit() {
      this.$store.dispatch("setcalo", {
        intakeCalorie: this.user.intakeCalorie,
      });
    },
    submitGoalCalo() {
      this.$store.dispatch("setgoalcalo", {
        goalCalorie: this.user.goalCalorie,
      });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
});
</script>

<style scoped>
.upper-container {
  margin-top: 50px;
}
.lower-container {
  color: black;
  text-align: center;
  margin: 0 auto;
  margin: 100px 0 50px;
}
.lower-title {
  color: black;
  margin-bottom: 50px;
}
.date-disp {
  line-height: 50px;
  text-align: center;
}
.upper-left-title {
  color: black;
  text-align: center;
  padding: 50px 0;
}



.set-title {
  margin-top: 100px;
}
.reset-css {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.top-title {
  color: white;
  text-align: center;
  font-size: 30px;
  padding: 10px 0 60px 0;
}
.logout-btn {
  color: white;
  font-size: 20px;
}
.vertical-spacer {
  padding-bottom: 60px;
}
.menu-btn {
  margin: 0 auto;
}
.left-title {
  color: black;
  text-align: center;
  padding: 100px 0 50px;
}
.left-title-sub {
  color: black;
  text-align: center;
  padding: 50px 0;
}
.form-container {
  height: 90vh;
  width: 100%;
}
.btn-container {
  margin: 0 auto;
}
.output-container {
  height: 90vh;
  width: 100%;
}
.right-title {
  color: black;
  text-align: center;
  padding: 100px 0 50px;
}
.right-title-sub {
  color: black;
  text-align: center;
  padding: 115px 0 50px;
}
.goal-cal-disp {
  text-align: center;
  line-height: 150px;
}
.footer-layout {
  width: 100%;
  text-align: center;
}
</style>