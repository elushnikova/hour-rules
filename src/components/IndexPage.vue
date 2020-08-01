<template>
  <table v-if="actions.length && groupedByHour.length" class="c-table">
    <caption class="c-table__caption">
      <h1 class="c-title">
        <img
          src="../assets/images/hourglass.svg"
          alt="Hour rules logo"
          width="60"
          height="60"
          class="c-title__image"
        />
        <span class="c-title__text">
          What you can do this hour
        </span>
      </h1>
    </caption>
    <thead>
      <tr>
        <th>Hour</th>
        <th
          v-for="action in actions"
          :key="action.slug"
          :title="action.description"
        >
          {{ action.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="hour in groupedByHour"
        :key="hour[0]"
        class="c-hour"
        :class="{ 'c-hour--current': isCurrent(hour[0]) }"
        :ref="isCurrent(hour[0]) && 'current'"
      >
        <td>{{ Hour[hour[0]] }}</td>
        <td v-for="(rule, index) in hour[1]" :key="index">
          <span v-if="rule.isAllowed" class="c-hour__action">
            {{ rule.action }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import rules from "../assets/rules";
import actions from "../assets/actions";
import Hour from "../assets/Hour";

export default {
  name: "IndexPage",

  data() {
    return {
      rules,
      actions,
      Hour,
      interval: undefined,
      currentHour: undefined,
    };
  },

  computed: {
    sortedRules() {
      const rulesCopy = JSON.parse(JSON.stringify(this.rules));

      return rulesCopy.sort((a, b) => {
        const keyA = a.hour;
        const keyB = b.hour;

        return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
      });
    },

    groupedByHour() {
      const groupedObject = this.sortedRules.reduce((acc, rule) => {
        acc[rule.hour] = acc[rule.hour] || [];
        acc[rule.hour].push({ action: rule.action, isAllowed: rule.isAllowed });
        return acc;
      }, Object.create(null));

      return Object.entries(groupedObject);
    },
  },

  methods: {
    checkTime() {
      this.currentHour =
        "h" + new Date().getHours().toString().padStart(2, "0");
    },

    scheduleTimeCheck() {
      /** Every 60 seconds */
      this.interval = setInterval(this.checkTime, 60 * 1000);
    },

    scrollToCurrent() {
      /** 100px fixed caption, 20px extra */
      const captionOffset = 120;
      const element = this.$refs["current"][0];
      const elClientY = element.getBoundingClientRect().top;
      const elPageY = elClientY + window.pageYOffset;

      window.scrollTo({
        top: elPageY - captionOffset,
        left: 0,
        behavior: "smooth",
      });
    },

    isCurrent(hour) {
      return hour === this.currentHour;
    },
  },

  mounted() {
    this.checkTime();
    this.scheduleTimeCheck();
    document.addEventListener("DOMContentLoaded", this.scrollToCurrent);
  },

  updated() {
    this.scrollToCurrent();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.c-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 120px; /* fixed caption height of 100px + extra */
}

.c-table th {
  color: hsl(188, 56%, 23%);
}

.c-table td {
  color: hsl(176, 56%, 55%);
  transition: font-weight 300ms, color 300ms, background-color 300ms;
}

.c-table th,
.c-table td {
  box-sizing: border-box;
  min-width: 120px;
  padding: 16px;
  text-align: left;
}

.c-table tr:not(.c-hour--current):nth-child(odd) td {
  background-color: hsl(188, 56%, 99%);
}

.c-table__caption {
  position: fixed;
  top: 0;
  height: 100px;
  width: 100%;
  background-color: white;
  border-bottom: 4px dotted hsl(0, 100%, 71%);
  text-align: left;
  padding: 0 16px;
  color: hsl(0, 100%, 71%);
}

.c-hour--current td {
  font-weight: bold;
  color: hsl(188, 56%, 23%);
  background-color: hsl(50, 100%, 71%);
}

.c-title {
  display: flex;
  align-items: center;
}

.c-title__image + .c-title__text {
  margin-left: 8px;
}
</style>
