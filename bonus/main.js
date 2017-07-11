const moment =  require('moment');

const PerformanceManager = require('./PerformanceManager');

const performances = [
  {
    band: 'DZ Deathrays',
    start: '2016-01-19T11:15:00+10:00',
    finish: '2016-01-19T12:00:00+10:00',
    priority: 1
  },  
  {
    band: 'Portugal. The Man',
    start: '2016-01-19T12:45:00+10:00',
    finish: '2016-01-19T13:30:00+10:00',
    priority: 1 
  }, 
  {
    band: 'Tame Impala',
    start: '2016-01-19T14:15:00+10:00',
    finish: '2016-01-19T15:15:00+10:00',
    priority: 7
  }, 
  {
    band: 'The Hives',
    start: '2016-01-19T16:15:00+10:00',
    finish: '2016-01-19T17:15:00+10:00',
    priority: 5
  }, 
  {
    band: 'Arcade Fire',
    start: '2016-01-19T18:15:00+10:00',
    finish: '2016-01-19T19:45:00+10:00',
    priority: 10 
  },  
  {
    band: 'Blue Juice',
    start: '2016-01-19T12:00:00+10:00',
    finish: '2016-01-19T12:45:00+10:00',
    priority: 7 
  },  
  {
    band: 'The Naked & Famous',
    start: '2016-01-19T13:30:00+10:00',
    finish: '2016-01-19T14:15:00+10:00',
    priority: 8
  },  
  {
    band: 'Primus',
    start: '2016-01-19T15:15:00+10:00',
    finish: '2016-01-19T16:15:00+10:00',
    priority: 7 
  }, 
  {
    band: 'Beady Eye',
    start: '2016-01-19T17:15:00+10:00',
    finish: '2016-01-19T18:15:00+10:00',
    priority: 1 
  }, 
  {
    band: 'Pearl Jam',
    start: '2016-01-19T19:45:00+10:00',
    finish: '2016-01-19T22:00:00+10:00',
    priority: 9 
  },
  {
    band: 'Snoop Dog',
    start: '2016-01-19T20:00:00+10:00',
    finish: '2016-01-19T21:00:00+10:00',
    priority: 10 
  },
  {
    band: 'The Lumineers',
    start: '2016-01-19T17:30:00+10:00',
    finish: '2016-01-19T18:30:00+10:00',
    priority: 10 
  }
];

const performanceManager = new PerformanceManager(performances);

const dateFriendlyFormat = 'DD MMM YYYY hh:mm a';
let prevPerformanceId = 0;
const {start, finish} = performanceManager.getBounds();

while(start <= finish) {
  const performance = performanceManager.getBest(start);
  
  if(performance) {
    if(performance.id !== prevPerformanceId) {
      console.log(start.format(dateFriendlyFormat) + ': ' + performance.band);
      prevPerformanceId = performance.id;
    }
  } else {
    console.log(start.format(dateFriendlyFormat) + ': nothing to see');
    prevPerformanceId = 0;
  }

  start.add(1, 'minute');
}


