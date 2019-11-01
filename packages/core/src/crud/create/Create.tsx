import * as React from 'react';
import { IFormProps, Form } from '../../form/Form';

export interface ICreateProps<Value, Data> extends IFormProps<Value, Data> {};

export type CreateComponent<Value, Data> = React.FC<ICreateProps<Value, Data>>;
export function Create<Value, Data>(props: React.PropsWithChildren<ICreateProps<Value, Data>>) {
    return <Form<Value, Data> {...props} />
};