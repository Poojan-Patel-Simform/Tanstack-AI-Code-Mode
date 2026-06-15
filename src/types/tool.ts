export enum ToolNameEnum {
  WEATHER_TOOL = "weather_tool",
}

export type VMEvent = {
  id: string;
  eventType: string;
  data: unknown;
  timestamp: number;
};

export type ToolMessage = { id: string; role: string; parts: Array<any> };
