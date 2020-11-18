import React, { ChangeEvent, ReactElement, ReactNode, useState } from "react";
import { ComponentType, PropsWithChildren } from "react";

import { useTranslation } from "../../i18n/I18n";

export type ILanguageSelectorItemComponentProps<
  LanguageSelectorItemComponentProps extends { children?: ReactNode } = { children?: ReactNode }
> = LanguageSelectorItemComponentProps;

export type LanguageSelectorItemComponent<
  LanguageSelectorItemComponentProps extends ILanguageSelectorItemComponentProps = ILanguageSelectorItemComponentProps
> = ComponentType<LanguageSelectorItemComponentProps>;

export function LanguageSelectorItemComponent(
  props: PropsWithChildren<ILanguageSelectorItemComponentProps>
): ReactElement {
  return <option value={`${props.children}`} {...props} />;
}

export type ILanguageSelectorComponentProps<
  LanguageSelectorItemComponentProps extends ILanguageSelectorItemComponentProps = ILanguageSelectorItemComponentProps
> = {
  languages: string[];
  current: string;
  ItemComponent?: LanguageSelectorItemComponent<LanguageSelectorItemComponentProps>;
} & Required<Pick<ILanguageSelectorProps, "onSelectLanguage">>;

export type LanguageSelectorComponent<
  LanguageSelectorComponentProps extends ILanguageSelectorComponentProps = ILanguageSelectorComponentProps
> = ComponentType<LanguageSelectorComponentProps>;

export function LanguageSelectorComponent({
  current,
  languages,
  onSelectLanguage,
  ItemComponent = LanguageSelectorItemComponent,
}: PropsWithChildren<ILanguageSelectorComponentProps>): ReactElement {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    onSelectLanguage(language);
  };

  return (
    <select value={current} onChange={handleOnChange}>
      <ItemComponent>{current}</ItemComponent>
      {languages.map((language) => (
        <ItemComponent key={language}>{language}</ItemComponent>
      ))}
    </select>
  );
}

export type ILanguageSelectorProps = {
  onSelectLanguage?: (language: string) => void;
  Component?: LanguageSelectorComponent;
};
export function LanguageSelector({
  Component = LanguageSelectorComponent,
  onSelectLanguage,
  ...props
}: ILanguageSelectorProps): ReactElement {
  const { i18n } = useTranslation();

  const [current, setLanguage] = useState(i18n.language);

  const handleOnSelectLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    onSelectLanguage && onSelectLanguage(language);
  };

  const languages = i18n.options.supportedLngs
    ? i18n.options.supportedLngs.filter((lng) => ![current, "cimode"].includes(lng))
    : [];

  return (
    <Component
      languages={languages}
      current={current}
      onSelectLanguage={handleOnSelectLanguage}
      {...props}
    />
  );
}
