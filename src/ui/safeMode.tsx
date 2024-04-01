import { ReactNative as RN, TextStyleSheet, stylesheet } from "@metro/common";
import { findByName, findByProps } from "@metro/filters";
import { after } from "@lib/patcher";
import { setSafeMode } from "@lib/debug";
import { DeviceManager } from "@lib/native";
import { semanticColors } from "@ui/color";
import { cardStyle } from "@ui/shared";
import { Tabs, Codeblock, ErrorBoundary as _ErrorBoundary, SafeAreaView } from "@ui/components";
import settings from "@lib/settings";

const ErrorBoundary = findByName("ErrorBoundary");

// Let's just pray they have this.
const { BadgableTabBar } = findByProps("BadgableTabBar");

const styles = stylesheet.createThemedStyleSheet({
    container: {
        flex: 1,
        backgroundColor: semanticColors.BACKGROUND_PRIMARY,
        paddingHorizontal: 16,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 16,
        ...cardStyle,
    },
    headerTitle: {
        ...TextStyleSheet["heading-lg/semibold"],
        color: semanticColors.HEADER_PRIMARY,
        marginBottom: 4,
    },
    headerDescription: {
        ...TextStyleSheet["text-sm/medium"],
        color: semanticColors.TEXT_MUTED,
    },
    body: {
        flex: 6,
    },
    footer: {
        flexDirection: DeviceManager.isTablet ? "row" : "column",
        justifyContent: "center",
        marginBottom: 16,
    },
});

interface Tab {
    id: string;
    title: string;
    trimWhitespace?: boolean;
}

interface Button {
    text: string;
    // TODO: Proper types for the below
    variant?: string;
    size?: string;
    onPress: () => void;
}

const tabs: Tab[] = [
    { id: "stack", title: "Stack Trace" },
    { id: "component", title: "Component", trimWhitespace: true },
];

export default () => after("render", ErrorBoundary.prototype, function (this: any, _, ret) {
    if (!(settings.errorBoundaryEnabled ?? true)) return;
    if (!this.state.error) return;

    // Not using setState here as we don't want to cause a re-render, we want this to be set in the initial render
    this.state.activeTab ??= "stack";
    const tabData = tabs.find(t => t.id === this.state.activeTab);
    const errorText: string = this.state.error[this.state.activeTab];

    // This is in the patch and not outside of it so that we can use `this`, e.g. for setting state
    const buttons: Button[] = [
        { text: "Restart Discord", onPress: this.handleReload },
        ...!settings.safeMode?.enabled ? [{ text: "Restart in Recovery Mode", onPress: setSafeMode }] : [],
        { variant: "destructive", text: "Retry Render", onPress: () => this.setState({ info: null, error: null }) },
    ]

    return (
        <_ErrorBoundary>
            <SafeAreaView style={styles.container}>
                <RN.View style={styles.header}>
                    <RN.View style={{ flex: 2, marginRight: 4 }}>
                        <RN.Text style={styles.headerTitle}>{ret.props.title}</RN.Text>
                        <RN.Text style={styles.headerDescription}>{ret.props.body}</RN.Text>
                    </RN.View>
                    {ret.props.Illustration && <ret.props.Illustration style={{ flex: 1, resizeMode: "contain", maxHeight: 96, paddingRight: 4 }} /> }
                </RN.View>
                <RN.View style={styles.body}>
                    <Codeblock
                        selectable
                        style={{ flex: 1, textAlignVertical: "top" }}
                    >
                        {/*
                            TODO: I tried to get this working as intended using regex and failed.
                            When trimWhitespace is true, each line should have it's whitespace removed but with it's spaces kept.
                        */}
                        {tabData?.trimWhitespace ? errorText?.split("\n").filter(i => i.length !== 0).map(i => i.trim()).join("\n") : errorText}
                    </Codeblock>
                    <RN.View style={{ marginVertical: 16 }}>
                        {/* Are errors caught by ErrorBoundary guaranteed to have the component stack? */}
                        <BadgableTabBar
                            tabs={tabs}
                            activeTab={this.state.activeTab}
                            onTabSelected={(tab: string) => { this.setState({ activeTab: tab }) }}
                        />
                    </RN.View>
                </RN.View>
                <RN.View style={styles.footer}>
                    {buttons.map(button => {
                        const buttonIndex = buttons.indexOf(button) !== 0 ? 8 : 0;

                        return <Tabs.Button
                            variant={button.variant ?? "primary"}
                            size={button.size ?? "sm"}
                            text={button.text}
                            onPress={button.onPress}
                            style={DeviceManager.isTablet ? { marginLeft: buttonIndex } : { marginTop: buttonIndex }}
                        />
                    })}
                </RN.View>
            </SafeAreaView>
        </_ErrorBoundary>
    )
});
