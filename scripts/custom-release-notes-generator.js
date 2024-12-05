(async () => {
  const releaseNotesGenerator = await import(
    "@semantic-release/release-notes-generator"
  );

  module.exports = {
    ...releaseNotesGenerator,
    writerOpts: {
      transform: (commit, context) => {
        const issues = [];
        commit.notes.forEach((note) => {
          note.title = "BREAKING CHANGES";
        });
        switch (commit.type) {
          case "feat":
            commit.type = "Features";
            break;
          case "fix":
            commit.type = "Bug Fixes";
            break;
          case "chore":
            commit.type = "Chores";
            break;
          case "refactor":
            commit.type = "Refactors";
            break;
          case "test":
            commit.type = "Tests";
            break;
          case "ci":
            commit.type = "CI/CD";
            break;
          default:
            commit.type = "Miscellaneous";
            break;
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
        return commit;
      },
      groupBy: "type",
      commitGroupsSort: "title",
      commitsSort: ["scope", "subject"],
    },
  };
})();
