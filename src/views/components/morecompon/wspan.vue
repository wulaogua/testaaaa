<template>
  <span v-if="val.label && isshow"
    >{{ val.label }}{{ val.unit ? val.unit : "" }}</span
  >
  <span v-else>{{resdata.data}}{{val.unit?val.unit:''}}</span>
</template>

<script>
import { allrequest } from "@/request/request.js";
import tools from "../echartsOptions/tools.js";
export default {
  props: ["val"],
  data() {
    return {
      isshow: true,
      resdata:{}
    };
  },
  mounted() {
    this.$bus.on(this.val.id, (data) => {
      if (typeof data == "object") {
        console.warn(data);
        this.authdata = data;
        this.refresh(this.val.axiosdata, this.authdata);
      }
      if (data == "reload") {
        this.refresh(this.val.axiosdata, this.authdata);
      }
      if (data == "show") {
        this.isshow = true;
      }
      if (data == "hidden") {
        this.isshow = false;
      }
    });
  },
  computed: {
    requestData() {
      const { val } = this;
      return val;
    },
  },
  watch: {
    requestData: {
      handler(n, o) {
        if (!/-load/g.test(n.id)) {
          if (
            JSON.stringify(n.axiosdata.req) != JSON.stringify(o.axiosdata.req)
          ) {
            this.refresh(n.axiosdata, this.authdata);
          }
        } else {
          this.refresh(this.val.axiosdata, this.authdata);
        }
      },
      deep: true,
    },
  },
  methods: {
    refresh(req, authreq = {}) {
        console.warn(req);
      let reqdata = tools.objFor(authreq, req.req);
      let data = {
        options: {
          url: req.url,
          method: req.method,
        },
        data: reqdata,
      };
      allrequest(data).then((res) => {
        this.resdata= res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>