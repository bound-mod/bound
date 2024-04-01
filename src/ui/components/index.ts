import { ReactNative as RN } from "@metro/common";
import { findByDisplayName, findByName, findByProps, find } from "@metro/filters";

// https://github.com/pyoncord/Pyoncord/blob/08c6b5ee1580991704640385b715d772859f34b7/src/lib/ui/components/discord/Redesign.ts#L4C1-L4C98
const findSingular = (prop: string) => find(m => m[prop] && Object.keys(m).length === 1)?.[prop];

// Discord
export const Forms = findByProps("Form", "FormSection");
export const Tabs = { 
    ...findByProps("TableRow", "TableRowGroup"),
    RedesignSwitch: findSingular("FormSwitch"),
    RedesignCheckbox: findSingular("FormCheckbox"),
} as Record<string, any>;
export const General = findByProps("Button", "Text", "View");
export const Alert = findByDisplayName("FluxContainer(Alert)");
export const Button = findByProps("Looks", "Colors", "Sizes") as React.ComponentType<any> & { Looks: any, Colors: any, Sizes: any };
export const HelpMessage = findByName("HelpMessage");
// React Native's included SafeAreaView only adds padding on iOS.
export const SafeAreaView = findByProps("useSafeAreaInsets").SafeAreaView as typeof RN.SafeAreaView;

// Vendetta
export { default as Summary } from "@ui/components/Summary";
export { default as ErrorBoundary } from "@ui/components/ErrorBoundary";
export { default as Codeblock } from "@ui/components/Codeblock";
export { default as Search } from "@ui/components/Search";
export { default as TabulatedScreen } from "@ui/components/TabulatedScreen";
