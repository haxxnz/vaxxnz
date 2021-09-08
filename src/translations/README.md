# Contributing Languages

Hey there! Thank you for your interest in helping us translate Vaxx.nz here is what we need you to do!

## How to add a new language

**Ask: Does Vaxx.nz currently support the language I want to contribute?**

**YES**: Please propose any changes to the translations by editing the appropriate `common.json` file in the `/translations` folder.

Then create a Pull Request for us to review.

**NO**: Follow these steps to add a new language...

1. In the `/translations` folder, create a new folder named with the locale into which you are translating.
2. Copy and paste the default translations from `en/common.json` into your folder.
3. Replace the values (NEVER THE KEYS!) from English text into your language, ensuring context is preserved.
4. Import your language in the `resources.ts` file and add it to the `languages` array so that it shows up in the dropdown on the website.
5. Once completed. Test the usability of the page to make sure it follows a consistent language (and formal/informal mentions are consistently applied).
6. Create a Pull Request and get a maintainer to approve. Ideally, you find another speaker of that language to provide a second looks at the chosen words.
7. We merge it and take it live!

## Need a hand?

Reach out to us on Discord.
