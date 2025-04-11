import * as Bun from "bun";

const IS_CI = Boolean(process.env.CI);

if (IS_CI) {
  console.log("CI detected, skipping ./monorepo/scripts/postinstall.ts");
  process.exit(0);
}

console.log("installing simple-git-hooks");
Bun.spawnSync(["bunx", "--bun", "simple-git-hooks"]);

console.log("running monorepo bun run doctor");
Bun.spawnSync(["bun", "run", "doctor"]);
