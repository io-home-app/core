import { Entity } from "./Entity";

import type { IOHomeCore } from "../HomeCore";

/**
 * Manages all Entities
 */
export class EntityManager
{

    /**
     * Stores all registered Entities
     */
    private entities: Array<Entity> = [];

    constructor( public core:IOHomeCore )
    {
        this.core.eventBus.on( "config:parsed", () => { this.initializeFromConfig(); } );
    }

    private initializeFromConfig()
    {
        this.core.debugLog( "Initializing Entities from Config...", "Entities" )
    }

    /**
     * Gets the Entity with matching id and returns it.
     * If it does not exist, returns null.
     * 
     * @param id 
     */
    public getEntityByID( id: string ): Entity|null
    {
        for(var e of this.entities) {
            if(e.id == id) return e;
        }

        return null;
    }

}