# Legal publication review

These UBee pages are publisher-review drafts. They describe the current app behavior inspected in the Flutter repository; they are not legal advice or a claim that UBee complies with every jurisdiction's requirements.

Before publishing or submitting URLs to Google Play, the publisher should:

- Have qualified counsel familiar with Algerian Law 18-07 as amended and relevant markets review the wording, controller identity, lawful bases, user rights, retention and international-transfer language.
- Verify every disclosure against the shipped app, Google Play Data Safety form, AdMob consent/configuration, RevenueCat settings and current SDK behavior. Update the documents whenever those practices change.
- Confirm the named publisher, official privacy contact and support address match the Play listing and publisher records. This draft uses the company contact supplied for the UBee website.
- Confirm the actual Premium products, prices, recurring periods, cancellation and refund behavior in Google Play Console. The pages intentionally avoid hard-coded prices and trials.
- Check the shipped legacy-upgrade reset behavior against the retention section and release notices. Current Flutter code has a one-time shop-data reset that also removes app-managed backup files; users need clear release notice and independently saved exports.
- Publish the privacy-policy URL in Play Console and ensure these legal links are present in the released app. Review the translated French and Arabic text before treating those versions as legally authoritative.
- Deploy the website first and verify every public legal URL returns HTTP 200 before releasing the app links. For Play Console, use `https://ubee.raystate.com/legal/en/privacy-policy/`; the app selects its own language-specific route.

The portable `.ubee` backup is not encrypted by the app. Paired-register sync is local-network device-to-device transfer, not Raystate cloud hosting. Do not remove or weaken those disclosures without confirming a corresponding verified product change.

Reference requirements: [Google Play user data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en), [Google Play subscriptions](https://support.google.com/googleplay/android-developer/answer/9900533?hl=en), [GitHub hosting privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), [RevenueCat privacy](https://www.revenuecat.com/privacy), and Algeria's [2025 law amending Law 18-07](https://www.joradp.dz/FTP/jo-francais/2025/F2025048.pdf).
