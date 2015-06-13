# cookie-law
JavaScript plugin for Cookie Policy / Law.

Self-contained plugin to support Italian cookie policy. Currently supports Italian and English.

It requires jQuery.

## Basic documentation (more to follow)
The following example injects a bar, with the styling specified in the `style` attribute (bottom), Italian text, a link to
`/cookie-policy.html` URL, and injects Google Analytics.

Google Analytics will be anonymous till the cookie policy is accepted.

When the button "Close" is clicked, the cookie policy is accepted, the page is reloaded and all the cookies (including GA) are enabled.

```
var cookieLaw = new window.cookieLawLibrary({
  language: 'it',
  url: '/cookie-policy.html',
  style: {
    bar: 'position: fixed; top: 0; left: 0; width: 100%; z-index: 9999; background: rgba(0,0,0,.7); height: auto; line-height: 24px; color: #eeeeee; text-align: center; padding: 3px 0; ',
    paragraph: 'margin: 0; padding: 0; font-size: 11px; color: #fff;',
    link: 'color: #ffffff; display: inline-block; border-radius: 3px; text-decoration: none; padding: 0px 6px; margin-left: 8px; line-height: 16px; text-decoration: underline;',
    button: 'background: #89bb47; color: #333; text-decoration: none;'
  },
  googleAnalytics: [
    ['_setAccount', 'UA-XXXXXXXX-Y'],
    ['_trackPageview']
  ]
});
```


