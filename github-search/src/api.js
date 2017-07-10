const ApiBaseUrl = 'https://api.github.com'


function encodeParams(params) {
  return '?' + Object.keys(params).map(p => p + '=' + encodeURIComponent(params[p])).join('&');
}

function getJSON(resource, params = {}) {
  return fetch(ApiBaseUrl + resource + encodeParams(params))
    .then(response => {
      if(!response.ok) {
        throw new Error('Could not fetch: ' + response.statusText);
      }

      return response.json()
    });
}


export function searchUsers(searchTerm) {
  return getJSON('/search/users', {q: searchTerm})
    .then(json => json.items);
}

