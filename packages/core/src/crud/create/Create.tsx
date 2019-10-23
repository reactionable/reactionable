import * as React from 'react';
import { IFormProps, Form } from '../../form/Form';

export interface ICreateProps<Value, Data> extends IFormProps<Value, Data> {};
export type CreateComponent<Value = any, Data = any> = React.FC<ICreateProps<Value, Data>>;

export const Create: CreateComponent = (props) => {
    return <Form {...props} />
};