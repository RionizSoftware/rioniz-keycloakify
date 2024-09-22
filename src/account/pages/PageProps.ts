import {
    type TemplateProps,
    type ClassKey
} from "rionizkeycloakify/account/TemplateProps";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";

export type PageProps<NarrowedKcContext, I18n> = {
    Template: LazyOrNot<(props: TemplateProps<any, any>) => JSX.Element | null>;
    kcContext: NarrowedKcContext;
    i18n: I18n;
    doUseDefaultCss: boolean;
    classes?: Partial<Record<ClassKey, string>>;
};
