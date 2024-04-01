// https://github.com/pyoncord/Pyoncord/blob/08c6b5ee1580991704640385b715d772859f34b7/src/lib/ui/components/Search.tsx

import { SearchProps } from "@types";
import { ReactNative as RN } from "@metro/common";
import { getAssetIDByName } from "@ui/assets";
import { Tabs } from "@ui/components";

const SearchIcon = () => <RN.Image style={{ transform: [{ scale: 0.8 }] }} source={getAssetIDByName("search")} />;

export default ({ onChangeText, placeholder, style }: SearchProps) => {
    const [query, setQuery] = React.useState("");

    const onChange = (value: string) => {
        setQuery(value);
        onChangeText?.(value);
    };

    return <RN.View style={style}>
            <Tabs.TextInput
                grow
                isClearable
                leadingIcon={SearchIcon}
                placeholder={placeholder ?? "Search"}
                onChange={onChange}
                returnKeyType={"search"}
                size="md"
                autoCapitalize="none"
                autoCorrect={false}
                value={query}
            />
    </RN.View>
};
