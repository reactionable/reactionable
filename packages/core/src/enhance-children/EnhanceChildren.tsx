import React from 'react';

export const EnhanceChildren: React.FC<{ enhance: { [key: string]: any } }> = (props) => {
    const {
        children,
        enhance,
    } = props;

    const newChildren = React.Children.map(children, (child, i) => {
        if (typeof child === 'object' && child !== null && 'type' in child) {
            return React.cloneElement(child, { ...enhance });
        }
        return child;
    });

    return <>{newChildren}</>;
};