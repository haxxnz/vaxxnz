# Vaxx Nz technical guide

This section of the documentation contains a guide for technical users who want to contribute code or documentation to the Vaxx.nz. As a community, we share rules of behavior and interaction. Make sure you are familiar with the [community guidelines](CODE_OF_CONDUCT.md) before continuing.

Users who are new to development should start by setting up their environment. Then, they should try a simple code change. After that, you should find something to work on or propose a totally new change.

If you are a programming prodigy, you still may find this documentation useful. Please feel free to skim past information you find obvious or boring.

## How to get started

### Task 1. Get a GitHub account

To contribute to the Vaxxnz project, you will need a <a
href="https://github.com" target="_blank">GitHub account</a>. A free account is
fine. All the Vaxxnz repositories are public and visible to everyone.

You should also have some experience using both the GitHub application and `git`
on the command line. But if you prefer, there's a GUI version available too.

### Task 2. Install git

Install `git` on your local system. You can check if `git` is on already on your
system and properly installed with the following command:

```bash
$ git --version
```

Your version may be
different depending on your OS.

### Task 3. Fork the repository

Before contributing, you first fork the Vaxxnz code repository. A fork copies a repository at a particular point in time. GitHub tracks for you where a fork originates.

As you make contributions, you change your fork's code. When you are ready, you make a pull request back to the original Vaxxnz repository. If you aren't familiar with this workflow, don't worry, you can contact us at [Discord](https://discord.com/channels/884578058911219743/884714023323586600) for help.

### Task 4. Check for required tools

We recommend [VSCode](https://code.visualstudio.com/) for development use. Our team uses Yarn as package manager instead of NPM so make sure you installed it locally. We also use Prettier to ensure consistent code formatting, please make sure your code is formatted before submitting a pull request (VSCode has an extension that can run on save).

Make sure you have these tools installed locally:

- Node JS ([download](https://nodejs.org/en/download/))
- Yarn v1 ([download](https://classic.yarnpkg.com/lang/en/))
- Prettier ([download](https://prettier.io/)

### Task 5. Start development

- Have a look at [good first issues](https://github.com/CovidEngine/vaxxnz/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). It's a list of issues which are more straight forward than other ones and easier to get started with.

- Have a look at other [open issues](https://github.com/CovidEngine/vaxxnz/issues) and see if anyone needs any help investigating a problem or bug

- [Review our roadmap ](https://github.com/CovidEngine/vaxxnz/projects/2) and join the discussion

- Propose a new idea or feature by [Creating an issue](https://github.com/CovidEngine/vaxxnz/issues)

### Task 6. Start development

Clone your fork repo to local machine and navigate to the repo from commandline

Install dependency with command `yarn install`

Available Commands:

1. `yarn start` - starts the development server with hot reloading enabled

2. `yarn build` - bundles the code

Once you see the message:

```shell
Compiled successfully!

You can now view vaxxnz in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.6:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

You are good to start coding!

## Making a Pull Request
When you make a Pull Request, we would highly appreciate if you tick this checkbox:

![allow-maintainers-to-make-edits-sidebar-checkbox](https://user-images.githubusercontent.com/2031472/134484350-7a25d09c-56fc-41fe-bff0-6341ba4d7699.png)

This will allow us to push a commit to your branch if you accidentally made a mistake! That makes the process smoother by avoiding back-and-forth.

## Help! I'm stuck!

If you need any help, we have our [Discord Server](https://discord.gg/nkbnqhR8A8). Feel free to join and ask us anything, we don't bite!

If you need some guidance of what to do or are stuck on an issue feel free to message in the #dev channel or @Oliver for help.
