# Analytics Setup

This site now includes a shared analytics loader and event tracking for:

- page views
- link clicks
- button clicks
- email / Telegram / outbound link clicks
- form submit attempts
- inquiry submission success / error events

## 1. Add your IDs

Edit:

- [analytics-config.js](/Users/fjnervida/Documents/New%20project/ferdienervida-site-clean-v2/analytics-config.js)

Fill in:

```js
window.SITE_ANALYTICS_CONFIG = {
  siteName: "ferdienervida.com",
  gaMeasurementId: "G-XXXXXXXXXX",
  clarityProjectId: "xxxxxxxxxx"
};
```

## 2. Google Analytics 4

Create a GA4 web data stream for `ferdienervida.com`, then paste the Measurement ID into `gaMeasurementId`.

## 3. Microsoft Clarity

Create a Clarity project for `ferdienervida.com`, then paste the project ID into `clarityProjectId`.

## 4. Google Search Console

Search Console is not automatic from code alone. You still need to:

1. Add `ferdienervida.com` as a property in Google Search Console
2. Verify ownership through DNS or the method Google gives you
3. Submit your sitemap if you have one

## Tracked Events

Important events now available once IDs are added:

- `link_click`
- `button_click`
- `form_submit_attempt`
- `inquiry_submit_success`
- `inquiry_submit_validation_error`
- `inquiry_submit_error`

## Notes

- If `gaMeasurementId` and `clarityProjectId` are blank, the analytics code stays idle.
- This setup is safe to deploy before the IDs are added.
