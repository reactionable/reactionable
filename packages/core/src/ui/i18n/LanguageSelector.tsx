import React, { ChangeEvent, ReactNode, useState } from 'react';
import { ComponentType, PropsWithChildren } from 'react';

import { useTranslation } from '../../i18n/I18n';

export type ILanguageSelectorItemComponentProps<
  LanguageSelectorItemComponentProps extends { children?: ReactNode } = { children?: ReactNode }
> = LanguageSelectorItemComponentProps;

export type LanguageSelectorItemComponent<
  LanguageSelectorItemComponentProps extends ILanguageSelectorItemComponentProps = ILanguageSelectorItemComponentProps
> = ComponentType<LanguageSelectorItemComponentProps>;

export function LanguageSelectorItemComponent(
  props: PropsWithChildren<ILanguageSelectorItemComponentProps>
) {
  return <option value={`${props.children}`} {...props} />;
}

export type ILanguageSelectorComponentProps<
  LanguageSelectorItemComponentProps extends ILanguageSelectorItemComponentProps = ILanguageSelectorItemComponentProps
> = {
  languages: string[];
  current: string;
  ItemComponent?: LanguageSelectorItemComponent<LanguageSelectorItemComponentProps>;
} & Required<Pick<ILanguageSelectorProps, 'onSelectLanguage'>>;

export type LanguageSelectorComponent<
  LanguageSelectorComponentProps extends ILanguageSelectorComponentProps = ILanguageSelectorComponentProps
> = ComponentType<LanguageSelectorComponentProps>;

export function LanguageSelectorComponent({
  current,
  languages,
  onSelectLanguage,
  ItemComponent = LanguageSelectorItemComponent,
}: PropsWithChildren<ILanguageSelectorComponentProps>) {
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    onSelectLanguage(language);
  };

  return (
    <select value={current} onChange={handleOnChange}>
      <ItemComponent children={current} />
      {languages.map((language) => (
        <ItemComponent key={language} children={language} />
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
}: ILanguageSelectorProps) {
  const {
    i18n: { languages, language, changeLanguage },
  } = useTranslation();
  const [current, setLanguage] = useState(language);

  const handleOnSelectLanguage = (language: string) => {
    setLanguage(language);
    changeLanguage(language);
    onSelectLanguage && onSelectLanguage(language);
  };

  return (
    <Component
      languages={languages.filter((lng) => language !== lng)}
      current={current}
      onSelectLanguage={handleOnSelectLanguage}
      {...props}
    />
  );
}
