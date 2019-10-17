import React, { Component } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    id: any,
    head?: string,
    style?: any,
};
interface State { };

class Frame extends Component<Props, State> {

    private mounted: boolean;
    private setInitialContent: boolean;
    private node: any;

    constructor(props: Props) {
        super(props);
        this.mounted = false;
        this.setInitialContent = false;
    }

    componentDidMount() {
        this.mounted = true;

        const doc = this.getDoc();
        if (doc && doc.readyState === 'complete') {
            this.forceUpdate();
        } else {
            this.node.addEventListener('load', this.handleLoad);
        }
    }

    componentWillUnmount() {
        this.mounted = false;

        this.node.removeEventListener('load', this.handleLoad);
    }

    getDoc() {
        return this.node.contentDocument; // eslint-disable-line
    }

    getMountTarget() {
        const doc = this.getDoc();
        return doc.body;
    }

    handleLoad = () => {
        this.forceUpdate();
    };

    renderFrameContents() {
        if (!this.mounted) {
            return null;
        }

        const doc = this.getDoc();

        const initialRender = !this.setInitialContent;
        const contents = (this.props.children);

        if (initialRender) {
            doc.open('text/html', 'replace');
            doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
            doc.close();
            this.setInitialContent = true;
            doc.head.innerHTML = this.props.head;
        }

        const mountTarget = this.getMountTarget();

        return [
            ReactDOM.createPortal(contents, mountTarget)
        ];
    }

    render() {
        const props = {
            ...this.props,
            children: undefined // The iframe isn't ready so we drop children from props here. #12, #17
        };
        return (
            <iframe
                {...props}
                title={this.props.id}
                ref={node => {
                    this.node = node;
                }}
            >
                {this.renderFrameContents()}
            </iframe>
        );
    }
}
export default Frame;