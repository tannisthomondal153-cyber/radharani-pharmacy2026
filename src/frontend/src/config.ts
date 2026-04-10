// Compatibility shim — wraps the library's createActorWithConfig with the local createActor
// so existing imports of `../config` continue to work after migration.
import { createActorWithConfig as _createActorWithConfig } from "@caffeineai/core-infrastructure";
import { createActor } from "./backend";
import type { backendInterface } from "./backend";

export async function createActorWithConfig(): Promise<backendInterface> {
  const actor = await _createActorWithConfig(createActor as Parameters<typeof _createActorWithConfig>[0]);
  return actor as backendInterface;
}
