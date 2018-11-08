import React, { Component } from 'react';

class Result extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { name, href, src } = this.props;
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3>Name: { name }</h3>
                    <h5><a href={ href }>Github URL</a></h5>
                </div>
                <div className="col-md-6">
                    <img src={ src } alt='' />
                </div>
            </div>
        );
    }
}

export default Result