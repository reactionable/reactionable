import { Component, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export let modalRoot: HTMLDivElement;
export class ModalPortal extends Component {
  protected element: HTMLDivElement;
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.element = document.createElement<'div'>('div');
    if (!modalRoot) {
      modalRoot = document.createElement<'div'>('div');
      modalRoot.id = 'modal-root';
      document.body.insertBefore(modalRoot, document.getElementById('app-root'));
    }
  }
  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }

  render() {
    return createPortal(this.props.children, this.element);
  }
}
