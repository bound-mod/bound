import { ReactNative as RN } from "@metro/common";
import { Tabs, ErrorBoundary } from "@ui/components";
import { getAssetIDByName } from "@ui/assets";

const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup } = Tabs;

export default function General() {
    return (
        <ErrorBoundary>
            {/* <RN.Image style={{ width: "100%", height: "100%" }} resizeMode="stretch" source={{ uri: "https://bound-mod.github.io/assets/images/fools.png" }} /> */}
            <TableRowGroup>
                <Stack>
                <TableRow
                        label="This page is not finished!"
                        icon={<TableRowIcon source={getAssetIDByName("ic_notification_settings")} />}
                    />
                </Stack>
            </TableRowGroup>
        </ErrorBoundary>
    )
}
