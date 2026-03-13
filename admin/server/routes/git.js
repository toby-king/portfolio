import { Router } from "express";
import simpleGit from "simple-git";
import { REPO_ROOT } from "../paths.js";

const router = Router();
const git = simpleGit(REPO_ROOT);

// GET /api/git/status — show current git status
router.get("/status", async (req, res) => {
  try {
    const status = await git.status();
    res.json({
      branch: status.current,
      modified: status.modified,
      created: status.created,
      deleted: status.deleted,
      staged: status.staged,
      isClean: status.isClean(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/git/publish — commit content changes and push
router.post("/publish", async (req, res) => {
  try {
    const { message } = req.body;
    const commitMessage = message || `Content update — ${new Date().toISOString().split("T")[0]}`;

    // Stage only content files
    await git.add(["content/*"]);

    const status = await git.status();
    if (status.staged.length === 0) {
      return res.json({ ok: true, message: "No content changes to publish" });
    }

    await git.commit(commitMessage);
    await git.push();

    res.json({ ok: true, message: `Published: ${commitMessage}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
