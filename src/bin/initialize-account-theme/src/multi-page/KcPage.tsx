import { Suspense } from "react";
import type { ClassKey } from "rionizkeycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "rionizkeycloakify/account/DefaultPage";
import Template from "rionizkeycloakify/account/Template";

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return <DefaultPage kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={true} />;
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
