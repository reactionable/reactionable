import {
  LanguageSelector as CoreLanguageSelector,
  ILanguageSelectorComponentProps as ICoreLanguageSelectorComponentProps,
  ILanguageSelectorItemComponentProps as ICoreLanguageSelectorItemComponentProps,
  ILanguageSelectorProps as ICoreLanguageSelectorProps,
} from "@reactionable/core";
import { ComponentProps, ComponentType, ReactElement } from "react";
import { Button, Dropdown, DropdownButton, DropdownButtonProps } from "react-bootstrap";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../icon/Icon";

export type ILanguageSelectorItemComponentProps =
  ICoreLanguageSelectorItemComponentProps<DropdownButtonProps>;

export type ILanguageSelectorComponentProps = ComponentProps<typeof Button> &
  Omit<ICoreLanguageSelectorComponentProps, "ItemComponent">;

export type LanguageSelectorComponent = ComponentType<ILanguageSelectorComponentProps>;

export function LanguageSelectorComponent({
  current,
  languages,
  onSelectLanguage,
  ...props
}: ILanguageSelectorComponentProps): ReactElement {
  const handleItemClick = (language: string) => {
    onSelectLanguage(language);
  };

  const dropdownButtonProps: DropdownButtonProps = {
    id: "language-selector-menu",
    title: props.title ?? "",
    variant: props.variant ?? "secondary",
    ...props,
    onSelect: undefined,
    children: undefined,
  };

  return (
    <DropdownButton {...dropdownButtonProps}>
      <Dropdown.ItemText>
        <Icon icon={faLanguage} />
        {current}
      </Dropdown.ItemText>
      {languages.map((language) => (
        <Dropdown.Item as="button" key={language} onClick={() => handleItemClick(language)}>
          {language}
        </Dropdown.Item>
      ))}
      <Dropdown.Item as="button">Another action</Dropdown.Item>
      <Dropdown.Item as="button">Something else</Dropdown.Item>
    </DropdownButton>
  );
}

export type ILanguageSelectorProps = Omit<ICoreLanguageSelectorProps, "Component"> &
  ComponentProps<typeof Button>;
export function LanguageSelector(props: ILanguageSelectorProps): ReactElement {
  return <CoreLanguageSelector Component={LanguageSelectorComponent} {...props} />;
}
