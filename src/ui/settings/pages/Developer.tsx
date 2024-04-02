import { ReactNative as RN, NavigationNative } from "@metro/common";
import { findByProps } from "@metro/filters";
import { connectToDebugger, connectToRDT, socket } from "@lib/debug";
import { BundleUpdaterManager } from "@lib/native";
import { useProxy } from "@lib/storage";
import { showToast } from "@ui/toasts";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Tabs, ErrorBoundary } from "@ui/components";
import settings, { loaderConfig } from "@lib/settings";
import AssetBrowser from "@ui/settings/pages/AssetBrowser";
import Secret from "@ui/settings/pages/Secret";

const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup, TextInput, Slider } = Tabs;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");
var betabranch = false;

export default function Developer() {
    const navigation = NavigationNative.useNavigation();

    useProxy(settings);
    useProxy(loaderConfig);

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, alignItems: "center" }}>
                <Stack spacing={50}>
                    <TableRowGroup title="Debug Bridge">
                        <TableSwitchRow
                            label="Enabled"
                            subLabel="Automatically connects to a specified remote debug bridge to allow for code evaluation."
                            value={settings.debugBridgeEnabled}
                            onValueChange={(v: boolean) => {
                                settings.debugBridgeEnabled = v;
                                try {
                                    v ? connectToDebugger(settings.debuggerUrl) : socket.close();
                                } catch {}
                            }}
                        />
                        <RN.View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
                            <TextInput
                                label="Debug IP"
                                placeholder="127.0.0.1:9090"
                                size="md"
                                defaultValue={settings.debuggerUrl}
                                onChange={(v: string) => {
                                    settings.debuggerUrl = v;
                                }}
                            />
                        </RN.View>
                    </TableRowGroup>
                    {window.__vendetta_loader?.features.loaderConfig && <TableRowGroup title="Loader">
                        <TableSwitchRow
                            label="Enabled"
                            subLabel="Handles the loading of Vendetta Continued. You will need to edit the configuration file to enable the loader again."
                            value={false}
                            onValueChange={(v: boolean) => {
                                showToast("not needed lol",getAssetIDByName("Check"))
                            }}
                        />
                        <TableSwitchRow
                            label="React DevTools"
                            subLabel="Enables remote developer tools that can be accessed from a desktop."
                            value={settings.rdtEnabled}
                            onValueChange={(v: boolean) => {
                                settings.rdtEnabled = v;
                                if (v) connectToRDT();
                            }}
                        />
                        <TableSwitchRow
                            label="Beta Branch"
                            subLabel="Gets the code from the Beta Branch instead of the main branch."
                            value={betabranch}
                            onValueChange={(v: boolean) => { 
                                betabranch = !v;
                                if (betabranch == true) {
                                    loaderConfig.customLoadUrl.url = "https://raw.githubusercontent.com/5xdf/Strife/beta/strifemod/strife.js";
                                } else {
                                    loaderConfig.customLoadUrl.url = "https://raw.githubusercontent.com/5xdf/Strife/main/strifemod/strife.js";
                                }
                            }}
                        />
                        <RN.View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
                            <TextInput
                                label="Custom Loader URL"
                                placeholder="http://localhost:4040/bound.js"
                                size="md"
                                defaultValue={loaderConfig.customLoadUrl.url}
                                onChange={(v: string) => {
                                    loaderConfig.customLoadUrl.url = v;
                                }}
                            />
                        </RN.View>
                    </TableRowGroup>}
                    <TableRowGroup title="Error Boundary">
                        <TableSwitchRow
                            label="Error Boundary"
                            subLabel={`Crash recovery module. Do not disable if you are a "consumer".`} // Client mods are not products - maisy
                            value={settings.errorBoundaryEnabled ?? true}
                            onValueChange={(v: boolean) => {
                                settings.errorBoundaryEnabled = v;
                                showToast(`Crash recovery module has been set to ${v}`,getAssetIDByName("MoreHorizontalIcon"));
                            }}
                        />
                        <TableRow
                            label="Trigger ErrorBoundary"
                            subLabel="Trips the error boundary on purpose to visualise the effects of it."
                            onPress={() => showSimpleActionSheet({
                                key: "ErrorBoundaryTools",
                                header: {
                                    title: "Which ErrorBoundary do you want to trip?",
                                    icon: <TableRowIcon style={{ marginRight: 8 }} source={getAssetIDByName("ic_warning_24px")} />,
                                    onClose: () => hideActionSheet(),
                                },
                                options: [
                                    // @ts-expect-error 
                                    // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                                    { label: "Vendetta Continued", onPress: () => navigation.push("VendettaCustomPage", { render: () => <undefined /> }) },
                                    { label: "Discord", isDestructive: true, onPress: () => navigation.push("VendettaCustomPage", { noErrorBoundary: true }) },
                                ],
                            })}
                            arrow
                        />
                    </TableRowGroup>
                    <TableRowGroup title="Logging">
                        <TableRow
                            label="Inspection Depth"
                            trailing={<TableRow.TrailingText text={`${settings.inspectionDepth ?? 1} nested object(s) deep`} />}
                        />
                        <RN.View style={{ paddingVertical: 4, paddingHorizontal: 16 }}>
                            <Slider
                                value={settings.inspectionDepth ?? 1}
                                onValueChange={(v: number) => {
                                    settings.inspectionDepth = v;
                                    showToast(`Set inspection depth to ${settings.inspectionDepth} nested object(s) deep`, getAssetIDByName("toast_copy_link"))
                                }}
                                minimumValue={1}
                                maximumValue={99999}
                                step={1}
                            />
                        </RN.View>
                        <TableRow
                            label="Debug Logs"
                            icon={<TableRowIcon source={getAssetIDByName("debug")} />}
                            onPress={() => navigation.push("VendettaCustomPage", {
                                render: Secret,
                            })}
                            arrow
                        />
                    </TableRowGroup>
                    <TableRowGroup title="Misc">
                        <TableRow
                            label="Restart"
                            icon={<TableRowIcon source={getAssetIDByName("RetryIcon")} />}
                            onPress={() => BundleUpdaterManager.reload()}
                            arrow
                        />
                        <TableRow
                            label="Force Garbage Collection"
                            icon={<TableRowIcon source={getAssetIDByName("trash")} />}
                            onPress={() => window.gc?.()}
                            arrow
                        />
                        <TableRow
                            label="Asset Browser"
                            icon={<TableRowIcon source={getAssetIDByName("ImageTextIcon")} />}
                            onPress={() =>
                            navigation.push("VendettaCustomPage", {
                                title: "Asset Browser",
                                render: AssetBrowser,
                            })
                            
                        }
                            arrow
                        />
                    </TableRowGroup>
                </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
