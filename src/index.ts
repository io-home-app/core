import clc          from "cli-color";
import yargs        from "yargs";
import { hideBin }  from "yargs/helpers";

import { EventBus }     from "./core/events/EventBus";
import { TimerModule } from "./core/timer/Timer";

import log from "./utils/log"; 

/**
 * Represents the core of IOHome and manages all components of the core
 * as described in /.assets/architecture or /DEV.md
 */
export class IOHomeCore {

    readonly eventBus:  EventBus;
    readonly timer:     TimerModule;

    constructor( public debug:boolean = false ) {
        if(debug) log(`${clc.yellowBright("⚠  Running in debug mode!  ⚠")}`, "IOHome", "warning");

        this.eventBus   = new EventBus();
        this.timer      = new TimerModule( this );

        this.start();
    }

    private async start() {
        this.timer.start();

        /// Everything has started up ///
        this.eventBus.dispatchEvent({ type: "core:ready", source: "core" });
        log("IOHome is running!", "IOHome", "ok");
    }

}

function start( debug: boolean ) {
    const app = new IOHomeCore( debug );
}

/// Command Line parsing ///

yargs(hideBin(process.argv))
    .version("dev")
    .command("start", "Starts IOHome", (yargs) => yargs, (argv) => {
        start( argv.debug == true );
    })
    .option("debug", {
        alias: "d",
        type: "boolean",
        description: `Run IOHome in Debug Mode ${clc.yellowBright("(Unsafe)")}`
    })
    .parse();