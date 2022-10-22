export interface EntityConfig<Config_t = {[key:string]: any}>
{
    id:     string;
    name:   string;
    type:   string;

    config: Config_t;
}


/**
 * Returns a boolean indicating whether or not a value
 * is a valid EntityConfig object
 * 
 * @param v The value you want to test
 * 
 * @example
 *      isValidEntityConfig( null );                                        // -> false
 *      isValidEntityConfig( "hello world" );                               // -> false
 *      isValidEntityConfig( {id: "a", name: "b", type: "c", config: {}} ); // -> true
 */
export function isValidEntityConfig( v: any ): boolean
{
    if(typeof v !== "object")           return false;

    if(typeof v.id !== "string")        return false;
    if(typeof v.name !== "string")      return false;
    if(typeof v.type !== "string")      return false;
    if(typeof v.config !== "object")    return false;

    if(v.id.length < 1)                 return false;
    if(v.type.length < 1)               return false;

    return true;
}