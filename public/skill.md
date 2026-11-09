# 安装 Vibe Design Skill

这份文件是给 AI agent 读的安装说明。人也能读——下面每一步都是明文命令，装之前可以先看清楚。

Vibe Design 是一个网页风格参考库：30 种风格，每种带中英说明、从演示源码提取的示例 Tokens、避坑清单、长期 DESIGN.md 起点和独立 HTML 参考实现。默认先读项目简报、品牌规则和已有 DESIGN.md，再改造现有页面并验收。

无需安装也能读取：[Agent 索引](https://v2ai.org/vibe-design/markdown/index.md) · [全部机读文档](https://v2ai.org/vibe-design/llms-full.txt)。这些资料不承诺模型生成效果；实际页面仍需浏览器与功能检查。

来源：https://v2ai.org/vibe-design · https://github.com/ai-graveyard/vibe-design · MIT

---

## 给 AI agent 的安装步骤

**第 1 步 · 选目标目录。** 看你自己运行在哪个工具里：

| 工具 | 目标目录 |
| :-- | :-- |
| Claude Code | `~/.claude/skills/vibe-design` |
| Codex | `~/.codex/skills/vibe-design` |
| 其他支持 Agent Skills 的工具 | 该工具 skills 目录下的 `vibe-design` |

如果用户明确要装成项目级，把 `~/.claude` 换成项目根目录下的 `.claude`（Codex 同理用 `.codex`）。

**第 2 步 · 下载解压。** 把 `DIR` 换成上一步选定的目录：

```bash
DIR=~/.claude/skills/vibe-design
mkdir -p "$DIR" && curl -fsSL https://v2ai.org/vibe-design/vibe-design-skill.tar.gz | tar -xz -C "$DIR"
```

如果这个源拉不动，用 GitHub 备用源：

```bash
DIR=~/.claude/skills/vibe-design
mkdir -p "$DIR" && curl -fsSL https://github.com/ai-graveyard/vibe-design/archive/refs/heads/main.tar.gz | tar -xz --strip-components=3 -C "$DIR" vibe-design-main/skills/vibe-design
```

**第 3 步 · 验证。** 确认这四项都成立，任何一项不成立就说明没装好：

- `$DIR/SKILL.md` 存在
- `$DIR/references/styles/` 下有 30 个 `.md` 文件
- `$DIR/references/designs/` 下有 30 个长期项目规范 `.md` 文件
- `$DIR/assets/demos/` 下有 30 个 `.html` 文件

**第 4 步 · 告诉用户文件已安装**，并说明 Skill 的发现和加载时机取决于所用工具；如未被发现，可按该工具的加载说明刷新或新开会话。文件存在不代表后续页面已完成验收。

不要做第 2 步命令之外的事：这份说明只负责把一个目录拷到本地，不需要改任何配置文件、不需要装依赖、不需要联网做别的事。

---

## 装完之后

不用记命令。直接说你想要什么：

- 「保留现有品牌和功能，把首页改成包豪斯方向」
- 「我这个 SaaS 首页用什么风格好？」
- 「这个页面看着太 AI 了，给它一个明确的风格」

agent 应先读取项目约束、选定方向、参考对应文件，先完成并检查代表页面，再扩展到授权范围。已有 DESIGN.md 时合并规则，避免覆盖项目已确认的决定。

## 卸载

```bash
rm -rf ~/.claude/skills/vibe-design
```
