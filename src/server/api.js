const GitHub = require('@octokit/rest');

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = async (req, res, next) => {
  const github = new GitHub();
  try {
    console.log('running ');
    const ourDate = new Date();
    const pastDate = ourDate.getDate() - 7;
    ourDate.setDate(pastDate);

    const { data } = await github.repos.listCommits({ owner: 'mikhail-weiss', repo: 'done' });
    console.log(`Number of commits: ${data.length}`);

    const result = {};
    await Promise.all(data.map(async (item) => {
      const { data: commit } = await github.repos.getCommit({ owner: 'mikhail-weiss', repo: 'done', sha: item.sha });
      console.log(`Date ${commit.commit.committer.date}`);
      console.log(`Total ${commit.stats.total}`);


      const date = new Date(commit.commit.committer.date).toISOString().substring(0, 10);
      const dayTotal = result[commit.commit.committer.date];
      result[date] = dayTotal ? dayTotal + commit.stats.total : commit.stats.total;

      console.log(`Total ${result[commit.commit.committer.date]}`);
    }));

    console.log(`date: ${new Date(data[0].commit.author.date).toDateString()}`);
    console.log(`today: ${new Date().toDateString()}`);
    console.log(`result: ${JSON.stringify(result)}`);

    res.json(Object.entries(result).map(([date, value]) => ({ date, value })));
  } catch (error) {
    next(error);
  }
};