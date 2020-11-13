import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import isEqual from "react-fast-compare";

export function useDeepCompareMemoize(value: DependencyList): DependencyList | undefined {
  const ref = useRef<DependencyList>();

  if (!isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList): void {
  useEffect(callback, useDeepCompareMemoize(dependencies));
}
