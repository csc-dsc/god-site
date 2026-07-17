export const meta = {
  name: "god-site-init",
  description: "GOD 综合技术平台项目初始化。每次会话开始时自动执行，读取 CONTEXT.md 和 session-log.md 获取项目上下文，并注入 Git 快照/回滚规则。"
};

const PROJECT_ROOT = "D:\\Desktop\\网安,ctf\\god-site";

export default async function () {
  phase("GOD 站点项目初始化");

  // === 1. 读取项目上下文 ===
  const contextPath = `${PROJECT_ROOT}\\CONTEXT.md`;
  const sessionLogPath = `${PROJECT_ROOT}\\session-log.md`;

  const [contextContent, sessionLogContent] = await Promise.all([
    readFile(contextPath).catch(() => null),
    readFile(sessionLogPath).catch(() => null)
  ]);

  if (!contextContent) {
    log(`⚠️ 未找到 ${contextPath}，跳过上下文加载`);
    return { status: "partial", context_loaded: false };
  }

  // === 2. 提取关键信息 ===
  const contextLines = contextContent.split("\n");
  const logLines = sessionLogContent ? sessionLogContent.split("\n") : [];

  // 提取当前阶段
  const phaseLine = contextLines.find(l => l.includes("当前阶段"));
  const currentPhase = phaseLine ? phaseLine.split("：")[1]?.trim() || "未知" : "未知";

  // 提取已装/待装软件
  const installedSoftware = contextLines
    .filter(l => l.includes("✅"))
    .map(l => l.replace(/[|✅❌\s-]/g, "").trim());

  const pendingSoftware = contextLines
    .filter(l => l.includes("❌"))
    .map(l => l.replace(/[|✅❌\s-]/g, "").trim());

  // 提取最新日志条目
  const latestLogEntry = logLines.slice(0, 10).join("\n");

  // === 3. 初始化 Git（如尚未初始化）===
  const gitStatus = await new Promise(resolve => {
    const { execSync } = require("child_process");
    try {
      execSync("git status", { cwd: PROJECT_ROOT, stdio: "pipe" });
      resolve("initialized");
    } catch {
      resolve("not_initialized");
    }
  });

  if (gitStatus === "not_initialized") {
    log("📦 首次运行，初始化 Git 仓库...");
    await new Promise(resolve => {
      const { execSync } = require("child_process");
      try {
        execSync("git init", { cwd: PROJECT_ROOT, stdio: "pipe" });
        execSync("git add -A", { cwd: PROJECT_ROOT, stdio: "pipe" });
        execSync('git commit -m "chore: initial commit via god-site-init workflow"', { cwd: PROJECT_ROOT, stdio: "pipe" });
        log("✅ Git 仓库已初始化并完成首次提交");
      } catch (e) {
        log(`⚠️ Git 初始化出错: ${e.message}`);
      }
    });
  }

  // === 4. 输出结果 ===
  const result = {
    status: "success",
    project_root: PROJECT_ROOT,
    current_phase: currentPhase,
    installed_software: installedSoftware,
    pending_software: pendingSoftware,
    context_file: contextPath,
    session_log_file: sessionLogPath,
    git_status: gitStatus,
    latest_log: latestLogEntry
  };

  log(`\n========== GOD 站点项目上下文 ==========`);
  log(`项目根目录: ${PROJECT_ROOT}`);
  log(`当前阶段: ${currentPhase}`);
  log(`已安装: ${installedSoftware.join(", ") || "无"}`);
  log(`待安装: ${pendingSoftware.join(", ") || "无"}`);
  log(`Git 状态: ${gitStatus}`);
  log(`\n========== Git 安全规则（硬性） ==========`);
  log(`1. 每次会话开始自动读取 CONTEXT.md + session-log.md`);
  log(`2. 大量删除代码前必须先 git commit 快照`);
  log(`3. 回滚操作前必须先 git commit 快照`);
  log(`4. 保持快照目录 snapshots/ 可用`);
  log(`========================================\n`);

  return result;
}
