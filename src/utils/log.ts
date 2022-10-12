import clc from "cli-color";

/**
 * Logs a message to console
 * 
 * @param message The message to send
 * @param origin What section / submodule the message was sent from
 */
export default function log( message:string, origin:string="IOHome", type:"ok"|"error"|"fatal"|"warning"|"info" = "info" ) {
    let typeString = "";
    switch(type) {
        case "ok":
            typeString = clc.green("OK");
            break;
        case "info":
            typeString = clc.white("INFO");
            break;
        case "error":
            typeString = clc.red("ERROR");
            break;
        case "fatal":
            typeString = clc.redBright("FATAL");
            break;
        case "warning":
            typeString = clc.yellow("WARNING");
            break;
    }
    
    console.log(
        clc.cyan(new Date().toLocaleString()),
        clc.black(">"),
        clc.cyan(origin),
        clc.black(">"),
        typeString,
        ">",
        message
    );
}