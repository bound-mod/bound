import { ReactNative as RN } from "@metro/common";
import { ErrorBoundary } from "@ui/components";

export default function General() {
    return (
        <ErrorBoundary>
            <RN.Image style={{ width: "100%", height: "100%" }} resizeMode="stretch" source={{ uri: "https://bound-mod.github.io/assets/images/fools.png" }} />
        </ErrorBoundary>
    )
}
