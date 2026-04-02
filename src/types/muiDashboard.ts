import type { ComponentType } from "react";

/** Material Dashboard styled roots pass `ownerState` into MUI `styled()`; TS does not model it on the host. */
export function withOwnerState<C>(component: C): ComponentType<any> {
  return component as ComponentType<any>;
}
