# audio/ — 好奇尖塔 音频素材

## 加载机制（文件优先，程序化兜底）
游戏启动时自动从本目录加载 .ogg 文件。
- 找到对应文件 → 播放真实音频
- 未找到 → 静默回退到 Web Audio API 程序化合成

文件名必须严格匹配下方清单。

---

## BGM（4 首，推荐从以下来源下载）

| 文件名 | 场景 | 推荐来源 |
|--------|------|----------|
| `bgm_menu.ogg` | 主菜单 / 角色选择 | 安静、好奇、有冒险感 |
| `bgm_combat.ogg` | 普通战斗 | 节奏感强、紧张但不压迫 |
| `bgm_boss.ogg` | Boss 战 | 史诗、高潮、压迫感 |
| `bgm_shop.ogg` | 商店 / 休息 | 温暖、放松、安全 |
| `bgm_map.ogg` | 地图探索 | 同 menu 或轻快版 |

### 🎵 免费 BGM 来源（无需 Suno）

| 网站 | 特点 | 链接 |
|------|------|------|
| **Pixabay Music** | 海量免费，无需注册，CC0/Content License | https://pixabay.com/music/ |
| **Chosic** | 按风格/情绪分类，免费+署名 | https://www.chosic.com/free-music/all/ |
| **FesliyanStudios** | 游戏向配乐，免费+署名 | https://www.fesliyanstudios.com/ |
| **OpenGameArt** | 游戏专用 CC0 音乐包 | https://opengameart.org/ |
| **Mixkit** | 高质量免费，无需署名 | https://mixkit.co/free-stock-music/ |

### 搜索关键词建议

| 场景 | Pixabay / Chosic 搜索词 |
|------|--------------------------|
| 菜单 | `fantasy ambient` `mysterious adventure` `calm orchestral` |
| 战斗 | `epic battle` `dark orchestral` `cinematic action` |
| Boss | `boss fight` `apocalyptic` `intense cinematic` |
| 商店 | `cozy tavern` `celtic calm` `medieval peaceful` |

### 下载后处理
```bash
# 转 mp3 为 ogg
ffmpeg -i input.mp3 -c:a libvorbis -q:a 6 output.ogg

# 无缝 loop（用 Audacity 修头尾）
# 或直接找 loopable 标签的音乐
```

---

## SFX（✅ 12 个已就位，mixkit 下载）
以下音效已从 mixkit.co 下载并转为 .ogg：

| 文件名 | 用途 | 大小 |
|--------|------|------|
| `sfx_attack.ogg` | 攻击命中 | 27K |
| `sfx_block.ogg` | 格挡成功 | 8.5K |
| `sfx_hurt.ogg` | 受伤 | 22K |
| `sfx_cardplay.ogg` | 出牌 | 13K |
| `sfx_carddraw.ogg` | 抽牌 | 66K |
| `sfx_enemydeath.ogg` | 敌人死亡 | 15K |
| `sfx_endturn.ogg` | 回合切换 | 30K |
| `sfx_goldreward.ogg` | 金币奖励 | 25K |
| `sfx_relic.ogg` | 遗物/购买 | 29K |
| `sfx_victory.ogg` | 战斗胜利 | 17K |
| `sfx_powerup.ogg` | 能力激活 | 28K |
| `sfx_click.ogg` | UI 按钮 | 8.7K |
