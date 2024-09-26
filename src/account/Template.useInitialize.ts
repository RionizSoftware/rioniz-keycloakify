import { assert } from "rionizkeycloakify/tools/assert";
import { useInsertLinkTags } from "rionizkeycloakify/tools/useInsertLinkTags";
import type { KcContext } from "rionizkeycloakify/account/KcContext";

export type KcContextLike = {
    url: {
        resourcesCommonPath: string;
        resourcesPath: string;
    };
};

assert<keyof KcContextLike extends keyof KcContext ? true : false>();
assert<KcContext extends KcContextLike ? true : false>();

export function useInitialize(params: {
    kcContext: KcContextLike;
    doUseDefaultCss: boolean;
}) {
    const { kcContext, doUseDefaultCss } = params;

    const { url } = kcContext;

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss
            ? []
            : [
                  `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
                  `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
                  `${url.resourcesPath}/css/account.css`
              ]
    });

    return { isReadyToRender: areAllStyleSheetsLoaded };
}
