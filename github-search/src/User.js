import React from 'react';

export default ({login, avatar_url, type, score}) => (
  <div>
    <div className="col-md-4">
      <img src={avatar_url} className="img-responsive" />
    </div>
    <div className="col-md-8">
      <h3>{login}</h3>
      <h4>Type: {type}</h4>
      <h4>Score: {score}</h4>
    </div>
  </div>);