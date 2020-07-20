import Component from '@glimmer/component';
import { D3TimeSeriesConfig, LineConfig } from 'ember-d3-modifiers';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TimeSeriesThresholdLinesDemoComponent extends Component {
  @tracked d3Config = new D3TimeSeriesConfig({
    dataConfig: {
      'Temperature A': {
        className: 'series-a-custom-styling',
        chartTypes: [
          new LineConfig({ lineWidth: 3 })
        ]
      }
    },
    // thresholds: [
    //   { thresholdId: 'High Value Threshold', value: 5, className: 'high-value-threshold' },
    //   { thresholdId: 'Low Value Threshold', value: 3, className: 'low-value-threshold' }
    // ],
    axis: {
      y: {
        startsAtZero: true
      }
    }
  });

  @tracked thresholdFlag = true;
  @tracked thresholdValue = 5;
  @tracked thresholds = [
    { thresholdId: 'High Value Threshold', value: this.thresholdValue, className: 'high-value-threshold' }
  ];

  @service fakeDataGenerator;
  get chartData() {
    return this.fakeDataGenerator.generateFakeTimeSeriesData({
      fakeSeriesIds: ['Temperature A'],
      numberOfHoursAgo: 48
    });
  }

  @action
  toggleValue(newThresholdValue) {
    this.thresholdValue = Number(newThresholdValue);
    if (this.thresholdFlag) {
      this.thresholds[0].value = this.thresholdValue;
    }
    console.log(this.thresholds);
  }

  @action
  toggleFlag(newThresholdFlag) {
    this.thresholdFlag = newThresholdFlag;
    if (this.thresholdFlag) {
      this.thresholds.push({ thresholdId: 'High Value Threshold', value: this.thresholdValue, className: 'high-value-threshold' })
    } else {
      this.thresholds.splice(0, 1);
    }
    console.log(this.thresholds);
  }
}
