// https://github.com/maisymoe/strife/blob/54f4768ef41d66e682a0917b078129df5c34f0f8/plugins/Mockups/src/shared/TabulatedScreen.tsx

import { TabulatedScreenProps, TabulatedScreenTab } from "@types";
import { React, ReactNative as RN } from "@metro/common";
import { findByProps } from "@metro/filters";

const { BadgableTabBar } = findByProps("BadgableTabBar");

export default ({ tabs }: TabulatedScreenProps) => {
    const [activeTab, setActiveTab] = React.useState<TabulatedScreenTab>(tabs[0]);

    return (
        <RN.View style={{ flex: 1 }}>
            {activeTab.render && <activeTab.render />}
            <RN.View style={{ marginTop: "auto", padding: 16 }}>
                <BadgableTabBar
                    tabs={tabs}
                    activeTab={activeTab.id}
                    onTabSelected={(id: string) => {
                        const tab = tabs.find(t => t.id === id);
                        if (!tab) return;

                        tab.onPress?.(tab.id);
                        tab.render && setActiveTab(tab);
                    }}
                />
            </RN.View>
        </RN.View>
    )
}
