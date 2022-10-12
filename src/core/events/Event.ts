export interface EventListener {
    type: EventType | "*";
    callback: (e: any) => void;
}

export type EventSource = "core" | "submodule:timer" | "submodule:database" | "submodule:api" | "submodule:debug" | "submodule:services" | "submodule:state";

export type EventType = 
    "core:ready" |
    "time:second" | "time:minute" | "time:hour" | "time:day"

export type Event =
    { source:EventSource, type: "core:ready" } |

    { source:EventSource, type: "time:second" } |
    { source:EventSource, type: "time:minute" } |
    { source:EventSource, type: "time:hour" } |
    { source:EventSource, type: "time:day" }