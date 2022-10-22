import clc from "cli-color";

import log from "../utils/log";

import { ConfigManager }    from "./config/ConfigManager";
import { EntityManager }    from "./entities/EntityManager";
import { EventBus }         from "./events/EventBus";
import { TimerModule }      from "./timer/Timer";

/**
 * Represents the core of IOHome and manages all components of the core
 * as described in /.assets/architecture or /DEV.md
 */
export class IOHomeCore {

    public readonly timer:      TimerModule;
    public readonly eventBus:   EventBus;
    public readonly entities:   EntityManager;
    public readonly config:     ConfigManager

    constructor( public debug:boolean = false ) {
        if(debug) log(`${clc.yellowBright("⚠  Running in debug mode!  ⚠")}`, "IOHome", "warning");

        this.eventBus   = new EventBus      ( this );
        this.timer      = new TimerModule   ( this );
        this.entities   = new EntityManager ( this );
        this.config     = new ConfigManager ( this );

        this.start();
    }

    private async start() {
        this.timer.start();

        /// Everything has started up ///
        log("IOHome is ready! Initializing...", "IOHome", "info");
        this.eventBus.dispatchEvent({ type: "core:ready", source: "core" });
    }

    public debugLog( message:string, origin:string="IOHome" )
    {
        if(!this.debug) return;
        log(message, origin, "debug");
    }

}