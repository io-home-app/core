import { IOHomeCore } from "../..";

export class TimerModule {

    private interval:   NodeJS.Timer;

    private lastMinute: number = new Date().getMinutes();
    private lastHour:   number = new Date().getHours();
    private lastDay:    number = new Date().getDate();

    constructor( private readonly core:IOHomeCore ) {}

    /**
     * Starts the timer sending events every second, minute, hour, day
     */
    public start(): void {
        this.interval = setInterval(() => {

            let now = new Date();

            this.core.eventBus.dispatchEvent({
                type: "time:second",
                source: "submodule:timer"
            });

            if(now.getMinutes() != this.lastMinute) { 
                this.lastMinute = now.getMinutes();
                this.core.eventBus.dispatchEvent({ type: "time:minute", source: "submodule:timer" });
            }

            if(now.getHours() != this.lastHour) { 
                this.lastHour = now.getHours();
                this.core.eventBus.dispatchEvent({ type: "time:hour", source: "submodule:timer" });
            }

            if(now.getDate() != this.lastDay) { 
                this.lastDay = now.getDate();
                this.core.eventBus.dispatchEvent({ type: "time:day", source: "submodule:timer" });
            }
        }, 1000);
    }

}