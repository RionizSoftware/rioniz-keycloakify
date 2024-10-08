import type { ExtendKcContext, KcContext as KcContextBase } from "./KcContext";
import type { LoginThemePageId } from "rionizkeycloakify/bin/shared/constants";
import type { DeepPartial } from "rionizkeycloakify/tools/DeepPartial";
import { deepAssign } from "rionizkeycloakify/tools/deepAssign";
import { structuredCloneButFunctions } from "rionizkeycloakify/tools/structuredCloneButFunctions";
import { kcContextMocks, kcContextCommonMock } from "./kcContextMocks";
import { exclude } from "tsafe/exclude";

export function createGetKcContextMock<
    KcContextExtension extends { properties?: Record<string, string | undefined> },
    KcContextExtensionPerPage extends Record<`${string}.ftl`, Record<string, unknown>>
>(params: {
    kcContextExtension: KcContextExtension;
    kcContextExtensionPerPage: KcContextExtensionPerPage;
    overrides?: DeepPartial<KcContextExtension & KcContextBase.Common>;
    overridesPerPage?: {
        [PageId in LoginThemePageId | keyof KcContextExtensionPerPage]?: DeepPartial<
            Extract<
                ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>,
                { pageId: PageId }
            >
        >;
    };
}) {
    const {
        kcContextExtension,
        kcContextExtensionPerPage,
        overrides: overrides_global,
        overridesPerPage: overridesPerPage_global
    } = params;

    type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

    function getKcContextMock<
        PageId extends LoginThemePageId | keyof KcContextExtensionPerPage
    >(params: {
        pageId: PageId;
        overrides?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
    }): Extract<KcContext, { pageId: PageId }> {
        const { pageId, overrides } = params;

        const kcContextMock = structuredCloneButFunctions(
            kcContextMocks.find(kcContextMock => kcContextMock.pageId === pageId) ?? {
                ...kcContextCommonMock,
                pageId
            }
        );

        [
            kcContextExtension,
            kcContextExtensionPerPage[pageId],
            overrides_global,
            overridesPerPage_global?.[pageId],
            overrides
        ]
            .filter(exclude(undefined))
            .forEach(overrides =>
                deepAssign({
                    target: kcContextMock,
                    source: overrides
                })
            );

        // @ts-expect-error
        return kcContextMock;
    }

    return { getKcContextMock };
}
