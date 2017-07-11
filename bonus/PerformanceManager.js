const moment =  require('moment');


function PerformanceManager(performances) {
  let lastPerformanceId = 1;
  this.performanceMap = {};
  this.performancesByMinute = {};
  
  // create map of each minute of each performance so can choose priorities
  performances.forEach(performance => {
    // give performance an id so we can reference it later
    const p = Object.assign({id: lastPerformanceId++}, performance);
    this.performanceMap[p.id] = p;

    const start = moment.parseZone(p.start);
    const finish = moment.parseZone(p.finish);

    const temp = start.clone(); // adding mutates!
    while(temp < finish) {
      const formattedMinute = temp.format();
      
      if(!(formattedMinute in this.performancesByMinute)) {
        this.performancesByMinute[formattedMinute] = {
          moment: temp.clone(),
          performanceIds: []
        };
      }
      
      this.performancesByMinute[formattedMinute].performanceIds.push(p.id);

      temp.add(1, 'minute');
    }
  });
}

PerformanceManager.prototype.getBest = function(minuteMoment) {
  const formatted = minuteMoment.format();
  
  if(!(formatted in this.performancesByMinute)) {
    return null;
  }
  
  const performanceIds = this.performancesByMinute[formatted].performanceIds;
  return performanceIds.map(id => this.performanceMap[id]).sort((a, b) => b.priority - a.priority)[0];
}

PerformanceManager.prototype.getBounds = function() {
  const keys = Object.keys(this.performancesByMinute);
  return {
    start: this.performancesByMinute[keys[0]].moment.clone(),
    finish: this.performancesByMinute[keys[keys.length - 1]].moment.clone()
  }
}

module.exports = PerformanceManager;
