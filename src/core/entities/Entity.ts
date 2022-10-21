import type { EntityConfig } from "./EntityConfig";
import type { EntityContext } from "./EntityContext";


export class Entity<Config_t={[key: string]: any}>
{

    /** Unique ID of the Entity */
    private _id: string;
    /** Name of the Entity; Can be changed in the config / dashboard */
    private _name: string;


    constructor( public readonly _context:EntityContext<Config_t> )
    {
        this._id    = _context.config.id;
        this._name  = _context.config.name;
    }


    /** Unique ID of the Entity */
    public get id()
    {
        return this._id;
    }

    /** Name of the Entity; Can be changed in the config / dashboard */
    public get name()
    {
        return this._name;
    }

    /** The configuration for the Entity */
    public get config(): EntityConfig<Config_t>
    {
        return this._context.config;
    }

    /** The EntityManager */
    public get entityManager()
    {
        return this._context.entityManager;
    }

}