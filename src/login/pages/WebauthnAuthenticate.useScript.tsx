import { useEffect } from "react";
import { useInsertScriptTags } from "rionizkeycloakify/tools/useInsertScriptTags";
import { assert } from "rionizkeycloakify/tools/assert";
import { KcContext } from "rionizkeycloakify/login/KcContext/KcContext";

type KcContextLike = {
    url: {
        resourcesPath: string;
    };
    isUserIdentified: "true" | "false";
    challenge: string;
    userVerification: KcContext.WebauthnAuthenticate["userVerification"];
    rpId: string;
    createTimeout: number | string;
};

assert<keyof KcContextLike extends keyof KcContext.WebauthnAuthenticate ? true : false>();
assert<KcContext.WebauthnAuthenticate extends KcContextLike ? true : false>();

type I18nLike = {
    msgStr: (key: "webauthn-unsupported-browser-text") => string;
    isFetchingTranslations: boolean;
};

export function useScript(params: { authButtonId: string; kcContext: KcContextLike; i18n: I18nLike }) {
    const { authButtonId, kcContext, i18n } = params;

    const { url, isUserIdentified, challenge, userVerification, rpId, createTimeout } = kcContext;

    const { msgStr, isFetchingTranslations } = i18n;

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "WebauthnAuthenticate",
        scriptTags: [
            {
                type: "module",
                textContent: () => `

                    import { authenticateByWebAuthn } from "${url.resourcesPath}/js/webauthnAuthenticate.js";
                    const authButton = document.getElementById('${authButtonId}');
                    authButton.addEventListener("click", function() {
                        const input = {
                            isUserIdentified : ${isUserIdentified},
                            challenge : '${challenge}',
                            userVerification : '${userVerification}',
                            rpId : '${rpId}',
                            createTimeout : ${createTimeout},
                            errmsg : ${JSON.stringify(msgStr("webauthn-unsupported-browser-text"))}
                        };
                        authenticateByWebAuthn(input);
                    });
                `
            }
        ]
    });

    useEffect(() => {
        if (isFetchingTranslations) {
            return;
        }

        insertScriptTags();
    }, [isFetchingTranslations]);
}
