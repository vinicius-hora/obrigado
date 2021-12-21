const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github/lib/utils');

async function go(){
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

    const octokit = new github.GitHub(GITHUB_TOKEN);

    const { contex = {} } = github;
    const { pull_request } = contex.payload;

    await octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: 'Obrigado por submeter um pull request!'
    });
}

go();