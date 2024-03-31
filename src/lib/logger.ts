import { Logger } from "@types";
import { findByProps } from "@metro/filters";

export const logModule = findByProps("setLogFn").default;
const logger: Logger = new logModule("Bound");

export default logger;
