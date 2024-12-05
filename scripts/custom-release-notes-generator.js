module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      const issues = [];
      commit.notes.forEach((note) => {
        note.title = "BREAKING CHANGES";
      });
      if (commit.type === "feat") {
        commit.type = "Features";
      } else if (commit.type === "fix") {
        commit.type = "Bug Fixes";
      } else if (commit.type === "chore") {
        commit.type = "Chores";
      } else if (commit.type === "refactor") {
        commit.type = "Refactors";
      } else if (commit.type === "test") {
        commit.type = "Tests";
      } else if (commit.type === "ci") {
        commit.type = "CI/CD";
      } else if (!commit.type || commit.type === "*") {
        commit.type = "Miscellaneous";
      }
      if (commit.scope === "*") {
        commit.scope = "";
      }
      if (typeof commit.hash === "string") {
        commit.shortHash = commit.hash.substring(0, 7);
      }
      if (typeof commit.subject === "string") {
        const match = commit.subject.match(/#(\d+)/g);
        if (match) {
          match.forEach((issue) => {
            issues.push(issue);
          });
        }
        commit.subject = commit.subject.replace(
          /#(\d+)/g,
          (_, issue) =>
            `[#${issue}](https://github.com/${context.owner}/${context.repository}/issues/${issue})`
        );
      }
      commit.references = commit.references.concat(issues);
      return commit;
    },
  },
};
