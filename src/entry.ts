import { ClientInfoManager } from "@lib/native";

// This logs in the native logging implementation, e.g. logcat
console.log("Binding your Discord app in chains...");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;

// Prevent Discord from assigning the broken toString polyfill, so the app loads on 221.6+
const origToString = Function.prototype.toString;
Object.defineProperty(Function.prototype, "toString", {
    value: origToString,
    configurable: true,
    writable: false,
});

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Failed to bind your Discord app!\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Bound: ${__vendettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});
