# audio/ — 好奇尖塔 音频素材

## 加载机制（文件优先，程序化兜底）
游戏启动时自动从本目录加载 .ogg 文件。
- 找到对应文件 → 播放真实音频
- 未找到 → 静默回退到 Web Audio API 程序化合成

文件名必须严格匹配下方清单。

---

## BGM（4 首，需 Suno 生成）

| 文件名 | 场景 | 时长建议 | Suno Prompt |
|--------|------|----------|-------------|
| `bgm_menu.ogg` | 主菜单 / 角色选择 | 60-90s 无缝 loop | Whimsical adventure menu theme, light playful Chinese folk (guzheng, bamboo flute) + cozy lo-fi beats, curious and inviting, loopable, no vocals, ~90 BPM |
| `bgm_combat.ogg` | 普通战斗 | 60-90s 无缝 loop | Upbeat roguelike card battle, energetic Chinese percussion + electronic synth, driving rhythm, tense but fun, loopable, no vocals, ~130 BPM |
| `bgm_boss.ogg` | Boss 战 | 90-120s 无缝 loop | Epic boss battle, dramatic Chinese orchestral drums + distorted synth bass, high tension climactic, loopable, no vocals, ~145 BPM |
| `bgm_shop.ogg` | 商店 / 休息 | 60-90s 无缝 loop | Relaxing shop & rest theme, warm guzheng + soft piano, calm cozy market vibe, loopable, no vocals, ~75 BPM |

额外（地图探索，兼容原有命名）：
| `bgm_map.ogg` | 地图探索 | 60-90s | 同 bgm_combat 或另做探索主题 |

### Suno 生成建议
1. 用上述 prompt 在 Suno (suno.com) 生成，选 instrumental 模式
2. 下载后转为 .ogg（推荐 ffmpeg: `ffmpeg -i input.mp3 -c:a libvorbis -q:a 6 output.ogg`）
3. 确保无缝 loop：用 Audacity 修头尾，或 Suno 的 "Extend" 功能做 loop 版本
4. 响度归一化到 -14 LUFS

---

## SFX（8+ 个，从 freesound.org 下载，优先 CC0）

| 文件名 | 用途 | 接哪个方法 | freesound 搜索词 | 时长 |
|--------|------|-----------|-----------------|------|
| `sfx_cardplay.ogg` | 出牌 | playCardPlay | card swipe whoosh / card flick | <1s |
| `sfx_attack.ogg` | 轻击/攻击 | playAttack | punch light impact / soft hit thud | <0.5s |
| `sfx_block.ogg` | 格挡 | playBlock | shield block metal | <0.5s |
| `sfx_hurt.ogg` | 受伤 | playHurt | hurt grunt impact | <0.5s |
| `sfx_enemydeath.ogg` | 敌人死亡 | playEnemyDeath | monster death creature defeat | <1s |
| `sfx_endturn.ogg` | 回合切换 | playEndTurn | swoosh transition ui | <0.5s |
| `sfx_carddraw.ogg` | 抽牌 | playCardDraw | card deal draw paper slide | <0.5s |
| `sfx_relic.ogg` | 拿遗物/购买 | playBuy / playGoldReward | magic pickup chime treasure ding | <0.5s |
| `sfx_click.ogg` | 按钮点击 | playClick | ui button click soft | <0.2s |
| `sfx_victory.ogg` | 胜利 | playVictory | victory fanfare short | <1.5s |
| `sfx_powerup.ogg` | 能力激活 | playPowerUp | magic power up activate | <0.5s |
| `sfx_goldreward.ogg` | 金币奖励 | playGoldReward | coin pickup jingle | <0.5s |

### 下载步骤
1. 访问 freesound.org，注册登录
2. 搜索上述关键词，筛选 License: Creative Commons 0
3. 下载后转为 .ogg，做响度归一化
4. 放入本目录，文件名匹配上方清单即可自动加载
