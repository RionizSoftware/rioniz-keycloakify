import type { KcContextLike } from "@rionizkeycloakify/keycloak-account-ui";
import type { KcEnvName } from "../kc.gen";

export type KcContext = KcContextLike & {
    themeType: "account";
    properties: Record<KcEnvName, string>;
};
