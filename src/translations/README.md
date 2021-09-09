# Contributing Languages

Hey there! Thank you for your interest in helping us translate Vaxx.nz. Here is what we need you to do!

## How to add a new language

**Ask: Does Vaxx.nz currently support the language I want to contribute?**

**YES**: Please propose any changes to the translations by editing the appropriate `common.json` file in the `/translations` folder.

Then create a Pull Request for us to review.

**NO**: Follow these steps to add a new language...

1. Duplicate the default translations from `common_en.json` into a file called `common_[LOCALE].json`.
2. Replace the values (NEVER THE KEYS!) from English text into your language, ensuring context is preserved.
3. Import your language in the `resources.ts` file and add it to the `languages` array so that it shows up in the dropdown on the website.
4. Once completed. Test the usability of the page to make sure it follows a consistent language (and formal/informal mentions are consistently applied).
5. Create a Pull Request and get a maintainer to approve. Ideally, you find another speaker of that language to provide a second look at the chosen words.
6. We merge it and take it live!

## Synchronising Translations

If you feel that translation keys are missing, please run `yarn run sync:i18n`

This looks at the `common_en.json` file (source of truth) and syncs its key/value pairs with all other translation files. The console output will tell you how many changes where made to each file. You may then go ahead and add the missing translations.

## Need a hand?

Reach out to us on Discord.
