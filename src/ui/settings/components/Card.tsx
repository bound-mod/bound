import { ReactNative as RN, stylesheet } from "@metro/common";
import { findByProps } from "@metro/filters";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";
import { Forms, Tabs } from "@ui/components";

const { FormRow } = Forms;
const { RedesignSwitch, RedesignCheckbox } = Tabs;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");

// TODO: These styles work weirdly. iOS has cramped text, Android with low DPI probably does too. Fix?
const styles = stylesheet.createThemedStyleSheet({
    card: {
        backgroundColor: semanticColors?.BACKGROUND_SECONDARY,
        borderRadius: 0,
    },
    header: {
        padding: 0,
        backgroundColor: semanticColors?.BACKGROUND_TERTIARY,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    actions: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    icon: {
        width: 22,
        height: 22,
        marginLeft: 5,
        tintColor: semanticColors?.INTERACTIVE_NORMAL,
    },
})

interface Action {
    icon: string;
    onPress: () => void;
}

interface OverflowAction extends Action {
    label: string;
    isDestructive?: boolean;
}

export interface CardWrapper<T> {
    item: T;
    index: number;
}

interface CardProps {
    index?: number;
    headerLabel: string | React.ComponentType;
    headerIcon?: string;
    toggleType?: "switch" | "radio";
    toggleValue?: boolean;
    onToggleChange?: (v: boolean) => void;
    descriptionLabel?: string | React.ComponentType;
    actions?: Action[];
    overflowTitle?: string;
    overflowActions?: OverflowAction[];
}

export default function Card(props: CardProps) {
    let pressableState = props.toggleValue ?? false;

    return ( 
        <RN.View style={[styles.card, { marginTop: props.index !== 0 ? 12 : 0 }]}>
            <FormRow
                style={styles.header}
                label={props.headerLabel}
                leading={props.headerIcon && <FormRow.Icon source={getAssetIDByName(props.headerIcon)} />}
                trailing={props.toggleType && (props.toggleType === "switch" ? 
                    (<RedesignSwitch
                        value={props.toggleValue}
                        onValueChange={props.onToggleChange}
                    />)
                    :
                    (<RN.Pressable onPress={() => {
                        pressableState = !pressableState;
                        props.onToggleChange?.(pressableState)
                    }}>
                        <RedesignCheckbox checked={props.toggleValue} />
                    </RN.Pressable>)
                )}
            />
            <FormRow
                label={props.descriptionLabel}
                trailing={
                    <RN.View style={styles.actions}>
                        {props.overflowActions && <RN.TouchableOpacity
                            onPress={() => showSimpleActionSheet({
                                key: "CardOverflow",
                                header: {
                                    title: props.overflowTitle,
                                    icon: props.headerIcon && <FormRow.Icon style={{ marginRight: 8 }} source={getAssetIDByName(props.headerIcon)} />,
                                    onClose: () => hideActionSheet(),
                                },
                                options: props.overflowActions?.map(i => ({ ...i, icon: getAssetIDByName(i.icon) })),
                            })}
                        >
                            <RN.Image style={styles.icon} source={getAssetIDByName("ic_more_24px")} />
                        </RN.TouchableOpacity>}
                        {props.actions?.map(({ icon, onPress }) => (
                            <RN.TouchableOpacity
                                onPress={onPress}
                            >
                                <RN.Image style={styles.icon} source={getAssetIDByName(icon)} />
                            </RN.TouchableOpacity>
                        ))}
                    </RN.View>
                }
            />
        </RN.View>
    )
}
