import fs       from "fs";
import path     from "path";
import yaml     from "yaml";
import util     from "util";
import { exit } from "process";

import log from "../../utils/log";

import { EntityConfig, isValidEntityConfig } from "../entities/EntityConfig";

import type { IOHomeCore } from "../HomeCore";
import type { RawConfig } from "./Config";


/**
 * Manages the configuration for IOHome
 */
export class ConfigManager
{

    /** Stores the config data read in from config.yaml */
    public config: RawConfig;


    constructor( private readonly core:IOHomeCore ) {
        this.core.eventBus.on("core:ready", () => {this.read()});
    }


    /**
     * Reads and parses the config.yaml file
     */
    public read()
    {
        let path = this.getPath();
        this.core.debugLog( `Reading config from ${path}`, "Config" );

        this.config = {
            entities: []
        };

        //// Read the file ///
        let file:string;

        try {
            file = fs.readFileSync(path, "utf-8");
        } catch(err) {
            log( util.formatWithOptions({ colors: true }, "Error opening config file: \n", err), "Config", "fatal" );
            log( "Exiting...", "Config", "fatal" );
            exit(1);
        }

        //// Parse the config ////
        const config = yaml.parse( file );

        /// Get all valid Entitiy configs ///
        this.config.entities = (config.entities || []).filter( (x:any) => isValidEntityConfig(x) );


        //// Post an config:parsed Event ////
        this.core.eventBus.dispatchEvent({
            type: "config:parsed",
            source: "module:config"
        });
    }

    /** Returns the path for a specific config file */
    public getPath( file: string = "config.yaml" )
    {
        return path.join(__dirname, "..", "..", "..", "..", "data", file);
    }


    /**
     * Returns the config for an entity with a certain id
     * 
     * @param id The ID of the entity
     * @returns The Config if found, null if not
     */
    public getEntityConfig( id: string ): EntityConfig | null
    {
        for(var e of this.config.entities) {
            if(e.id == id) return e;
        }

        return null;
    }

}