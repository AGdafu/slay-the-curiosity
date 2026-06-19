# 好奇尖塔 / Slay the Curiosity — 交接文档（给 Hermes）

> 本文件是把项目从 Claude Code 移交给 Hermes 的完整简报。
> 不依赖 GitHub（仓库密码已遗忘）。所有代码就在本文件所在的文件夹里，直接读改即可。
> 最后更新：2026-06-12，由 Claude 整理。当前版本 **game.js v111**。

---

## 0. 一句话

这是一个仿《杀戮尖塔》(Slay the Spire) 的中文 Roguelike 卡牌爬塔游戏，纯前端单机 + 联机，技术栈是原生 HTML/CSS/JS，无框架无构建步骤。

---

## 1. 怎么跑起来

```powershell
# 在项目根目录
powershell.exe -NoProfile -ExecutionPolicy Bypass -File serve.ps1
# 然后浏览器打开：
# http://localhost:8766/
```

- `serve.ps1` 是一个 PowerShell 静态文件服务器，监听 **8766** 端口。
- 改完 JS/CSS 后要在 `game.html` 里**升版本号**（`game.js?v=NNN`）来破浏览器缓存，否则看不到改动。
- 没有 npm / 没有 build / 没有依赖安装，改完直接刷新。

---

## 2. 文件结构

| 文件 | 作用 | 大小 |
|---|---|---|
| `game.html` | 外壳，引入 mqtt CDN + game.css + game.js | ~2.4 KB |
| `game.js` | **全部游戏逻辑**（单文件，~700 KB）| 巨大，下面有分区索引 |
| `game.css` | 全部样式 + 动画 keyframes | ~45 KB |
| `index.html` | 自动跳转到 game.html | 小 |
| `serve.ps1` | 本地静态服务器 (端口 8766) | 小 |
| `manus-storage/` | 图片资源（角色立绘、商人、遗物图等）| 图片 |

### game.js 内部分区（用注释 `// ── xxx.js ──` 分隔，可搜索定位）

| 区块 | 大致职责 |
|---|---|
| `Data` | 角色 / 卡牌 / 敌人 / 遗物 / 药水 / 升级 / 事件 数据定义 |
| `audio.js` (≈1664行) | **程序化音频系统**（Web Audio API 振荡器合成，非音频文件）|
| `Combat` (≈2600行) | 战斗逻辑：出牌、结算伤害、敌人行动、buff/debuff |
| `animations.js` (≈3993行) | `Anim` 对象，所有视觉特效 |
| `UI` (≈3765行起) | 所有界面渲染：菜单、角色选择、战斗、地图、商店、图鉴 |
| `State` | 全局状态机 + 存档 |
| 联机层 (coop / pvp) | 合作 + 1v1 对战，基于 MQTT |

---

## 3. 游戏现状（已完成）

### 4 个角色
| 角色 | emoji | 机制特点 |
|---|---|---|
| 拳击手 | 🥊 | **怒气**：受到伤害(含格挡前)÷3 向下取整，下一回合变成全手牌攻击加成，无上限 |
| 战士 | ⚔️ | **重伤/wound**：永久叠加的每敌人伤害标记；力气大 |
| 赛车手 | 🏎️ | **档位/速度**：速度越高伤害越高（≥40 +2，≥80 +5），操作型 |
| 弓箭手 | 🏹 | **专注/charge**：攒蓄势，箭越来越重；操作型 |

- 4 档遗物：普通(白)/罕见(蓝)/稀有(紫)/史诗，掉率权重 45/30/20/5%
- 5 个药水
- 图鉴系统：角色卡牌 / 遗物 / 药水 / 怪物
- 联机：合作模式 (MQTT) + PVP 1v1（**PVP 入口当前下线** `chore: 暂时下线 PVP 入口`）

### 战斗打击感（v111 刚由 Claude 升级，Hermes 可直接复用这套 API）

`Anim` 对象新增了这些方法，**任何战斗命中都应该走这套**：

```js
Anim.screenShake('sm'|'md'|'lg')    // 整屏震动分级
Anim.particles(el, {count, colors, spread, size})  // 命中粒子喷射
Anim.impactRing(el, color)          // 命中冲击环
Anim.impactFlash(el)                // 命中白闪 (hit-stop 视觉替身)
Anim.enemyHit(figEl, dmg)           // 【复合】敌人被击中：自动按伤害量叠加上面所有效果 + 飘字 + 闪白 + 抖动
Anim.playerHit(figEl, dmg)          // 【复合】玩家被击中：同上(红色系) + 自动播放受击音效 Audio.playHurt
```

伤害分级（`Anim._dmgTier`）：1-5=t1普通 / 6-11=t2 / 12-19=t3 / 20+=t4暴击(最大字号+辉光+特殊上浮动画)。
`Anim.floatNumber(text, el, 'damage')` 现在会**自动**按数字大小套用 `.dmg-t2/t3/t4` 样式。

> ⚠️ 已知未覆盖点：联机(coop ≈4477行)和 PVP(≈4887行)的出牌路径还在用旧的 `floatNumber+shake`，没接 `enemyHit/playerHit`。Hermes 可以把这两条路径也换成复合方法，打击感就统一了。

### 音频系统现状
- **当前是 100% 程序化合成**（Web Audio 振荡器实时生成 BGM 和音效），没有用任何音频文件。
- `Audio` 对象已有 17 个音效方法：`playAttack / playBlock / playHurt / playChargeMid / playChargeMax / playCardDraw / playCardPlay / playEnemyDeath / playVictory / playEndTurn / playClick / playBuy / playGoldReward / playLevelUp / playGameOver / playPowerUp`
- BGM 有 map 模式和 combat 模式两套（`_bgmInterval` 驱动）。
- 已有音量设置弹窗（`audio-settings-overlay`，约 2325 行）。

---

## 4. 待办任务（Hermes 接手做这些）

### ⭐ 任务 A：音乐音效升级（用户已拍板：来源 = 方案 A = Suno 生成 BGM + freesound 找 SFX）

**目标**：用真实音频文件替换/增强现在的程序化音频，让游戏不再像 demo。

**做法建议**：在 `Audio` 对象里加一层"文件优先、程序化兜底"的加载器——能加载到对应 `audio/xxx.ogg` 就播文件，否则回退现有合成。新建 `audio/` 文件夹放素材。

**BGM 清单（4 首，用 Suno 生成，prompt 草案如下）**：
1. **菜单** — `Whimsical adventure menu theme, light playful Chinese folk (guzheng, bamboo flute) + cozy lo-fi beats, curious and inviting, loopable, no vocals, ~90 BPM`
2. **普通战斗** — `Upbeat roguelike card battle, energetic Chinese percussion + electronic synth, driving rhythm, tense but fun, loopable, no vocals, ~130 BPM`
3. **Boss 战** — `Epic boss battle, dramatic Chinese orchestral drums + distorted synth bass, high tension climactic, loopable, no vocals, ~145 BPM`
4. **商店/休息** — `Relaxing shop & rest theme, warm guzheng + soft piano, calm cozy market vibe, loopable, no vocals, ~75 BPM`

**SFX 清单（8 个，freesound.com 搜，优先 CC0）**：
| 用途 | 搜索词 | 接哪个方法 |
|---|---|---|
| 出牌 | `card swipe whoosh` / `card flick` | playCardPlay |
| 轻击 | `punch light impact` / `soft hit thud` | playAttack (轻) |
| 重击 | `heavy punch slam` / `bass hit impact` | playAttack (重) / 暴击 |
| 敌死 | `monster death` / `creature defeat` | playEnemyDeath |
| 回合切换 | `swoosh transition ui` | playEndTurn |
| 抽牌 | `card deal draw` / `paper slide` | playCardDraw |
| 拿遗物 | `magic pickup chime` / `treasure ding` | playGoldReward/拿遗物 |
| 按钮 | `ui button click soft` | playClick |

格式建议：SFX 转 `.ogg`/`.mp3`，单个 < 1s，做响度归一化；BGM 做无缝 loop。

### ⭐ 任务 B：角色档案页（文字已写好，缺立绘）

在图鉴的"角色"页给每个角色加档案卡。文字稿（用户待最终确认，可直接用）：

- **🥊 拳击手** — 名「方铁拳」/ 称号「浪人重拳」/ 台词入场"来吧，我这拳头痒了三年了。"选中"谁先动手不重要，重要的是谁站着。"胜利"就这？"死亡"下一次……我连内脏都练硬给你看。"
- **⚔️ 战士** — 名「齐重山」/ 称号「力气大」/ 台词入场"听说……上面有个会打人的塔？"选中"砍。"胜利"小事。"死亡"我以为我能再扛一下。"
- **🏎️ 赛车手** — 名「林一档」/ 称号「节奏野兽」/ 台词入场"系好安全带——哦，没有。"选中"换挡。"胜利"还没尽兴。"死亡"油……快没了。"
- **🏹 弓箭手** — 名「苏问月」/ 称号「千眼」/ 台词入场"风往南。"选中"对准就够了。"胜利"吐气……松弦。"死亡"……还差一点。"

（每个角色的 200 字小传见对话记录附录，立绘位先留空等美工出图。）

### ⭐ 任务 C：高优先级（用户已选：先做这两条，每日挑战暂缓）

**C1. 图鉴解锁感**
- 卡牌=战斗中打出过才解锁；遗物=拿到过；怪物=击杀过；药水=喝/买过。未解锁显示剪影+"???"。
- 标题栏显示进度 `图鉴 27/108`。每解锁弹"📖 新发现"小卡+音效。

**C2. 骨灰币 Meta（祭坛系统）**
- 经济：死亡=当局金币÷5 转骨灰币；通关=金币÷3 +100；精英+5/Boss+20。
- 主菜单加 `🕯️ 祭坛` 入口，商品（永久解锁，**不做数值碾压只做内容**）：扩展角色卡池(30/角色)、第二药水位(50)、起手选卡(80/角色)、传家宝(150)、"塔顶有风"难度(200)、永夜模式(300)。

### ⭐ 任务 D：遗物联动 / 套装（用户从 8 个提案里默认选 1,2,5,6）

**明套装（图鉴写明）**：
1. **拳手三件套**（拳击手套+沙袋+镜中影子，拳击手）→ 怒气阈值-1 + 每点怒气额外+0.5攻击
2. **倒霉三连**（苦命人+易碎杯+漏底口袋）→ 失去金币/血量时获等量临时护盾

**暗联动（不显示，词条藏线索）**：
5. **节拍器**（鼓棒+小9的琴）→ 每次换挡/抽牌额外抽1（两件描述都含"节奏"）
6. **时间错乱**（苏苏的怀表+沙漏[需新增]）→ 战斗开始获2回合复活，但首回合无法行动（描述都含"时间"）

（另外 4 个提案：节俭组合、猎杀模式、重伤狂热、塞翁失马——见对话记录，用户暂未选。）

---

## 5. 工作纪律（沿用用户习惯）

- **每完成一组逻辑改动就 commit**（不积攒），中文 commit message，说清"为什么"。
- 改 JS/CSS 必须**升 `game.html` 里的版本号**。
- 改完先在 `http://localhost:8766/` 本地验证再说。
- **不要**清空/覆盖用户存档（localStorage）。
- 平衡性改动要同步更新：卡面显示、卡牌详情、角色介绍、图鉴——四处不能漏（历史上踩过坑）。

---

## 6. Git 备注

- 远程仓库 `github.com/AGdafu/slay-the-curiosity`，remote URL 里嵌了 PAT，所以 `git push` 仍可用（网页登录密码忘了不影响命令行推送）。
- ⚠️ **安全**：该 PAT 明文存在 `.git/config` 的 remote URL 里，建议尽快换成凭据管理器存储。
- 如果你（Hermes）能直接读这个文件夹，就不需要 clone，直接改本地文件即可。

---

## 7. 最近 commit 速览

```
6091fed feat(juice): 战斗打击感升级 (v111)  ← Claude 最新
172969c chore: remove 测试大头兜风事件 button (v110)
dae316e fix: move test button into menu (v109)
... PVP/MQTT、战士重伤重做、图鉴系统 等
```

— 交接完毕。有疑问先读 game.js 对应分区，再动手。
