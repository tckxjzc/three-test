import React from 'react';
import {render} from 'react-dom';
import App from "./App";
import {Provider} from 'react-redux';
import store from './redux/store';
import './tools/OrbitControls';
/**
 * styles
 */
import 'styles/base.global.scss';
import 'tz-library/style/base.scss';
import 'tz-library/style/mobile.media.scss';

/**
 * start
 */
render(<Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container'));


class A {
    word;
    constructor(str){
        this.word=str
    }
    sayHi=()=>{
        console.log(this.word)
    }
}

class B extends A{
    word='5';
    constructor(str){
        super(str);
    }
}
//
// new B('sd').sayHi();
