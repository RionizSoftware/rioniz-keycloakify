import { lazy } from "react";
import { KcAccountUiLoader } from "@rionizkeycloakify/keycloak-account-ui";
import type { KcContext } from "./KcContext";

const KcAccountUi = lazy(() => import("@rionizkeycloakify/keycloak-account-ui/KcAccountUi"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    return <KcAccountUiLoader kcContext={kcContext} KcAccountUi={KcAccountUi} />;
}
