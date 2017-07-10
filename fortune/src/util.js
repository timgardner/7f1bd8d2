const ApiBaseUrl = 'http://localhost:3001';

export function getJSON(resource) {
  return fetch(ApiBaseUrl + resource)
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not fetch: ' + response.statusText);
      }

      return response.json()
    });
}


export function loadPeople() {
  let peopleData = {};

  return getJSON('/people')
    .then((people) => {
      // store people in a map so can be retrieved by id later
      peopleData = people.reduce((acc, cur) => {
        cur.isRichest = false;
        cur.skills = [];
        cur.interests = [];
        acc[cur.id] = cur;
        return acc;
      }, {});
      const personIdsParam = '?personIds=' + Object.keys(peopleData).join(',');

      // request skills, interests and richest in parallel
      return Promise.all([getJSON('/skills' + personIdsParam), getJSON('/interests' + personIdsParam), getJSON('/richest')]);
    })
    .then(([skills, interests, richest]) => {
      // assign skills, interests and richest
      for(let skill of skills) {
        if(skill.personId in peopleData) {
          peopleData[skill.personId].skills.push(skill.name); 
        }
      }

      for(let interest of interests) {
        if(interest.personId in peopleData) {
          peopleData[interest.personId].interests.push(interest.name);
        }
      }

      peopleData[richest.richestPerson].isRichest = true;

      return peopleData;
    });
}