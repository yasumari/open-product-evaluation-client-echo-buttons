export class Constants {
    public static get SERVER_URL(): string { return "http://localhost:3000/"; };
    public static get SOCKETS_URL(): string { return "http://localhost:3001"; };
    public static get TIMER_QUESTION(): number { return 40000; };
    public static get TIMER_FEEDBACK(): number { return 40000; };
    public static get TIMER_END(): number { return 60000; };
  }