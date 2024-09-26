import { type FormAction, type FormFieldError } from "rionizkeycloakify/login/lib/useUserProfileForm";
import type { KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { Attribute } from "rionizkeycloakify/login/KcContext";

export type UserProfileFormFieldsProps<KcContext = any, I18n = any> = {
    id?: string;
    kcContext: Extract<KcContext, { profile: unknown }>;
    i18n: I18n;
    kcClsx: KcClsx;
    onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
    doMakeUserConfirmPassword: boolean;
    BeforeField?: (props: BeforeAfterFieldProps<I18n>) => JSX.Element | null;
    AfterField?: (props: BeforeAfterFieldProps<I18n>) => JSX.Element | null;
};

type BeforeAfterFieldProps<I18n> = {
    id?: string;
    attribute: Attribute;
    dispatchFormAction: React.Dispatch<FormAction>;
    displayableErrors: FormFieldError[];
    valueOrValues: string | string[];
    kcClsx: KcClsx;
    i18n: I18n;
};
