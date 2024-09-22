import { lazy, Suspense } from "react";
import { assert, type Equals } from "tsafe/assert";
import type { PageProps } from "rionizkeycloakify/account/pages/PageProps";
import type { KcContext } from "rionizkeycloakify/account/KcContext";
import { I18n } from "rionizkeycloakify/account/i18n";

const Password = lazy(() => import("rionizkeycloakify/account/pages/Password"));
const Account = lazy(() => import("rionizkeycloakify/account/pages/Account"));
const Sessions = lazy(() => import("rionizkeycloakify/account/pages/Sessions"));
const Totp = lazy(() => import("rionizkeycloakify/account/pages/Totp"));
const Applications = lazy(() => import("rionizkeycloakify/account/pages/Applications"));
const Log = lazy(() => import("rionizkeycloakify/account/pages/Log"));
const FederatedIdentity = lazy(() => import("rionizkeycloakify/account/pages/FederatedIdentity"));

export default function DefaultPage(props: PageProps<KcContext, I18n>) {
    const { kcContext, ...rest } = props;

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "password.ftl":
                        return <Password kcContext={kcContext} {...rest} />;
                    case "sessions.ftl":
                        return <Sessions kcContext={kcContext} {...rest} />;
                    case "account.ftl":
                        return <Account kcContext={kcContext} {...rest} />;
                    case "totp.ftl":
                        return <Totp kcContext={kcContext} {...rest} />;
                    case "applications.ftl":
                        return <Applications kcContext={kcContext} {...rest} />;
                    case "log.ftl":
                        return <Log kcContext={kcContext} {...rest} />;
                    case "federatedIdentity.ftl":
                        return <FederatedIdentity kcContext={kcContext} {...rest} />;
                }
                assert<Equals<typeof kcContext, never>>(false);
            })()}
        </Suspense>
    );
}
