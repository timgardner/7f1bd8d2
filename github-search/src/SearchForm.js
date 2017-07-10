import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.onSearchTermChange(e.currentTarget.value);
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label>Github User Search</label>
          <input className="form-control" placeholder="Github User" onChange={this.onChange} value={this.props.searchTerm}></input>
        </div>
      </form>);
  }
}