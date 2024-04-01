import { ErrorBoundaryState } from "@types";
import { React, constants, TextStyleSheet } from "@metro/common";
import { Tabs, Forms } from "@ui/components";

export default class ErrorBoundary extends React.PureComponent<React.PropsWithChildren, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasErr: false };

    static getDerivedStateFromError = (error: Error) => ({ hasErr: true, errText: error.message });

    render() {
        if (!this.state.hasErr) return this.props.children;

        return (
            <Tabs.Card style={{ margin: 16 }}>
                <Tabs.Stack>
                    <Forms.FormText style={TextStyleSheet["heading-lg/bold"]}>Uh oh.</Forms.FormText>
                    <Forms.FormText style={{ ...TextStyleSheet["text-xs/normal"], fontFamily: constants.Fonts.CODE_SEMIBOLD, marginBottom: 8 }}>{this.state.errText}</Forms.FormText>
                    <Tabs.Button variant="destructive" text="Retry Render" onPress={() => this.setState({ hasErr: false, errText: undefined })} />
                </Tabs.Stack>
            </Tabs.Card>
        )
    }
} 
