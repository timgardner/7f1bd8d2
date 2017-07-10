import React from 'react';


const PeopleListRow = ({id, name, org, skills, interests, isRichest}) => (
  <tr className={isRichest ? 'richest' : ''}>
    <td>{name}</td><td>{org}</td><td>{skills.join(', ')}</td><td>{interests.join(', ')}</td>
  </tr>);

export default ({people}) => (
  <table className="table">
  <thead>
    <tr>
      <th>Name</th><th>Company</th><th>Skills</th><th>Interests</th>
    </tr>
  </thead>
  <tbody>
    {people.map(person => <PeopleListRow key={person.id} {...person} />)}
  </tbody>
  </table>);
