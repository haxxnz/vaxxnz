# Contributing Languages

Hey there! Thank you for your interest in helping us translate Vaxx.nz. Here is what we need you to do!

## How to add a new language

**Ask: Does Vaxx.nz currently support the language I want to contribute?**

**YES**: Please propose any changes to the translations by editing the appropriate `common.json` file in the `/translations` folder.

Then create a Pull Request for us to review.

**NO**: Follow these steps to add a new language...

1. Find your locale code here:
   - https://en.wikipedia.org/wiki/Language_localisation
   - or https://www.science.co.il/language/Locale-codes.php
2. Add the new locale entry e.g. `vi-VN` in [index.ts](index.ts).

   E.g.

   ```javascript
   supportedLngs: [
     "en-NZ",
     "es-ES",
     "de-DE",
     "ru-RU",
     "zh-CN",
     "zh-TW",
     "ms-MY",
     "vi-VN", // new locale entry
   ];
   ```

3. Duplicate the default translations from `common_en.json` into a file called `common_[LOCALE].json`

   E.g. `common_vi-VN.json`

4. Replace the values **(NOT THE KEYS!)** from English text into your language, ensuring context is preserved.
5. Import your language in the `resources.ts` file and add it to the `languages` array so that it shows up in the dropdown on the website.
6. Once completed. Test the usability of the page to make sure it follows a consistent language (and formal/informal mentions are consistently applied).
7. Create a Pull Request and get a maintainer to approve. Ideally, you find another speaker of that language to provide a second look at the chosen words.
8. We merge it and take it live!

## Synchronising Translations

If you feel that translation keys are missing, please do the following:

1. Install `ts-node`:
   ```bash
   $ yarn add ts-node
   ```
2. Sync translation:
   ```bash
   $ yarn run sync:i18n
   ```
   This looks at the `common_en.json` file (source of truth) and syncs its key/value pairs with all other translation files. The console output will tell you how many changes where made to each file. You may then go ahead and add the missing translations.

## Need a hand?

Reach out to us on Discord.
