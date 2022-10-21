import { Entity } from "./Entity";

/**
 * Manages all Entities
 */
export class EntityManager
{

    /**
     * Stores all registered Entities
     */
    private entities: Array<Entity> = [];

    constructor()
    {

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