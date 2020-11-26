import Button from "@material-ui/core/Button/Button";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Translate from "@material-ui/icons/Translate";
import {
  LanguageSelector as CoreLanguageSelector,
  ILanguageSelectorComponentProps as ICoreLanguageSelectorComponentProps,
  ILanguageSelectorItemComponentProps as ICoreLanguageSelectorItemComponentProps,
  ILanguageSelectorProps as ICoreLanguageSelectorProps,
} from "@reactionable/core/lib/ui/i18n/language-selector/LanguageSelector";
import React, { ComponentProps, ComponentType, PropsWithChildren, ReactElement } from "react";

export type ILanguageSelectorItemComponentProps = ICoreLanguageSelectorItemComponentProps<
  ComponentProps<typeof MenuItem>
>;

export type ILanguageSelectorComponentProps = ComponentProps<typeof Button> &
  Omit<ICoreLanguageSelectorComponentProps, "ItemComponent">;

export type LanguageSelectorComponent = ComponentType<ILanguageSelectorComponentProps>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      minWidth: theme.spacing(15),
    },
  })
);
export function LanguageSelectorComponent({
  current,
  languages,
  onSelectLanguage,
  ...props
}: PropsWithChildren<ILanguageSelectorComponentProps>): ReactElement {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
        <MenuItem className={classes.item} disabled selected>
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
