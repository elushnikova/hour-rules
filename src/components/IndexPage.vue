<template>
  <table v-if="actions.length && groupedByHour.length" class="c-table">
    <caption class="c-table__caption">
      <h1>
        What you can do this hour
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
      <tr v-for="hour in groupedByHour" :key="hour[0]" class="c-hour">
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

    /** @todo Remove duplicate `hour` nested deep in objects */
    groupedByHour() {
      const groupedObject = this.sortedRules.reduce((acc, rule) => {
        acc[rule.hour] = acc[rule.hour] || [];
        acc[rule.hour].push({ action: rule.action, isAllowed: rule.isAllowed });
        return acc;
      }, Object.create(null));

      return Object.entries(groupedObject);
    },
  },
};
</script>

<style>
.c-table {
  border-collapse: collapse;
  width: 100%;
}

.c-table th,
.c-table td {
  box-sizing: border-box;
  min-width: 120px;
  padding: 16px;
  text-align: left;
}

.c-table th,
.c-table tr:not(:last-child) td {
  border-bottom: 1px solid lightgrey;
}

.c-table__caption {
  text-align: left;
  padding: 0 16px;
}

.c-hour__action {
  color: lightseagreen;
}
</style>
