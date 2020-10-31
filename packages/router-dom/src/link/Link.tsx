import { ILinkProps as ICoreLinkProps } from '@reactionable/core/lib/router/Link';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type ILinkProps = ICoreLinkProps & Omit<LinkProps, 'to'>;

export function RouterLink<LinkProps extends ILinkProps>(props: LinkProps) {
  return <Link {...props} to={props.href || ''} />;
}
