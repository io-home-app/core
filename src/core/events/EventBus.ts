import { formatWithOptions } from "util";

import log from "../../utils/log";

import type { IOHomeCore } from "../HomeCore";
import type {
    Event,
    EventType,
    EventListener
} from "./Event";

/**
 * Handles all Events for the application and distributes them.
 */
export class EventBus
{

    /** List of all registered event listeners */
    public eventListeners: Array< EventListener > = [];


    constructor( private core:IOHomeCore ) {}


    /**
     * Posts an event to the bus
     */
    public dispatchEvent( event:Event )
    {
        this.debugLogEvent( event );

        for(var el of this.eventListeners) {
            if(el.type == event.type || el.type == "*") {
                el.callback( event );
            }
        }
    }

    /**
     * Registers a new event listener with a callback that will be called, when
     * an event of the specified type is posted to the event bus.
     * 
     * Alias for *addEventListener*
     * 
     * @param eventType The type of the event to listen for
     * @param callback  The callback called when an event with matching type is posted
     * 
     * @example
     *      bus.addEventListener( "core:ready", () => { console.log(" IOHome is running! "); } )
     */
    public on( eventType: EventType, callback: (e: Event) => void )
    {
        this.addEventListener( eventType, callback );
    }

    /**
     * Registers a new event listener with a callback that will be called, when
     * an event of the specified type is posted to the event bus.
     * 
     * @param eventType The type of the event to listen for
     * @param callback  The callback called when an event with matching type is posted
     * 
     * @example
     *      bus.addEventListener( "ready", () => { console.log(" IOHome is running! "); } )
     */
    public addEventListener( eventType: EventType, callback: (e: any) => void )
    {
        this.eventListeners.push({
            type: eventType,
            callback
        });
    }

    private debugLogEvent( event:Event ) {
        if(!this.core.debug) return;
        log(formatWithOptions({colors: true}, "Event:", event), "EventBus", "debug");
    }

}