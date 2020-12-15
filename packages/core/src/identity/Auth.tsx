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
    label: t("Username"),
    autoComplete: "email",
    required: true,
  });

  const password = useFormField({
    name: "password",
    label: t("Password"),
    type: "password",
    autoComplete: "current-password",
    required: true,
  });

  return useForm({
    title: t("Sign In"),
    submitButton: t("Sign In"),
    validationSchema: {
      username: string()
        .email(t("Username is not a valid email"))
        .required(t("Username is required")),
      password: string().required(t("Password is required")),
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
