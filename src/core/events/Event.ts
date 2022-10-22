export interface EventListener {
    type: EventType | "*";
    callback: (e: any) => void;
}

export type EventSource = "core" | "module:timer" | "module:database" | "module:api" | "module:debug" | "module:config" | string;

export type EventType = 
    "core:ready" |
    "time:second" | "time:minute" | "time:hour" | "time:day" |
    "config:parsed"

export type Event =
    { source:EventSource, type: "core:ready" } |

    { source:EventSource, type: "time:second" } |
    { source:EventSource, type: "time:minute" } |
    { source:EventSource, type: "time:hour" } |
    { source:EventSource, type: "time:day" } |

    { source:EventSource, type: "config:parsed" }