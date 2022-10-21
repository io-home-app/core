export interface EntityConfig<Config_t = {[key:string]: any}>
{
    id:     string;
    name:   string;

    config: Config_t;
}