import React, {Component} from 'react';
import {render} from 'react-dom';
import {Dispatcher} from 'flux';
import {Container, ReduceStore} from 'flux/utils';

const FOO_ACTION = 'FOO_ACTION';
const dispatcher = new Dispatcher();

class FooStore extends ReduceStore {
  getInitialState() {
    return {
      count: 0
    }
  }

  reduce(state, action) {
    if (action.type === FOO_ACTION) {
      return Object.assign({}, {count: state.count + 1});
    }
  }
}
const fooStore = new FooStore(dispatcher);

class FooContainer extends Component {
  static getStores() {
    return [fooStore];
  }

  static calculateState(prevState) {
    return {
      foo: fooStore.getState(),
    };
  }

  onClick() {
    return () => {
      dispatcher.dispatch({
        type: FOO_ACTION
      });
    };
  }

  render() {
    return (
      <div>
        <span>{this.state.foo.count}</span>
        <div onClick={this.onClick()}>click</div>
      </div>
    );
  }
}

const Foo = Container.create(FooContainer);
const root = document.createElement('div');
document.body.appendChild(root);
render(<Foo/>, root);
