const core = require('@actions/core');
const github = require('@actions/github');
const { context } = require('@actions/github/lib/utils');
const fetch = require('node-fetch');

async function go(){
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');

    const randomPos = Math.round(Math.random() * 1000);
    const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
    const response = await fetch(url);
    const { results } = await response.json();
    const gifUrl = results[0].media[0].tinygif.url;

    const octokit = new github.GitHub(GITHUB_TOKEN);

    const { contex = {} } = github;
    const { pull_request } = contex.payload;

    await octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `Obrigado por submeter um pull request!.\n\n <img src="${gifUrl}" alt="muito obrigado"/>`
    });
}

go();