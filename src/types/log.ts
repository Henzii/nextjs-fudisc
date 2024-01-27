import { User } from "./user"

export enum LogType {
    ERROR = "error",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning"
}

export type LogEntry = {
    message: string,
    type: LogType,
    context: string
    user?: User,
    createdAt: string
}