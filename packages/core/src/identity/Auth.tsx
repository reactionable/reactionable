import { ReactElement } from "react";
import { string } from "yup";

import { useTranslation } from "../i18n/I18n";
import { useUIContext } from "../ui/UI";
import { useIdentityContext } from "./Identity";

export function Auth(): ReactElement {
  const { t } = useTranslation("identity");
  const { login } = useIdentityContext();

  const { useForm, useFormField } = useUIContext();

  const username = useFormField({
    autoFocus: true,
    type: "email",
    name: "username",
    label: t("Email"),
    autoComplete: "email",
    required: true,
  });

  const password = useFormField({
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    required: true,
  });

  return useForm({
    title: t("Sign In"),
    submitButton: t("Sign In"),
    validationSchema: {
      username: string().email(t("User email is not valid")).required(t("User email is required")),
      password: string().required(t("User password is required")),
    },
    initialValues: { username: "", password: "" },
    onSubmit: login,
    children: (
      <>
        {username}
        {password}
      </>
    ),
  });
}
