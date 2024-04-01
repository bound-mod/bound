import { Theme, ButtonColors } from "@types";
import { useProxy } from "@lib/storage";
import { themes } from "@lib/themes";
import { Button, TabulatedScreen } from "@ui/components";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import ThemeCard from "@ui/settings/components/ThemeCard";
import Secret from "@ui/settings/pages/Secret";

export default function Themes() {
    useProxy(settings);

    return (
        <TabulatedScreen tabs={[
            {
                id: "colors",
                title: "Colors",
                render: () => <AddonPage<Theme>
                    items={themes}
                    safeModeMessage={`You are in Recovery Mode, meaning themes have been temporarily disabled.${settings.safeMode?.currentThemeId ? " If a theme appears to be causing the issue, you can press below to disable it persistently." : ""}`}
                    safeModeExtras={settings.safeMode?.currentThemeId ? <Button
                        text="Disable Theme"
                        color={ButtonColors.BRAND}
                        size="small"
                        onPress={() => {
                            delete settings.safeMode?.currentThemeId;
                        }}
                        style={{ marginTop: 8 }}
                    /> : undefined}
                    card={ThemeCard}
                />
            },
            {
                id: "icons",
                title: "Icons",
                render: Secret,
            },
            {
                id: "fonts",
                title: "Fonts",
                render: Secret,
            },
        ]} />
    )
}
