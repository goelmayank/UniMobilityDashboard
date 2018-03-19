import * as _ from "underscore";
import { QueryLabel } from "../interfaces";

export abstract class BaseFilter {
  abstract statusQueryArray: QueryLabel[];
  abstract sortingQueryMap: object = {};

  get sortingQueryLabel() {
    return this.getLabelArrayFromMap(this.sortingQueryMap);
  }

  getLabelArrayFromMap(queryMap) {
    let keys = Object.keys(queryMap);
    return _.map(keys, (key: string) => {
      let label = queryMap[key] || key;
      return {
        value: key,
        label
      };
    });
  }

  getQueryDisplay(queryArray: QueryLabel[], key): QueryLabel[] {
    return _.map(queryArray, queryLabel => {
      let value = queryLabel.values ? queryLabel.values.toString() : queryLabel.value;
      return { ...queryLabel, param: { [key]: value } };
    });
  }

  getQueryLabel(query): QueryLabel[] {
    const keys = Object.keys(query);
    return _.reduce(
      keys,
      (acc: QueryLabel[], key: string) => {
        const value = query[key] || key;
        const label = this.getQueryLabelFromValue(value, key);
        let queryLabel = {
          label,
          values: [key],
          value: key,
          param: { [key]: value }
        };
        return label ? [...acc, queryLabel] : acc;
      },
      []
    );
  }

  getQueryLabelFromValue(value: string, key?: string): string | null {
    if (key === "search") return value;
    if (key === "show_all") return "Show All"; //todo add this after clear on show all removed
    let queryLabel = _.find(this.allQueryArray, (queryLabel: QueryLabel) => {
      let valueString;
      if (queryLabel.values) {
        valueString = queryLabel.values.toString();
      } else if (queryLabel.values) {
        valueString = queryLabel.values;
      } else {
        return false;
      }
      return valueString === value;
    });
    return queryLabel ? queryLabel.label : null;
  };

  summaryCharts(queryLabels: QueryLabel[], data: object, status?: string) {
    if(data) {
      let max;
      let total = 0;
      let values = _.map(queryLabels, entity => {
        let sum = _.reduce(
          entity.values,
          (acc, key: string) => {
            return acc + data[key];
          },
          0
        );
        let value = entity.value || 0 + sum;
        max = max && value < max ? max : value;
        total = total + value;
        return { ...entity, value };
      });
      let totalUsers = total;
      let hasSelected = false;
      let chart = _.map(values, datum => {
        let selected = false;
        if (status && status == datum.values.toString()) {
          selected = true;
          hasSelected = true;
        }
        let w = max ? datum.value / max : 0;

        return { ...datum, w, selected };
      });
      return { totalUsers, chart, hasSelected }
    } else {
      return data;
    }
    // return data;

  }

  abstract get allQueryArray();
}
