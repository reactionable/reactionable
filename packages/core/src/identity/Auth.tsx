import { ReactElement } from "react";
import { string } from "yup";

import { keyFromSelector, useTranslation } from "../i18n/I18n";
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
    label: t(keyFromSelector(($) => $["Username"], { ns: "identity" })),
    autoComplete: "email",
    required: true,
  });

  const password = useFormField({
    name: "password",
    label: t(keyFromSelector(($) => $["Password"], { ns: "identity" })),
    type: "password",
    autoComplete: "current-password",
    required: true,
  });

  return useForm({
    title: t(keyFromSelector(($) => $["Sign In"], { ns: "identity" })),
    submitButton: t(keyFromSelector(($) => $["Sign In"], { ns: "identity" })),
    validationSchema: {
      username: string()
        .email(
          t(keyFromSelector(($) => $["Username is not a valid email"], { ns: "identity" }))
        )
        .required(t(keyFromSelector(($) => $["Username is required"], { ns: "identity" }))),
      password: string().required(
        t(keyFromSelector(($) => $["Password is required"], { ns: "identity" }))
      ),
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
