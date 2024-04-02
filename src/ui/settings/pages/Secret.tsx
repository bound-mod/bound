import { ReactNative as RN } from "@metro/common";
import { Tabs, ErrorBoundary } from "@ui/components";
import { getAssetIDByName } from "@ui/assets";
import { showToast } from "@/ui/toasts";

const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup } = Tabs;

export default function General() {
    return (
        <ErrorBoundary>
            {/* <RN.Image style={{ width: "100%", height: "100%" }} resizeMode="stretch" source={{ uri: "https://bound-mod.github.io/assets/images/fools.png" }} /> */}
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, alignItems: "center" }}>
            <TableRowGroup>
                <Stack spacing={16}>
                <TableRow
                            label="This page isn't done!"
                            icon={<TableRowIcon source={getAssetIDByName("ic_notification_settings")} />}
                            onPress={() => showToast(`What are you doing?`,getAssetIDByName("alert"))
                            }
                            arrow
                        />
                </Stack>
            </TableRowGroup>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
