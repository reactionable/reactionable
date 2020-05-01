# Amplify documentation

## FAQ

### Customize amplify theme

You can customize your css : https://docs.amplify.aws/ui/customization/theming/q/framework/react

Or via function `useIdentityContextProviderProps` which accept all options supported by amplify UI thme (https://docs.amplify.aws/lib/auth/customui/q/platform/js#customize-ui-theme)

```js
useIdentityContextProviderProps({
    theme: {
        button: {
            'backgroundColor': '#6918b4',
            'borderColor': '#6918b4',
        },
    },
}),
```
