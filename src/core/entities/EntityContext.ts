import type { EntityConfig } from "./EntityConfig";
import type { EntityManager } from "./EntityManager";

/**
 * The Info passed to Entities upon construction, like config and
 * a reference to the EntityManager
 */
export interface EntityContext<Config_t = {[key:string]: any}>
{
    config: EntityConfig<Config_t>;
    entityManager: EntityManager;
}