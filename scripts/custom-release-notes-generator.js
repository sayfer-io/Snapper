(async () => {
  const releaseNotesGenerator = await import(
    "@semantic-release/release-notes-generator"
  );

  module.exports = {
    ...releaseNotesGenerator,
    writerOpts: {
      transform: (commit, context) => {
        // Log the commit being processed for debugging purposes
        console.log("Processing commit:", commit);

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

        // Log the updated commit type for debugging
        console.log("Updated commit type:", commit.type);

        if (commit.scope === "*") {
          commit.scope = "";
        }
        if (typeof commit.hash === "string") {
          commit.shortHash = commit.hash.substring(0, 7);
        }
        if (typeof commit.subject === "string") {
          console.log("Original commit subject:", commit.subject);

          const match = commit.subject.match(/#(\d+)/g);
          commit.subject = commit.subject.replace(
            /#(\d+)/g,
            (_, issue) =>
              `[#${issue}](https://github.com/${context.owner}/${context.repository}/issues/${issue})`
          );

          // Log the updated commit subject for debugging
          console.log("Updated commit subject:", commit.subject);
        }
        return commit;
      },
      groupBy: "type",
      commitGroupsSort: "title",
      commitsSort: ["scope", "subject"],
    },
  };
})();
