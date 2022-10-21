import clc          from "cli-color";
import yargs        from "yargs";
import { hideBin }  from "yargs/helpers";

import { IOHomeCore } from "./core/HomeCore";

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