import React, { Component } from 'react';
import { fromEvent, from } from 'rxjs';
import { map, concatMap, debounceTime } from 'rxjs/operators';
import $ from 'jquery';
import './App.css';
import Result from './Result';

class App extends Component {

  constructor(){
    super();

    this.state = {
      url: 'https://api.github.com/users/',
      username: '',
      href: null,
      src: null,
      name: null,
      error: null,
    }

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick = (event) => {

  }

  onChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  componentDidMount() {
    let source = fromEvent($('#search-box'), 'keyup');
    let O = source.pipe(map(event => this.state.username))
               .pipe(debounceTime(1500))
               .pipe(concatMap(username => from($.get(`${this.state.url}${username}`).catch(res => this.setState({ error: res.statusText, name: null })))))
               .subscribe(res => {
                 if(res){
                   console.log(res);
                    this.setState({
                      name: res.name,
                      href: res.html_url,
                      src: res.avatar_url
                    });
                }
                });
  }

  render() {
    const { name, href, src, error } = this.state;
    return (
      <div className="container">
        <h1>Search Github Users</h1>
        <div className="form-group">
          <label htmlFor="search-box">Username:</label>
          <input id="search-box" type="text" className="form-control" onChange={ this.onChange } />
        </div>
        <br /><br /><br /><br />
        <div>
          { name ? <Result name={ name } href={href} src={src} /> : null }
          { error ? <div className="alert alert-danger">{ error }</div> : null }
        </div>
      </div>
    );
  }
}

export default App;
