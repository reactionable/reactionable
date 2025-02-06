import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Translate from "@mui/icons-material/Translate";
import {
  LanguageSelector as CoreLanguageSelector,
  ILanguageSelectorComponentProps as ICoreLanguageSelectorComponentProps,
  ILanguageSelectorItemComponentProps as ICoreLanguageSelectorItemComponentProps,
  ILanguageSelectorProps as ICoreLanguageSelectorProps,
} from "@reactionable/core";
import { ComponentProps, ComponentType, PropsWithChildren, ReactElement, useState } from "react";

export type ILanguageSelectorItemComponentProps = ICoreLanguageSelectorItemComponentProps<
  ComponentProps<typeof MenuItem>
>;

export type ILanguageSelectorComponentProps = ComponentProps<typeof Button> &
  Omit<ICoreLanguageSelectorComponentProps, "ItemComponent">;

export type LanguageSelectorComponent = ComponentType<ILanguageSelectorComponentProps>;

export function LanguageSelectorComponent({
  current,
  languages,
  onSelectLanguage,
  ...props
}: PropsWithChildren<ILanguageSelectorComponentProps>): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (language: string) => {
    onSelectLanguage(language);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        {...props}
        aria-controls="language-selector-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<Translate />}
        endIcon={<ArrowDropDownIcon />}
      >
        {current}
      </Button>
      <Menu
        id="language-selector-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          disabled
          selected
          sx={{
            minWidth: (theme) => theme.spacing(15),
          }}
        >
          {current}
        </MenuItem>
        {languages.map((language) => (
          <MenuItem key={language} onClick={() => handleItemClick(language)}>
            {language}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export type ILanguageSelectorProps = Omit<ICoreLanguageSelectorProps, "Component"> &
  ComponentProps<typeof Button>;
export function LanguageSelector(props: ILanguageSelectorProps): ReactElement {
  return <CoreLanguageSelector Component={LanguageSelectorComponent} {...props} />;
}
