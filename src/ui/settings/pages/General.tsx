import { ReactNative as RN, NavigationNative, url } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { setSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { plugins } from "@lib/plugins";
import { themes } from "@lib/themes";
import { showToast } from "@ui/toasts";
import { getAssetIDByName } from "@ui/assets";
import { Tabs, ErrorBoundary } from "@ui/components";
import settings from "@lib/settings";
import Developer from "@ui/settings/pages/Developer";
import Secret from "@ui/settings/pages/Secret";

const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup } = Tabs;

export default function General() {
    const navigation = NavigationNative.useNavigation();

    useProxy(settings);
    useProxy(plugins);
    useProxy(themes);

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, alignItems: "center" }}>
                <Stack spacing={16}>
                    <TableRowGroup>
                        <TableSwitchRow
                            label="Recovery Mode"
                            subLabel="Avoids loading addons to prevent crashing."
                            icon={<TableRowIcon source={getAssetIDByName("ic_message_retry")} />}
                            value={settings.safeMode?.enabled}
                            onValueChange={(v: boolean) => {
                                setSafeMode(v);
                                // hack
                                settings.safeMode!.enabled = v;
                            }}
                        />
                    </TableRowGroup>
                    <TableRowGroup>
                        <TableRow
                            label="Toast Settings"
                            icon={<TableRowIcon source={getAssetIDByName("ic_notification_settings")} />}
                            onPress={() => navigation.push("VendettaCustomPage", {
                                title: "Unfinished Page",
                                render: Secret,
                            })}
                            arrow
                        />
                        <TableRow
                            label="Development Settings"
                            icon={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                            onPress={() => navigation.push("VendettaCustomPage", { title: "Development Settings", render: Developer })}
                            arrow
                        />
                    </TableRowGroup>
                    <TableRowGroup title="Info">
                        <TableRow
                            label="Installed Plugins"
                            icon={<TableRowIcon source={getAssetIDByName("ic_wand")} />}
                            trailing={<TableRow.TrailingText text={Object.keys(plugins).length} />}
                        />
                        <TableRow
                            label="Installed Themes"
                            icon={<TableRowIcon source={getAssetIDByName("ic_paint_brush")} />}
                            trailing={<TableRow.TrailingText text={Object.keys(themes).length} />}
                        />
                    </TableRowGroup>
                    <TableRowGroup title="Links">
                        <TableRow
                            label="Discord Server"
                            icon={<TableRowIcon source={getAssetIDByName("Discord")} />}
                            onPress={() => url.openDeeplink(DISCORD_SERVER)}
                            arrow
                        />
                        <TableRow
                            label="GitHub"
                            icon={<TableRowIcon source={getAssetIDByName("img_account_sync_github_white")} />}
                            onPress={() => url.openURL(GITHUB)}
                            arrow
                        />
                        <TableRow
                            label="Twitter"
                            icon={<TableRowIcon source={getAssetIDByName("img_account_sync_x_white")} />}
                            onPress={() => showToast("nuh uh")}
                            arrow
                        />
                    </TableRowGroup>
                </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
