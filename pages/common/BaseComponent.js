import React, { Component } from 'react';
import SpinnerComponent from '../common/spinnerComponent';

export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        this.getSpinnerComponentView = this.getSpinnerComponentView.bind(this);
    }


    getSpinnerComponentView(spinner) {
        const loaderView = (<SpinnerComponent />);
        const nonLoaderView = null;
        if (spinner) {
            return loaderView;
        }
        return nonLoaderView;
    }

    render() {
        return null
    }
}