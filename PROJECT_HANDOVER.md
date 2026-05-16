# 《Slay the Curiosity》项目完整交接文档

**项目名称**：Slay the Curiosity（杀死好奇心）  
**项目类型**：纯原生 JavaScript 网页卡牌游戏  
**最后更新**：2026-04-28  
**当前版本**：v3（修复档位动画显示）

---

## 📋 项目概况

本项目是一款基于《杀戮尖塔》（Slay the Spire）玩法的中文网页卡牌游戏。游戏采用单文件架构（game.js），无框架依赖，所有逻辑均用原生 JavaScript 实现。

### 核心特色
- **三个职业**：射手（Archer）、赛车手（Racer）、蛮力（Brute），各具独特机制
- **丰富的卡牌系统**：每个职业 20+ 张卡牌，支持升级系统
- **遗物系统**：30+ 个遗物，与卡牌升级联动
- **事件系统**：包含问号事件、商人、营火等多种事件
- **移动端优化**：完整的触屏支持和响应式设计

---

## 🎮 已完成功能清单

### 赛车手（Racer）核心机制
- **档位系统**（1-3档）：影响攻防倍率
  - 1档（防御）：格挡倍率 1.3×，伤害倍率 0.6×
  - 2档（中立）：格挡倍率 1.15×，伤害倍率 1.0×
  - 3档（攻击）：格挡倍率 1.0×，伤害倍率 1.3×
- **速度感系统**：分段解锁强力效果
  - ≥20：格挡+1
  - ≥40：攻击+1
  - ≥60：升挡时额外抽牌
  - ≥80：攻击+3
- **换挡动画**：升/降档时显示变化量（如"升1档 → 3挡·攻击"）
- **相关卡牌**：档位打击、档位防御、氮气加速、涡轮压榨等 12 张

### 射手（Archer）核心机制
- **蓄力系统**：积累蓄力值，伤害随蓄力增加
  - 基础伤害系数：×3（已加强）
  - 满蓄爆射：60 伤（已加强）
- **实时伤害显示**：根据当前蓄力值动态显示卡牌伤害
- **相关卡牌**：瞄准、蓄力射击、满蓄爆射等 10 张

### 蛮力（Brute）核心机制
- **升级系统**：所有 10 张卡牌的升级数据已补全
- **升级效果实时生效**：战斗中通过 `handUpgrades` 机制应用升级
- **相关卡牌**：重拳、铁血防线、狂暴等 10 张

### 遗物系统
已完成平衡性调整的遗物包括：
- 大眼钉鞋：5% 概率触发
- 大头鼓棒：10% 概率触发
- 高山雪镜：50% 概率+1能量
- 王微乐观：恢复 1~10 HP
- 王微碗：+5 HP
- 王微手绳：每回合开始获得 3 点格挡（上限 3 点）

### 事件系统
- **善良的色环蜘蛛**：还原了完整的交互逻辑
  - 给药水换随机药水
  - 无药水或不给被咬 -5 HP

### 移动端优化
- 双击灵敏度优化（350ms 窗口 + touchstart 支持）
- 完整的触屏交互支持

---

## 🛠️ 技术架构

### 文件结构
```
slay_the_curiosity/
├── game.html          # 游戏入口（1.8KB）
├── game.js            # 游戏核心逻辑（~310KB，4000+ 行）
├── game.css           # 样式表（~42KB）
├── README.md          # 项目说明
├── README_HANDOVER.md # 简要交接文档
├── manus-storage/     # 游戏资源目录
│   ├── *.png          # 各种游戏图片
│   └── ...
└── slay_the_curiosity_v3.zip  # 最新版本压缩包
```

### 核心代码结构（game.js）

#### 数据层
- **Data.cards**：卡牌定义（id, name, cost, type, effect 函数等）
- **Data.upgrades**：升级数据（每张牌的升级描述和费用变化）
- **Data.relics**：遗物定义
- **Data.events**：事件定义

#### 状态层
- **State.run**：当前游戏存档
  - `relics`：已获得的遗物
  - `deck`：卡组
  - `cardUpgrades`：卡牌升级等级
  - `combat`：战斗状态
  - `player`：玩家状态（HP、格挡、Buff 等）

#### 战斗逻辑
- **Combat._changeGear(cs, delta)**：档位变化（约第 2678 行）
  - 计算新档位，触发相关 Buff
  - 显示档位变化动画
- **Combat.dealDamage(cs, ti, damage)**：伤害计算
  - 应用档位倍率、Buff 加成等
- **Combat._getCardUpgradeLevel(cs, cardId)**：获取卡牌升级等级

#### UI 渲染
- **UI._renderCombat()**：战斗界面渲染
- **UI.renderCard(cardId)**：卡牌渲染
- **UI._renderHand()**：手牌渲染

---

## 🔧 修改指南

### 修改方式
由于 game.js 文件较大（310KB），建议使用 Python 脚本进行字符串替换：

```bash
# 示例：修改卡牌伤害
python3 << 'EOF'
with open('game.js', 'r', encoding='utf-8') as f:
    content = f.read()
# 进行替换
content = content.replace('旧字符串', '新字符串')
with open('game.js', 'w', encoding='utf-8') as f:
    f.write(content)
EOF
```

### 验证修改
每次修改后必须验证语法：
```bash
node --check game.js
```

### 关键代码位置

| 功能 | 位置 | 说明 |
|------|------|------|
| 档位变化 | ~2678 行 | `_changeGear` 函数，包含档位动画逻辑 |
| 档位动画文字 | ~2738 行 | `tip2.textContent` 显示变化量 |
| 换挡选择弹窗 | ~2770 行 | `_gearShiftInteractive` 函数 |
| 射手蓄力 | ~1800 行 | `cs.charge` 相关逻辑 |
| 蛮力升级 | ~1200 行 | `handUpgrades` 应用逻辑 |
| 遗物触发 | ~2100 行 | `_applyRelicEffect` 函数 |

---

## 📊 数据结构参考

### 卡牌定义示例
```javascript
gear_strike: {
  id: 'gear_strike',
  rarity: 'common',
  name: '档位打击',
  cost: 1,
  type: 'attack',
  emoji: '👊',
  description: '造成 6 点伤害。<br><span>1挡=5伤 · 2挡=6伤 · 3挡=8伤</span>',
  needsTarget: true,
  effect(cs, ti) {
    const g = cs.gear || 2;
    const bonus = Combat._getFtBonus(cs);
    Combat.dealDamage(cs, ti, [5, 6, 8][g - 1] + bonus);
  }
}
```

### 升级定义示例
```javascript
gear_strike: {
  1: { desc: '造成 <b>7</b> 点伤害。', cost: 1 },
  2: { desc: '造成 <b>8</b> 点伤害。', cost: 1 }
}
```

### 战斗状态（cs）关键字段
```javascript
{
  player: {
    hp: 75,
    maxHp: 75,
    block: 0,
    buffs: { /* Buff 效果 */ }
  },
  gear: 2,                    // 当前档位（1-3）
  charge: 0,                  // 射手蓄力值（0-5）
  speed: 0,                   // 赛车手速度感（0-100+）
  momentum: 0,                // 赛车手动量（0-5）
  handUpgrades: { /* 手牌升级等级 */ },
  drawPile: [],               // 抽牌堆
  hand: [],                   // 手牌
  discardPile: [],            // 弃牌堆
  enemies: [],                // 敌人列表
  turn: 1,                    // 当前回合
  energy: 3                   // 当前能量
}
```

---

## 🎯 常见任务

### 添加新卡牌
1. 在 `Data.cards` 中定义卡牌
2. 在 `Data.upgrades` 中定义升级（如果需要）
3. 在职业的初始卡组中添加卡牌 ID
4. 验证语法并测试

### 调整数值平衡
1. 找到相关卡牌的 `effect` 函数
2. 修改伤害、格挡、费用等参数
3. 如果有升级，也要修改升级数据
4. 验证并测试

### 添加新遗物
1. 在 `Data.relics` 中定义遗物
2. 在 `Combat._applyRelicEffect` 中添加触发逻辑
3. 在遗物池中注册遗物
4. 测试遗物效果

### 修改事件
1. 在 `Data.events` 中找到事件定义
2. 修改事件的 `onEnter` 或选项的 `effect` 函数
3. 验证并测试

---

## 🐛 调试技巧

### 查看游戏状态
在浏览器控制台中：
```javascript
console.log(State.run);              // 查看当前存档
console.log(State.run.combat);       // 查看战斗状态
console.log(State.run.combat.player);// 查看玩家状态
```

### 快速测试卡牌
```javascript
// 在控制台中直接调用卡牌效果
const cs = State.run.combat;
Data.cards.gear_strike.effect(cs, 0); // 对敌人 0 使用卡牌
UI._renderCombat();                    // 刷新界面
```

### 查看升级效果
```javascript
console.log(State.run.cardUpgrades);  // 查看所有升级
console.log(cs.handUpgrades);         // 查看手牌升级
```

---

## 📝 待办事项 / 未来方向

- [ ] 增加更多关卡与怪物种类
- [ ] 进一步丰富遗物池（目标 50+ 个）
- [ ] 完善音效与视觉特效
- [ ] 添加成就系统
- [ ] 实现存档/读档功能
- [ ] 多语言支持（英文、日文等）
- [ ] 性能优化（大量敌人时的渲染优化）

---

## 🚀 部署与分享

### 本地测试
```bash
# 启动 Python 简单服务器
python3 -m http.server 8000
# 访问 http://localhost:8000/game.html
```

### 永久分享链接
游戏已部署到 Manus webdev 项目，可通过以下链接分享给朋友测试：
- **webdev 项目**：`manus-webdev://27c349a0`
- **游戏直链**：在 webdev 项目的 Preview 面板中访问 `/game.html`

---

## 💡 给下一位开发者的建议

1. **理解架构**：先读一遍 game.js 的顶部注释，了解数据流和渲染流程
2. **从小改开始**：先修改数值（伤害、费用等），再尝试添加新卡牌
3. **充分测试**：每次修改后都要在游戏中实际测试，确保没有破坏其他功能
4. **保留备份**：重大修改前创建压缩包备份
5. **使用控制台**：充分利用浏览器控制台调试，查看游戏状态

---

## 📞 技术支持

如有问题，请查看：
- 代码中的注释（特别是关键函数）
- 本文档的"常见任务"部分
- 浏览器控制台的错误信息

祝开发顺利！让好奇心继续杀戮！🎮✨
