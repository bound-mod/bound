import { CodeblockProps } from "@types";
import { ReactNative as RN, stylesheet, constants } from "@metro/common";
import { semanticColors } from "@ui/color";
import { cardStyle } from "@ui/shared";

const styles = stylesheet.createThemedStyleSheet({
    codeBlock: {
        ...cardStyle,
        color: semanticColors.TEXT_NORMAL,
        fontFamily: constants.Fonts.CODE_SEMIBOLD,
        fontSize: 12,
        textAlignVertical: "center",
        paddingHorizontal: 12,
    },
});

// iOS doesn't support the selectable property on RN.Text...
const InputBasedCodeblock = ({ style, children }: CodeblockProps) => <RN.TextInput editable={false} multiline style={[styles.codeBlock, style && style]} value={children} />
const TextBasedCodeblock = ({ selectable, style, children }: CodeblockProps) => <RN.Text selectable={selectable} style={[styles.codeBlock, style && style]}>{children}</RN.Text>

export default function Codeblock({ selectable, style, children }: CodeblockProps) {
    if (!selectable) return <TextBasedCodeblock style={style} children={children} />;
    
    return RN.Platform.select({
        ios: <InputBasedCodeblock style={style} children={children} />,
        default: <TextBasedCodeblock style={style} children={children} selectable />,
    });
}
