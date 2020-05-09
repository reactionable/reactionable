import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

export function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback: any, dependencies: any) {
  useEffect(callback, useDeepCompareMemoize(dependencies));
}
