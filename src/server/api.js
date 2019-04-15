const GitHub = require('@octokit/rest');
const http = require('http');
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

    const result = {};
    await Promise.all(data.map(async (item) => {
      const { data: commit } = await github.repos.getCommit({ owner: 'mikhail-weiss', repo: 'done', sha: item.sha });

      const date = new Date(commit.commit.committer.date).toISOString().substring(0, 10);
      const dayTotal = result[commit.commit.committer.date];
      result[date] = dayTotal ? dayTotal + commit.stats.total : commit.stats.total;
    }));

    res.json(Object.entries(result).map(([date, value]) => ({ date, value })));
  } catch (error) {
    next(error);
  }
};

exports.test = () => 'hello';

