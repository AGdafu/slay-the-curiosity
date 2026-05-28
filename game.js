// ── data.js ──────────────────────────────────────────────────────────────────
const Data = {
  characters: [
    {
      id: 'boxer', name: '拳击手', emoji: '🥊', color: '#c0392b',
      hp: 90, maxHp: 90, description: '越战越勇的拳击手。受击积累愤怒，血量越低出拳越狠。',
      startingDeck: ['box_jab','box_jab','box_jab','box_jab','box_guard','box_guard','box_guard','box_cross','box_cross','box_uppercut'],
      detail: {
        gold: 80,
        playstyle: '硬抗反打流。主动挨打积累愤怒，下回合把伤害转化为攻击爆发。血量越低出拳越重，打到命悬一线反而是最强状态。比起格挡，更需要掌握受伤节奏。',
        mechanics: [
          { name: '💢 愤怒（Fury）', desc: '上回合敌人来袭伤害总量÷3（向下取整），成为下回合所有攻击牌的加成伤害。被格挡吸收的部分也计入，因此即便完美格挡也能积愤怒。无上限。愤怒在下一次回合结束时归零。' },
          { name: '🩸 搏命（Berserk）', desc: '被动，永久生效。HP每损失25%，所有攻击伤害+2（最高+6）。血量越低越暴力。' },
          { name: '🥊 上勾拳（反打）', desc: '上回合挨过打则造成高额伤害，未受伤则只有一半效果。与愤怒完美配合。' },
        ]
      }
    },
    {
      id: 'brute', name: '战士', emoji: '⚔️', color: '#2e86c1',
      hp: 85, maxHp: 85, description: '就是力气大。攻击敌人会留下永久「重伤」标记，每层让你对该敌人 +1 伤害。',
      startingDeck: ['strike','strike','strike','strike','strike','strike','defend','defend','defend','clash'],
      detail: {
        gold: 85,
        playstyle: '集火滚雪球。攻击敌人会留下永久「重伤」标记，越往后打越疼。Boss 长战越拖越强；多敌人时要选 1 个集中打 vs 平摊伤害。新手友好（无需主动决策也能 scale），但有"集火 or 分散"的策略点。',
        mechanics: [
          { name: '🩸 被动·重伤', desc: '战士对敌人造成伤害时，给该敌人施加 1 层「重伤」（永久叠加，回合结束不消失）。攻击带重伤敌人时，每层 +1 伤害。打到 20 次就 +19 伤害/击。**Boss 战滚雪球神技**。' },
          { name: '❤️ 高HP（85点）', desc: '血量厚，可以扛过前期重伤层数还没堆起来的低输出期。' },
          { name: '💰 起始金币（85金）', desc: '初始资金较充裕，可以在商店优先购买强力遗物或删牌。' },
          { name: '🎯 集火决策', desc: '多敌人战要权衡：集中打 1 个堆重伤（快速击杀+滚雪球），还是分摊降低威胁（控所有敌人血量）。' },
          { name: '💢 冲撞（0费）', desc: '当手牌全为攻击牌时造成 12 点高伤，否则仅 5 点。0费打出还能多堆 1 层重伤。' },
        ]
      }
    },
    {
      id: 'racer', name: '赛车手', emoji: '🏎️', color: '#e67e22',
      hp: 80, maxHp: 80, description: '档位系统角色。通过换挡在攻守之间切换，高档爆发伤害，低档厚实防御。',
      startingDeck: ['gear_strike','gear_strike','gear_strike','gear_strike','gear_defend','gear_defend','gear_defend','gear_shift','gear_shift','gear_brake'],
      detail: {
        gold: 90,
        playstyle: '档位操控流。战斗中灵活升降档位在攻守之间切换：3挡爆发伤害最高，1挡防御最厚实，2挡为中立初始档位。每次换挡都有额外收益，节奏感极强，上手需要一定练习。',
        mechanics: [
          { name: '⚙️ 档位（Gear 1–3）', desc: '战斗初始档位2（中立）。1挡防御×1.4、伤害×0.8；2挡标准倍率；3挡伤害×1.5、防御×0.7。换挡是最核心的决策点。' },
          { name: '⚡ 动力值（Momentum）', desc: '升档时积累，上限3点；升级「竞速本能」牌后上限提升至5点。回合开始时动力值转化为额外能量，是赛车手能量优势的来源。' },
          { name: '🏁 竞速本能（Race Instinct）', desc: '升档时积累动力值，可视作"回合内额外能量储蓄"。配合多张换挡牌可在一回合内打出超过能量上限的牌。' },
        ]
      }
    },
    {
      id: 'archer', name: '射手', emoji: '🏹', color: '#27ae60',
      hp: 72, maxHp: 72, description: '蓄力型角色。每回合多抽 1 张牌（手牌 6 张），打出技能牌积累蓄力，在关键时刻一击爆发。',
      startingDeck: ['ar_shoot','ar_shoot','ar_shoot','ar_shoot','ar_dodge','ar_dodge','ar_dodge','ar_aim','ar_aim','ar_sprint'],
      detail: {
        gold: 85,
        playstyle: '蓄力爆发流。平时用技能牌积攒蓄力值（上限5点），攒满后用消耗蓄力的攻击牌一波输出高额伤害。格挡与蓄力往往同步增长，前期稳住防线、中期蓄势待发、关键时刻一击制敌是核心节奏。',
        mechanics: [
          { name: '🃏 每回合多抽 1 张', desc: '射手每回合抽牌 6 张（其他角色 5 张），方便快速循环到关键蓄力/爆发牌。' },
          { name: '🏹 蓄力（Charge）', desc: '上限默认5点。打出稀有强化牌「蓄力上限」后可提升至6点。消耗全部蓄力的攻击牌：每消耗1点额外造成2~3点伤害，蓄力越满爆发越高。' },
          { name: '🛡 格挡蓄力联动', desc: '大量技能牌同时增加格挡+蓄力，打防守就等于在攒爆发，攻防一体是射手的核心优势。闪身、格挡蓄力、疾风步等都是典型例子。' },
          { name: '🎯 消耗型爆发', desc: '攻击牌打出时将蓄力清零并转化为伤害。蓄满5点后一击输出可达15~25点以上。「满蓄爆射」须满蓄才能打出，造成30点高额伤害。' },
          { name: '💥 易伤利用', desc: '给敌人施加易伤（受到伤害×1.5）后，配合高蓄力爆发牌可将单回合伤害最大化。弱化箭、易伤箭是前期破防的核心工具。' },
        ]
      }
    }
  ],
  // 显式角色→卡牌映射。用于战斗奖励/合作奖励池构建。
  // 维护规则：通用状态/诅咒牌（wound/slime_goo/curse_card/bleed_card/poison_card）不应进入任何池。
  // brute（战士）共享通用 STS-style 强力牌池（strike/defend 在起始牌里，奖励池给非起始牌）。
  cardsByCharacter: {
    boxer: [
      'box_combo','box_body_blow','box_counter','box_iron_step',
      'box_haymaker','box_rage_combo','box_taunt','box_second_wind',
      'box_bloodlust','box_iron_will',
      // 扩池新增
      'box_quick_jab','box_low_kick','box_dodge_punch','box_endure',
      'box_hook','box_clinch','box_furious_strike','box_double_jab',
      'box_break_guard','box_iron_chin','box_knockout','box_footwork'
    ],
    brute: [
      // 通用强力牌（原 default 池，brute 主要使用者）
      'bash','zap','pommel','shrug','armaments','inflame','ironwave','thunderclap',
      // 战士专属牌（简单机制，力气大主题）
      'br_double_strike','br_heavy_blade','br_cleave','br_shield_wall',
      'br_taunt_roar','br_bash_v','br_bloodletting','br_pommel_smash',
      'br_grit','br_iron_swing','br_overwhelm',
      // 新增：rare + epic
      'br_berserker','br_executioner'
    ],
    racer: [
      'nitro_boost','collision_block','drift_charge','overtake','turbo_crush',
      'pit_repair','race_predict','pressure_test','fuel_save','corner_line',
      'quick_upshift','forced_downshift','redline','race_instinct','full_throttle',
      'anti_skid','gear_lock','overspeed',
      'speed_rush','corner_guard','inertia_strike','speed_limit_break','speed_activate'
    ],
    archer: [
      'ar_shoot','ar_dodge','ar_aim','ar_sprint','ar_charge_shot','ar_vuln_arrow',
      'ar_double_shot','ar_block_charge','ar_roll','ar_pierce','ar_swap','ar_rapid_fire','ar_wind_step','ar_focus_aim',
      'ar_arrow_rain','ar_full_charge','ar_gale','ar_pierce_all','ar_instinct','ar_cap_up','ar_ultimate',
      'ar_scatter','ar_weak_arrow','ar_dodge_counter','ar_hunter_rhythm','ar_arrow_storm','ar_threshold',
      'ar_fire_arrow','ar_flame_arrow','ar_inferno_arrow','ar_chill_arrow','ar_freeze_arrow'
    ]
  },
  cards: {
    strike:   { id:'strike',   rarity:'common',   name:'打击',   cost:1, type:'attack', emoji:'👊', description:'造成 6 点伤害。',                          needsTarget:true,  effect(cs,ti,lv=0){ const dmg=[6,9,12][lv]||6; Combat.dealDamage(cs,ti,dmg); } },
    defend:   { id:'defend',   rarity:'common',   name:'防御',   cost:1, type:'skill',  emoji:'🛡', description:'获得 5 点格挡。',                          needsTarget:false, effect(cs,ti,lv=0){ const blk=[5,8,11][lv]||5; Combat.gainBlock(cs,blk,true); } },
    bash:     { id:'bash',     rarity:'uncommon', name:'猛击',   cost:2, type:'attack', emoji:'🔨', description:'造成 10 点伤害并施加 2 层易伤。',            needsTarget:true,  effect(cs,ti,lv=0){ const dmg=lv>=1?12:10; const vuln=lv>=1?3:2; Combat.dealDamage(cs,ti,dmg); Combat.applyDebuff(cs.enemies[ti],'vulnerable',vuln); } },
    zap:      { id:'zap',      rarity:'common',   name:'电击',   cost:1, type:'attack', emoji:'⚡', description:'造成 5 点伤害。若目标有易伤则额外 3 点。',  needsTarget:true,  effect(cs,ti){ const b=(cs.enemies[ti].debuffs.vulnerable||0)>0?3:0; Combat.dealDamage(cs,ti,5+b); } },
    clash:    { id:'clash',    rarity:'common',   name:'冲撞',   cost:0, type:'attack', emoji:'💢', description:'若手牌全为攻击牌，造成 12 点伤害，否则 5 点。', needsTarget:true, effect(cs,ti,lv=0){ const a=cs.hand.every(id=>Data.cards[id]&&Data.cards[id].type==='attack'); const dmgFull=[12,16,20][lv]||12; const dmgElse=[5,7,9][lv]||5; Combat.dealDamage(cs,ti,a?dmgFull:dmgElse); } },
    pommel:   { id:'pommel',   rarity:'uncommon', name:'剑柄击', cost:1, type:'attack', emoji:'🗡', description:'造成 9 点伤害，摸 1 张牌。',                needsTarget:true,  effect(cs,ti,lv=0){ Combat.dealDamage(cs,ti,9); Combat.drawCards(cs,lv>=1?2:1); } },
    shrug:    { id:'shrug',    rarity:'uncommon', name:'耸肩',   cost:1, type:'skill',  emoji:'🤷', description:'获得 8 点格挡，摸 1 张牌。',                needsTarget:false, effect(cs,ti,lv=0){ const blk=lv>=1?11:8; const draw=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.drawCards(cs,draw); } },
    armaments:{ id:'armaments',rarity:'uncommon', name:'武装',   cost:1, type:'skill',  emoji:'⚒', description:'获得 5 点格挡。下回合开始时额外获得 1 点能量。',                          needsTarget:false, effect(cs,ti,lv=0){
      Combat.gainBlock(cs,5,true);
      // 下回合 +1 能量（升级后 +2）
      cs._extraEnergyNextTurn = (cs._extraEnergyNextTurn||0) + (lv>=1?2:1);
      if(lv>=1 && cs.hand.length>0){
        if(!cs.handUpgrades) cs.handUpgrades={};
        if(lv>=2){
          // 升级手牌中所有牌
          cs.hand.forEach((_,i)=>{ cs.handUpgrades[i]=(cs.handUpgrades[i]||0)+1; });
          const tip=document.createElement('div');tip.style.cssText='position:fixed;top:38%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,20,0.95);color:#7fff7f;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #7fff7f;z-index:9999;pointer-events:none;';tip.textContent='⚒ 武装+2：手牌全部升级！';document.body.appendChild(tip);setTimeout(()=>tip.remove(),1200);
        } else {
          // 升级手牌中随机1张（取第一张未满级的牌）
          const idx=cs.hand.findIndex((_,i)=>(cs.handUpgrades[i]||0)<2);
          if(idx!==-1){ cs.handUpgrades[idx]=(cs.handUpgrades[idx]||0)+1; }
          const tip=document.createElement('div');tip.style.cssText='position:fixed;top:38%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,20,0.95);color:#7fff7f;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #7fff7f;z-index:9999;pointer-events:none;';tip.textContent='⚒ 武装+1：手牌升级！';document.body.appendChild(tip);setTimeout(()=>tip.remove(),1200);
        }
        setTimeout(()=>UI._renderCombat&&UI._renderCombat(),100);
      }
    } },
    inflame:  { id:'inflame',  rarity:'uncommon', name:'激怒',   cost:1, type:'power',  emoji:'🔥', description:'永久获得 2 层力量。',                      needsTarget:false, effect(cs,ti,lv=0){ Combat.applyBuff(cs.player,'strength',lv>=1?3:2); } },
    ironwave: { id:'ironwave', rarity:'uncommon', name:'铁浪',   cost:1, type:'attack', emoji:'🌊', description:'获得 5+力量 格挡，造成等量伤害。',          needsTarget:true,  effect(cs,ti,lv=0){ const str=cs.player.buffs.strength||0; const base=lv>=2?7:5; const mult=lv>=1?2:1; const a=base+str*mult; Combat.gainBlock(cs,a,true); Combat.dealDamage(cs,ti,a); } },
    thunderclap:{ id:'thunderclap',rarity:'uncommon',name:'霹雳',cost:1,type:'attack', emoji:'🌩', description:'对所有敌人造成 4 点伤害并施加 1 层易伤。',  needsTarget:false, effect(cs,ti,lv=0){ const dmg=lv>=1?7:4; const vuln=lv>=2?2:1; cs.enemies.forEach((e,i)=>{ if(e.hp>0){ Combat.dealDamage(cs,i,dmg); Combat.applyDebuff(e,'vulnerable',vuln); } }); } },
    wound:    { id:'wound',    name:'伤口',   cost:99,type:'curse',  emoji:'🩸', description:'诅咒。无法打出。',                          needsTarget:false, effect(){} },

    // ── 赛车手起始牌组 ────────────────────────────────────────────────────────────────────────────────
    // 档位辅助函数：获取当前档位（1-6）
    // 档位系统：1挡=防御 2挡=中立（初始）3挡=攻击
    // 伤害倍率：1挡×0.8  2挡×1.0  3挡×1.3（floor取整）
    // 格挡倍率：1挡×1.3  2挡×1.0  3挡×0.7（floor取整）
    // 档位格挡倍率：1挡=1.3 2挡=1.15 3挡=1.0 4挡=0.85 5挡=0.75 6挡=0.5

    // 起始牌：档位打击（替代打击）
    gear_strike: { id:'gear_strike', rarity:'common', name:'档位打击', cost:1, type:'attack', emoji:'👊', description:'造成 <b>6</b> 点伤害（含档位倍率）。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const bonus=Combat._getFtBonus(cs); const base=[6,8,10][lv]||6; Combat.dealDamage(cs,ti,Math.floor(base*dmgMult)+bonus); if(lv>=2 && g>=3){ Combat.applyDebuff(cs.enemies[ti],'slow',1); } } },
    // 起始牌：档位防御（替代防御）
    gear_defend: { id:'gear_defend', rarity:'common', name:'档位防御', cost:1, type:'skill', emoji:'🛡', description:'获得 <b>5</b> 点格挡（含档位倍率）。', needsTarget:false,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const hasRedline=(cs.player.buffs.redline||0)>0; const blkMult=hasRedline&&g>=3?1.0:[0,1.4,1.0,0.7][g]; const base=lv>=1?7:5; Combat.gainBlock(cs,Math.floor(base*blkMult),true); if(lv>=2) Combat.drawCards(cs,1); } },
    // 起始牌：换挡时机
    gear_shift: { id:'gear_shift', rarity:'common', name:'换挡时机', cost:0, type:'skill', emoji:'🔄', description:'升 1 挡或降 1 挡（选择）。本卡本轮最多使用 2 次。', needsTarget:false,
      effect(cs){ Combat._gearShiftInteractive(cs, 'gear_shift'); } },
    // 起始牌：刹车漂移（替代猛击）
    gear_brake: { id:'gear_brake', rarity:'common', name:'刹车漂移', cost:1, type:'attack', emoji:'💨', description:'造成 <b>10</b> 点伤害（含档位倍率）。3 挡时附加 2 层减速。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const bonus=Combat._getFtBonus(cs); const base=[10,13,16][lv]||10; const slow=[2,2,3][lv]||2; Combat.dealDamage(cs,ti,Math.floor(base*dmgMult)+bonus); if(g>=3){ Combat.applyDebuff(cs.enemies[ti],'slow',slow); } } },

    // ── 攻击牌（6张）────────────────────────────────────────────────────────────────────────────────
    // 1. 刹车漂移（起始牌已包含）
    // 2. 氮气加速：2费 攻击+换挡 12伤+升±1挡，6挡时改为16伤
    nitro_boost: { id:'nitro_boost', rarity:'rare', name:'氮气加速', cost:2, type:'attack', emoji:'💥', description:'造成 <b>14</b> 点伤害并升 1 挡。若已处于 3 挡，改为造成 <b>18</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const bonus=Combat._getFtBonus(cs); const baseLow=[14,16,18][lv]||14; const baseHigh=[18,22,24][lv]||18; if(g>=3){ Combat.dealDamage(cs,ti,baseHigh+bonus); } else { Combat.dealDamage(cs,ti,baseLow+bonus); Combat._changeGear(cs,1); } } },
    // 3. 碰撞拦截：1费 攻击 4格挡+造成等同格挡值伤害
    collision_block: { id:'collision_block', rarity:'uncommon', name:'碰撞拦截', cost:1, type:'attack', emoji:'💥', description:'获得 <b>5</b> 点格挡，造成 <b>7</b> 点伤害（均含档位倍率）。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const blkMult=[0,1.4,1.0,0.7][g]; const dmgMult=[0,0.8,1.0,1.5][g]; const blk=[5,6,7][lv]||5; const dmg=[7,9,10][lv]||7; const bonus=Combat._getFtBonus(cs); Combat.gainBlock(cs,Math.floor(blk*blkMult),true); Combat.dealDamage(cs,ti,Math.floor(dmg*dmgMult)+bonus); if(lv>=2) Combat.applyDebuff(cs.enemies[ti],'vulnerable',1); } },
    // 4. 甩尾冲锋：2费 全体攻击 5伤，速度感每10点+2伤
    drift_charge: { id:'drift_charge', rarity:'rare', name:'甩尾冲锋', cost:2, type:'attack', emoji:'🏎️', description:'对所有敌人造成 <b>6</b> 点伤害（含档位倍率）。速度感每满 <b>20</b> 点，额外造成 <b>2</b> 点伤害（最多 +8）。', needsTarget:false,
      effect(cs,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const base=[6,7,7][lv]||6; const step=[20,20,16][lv]||20; const speedBonus=Math.min(Math.floor((cs.speed||0)/step)*2,8); const ftBonus=Combat._getFtBonus(cs); cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,Math.floor(base*dmgMult)+speedBonus+ftBonus); }); } },
    // 5. 超车外线：1费 攻击 4+4伤（两段），3挡时免费
    overtake: { id:'overtake', rarity:'uncommon', name:'超车外线', cost:1, type:'attack', emoji:'🏎️', description:'造成两段 <b>4</b> 点伤害（含档位倍率）。处于 3 挡时，本卡费用变为 <b>0</b>。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const ftBonus=Combat._getFtBonus(cs); const base=[4,5,6][lv]||4; const hit=Math.floor(base*dmgMult)+ftBonus; Combat.dealDamage(cs,ti,hit); Combat.dealDamage(cs,ti,hit); if(lv>=2) Combat.applyDebuff(cs.enemies[ti],'slow',1); } },
    // 6. 涡轮压榨：3费 攻击+换挡 6×档位伤害，降2挡
    turbo_crush: { id:'turbo_crush', rarity:'rare', name:'涡轮压榨', cost:3, type:'attack', emoji:'⚡', description:'造成 <b>8×档位</b> 点伤害（8 / 16 / 24），随后降 2 挡。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const ftBonus=Combat._getFtBonus(cs); const mult=[8,9,10][lv]||8; Combat.dealDamage(cs,ti,mult*g+ftBonus); Combat._changeGear(cs,-2); } },

    // ── 技能牌（8张）────────────────────────────────────────────────────────────────────────────────
    // 7. 进站维修：1费 技能 10格挡，1/2挡时+4回血
    pit_repair: { id:'pit_repair', rarity:'uncommon', name:'进站维修', cost:1, type:'skill', emoji:'🔧', description:'获得 <b>10</b> 点格挡（含档位倍率）。非 3 挡时额外恢复 <b>3</b> 点生命。', needsTarget:false,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const blkMult=[0,1.4,1.0,0.7][g]; const blk=lv>=1?12:10; const heal=[3,4,5][lv]||3; Combat.gainBlock(cs,Math.floor(blk*blkMult),true); if(g<=2){ cs.player.hp=Math.min(cs.player.hp+heal,cs.player.maxHp); State.run.character.hp=cs.player.hp; } } },
    // 8. 换挡时机（起始牌已包含）
    // 9. 赛线预判：1费 技能 看牌堆顶3张，可重新排列，再抄±1张
    race_predict: { id:'race_predict', rarity:'uncommon', name:'赛线预判', cost:1, type:'skill', emoji:'🔮', description:'查看牌堆顶 3 张牌，可重新排列顺序，再抄 1 张牌。', needsTarget:false,
      effect(cs){ Combat._racePredictInteractive(cs); } },
    // 10. 压力测试：2费 技能 获得1层超载（受伤时+1格挡），抄2，上限2层
    pressure_test: { id:'pressure_test', rarity:'uncommon', name:'压力测试', cost:2, type:'skill', emoji:'📊', description:'获得 1 层「超载」（每次受到伤害时额外获得 1 点格挡，上限 2 层，本战斗持续），然后抽 2 张牌。', needsTarget:false,
      effect(cs){ const cur=cs.player.buffs.overload||0; if(cur<2){ Combat.applyBuff(cs.player,'overload',1); } Combat.drawCards(cs,2); } },
    // 11. 节油行驶：1费 换挡+技能 降1挡，本回合所有技能费用-1
    fuel_save: { id:'fuel_save', rarity:'uncommon', name:'节油行驶', cost:1, type:'skill', emoji:'⛽', description:'降 1 挡。本回合所有技能牌费用 -1（最低 0）。', needsTarget:false,
      effect(cs,ti,lv=0){ Combat._changeGear(cs,-1); if(lv>=2){ cs._fuelSaveAllActive=true; } else { cs._fuelSaveActive=true; } } },
    // 12. 过弯线路：0费 技能 升过挡获得8格挡，否则获得5格挡（不受档位倍率影响）
    corner_line: { id:'corner_line', rarity:'common', name:'过弯线路', cost:0, type:'skill', emoji:'🛣️', description:'如果此回合已经升过挡，获得 <b>8</b> 点格挡；否则获得 <b>5</b> 点格挡。（不受档位倍率影响）', needsTarget:false,
      effect(cs,ti,lv=0){ const baseUp=lv>=1?10:8; const baseNo=lv>=1?6:5; const amt = cs._shiftedUpThisTurn ? baseUp : baseNo; cs.player.block=(cs.player.block||0)+amt; if(lv>=2 && cs._shiftedUpThisTurn) Combat.drawCards(cs,1); } },
    // 13. 瞬时升挡：1费 换挡+技能 升2挡（不超过3挡上限），抄1张
    quick_upshift: { id:'quick_upshift', rarity:'common', name:'瞬时升挡', cost:1, type:'skill', emoji:'⬆️', description:'升 <b>2</b> 挡（上限 3 挡），抽 <b>1</b> 张牌。', needsTarget:false,
      effect(cs,ti,lv=0){ Combat._changeGear(cs,2); Combat.drawCards(cs,lv===1?2:1); } },
    // 14. 强制降挡：0费消耗 换挡+技能 降±2挡，对敌施加减速层数=降幅×2
    forced_downshift: { id:'forced_downshift', rarity:'common', name:'强制降挡', cost:0, type:'skill', emoji:'⬇️', description:'降 2 挡。对敌人施加「减速」层数等于降幅×2。消耗。', needsTarget:false,
      effect(cs){ const prev=cs.gear||2; Combat._changeGear(cs,-2); const dropped=prev-(cs.gear||2); if(dropped>0){ cs.enemies.forEach(e=>{ if(!e._dead) Combat.applyDebuff(e,'slow',dropped*2); }); }
      // 消耗牌：从手牌移出后不再进入弃牌堆，而是进入消耗堆
      const ci=cs.discardPile.lastIndexOf('forced_downshift'); if(ci!==-1) cs.discardPile.splice(ci,1); cs.exhaustPile.push('forced_downshift'); } },

    // ── 能力牌（4张）────────────────────────────────────────────────────────────────────────────────
    // 15. 红线突破：3费 能力+换挡 永久：6挡时无格挡惩罚，5挡以上每回合开始抄±1
    redline: { id:'redline', rarity:'epic', name:'红线突破', cost:3, type:'power', emoji:'🔴', description:'永久：处于 3 挡时，格挡获取不受减损（视为 2 挡倍率）。每回合开始时，若处于 3 挡，抽 1 张牌。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'redline',1); } },
    // 16. 赛车直觉：2费 能力 永久：每次升挡获得1点势头（战斗内可用作额外费用，上限±3）
    race_instinct: { id:'race_instinct', rarity:'rare', name:'赛车直觉', cost:2, type:'power', emoji:'💡', description:'永久：每当你升挡，获得 1 点「势头」（战斗内可用作额外费用，上限 3 点）。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'race_instinct',1); } },
    // 17. 全油门：2费 能力 永久：攻击牌伤害+1，升挡回合攻击牌伤害+2
    full_throttle: { id:'full_throttle', rarity:'rare', name:'全油门', cost:2, type:'power', emoji:'🔥', description:'永久：攻击牌造成的伤害 +1。若你在这一回合升过挡，攻击牌改为 +2。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'full_throttle',1); } },
    // 18. 防侧滑系统：1费 能力 永久：每次降挡获得2格挡
    anti_skid: { id:'anti_skid', rarity:'uncommon', name:'防侧滑系统', cost:1, type:'power', emoji:'🔧', description:'永久：每当你降挡，获得 2 点格挡。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'anti_skid',1); } },

    // ── 换挡标签牌（2张）────────────────────────────────────────────────────────────────────────────────
    // 19. 档位锁定：1费 技能+换挡 本回合档位不变，获得档位×3格挡
    gear_lock: { id:'gear_lock', rarity:'common', name:'档位锁定', cost:1, type:'skill', emoji:'🔒', description:'本回合档位锁定。获得 <b>档位×4</b> 点格挡（最多 12）。', needsTarget:false,
      effect(cs,ti,lv=0){ cs._gearLocked=true; const mult=lv>=1?5:4; Combat.gainBlock(cs,(cs.gear||2)*mult,true); } },
    // 20. 超速警告：0费消耗 攻击+换挡 3挡时造成16伤+降至2挡，否则无效
    overspeed: { id:'overspeed', rarity:'uncommon', name:'超速警告', cost:0, type:'attack', emoji:'🚨', description:'若处于 3 挡，造成 <b>16</b> 点伤害并强制降至 2 挡。否则无效果。消耗。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; if(g>=3){ const ftBonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,16+ftBonus); Combat._changeGear(cs,-1); }
      if(lv<2){ const oi=cs.discardPile.lastIndexOf('overspeed'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('overspeed'); } } },

    // ── 赛车手扩池 A：速度感深化（5张）────────────────────────────────────────────────────────
    speed_rush:     { id:'speed_rush',     rarity:'common',   name:'急加速',   cost:1, type:'attack', emoji:'💨', description:'造成 <b>3</b> 点伤害（含档位倍率），获得 <b>档位×3</b> 点速度感。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const bonus=Combat._getFtBonus(cs); const base=[3,4,5][lv]||3; const spMult=[3,4,5][lv]||3; Combat.dealDamage(cs,ti,Math.floor(base*dmgMult)+bonus); cs.speed=(cs.speed||0)+(g*spMult); } },
    corner_guard:   { id:'corner_guard',   rarity:'common',   name:'弯道守势', cost:1, type:'skill',  emoji:'🛡️', description:'获得 <b>5</b> 点格挡。若本回合已升过挡，额外获得 <b>3</b> 点格挡。', needsTarget:false,
      effect(cs,ti,lv=0){ const base=[5,6,7][lv]||5; const extra=cs._shiftedUpThisTurn?([3,4,5][lv]||3):0; Combat.gainBlock(cs,base+extra,true); } },
    inertia_strike: { id:'inertia_strike', rarity:'uncommon', name:'惯性冲击', cost:1, type:'attack', emoji:'⚡', description:'造成 <b>8</b> 点伤害（含档位倍率）。速度感每满 <b>20</b> 点，追加 <b>2</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv=0){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.5][g]; const base=[8,9,10][lv]||8; const spBonus=Math.floor((cs.speed||0)/20)*2; const bonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,Math.floor((base+spBonus)*dmgMult)+bonus); } },
    speed_limit_break: { id:'speed_limit_break', rarity:'uncommon', name:'飙车极限', cost:0, type:'skill', emoji:'🏁', description:'若速度感 ≥ <b>50</b>，本回合能量 +1。消耗。', needsTarget:false,
      effect(cs,ti,lv=0){ const threshold=lv>=1?35:50; if((cs.speed||0)>=threshold){ cs.energy+=1; } if(lv>=2){ return; } const oi=cs.discardPile.lastIndexOf('speed_limit_break'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('speed_limit_break'); } },
    speed_activate: { id:'speed_activate', rarity:'epic',   name:'速度感激活', cost:2, type:'power',  emoji:'✨', description:'永久：每回合开始额外获得 <b>8</b> 点速度感（上限 80）。', needsTarget:false,
      effect(cs,ti,lv=0){ Combat.applyBuff(cs.player,'speed_activate',1); } },

    // ── 负面牌（怪物插入手牌）────────────────────────────────────────────────────────────────
    // 黏液：史莱姆插入，99费无法打出，纯占手牌位
    slime_goo: { id:'slime_goo', name:'黏液', cost:99, type:'curse', emoji:'💚', description:'<span style="color:#ff8080">诅咒。无法打出。</span><br>黏糊糊的，没什么用。', needsTarget:false,
      effect(cs){} },
    // 伤口：已在第32行定义，99费无法打出，纯占手牌位（颚虫/巨颚虫插入）
    // 诅咒：邪教徒系列插入，99费无法打出，纯占手牌位
    curse_card: { id:'curse_card', name:'诅咒', cost:99, type:'curse', emoji:'💀', description:'<span style="color:#ff8080">诅咒。无法打出。</span><br>黑暗的力量缠绕着你。', needsTarget:false,
      effect(cs){} },
    // 中毒：毒虱/Boss插入，1费可打出（无效果），回合结束若在手牌扣3HP
    poison_card: { id:'poison_card', name:'中毒', cost:1, type:'curse', emoji:'☠️', description:'<span style="color:#ffaa60">⚠ 回合结束若仍在手牌中，<b>扣 3 HP</b>。</span><br><span style="color:#ff8080;opacity:0.85;font-size:0.85em">诅咒</span>', needsTarget:false,
      effect(cs){} },
    // 流血：Boss专属，1费可打出（无效果），回合结束若在手牌扣4HP
    bleed_card: { id:'bleed_card', name:'流血', cost:1, type:'curse', emoji:'🔴', description:'<span style="color:#ffaa60">⚠ 回合结束若仍在手牌中，<b>扣 4 HP</b>。</span><br><span style="color:#ff8080;opacity:0.85;font-size:0.85em">诅咒</span>', needsTarget:false,
      effect(cs){} },

    // ── 射手专属卡牌 ──────────────────────────────────────────────────────────────
    // 普通牌
    ar_shoot:   { id:'ar_shoot',   rarity:'common',   name:'精准射击', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>3</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:3; Combat.dealDamage(cs,ti,base+c*3); } },
    ar_dodge:   { id:'ar_dodge',   rarity:'common',   name:'闪身',     cost:1, type:'skill',  emoji:'🛡️', description:'获得 <b>4</b> 点格挡，获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv){ const blk=lv>=1?6:4; const chg=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,chg); } },
    ar_aim:     { id:'ar_aim',     rarity:'common',   name:'瞄准',     cost:0, type:'skill',  emoji:'🎯', description:'获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv){ const amt=lv>=1?3:2; Combat.archerGainCharge(cs,amt); if(lv>=2) Combat.drawCards(cs,1); } },
    ar_focus_aim: { id:'ar_focus_aim', rarity:'uncommon', name:'专注瞄准', cost:0, type:'skill', emoji:'🎯', description:'获得 <b>3</b> 点蓄力。消耗。', needsTarget:false,
      effect(cs,ti,lv=0){ const amt=lv>=1?4:3; Combat.archerGainCharge(cs,amt); if(lv>=2){ return; } const oi=cs.discardPile.lastIndexOf('ar_focus_aim'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('ar_focus_aim'); } },
    ar_sprint:  { id:'ar_sprint',  rarity:'common',   name:'急步',     cost:1, type:'skill',  emoji:'💨', description:'获得 <b>3</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', needsTarget:false,
      effect(cs,ti,lv){ const blk=lv>=1?5:3; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,1); Combat.drawCards(cs,1); } },
    ar_charge_shot: { id:'ar_charge_shot', rarity:'common', name:'蓄力射击', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>4</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?6:4; const mult=lv>=2?4:3; Combat.dealDamage(cs,ti,base+c*mult); } },
    ar_vuln_arrow: { id:'ar_vuln_arrow', rarity:'common', name:'易伤箭', cost:1, type:'attack', emoji:'🎯', description:'造成 <b>3</b> 点伤害，施加 <b>1</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:3; const mult=lv>=2?3:2; const vuln=lv>=1?2:1; Combat.dealDamage(cs,ti,base+c*mult); Combat.applyDebuff(cs.enemies[ti],'vulnerable',vuln); } },

    // 精良牌
    ar_double_shot: { id:'ar_double_shot', rarity:'uncommon', name:'双箭齐发', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>3</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于 2 次）。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=2?5:(lv>=1?4:3); const mult=lv>=2?3:2; Combat.dealDamage(cs,ti,base+c*mult); Combat.dealDamage(cs,ti,base+c*mult); } },
    ar_block_charge: { id:'ar_block_charge', rarity:'common', name:'格挡蓄力', cost:1, type:'skill', emoji:'🛡️', description:'获得 <b>5</b> 点格挡，然后获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const blk=lv>=1?7:5; const chg=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,chg); } },
    ar_roll:    { id:'ar_roll',    rarity:'uncommon', name:'翻滚闪避', cost:2, type:'skill',  emoji:'💨', description:'获得 <b>10</b> 点格挡，获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const blk=lv===1?13:10; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,2); } },
    ar_pierce:  { id:'ar_pierce',  rarity:'uncommon', name:'穿甲箭',   cost:2, type:'attack', emoji:'🏹', description:'造成 <b>8</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const e=cs.enemies[ti]; const oldBlock=e.block; e.block=0; const base=lv>=1?10:8; const mult=lv>=2?4:3; Combat.dealDamage(cs,ti,base+c*mult); e.block=oldBlock; } },
    ar_swap:    { id:'ar_swap',    rarity:'uncommon', name:'换箭',     cost:0, type:'skill',  emoji:'🔄', description:'丢弃手牌中任意 1 张牌，抽 <b>2</b> 张牌，获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ Combat._arSwapInteractive(cs,lv); } },
    ar_rapid_fire: { id:'ar_rapid_fire', rarity:'uncommon', name:'连续射击', cost:2, type:'attack', emoji:'🎯', description:'造成 <b>4</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 2 次）。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:4; for(let i=0;i<2;i++) Combat.dealDamage(cs,ti,base+c*2); } },
    ar_wind_step: { id:'ar_wind_step', rarity:'uncommon', name:'风驰步', cost:1, type:'skill', emoji:'💨', description:'获得 <b>4</b> 点格挡，获得 <b>1</b> 点蓄力。本回合下一张攻击牌费用 -1。', needsTarget:false,
      effect(cs,ti,lv=0){ const blk=lv>=1?6:4; const chg=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,chg); cs._archerNextAttackDiscount=(cs._archerNextAttackDiscount||0)+1; } },

    // 稀有牌
    ar_arrow_rain: { id:'ar_arrow_rain', rarity:'uncommon', name:'箭雨', cost:2, type:'attack', emoji:'🏹', description:'对所有敌人造成 <b>2</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', needsTarget:false,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=2?4:(lv>=1?3:2); cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead){ Combat.dealDamage(cs,i,base+c*2); Combat.dealDamage(cs,i,base+c*2); } }); } },
    ar_full_charge: { id:'ar_full_charge', rarity:'epic', name:'满蓄爆射', cost:2, type:'attack', emoji:'🎯', description:'<b>仅当蓄力 = 5（满蓄）时可打出。</b>消耗全部蓄力，造成 <b>22</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; const threshold=lv>=2?4:(cs.chargeMax||5); const dmg=lv>=1?28:22; if(c>=threshold){ cs.charge=0; Combat.dealDamage(cs,ti,dmg); } } },
    ar_gale:    { id:'ar_gale',    rarity:'uncommon', name:'疾风步',   cost:1, type:'skill',  emoji:'💨', description:'获得 <b>5</b> 点格挡，获得 <b>2</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', needsTarget:false,
      effect(cs,ti,lv=0){ const blk=lv>=1?7:5; const chg=lv>=2?3:2; const draw=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,chg); Combat.drawCards(cs,draw); const oi=cs.discardPile.lastIndexOf('ar_gale'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('ar_gale'); } },
    ar_pierce_all: { id:'ar_pierce_all', rarity:'uncommon', name:'贯穿射击', cost:2, type:'attack', emoji:'🏹', description:'对所有敌人造成 <b>6</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', needsTarget:false,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?8:6; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,base+c*3); }); } },

    // 史诗牌
    ar_instinct: { id:'ar_instinct', rarity:'epic', name:'猎手直觉', cost:2, type:'power', emoji:'✨', description:'永久：每 <b>2</b> 回合开始时，获得 <b>1</b> 点蓄力（不超过上限）。', needsTarget:false,
      effect(cs){ cs.player.buffs.archer_instinct=(cs.player.buffs.archer_instinct||0)+1; } },
    ar_cap_up:  { id:'ar_cap_up',  rarity:'rare',     name:'蓄力上限', cost:2, type:'power',  emoji:'✨', description:'永久：蓄力上限提升至 <b>6</b>（原为5）。立即获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const cap=lv>=1?8:6; const gain=lv>=1?3:2; cs.chargeMax=cap; Combat.archerGainCharge(cs,gain); } },
    ar_ultimate: { id:'ar_ultimate', rarity:'rare',   name:'终极连射', cost:3, type:'attack', emoji:'🏹', description:'造成 <b>5</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 4 次）。', needsTarget:true,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?6:5; for(let i=0;i<4;i++) Combat.dealDamage(cs,ti,base+c*2); } },

    // ── 射手扩池 B：速攻辅助（6张）──────────────────────────────────────────────────────────────
    ar_scatter:       { id:'ar_scatter',       rarity:'common',   name:'散射',     cost:1, type:'attack', emoji:'🏹', description:'对所有敌人造成 <b>2</b> 点伤害，获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const ftBonus=Combat._getFtBonus(cs); const base=[2,3,4][lv]||2; const chg=[1,1,2][lv]||1; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,base+ftBonus); }); Combat.archerGainCharge(cs,chg); } },
    ar_weak_arrow:    { id:'ar_weak_arrow',    rarity:'common',   name:'弱化箭',   cost:1, type:'attack', emoji:'🎯', description:'造成 <b>3</b> 点伤害，施加 <b>1</b> 层虚弱，获得 <b>1</b> 点蓄力。（不消耗蓄力）', needsTarget:true,
      effect(cs,ti,lv=0){ const ftBonus=Combat._getFtBonus(cs); const base=[3,4,5][lv]||3; const vuln=[1,1,2][lv]||1; Combat.dealDamage(cs,ti,base+ftBonus); Combat.applyDebuff(cs.enemies[ti],'weak',vuln); Combat.archerGainCharge(cs,1); } },
    ar_dodge_counter: { id:'ar_dodge_counter', rarity:'common', name:'闪避反击', cost:1, type:'skill',  emoji:'🛡️', description:'获得 <b>5</b> 点格挡。若本场战斗受过伤，额外获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const blk=[5,6,8][lv]||5; Combat.gainBlock(cs,blk,true); if(cs._tookDamageThisCombat){ Combat.archerGainCharge(cs,[2,3,4][lv]||2); } } },
    ar_hunter_rhythm: { id:'ar_hunter_rhythm', rarity:'common', name:'猎手节奏', cost:0, type:'skill',  emoji:'🎵', description:'获得 <b>2</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', needsTarget:false,
      effect(cs,ti,lv=0){ const amt=lv>=1?3:2; Combat.archerGainCharge(cs,amt); Combat.drawCards(cs,1); if(lv>=2){ return; } const oi=cs.discardPile.lastIndexOf('ar_hunter_rhythm'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('ar_hunter_rhythm'); } },
    ar_arrow_storm:   { id:'ar_arrow_storm',   rarity:'rare',     name:'箭矢风暴', cost:3, type:'attack', emoji:'🌪️', description:'对所有敌人造成（<b>1</b>+蓄力）点伤害 <b>4</b> 次，消耗全部蓄力。', needsTarget:false,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const ftBonus=Combat._getFtBonus(cs); const base=[1,2,2][lv]||1; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead){ for(let j=0;j<4;j++) Combat.dealDamage(cs,i,base+c+ftBonus); } }); } },
    ar_threshold:     { id:'ar_threshold',     rarity:'rare',     name:'蓄力爆发', cost:1, type:'power',  emoji:'✨', description:'永久：每回合开始时，若蓄力 ≥ <b>4</b>，获得 <b>1</b> 点额外能量。', needsTarget:false,
      effect(cs,ti,lv=0){ cs.player.buffs.ar_threshold=(cs.player.buffs.ar_threshold||0)+1; } },

    // ── 箭矢元素扩池：火系 ──────────────────────────────────────────────────────────
    ar_fire_arrow: { id:'ar_fire_arrow', rarity:'common', name:'点火箭', cost:1, type:'attack', emoji:'🔥', description:'造成 <b>4</b> 点伤害，施加 <b>2</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=[4,5,6][lv]||4; const burn=[2,2,3][lv]||2; Combat.dealDamage(cs,ti,base+c*2); Combat.applyDebuff(cs.enemies[ti],'burn',burn); } },
    ar_flame_arrow: { id:'ar_flame_arrow', rarity:'uncommon', name:'烈焰箭', cost:1, type:'attack', emoji:'🔥', description:'造成 <b>5</b> 点伤害，施加 <b>3</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=[5,7,9][lv]||5; const burn=[3,3,4][lv]||3; Combat.dealDamage(cs,ti,base+c*2); Combat.applyDebuff(cs.enemies[ti],'burn',burn); } },
    ar_inferno_arrow: { id:'ar_inferno_arrow', rarity:'rare', name:'焚天箭', cost:2, type:'attack', emoji:'🔥', description:'对所有敌人造成 <b>5</b> 点伤害，施加 <b>4</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（对全体）。', needsTarget:false,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=[5,7,7][lv]||5; const burn=[4,4,5][lv]||4; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead){ Combat.dealDamage(cs,i,base+c*2); Combat.applyDebuff(cs.enemies[i],'burn',burn); } }); } },

    // ── 箭矢元素扩池：冰系 ──────────────────────────────────────────────────────────
    ar_chill_arrow: { id:'ar_chill_arrow', rarity:'uncommon', name:'严寒箭', cost:2, type:'attack', emoji:'❄️', description:'造成 <b>5</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害；并且每消耗 1 点蓄力，<b>+12%</b> 冻结概率（基础 0%，上限 <b>85%</b>）。', needsTarget:true,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=[5,7,7][lv]||5; const perChg=[0.12,0.14,0.16][lv]||0.12; const chance=Math.min(0.85, c*perChg); Combat.dealDamage(cs,ti,base+c*2); if(Math.random()<chance){ Combat.applyDebuff(cs.enemies[ti],'freeze',1); Combat._showFreezeEffect(); } } },
    ar_freeze_arrow: { id:'ar_freeze_arrow', rarity:'rare', name:'冰封箭', cost:3, type:'attack', emoji:'❄️', description:'造成 <b>8</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害；并且每消耗 1 点蓄力，<b>+15%</b> 冻结概率（基础 10%，上限 <b>90%</b>）。', needsTarget:true,
      effect(cs,ti,lv=0){ const c=cs.charge||0; cs.charge=0; const base=[8,12,12][lv]||8; const perChg=[0.15,0.17,0.19][lv]||0.15; const chance=Math.min(0.90, 0.10 + c*perChg); Combat.dealDamage(cs,ti,base+c*3); if(Math.random()<chance){ Combat.applyDebuff(cs.enemies[ti],'freeze',1); Combat._showFreezeEffect(); } } },

    // ── 拳击手牌组 ───────────────────────────────────────────────────────────────────
    // 起始牌
    box_jab:      { id:'box_jab',      rarity:'common',   name:'直拳',     cost:1, type:'attack', emoji:'🥊', needsTarget:true,
      description:'造成 <b>5</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[5,7,10][lv]||5; Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); } },
    box_guard:    { id:'box_guard',    rarity:'common',   name:'格挡步',   cost:1, type:'skill',  emoji:'🛡', needsTarget:false,
      description:'获得 <b>6</b> 点格挡。',
      effect(cs,ti,lv=0){ const blk=[6,8,11][lv]||6; Combat.gainBlock(cs,blk,true); } },
    box_cross:    { id:'box_cross',    rarity:'common',   name:'右直拳',   cost:1, type:'attack', emoji:'🤜', needsTarget:true,
      description:'造成 <b>9</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[9,12,15][lv]||9; Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); } },
    box_uppercut: { id:'box_uppercut', rarity:'uncommon', name:'上勾拳',   cost:2, type:'attack', emoji:'💥', needsTarget:true,
      description:'造成 <b>18</b> 点伤害。若上回合未受到伤害，仅造成 <b>8</b> 点。',
      effect(cs,ti,lv=0){ const tookDmg=(cs.damageTakenLastTurn||0)>0; const base=tookDmg?([18,22,26][lv]||18):([8,11,14][lv]||8); Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); } },

    // 普通奖励牌
    box_combo:    { id:'box_combo',    rarity:'common',   name:'连击',     cost:1, type:'attack', emoji:'🌪️', needsTarget:true,
      description:'造成 <b>3</b> 段 <b>3</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[3,4,5][lv]||3; const bonus=Combat._getBoxerBonus(cs); for(let i=0;i<3;i++) Combat.dealDamage(cs,ti,base+bonus); } },
    box_body_blow:{ id:'box_body_blow',rarity:'uncommon', name:'身体打击', cost:1, type:'attack', emoji:'🎯', needsTarget:true,
      description:'造成 <b>10</b> 点伤害，施加 <b>1</b> 层虚弱。',
      effect(cs,ti,lv=0){ const base=[10,13,16][lv]||10; const weak=[1,1,2][lv]||1; Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); Combat.applyDebuff(cs.enemies[ti],'weak',weak); } },
    box_counter:  { id:'box_counter',  rarity:'common',   name:'反击',     cost:1, type:'attack', emoji:'🔄', needsTarget:true,
      description:'造成 <b>5</b> 点伤害。若有愤怒则改为造成 <b>10</b> 点并消耗全部愤怒。',
      effect(cs,ti,lv=0){ const fury=cs.player.buffs?.fury||0; const bonus=Combat._getBoxerBonus(cs); if(fury>0){ cs.player.buffs.fury=0; Combat.dealDamage(cs,ti,([10,13,16][lv]||10)+bonus); } else { Combat.dealDamage(cs,ti,([5,7,9][lv]||5)+bonus); } } },
    box_iron_step:{ id:'box_iron_step',rarity:'common',   name:'铁块步',   cost:1, type:'skill',  emoji:'🛡', needsTarget:false,
      description:'获得 <b>10</b> 点格挡。',
      effect(cs,ti,lv=0){ Combat.gainBlock(cs,[10,13,16][lv]||10,true); } },

    // 稀有奖励牌
    box_haymaker: { id:'box_haymaker', rarity:'rare',     name:'大摆拳',   cost:2, type:'attack', emoji:'🌀', needsTarget:true,
      description:'消耗全部愤怒，每点愤怒转化为 <b>3</b> 点伤害，基础 <b>14</b> 点。',
      effect(cs,ti,lv=0){ const fury=cs.player.buffs?.fury||0; cs.player.buffs.fury=0; const base=[14,18,22][lv]||14; const mult=[3,4,5][lv]||3; const berserk=Combat._getBoxerBerserk(cs); Combat.dealDamage(cs,ti,base+fury*mult+berserk); } },
    box_rage_combo:{ id:'box_rage_combo',rarity:'rare',   name:'怒连击',   cost:1, type:'attack', emoji:'🔥', needsTarget:true,
      description:'愤怒 ≥ 3 时造成 <b>3</b> 段伤害；否则 <b>1</b> 段 <b>6</b> 点。',
      effect(cs,ti,lv=0){ const fury=cs.player.buffs?.fury||0; const bonus=Combat._getBoxerBonus(cs); const thr=[3,2,2][lv]||3; if(fury>=thr){ const base=[3,4,5][lv]||3; for(let i=0;i<3;i++) Combat.dealDamage(cs,ti,base+fury+bonus); } else { Combat.dealDamage(cs,ti,([6,8,10][lv]||6)+bonus); } } },
    box_taunt:    { id:'box_taunt',    rarity:'uncommon', name:'蓄势',     cost:1, type:'skill',  emoji:'😤', needsTarget:false,
      description:'立即获得 <b>2</b> 点愤怒。打出后消耗。',
      effect(cs,ti,lv=0){ if(!cs.player.buffs) cs.player.buffs={}; cs.player.buffs.fury=(cs.player.buffs.fury||0)+([2,3,3][lv]||2); const i=cs.discardPile.lastIndexOf('box_taunt'); if(i!==-1) cs.discardPile.splice(i,1); cs.exhaustPile.push('box_taunt'); } },
    box_second_wind:{ id:'box_second_wind',rarity:'uncommon', name:'第二春',   cost:2, type:'skill',  emoji:'💚', needsTarget:false,
      description:'回复 <b>4</b> 点 HP。血量低于一半时改为回复 <b>7</b> 点。',
      effect(cs,ti,lv=0){ const half=cs.player.maxHp/2; const heal=cs.player.hp<half?([7,9,11][lv]||7):([4,6,8][lv]||4); cs.player.hp=Math.min(cs.player.hp+heal,cs.player.maxHp); State.run.character.hp=cs.player.hp; } },

    // 史诗能力牌
    box_bloodlust:{ id:'box_bloodlust',rarity:'epic',     name:'嗜血本能', cost:2, type:'power',  emoji:'🩸', needsTarget:false,
      description:'能力。每回合开始时，若 HP 低于一半，获得 <b>1</b> 点额外能量。',
      effect(cs){ cs.player.buffs.box_bloodlust=(cs.player.buffs.box_bloodlust||0)+1; } },
    box_iron_will:{ id:'box_iron_will',rarity:'epic',     name:'钢铁意志', cost:1, type:'power',  emoji:'⚙️', needsTarget:false,
      description:'能力。搏命加成翻倍：每损失 <b>25%</b> HP，攻击 <b>+4</b>（原为 +2）。',
      effect(cs){ cs.player.buffs.box_iron_will=(cs.player.buffs.box_iron_will||0)+1; } },

    // ── 拳击手扩池：补充 12 张 ─────────────────────────────────────────────────────────
    box_quick_jab:    { id:'box_quick_jab',    rarity:'common',   name:'刺拳连发', cost:0, type:'attack', emoji:'🥊', needsTarget:true,
      description:'造成 <b>3</b> 段 <b>2</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[2,2,3][lv]||2; const hits=[3,3,3][lv]||3; const bonus=Combat._getBoxerBonus(cs); for(let i=0;i<hits;i++) Combat.dealDamage(cs,ti,base+bonus); } },
    box_low_kick:     { id:'box_low_kick',     rarity:'uncommon', name:'低扫腿',   cost:1, type:'attack', emoji:'🦵', needsTarget:true,
      description:'造成 <b>7</b> 点伤害，施加 <b>2</b> 层虚弱。',
      effect(cs,ti,lv=0){ const base=[7,9,11][lv]||7; const w=[2,3,3][lv]||2; Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); Combat.applyDebuff(cs.enemies[ti],'weak',w); } },
    box_dodge_punch:  { id:'box_dodge_punch',  rarity:'uncommon', name:'闪避反击', cost:1, type:'attack', emoji:'🥷', needsTarget:true,
      description:'获得 <b>4</b> 点格挡，造成 <b>6</b> 点伤害。',
      effect(cs,ti,lv=0){ const blk=[4,6,8][lv]||4; const base=[6,8,10][lv]||6; Combat.gainBlock(cs,blk,true); Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); } },
    box_endure:       { id:'box_endure',       rarity:'uncommon', name:'坚韧',     cost:1, type:'skill',  emoji:'😤', needsTarget:false,
      description:'获得 <b>8</b> 点格挡，并获得 <b>1</b> 点愤怒。',
      effect(cs,ti,lv=0){ const blk=[8,10,12][lv]||8; const fg=[1,2,2][lv]||1; Combat.gainBlock(cs,blk,true); if(!cs.player.buffs) cs.player.buffs={}; cs.player.buffs.fury=(cs.player.buffs.fury||0)+fg; } },
    box_hook:         { id:'box_hook',         rarity:'uncommon', name:'勾拳',     cost:1, type:'attack', emoji:'🪝', needsTarget:true,
      description:'造成 <b>5</b> 点伤害。每点愤怒额外造成 <b>2</b> 点伤害（不消耗愤怒）。',
      effect(cs,ti,lv=0){
        const base=[5,7,9][lv]||5;
        const per=[2,2,3][lv]||2;
        const fury=cs.player.buffs?.fury||0;
        Combat.dealDamage(cs,ti,base+per*fury+Combat._getBoxerBonus(cs));
      } },
    box_clinch:       { id:'box_clinch',       rarity:'uncommon', name:'缠抱',     cost:1, type:'skill',  emoji:'🫂', needsTarget:false,
      description:'获得 <b>5</b> 点格挡，对所有敌人施加 <b>1</b> 层虚弱。',
      effect(cs,ti,lv=0){ const blk=[5,7,9][lv]||5; Combat.gainBlock(cs,blk,true); cs.enemies.forEach(e=>{ if(!e._dead) Combat.applyDebuff(e,'weak',[1,2,2][lv]||1); }); } },
    box_furious_strike:{ id:'box_furious_strike',rarity:'uncommon',name:'怒火出拳', cost:1, type:'attack', emoji:'😡', needsTarget:true,
      description:'造成 <b>8</b> 点伤害。HP 越低，伤害越高（每损失 <b>20%</b> 最大 HP 额外 <b>+3</b>）。',
      effect(cs,ti,lv=0){ const base=[8,11,14][lv]||8; const lost=1-cs.player.hp/cs.player.maxHp; const extra=Math.floor(lost/0.2)*([3,4,5][lv]||3); Combat.dealDamage(cs,ti,base+extra+Combat._getBoxerBonus(cs)); } },
    box_double_jab:   { id:'box_double_jab',   rarity:'common',   name:'双刺拳',   cost:1, type:'attack', emoji:'👊', needsTarget:true,
      description:'造成 <b>2</b> 段 <b>3</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[3,4,5][lv]||3; const bonus=Combat._getBoxerBonus(cs); Combat.dealDamage(cs,ti,base+bonus); Combat.dealDamage(cs,ti,base+bonus); } },
    box_break_guard:  { id:'box_break_guard',  rarity:'rare',     name:'破防',     cost:2, type:'attack', emoji:'💢', needsTarget:true,
      description:'造成 <b>12</b> 点伤害（无视目标格挡）。',
      effect(cs,ti,lv=0){ const base=[12,15,18][lv]||12; const e=cs.enemies[ti]; const ob=e.block; e.block=0; Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); e.block=ob; } },
    box_iron_chin:    { id:'box_iron_chin',    rarity:'rare',     name:'铁下巴',   cost:0, type:'power',  emoji:'🦷', needsTarget:false,
      description:'能力。本场战斗内，所有受到的伤害 <b>-1</b>（最低 0）。',
      effect(cs){ cs.player.buffs.box_iron_chin=(cs.player.buffs.box_iron_chin||0)+1; } },
    box_knockout:     { id:'box_knockout',     rarity:'epic',     name:'KO 一击',  cost:3, type:'attack', emoji:'💥', needsTarget:true,
      description:'造成 <b>24</b> 点伤害。若敌人 HP ≤ <b>40%</b>，改为造成 <b>40</b> 点。',
      effect(cs,ti,lv=0){ const e=cs.enemies[ti]; const lo=e.hp/e.maxHp<=0.40; const base=lo?([40,48,56][lv]||40):([24,30,36][lv]||24); Combat.dealDamage(cs,ti,base+Combat._getBoxerBonus(cs)); } },
    box_footwork:     { id:'box_footwork',     rarity:'uncommon', name:'步法',     cost:0, type:'skill',  emoji:'👟', needsTarget:false,
      description:'获得 <b>4</b> 点格挡，抽 <b>1</b> 张牌。',
      effect(cs,ti,lv=0){ const blk=[4,6,8][lv]||4; Combat.gainBlock(cs,blk,true); Combat.drawCards(cs,lv>=2?2:1); } },

    // ── 战士牌组：基础起始牌（rarity 标识，复用 strike/defend/clash 通用牌）─────────
    // 起始牌组中的 strike/defend/clash 已在通用区定义。下面是战士专属奖励牌。
    br_double_strike: { id:'br_double_strike', rarity:'common',   name:'二连击',   cost:1, type:'attack', emoji:'⚔️', needsTarget:true,
      description:'造成 <b>2</b> 段 <b>4</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[4,5,7][lv]||4; const str=cs.player.buffs?.strength||0; Combat.dealDamage(cs,ti,base+str); Combat.dealDamage(cs,ti,base+str); } },
    br_heavy_blade:   { id:'br_heavy_blade',   rarity:'common',   name:'重剑',     cost:2, type:'attack', emoji:'🗡️', needsTarget:true,
      description:'造成 <b>12</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[12,16,20][lv]||12; const str=cs.player.buffs?.strength||0; Combat.dealDamage(cs,ti,base+str); } },
    br_cleave:        { id:'br_cleave',        rarity:'common',   name:'横扫',     cost:1, type:'attack', emoji:'🌊', needsTarget:false,
      description:'对所有敌人造成 <b>7</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[7,10,13][lv]||7; const str=cs.player.buffs?.strength||0; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,base+str); }); } },
    br_shield_wall:   { id:'br_shield_wall',   rarity:'common',   name:'盾墙',     cost:1, type:'skill',  emoji:'🛡️', needsTarget:false,
      description:'获得 <b>10</b> 点格挡。',
      effect(cs,ti,lv=0){ const blk=[10,13,16][lv]||10; Combat.gainBlock(cs,blk,true); } },
    // 战吼：复合型 — 削弱敌人 + 自我加固（区别于纯 debuff 卡）
    br_taunt_roar:    { id:'br_taunt_roar',    rarity:'uncommon', name:'战吼',     cost:1, type:'skill',  emoji:'📢', needsTarget:false,
      description:'对所有敌人施加 <b>1</b> 层虚弱，并获得 <b>5</b> 点格挡。',
      effect(cs,ti,lv=0){ const w=[1,2,2][lv]||1; const b=[5,7,9][lv]||5; cs.enemies.forEach(e=>{ if(!e._dead) Combat.applyDebuff(e,'weak',w); }); Combat.gainBlock(cs,b,true); } },
    // 破甲击：基础攻击+易伤 — 简单 combo，多种游戏都有的设计
    br_bash_v:        { id:'br_bash_v',        rarity:'uncommon', name:'破甲击',   cost:1, type:'attack', emoji:'🔨', needsTarget:true,
      description:'造成 <b>9</b> 点伤害，施加 <b>2</b> 层易伤。',
      effect(cs,ti,lv=0){ const base=[9,12,15][lv]||9; const v=[2,3,3][lv]||2; const str=cs.player.buffs?.strength||0; Combat.dealDamage(cs,ti,base+str); Combat.applyDebuff(cs.enemies[ti],'vulnerable',v); } },
    // 透支：原创设计 — 弃手牌换能量（不掉血，区别于 STS 的 Bloodletting）
    br_bloodletting:  { id:'br_bloodletting',  rarity:'uncommon', name:'透支',     cost:0, type:'skill',  emoji:'⚡', needsTarget:false,
      description:'弃掉 <b>2</b> 张手牌（自动从最右开始）；获得 <b>2</b> 点能量。',
      effect(cs,ti,lv=0){ const n=[2,2,1][lv]||2; for(let i=0;i<n && cs.hand.length>0;i++){ const c=cs.hand.pop(); cs.discardPile.push(c); } cs.energy=(cs.energy||0)+([2,3,3][lv]||2); } },
    // 紧逼：原创 — 越多攻击越狠（鼓励攻击堆叠，简单 combo）
    br_pommel_smash:  { id:'br_pommel_smash',  rarity:'uncommon', name:'紧逼',     cost:1, type:'attack', emoji:'👊', needsTarget:true,
      description:'造成 <b>6</b> 点伤害；本回合每打过 1 张攻击牌额外造成 <b>2</b> 伤害（最高 +8）。',
      effect(cs,ti,lv=0){
        const base=[6,8,10][lv]||6;
        const per=[2,2,3][lv]||2;
        const cap=[8,10,12][lv]||8;
        const cnt=cs._attacksPlayedThisTurn||0;
        const bonus=Math.min(cnt*per, cap);
        const str=cs.player.buffs?.strength||0;
        Combat.dealDamage(cs,ti,base+bonus+str);
      } },
    // 硬抗：原创 — 简单防御 buff（区别于纯格挡）
    br_grit:          { id:'br_grit',          rarity:'uncommon', name:'硬抗',     cost:1, type:'skill',  emoji:'🛡️', needsTarget:false,
      description:'获得 <b>8</b> 点格挡；本回合受到的所有伤害额外 <b>-2</b>。',
      effect(cs,ti,lv=0){ const b=[8,10,12][lv]||8; const r=[2,3,3][lv]||2; Combat.gainBlock(cs,b,true); cs.player.buffs.gritReduce=(cs.player.buffs.gritReduce||0)+r; } },
    // 肉搏战：原创 — 高强度 AOE，无自损（卡名保留但机制改）
    br_iron_swing:    { id:'br_iron_swing',    rarity:'rare',     name:'肉搏战',   cost:2, type:'attack', emoji:'💪', needsTarget:false,
      description:'对所有敌人造成 <b>16</b> 点伤害。',
      effect(cs,ti,lv=0){ const base=[16,20,24][lv]||16; const str=cs.player.buffs?.strength||0; cs.enemies.forEach((en,j)=>{ if(!en._dead) Combat.dealDamage(cs,j,base+str); }); } },
    // 断头台：原创 epic — 简单粗暴的斩杀机制，符合战士「力气大」主题
    br_executioner:   { id:'br_executioner',   rarity:'epic',     name:'断头台',   cost:2, type:'attack', emoji:'🪓', needsTarget:true,
      description:'造成 <b>15</b> 点伤害；若目标 HP ≤ <b>30%</b>，额外造成 <b>20</b> 点伤害。',
      effect(cs,ti,lv=0){
        const base=[15,18,22][lv]||15;
        const bonus=[20,24,28][lv]||20;
        const threshold=[0.30,0.30,0.40][lv]||0.30;
        const e=cs.enemies[ti];
        const lo=e.hp/e.maxHp<=threshold;
        const str=cs.player.buffs?.strength||0;
        Combat.dealDamage(cs,ti,base+str);
        if(lo){ Combat.dealDamage(cs,ti,bonus+str); }
      } },
    // 狂战士：原创 rare — 缺血叠力量（战士版搏命）
    br_berserker:     { id:'br_berserker',     rarity:'rare',     name:'狂战士',   cost:1, type:'power',  emoji:'😤', needsTarget:false,
      description:'能力。永久 <b>+2</b> 力量；每损失 <b>25%</b> 最大 HP，再 <b>+1</b> 力量（最多 +5）。',
      effect(cs,ti,lv=0){
        const baseStr=[2,3,3][lv]||2;
        Combat.applyBuff(cs.player,'strength',baseStr);
        const lostFrac=1 - cs.player.hp/cs.player.maxHp;
        const extra=Math.min(Math.floor(lostFrac/0.25), 5);
        if(extra>0) Combat.applyBuff(cs.player,'strength',extra);
      } },
    // 压制：原创「以强欺弱」— 当你 HP 比敌人多时狠狠地揍他
    br_overwhelm:     { id:'br_overwhelm',     rarity:'rare',     name:'压制',     cost:1, type:'attack', emoji:'🥊', needsTarget:true,
      description:'造成 <b>9</b> 点伤害；若你当前 HP <b>高于</b>目标当前 HP，伤害<b>翻倍</b>。',
      effect(cs,ti,lv=0){
        const base=[9,13,17][lv]||9;
        const e=cs.enemies[ti];
        const dom=cs.player.hp > e.hp;
        const str=cs.player.buffs?.strength||0;
        const dmg=dom?(base+str)*2:(base+str);
        Combat.dealDamage(cs,ti,dmg);
      } },
  },
  enemies: {
    slime: {
      id:'slime', name:'史莱姆', emoji:'🟢', hp:14, maxHp:14, actions:['tackle','tackle','goop','tackle','burst'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length];
        if(a==='tackle') return [{type:'attack',val:5,label:'⚔️',num:'5',detail:'对玩家造成 5 点伤害'}];
        if(a==='goop') return [{type:'debuff',label:'💧',num:'虚弱',detail:'对玩家施加 2 层【虚弱】\n虚弱：造成的伤害减少 25%，每回合结束减 1 层'}];
        return [{type:'pollute',label:'💦',num:'黏液爬',detail:'对玩家造成 3 点伤害，并将 1 张「黏液」牌插入手牌'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length];
        if(a==='tackle') Combat.enemyAttack(cs,si,5);
        else if(a==='goop') Combat.applyDebuff(cs.player,'weak',2);
        else if(a==='burst'){ Combat.enemyAttack(cs,si,3); cs.hand.push('slime_goo'); }
        s.actionIndex++; }
    },
    cultist: {
      id:'cultist', name:'邪教徒', emoji:'🧟', hp:20, maxHp:20, actions:['ritual','stab','curse_act','stab'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0;
        if(a==='ritual') return [{type:'buff',label:'✨',num:'仪式',detail:'为自身叠加 3 层【力量】\n力量：每层使攻击伤害 +1（永久）'}];
        if(a==='curse_act') return [{type:'pollute',label:'💢',num:'诅咒',detail:'施加 2 层【易伤】，并将 1 张「诅咒」牌插入手牌'}];
        return [{type:'attack',val:6+str,label:'⚔️',num:String(6+str),detail:`对玩家造成 ${6+str} 点伤害${str>0?' (含 '+str+' 层力量加成)':''}`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length];
        if(a==='ritual') Combat.applyBuff(s,'strength',3);
        else if(a==='curse_act'){ Combat.applyDebuff(cs.player,'vulnerable',2); cs.hand.push('curse_card'); }
        else Combat.enemyAttack(cs,si,6+(s.buffs.strength||0)); s.actionIndex++; }
    },
    louse: { id:'louse', name:'虱子', emoji:'🐛', hp:12, maxHp:12, actions:['bite','bite','parasite','curl'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; if(a==='bite')return[{type:'attack',val:5,label:'⚔️',num:'5',detail:'对玩家造成 5 点伤害'}]; if(a==='curl')return[{type:'defend',val:6,label:'🛡',num:'6',detail:'为自身获得 6 点格挡'}]; return[{type:'pollute',label:'🦠',num:'寄生',detail:'对玩家造成 4 点伤害，并将 1 张「中毒」牌插入手牌'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; if(a==='bite')Combat.enemyAttack(cs,si,5); else if(a==='parasite'){Combat.enemyAttack(cs,si,4);cs.hand.push('poison_card');} else s.block+=6; s.actionIndex++; }
    },
    jawworm: {
      id:'jawworm', name:'颚虫', emoji:'🦷', hp:44, maxHp:44, actions:['chomp','thrash','thrash','bellow','devour'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length];
        if(a==='chomp') return [{type:'attack',val:11,label:'⚔️',num:'11',detail:'对玩家造成 11 点伤害'}];
        if(a==='thrash') return [{type:'attack',val:7,label:'⚔️',num:'7',detail:'对玩家造成 7 点伤害'},{type:'defend',val:6,label:'🛡',num:'6',detail:'为自身获得 6 点格挡'}];
        if(a==='bellow') return [{type:'buff',label:'✨',num:'和哮',detail:'为自身叠加 3 层【力量】并获得 9 点格挡'}];
        return [{type:'pollute',label:'🦷',num:'吞噬',detail:'造成 6 点伤害，并将 1 张「伤口」牌插入手牌'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length];
        if(a==='chomp') Combat.enemyAttack(cs,si,11);
        else if(a==='thrash'){ Combat.enemyAttack(cs,si,7); s.block+=6; }
        else if(a==='bellow'){ Combat.applyBuff(s,'strength',3); s.block+=9; }
        else if(a==='devour'){ Combat.enemyAttack(cs,si,6); cs.hand.push('wound'); }
        s.actionIndex++; }
    },
    // ── 第二层敌人（升级版）──
    cultist2: {
      id:'cultist2', name:'狂热邪教徒', emoji:'🧟', hp:30, maxHp:30, actions:['ritual','stab','blood_rite','stab'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0;
        if(a==='ritual') return [{type:'buff',label:'✨',num:'仪式',detail:'为自身叠加 3 层【力量】'}];
        if(a==='blood_rite') return [{type:'pollute',label:'🔥',num:'血祭',detail:'施加 2 层【易伤】+1 层【虚弱】，将 1 张「诅咒」牌插入手牌'}];
        return [{type:'attack',val:8+str,label:'⚔️',num:String(8+str),detail:`对玩家造成 ${8+str} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length];
        if(a==='ritual') Combat.applyBuff(s,'strength',3);
        else if(a==='blood_rite'){ Combat.applyDebuff(cs.player,'vulnerable',2); Combat.applyDebuff(cs.player,'weak',1); cs.hand.push('curse_card'); }
        else Combat.enemyAttack(cs,si,8+(s.buffs.strength||0));
        s.actionIndex++; }
    },
    louse2: { id:'louse2', name:'毒虱', emoji:'🐛', hp:18, maxHp:18, actions:['bite','inject','bite','curl','bite'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; if(a==='bite')return[{type:'attack',val:7,label:'⚔️',num:'7',detail:'对玩家造成 7 点伤害'}]; if(a==='curl')return[{type:'defend',val:8,label:'🛡',num:'8',detail:'为自身获得 8 点格挡'}]; return[{type:'pollute',label:'💉',num:'注射',detail:'造成 5 点伤害，将 1 张「中毒」牌插入手牌'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; if(a==='bite')Combat.enemyAttack(cs,si,7); else if(a==='inject'){Combat.enemyAttack(cs,si,5);cs.hand.push('poison_card');} else s.block+=8; s.actionIndex++; }
    },
    jawworm2: {
      id:'jawworm2', name:'巨颚虫', emoji:'🦷', hp:58, maxHp:58, actions:['chomp','thrash','thrash','bellow','deep_devour'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length];
        if(a==='chomp') return [{type:'attack',val:14,label:'⚔️',num:'14',detail:'对玩家造成 14 点伤害'}];
        if(a==='thrash') return [{type:'attack',val:9,label:'⚔️',num:'9',detail:'对玩家造成 9 点伤害'},{type:'defend',val:8,label:'🛡',num:'8',detail:'为自身获得 8 点格挡'}];
        if(a==='bellow') return [{type:'buff',label:'✨',num:'和哮',detail:'为自身叠加 4 层【力量】并获得 12 点格挡'}];
        return [{type:'pollute',label:'🦷',num:'深吹',detail:'造成 10 点伤害，将 2 张「伤口」牌插入手牌，施加 2 层【易伤】'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length];
        if(a==='chomp') Combat.enemyAttack(cs,si,14);
        else if(a==='thrash'){ Combat.enemyAttack(cs,si,9); s.block+=8; }
        else if(a==='bellow'){ Combat.applyBuff(s,'strength',4); s.block+=12; }
        else if(a==='deep_devour'){ Combat.enemyAttack(cs,si,10); cs.hand.push('wound'); cs.hand.push('wound'); Combat.applyDebuff(cs.player,'vulnerable',2); }
        s.actionIndex++; }
    },
    // 第二层 Boss：班布
    banbu: {
      id:'banbu', name:'班布', emoji:'🐆', hp:180, maxHp:180, actions:['prowl','slash','slash','roar','pounce'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0; if(a==='prowl')return[{type:'buff',label:'✨',num:'蓄势',detail:'为自身叠加 2 层【力量】\n力量：每层使攻击伤害 +1（永久）'}]; if(a==='slash')return[{type:'attack',val:12+str,label:'⚔️',num:String(12+str),detail:`对玩家造成 ${12+str} 点伤害`},{type:'defend',val:8,label:'🛡',num:'8',detail:'为自身获得 8 点格挡'}]; if(a==='roar')return[{type:'defend',val:18,label:'🛡',num:'18',detail:'为自身获得 18 点格挡'}]; return[{type:'attack',val:8+str,label:'⚔️',num:`×4(${8+str})`,detail:`对玩家造成 4×${8+str} = ${4*(8+str)} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; if(a==='prowl')Combat.applyBuff(s,'strength',2); else if(a==='slash'){Combat.enemyAttack(cs,si,12+(s.buffs.strength||0));s.block+=8;} else if(a==='roar')s.block+=18; else{for(let i=0;i<4;i++)Combat.enemyAttack(cs,si,8+(s.buffs.strength||0));} s.actionIndex++; }
    },
    boge: {
      id:'boge', name:'波哥', emoji:'👑', hp:220, maxHp:220, actions:['slash','slash','heavy','buff','ultimate'],
      getIntent(s){
        const a=s.actions[s.actionIndex%s.actions.length];
        const str=s.buffs?.strength||0;
        if(a==='buff') return [{type:'buff',label:'✨',num:'鼓舞',detail:'鼓舞：自身 +2 力量、+15 格挡'}];
        if(a==='heavy') return [{type:'attack',val:20+str,label:'⚔️',num:String(20+str),detail:`沉重一击：造成 ${20+str} 点伤害（单次重击）`}];
        if(a==='ultimate') return [{type:'attack',val:10+str,label:'⚔️',num:`×3(${10+str})`,detail:`连环三连击：造成 ${10+str} 点伤害 × 3 次（共 ${(10+str)*3} 点）`}];
        return [{type:'attack',val:12+str,label:'⚔️',num:String(12+str),detail:`快速斩击：造成 ${12+str} 点伤害`}];
      },
      doAction(cs,si){
        const s=cs.enemies[si], a=s.actions[s.actionIndex%s.actions.length];
        const str=s.buffs.strength||0;
        if(a==='buff'){ Combat.applyBuff(s,'strength',2); s.block+=15; }
        else if(a==='heavy'){ Combat.enemyAttack(cs,si,20+str); }
        else if(a==='ultimate'){ for(let i=0;i<3;i++) Combat.enemyAttack(cs,si,10+str); }
        else { Combat.enemyAttack(cs,si,12+str); }
        s.actionIndex++;
      }
    },
    // ── 第三层敌人（普通）──
    ironguard: {
      id:'ironguard', name:'铁甲卫兵', emoji:'🛡️', hp:54, maxHp:54, actions:['fortify','bash','shieldbash','bash','fortify'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0;
        if(a==='fortify') return [{type:'defend',val:20,label:'🛡',num:'20',detail:'坚守：为自身获得 20 点格挡'}];
        if(a==='shieldbash') return [{type:'attack',val:10+str,label:'⚔️',num:String(10+str),detail:`盾击：造成 ${10+str} 点伤害`},{type:'defend',val:12,label:'🛡',num:'12',detail:'同时获得 12 点格挡'}];
        return [{type:'attack',val:14+str,label:'⚔️',num:String(14+str),detail:`重锤：造成 ${14+str} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs.strength||0;
        if(a==='fortify') s.block+=20;
        else if(a==='shieldbash'){ Combat.enemyAttack(cs,si,10+str); s.block+=12; }
        else Combat.enemyAttack(cs,si,14+str);
        s.actionIndex++; }
    },
    cursemage: {
      id:'cursemage', name:'诅咒法师', emoji:'🔮', hp:40, maxHp:40, actions:['darkbolt','hex','darkbolt','curse_rite','darkbolt'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0;
        if(a==='hex') return [{type:'debuff',label:'💢',num:'诅咒术',detail:'对玩家施加 2 层【虚弱】'}];
        if(a==='curse_rite') return [{type:'pollute',label:'🔥',num:'黑暗仪式',detail:'造成 6 点伤害，并将 2 张「诅咒」牌插入手牌'}];
        return [{type:'attack',val:12+str,label:'⚔️',num:String(12+str),detail:`暗影箭：造成 ${12+str} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs.strength||0;
        if(a==='hex'){ Combat.applyDebuff(cs.player,'weak',2); }
        else if(a==='curse_rite'){ Combat.enemyAttack(cs,si,6); cs.hand.push('curse_card'); cs.hand.push('curse_card'); }
        else Combat.enemyAttack(cs,si,12+str);
        s.actionIndex++; }
    },
    berserker: {
      id:'berserker', name:'嗜血狂徒', emoji:'🪓', hp:62, maxHp:62, actions:['rage','cleave','cleave','frenzy','cleave'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0;
        if(a==='rage') return [{type:'buff',label:'✨',num:'狂暴',detail:'为自身叠加 3 层【力量】\n力量：每层使攻击伤害 +1（永久）'}];
        if(a==='frenzy') return [{type:'attack',val:8+str,label:'⚔️',num:`×2(${8+str})`,detail:`狂乱连击：造成 2×${8+str} = ${2*(8+str)} 点伤害`}];
        return [{type:'attack',val:13+str,label:'⚔️',num:String(13+str),detail:`劈砍：造成 ${13+str} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs.strength||0;
        if(a==='rage') Combat.applyBuff(s,'strength',3);
        else if(a==='frenzy'){ for(let i=0;i<2;i++) Combat.enemyAttack(cs,si,8+(s.buffs.strength||0)); }
        else Combat.enemyAttack(cs,si,13+str);
        s.actionIndex++; }
    },
    liuxing1: {
      id:'liuxing1', name:'刘行·赛场新秀', emoji:'🏎️', hp:48, maxHp:48, actions:['cruise','shift_up','sprint','brake','sprint'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const g=s.gear||2;
        if(a==='cruise') return [{type:'attack',val:8,label:'⚔️',num:'8',detail:'巡航攻击：造成 8 点伤害（2挡基准）'}];
        if(a==='shift_up') return [{type:'buff',label:'✨',num:'升挡',detail:'升至3挡，获得 4 点格挡'}];
        if(a==='sprint'){ if(g>=3) return [{type:'attack',val:12,label:'⚔️',num:'12+🐌',detail:'3挡冲刺：造成 12 点伤害，对你施加 1 层减速'}]; return [{type:'attack',val:8,label:'⚔️',num:'8',detail:'冲刺：造成 8 点伤害，降回2挡'}]; }
        if(a==='brake') return [{type:'defend',val:12,label:'🛡',num:'12',detail:'刹车：降至1挡，获得 12 点格挡'}];
        return [{type:'attack',val:8,label:'⚔️',num:'8',detail:'攻击'}]; },
      doAction(cs,si){ const s=cs.enemies[si]; s.gear=s.gear||2; const a=s.actions[s.actionIndex%s.actions.length];
        if(a==='cruise'){ Combat.enemyAttack(cs,si,8); }
        else if(a==='shift_up'){ s.gear=Math.min(3,s.gear+1); s.block+=4; }
        else if(a==='sprint'){ if(s.gear>=3){ Combat.enemyAttack(cs,si,12); Combat.applyDebuff(cs.player,'slow',1); } else { Combat.enemyAttack(cs,si,8); s.gear=2; } }
        else if(a==='brake'){ s.gear=1; s.block+=12; }
        s.actionIndex++; }
    },
    liuxing2: {
      id:'liuxing2', name:'刘行·赛道老手', emoji:'🏎️', hp:65, maxHp:65, actions:['gear_strike','nitro','drift','pit','gear_strike','drift'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const g=s.gear||2; const dmg={1:10,2:13,3:17}[g]||13;
        if(a==='gear_strike') return [{type:'attack',val:dmg,label:'⚔️',num:String(dmg),detail:`档位打击（当前${g}挡）：造成 ${dmg} 点伤害`}];
        if(a==='nitro') return [{type:'attack',val:10,label:'⚔️',num:'10+✨',detail:'氮气加速：造成 10 点伤害，升1挡'}];
        if(a==='drift') return [{type:'attack',val:10,label:'⚔️',num:'10+🐌×2',detail:'甩尾攻击：造成 10 点伤害，对你施加 2 层减速'}];
        if(a==='pit') return [{type:'defend',val:15,label:'🛡',num:'15',detail:'进站维修：降1挡，获得 15 点格挡'}];
        return [{type:'attack',val:dmg,label:'⚔️',num:String(dmg),detail:'攻击'}]; },
      doAction(cs,si){ const s=cs.enemies[si]; s.gear=s.gear||2; const a=s.actions[s.actionIndex%s.actions.length];
        if(a==='gear_strike'){ Combat.enemyAttack(cs,si,{1:10,2:13,3:17}[s.gear]||13); }
        else if(a==='nitro'){ Combat.enemyAttack(cs,si,10); s.gear=Math.min(3,s.gear+1); }
        else if(a==='drift'){ Combat.enemyAttack(cs,si,10); Combat.applyDebuff(cs.player,'slow',2); }
        else if(a==='pit'){ s.gear=Math.max(1,s.gear-1); s.block+=15; }
        s.actionIndex++; }
    },
    liuxing3: {
      id:'liuxing3', name:'刘行·赛道之王', emoji:'🏎️', hp:85, maxHp:85, actions:['gear_strike','full_throttle','nitro','turbo','pit','drift'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const g=s.gear||2; const dmg={1:12,2:16,3:22}[g]||16;
        const str=s.buffs?.strength||0;
        if(a==='gear_strike') return [{type:'attack',val:dmg+str,label:'⚔️',num:String(dmg+str),detail:`档位打击（${g}挡）：造成 ${dmg+str} 点伤害`}];
        if(a==='full_throttle') return [{type:'buff',label:'✨',num:'力量+2',detail:'全油门：永久叠加 2 层力量，升1挡'}];
        if(a==='nitro') return [{type:'attack',val:14+str,label:'⚔️',num:`${14+str}+✨`,detail:'氮气加速：造成 '+(14+str)+' 点伤害，升1挡'}];
        if(a==='turbo'){ const td=6*g+str; return [{type:'attack',val:td,label:'⚔️',num:`${td}+🐌`,detail:`涡轮压榨：造成 ${td} 点伤害，降2挡，施加1层减速`}]; }
        if(a==='pit') return [{type:'defend',val:18,label:'🛡',num:'18',detail:'进站维修：降1挡，获得 18 点格挡'}];
        if(a==='drift') return [{type:'attack',val:12+str,label:'⚔️',num:`${12+str}+🐌×3`,detail:'甩尾攻击：造成 '+(12+str)+' 点伤害，对你施加 3 层减速'}];
        return [{type:'attack',val:dmg,label:'⚔️',num:String(dmg),detail:'攻击'}]; },
      doAction(cs,si){ const s=cs.enemies[si]; s.gear=s.gear||2; const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs.strength||0;
        if(a==='gear_strike'){ Combat.enemyAttack(cs,si,{1:12,2:16,3:22}[s.gear]||16); }
        else if(a==='full_throttle'){ Combat.applyBuff(s,'strength',2); s.gear=Math.min(3,s.gear+1); }
        else if(a==='nitro'){ Combat.enemyAttack(cs,si,14); s.gear=Math.min(3,s.gear+1); }
        else if(a==='turbo'){ Combat.enemyAttack(cs,si,6*s.gear); s.gear=Math.max(1,s.gear-2); Combat.applyDebuff(cs.player,'slow',1); }
        else if(a==='pit'){ s.gear=Math.max(1,s.gear-1); s.block+=18; }
        else if(a==='drift'){ Combat.enemyAttack(cs,si,12); Combat.applyDebuff(cs.player,'slow',3); }
        s.actionIndex++; }
    },
    tutorial_boss: {
      id:'tutorial_boss', name:'见习教官', emoji:'🎓', hp:55, maxHp:55, actions:['attack','defend','attack','attack','defend'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; if(a==='attack')return[{type:'attack',val:8,label:'⚔️',num:'8',detail:'对玩家造成 8 点伤害'}]; return[{type:'defend',val:8,label:'🛡',num:'8',detail:'为自身获得 8 点格挡'}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; if(a==='attack')Combat.enemyAttack(cs,si,8); else s.block=(s.block||0)+8; s.actionIndex++; }
    },
    guardian: {
      id:'guardian', name:'兔子', emoji:'🐰', hp:140, maxHp:140, actions:['defense','fierce','charge','defense','ultimate'],
      getIntent(s){ const a=s.actions[s.actionIndex%s.actions.length]; const str=s.buffs?.strength||0; if(a==='charge')return[{type:'buff',label:'✨',num:'力量+1',detail:'为自身叠加 1 层【力量】\n力量：每层使攻击伤害 +1（永久）'}]; if(a==='fierce')return[{type:'attack',val:14+str,label:'⚔️',num:String(14+str),detail:`对玩家造成 ${14+str} 点伤害${str>0?' (含 '+str+' 层力量加成)':''}`}]; if(a==='defense')return[{type:'defend',val:12,label:'🛡',num:'12',detail:'为自身获得 12 点格挡\n格挡：抵消等量伤害，回合结束清零'}]; return[{type:'attack',val:6+str,label:'⚔️',num:`×3(${6+str})`,detail:`对玩家造成 3×${6+str} = ${3*(6+str)} 点伤害`}]; },
      doAction(cs,si){ const s=cs.enemies[si],a=s.actions[s.actionIndex%s.actions.length]; if(a==='charge')Combat.applyBuff(s,'strength',1); else if(a==='fierce')Combat.enemyAttack(cs,si,14); else if(a==='defense')s.block+=12; else{for(let i=0;i<3;i++)Combat.enemyAttack(cs,si,6);} s.actionIndex++; }
    }
  },
  encounters: {
    easy:   [['slime','slime'],['louse','louse'],['cultist']],
    medium: [['slime','cultist'],['jawworm'],['louse','louse','louse']],
    hard:   [['jawworm','cultist'],['slime','slime','cultist']],
    boss:   [['guardian']],
    boss_tutorial: [['tutorial_boss']],
    easy2:  [['louse2','louse2'],['cultist2'],['louse2','louse2','louse2']],
    medium2:[['jawworm2'],['louse2','cultist2'],['jawworm2','louse2']],
    hard2:  [['jawworm2','cultist2'],['jawworm2','jawworm2']],
    easy3:  [['ironguard','cursemage'],['berserker'],['cursemage','cursemage']],
    medium3:[['ironguard','berserker'],['berserker','cursemage'],['ironguard','ironguard']],
    hard3:  [['berserker','berserker'],['ironguard','cursemage','berserker']],
    boss2:  [['banbu']],
    boss3:  [['boge']]
  },
  // 大眼开局遗物池
  dayanRelics: [
    {
      id: 'protein_powder',
      name: '大眼的蛋白粉',
      icon: '💪',
      tier: 'rare',
      desc: '拾起后永久获得 +1 力量，使所有攻击永久加成 1 点伤害。',
      apply(run){ run.character.buffs = run.character.buffs||{}; run.character.buffs.strength = (run.character.buffs.strength||0)+1; }
    },
    {
      id: 'spike_shoes',
      name: '大眼的钉鞋',
      icon: '👟',
      tier: 'uncommon',
      desc: '每个回合结束后，有 5% 的概率跳过怪物回合，直接进入下一个玩家回合。',
      apply(run){ run.relics.push('spike_shoes'); }
    },
    {
      id: 'magnifier',
      name: '大眼的放大镜',
      icon: '🔍',
      tier: 'uncommon',
      desc: '每场战斗开始时，手牌中随机 1 张牌费用变为 0（仅本回合有效）。',
      apply(run){ run.relics.push('magnifier'); }
    },
    {
      id: 'iron_stomach',
      name: '大眼的鐵胃',
      icon: `<img src="manus-storage/img_00_572k_79c2d105.png" style="width:44px;height:44px;object-fit:contain;vertical-align:middle">`,
      tier: 'common',
      desc: '永久增加 11 点生命上限，并立即回复 11 点 HP。',
      apply(run){ run.character.maxHp+=11; run.character.hp=Math.min(run.character.hp+11,run.character.maxHp); }
    },
    {
      id: 'amulet',
      name: '大眼的水晶球',
      icon: '🔮',
      tier: 'rare',
      desc: '每局游戏第一次被致死时，以 50% 最大生命值存活（仅触发一次）。',
      apply(run){ run.relics.push('amulet'); }
    }
  ],

  datouRelics: [
    {
      id: 'datou_spanish_book',
      name: '大头的西班牙语书',
      icon: '📖',
      tier: 'uncommon',
      desc: '回合结束时，若本回合造成过伤害，回复 2 点 HP',
      apply(run){ run.relics.push('datou_spanish_book'); }
    },
    {
      id: 'datou_sunglasses',
      name: '大头的墨镜',
      icon: '🕶️',
      tier: 'rare',
      desc: '每场战斗第一回合，额外抽 2 张牌并获得 1 点能量',
      apply(run){ run.relics.push('datou_sunglasses'); }
    },
    {
      id: 'datou_drumstick',
      name: '大头的鼓棒',
      icon: '🥁',
      tier: 'epic',
      desc: '打出攻击牌时，10% 概率额外释放一次',
      apply(run){ run.relics.push('datou_drumstick'); }
    },
    {
      id: 'datou_hat',
      name: '大头的帽子',
      icon: '🧢',
      tier: 'common',
      desc: '永久增加 20 点生命上限，并立即回复 20 点 HP。',
      apply(run){ run.character.maxHp += 20; run.character.hp = Math.min(run.character.hp + 20, run.character.maxHp); run.relics.push('datou_hat'); }
    },
    {
      id: 'datou_whistle',
      name: '大头的哨子',
      icon: '🎺',
      tier: 'uncommon',
      desc: '回合结束时，若本回合未打出过防御牌，获得 10 点格挡',
      apply(run){ run.relics.push('datou_whistle'); }
    },
  ],
  // 文豪开局遗物池
  wenhaoRelics: [
    {
      id: 'wenhao_scarf',
      name: '文豪的红领巾',
      icon: '👔',
      tier: 'uncommon',
      desc: '每场战斗结束时，若本场战斗全程未受到任何伤害，永久增加 5 点生命上限。',
      apply(run){ run.relics.push('wenhao_scarf'); }
    },
    {
      id: 'wenhao_feather',
      name: '文豪的羽毛',
      icon: '🪶',
      tier: 'epic',
      desc: '生命首次低于最大生命值的 50% 时，立刻回复 40% 最大生命值。（全局仅触发一次；一击致死不触发）',
      apply(run){ run.relics.push('wenhao_feather'); }
    },
    {
      id: 'wenhao_script',
      name: '文豪的剧本',
      icon: '📜',
      tier: 'epic',
      desc: '获取时，免费删除至多 2 张卡牌；之后可花费 50 金币再删 1 张。（人生的剧本由你自己决定）',
      apply(run){ run.relics.push('wenhao_script'); }
    }
  ],
  // 高山开局遗物池（第三层守护神）
  gaoshanRelics: [
    {
      id: 'gaoshan_sunglasses',
      name: '高山的雪镜',
      icon: '🥽',
      tier: 'rare',
      desc: '每回合开始时，有 35% 概率获得 1 点额外能量。（期望约每3回合触发1次）',
      apply(run){ run.relics.push('gaoshan_sunglasses'); }
    },
    {
      id: 'gaoshan_jacket',
      name: '高山的冲锋衣',
      icon: '🧥',
      tier: 'rare',
      desc: '每场战斗中，第一次获得格挡时，格挡值翻倍。',
      apply(run){ run.relics.push('gaoshan_jacket'); }
    },
    {
      id: 'gaoshan_compass',
      name: '高山的指南针',
      icon: '🧭',
      tier: 'epic',
      desc: '激活后，第三层地图变为一条直路（7~10 节点）。规则：最多 1 个精英；普通战斗 2 个（仅 10 节点地图可能出现 3 个）；至少各 1 个问号 / 休息 / 商店，最后一节点必为商店。',
      apply(run){ run.relics.push('gaoshan_compass'); }
    },
    {
      id: 'gaoshan_braid',
      name: '高山的麻花辫',
      icon: '💇',
      tier: 'uncommon',
      desc: '每场战斗开始时，随机回复 3~8 点 HP。',
      apply(run){ run.relics.push('gaoshan_braid'); }
    }
  ],
  // 王微开局遗物池
  wangweiRelics: [
    {
      id: 'wangwei_bracelet',
      name: '王微的手绳',
      icon: '📿',
      tier: 'rare',
      desc: '每回合开始时，获得 3 点格挡（不会消失，可累计）。',
      apply(run){ run.relics.push('wangwei_bracelet'); }
    },
    {
      id: 'wangwei_glasses',
      name: '王微的眼镜',
      icon: '👓',
      tier: 'rare',
      desc: '受到伤害时，有 20% 概率减少最多 15 点伤害。',
      apply(run){ run.relics.push('wangwei_glasses'); }
    },
    {
      id: 'wangwei_bowl',
      name: '王微的碗',
      icon: '🍜',
      tier: 'common',
      desc: '每场战斗结束后，回复 5 点 HP。',
      apply(run){ run.relics.push('wangwei_bowl'); }
    },
    {
      id: 'wangwei_wallet',
      name: '王微的钱包',
      icon: '👛',
      tier: 'uncommon',
      desc: '每场战斗结束后，金币奖励额外 +25%。',
      apply(run){ run.relics.push('wangwei_wallet'); }
    },
    {
      id: 'wangwei_optimism',
      name: '王微的乐观',
      icon: '🌟',
      tier: 'uncommon',
      desc: '每场战斗开始时，随机回复 1~10 点 HP。',
      apply(run){ run.relics.push('wangwei_optimism'); }
    }
  ],

  // 战斗后概率掉落的遗物池（精英/普通战斗后随机掉落）
  battleRelics: [
    {
      id: 'invoice',
      name: '发票',
      icon: '🧾',
      img: null,
      tier: 'common',
      source: 'battle',  // 可通过战斗掉落获得
      actRestrict: 1,    // 仅在第一层（act1）掉落，包括act1 boss
      desc: '第一层限定。拾取时立即获得 333 枚金币。报销成功！',
      apply(run){ run.gold = (run.gold||0) + 333; }
    },
    {
      id: 'susu_eyemask',
      name: 'Susu的眼罩',
      icon: null,
      tier: 'rare',
      source: 'battle',  // 可通过战斗掉落获得
      img: 'manus-storage/img_01_3443k_f8fb25b0.png',
      desc: '每场战斗中，抵御第一次受到的负面状态（弱化/易伤/中毒等）。',
      apply(run){ run.relics.push('susu_eyemask'); }
    },
    {
      id: 'susu_pocketwatch',
      name: 'susu的怀表',
      icon: '⌚',
      tier: 'epic',
      source: 'battle',
      desc: '当你被致死时，有 5% 概率时间倒流：满血复活，并瞬间击溃当前房间所有敌人（Boss 房：仅复活）。每场冒险仅触发一次。',
      apply(run){ run.relics.push('susu_pocketwatch'); }
    },
    {
      id: 'xiaojiu_guitar',
      name: '小九的六弦琴',
      icon: null,
      tier: 'epic',
      source: 'battle',  // 可通过战斗掉落获得
      img: 'manus-storage/xiaojiu_guitar_e444f0fa.png',
      desc: '每场战斗的每个回合额外多抽 1 张牌。',
      apply(run){ run.relics.push('xiaojiu_guitar'); }
    },
    {
      id: 'football',
      name: '橄榄球',
      icon: '🏈',
      tier: 'rare',
      source: 'event',
      img: 'manus-storage/football_icon_0390dd99.png',
      desc: '每场战斗第一回合增加 1 点能量。',
      apply(run){ run.relics.push('football'); }
    },
    {
      id: 'lemon_chicken',
      name: '莹姐的柠檬烧鸡',
      icon: '🍗',
      tier: 'common',
      source: 'event',
      desc: '莹姐食堂特制。尝过新菜并成功的纪念品。（最大HP+5已在事件中生效）',
      apply(run){ run.relics.push('lemon_chicken'); }
    },
    {
      id: 'liuxing_headband',
      name: '刘行的头巾',
      icon: '🧣',
      tier: 'rare',
      source: 'event',
      desc: '每场战斗中，首次格挡值达到或超过 15 点时，下一回合开始额外获得 1 点能量（每场战斗仅触发一次）。',
      apply(run){ run.relics.push('liuxing_headband'); }
    },
    {
      id: 'xiaocao_sprout',
      name: '小草的小草',
      icon: '🌱',
      tier: 'uncommon',
      source: 'battle',
      desc: '每场战斗胜利后，永久增加 1 点最大HP（无上限）。',
      apply(run){ run.relics.push('xiaocao_sprout'); }
    },
  ],
  // source 字段说明：'battle'=战斗掉落，'event'=事件专属，'shop'=商店专属，'boss'=Boss专属
  // 未来新增特殊来源遗物时，设置对应 source 值即可自动从战斗掉落池中排除
    rewardPool: {
    // 默认角色奖励池（保留兜底；不含起始 strike/defend/clash 以避免重复奖励）
    default: ['pommel','shrug','armaments','inflame','ironwave','thunderclap','zap','bash'],
    // 各角色奖励池：直接引用 cardsByCharacter（同源真值）
    get racer() { return Data.cardsByCharacter.racer; },
    get boxer() { return Data.cardsByCharacter.boxer; },
    get archer() { return Data.cardsByCharacter.archer; },
    get brute() { return Data.cardsByCharacter.brute; },
  },
  // 问号事件列表
  questionEvents: [
    {
      id: 'flag_football',
      relicId: 'football',
      title: '腰旗橄榄球',
      desc: '你手握橄榄球，前面有两名防守队员拦截。你的选择是……',
      options: [
        {
          label: '向前冲！',
          tooltip: '🏈 20% 概率：获得遗物『橄榄球』\n⚠️ 80% 概率：HP -5',
          resolve(run, UI) {
            const r = Math.random();
            if (r < 0.20) {
              // 20% 获得橄榄球遗物
              if (!run.relics.includes('football')) {
                const relic = Data.battleRelics.find(r => r.id === 'football');
                if (relic) relic.apply(run);
              }
              return { type: 'good', msg: '你突破防线，成功达阵！获得了遗物：🏈 橄榄球' };
            } else {
              // 80% 扛5点血量
              run.character.hp = Math.max(1, run.character.hp - 5);
              return { type: 'bad', msg: '你被对手扯掉腰旗，重重摘倒！HP -5。' };
            }
          }
        },
        {
          label: '传球',
          tooltip: '⚠️ 必定事件：最大HP -5',
          resolve(run, UI) {
            run.character.maxHp = Math.max(1, run.character.maxHp - 5);
            run.character.hp = Math.min(run.character.hp, run.character.maxHp);
            return { type: 'bad', msg: '传球被截断，你被撞倒在地。最大HP -5。' };
          }
        }
      ]
    }
    ,
    {
      id: 'yinjie_canteen',
      relicId: 'lemon_chicken',
      title: '尹姐食堂',
      desc: '尹姐最近研究了一些新菜，热情地招呼你过来尝尝。听说吃了新菜有 50% 的概率永久提升 5 点生命上限，但也有 50% 的概率让你难受失去 8 点血……你的选择是？',
      options: [
        {
          label: '品尝新菜',
          tooltip: '🎲 50% 概率：最大HP永久 +5，获得「莹姐的柠檬烧鸡」\n⚠️ 50% 概率：HP -8',
          resolve(run, UI) {
            const r = Math.random();
            if (r < 0.50) {
              run.character.maxHp = (run.character.maxHp || 80) + 5;
              run.character.hp = Math.min(run.character.maxHp, run.character.hp);
              if(!run.relics.includes('lemon_chicken')){
                const rel = Data.battleRelics.find(x => x.id === 'lemon_chicken');
                if(rel) rel.apply(run);
              }
              return { type: 'good', msg: '味道绝了！最大HP永久 +5！获得了遗物：🍗 莹姐的柠檬烧鸡！' };
            } else {
              run.character.hp = Math.max(1, run.character.hp - 8);
              return { type: 'bad', msg: '味道有点奇怪……胃里一阵翻腾。HP -8。' };
            }
          }
        },
        {
          label: '不吃',
          tooltip: '✅ 稳定获得 HP +8\n❌ 不会增加最大HP',
          resolve(run, UI) {
            run.character.hp = Math.min(run.character.maxHp, run.character.hp + 8);
            return { type: 'good', msg: '尹姐有些失落，但还是塞给你一碗汤。HP +8。' };
          }
        }
      ]
    }
     ,
    {
      id: 'spider_sehuan',
      title: '善良的色环',
      img: 'spider_sehuan.png',
      desc: '一只黑白花纹的跳蛛端坐在路中央，用四颗小黑豆眼睛好奇地打量着你。它的绿色小尖牙轻轻咬合，似乎在等待什么……',
      options: [
        {
          label: '给它一瓶药水',
          tooltip: '🧪 有药水：选一瓶给它，获得随机另一瓶\n❌ 没药水：被咬一口，HP -5',
          resolve(run, UI) {
            // 检查是否有药水
            const potionSlots = (run.potions || []).map((p, i) => ({ p, i })).filter(x => x.p !== null);
            if (potionSlots.length === 0) {
              // 没有药水，被咬
              run.character.hp = Math.max(1, run.character.hp - 5);
              return { type: 'bad', msg: '你摸了摸空空的口袋……色环等了一会儿，有些失望地咬了你一口。HP -5。' };
            }
            // 有药水：弹出选择界面
            const allPotionIds = Object.keys(Data.potions);
            // 弹出药水选择 overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);';
            const box = document.createElement('div');
            box.style.cssText = 'background:#16213e;border:2px solid #e2b96a;border-radius:16px;padding:24px;max-width:380px;width:90%;text-align:center;';
            box.innerHTML = '<h3 style="color:#e2b96a;margin:0 0 8px;">选一瓶药水给色环</h3><p style="color:#ccc;font-size:0.9rem;margin:0 0 16px;">色环会给你换一瓶随机药水</p><div id="sehuan-potion-list" style="display:flex;flex-direction:column;gap:10px;"></div>';
            overlay.appendChild(box);
            document.body.appendChild(overlay);
            const list = box.querySelector('#sehuan-potion-list');
            let resolved = false;
            potionSlots.forEach(({ p, i }) => {
              const pData = Data.potions[p];
              if (!pData) return;
              const btn = document.createElement('button');
              const icon = pData.img
                ? `<img src="${pData.img}" style="width:28px;height:28px;object-fit:contain;vertical-align:middle;margin-right:8px;">`
                : `<span style="font-size:1.4rem;vertical-align:middle;margin-right:8px;">${pData.emoji || '🧪'}</span>`;
              btn.innerHTML = `${icon}<span>${pData.name}</span>`;
              btn.style.cssText = 'width:100%;padding:11px 14px;background:#0f3460;color:#e2b96a;border:1.5px solid #e2b96a;border-radius:8px;font-size:1rem;cursor:pointer;display:flex;align-items:center;';
              btn.onmouseover = () => btn.style.background = '#1a4a80';
              btn.onmouseout = () => btn.style.background = '#0f3460';
              btn.onclick = () => {
                if (resolved) return;
                resolved = true;
                overlay.remove();
                // 移除给出的药水
                run.potions[i] = null;
                // 随机给一瓶不同的药水
                const otherIds = allPotionIds.filter(id => id !== p);
                const newId = otherIds[Math.floor(Math.random() * otherIds.length)];
                // 放入同一个槽位
                run.potions[i] = newId;
                const newPData = Data.potions[newId];
                // 显示结果（通过触发 q-result）
                const resultDiv = document.querySelector('#q-result');
                const continueBtn = document.querySelector('#q-continue');
                const optContainer = document.querySelector('#q-options');
                if (resultDiv) {
                  resultDiv.style.display = 'block';
                  resultDiv.style.background = '#1a4a1a';
                  resultDiv.style.border = '1.5px solid #4caf50';
                  resultDiv.style.color = '#81c784';
                  const newIcon = newPData?.img
                    ? `<img src="${newPData.img}" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:4px;">`
                    : (newPData?.emoji || '🧪');
                  resultDiv.innerHTML = `色环高兴地接过药水，转身从草丛里翻出一瓶给你！获得了 ${newIcon} <b>${newPData?.name || newId}</b>。`;
                }
                if (continueBtn) {
                  continueBtn.style.display = 'block';
                  continueBtn.onclick = () => {
                    const node = run.map.nodes.find(n => n.id === run.currentNodeId);
                    if (node) node.done = true;
                    State.saveRun(0);
                    State.go('map');
                  };
                }
                if (optContainer) { optContainer.querySelectorAll('button').forEach(b => b.disabled = true); optContainer.style.opacity = '0.5'; }
                UI && UI.renderPotions && UI.renderPotions();
              };
              list.appendChild(btn);
            });
            // 返回 null 表示异步处理（不立即显示结果）
            return null;
          }
        },
        {
          label: '不给',
          tooltip: '❌ 被色环咬一口，HP -5',
          resolve(run, UI) {
            run.character.hp = Math.max(1, run.character.hp - 5);
            return { type: 'bad', msg: '色环等了一会儿，见你没有动静，有些失落地咬了你一口。HP -5。' };
          }
        }
      ]
    },
    {
      id: 'liuxing_noodles',
      relicId: 'liuxing_headband',
      title: '面馆奇遇',
      desc: '你走进一家热气腾腾的面馆，发现刘行正埋头大口吃面。他抬头瞄了你一眼，慢悠悠地说："要么你请我吃碗面，要么咱们外面说。"',
      options: [
        {
          label: '请他吃面（75金）',
          tooltip: '💰 花费75金币 → 100%获得遗物「刘行的头巾」\n💸 金币不足时无法选择',
          resolve(run, UI) {
            if((run.gold||0) < 75){
              return { type: 'bad', msg: '你摸了摸口袋……钱不够。刘行叹了口气："没钱就算了，但我记住你了。"' };
            }
            run.gold -= 75;
            if(!run.relics.includes('liuxing_headband')){
              const rel = Data.battleRelics.find(x => x.id === 'liuxing_headband');
              if(rel) rel.apply(run);
            }
            return { type: 'good', msg: '刘行满意地点头，从脖子上取下头巾递给你："算你识趣。"获得了遗物：🧣 刘行的头巾！' };
          }
        },
        {
          label: '拒绝，和他打一架',
          tooltip: '⚔️ 与刘行战斗。打赢后100%获得「刘行的头巾」\n💀 难度随层数提升',
          resolve(run, UI) {
            const act = run.act||1;
            const liuxingId = act>=3?'liuxing3':act>=2?'liuxing2':'liuxing1';
            if(!run.relics.includes('liuxing_headband')){ run._liuxingFightReward=true; }
            Combat.init([liuxingId]);
            State.go('combat');
            return null;
          }
        }
      ]
    },
    {
      id: 'datou_drive',
      title: '带你兜风的大头',
      img: 'manus-storage/datou_sprite.png',
      noBeforeBoss: true,
      desc: '一辆 SUV 缓缓停下，大头反戴着棒球帽，从车窗探出脑袋朝你咧嘴一笑："上车？我带你抄个近路！" 你看了一眼他握方向盘的姿势……心里有点没底。',
      options: [
        {
          label: '上车（消耗 50 金币）',
          tooltip: '💰 消耗 50 金币\n🎲 30% 概率：飞驰穿越，跳过下一个房间\n💥 70% 概率：撞车，最大HP 永久 -5',
          resolve(run, UI) {
            if ((run.gold || 0) < 50) {
              return { type: 'bad', msg: '你摸了摸口袋……金币不够 50。大头摇摇头："那算了。"' };
            }
            run.gold -= 50;
            const r = Math.random();
            if (r < 0.30) {
              // 跳过下一个房间：把当前可达节点中任意一个（非boss）标记为 done 并把玩家位置移过去
              const reachableIds = run.map.paths.filter(p => p.from === run.currentNodeId).map(p => p.to);
              const skipCandidates = reachableIds
                .map(id => run.map.nodes.find(n => n.id === id))
                .filter(n => n && n.type !== 'boss');
              if (skipCandidates.length > 0) {
                const skipNode = skipCandidates[Math.floor(Math.random() * skipCandidates.length)];
                skipNode.done = true;
                if(!run.travelEdges) run.travelEdges=[];
                run.travelEdges.push(run.currentNodeId+'->'+skipNode.id);
                run.currentNodeId = skipNode.id;
                return { type: 'good', msg: '🚗💨 大头一脚油门，路边的世界都模糊了！你跳过了下一个房间。' };
              } else {
                // 异常兜底：理论上 noBeforeBoss 已经过滤了，这里不会触发
                return { type: 'good', msg: '🚗 大头载你绕了一圈又把你送回了原地。下次再说吧。' };
              }
            } else {
              run.character.maxHp = Math.max(1, run.character.maxHp - 5);
              run.character.hp = Math.min(run.character.hp, run.character.maxHp);
              return { type: 'bad', msg: '💥 砰！大头一个急转——你的脑袋撞在了车窗上。最大HP 永久 -5。' };
            }
          }
        },
        {
          label: '婉拒，自己走',
          tooltip: '✅ 稳定获得 HP +5\n❌ 错过抄近路的机会',
          resolve(run, UI) {
            run.character.hp = Math.min(run.character.maxHp, run.character.hp + 5);
            return { type: 'good', msg: '你委婉地谢绝了大头的好意，悠悠地步行了一段。沿途风景不错，HP +5。' };
          }
        }
      ]
    }
 ],

  shopPool: [
    {id:'pommel',    price:80},
    {id:'shrug',     price:75},
    {id:'armaments', price:70},
    {id:'inflame',   price:120},
    {id:'ironwave',  price:90},
    {id:'thunderclap',price:85},
    {id:'zap',       price:65},
    {id:'clash',     price:60},
    {id:'bash',      price:75},
    {id:'strike',    price:50},
    {id:'defend',    price:50},
    // 赛车手卡牌（根据强度定价）
    // ★★★ 高强度（130-150）：能力牌、核心强化卡
    {id:'redline', rarity:'epic',         price:150}, // 能力牌：入扁3挡免格挡惩罚+戧5挡每回合戧5张，极强
    {id:'full_throttle', rarity:'rare',   price:105}, // 能力牌：升挡回合攻击+2，已下调
    {id:'race_instinct', rarity:'rare',   price:100}, // 能力牌：每次升挡+1势头，势头上限3
    {id:'turbo_crush', rarity:'rare',     price:120}, // 3费3挡=18伤，高性价比爆发
    // ★★½ 中高强度（100-115）：强力功能卡
    {id:'nitro_boost', rarity:'rare',     price:110}, // 2费12伤+升挡，或3挡时16伤
    {id:'pressure_test', rarity:'uncommon', price:80}, // 2费戧2+超载层（上限2），已下调
    {id:'drift_charge', rarity:'rare',    price:100}, // 2费全体攻击+速度感层叠
    // ★★ 中强度（75-95）：实用功能卡
    {id:'collision_block', rarity:'uncommon', price:90},  // 1费格挡+等量伤害，攻守兼备
    {id:'overtake', rarity:'uncommon',     price:75},  // 1费3挡时免费且两段4伤，已下调
    {id:'anti_skid', rarity:'uncommon',   price:70},  // 能力牌：降挡时获得2格挡，已下调
    {id:'race_predict', rarity:'uncommon',    price:80},  // 1费看牌堆顶+排序+戧1，运营强
    {id:'gear_lock', rarity:'common',          price:65},  // 1费锁挡+挡位×3格挡，已下调
    {id:'pit_repair', rarity:'uncommon',      price:75},  // 1费10格挡+低挡回血，防御实用
    {id:'quick_upshift', rarity:'common',      price:60},  // 1费升2挡+抽1张，已下调
    // ★ 低中强度（55-70）：辅助/条件卡
    {id:'fuel_save', rarity:'uncommon',       price:65},  // 1费降挡+本回技能费用-1
    {id:'forced_downshift', rarity:'common',  price:55},  // 0费降2挡+减速×2层，消耗，已下调
    {id:'corner_line', rarity:'common',     price:60},  // 0费条件格挡，升挡后较强
    {id:'overspeed', rarity:'common',       price:60},  // 0费3挡时13伤，消耗，条件限制
    {id:'gear_strike', rarity:'common',     price:55},  // 起始卡，商店备用
    {id:'gear_defend', rarity:'common',     price:55},  // 起始卡，商店备用
    {id:'gear_brake', rarity:'common',      price:65},  // 1费8伤+3挡减速
    {id:'gear_shift', rarity:'common',      price:55},  // 0费换挡，商店备用
    // 射手卡牌（根据强度定价）
    {id:'ar_shoot',       rarity:'common',    price:55},
    {id:'ar_dodge',       rarity:'common',    price:55},
    {id:'ar_aim',         rarity:'common',    price:50},
    {id:'ar_sprint',      rarity:'common',    price:60},
    {id:'ar_charge_shot', rarity:'common',    price:65},
    {id:'ar_vuln_arrow',  rarity:'common',    price:65},
    {id:'ar_double_shot', rarity:'uncommon',  price:80},
    {id:'ar_block_charge',rarity:'common',    price:58},
    {id:'ar_roll',        rarity:'uncommon',  price:80},
    {id:'ar_pierce',      rarity:'uncommon',  price:90},
    {id:'ar_swap',        rarity:'uncommon',  price:70},
    {id:'ar_rapid_fire',  rarity:'common',    price:65},
    {id:'ar_wind_step',   rarity:'uncommon',  price:75},
    {id:'ar_focus_aim',   rarity:'uncommon',  price:70},
    // 赛车手速度感扩池
    {id:'speed_rush',        rarity:'common',    price:55},
    {id:'corner_guard',      rarity:'common',    price:55},
    {id:'inertia_strike',    rarity:'uncommon',  price:80},
    {id:'speed_limit_break', rarity:'uncommon',   price:75},
    {id:'speed_activate',    rarity:'epic',      price:140},
    // 射手速攻扩池
    {id:'ar_scatter',        rarity:'common',    price:55},
    {id:'ar_weak_arrow',     rarity:'common',    price:60},
    {id:'ar_dodge_counter',  rarity:'common',    price:60},
    {id:'ar_hunter_rhythm',  rarity:'common',    price:60},
    {id:'ar_arrow_storm',    rarity:'rare',      price:110},
    {id:'ar_threshold',      rarity:'rare',      price:105},
    {id:'ar_arrow_rain',  rarity:'uncommon',  price:82},
    {id:'ar_full_charge', rarity:'epic',      price:150},
    {id:'ar_gale',        rarity:'uncommon',  price:78},
    {id:'ar_pierce_all',  rarity:'uncommon',  price:82},
    {id:'ar_instinct',    rarity:'epic',      price:140},
    {id:'ar_cap_up',      rarity:'rare',      price:105},
    {id:'ar_ultimate',    rarity:'rare',      price:110},
    {id:'ar_fire_arrow',   rarity:'common',    price:65},
    {id:'ar_flame_arrow',  rarity:'uncommon',  price:85},
    {id:'ar_inferno_arrow',rarity:'rare',      price:110},
    {id:'ar_chill_arrow',  rarity:'uncommon',  price:90},
    {id:'ar_freeze_arrow', rarity:'rare',      price:115},
  ],
  removeCardPrice: 75, // 已废弃，保留作兼容占位
  getRemovePrice(run){ return 50 + ((run.removedTotal||0) * 25); },
  getShopInventory(deck){
    // 根据当前角色过滤商店卡牌池
    const charId = State.current?.run?.character?.id || 'default';
    const racerCards = new Set(['nitro_boost','collision_block','drift_charge','overtake','turbo_crush',
      'pit_repair','race_predict','pressure_test','fuel_save','corner_line',
      'quick_upshift','forced_downshift','redline','race_instinct','full_throttle',
      'anti_skid','gear_lock','overspeed','gear_strike','gear_defend','gear_brake','gear_shift',
      'speed_rush','corner_guard','inertia_strike','speed_limit_break','speed_activate']);
    const archerCards = new Set(['ar_shoot','ar_dodge','ar_aim','ar_sprint','ar_charge_shot','ar_vuln_arrow',
      'ar_double_shot','ar_block_charge','ar_roll','ar_pierce','ar_swap','ar_rapid_fire','ar_wind_step',
      'ar_arrow_rain','ar_full_charge','ar_gale','ar_pierce_all','ar_instinct','ar_cap_up','ar_ultimate',
      'ar_scatter','ar_weak_arrow','ar_dodge_counter','ar_hunter_rhythm','ar_arrow_storm','ar_threshold','ar_focus_aim',
      'ar_fire_arrow','ar_flame_arrow','ar_inferno_arrow','ar_chill_arrow','ar_freeze_arrow']);
    const defaultCards = new Set(['pommel','shrug','armaments','inflame','ironwave','thunderclap','zap','clash','bash','strike','defend']);
    let pool;
    if(charId === 'racer'){
      pool = Data.shopPool.filter(item => racerCards.has(item.id));
    } else if(charId === 'archer'){
      pool = Data.shopPool.filter(item => archerCards.has(item.id));
    } else {
      pool = Data.shopPool.filter(item => defaultCards.has(item.id));
    }
    const weights = Data._getActWeights('shop');
    const result = [];
    const used = new Set();
    for(let attempt=0; attempt<40 && result.length<4; attempt++){
      const available = pool.filter(item=>!used.has(item.id));
      if(available.length===0) break;
      const ids = available.map(item=>item.id);
      const picked = Data._pickByRarity(ids, weights);
      if(picked && !used.has(picked)){ used.add(picked); result.push(pool.find(item=>item.id===picked)); }
    }
    // 如果不够4张，用剩余随机补充
    while(result.length<4 && pool.length>0){
      result.push(pool[Math.floor(Math.random()*pool.length)]);
    }
    return result;
  },
  makeEnemy(id){ const t=Data.enemies[id]; return{id:t.id,name:t.name,emoji:t.emoji,hp:t.hp,maxHp:t.maxHp,block:0,actionIndex:0,actions:[...t.actions],buffs:{},debuffs:{},_dead:false,currentIntent:null}; },
  // 品质权重配置（按 Act 分层，act4+ 为未来预留）
  rarityWeights: {
    reward: [
      null,                                          // 占位，act从1开始
      { common:68, uncommon:27, rare:4,  epic:1  }, // Act 1
      { common:52, uncommon:33, rare:12, epic:3  }, // Act 2
      { common:38, uncommon:33, rare:22, epic:7  }, // Act 3
      { common:26, uncommon:30, rare:32, epic:12 }, // Act 4+
    ],
    shop: [
      null,
      { common:60, uncommon:32, rare:7,  epic:1  }, // Act 1
      { common:45, uncommon:34, rare:16, epic:5  }, // Act 2
      { common:32, uncommon:33, rare:26, epic:9  }, // Act 3
      { common:20, uncommon:30, rare:35, epic:15 }, // Act 4+
    ],
  },
  _getActWeights(type){
    const act = State.run?.act || 1;
    const table = Data.rarityWeights[type];
    return table[Math.min(act, table.length-1)];
  },
  _pickByRarity(pool, weights){
    // 按品质权重随机选一张
    const byRarity = { common:[], uncommon:[], rare:[], epic:[] };
    pool.forEach(id=>{ const r=Data.cards[id]?.rarity||'common'; if(byRarity[r]) byRarity[r].push(id); });
    const roll = Math.random()*100;
    let cum = 0;
    const order = ['epic','rare','uncommon','common'];
    for(const r of order){
      cum += weights[r]||0;
      if(roll < cum && byRarity[r].length>0){
        return byRarity[r][Math.floor(Math.random()*byRarity[r].length)];
      }
    }
    // 备用：随机返回任意卡
    return pool[Math.floor(Math.random()*pool.length)];
  },
  getRewardCards(deck){
    const charId = State.current?.run?.character?.id || 'default';
    const fullPool = Data.rewardPool[charId] || Data.rewardPool.default;
    const weights = Data._getActWeights('reward');
    const result = [];
    const used = new Set();
    // 尝试抽取3张不重复的卡
    for(let attempt=0; attempt<30 && result.length<3; attempt++){
      const pool = fullPool.filter(id=>!used.has(id));
      if(pool.length===0) break;
      const picked = Data._pickByRarity(pool, weights);
      if(picked && !used.has(picked)){ used.add(picked); result.push(picked); }
    }
    // 如果不够3张，用全池补充
    while(result.length<3){
      const extra = fullPool[Math.floor(Math.random()*fullPool.length)];
      result.push(extra);
    }
    return result;
  },

  // ── 药水数据 ──────────────────────────────────────────────────────────
  potions: {
    oolong: {
      id: 'oolong',
      name: '乌龙茶',
      emoji: '🍵',
      img: 'manus-storage/img_02_6k_7120b6b8.png',
      color: '#8B6914',
      glowColor: 'rgba(210,160,50,0.6)',
      desc: '回复 20% 最大生命値',
      sellPrice: 80,
      // 战斗中使用：回复 20% 最大HP
      use(run, cs) {
        const target = cs ? cs.player : run.character;
        const heal = Math.floor(target.maxHp * 0.2);
        target.hp = Math.min(target.maxHp, target.hp + heal);
        if (cs) run.character.hp = cs.player.hp;
        return `恢复了 ${heal} HP！`;
      }
    },
    laozao: {
      id: 'laozao',
      name: 'Skype的醪糟水',
      emoji: '🍶',
      img: 'manus-storage/laozao_icon_7788818e.png',
      color: '#c8860a',
      glowColor: 'rgba(200,134,10,0.6)',
      tier: 'rare',
      sellPrice: 100,
      desc: '喝下后本回合所有手牌费用随机变为 0~3。',
      use(run, cs) {
        if (!cs) return '只能在战斗中使用！';
        // 为每张手牌随机分配0~3的费用。用并行数组 laozaoCostsArr[i] 跟手牌索引对齐，
        // 打牌后通过 splice 同步索引，避免 cardId+index key 失配 bug
        cs.laozaoCostsArr = cs.hand.map(() => Math.floor(Math.random() * 4));
        cs.laozaoActive = true;
        return `手牌费用已随机变化：${cs.laozaoCostsArr.join(', ')}！`;
      }
    },
    bread: {
      id: 'bread',
      name: '小七的面包',
      emoji: '🍞',
      img: 'manus-storage/bread_icon_15f90b35.png',
      color: '#8B4513',
      glowColor: 'rgba(139,69,19,0.6)',
      tier: 'common',
      sellPrice: 77,
      shopBuyable: false,
      desc: '使用后本回合增加 2 点能量。',
      use(run, cs) {
        if (!cs) return '只能在战斗中使用！';
        cs.energy = (cs.energy || 0) + 2;
        return '吃了小七的面包！本回合能量 +2！';
      }
    },
    coco_shampoo: {
      id: 'coco_shampoo',
      name: 'coco的洗发水',
      emoji: '🧴',
      color: '#2e86c1',
      glowColor: 'rgba(46,134,193,0.6)',
      tier: 'common',
      sellPrice: 75,
      desc: '使用后本回合立刻抽 3 张牌。',
      use(run, cs) {
        if (!cs) return '只能在战斗中使用！';
        Combat.drawCards(cs, 3);
        return '用了coco的洗发水！本回合抽了 3 张牌！';
      }
    },
    lemon_water: {
      id: 'lemon_water',
      name: '阿高的柠檬水',
      emoji: '🍋',
      // 像素风柠檬水瓶（仿照特浓MAXX配色：黄绿瓶身+柠檬片+青柠片+金色腰封）
      img: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" shape-rendering="crispEdges">
  <rect x="7" y="0" width="6" height="1" fill="#43a047"/>
  <rect x="6" y="1" width="8" height="1" fill="#388e3c"/>
  <rect x="5" y="2" width="10" height="2" fill="#2e7d32"/>
  <rect x="6" y="4" width="8" height="2" fill="#c6e829"/>
  <rect x="5" y="6" width="10" height="1" fill="#bdd918"/>
  <rect x="4" y="7" width="12" height="1" fill="#b0cc10"/>
  <rect x="3" y="8" width="14" height="15" fill="#cede0e"/>
  <rect x="3" y="8" width="1" height="15" fill="#b8c80a"/>
  <rect x="16" y="8" width="1" height="15" fill="#b8c80a"/>
  <rect x="4" y="10" width="6" height="1" fill="#ffe500"/>
  <rect x="3" y="11" width="7" height="5" fill="#ffe500"/>
  <rect x="4" y="16" width="6" height="1" fill="#ffe500"/>
  <rect x="5" y="10" width="4" height="7" fill="#ffe500"/>
  <rect x="5" y="12" width="4" height="3" fill="#fff176"/>
  <rect x="6" y="11" width="2" height="5" fill="#fff176"/>
  <rect x="11" y="9" width="5" height="1" fill="#69b82a"/>
  <rect x="10" y="10" width="7" height="5" fill="#69b82a"/>
  <rect x="11" y="15" width="5" height="1" fill="#69b82a"/>
  <rect x="12" y="9" width="3" height="7" fill="#69b82a"/>
  <rect x="12" y="11" width="3" height="3" fill="#aed858"/>
  <rect x="13" y="10" width="1" height="5" fill="#aed858"/>
  <rect x="3" y="23" width="14" height="4" fill="#f9a825"/>
  <rect x="5" y="24" width="10" height="1" fill="#fff8e1"/>
  <rect x="6" y="25" width="8" height="1" fill="#fffde7"/>
  <rect x="4" y="27" width="12" height="2" fill="#e65100"/>
  <rect x="5" y="29" width="10" height="2" fill="#bf360c"/>
  <rect x="6" y="31" width="8" height="1" fill="#8d2200"/>
</svg>`)}`,
      color: '#c6e829',
      glowColor: 'rgba(198,232,41,0.75)',
      tier: 'rare',
      sellPrice: 95,
      desc: '对所有敌人造成等同于<b>已损失HP值</b>的伤害（上限50），并恢复 <b>5</b> 点HP。血量越低，威力越强。',
      use(run, cs) {
        if (!cs) return '只能在战斗中使用！';
        const lost = cs.player.maxHp - cs.player.hp;
        const dmg = Math.min(lost, 50);
        let hits = 0;
        cs.enemies.forEach((e, i) => { if (!e._dead) { Combat.dealDamage(cs, i, dmg); hits++; } });
        cs.player.hp = Math.min(cs.player.maxHp, cs.player.hp + 5);
        run.character.hp = cs.player.hp;
        if (dmg === 0) return '满血状态威力为零……但至少恢复了 5 HP！';
        return `酸力爆发！对 ${hits} 个敌人各造成 ${dmg} 点伤害，并恢复了 5 HP！`;
      }
    }
  },

  // ── 卡牌升级数据（每张牌最多升级两次）────────────────────────────────────────
  upgrades: {
    // ── 赛车手卡牌升级 ──
    gear_strike:    { 1:{desc:'造成 <b>8</b> 点伤害。',      cost:1}, 2:{desc:'造成 <b>10</b> 点伤害。若处于3挡，额外施加 1 层减速。', cost:1} },
    gear_defend:    { 1:{desc:'获得 <b>7</b> 点格挡（含档位倍率）。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡（含档位倍率），抽 <b>1</b> 张牌。', cost:1} },
    gear_shift:     { 1:{desc:'0费。升1挡或降1挡，本轮最多 <b>3</b> 次。', cost:0}, 2:{desc:'0费。升1挡或降1挡，本轮最多 <b>3</b> 次，首次使用后抽 <b>1</b> 张牌。', cost:0} },
    gear_brake:     { 1:{desc:'造成 <b>13</b> 点伤害（含档位倍率）。3挡时额外施加 2 层减速。', cost:1}, 2:{desc:'造成 <b>16</b> 点伤害（含档位倍率）。3挡时额外施加 <b>3</b> 层减速。', cost:1} },
    overspeed:      { 1:{desc:'处于3挡时造成 <b>16</b> 点伤害并降1挡。消耗。', cost:0}, 2:{desc:'处于3挡时造成 <b>16</b> 点伤害并降1挡。<b>去除消耗。</b>', cost:0} },
    pit_repair:     { 1:{desc:'获得 <b>12</b> 点格挡。1/2挡时额外回血 <b>4</b> HP。', cost:1}, 2:{desc:'<b>0费</b>。获得 <b>10</b> 点格挡。1/2挡时额外回血 5 HP。', cost:0} },
    race_predict:   { 1:{desc:'查看牌堆顶 <b>4</b> 张，自由排序，抽 1 张。', cost:1}, 2:{desc:'查看牌堆顶 <b>4</b> 张，自由排序，抽 <b>2</b> 张。', cost:1} },
    forced_downshift:{ 1:{desc:'0费。降2挡，对敌人施加减速×降幅×<b>2</b>。消耗。', cost:0}, 2:{desc:'0费。降2挡，对敌人施加减速×降幅×<b>2</b>。<b>去除消耗。</b>', cost:0} },
    quick_upshift:  { 1:{desc:'升2挡（上限3挡），抽 <b>2</b> 张牌。', cost:1}, 2:{desc:'<b>0费</b>。升2挡（上限3挡），抽 1 张牌。', cost:0} },
    collision_block:{ 1:{desc:'获得 <b>6</b> 点格挡，造成 <b>9</b> 点伤害（均含档位倍率）。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡，造成 <b>10</b> 点伤害（均含档位倍率），施加 <b>1</b> 层易伤。', cost:1} },
    gear_lock:      { 1:{desc:'本回合挡位锁定，获得挡位×<b>5</b> 点格挡（最多 15）。', cost:1}, 2:{desc:'<b>0费</b>。本回合挡位锁定，获得挡位×<b>4</b> 点格挡。', cost:0} },
    nitro_boost:    { 1:{desc:'造成 <b>16</b> 点伤害并升1挡。3挡时改为造成 <b>22</b> 点伤害。', cost:2}, 2:{desc:'造成 <b>18</b> 点伤害并升1挡。3挡时改为造成 <b>24</b> 点伤害。', cost:2} },
    drift_charge:   { 1:{desc:'对所有敌人造成 <b>7</b> 点伤害（含档位倍率）。速度感每满 <b>20</b> 点，额外造成 <b>2</b> 点伤害（最多 +8）。', cost:2}, 2:{desc:'对所有敌人造成 <b>7</b> 点伤害（含档位倍率）。速度感每满 <b>16</b> 点，额外造成 <b>2</b> 点伤害（最多 +8）。', cost:2} },
    overtake:       { 1:{desc:'造成 <b>5+5</b> 点伤害（两段，含档位倍率）。3挡时本牌费用变为0。', cost:1}, 2:{desc:'造成 <b>6+6</b> 点伤害（两段，含档位倍率）。3挡时本牌费用变为0，且施加 1 层减速。', cost:1} },
    turbo_crush:    { 1:{desc:'造成 <b>9×（当前档位）</b> 点伤害，随后降2挡（最低降至1挡）。', cost:3}, 2:{desc:'造成 <b>10×（当前档位）</b> 点伤害，随后降2挡（最低降至1挡）。', cost:3} },
    anti_skid:      { 1:{desc:'能力：每次降挡时获得 <b>4</b> 点格挡。', cost:1}, 2:{desc:'能力：每次降挡时获得 <b>4</b> 点格挡，且每回合首次降挡时抽 1 张牌。', cost:1} },
    redline:        { 1:{desc:'能力：3挡时格挡不受减损。每回合开始若处于3挡，抽 <b>1</b> 张牌并获得 <b>1</b> 点能量。', cost:3}, 2:{desc:'能力：3挡时格挡不受减损。每回合开始若处于3挡，抽 <b>2</b> 张牌并获得 <b>1</b> 点能量。', cost:3} },
    race_instinct:  { 1:{desc:'能力：每次升挡获得 1 点势头（上限 <b>5</b>）。', cost:2}, 2:{desc:'能力：每次升挡获得 1 点势头（上限 <b>5</b>），且每回合首次升挡时抽 1 张牌。', cost:2} },
    full_throttle:  { 1:{desc:'能力：攻击牌伤害 +<b>1</b>；升挡回合攻击牌改为 +<b>3</b>。', cost:2}, 2:{desc:'能力：攻击牌伤害 +<b>2</b>；升挡回合攻击牌改为 +<b>4</b>。', cost:2} },
    overload:       { 1:{desc:'获得 1 层超载（受伤时+1格挡，上限 <b>4</b> 层），抽 2 张牌。', cost:2}, 2:{desc:'获得 <b>2</b> 层超载（上限 <b>4</b> 层），抽 2 张牌。', cost:2} },
    fuel_save:      { 1:{desc:'<b>0费</b>。降 1 挡。本回合所有技能牌费用 -1（最低 0）。', cost:0}, 2:{desc:'<b>0费</b>。降 1 挡。本回合<b>所有</b>牌费用 -1（最低 0，含攻击牌）。', cost:0} },
    corner_line:    { 1:{desc:'升过挡时获得 <b>10</b> 点格挡；否则获得 <b>6</b> 点格挡。（不受档位倍率影响）', cost:0}, 2:{desc:'升过挡时获得 <b>10</b> 点格挡并抽 <b>1</b> 张牌；否则获得 <b>6</b> 点格挡。', cost:0} },
    speed_rush:     { 1:{desc:'造成 <b>4</b> 点伤害（含档位倍率），获得当前档位×4 点速度感。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害（含档位倍率），获得当前档位×5 点速度感。', cost:1} },
    corner_guard:   { 1:{desc:'获得 <b>6</b> 点格挡。若本回合已升过挡，额外获得 <b>4</b> 点格挡。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡。若本回合已升过挡，额外获得 <b>5</b> 点格挡。', cost:1} },
    inertia_strike: { 1:{desc:'造成 <b>9</b> 点伤害（含档位倍率）。速度感每满 20 点，追加 2 点伤害。', cost:1}, 2:{desc:'造成 <b>10</b> 点伤害（含档位倍率）。速度感每满 20 点，追加 2 点伤害。', cost:1} },
    speed_limit_break:{ 1:{desc:'若速度感 ≥ <b>35</b>，本回合能量 +1。消耗。', cost:0}, 2:{desc:'若速度感 ≥ <b>35</b>，本回合能量 +1。<b>去除消耗。</b>', cost:0} },
    speed_activate: { 1:{desc:'永久：每回合开始额外获得 <b>10</b> 点速度感（上限 80）。', cost:2}, 2:{desc:'<b>1费</b>。永久：每回合开始额外获得 <b>10</b> 点速度感（上限 80）。', cost:1} },
    // ── 射手卡牌升级 ──
    ar_shoot:       { 1:{desc:'造成 <b>5</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1}, 2:{desc:'<b>0费</b>。造成 <b>3</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:0} },
    ar_dodge:       { 1:{desc:'获得 <b>6</b> 点格挡，获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'获得 <b>6</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:1} },
    ar_aim:         { 1:{desc:'获得 <b>3</b> 点蓄力。', cost:0}, 2:{desc:'获得 <b>3</b> 点蓄力，抽 <b>1</b> 张牌。', cost:0} },
    ar_sprint:      { 1:{desc:'获得 <b>5</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', cost:1}, 2:{desc:'<b>0费</b>。获得 <b>3</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', cost:0} },
    ar_charge_shot: { 1:{desc:'造成 <b>6</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>6</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>4</b> 点伤害。', cost:1} },
    ar_vuln_arrow:  { 1:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1} },
    ar_double_shot: { 1:{desc:'造成 <b>4</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于 2 次）。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于 2 次）。', cost:1} },
    ar_block_charge:{ 1:{desc:'获得 <b>7</b> 点格挡，然后获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡，然后获得 <b>2</b> 点蓄力。', cost:1} },
    ar_roll:        { 1:{desc:'获得 <b>13</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:2}, 2:{desc:'<b>1费</b>。获得 <b>10</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:1} },
    ar_pierce:      { 1:{desc:'造成 <b>10</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:2}, 2:{desc:'造成 <b>10</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>4</b> 点伤害。', cost:2} },
    ar_swap:        { 1:{desc:'丢弃手牌中任意 1 张牌，抽 <b>2</b> 张牌，获得 <b>2</b> 点蓄力。', cost:0}, 2:{desc:'丢弃手牌中任意 1 张牌，抽 <b>3</b> 张牌，获得 <b>2</b> 点蓄力。', cost:0} },
    ar_rapid_fire:  { 1:{desc:'造成 <b>5</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 2 次）。', cost:2}, 2:{desc:'<b>1费</b>。造成 <b>5</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 2 次）。', cost:1} },
    ar_wind_step:   { 1:{desc:'获得 <b>6</b> 点格挡，获得 <b>1</b> 点蓄力。本回合下一张攻击牌费用 -1。', cost:1}, 2:{desc:'获得 <b>6</b> 点格挡，获得 <b>2</b> 点蓄力。本回合下一张攻击牌费用 -1。', cost:1} },
    ar_arrow_rain:  { 1:{desc:'对所有敌人造成 <b>3</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', cost:2}, 2:{desc:'对所有敌人造成 <b>4</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', cost:2} },
    ar_full_charge: { 1:{desc:'<b>仅当蓄力满（≥上限）时可打出。</b>消耗全部蓄力，造成 <b>38</b> 点伤害。', cost:2}, 2:{desc:'<b>仅当蓄力 ≥ 4 时可打出。</b>消耗全部蓄力，造成 <b>38</b> 点伤害。', cost:2} },
    ar_gale:        { 1:{desc:'获得 <b>7</b> 点格挡，获得 <b>2</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡，获得 <b>3</b> 点蓄力，抽 <b>2</b> 张牌。消耗。', cost:1} },
    ar_pierce_all:  { 1:{desc:'对所有敌人造成 <b>8</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', cost:2}, 2:{desc:'<b>1费</b>。对所有敌人造成 <b>8</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', cost:1} },
    ar_instinct:    { 1:{desc:'永久：每回合开始时，获得 <b>2</b> 点蓄力（不超过上限）。', cost:2}, 2:{desc:'<b>1费</b>。永久：每回合开始时，获得 <b>2</b> 点蓄力（不超过上限）。', cost:1} },
    ar_cap_up:      { 1:{desc:'永久：蓄力上限提升至 <b>8</b>（原为5）。立即获得 <b>3</b> 点蓄力。', cost:2}, 2:{desc:'<b>1费</b>。永久：蓄力上限提升至 <b>8</b>（原为5）。立即获得 <b>3</b> 点蓄力。', cost:1} },
    ar_ultimate:    { 1:{desc:'造成 <b>6</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 4 次）。', cost:3}, 2:{desc:'<b>2费</b>。造成 <b>6</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 4 次）。', cost:2} },
    ar_focus_aim:   { 1:{desc:'获得 <b>4</b> 点蓄力。消耗。', cost:0}, 2:{desc:'获得 <b>4</b> 点蓄力。<b>去除消耗。</b>', cost:0} },
    ar_scatter:     { 1:{desc:'对所有敌人造成 <b>3</b> 点伤害，获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'对所有敌人造成 <b>4</b> 点伤害，获得 <b>2</b> 点蓄力。', cost:1} },
    ar_weak_arrow:  { 1:{desc:'造成 <b>4</b> 点伤害，施加 <b>1</b> 层虚弱，获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层虚弱，获得 <b>1</b> 点蓄力。', cost:1} },
    ar_dodge_counter:{ 1:{desc:'获得 <b>6</b> 点格挡。若本场战斗受过伤，额外获得 <b>3</b> 点蓄力。', cost:1}, 2:{desc:'获得 <b>8</b> 点格挡。若本场战斗受过伤，额外获得 <b>4</b> 点蓄力。', cost:1} },
    ar_hunter_rhythm:{ 1:{desc:'获得 <b>3</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', cost:0}, 2:{desc:'获得 <b>3</b> 点蓄力，抽 <b>1</b> 张牌。<b>去除消耗。</b>', cost:0} },
    ar_arrow_storm: { 1:{desc:'对所有敌人造成（<b>3</b>+蓄力）点伤害 <b>4</b> 次，消耗全部蓄力。', cost:3}, 2:{desc:'<b>2费</b>。对所有敌人造成（<b>3</b>+蓄力）点伤害 <b>4</b> 次，消耗全部蓄力。', cost:2} },
    ar_threshold:   { 1:{desc:'永久：每回合开始时，若蓄力 ≥ <b>2</b>，获得 <b>1</b> 点额外能量。', cost:1}, 2:{desc:'<b>0费</b>。永久：每回合开始时，若蓄力 ≥ <b>2</b>，获得 <b>1</b> 点额外能量。', cost:0} },
    ar_fire_arrow:    { 1:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>6</b> 点伤害，施加 <b>3</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1} },
    ar_flame_arrow:   { 1:{desc:'造成 <b>7</b> 点伤害，施加 <b>3</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>9</b> 点伤害，施加 <b>4</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1} },
    ar_inferno_arrow: { 1:{desc:'对所有敌人造成 <b>8</b> 点伤害，施加 <b>4</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（对全体）。', cost:2}, 2:{desc:'对所有敌人造成 <b>8</b> 点伤害，施加 <b>5</b> 层燃烧。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（对全体）。', cost:2} },
    ar_chill_arrow:   { 1:{desc:'造成 <b>7</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。<b>20%</b> 概率冻结敌人。', cost:2}, 2:{desc:'<b>1费</b>。造成 <b>7</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。<b>20%</b> 概率冻结敌人。', cost:1} },
    ar_freeze_arrow:  { 1:{desc:'造成 <b>12</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。<b>35%</b> 概率冻结敌人。', cost:3}, 2:{desc:'<b>2费</b>。造成 <b>12</b> 点伤害。消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。<b>40%</b> 概率冻结敌人。', cost:2} },
    // ── Brute 卡牌升级 ──
    strike:       { 1:{desc:'造成 <b>9</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>12</b> 点伤害。', cost:1} },
    defend:       { 1:{desc:'获得 <b>8</b> 点格挡。', cost:1}, 2:{desc:'获得 <b>11</b> 点格挡。', cost:1} },
    bash:         { 1:{desc:'造成 <b>12</b> 点伤害并施加 <b>3</b> 层易伤。', cost:2}, 2:{desc:'造成 <b>12</b> 点伤害并施加 <b>3</b> 层易伤。<b>费用降为 1。</b>', cost:1} },
    clash:        { 1:{desc:'若手牌全为攻击牌，造成 <b>16</b> 点伤害，否则 <b>7</b> 点。', cost:0}, 2:{desc:'若手牌全为攻击牌，造成 <b>20</b> 点伤害，否则 <b>9</b> 点。', cost:0} },
    pommel:       { 1:{desc:'造成 <b>9</b> 点伤害，摸 <b>2</b> 张牌。', cost:1}, 2:{desc:'造成 <b>9</b> 点伤害，摸 <b>2</b> 张牌。<b>费用降为 0。</b>', cost:0} },
    shrug:        { 1:{desc:'获得 <b>11</b> 点格挡，摸 1 张牌。', cost:1}, 2:{desc:'获得 <b>11</b> 点格挡，摸 <b>2</b> 张牌。', cost:1} },
    armaments:    { 1:{desc:'获得 <b>5</b> 点格挡，并升级手牌中 <b>1</b> 张牌（本战斗有效）。', cost:1}, 2:{desc:'获得 <b>5</b> 点格挡，并升级手牌中 <b>所有</b> 牌（本战斗有效）。', cost:1} },
    inflame:      { 1:{desc:'永久获得 <b>3</b> 层力量。', cost:1}, 2:{desc:'永久获得 <b>3</b> 层力量。<b>费用降为 0。</b>', cost:0} },
    ironwave:     { 1:{desc:'获得 <b>5+力量</b> 格挡，造成等量伤害。<b>力量加成翻倍计入。</b>', cost:1}, 2:{desc:'获得 <b>7+力量</b> 格挡，造成等量伤害。力量加成翻倍计入。', cost:1} },
    thunderclap:  { 1:{desc:'对所有敌人造成 <b>7</b> 点伤害并施加 1 层易伤。', cost:1}, 2:{desc:'对所有敌人造成 <b>7</b> 点伤害并施加 <b>2</b> 层易伤。', cost:1} },
    // ── 战士专属卡牌升级 ──
    br_double_strike:  { 1:{desc:'造成 <b>2</b> 段 <b>5</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>2</b> 段 <b>7</b> 点伤害。', cost:1} },
    br_heavy_blade:    { 1:{desc:'造成 <b>16</b> 点伤害。', cost:2}, 2:{desc:'造成 <b>20</b> 点伤害。', cost:2} },
    br_cleave:         { 1:{desc:'对所有敌人造成 <b>10</b> 点伤害。', cost:1}, 2:{desc:'对所有敌人造成 <b>13</b> 点伤害。', cost:1} },
    br_shield_wall:    { 1:{desc:'获得 <b>13</b> 点格挡。', cost:1}, 2:{desc:'获得 <b>16</b> 点格挡。', cost:1} },
    br_taunt_roar:     { 1:{desc:'对所有敌人施加 <b>2</b> 层虚弱，获得 <b>7</b> 点格挡。', cost:1}, 2:{desc:'对所有敌人施加 <b>2</b> 层虚弱，获得 <b>9</b> 点格挡。', cost:1} },
    br_bash_v:         { 1:{desc:'造成 <b>12</b> 点伤害，施加 <b>3</b> 层易伤。', cost:1}, 2:{desc:'造成 <b>15</b> 点伤害，施加 <b>3</b> 层易伤。', cost:1} },
    br_bloodletting:   { 1:{desc:'弃 <b>2</b> 张手牌，获得 <b>3</b> 点能量。', cost:0}, 2:{desc:'弃 <b>1</b> 张手牌，获得 <b>3</b> 点能量。', cost:0} },
    br_pommel_smash:   { 1:{desc:'造成 <b>8</b> 点伤害；本回合每打过 1 张攻击牌额外造成 <b>2</b> 伤害（最高 +10）。', cost:1}, 2:{desc:'造成 <b>10</b> 点伤害；本回合每打过 1 张攻击牌额外造成 <b>3</b> 伤害（最高 +12）。', cost:1} },
    br_grit:           { 1:{desc:'获得 <b>10</b> 点格挡；本回合受击额外 <b>-3</b>。', cost:1}, 2:{desc:'获得 <b>12</b> 点格挡；本回合受击额外 <b>-3</b>。', cost:1} },
    br_iron_swing:     { 1:{desc:'对所有敌人造成 <b>20</b> 点伤害。', cost:2}, 2:{desc:'对所有敌人造成 <b>24</b> 点伤害。', cost:2} },
    br_overwhelm:      { 1:{desc:'造成 <b>13</b> 点伤害；你 HP 高于目标时伤害翻倍。', cost:1}, 2:{desc:'造成 <b>17</b> 点伤害；你 HP 高于目标时伤害翻倍。', cost:1} },
    br_berserker:      { 1:{desc:'能力。永久 +<b>3</b> 力量；每损失 25% HP 再 +1 力量（最多 +5）。', cost:1}, 2:{desc:'<b>0费</b>。能力。永久 +<b>3</b> 力量；每损失 25% HP 再 +1 力量（最多 +5）。', cost:0} },
    br_executioner:    { 1:{desc:'造成 <b>18</b> 点伤害；目标 HP ≤ 30% 时额外 +<b>24</b>。', cost:2}, 2:{desc:'造成 <b>22</b> 点伤害；目标 HP ≤ <b>40%</b> 时额外 +<b>28</b>。', cost:2} },
    // ── 拳击手卡牌升级 ──
    box_jab:        { 1:{desc:'造成 <b>7</b> 点伤害。',            cost:1}, 2:{desc:'造成 <b>10</b> 点伤害。',                          cost:1} },
    box_guard:      { 1:{desc:'获得 <b>8</b> 点格挡。',            cost:1}, 2:{desc:'获得 <b>11</b> 点格挡。',                          cost:1} },
    box_cross:      { 1:{desc:'造成 <b>12</b> 点伤害。',           cost:1}, 2:{desc:'造成 <b>15</b> 点伤害。',                          cost:1} },
    box_uppercut:   { 1:{desc:'造成 <b>22</b> 点伤害。若上回合未受到伤害，仅造成 <b>11</b> 点。', cost:2}, 2:{desc:'造成 <b>26</b> 点伤害。若上回合未受到伤害，仅造成 <b>14</b> 点。', cost:2} },
    box_combo:      { 1:{desc:'造成 <b>3</b> 段 <b>4</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>3</b> 段 <b>5</b> 点伤害。',                cost:1} },
    box_body_blow:  { 1:{desc:'造成 <b>13</b> 点伤害，施加 1 层虚弱。', cost:1}, 2:{desc:'造成 <b>16</b> 点伤害，施加 <b>2</b> 层虚弱。', cost:1} },
    box_counter:    { 1:{desc:'造成 <b>7</b> 点伤害。有愤怒时改为 <b>13</b> 点并消耗愤怒。', cost:1}, 2:{desc:'造成 <b>9</b> 点伤害。有愤怒时改为 <b>16</b> 点并消耗愤怒。', cost:1} },
    box_iron_step:  { 1:{desc:'获得 <b>13</b> 点格挡。',           cost:1}, 2:{desc:'获得 <b>16</b> 点格挡。',                          cost:1} },
    box_haymaker:   { 1:{desc:'消耗全部愤怒，每点愤怒转 <b>4</b> 伤，基础 <b>18</b> 点。', cost:2}, 2:{desc:'消耗全部愤怒，每点愤怒转 <b>5</b> 伤，基础 <b>22</b> 点。', cost:2} },
    box_rage_combo: { 1:{desc:'愤怒 ≥ <b>2</b> 时 3 段 <b>4+愤怒</b> 伤；否则 1 段 <b>8</b> 点。', cost:1}, 2:{desc:'愤怒 ≥ <b>2</b> 时 3 段 <b>5+愤怒</b> 伤；否则 1 段 <b>10</b> 点。', cost:1} },
    box_taunt:      { 1:{desc:'立即获得 <b>3</b> 点愤怒。打出后消耗。', cost:1}, 2:{desc:'<b>0费</b>。立即获得 <b>3</b> 点愤怒。打出后消耗。', cost:0} },
    box_second_wind:{ 1:{desc:'回复 <b>6</b> 点 HP（HP < 50% 时改为 <b>9</b> 点）。', cost:2}, 2:{desc:'<b>1费</b>。回复 <b>8</b> 点 HP（HP < 50% 时改为 <b>11</b> 点）。', cost:1} },
    box_bloodlust:  { 1:{desc:'<b>1费</b>。能力。HP 低于一半时每回合开始 +1 能量。', cost:1}, 2:{desc:'<b>1费</b>。能力。HP 低于一半时每回合开始 +1 能量并额外抽 <b>1</b> 张牌。', cost:1} },
    box_iron_will:  { 1:{desc:'<b>0费</b>。能力。搏命加成翻倍（每损失 25% HP <b>+4</b>）。', cost:0}, 2:{desc:'<b>0费</b>。能力。搏命加成三倍（每损失 25% HP <b>+6</b>）。', cost:0} },
  },
};

// ── audio.js ─────────────────────────────────────────────────────────────────
const Audio = {
  _ctx: null,
  _masterGain: null,
  _bgmGain: null,
  _sfxGain: null,
  _bgmNodes: [],
  _bgmPlaying: false,
  _muted: false,
  _bgmVolume: 0.4,
  _sfxVolume: 0.75,
  _bgmInterval: null,
  _bgmMode: null,
  // 自定义音频
  _customBgmMap: null,
  _customBgmCombat: null,
  _customSfx: {},

  _getCtx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
      this._masterGain = this._ctx.createGain();
      this._masterGain.gain.value = 1.0;
      this._masterGain.connect(this._ctx.destination);
      this._bgmGain = this._ctx.createGain();
      this._bgmGain.gain.value = this._bgmVolume;
      this._bgmGain.connect(this._masterGain);
      this._sfxGain = this._ctx.createGain();
      this._sfxGain.gain.value = this._sfxVolume;
      this._sfxGain.connect(this._masterGain);
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  },

  setMute(muted) {
    this._muted = muted;
    const ctx = this._getCtx();
    this._masterGain.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.15);
  },
  setBgmVolume(v) {
    this._bgmVolume = v;
    if (this._bgmGain) this._bgmGain.gain.setTargetAtTime(v, this._ctx.currentTime, 0.1);
  },
  setSfxVolume(v) {
    this._sfxVolume = v;
    if (this._sfxGain) this._sfxGain.gain.setTargetAtTime(v, this._ctx.currentTime, 0.1);
  },

  // ── 工具函数 ──────────────────────────────────────────────────────────────
  _noise(ctx, dur, lpFreq) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    if (lpFreq) {
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lpFreq;
      src.connect(f); return { src, out: f };
    }
    return { src, out: src };
  },
  _osc(ctx, type, freq) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq; return o;
  },
  _gain(ctx, val) {
    const g = ctx.createGain(); g.gain.value = val; return g;
  },
  _filter(ctx, type, freq, q) {
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q; return f;
  },

  // ── 音效 ──────────────────────────────────────────────────────────────────

  playAttack() {
    if (this._customSfx.attack) { this._playCustom(this._customSfx.attack); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 脆响冲击：极短高频噪声爆破
    const { src: ns, out: nf } = this._noise(ctx, 0.06, 5000);
    const ng = this._gain(ctx, 0);
    ng.gain.setValueAtTime(0.9, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.06);
    // 刀刃切割：高频方波极速下扫
    const osc = this._osc(ctx, 'square', 2400);
    const of = this._filter(ctx, 'bandpass', 3000, 3);
    const og = this._gain(ctx, 0.4);
    og.gain.setValueAtTime(0.4, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.frequency.setValueAtTime(2400, t); osc.frequency.exponentialRampToValueAtTime(400, t + 0.07);
    osc.connect(of); of.connect(og); og.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.07);
    // 尾音：金属余震
    const osc2 = this._osc(ctx, 'sine', 1800);
    const og2 = this._gain(ctx, 0.12);
    og2.gain.setValueAtTime(0.12, t + 0.03); og2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(600, t + 0.18);
    osc2.connect(og2); og2.connect(this._sfxGain);
    osc2.start(t + 0.03); osc2.stop(t + 0.18);
  },

  playBlock() {
    if (this._customSfx.block) { this._playCustom(this._customSfx.block); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 金属盾牌和弦
    [300, 480, 720, 960].forEach((freq, i) => {
      const osc = this._osc(ctx, 'triangle', freq);
      const g = this._gain(ctx, 0);
      g.gain.setValueAtTime(0.22, t + i * 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      const f = this._filter(ctx, 'bandpass', freq, 2);
      osc.connect(f); f.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.02); osc.stop(t + 0.4);
    });
    // 金属碰撞噪声
    const { src: ns, out: nf } = this._noise(ctx, 0.08, 3000);
    const ng = this._gain(ctx, 0.3);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.08);
  },

  playHurt() {
    if (this._customSfx.hurt) { this._playCustom(this._customSfx.hurt); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 低沉打击
    const { src: ns, out: nf } = this._noise(ctx, 0.25, 300);
    const ng = this._gain(ctx, 0.6);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.25);
    // 痛苦低鸣
    const osc = this._osc(ctx, 'sine', 180);
    const og = this._gain(ctx, 0.2);
    og.gain.setValueAtTime(0.2, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.frequency.setValueAtTime(180, t); osc.frequency.exponentialRampToValueAtTime(80, t + 0.3);
    osc.connect(og); og.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.3);
  },

  // 蓄力中段音效（达到 3 点）：双音上扬"嗒嗒"
  playChargeMid() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 主音：上扬三角波
    const o1 = this._osc(ctx, 'triangle', 440);
    const g1 = this._gain(ctx, 0.35);
    o1.frequency.setValueAtTime(440, t);
    o1.frequency.exponentialRampToValueAtTime(880, t + 0.12);
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(0.35, t + 0.02);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    o1.connect(g1); g1.connect(this._sfxGain);
    o1.start(t); o1.stop(t + 0.3);
    // 五度泛音叠加，更清亮
    const o2 = this._osc(ctx, 'sine', 660);
    const g2 = this._gain(ctx, 0.18);
    o2.frequency.setValueAtTime(660, t + 0.04);
    o2.frequency.exponentialRampToValueAtTime(1320, t + 0.16);
    g2.gain.setValueAtTime(0, t + 0.04);
    g2.gain.linearRampToValueAtTime(0.18, t + 0.06);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o2.connect(g2); g2.connect(this._sfxGain);
    o2.start(t + 0.04); o2.stop(t + 0.32);
  },
  // 蓄力满（达到 5 点 / 满蓄）：明亮"叮"+和声
  playChargeMax() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    [880, 1320, 1760].forEach((freq, i) => {
      const osc = this._osc(ctx, 'triangle', freq);
      const og = this._gain(ctx, 0.18);
      og.gain.setValueAtTime(0, t + i*0.04);
      og.gain.linearRampToValueAtTime(0.18, t + i*0.04 + 0.02);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.connect(og); og.connect(this._sfxGain);
      osc.start(t + i*0.04); osc.stop(t + 0.6);
    });
    // 微弱闪烁噪声层
    const { src: ns, out: nf } = this._noise(ctx, 0.08, 8000);
    const ng = this._gain(ctx, 0.06);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.08);
  },

  playCardDraw() {
    if (this._customSfx.draw) { this._playCustom(this._customSfx.draw); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 纸张滑动
    const { src: ns, out: nf } = this._noise(ctx, 0.07, 6000);
    const ng = this._gain(ctx, 0.18);
    ng.gain.setValueAtTime(0.18, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.07);
    // 轻柔音调上扫
    const osc = this._osc(ctx, 'sine', 800);
    const og = this._gain(ctx, 0.08);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.08);
    osc.connect(og); og.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.08);
  },

  playCardPlay() {
    if (this._customSfx.play) { this._playCustom(this._customSfx.play); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    const osc = this._osc(ctx, 'sine', 500);
    const og = this._gain(ctx, 0.25);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.frequency.exponentialRampToValueAtTime(1000, t + 0.06);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);
    osc.connect(og); og.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.12);
  },

  playEnemyDeath() {
    if (this._customSfx.death) { this._playCustom(this._customSfx.death); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 消散爆炸
    const { src: ns, out: nf } = this._noise(ctx, 0.5, 600);
    const ng = this._gain(ctx, 0.5);
    ng.gain.setValueAtTime(0.5, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t); ns.stop(t + 0.5);
    // 低频轰鸣
    const osc = this._osc(ctx, 'sawtooth', 120);
    const of = this._filter(ctx, 'lowpass', 250);
    const og = this._gain(ctx, 0.35);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.45);
    osc.connect(of); of.connect(og); og.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.45);
  },

  playVictory() {
    if (this._customSfx.victory) { this._playCustom(this._customSfx.victory); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 上升和弦 + 泛音
    const chord = [523, 659, 784, 1047, 1319];
    chord.forEach((freq, i) => {
      const osc = this._osc(ctx, 'triangle', freq);
      const g = this._gain(ctx, 0);
      g.gain.linearRampToValueAtTime(0.28, t + i * 0.1 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.8);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.8);
    });
    // 闪光噪声
    setTimeout(() => {
      const ctx2 = this._getCtx(), t2 = ctx2.currentTime;
      const { src: ns, out: nf } = this._noise(ctx2, 0.15, 8000);
      const ng = this._gain(ctx2, 0.2);
      ng.gain.exponentialRampToValueAtTime(0.001, t2 + 0.15);
      nf.connect(ng); ng.connect(this._sfxGain);
      ns.start(t2); ns.stop(t2 + 0.15);
    }, 400);
  },

  playEndTurn() {
    if (this._customSfx.endturn) { this._playCustom(this._customSfx.endturn); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    [440, 330, 220].forEach((freq, i) => {
      const osc = this._osc(ctx, 'sine', freq);
      const g = this._gain(ctx, 0.22);
      g.gain.setValueAtTime(0.22, t + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.4);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.1); osc.stop(t + i * 0.1 + 0.4);
    });
  },

  playClick() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    const osc = this._osc(ctx, 'sine', 900);
    const g = this._gain(ctx, 0.12);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.04);
    osc.connect(g); g.connect(this._sfxGain);
    osc.start(t); osc.stop(t + 0.04);
  },

  playBuy() {
    if (this._customSfx.buy) { this._playCustom(this._customSfx.buy); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    [880, 1100, 1320, 1760].forEach((freq, i) => {
      const osc = this._osc(ctx, 'sine', freq);
      const g = this._gain(ctx, 0);
      g.gain.linearRampToValueAtTime(0.22, t + i * 0.07 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.25);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.07); osc.stop(t + i * 0.07 + 0.25);
    });
  },

  playGoldReward() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 硬币叮当音：多个高频正弦波快速衰减，模拟硬币碰撞声
    const coinFreqs = [1200, 1500, 1800, 2100, 1350];
    coinFreqs.forEach((freq, i) => {
      const delay = i * 0.06;
      const osc = this._osc(ctx, 'sine', freq);
      const g = this._gain(ctx, 0);
      g.gain.linearRampToValueAtTime(0.28, t + delay + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.18);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + delay); osc.stop(t + delay + 0.18);
      // 加一个谐波增加硬币质感
      const osc2 = this._osc(ctx, 'triangle', freq * 1.5);
      const g2 = this._gain(ctx, 0);
      g2.gain.linearRampToValueAtTime(0.08, t + delay + 0.01);
      g2.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.10);
      osc2.connect(g2); g2.connect(this._sfxGain);
      osc2.start(t + delay); osc2.stop(t + delay + 0.10);
    });
    // 最后一声较长的收尾音
    const tail = this._osc(ctx, 'sine', 900);
    const tg = this._gain(ctx, 0);
    tg.gain.linearRampToValueAtTime(0.15, t + 0.32);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
    tail.connect(tg); tg.connect(this._sfxGain);
    tail.start(t + 0.30); tail.stop(t + 0.65);
  },

  playLevelUp() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    [261, 329, 392, 523, 659, 784].forEach((freq, i) => {
      const osc = this._osc(ctx, 'triangle', freq);
      const g = this._gain(ctx, 0);
      g.gain.linearRampToValueAtTime(0.2, t + i * 0.08 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.5);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.08); osc.stop(t + i * 0.08 + 0.5);
    });
  },

  playGameOver() {
    const ctx = this._getCtx(), t = ctx.currentTime;
    [220, 185, 155, 110].forEach((freq, i) => {
      const osc = this._osc(ctx, 'sawtooth', freq);
      const f = this._filter(ctx, 'lowpass', 400);
      const g = this._gain(ctx, 0.25);
      g.gain.setValueAtTime(0.25, t + i * 0.22);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.22 + 0.5);
      osc.connect(f); f.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.22); osc.stop(t + i * 0.22 + 0.5);
    });
  },

  playPowerUp() {
    if (this._customSfx.power) { this._playCustom(this._customSfx.power); return; }
    const ctx = this._getCtx(), t = ctx.currentTime;
    // 能力牌激活：神秘魔法音 —— 低频共鸣 + 上升泛音 + 闪光噪声
    // 低频共鸣底音
    const bass = this._osc(ctx, 'sine', 110);
    const bg = this._gain(ctx, 0);
    bg.gain.linearRampToValueAtTime(0.18, t + 0.05);
    bg.gain.setValueAtTime(0.18, t + 0.2);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    bass.connect(bg); bg.connect(this._sfxGain);
    bass.start(t); bass.stop(t + 0.55);
    // 上升泛音序列
    [220, 330, 440, 660, 880].forEach((freq, i) => {
      const osc = this._osc(ctx, 'triangle', freq);
      const g = this._gain(ctx, 0);
      g.gain.linearRampToValueAtTime(0.12, t + i * 0.07 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.07 + 0.45);
      osc.connect(g); g.connect(this._sfxGain);
      osc.start(t + i * 0.07); osc.stop(t + i * 0.07 + 0.45);
    });
    // 闪光噪声
    const { src: ns, out: nf } = this._noise(ctx, 0.12, 8000);
    const ng = this._gain(ctx, 0);
    ng.gain.linearRampToValueAtTime(0.15, t + 0.05);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    nf.connect(ng); ng.connect(this._sfxGain);
    ns.start(t + 0.1); ns.stop(t + 0.3);
  },

  // 自定义音频播放
  _playCustom(buffer) {
    const ctx = this._getCtx();
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this._sfxGain);
    src.start();
  },

  _playCustomBgm(buffer) {
    const ctx = this._getCtx();
    if (this._customBgmSrc) { try { this._customBgmSrc.stop(); } catch(e){} }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.connect(this._bgmGain);
    src.start();
    this._customBgmSrc = src;
  },

  // ── 背景音乐 ──────────────────────────────────────────────────────────────

  startBgmMap() {
    this._stopBgm();
    this._bgmMode = 'map';
    if (this._customBgmMap) { this._playCustomBgm(this._customBgmMap); return; }
    const ctx = this._getCtx();
    this._bgmPlaying = true;
    this._bgmNodes = [];

    // ── C大调，轻快欢乐战斗风格，全程三角波+正弦波，绝无刺耳声 ──
    const N = {
      C3:130.8, E3:164.8, F3:174.6, G3:196,   A3:220,
      C4:261.6, D4:293.7, E4:329.6, F4:349.2, G4:392, A4:440, B4:493.9,
      C5:523.3, D5:587.3, E5:659.3, F5:698.5, G5:784, A5:880,
      R:0
    };

    const bpm = 148;
    const stepMs = (60 / bpm / 2) * 1000; // ~202ms，8分音符步进
    let tick = 0;
    let melStep = 0;

    // ── 48步主旋律，约9.7秒循环，C大调三段 ──
    const melody = [
      // ■ 段A：跳跃开场，欢快上行
      N.C5, N.E5, N.G5, N.E5,  N.D5, N.C5, N.A4, N.G4,
      N.E4, N.G4, N.A4, N.C5,  N.E5, N.C5, N.G4, N.R,
      // ■ 段B：小转折，F和弦色彩
      N.F4, N.A4, N.C5, N.A4,  N.G4, N.F4, N.E4, N.D4,
      N.E4, N.G4, N.C5, N.E5,  N.D5, N.C5, N.B4, N.R,
      // ■ 段C：高潮展开，G→C收尾
      N.G4, N.A4, N.C5, N.E5,  N.G5, N.E5, N.D5, N.C5,
      N.A4, N.C5, N.E5, N.C5,  N.G4, N.A4, N.C5, N.R,
    ];

    // 低音根音，每8步一次（三角波，柔和）
    const bassRoots = [
      N.C3, N.G3, N.F3, N.G3,  // C→G→F→G
      N.F3, N.C3, N.G3, N.C3,  // F→C→G→C
      N.G3, N.F3, N.C3, N.G3,  // G→F→C→G
    ];

    // 和弦琶音（正弦波，每8步一组）
    const arpGroups = [
      [N.C4,N.E4,N.G4,N.C5], [N.G4,N.B4,N.D5,N.G5],
      [N.F4,N.A4,N.C5,N.F5], [N.G4,N.B4,N.D5,N.G5],
      [N.F4,N.A4,N.C5,N.F5], [N.C4,N.E4,N.G4,N.C5],
    ];

    this._bgmInterval = setInterval(() => {
      if (!this._bgmPlaying) return;
      const ctx2 = this._getCtx(), t = ctx2.currentTime;
      tick++;
      const isDown = tick % 2 === 1;
      const beat4  = Math.ceil(tick / 2) % 4;

      // ── 踢鼓：1、3拍（纯正弦，柔和厚实）──
      if (isDown && (beat4 === 1 || beat4 === 3)) {
        const k = this._osc(ctx2, 'sine', 150);
        const kg = ctx2.createGain();
        kg.gain.setValueAtTime(0.30, t); kg.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        k.frequency.setValueAtTime(150, t); k.frequency.exponentialRampToValueAtTime(38, t + 0.11);
        k.connect(kg); kg.connect(this._bgmGain); k.start(t); k.stop(t + 0.15);
      }

      // ── 拍手/小鼓：2、4拍（噪声+低通，不刺耳）──
      if (isDown && (beat4 === 2 || beat4 === 0)) {
        const sb = ctx2.createBuffer(1, ctx2.sampleRate * 0.10, ctx2.sampleRate);
        const sd = sb.getChannelData(0);
        for (let i = 0; i < sd.length; i++) sd[i] = (Math.random()*2-1) * Math.exp(-i/(ctx2.sampleRate*0.030));
        const ss = ctx2.createBufferSource(); ss.buffer = sb;
        const sf = this._filter(ctx2, 'lowpass', 3500); // 低通而非带通，无刺耳峰值
        const sg = ctx2.createGain(); sg.gain.value = 0.18;
        ss.connect(sf); sf.connect(sg); sg.connect(this._bgmGain); ss.start(t);
      }

      // ── 主旋律：三角波+低通（温暖，完全不刺耳）──
      const freq = melody[melStep % melody.length];
      melStep++;
      if (freq > 0) {
        const mo = this._osc(ctx2, 'triangle', freq);
        const mf = this._filter(ctx2, 'lowpass', 4000);
        const mg = ctx2.createGain();
        mg.gain.setValueAtTime(0, t);
        mg.gain.linearRampToValueAtTime(0.072, t + 0.014);
        mg.gain.setValueAtTime(0.065, t + stepMs/1000*0.4);
        mg.gain.exponentialRampToValueAtTime(0.001, t + stepMs/1000*1.45);
        mo.connect(mf); mf.connect(mg); mg.connect(this._bgmGain);
        mo.start(t); mo.stop(t + stepMs/1000*1.5);
      }

      // ── 正弦波琶音（流动欢快感）──
      const ag = arpGroups[Math.floor((melStep-1)/8) % arpGroups.length];
      const an = ag[(tick-1) % 4];
      const ao = this._osc(ctx2, 'sine', an);
      const ago = ctx2.createGain();
      ago.gain.setValueAtTime(0,t); ago.gain.linearRampToValueAtTime(0.022, t+0.012);
      ago.gain.exponentialRampToValueAtTime(0.001, t+stepMs/1000*1.8);
      ao.connect(ago); ago.connect(this._bgmGain); ao.start(t); ao.stop(t+stepMs/1000*1.9);

      // ── 低音根音：每8步（三角波+低通，温暖饱满）──
      if (tick % 8 === 1) {
        const bn = bassRoots[Math.floor((tick-1)/8) % bassRoots.length];
        const bo = this._osc(ctx2, 'triangle', bn);
        const bf = this._filter(ctx2, 'lowpass', 500);
        const bg2 = ctx2.createGain();
        bg2.gain.setValueAtTime(0,t); bg2.gain.linearRampToValueAtTime(0.15, t+0.020);
        bg2.gain.setValueAtTime(0.13, t+stepMs/1000*5); bg2.gain.exponentialRampToValueAtTime(0.001, t+stepMs/1000*8.2);
        bo.connect(bf); bf.connect(bg2); bg2.connect(this._bgmGain);
        bo.start(t); bo.stop(t+stepMs/1000*8.5);
      }

      tick = tick % 10000;
    }, stepMs);
  },

  startBgmCombat() {
    this._stopBgm();
    this._bgmMode = 'combat';
    if (this._customBgmCombat) { this._playCustomBgm(this._customBgmCombat); return; }
    const ctx = this._getCtx();
    this._bgmPlaying = true;
    this._bgmNodes = [];

    // ── G大调冒险探索风格：温暖、流动、与战斗音乐形成鲜明对比 ──
    // 乐器：三角波旋律（温暖）+ 正弦琶音（清澈）+ 三角波低音（柔和）+ 轻柔打击（无军鼓）
    const N = {
      G2:98,   B2:123.5, C3:130.8, D3:146.8, E3:164.8, G3:196,
      A3:220,  B3:246.9, C4:261.6, D4:293.7, E4:329.6, G4:392,
      A4:440,  B4:493.9, C5:523.3, D5:587.3, E5:659.3, G5:784,
      A5:880,  R:0
    };

    // 128 BPM，四分音符步进 ≈ 234ms，轻快但不急促
    const bpm = 128;
    const stepMs = (60 / bpm) * 1000;        // 四分音符：~469ms
    const halfMs = stepMs / 2;                // 八分音符：~234ms
    let tick = 0;
    let melStep = 0;

    // ── 48步主旋律（约11.2秒循环），G大调三段式 ──
    const melody = [
      // ■ A段：上行开场，明朗冒险感
      N.G4, N.B4, N.D5, N.G5,  N.E5, N.D5, N.B4, N.G4,
      N.A4, N.B4, N.D5, N.B4,  N.G4, N.A4, N.B4, N.R,
      // ■ B段：温柔流动，Em色彩
      N.E5, N.D5, N.B4, N.A4,  N.G4, N.A4, N.B4, N.D5,
      N.E5, N.G5, N.E5, N.D5,  N.B4, N.A4, N.G4, N.R,
      // ■ C段：高潮展开，G→C→D走向
      N.D5, N.E5, N.G5, N.E5,  N.D5, N.B4, N.G4, N.B4,
      N.C5, N.B4, N.A4, N.G4,  N.A4, N.B4, N.D5, N.R,
    ];

    // ── 低音根音，每4步一次（三角波，温柔不压迫）──
    const bassNotes = [
      N.G2, N.G2, N.D3, N.D3,  // G→D
      N.E3, N.E3, N.C3, N.C3,  // Em→C
      N.G2, N.G2, N.C3, N.D3,  // G→C→D
    ];

    // ── 正弦琶音和弦组（每8步换一组）──
    const arpGroups = [
      [N.G4, N.B4, N.D5, N.G5],   // G
      [N.D4, N.G4, N.B4, N.D5],   // D
      [N.E4, N.G4, N.B4, N.E5],   // Em
      [N.C4, N.E4, N.G4, N.C5],   // C
      [N.G4, N.B4, N.D5, N.G5],   // G
      [N.C4, N.E4, N.G4, N.C5],   // C
    ];

    this._bgmInterval = setInterval(() => {
      if (!this._bgmPlaying) return;
      const ctx2 = this._getCtx(), t = ctx2.currentTime;
      tick++;
      const isDown = tick % 2 === 1;
      const beat4  = Math.ceil(tick / 2) % 4;

      // ── 轻柔底鼓（仅第1拍，音调柔和）──
      if (isDown && beat4 === 1) {
        const kTone = this._osc(ctx2, 'sine', 120);
        const ktG = ctx2.createGain();
        ktG.gain.setValueAtTime(0.15, t); ktG.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        kTone.frequency.setValueAtTime(120, t); kTone.frequency.exponentialRampToValueAtTime(42, t + 0.13);
        kTone.connect(ktG); ktG.connect(this._bgmGain); kTone.start(t); kTone.stop(t + 0.17);
      }

      // ── 轻拍木鱼感（第2、4拍，低频木块敲击）──
      if (isDown && (beat4 === 2 || beat4 === 0)) {
        const wTone = this._osc(ctx2, 'sine', 660);
        const wG = ctx2.createGain();
        wG.gain.setValueAtTime(0.05, t); wG.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
        wTone.connect(wG); wG.connect(this._bgmGain); wTone.start(t); wTone.stop(t + 0.06);
      }

      // ── 轻柔高帽（八分音符，正拍偏亮）──
      const hhBuf = ctx2.createBuffer(1, ctx2.sampleRate * 0.016, ctx2.sampleRate);
      const hhD = hhBuf.getChannelData(0);
      for (let i = 0; i < hhD.length; i++) hhD[i] = (Math.random()*2-1) * Math.exp(-i/(ctx2.sampleRate*0.004));
      const hhSrc = ctx2.createBufferSource(); hhSrc.buffer = hhBuf;
      const hhF = this._filter(ctx2, 'highpass', 11000);
      const hhG = ctx2.createGain(); hhG.gain.value = isDown ? 0.028 : 0.013;
      hhSrc.connect(hhF); hhF.connect(hhG); hhG.connect(this._bgmGain); hhSrc.start(t);

      // ── 主旋律（三角波+低通，温暖如木管）──
      const freq = melody[melStep % melody.length];
      melStep++;
      if (freq > 0) {
        const mo = this._osc(ctx2, 'triangle', freq);
        const mf = this._filter(ctx2, 'lowpass', 5500);
        const mg = ctx2.createGain();
        mg.gain.setValueAtTime(0, t);
        mg.gain.linearRampToValueAtTime(0.070, t + 0.016);
        mg.gain.setValueAtTime(0.062, t + halfMs/1000*0.5);
        mg.gain.exponentialRampToValueAtTime(0.001, t + halfMs/1000*1.55);
        mo.connect(mf); mf.connect(mg); mg.connect(this._bgmGain);
        mo.start(t); mo.stop(t + halfMs/1000*1.60);
        // 高八度泛音（钟铃感）
        const mo2 = this._osc(ctx2, 'sine', freq * 2);
        const mg2 = ctx2.createGain();
        mg2.gain.setValueAtTime(0, t); mg2.gain.linearRampToValueAtTime(0.015, t + 0.011);
        mg2.gain.exponentialRampToValueAtTime(0.001, t + halfMs/1000*1.0);
        mo2.connect(mg2); mg2.connect(this._bgmGain);
        mo2.start(t); mo2.stop(t + halfMs/1000*1.05);
      }

      // ── 正弦波琶音（每步换音，流动清澈）──
      const arpG  = arpGroups[Math.floor((melStep - 1) / 8) % arpGroups.length];
      const arpNote = arpG[(tick - 1) % 4];
      const ao = this._osc(ctx2, 'sine', arpNote);
      const ag = ctx2.createGain();
      ag.gain.setValueAtTime(0, t); ag.gain.linearRampToValueAtTime(0.018, t + 0.012);
      ag.gain.exponentialRampToValueAtTime(0.001, t + halfMs/1000*2.0);
      ao.connect(ag); ag.connect(this._bgmGain); ao.start(t); ao.stop(t + halfMs/1000*2.1);

      // ── 低音（三角波，每4步换根音，柔和饱满）──
      if (tick % 4 === 1) {
        const bNote = bassNotes[Math.floor((tick-1)/4) % bassNotes.length];
        const bo = this._osc(ctx2, 'triangle', bNote);
        const bf = this._filter(ctx2, 'lowpass', 480);
        const bg = ctx2.createGain();
        bg.gain.setValueAtTime(0, t);
        bg.gain.linearRampToValueAtTime(0.13, t + 0.022);
        bg.gain.setValueAtTime(0.11, t + halfMs/1000*5.0);
        bg.gain.exponentialRampToValueAtTime(0.001, t + halfMs/1000*8.2);
        bo.connect(bf); bf.connect(bg); bg.connect(this._bgmGain);
        bo.start(t); bo.stop(t + halfMs/1000*8.5);
      }

      tick = tick % 10000;
    }, halfMs);
  },

  _stopBgm() {
    this._bgmPlaying = false;
    if (this._bgmInterval) { clearInterval(this._bgmInterval); this._bgmInterval = null; }
    this._bgmNodes.forEach(n => { try { n.stop(); } catch(e) {} });
    this._bgmNodes = [];
    if (this._customBgmSrc) { try { this._customBgmSrc.stop(); } catch(e){} this._customBgmSrc = null; }
  },

  stopAll() { this._stopBgm(); },

  // ── 音频设置面板 ──────────────────────────────────────────────────────────
  showSettings() {
    const existing = document.getElementById('audio-settings-overlay');
    if (existing) { existing.remove(); return; }
    const overlay = document.createElement('div');
    overlay.id = 'audio-settings-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:10000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
    overlay.innerHTML = `
<div style="background:linear-gradient(135deg,#1a1a2e,#16213e);border:1.5px solid rgba(255,255,255,0.15);border-radius:16px;padding:28px 32px;min-width:340px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,0.6);">
  <h3 style="margin:0 0 20px;color:#e8e8f0;font-size:1.4rem;display:flex;align-items:center;gap:10px;">🎵 音频设置</h3>

  <div style="margin-bottom:18px;">
    <label style="color:rgba(255,255,255,0.85);font-size:0.95rem;display:block;margin-bottom:8px;">🎼 背景音乐音量</label>
    <div style="display:flex;align-items:center;gap:12px;">
      <input type="range" id="bgm-vol" min="0" max="1" step="0.05" value="${this._bgmVolume}"
        style="flex:1;accent-color:#5dade2;height:6px;">
      <span id="bgm-vol-val" style="color:#5dade2;font-weight:700;min-width:36px;text-align:right;">${Math.round(this._bgmVolume*100)}%</span>
    </div>
  </div>

  <div style="margin-bottom:18px;">
    <label style="color:rgba(255,255,255,0.85);font-size:0.95rem;display:block;margin-bottom:8px;">🔊 音效音量</label>
    <div style="display:flex;align-items:center;gap:12px;">
      <input type="range" id="sfx-vol" min="0" max="1" step="0.05" value="${this._sfxVolume}"
        style="flex:1;accent-color:#e67e22;height:6px;">
      <span id="sfx-vol-val" style="color:#e67e22;font-weight:700;min-width:36px;text-align:right;">${Math.round(this._sfxVolume*100)}%</span>
    </div>
  </div>

  <div style="margin-bottom:18px;">
    <label style="color:rgba(255,255,255,0.85);font-size:0.95rem;display:block;margin-bottom:8px;">🗺️ 自定义地图背景音乐 <span style="color:rgba(255,255,255,0.4);font-size:0.8rem">(.mp3/.ogg/.wav)</span></label>
    <div style="display:flex;align-items:center;gap:10px;">
      <label style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 14px;cursor:pointer;color:#e8e8f0;font-size:0.9rem;flex:1;text-align:center;">
        📂 选择文件 <input type="file" id="bgm-map-file" accept="audio/*" style="display:none;">
      </label>
      <span id="bgm-map-name" style="color:rgba(255,255,255,0.5);font-size:0.82rem;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${this._customBgmMap ? '已加载' : '使用默认'}</span>
      <button id="bgm-map-clear" style="background:rgba(231,76,60,0.2);border:1px solid rgba(231,76,60,0.4);border-radius:6px;color:#e74c3c;padding:4px 10px;cursor:pointer;font-size:0.85rem;">清除</button>
    </div>
  </div>

  <div style="margin-bottom:18px;">
    <label style="color:rgba(255,255,255,0.85);font-size:0.95rem;display:block;margin-bottom:8px;">⚔️ 自定义战斗背景音乐 <span style="color:rgba(255,255,255,0.4);font-size:0.8rem">(.mp3/.ogg/.wav)</span></label>
    <div style="display:flex;align-items:center;gap:10px;">
      <label style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 14px;cursor:pointer;color:#e8e8f0;font-size:0.9rem;flex:1;text-align:center;">
        📂 选择文件 <input type="file" id="bgm-combat-file" accept="audio/*" style="display:none;">
      </label>
      <span id="bgm-combat-name" style="color:rgba(255,255,255,0.5);font-size:0.82rem;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${this._customBgmCombat ? '已加载' : '使用默认'}</span>
      <button id="bgm-combat-clear" style="background:rgba(231,76,60,0.2);border:1px solid rgba(231,76,60,0.4);border-radius:6px;color:#e74c3c;padding:4px 10px;cursor:pointer;font-size:0.85rem;">清除</button>
    </div>
  </div>

  <div style="margin-bottom:24px;">
    <label style="color:rgba(255,255,255,0.85);font-size:0.95rem;display:block;margin-bottom:10px;">🎹 自定义音效</label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      ${[
        ['attack','攻击'],['block','防御'],['power','能力'],
        ['hurt','受伤'],['draw','摸牌'],['victory','胜利'],['buy','购买']
      ].map(([key,label])=>`
      <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:8px 10px;">
        <div style="color:rgba(255,255,255,0.7);font-size:0.82rem;margin-bottom:5px;">${label}</div>
        <label style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;padding:4px 8px;cursor:pointer;color:#e8e8f0;font-size:0.8rem;display:flex;align-items:center;gap:6px;">
          📂 <span id="sfx-${key}-name" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Audio._customSfx[key]?'已加载':'默认'}</span>
          <input type="file" id="sfx-${key}-file" accept="audio/*" style="display:none;">
        </label>
      </div>`).join('')}
    </div>
  </div>

  <div style="display:flex;gap:12px;justify-content:flex-end;">
    <button id="audio-test-btn" style="background:rgba(93,173,226,0.15);border:1px solid rgba(93,173,226,0.4);border-radius:8px;color:#5dade2;padding:8px 18px;cursor:pointer;font-size:0.95rem;">🎵 试听音效</button>
    <button id="audio-settings-close" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#e8e8f0;padding:8px 18px;cursor:pointer;font-size:0.95rem;">关闭</button>
  </div>
</div>`;
    document.body.appendChild(overlay);

    // 音量滑块
    const bgmSlider = document.getElementById('bgm-vol');
    const sfxSlider = document.getElementById('sfx-vol');
    bgmSlider.oninput = () => {
      Audio.setBgmVolume(parseFloat(bgmSlider.value));
      document.getElementById('bgm-vol-val').textContent = Math.round(bgmSlider.value * 100) + '%';
    };
    sfxSlider.oninput = () => {
      Audio.setSfxVolume(parseFloat(sfxSlider.value));
      document.getElementById('sfx-vol-val').textContent = Math.round(sfxSlider.value * 100) + '%';
    };

    // 加载自定义BGM
    const loadAudio = (fileInput, nameEl, onLoad) => {
      fileInput.onchange = () => {
        const file = fileInput.files[0]; if (!file) return;
        nameEl.textContent = file.name;
        const reader = new FileReader();
        reader.onload = e => {
          const ctx = Audio._getCtx();
          ctx.decodeAudioData(e.target.result.slice(0), buf => onLoad(buf));
        };
        reader.readAsArrayBuffer(file);
      };
    };

    loadAudio(
      document.getElementById('bgm-map-file'),
      document.getElementById('bgm-map-name'),
      buf => { Audio._customBgmMap = buf; if (Audio._bgmMode === 'map') Audio.startBgmMap(); }
    );
    loadAudio(
      document.getElementById('bgm-combat-file'),
      document.getElementById('bgm-combat-name'),
      buf => { Audio._customBgmCombat = buf; if (Audio._bgmMode === 'combat') Audio.startBgmCombat(); }
    );

    // 清除自定义BGM
    document.getElementById('bgm-map-clear').onclick = () => {
      Audio._customBgmMap = null;
      document.getElementById('bgm-map-name').textContent = '使用默认';
      if (Audio._bgmMode === 'map') Audio.startBgmMap();
    };
    document.getElementById('bgm-combat-clear').onclick = () => {
      Audio._customBgmCombat = null;
      document.getElementById('bgm-combat-name').textContent = '使用默认';
      if (Audio._bgmMode === 'combat') Audio.startBgmCombat();
    };

    // 加载自定义音效
    ['attack','block','power','hurt','draw','victory','buy'].forEach(key => {
      const fi = document.getElementById(`sfx-${key}-file`);
      const ni = document.getElementById(`sfx-${key}-name`);
      if (!fi) return;
      fi.onchange = () => {
        const file = fi.files[0]; if (!file) return;
        ni.textContent = file.name.length > 12 ? file.name.slice(0,12)+'…' : file.name;
        const reader = new FileReader();
        reader.onload = e => {
          const ctx = Audio._getCtx();
          ctx.decodeAudioData(e.target.result.slice(0), buf => { Audio._customSfx[key] = buf; });
        };
        reader.readAsArrayBuffer(file);
      };
    });

    // 试听
    document.getElementById('audio-test-btn').onclick = () => {
      Audio.playCardDraw();
      setTimeout(() => Audio.playCardPlay(), 350);
      setTimeout(() => Audio.playHurt(), 700);
      setTimeout(() => Audio.playBuy(), 1050);
      setTimeout(() => Audio.playVictory(), 1400);
    };

    // 关闭
    document.getElementById('audio-settings-close').onclick = () => overlay.remove();
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
  }
};


// ── state.js ──────────────────────────────────────────────────────────────────
const State = {
  current: { screen:'menu', run:null },
  _listeners: {},
  on(event,fn){ if(!this._listeners[event])this._listeners[event]=[]; this._listeners[event].push(fn); },
  off(event,fn){ if(!this._listeners[event])return; this._listeners[event]=this._listeners[event].filter(f=>f!==fn); },
  emit(event,data){ (this._listeners[event]||[]).forEach(fn=>fn(data)); },
  go(screen,data){ this.current.screen=screen; if(data)Object.assign(this.current,data); this.emit('screenChange',{screen,data}); },
  startRun(characterId){
    const char=Data.characters.find(c=>c.id===characterId);
    this.current.run={
      character:{id:char.id,name:char.name,emoji:char.emoji,color:char.color,hp:char.hp,maxHp:char.maxHp,block:0,buffs:{},debuffs:{}},
      floor:0,act:1,gold:({archer:75,racer:85,brute:99}[characterId]??99),deck:[...char.startingDeck],relics:[],pendingRelic:null,potions:[null,null,null],map:MapGen.generate(1),currentNodeId:null,combat:null
    };
    const startNode=this.current.run.map.nodes.find(n=>n.floor===0);
    if(startNode)this.current.run.currentNodeId=startNode.id;
    this.emit('runStarted',this.current.run);
  },
  get run(){ if(!this.current.run)throw new Error('No active run'); return this.current.run; },
  saveRun(slot){ if(this.current.run)Save.write(slot,this.current.run); },
  loadRun(slot){ const run=Save.read(slot); if(!run)return false; if(!run.potions||run.potions.length<5){run.potions=Array.from({length:5},(_,i)=>(run.potions&&run.potions[i]!==undefined?run.potions[i]:null));} this.current.run=run; this.go('map'); return true; }
};

// ── save.js ───────────────────────────────────────────────────────────────────
const Save = {
  SLOTS:5,
  KEY:slot=>`stc_save_${slot}`,
  BACKUP_KEY:slot=>`stc_save_${slot}_bak`,
  write(slot, runState){
    try {
      const s = JSON.parse(JSON.stringify(runState, (k,v) => typeof v==='function' ? undefined : v));
      s._savedAt = Date.now();
      const json = JSON.stringify(s);
      // 先写备份（上一次的存档），再写主存档
      const prev = localStorage.getItem(this.KEY(slot));
      if (prev) { try { localStorage.setItem(this.BACKUP_KEY(slot), prev); } catch(e){} }
      localStorage.setItem(this.KEY(slot), json);
    } catch(e) {
      // localStorage 满或不可用时，尝试清理旧数据后重试
      try {
        // 清理所有备份
        for(let i=0;i<this.SLOTS;i++) localStorage.removeItem(this.BACKUP_KEY(i));
        const s2 = JSON.parse(JSON.stringify(runState,(k,v)=>typeof v==='function'?undefined:v));
        s2._savedAt = Date.now();
        localStorage.setItem(this.KEY(slot), JSON.stringify(s2));
      } catch(e2) {
        console.warn('[Save] 存档失败，localStorage 不可用:', e2);
      }
    }
  },
  read(slot){
    // 先尝试读主存档，失败则读备份
    const r = localStorage.getItem(this.KEY(slot));
    if (r) { try { return JSON.parse(r); } catch(e) {} }
    const bak = localStorage.getItem(this.BACKUP_KEY(slot));
    if (bak) { try { console.warn('[Save] 主存档损坏，已从备份恢复'); return JSON.parse(bak); } catch(e) {} }
    return null;
  },
  erase(slot){
    localStorage.removeItem(this.KEY(slot));
    localStorage.removeItem(this.BACKUP_KEY(slot));
  },
  list(){ return Array.from({length:this.SLOTS},(_,i)=>({slot:i,run:this.read(i)})); }
};

// ── map.js ────────────────────────────────────────────────────────────────────
const MapGen = {
  FLOORS:7,
  // 固定伪随机数生成器（基于种子，保证每次生成相同地图）
  _rng(seed){ let s=(seed^0xdeadbeef)>>>0; return()=>{ s=Math.imul(s^(s>>>16),0x45d9f3b);s=Math.imul(s^(s>>>16),0x45d9f3b);s^=s>>>16;return(s>>>0)/0xffffffff; }; },
  // 指南针直路地图：7~10个节点。约束：精英≤1，普通战斗 2 个（10 节点才允许 3 个），问号/休息/商店各≥1，最后一节点必为商店
  generateCompass(){
    const nodes=[],paths=[];let idCounter=0;const floorNodes=[];
    const rng=MapGen._rng(Date.now()&0xfffff);
    // 随机决7~10个中间节点（不含起点和终点boss）
    const midCount = 7 + Math.floor(rng() * 4); // 7,8,9,10
    const totalFloors = midCount + 1;
    // 起点
    const entry={id:idCounter++,type:'start',floor:0,col:2,emoji:'🚶',done:false};
    nodes.push(entry);floorNodes[0]=[entry];
    // 先构建中间节点类型池：强制保底 1 问号 + 1 休息 + 1 商店 + 2 普通战斗
    // 剩余槽位按概率填充，并尊重 elite≤1、combat 上限（<10 节点只允许 2 场战斗，10 节点最多 3 场）
    const slotCount = midCount - 1; // 最后一层固定商店，不算在 slots 里
    const slots = ['question','rest','shop','combat','combat']; // 强制保底
    let eliteCount = 0, combatCount = 2;
    const combatMax = midCount >= 10 ? 3 : 2;
    while(slots.length < slotCount){
      const r = rng();
      let pick;
      if(r < 0.10) pick='elite';
      else if(r < 0.40) pick='combat';
      else if(r < 0.66) pick='question';
      else if(r < 0.83) pick='rest';
      else pick='shop';
      // 上限保护：超了换成其他事件
      if(pick==='elite' && eliteCount>=1){
        pick = (r < 0.5 ? 'question' : (r < 0.75 ? 'rest' : 'shop'));
      }
      if(pick==='combat' && combatCount>=combatMax){
        pick = (r < 0.33 ? 'question' : (r < 0.66 ? 'rest' : 'shop'));
      }
      if(pick==='elite') eliteCount++;
      if(pick==='combat') combatCount++;
      slots.push(pick);
    }
    // 打乱中间槽位顺序
    for(let i=slots.length-1; i>0; i--){
      const j = Math.floor(rng()*(i+1));
      const tmp = slots[i]; slots[i] = slots[j]; slots[j] = tmp;
    }
    // 最后一层固定商店
    slots.push('shop');
    // 实际生成节点
    for(let f=1; f<=midCount; f++){
      const type = slots[f-1];
      const node={id:idCounter++,type,floor:f,col:2,emoji:MapGen._emoji(type),done:false};
      nodes.push(node);floorNodes[f]=[node];
    }
    // 终点 Boss
    const boss={id:idCounter++,type:'boss',floor:midCount+1,col:2,emoji:'👋',done:false};
    nodes.push(boss);floorNodes[midCount+1]=[boss];
    // 生成直路路径
    for(let f=0;f<=midCount;f++){
      paths.push({from:floorNodes[f][0].id,to:floorNodes[f+1][0].id});
    }
    return{nodes,paths,floorNodes:floorNodes.map(f=>f.map(n=>n.id)),compassMap:true,totalFloors:midCount+1};
  },
  generate(act=1){
    const nodes=[],paths=[];let idCounter=0;const floorNodes=[];
    // 使用固定种子确保路线一致（每局游戏用时间戳作种子）
    const rng=MapGen._rng(Date.now()&0xfffff);
    // 起点
    const entry={id:idCounter++,type:'start',floor:0,col:2,emoji:'🚪',done:false};
    nodes.push(entry);floorNodes[0]=[entry];
    // 生成 6 层中间节点，每层 2-3 个，列数更分散
    const COLS=5; // 使用 0-4 五列
    for(let f=1;f<=6;f++){
      // floor1固定3节点（起点能连出3条路）；floor6固定3节点（保证3条路通Boss）
      const count=(f===1||f===6)?3:(f===3?2:(rng()<0.55?3:2));
      // 均匀选列，避免相邻层节点完全重叠
      const availCols=[0,1,2,3,4];
      const selectedCols=[];
      if(count===3){selectedCols.push(0,2,4);}
      else if(count===2){const offset=Math.floor(rng()*3);selectedCols.push(offset,offset+2);}
      else{selectedCols.push(2);}
      const floor=[];
      selectedCols.forEach(col=>{
        const type=MapGen._pickType(f,rng);
        const node={id:idCounter++,type,floor:f,col,emoji:MapGen._emoji(type),done:false};
        nodes.push(node);floor.push(node);
      });
      floorNodes[f]=floor;
    }
    // 终点 Boss
    const boss={id:idCounter++,type:'boss',floor:7,col:2,emoji:act===2?'🐆':'👑',done:false};
    nodes.push(boss);floorNodes[7]=[boss];
    // 生成路径：每个节点至少连接一条路，尽量形成多条不同路线
    for(let f=0;f<7;f++){
      const from=floorNodes[f],to=floorNodes[f+1];
      from.forEach(n=>{
        if(f===0){
          // 起点强制连接全部floor1节点（保证3条出发路线）
          to.forEach(t=>paths.push({from:n.id,to:t.id}));
        } else {
          const sorted=[...to].sort((a,b)=>Math.abs(a.col-n.col)-Math.abs(b.col-n.col));
          paths.push({from:n.id,to:sorted[0].id});
          if(sorted.length>1&&rng()<0.35)paths.push({from:n.id,to:sorted[1].id});
        }
      });
      // 确保每个 to 节点至少有一条入边
      to.forEach(tn=>{
        if(!paths.some(p=>p.to===tn.id)){
          const src=from[Math.floor(rng()*from.length)];
          paths.push({from:src.id,to:tn.id});
        }
      });
    }
    // 去重路径
    const seen=new Set();
    const uniquePaths=paths.filter(p=>{
      const k=`${p.from}-${p.to}`;if(seen.has(k))return false;seen.add(k);return true;
    });
    // 确保通向Boss的路径不少于3条
    const bossId=boss.id;
    const bossPaths=uniquePaths.filter(p=>p.to===bossId);
    if(bossPaths.length<3){
      const preBossFloor=floorNodes[6];
      preBossFloor.forEach(n=>{
        if(uniquePaths.filter(p=>p.to===bossId).length>=3)return;
        if(!uniquePaths.some(p=>p.from===n.id&&p.to===bossId)){
          uniquePaths.push({from:n.id,to:bossId});
        }
      });
    }
    return{nodes,paths:uniquePaths,floorNodes:floorNodes.map(f=>f.map(n=>n.id))};
  },
  _pickType(floor,rng){
    const r=rng();
    if(floor===1||floor===2){
      // 第1-2层：小怪78% 精英12% 问号10%
      if(r<0.78)return'combat';
      if(r<0.90)return'elite';
      return'question';
    }
    if(floor===3){
      // 第3层：小怪55% 精英13% 市井10% 商店12% 问号10%
      if(r<0.55)return'combat';
      if(r<0.68)return'elite';
      if(r<0.78)return'rest';
      if(r<0.90)return'shop';
      return'question';
    }
    if(floor===4){
      // 第4层：小怪35% 精英15% 市井15% 商店25% 问号10%
      if(r<0.35)return'combat';
      if(r<0.50)return'elite';
      if(r<0.65)return'rest';
      if(r<0.90)return'shop';
      return'question';
    }
    if(floor===5){
      // 第5层：小怪15% 精英15% 市井25% 商店35% 问号10%
      if(r<0.15)return'combat';
      if(r<0.30)return'elite';
      if(r<0.55)return'rest';
      if(r<0.90)return'shop';
      return'question';
    }
    if(floor===6){
      // 第6层：精英50% 市井40% 问号10%
      if(r<0.50)return'elite';
      if(r<0.90)return'rest';
      return'question';
    }
    // 默认
    if(r<0.60)return'combat';
    if(r<0.70)return'elite';
    if(r<0.85)return'rest';
    return'shop';
  },
  _emoji(type){ return{combat:'⚔️',elite:'💀',rest:'🏘️',shop:'🛒',boss:'🐰',question:'❓',start:'🚪'}[type]||'❓'; },
  generateTutorial(){
    // 固定线性教程地图：起点→小怪→问号→篝火→商店→Boss
    const types=['start','combat','question','rest','shop','boss'];
    const emojis=['🚪','⚔️','❓','🏘️','🛒','👑'];
    const nodes=types.map((t,i)=>({id:i,type:t,floor:i,col:2,emoji:emojis[i],done:false}));
    const paths=nodes.slice(0,-1).map((_,i)=>({from:i,to:i+1}));
    const floorNodes=nodes.map(n=>[n.id]);
    return{nodes,paths,floorNodes};
  },
  getReachableNodes(map,currentNodeId){ return map.paths.filter(p=>p.from===currentNodeId).map(p=>p.to); },
  render(container,map,currentNodeId,onNodeClick,act=1){
    container.innerHTML='';
    // 清除上次残留的绘图工具栏
    document.getElementById('map-draw-toolbar')?.remove();
    const W=container.clientWidth||window.innerWidth;
    const viewH=container.clientHeight||(window.innerHeight-50);
    // 每层至少 110px，层数多时地图可垂直滚动
    const MIN_FLOOR_H=110;
    const COLS=5;
    const mapWidth=Math.min(W*0.60, 600);
    const padX=(W-mapWidth)/2;
    const padY=72;
    const totalFloors=map.totalFloors||7;
    const usableW=mapWidth;
    const minMapH=totalFloors*MIN_FLOOR_H+padY*2;
    const H=Math.max(viewH, minMapH); // 地图实际高度，可超出视口
    const usableH=H-padY*2;
    const colW=usableW/(COLS-1);
    const floorH=usableH/totalFloors;
    // 容器：超出时纵向滚动
    container.style.cssText='position:relative;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;';
    // 用一个撑高div让滚动条正确出现
    const _sizer=document.createElement('div');
    _sizer.style.cssText=`position:absolute;left:0;top:0;width:1px;height:${H}px;pointer-events:none;`;
    container.appendChild(_sizer);
    const nodePos={};
    map.nodes.forEach(n=>{
      const s1=Math.imul((n.id*2654435761)>>>0,0x45d9f3b)>>>0;
      const s2=Math.imul((n.id*1234567891)>>>0,0x45d9f3b)>>>0;
      const jx=((s1%1000)/1000-0.5)*colW*0.36;
      const jy=((s2%1000)/1000-0.5)*floorH*0.36;
      const x=Math.max(padX+36,Math.min(W-padX-36, padX+n.col*colW+jx));
      const y=Math.max(padY+36,Math.min(H-padY-36, padY+usableH*(1-n.floor/totalFloors)+jy));
      nodePos[n.id]={x,y};
    });

    // ── SVG 路线 ──
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','map-svg');
    svg.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none;`;
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    // 星空背景粒子（装饰用小圆点）
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
    // 路线发光渐变
    const grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    grad.setAttribute('id','path-grad');grad.setAttribute('x1','0%');grad.setAttribute('y1','100%');grad.setAttribute('x2','0%');grad.setAttribute('y2','0%');
    const pathC1=act===2?'rgba(200,120,30,0.4)':'rgba(74,144,217,0.3)';
    const pathC2=act===2?'rgba(241,180,40,0.9)':'rgba(155,89,182,0.8)';
    const s1e=document.createElementNS('http://www.w3.org/2000/svg','stop');s1e.setAttribute('offset','0%');s1e.setAttribute('stop-color',pathC1);
    const s2e=document.createElementNS('http://www.w3.org/2000/svg','stop');s2e.setAttribute('offset','100%');s2e.setAttribute('stop-color',pathC2);
    grad.appendChild(s1e);grad.appendChild(s2e);defs.appendChild(grad);svg.appendChild(defs);
    // 装饰星点
    for(let i=0;i<40;i++){
      const sx=Math.imul((i*7919+13)>>>0,0x45d9f3b)>>>0;
      const sy=Math.imul((i*6271+17)>>>0,0x45d9f3b)>>>0;
      const px=(sx%1000)/1000*W,py=(sy%1000)/1000*H;
      const r=(Math.imul((i*3571)>>>0,0x45d9f3b)>>>0)%3/2+0.5;
      const op=0.1+((Math.imul((i*2333)>>>0,0x45d9f3b)>>>0)%100)/500;
      const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('cx',px);dot.setAttribute('cy',py);dot.setAttribute('r',r);
      dot.setAttribute('fill',act===2?`rgba(255,210,80,${op.toFixed(2)})`:`rgba(255,255,255,${op.toFixed(2)})`);svg.appendChild(dot);
    }
    const reachable=currentNodeId!=null?new Set(MapGen.getReachableNodes(map,currentNodeId).map(String)):new Set();
    // 玩家实际走过的边（_enterNode 中维护的 travelEdges）
    const travelEdges=new Set((State.run&&State.run.travelEdges)||[]);
    // 绘制路径
    map.paths.forEach(p=>{
      const a=nodePos[p.from],b=nodePos[p.to];if(!a||!b)return;
      // 只有从当前节点出发且目标可达才高亮
      const ir=String(p.from)===String(currentNodeId)&&reachable.has(String(p.to));
      const isDone=travelEdges.has(p.from+'->'+p.to);
      // 贝塞尔控制点：垂直方向各 1/3 处，水平方向加入与节点位置相关的自然偏移
      // 关键改进：控制点 x 坐标向节点本身的 x 方向偏移，使曲线更「流向」节点
      const midX=(a.x+b.x)/2;
      const s=Math.imul(((p.from*31+p.to)*2654435761)>>>0,0x45d9f3b)>>>0;
      const bend=((s%100)/100-0.5)*Math.min(colW*0.5,60);
      const cx1=midX+bend*0.6;
      const cy1=a.y+(b.y-a.y)*0.3;
      const cx2=midX+bend*0.4;
      const cy2=a.y+(b.y-a.y)*0.7;
      const d=`M${a.x.toFixed(1)},${a.y.toFixed(1)} C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
      const line=document.createElementNS('http://www.w3.org/2000/svg','path');
      line.setAttribute('d',d);
      line.setAttribute('fill','none');
      line.setAttribute('stroke-linecap','round');
      if(isDone){
        // 已走过：实线，金色/暖色
        line.setAttribute('stroke', act===2?'rgba(210,130,30,0.85)':'rgba(241,196,15,0.75)');
        line.setAttribute('stroke-width','2.5');
      } else if(ir){
        // 可到达：亮白实线，稍宽
        line.setAttribute('stroke', act===2?'rgba(255,225,130,0.95)':'rgba(255,255,255,0.9)');
        line.setAttribute('stroke-width','2.2');
      } else {
        // 未解锁：极淡虚线
        line.setAttribute('stroke', act===2?'rgba(200,150,60,0.18)':'rgba(255,255,255,0.1)');
        line.setAttribute('stroke-width','1');
        line.setAttribute('stroke-dasharray','4,9');
      }
      svg.appendChild(line);
    });
    container.appendChild(svg);
    // ── 节点 DOM ──
    const typeNames={combat:'战斗',elite:'精英',rest:'市井',shop:'好奇小卖部',boss:act===1?'🐰 兔子':(act===2?'🐆 班布':'👑 波哥'),question:'问号',start:'出发',invoice:'发票'};
    map.nodes.forEach(n=>{
      const pos=nodePos[n.id];
      const el=document.createElement('div');el.className='map-node';
      el.dataset.type=n.type;
      const ir=reachable.has(String(n.id));
      if(n.id===currentNodeId)el.classList.add('current');
      if(n.done)el.classList.add('done');
      if(!ir&&n.id!==currentNodeId&&!n.done)el.classList.add('locked');
      if(ir&&!n.done)el.classList.add('reachable');
      el.style.left=`${pos.x}px`;el.style.top=`${pos.y}px`;
      el.textContent=n.emoji;
      const label=document.createElement('div');
      label.style.cssText=`position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:0.82rem;white-space:nowrap;color:${act===2?'rgba(255,210,100,0.9)':'rgba(255,255,255,0.85)'};pointer-events:none;letter-spacing:0.04em;font-weight:600;`;
      label.textContent=typeNames[n.type]||n.type;
      el.appendChild(label);
      el.title=`${typeNames[n.type]||n.type} · 第 ${n.floor} 层`;

      if(ir&&!n.done&&onNodeClick)el.onclick=()=>onNodeClick(n);
      container.appendChild(el);
    });

    // ── 绘图工具层（笔 + 橡皮）──
    const canvasWrap=document.createElement('div');
    canvasWrap.id='map-draw-layer';
    canvasWrap.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none;z-index:10;`;
    const drawCanvas=document.createElement('canvas');
    drawCanvas.width=W; drawCanvas.height=H;
    drawCanvas.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;touch-action:none;`;
    canvasWrap.appendChild(drawCanvas);
    container.appendChild(canvasWrap);

    // 工具栏固定在视口底部（不随地图滚动）
    const toolbar=document.createElement('div');
    toolbar.id='map-draw-toolbar';
    toolbar.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:200;background:rgba(10,10,26,0.82);border:1px solid rgba(255,255,255,0.14);border-radius:24px;padding:6px 16px;pointer-events:all;backdrop-filter:blur(6px);';
    const mkTb=(text,title)=>{const b=document.createElement('button');b.textContent=text;b.title=title;b.style.cssText='font-family:var(--font);font-size:0.92rem;padding:4px 12px;border-radius:14px;border:1.5px solid rgba(255,255,255,0.22);background:rgba(255,255,255,0.07);color:#e8e8f0;cursor:pointer;transition:all 0.12s;white-space:nowrap;';return b;};
    const penBtn=mkTb('✏️ 画笔','自由画线');
    const eraserBtn=mkTb('🧹 橡皮','擦除');
    const clearBtn=mkTb('🗑️ 清除','清除全部注记');
    toolbar.appendChild(penBtn); toolbar.appendChild(eraserBtn); toolbar.appendChild(clearBtn);
    document.body.appendChild(toolbar); // 挂到body，固定定位不随地图滚动
    // 离开地图屏幕时自动销毁工具栏
    const _tbScreenWatch = ({screen}) => { if(screen !== 'map'){ toolbar.remove(); State.off('screenChange', _tbScreenWatch); } };
    State.on('screenChange', _tbScreenWatch);

    let drawMode=null; // null=关闭 'pen'=画笔 'eraser'=橡皮
    let isDrawing=false,lastX=0,lastY=0;
    const dctx=drawCanvas.getContext('2d');

    // 恢复已保存的绘图
    const run=State.run;
    if(run?.mapDrawingData){
      const img=new Image();img.onload=()=>dctx.drawImage(img,0,0);img.src=run.mapDrawingData;
    }

    const setMode=(mode)=>{
      drawMode=mode;
      canvasWrap.style.pointerEvents=mode?'all':'none';
      drawCanvas.style.cursor=mode==='pen'?'crosshair':mode==='eraser'?'cell':'default';
      penBtn.style.background=mode==='pen'?'rgba(255,255,255,0.22)':'rgba(255,255,255,0.07)';
      penBtn.style.borderColor=mode==='pen'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.22)';
      eraserBtn.style.background=mode==='eraser'?'rgba(255,255,255,0.22)':'rgba(255,255,255,0.07)';
      eraserBtn.style.borderColor=mode==='eraser'?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.22)';
    };

    penBtn.onclick=(e)=>{ e.stopPropagation(); setMode(drawMode==='pen'?null:'pen'); };
    eraserBtn.onclick=(e)=>{ e.stopPropagation(); setMode(drawMode==='eraser'?null:'eraser'); };
    clearBtn.onclick=(e)=>{ e.stopPropagation(); dctx.clearRect(0,0,W,H); if(run) run.mapDrawingData=null; };

    const getPos=(e)=>{
      const rect=drawCanvas.getBoundingClientRect();
      const src=e.touches?.[0]||e;
      return{x:(src.clientX-rect.left)*(W/rect.width),y:(src.clientY-rect.top)*(H/rect.height)};
    };
    const onStart=(e)=>{ if(!drawMode)return; e.stopPropagation(); const p=getPos(e);isDrawing=true;lastX=p.x;lastY=p.y; };
    const onMove=(e)=>{
      if(!isDrawing||!drawMode)return; e.stopPropagation(); e.preventDefault();
      const p=getPos(e);
      dctx.save();
      if(drawMode==='eraser'){ dctx.globalCompositeOperation='destination-out';dctx.strokeStyle='rgba(0,0,0,1)';dctx.lineWidth=20; }
      else { dctx.globalCompositeOperation='source-over';dctx.strokeStyle='rgba(255,220,80,0.8)';dctx.lineWidth=3; }
      dctx.lineCap='round';dctx.lineJoin='round';
      dctx.beginPath();dctx.moveTo(lastX,lastY);dctx.lineTo(p.x,p.y);dctx.stroke();
      dctx.restore();
      lastX=p.x;lastY=p.y;
    };
    const onEnd=()=>{ if(isDrawing&&run) run.mapDrawingData=drawCanvas.toDataURL(); isDrawing=false; };
    drawCanvas.addEventListener('mousedown',onStart);
    drawCanvas.addEventListener('mousemove',onMove);
    drawCanvas.addEventListener('mouseup',onEnd);
    drawCanvas.addEventListener('mouseleave',onEnd);
    drawCanvas.addEventListener('touchstart',onStart,{passive:true});
    drawCanvas.addEventListener('touchmove',onMove,{passive:false});
    drawCanvas.addEventListener('touchend',onEnd);
  }
};

// ── combat.js ─────────────────────────────────────────────────────────────────
const Combat = {
  init(enemyIds){
    const run=State.run,char=run.character;char.block=0;
    const cs={player:{hp:char.hp,maxHp:char.maxHp,block:0,buffs:{...(char.buffs||{})},debuffs:{...(char.debuffs||{})}},enemies:enemyIds.map(id=>Data.makeEnemy(id)),energy:3,maxEnergy:3,hand:[],drawPile:[],discardPile:[],exhaustPile:[],turn:1,phase:'player',pendingReward:false,susuEyemaskUsed:false};
    // 赛车手：初始化档位为2（中立挡）
    if(State.run?.character?.id==='racer'){ cs.gear=2; cs._shiftedUpThisTurn=false; cs._gearLocked=false; cs._fuelSaveActive=false; cs._fuelSaveAllActive=false; cs.speed=0; cs.momentum=0; cs._gearShiftCount={}; }
    // 射手：初始化蓄力系统
    if(State.run?.character?.id==='archer'){ cs.charge=0; cs.chargeMax=5; cs._archerNextAttackDiscount=0; }
    // 拳击手：初始化愤怒系统
    if(State.run?.character?.id==='boxer'){ cs.damageTakenThisEnemyPhase=0; cs.damageTakenLastTurn=0; if(!cs.player.buffs) cs.player.buffs={}; cs.player.buffs.fury=0; }
    // 战士被动「重伤」：攻击敌人施加永久 1 层 wound（每层 +1 伤害）。无初始化字段，
    // wound 直接挂在 enemy.debuffs.wound 上，由 dealDamage 处理
    // ── 升级映射：将 deck 索引升级数据转换为 {cardId: [level, level, ...]} ──
    // 每张牌可能在 deck 中有多份，upgradeMap[cardId] 是一个队列，战斗中抽牌时依次取用
    cs.upgradeMap = {};
    if(run.cardUpgrades){
      run.deck.forEach((cardId, deckIdx) => {
        const lvl = run.cardUpgrades[deckIdx] || 0;
        if(lvl > 0){
          if(!cs.upgradeMap[cardId]) cs.upgradeMap[cardId] = [];
          cs.upgradeMap[cardId].push(lvl);
        }
      });
    }
    // handUpgrades：手牌索引 → 升级等级（每次重新发牌时重建）
    cs.handUpgrades = {};
    cs.drawPile=[...run.deck].sort(()=>Math.random()-0.5);
    cs.enemies.forEach(e=>{const r=Data.enemies[e.id].getIntent(e);e.currentIntent=Array.isArray(r)?r:[r];});
    // 橄榄球遗物：第一回合+1能量
    if(run.relics && run.relics.includes('football')){
      cs.energy = cs.energy + 1;
    }
    // 高山的雪镜：每回合开始获得 1 点额外能量（确保第一回合生效）
    if(run.relics && run.relics.includes('gaoshan_sunglasses')){
      cs.energy = cs.energy + 1;
    }
    // 大头的墨镜：战斗第一回合 +1 能量 + 额外抽2张
    const _hasSunglasses = run.relics && run.relics.includes('datou_sunglasses');
    if(_hasSunglasses){ cs.energy = cs.energy + 1; }
    run.combat=cs;    Combat.drawCards(cs, (run.character.id==='archer' ? 6 : 5) + (_hasSunglasses ? 2 : 0));
    if(_hasSunglasses){
      setTimeout(()=>{
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:42%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1.05rem;font-weight:900;padding:10px 22px;border-radius:12px;border:2px solid #f5c518;z-index:9999;pointer-events:none;box-shadow:0 0 14px rgba(245,197,24,0.45)';
        tip.textContent='🕶️ 大头的墨镜！+2 抽牌，+1 能量';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),1600);
      }, 400);
    }
    // 高山的冲锋衣：战斗开始时重置翻倍标记（新效果：第一次获得格挡时翻倍）
    cs._jacketUsed = false;
    // 刘行的头巾：每场战斗重置触发标记
    cs._liuxingTriggered = false;
    cs._liuxingPendingEnergy = 0;
    // 王微的手绳：第一回合也触发（后续回合在 endTurn 中触发）
    if(run.relics?.includes('wangwei_bracelet')){
      cs.player.block = (cs.player.block||0) + 3;
      setTimeout(()=>{
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:42%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#7dccff;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #7dccff;z-index:9999;pointer-events:none;';
        tip.textContent='📿 手绳触发！获得 3 点格挡！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),1200);
      }, 600);
    }
    // 高山的麻花辫：战斗开始时随机回复 3~8 点 HP
    if(run.relics?.includes('gaoshan_braid')){
      const heal = 3 + Math.floor(Math.random() * 6);
      cs.player.hp = Math.min(cs.player.hp + heal, cs.player.maxHp);
      run.character.hp = cs.player.hp;
      setTimeout(()=>{
        const tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(20,80,40,0.95);color:#7fff7f;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #7fff7f;z-index:9999;pointer-events:none;text-shadow:0 0 8px rgba(127,255,127,0.7)';
        tip.textContent = `💇 高山的麻花辫！回复 ${heal} 点 HP`;
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(), 1800);
      }, 300);
    }    // 王微的乐观：战斗开始时随机回复1~5点HP
    if(run.relics?.includes('wangwei_optimism')){
      const heal=1+Math.floor(Math.random()*10);
      cs.player.hp=Math.min(cs.player.hp+heal,cs.player.maxHp);
      run.character.hp=cs.player.hp;
      setTimeout(()=>{
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(20,80,40,0.95);color:#7fff7f;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #7fff7f;z-index:9999;pointer-events:none;text-shadow:0 0 8px rgba(127,255,127,0.7)';
        tip.textContent=`🌟 王微的乐观！回复 ${heal} 点 HP`;
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),1800);
      },300);
    }
    // 放大镜：战斗开始时随机1张手牌费用厘0（本场战斗有效，打出后失效）
    // 用手牌位置索引追踪，避免同名牌全部0费
    if(run.relics?.includes('magnifier') && cs.hand.length>0){
      // 固定锁定第0张（最左边），不随机
      cs.magnifierHandIndex = 0;
      cs.magnifierActive = true;
      cs.magnifierUsedThisBattle = false;
      // 延迟触发动画（等待手牌渲染完成）
      setTimeout(()=>UI._showMagnifierAnim(cs.magnifierHandIndex), 200);
    }
  },
  drawCards(cs,n){
    setTimeout(()=>Audio.playCardDraw(),0);
    const hasSpanishBook = State.run?.relics?.includes('datou_spanish_book');
    for(let i=0;i<n;i++){
      if(cs.drawPile.length===0){if(cs.discardPile.length===0)break;cs.drawPile=[...cs.discardPile].sort(()=>Math.random()-0.5);cs.discardPile=[];}
      const drawnCard=cs.drawPile.shift();
      cs.hand.push(drawnCard);
      // 追踪升级等级：从 upgradeMap 队列中取出一个等级分配给这张手牌
      if(cs.upgradeMap && cs.upgradeMap[drawnCard] && cs.upgradeMap[drawnCard].length > 0){
        const lvl = cs.upgradeMap[drawnCard].shift();
        cs.handUpgrades[cs.hand.length - 1] = lvl;
        // 用完后如果队列为空则删除
        if(cs.upgradeMap[drawnCard].length === 0) delete cs.upgradeMap[drawnCard];
      }
      if(cs.handTokens){ cs.handTokens.push((cs.hand.length-1)+'_'+Math.random().toString(36).slice(2)); }
    }
  },
  playCard(cardId,targetEnemyIndex,handIndexOverride){
    const cs=State.run.combat;if(cs.phase!=='player')return false;
    // 优先使用调用方传入的精确索引（闭包捕获），避免同名牌时 indexOf 返回错误位置
    const handIndex=(handIndexOverride!==undefined&&handIndexOverride>=0&&handIndexOverride<cs.hand.length&&cs.hand[handIndexOverride]===cardId)?handIndexOverride:cs.hand.indexOf(cardId);if(handIndex===-1)return false;
    const def=Data.cards[cardId];if(!def)return false;
    // 放大镜：用手牌位置索引精确匹配唯一那张牌
    const isMagnifierCard = cs.magnifierActive && cs.magnifierHandIndex === handIndex;
    // 醪糟水：本回合手牌费用随机化（用并行数组索引）
    const isLaozaoCard = cs.laozaoActive && Array.isArray(cs.laozaoCostsArr) && handIndex < cs.laozaoCostsArr.length;
    // 升级后的费用（从 handUpgrades 读取升级等级，再查 Data.upgrades 获取费用）
    const _playCardLv = cs.handUpgrades ? (cs.handUpgrades[handIndex] || 0) : 0;
    let _baseCost = def.cost;
    if(_playCardLv > 0){
      const _upgCostDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][_playCardLv];
      if(_upgCostDef && _upgCostDef.cost !== undefined) _baseCost = _upgCostDef.cost;
    }
    let effectiveCost = isMagnifierCard ? 0 : (isLaozaoCard ? cs.laozaoCostsArr[handIndex] : _baseCost);
    // 赛车手超车外线：3挡时免费
    if(cardId==='overtake' && (cs.gear||2)>=3) effectiveCost=0;
    // 赛车手节油行驶：本回合技能牌费用-1（最低0）；+2升级时所有牌费用-1
    if(cs._fuelSaveAllActive && effectiveCost>0) effectiveCost=Math.max(0,effectiveCost-1);
    else if(cs._fuelSaveActive && def.type==='skill' && effectiveCost>0) effectiveCost=Math.max(0,effectiveCost-1);
    if(cs.energy<effectiveCost)return false;
    if(def.needsTarget){const t=cs.enemies[targetEnemyIndex];if(t===undefined||t.hp<=0)return false;}
    cs.energy-=effectiveCost;
    if(isMagnifierCard){
      // 打出放大镜牌：立即完全清除，不转移高亮
      cs.magnifierActive=false;
      cs.magnifierHandIndex=-1;
      cs.magnifierUsedThisBattle=true;
    } else if(cs.magnifierActive && cs.magnifierHandIndex > handIndex){
      // 打出放大镜牌之前的牌：索引-1，始终指向同一张牌
      cs.magnifierHandIndex--;
    }
    // 注意：打出放大镜牌之后的牌不影响索引
    cs.hand.splice(handIndex,1);
    // 醪糟水：同步移除该索引的随机费用，保持数组与手牌对齐
    if(Array.isArray(cs.laozaoCostsArr)) cs.laozaoCostsArr.splice(handIndex,1);
    // 获取当前打出牌的升级等级（从 handUpgrades 读取，并更新后续牌的索引）
    const _upgradeLevel = cs.handUpgrades ? (cs.handUpgrades[handIndex] || 0) : 0;
    // 打出牌后，handUpgrades 中 handIndex 之后的所有索引需要 -1
    if(cs.handUpgrades){
      const newHandUpgrades = {};
      Object.keys(cs.handUpgrades).forEach(k => {
        const ki = parseInt(k);
        if(ki < handIndex) newHandUpgrades[ki] = cs.handUpgrades[ki];
        else if(ki > handIndex) newHandUpgrades[ki - 1] = cs.handUpgrades[ki];
        // ki === handIndex 的牌已打出，不保留
      });
      cs.handUpgrades = newHandUpgrades;
    }
    // 赛车手超车外线：3挡时免费（已在费用计算前处理，此处无需额外处理）
    def.effect(cs, targetEnemyIndex, _upgradeLevel);
    // 射手：打出消耗蓄力的牌后，重渲染手牌更新实时伤害数值
    if(State.run?.character?.id === 'archer' && typeof UI !== 'undefined' && UI._renderHand){
      setTimeout(()=>{ const _cs2=State.run?.combat; if(_cs2 && _cs2.phase==='player') UI._renderHand(_cs2); }, 50);
    }
    // 拳击手：每次打牌后愤怒/血量可能变化，重渲染手牌刷新所有动态数字
    if(State.run?.character?.id === 'boxer' && typeof UI !== 'undefined' && UI._renderHand){
      setTimeout(()=>{ const _cs2=State.run?.combat; if(_cs2 && _cs2.phase==='player') UI._renderHand(_cs2); }, 50);
    }
    if(def.type!=='power')cs.discardPile.push(cardId);
    // 记录能力牌的升级等级（用于遗物联动）
    if(def.type==='power' && _upgradeLevel > 0){
      if(!cs.powerUpgrades) cs.powerUpgrades = {};
      cs.powerUpgrades[cardId] = Math.max(cs.powerUpgrades[cardId] || 0, _upgradeLevel);
    }
    // 大头的哨子：记录本回合是否打出过防御牌（type==='skill'）
    if(def.type==='skill'){ cs.defensePlayedThisTurn = true; }
    // 战士「紧逼」用：记录本回合打出过的攻击牌数（在 effect 之后增加，避免自身计入）
    if(def.type==='attack'){ cs._attacksPlayedThisTurn = (cs._attacksPlayedThisTurn||0) + 1; }
    // 大头的鼓棒：打出攻击牌时，20% 概率额外再释放一次相同效果
    if(def.type==='attack' && State.run?.relics?.includes('datou_drumstick') && !cs._whistleProc && Math.random()<0.10){
      cs._whistleProc = true; // 防止额外释放再次触发（避免无限循环）
      const tip = document.createElement('div');
      tip.style.cssText = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #f5c518;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(245,197,24,0.5)';
      tip.textContent = '🥁 鼓棒触发！攻击额外释放！';
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(), 1200);
      def.effect(cs, targetEnemyIndex); // 额外再执行一次效果
      cs._whistleProc = false;
      // 鼓棒额外攻击后立即检查胜利，避免死亡敌人继续参与后续逻辑
      cs.enemies.forEach(e=>{if(e.hp<=0&&!e._dead){e._dead=true;e.hp=0;}});
      if(cs.enemies.every(e=>e._dead)){cs.phase='victory';Combat._onVictory();return true;}
    }
    cs.enemies.forEach(e=>{if(e.hp<=0&&!e._dead){e._dead=true;e.hp=0;}});
    if(cs.enemies.every(e=>e._dead)){cs.phase='victory';Combat._onVictory();}
    return true;
  },
  // 判断一个行动是否属于防御型（格挡/不包含攻击）
  _isDefenseAction(enemyId, actionName){
    // 各怪物的防御行动名称
    const defenseActions = {
      louse:    ['curl'],
      jawworm:  ['bellow'],  // bellow有格挡也有buff，归为防御
      guardian: ['defense'],
    };
    return (defenseActions[enemyId]||[]).includes(actionName);
  },
  endTurn(){
    const cs=State.run.combat;if(cs.phase!=='player')return;cs.phase='enemy';
    // ── 拳击手愤怒：回合结束时清零（新值在敌方行动后写入）──
    if(State.run?.character?.id==='boxer'){
      cs.damageTakenLastTurn=cs.damageTakenThisEnemyPhase||0;
      cs.damageTakenThisEnemyPhase=0;
      if(cs.player.buffs) cs.player.buffs.fury=0;
    }
    // ── 手牌惩罚牌：回合结束时检查手牌中的负面牌 ──
    const HAND_PENALTY = { poison_card:3, bleed_card:4 };
    let penaltyTotal = 0;
    const penaltyCards = [];
    cs.hand.forEach(cid=>{ if(HAND_PENALTY[cid]){ penaltyTotal+=HAND_PENALTY[cid]; penaltyCards.push(cid); } });
    if(penaltyTotal>0){
      cs.player.hp = Math.max(0, cs.player.hp - penaltyTotal);
      State.run.character.hp = cs.player.hp;
      const names = penaltyCards.map(c=>Data.cards[c]?.name||c).join('、');
      const tip=document.createElement('div');
      tip.style.cssText='position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);background:rgba(60,0,0,0.95);color:#ff6060;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #ff4040;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(255,64,64,0.5)';
      tip.textContent=`手牌惩罚！${names} 未打出，扣去 ${penaltyTotal} 点 HP！`;
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(),1800);
    }
    cs.discardPile.push(...cs.hand);cs.hand=[];
    // 放大镜：回合结束时失效（若未打出则本回合结束）
    if(cs.magnifierActive){ cs.magnifierActive=false; cs.magnifierHandIndex=-1; }
    // 醒糟水：回合结束时清除费用随机化效果
    if(cs.laozaoActive){ cs.laozaoActive=false; cs.laozaoCostsArr=null; cs.laozaoCosts=null; }
    // 大头的西班牙语书：回合结束时，若本回合对敌人造成过伤害，回复 2 点 HP
    if(State.run?.relics?.includes('datou_spanish_book') && cs.dealtDamageThisTurn){
      const healAmt = 2;
      cs.player.hp = Math.min(cs.player.hp + healAmt, cs.player.maxHp);
      State.run.character.hp = cs.player.hp;
      const tip = document.createElement('div');
      tip.style.cssText = 'position:fixed;top:35%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#7dff7d;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #7dff7d;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(125,255,125,0.4)';
      tip.textContent = '📖 西班牙语书触发！回复 2 点 HP！';
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(), 1500);
    }
    // 重置伤害记录
    cs.dealtDamageThisTurn = false;
    // 大头的哨子：回合结束时，若本回合未打出过防御牌，获得 10 点格挡
    if(State.run?.relics?.includes('datou_whistle') && !cs.defensePlayedThisTurn){
      Combat.gainBlock(cs, 10);
      const tip = document.createElement('div');
      tip.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #f5c518;z-index:9999;pointer-events:none;box-shadow:0 0 20px rgba(245,197,24,0.5)';
      tip.textContent = '🎺 哨子触发！获得 10 点格挡！';
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(), 1500);
    }
    // 重置防御牌记录
    cs.defensePlayedThisTurn = false;
    // 重置战士「紧逼」攻击计数
    cs._attacksPlayedThisTurn = 0;
    // 重置战士「硬抗」本回合减伤（buff 只持续到本回合结束）
    if(cs.player.buffs) cs.player.buffs.gritReduce = 0;
    // ── 战士金属化：回合结束时获得 N 格挡 ──
    if((cs.player.buffs?.metallicize||0)>0){
      Combat.gainBlock(cs, cs.player.buffs.metallicize, true);
    }
    Combat._tickDebuffs(cs.player);
    // 清零上一回合残留的格挡
    cs.enemies.forEach(e=>{ if(!e._dead) e.block=0; });
    // 钉鞋：5%概率跳过怪物攻击回合
    const hasSpikeShoes=State.run?.relics?.includes('spike_shoes');
    if(hasSpikeShoes&&Math.random()<0.05){
      const tip=document.createElement('div');
      tip.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,80,0.95);color:#f1c40f;font-size:1.4rem;font-weight:900;padding:14px 32px;border-radius:16px;border:2px solid #f1c40f;z-index:9999;pointer-events:none;text-shadow:0 0 10px rgba(241,196,15,0.7);box-shadow:0 0 24px rgba(241,196,15,0.4)';
      tip.textContent='👟 钉鞋触发！跳过怪物回合！';
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(),1500);
    } else {
    // 怪物执行行动：攻击/buff行动在此执行（对玩家造成伤害）
    cs.enemies.forEach((e,i)=>{
      if(!e._dead){
        // 冻结：跳过本回合行动，不推进 actionIndex
        if((e.debuffs.freeze||0)>0){
          e.debuffs.freeze=Math.max(0,e.debuffs.freeze-1);
        } else {
          const actionName = e.actions[e.actionIndex % e.actions.length];
          if(!Combat._isDefenseAction(e.id, actionName)){
            Data.enemies[e.id].doAction(cs,i);
          }
        }
        // 燃烧：造成等于层数的伤害后层数 -1
        const burnStacks = e.debuffs.burn||0;
        if(burnStacks>0){
          e.hp=Math.max(0,e.hp-burnStacks);
          e.debuffs.burn=burnStacks-1;
          if(e.hp<=0) e._dead=true;
        }
        Combat._tickDebuffs(e);
      }
    });
    } // end spike_shoes else
    // 拳击手愤怒计算：本轮原始来袭伤害÷3（无上限），下回合作为攻击加成
    if(State.run?.character?.id==='boxer'){
      const rawFury=Math.floor((cs.damageTakenThisEnemyPhase||0)/3);
      if(!cs.player.buffs) cs.player.buffs={};
      cs.player.buffs.fury=rawFury>0?rawFury:0;
    }
    if(cs.player.hp<=0){
      const run2=State.run;
      // susu的怀表：5% 概率满血复活并秒杀非Boss房全场敌人（每场冒险仅一次）
      if(run2.relics?.includes('susu_pocketwatch') && !run2.pocketwatchUsed && Math.random() < 0.05){
        run2.pocketwatchUsed = true;
        cs.player.hp = run2.character.maxHp;
        run2.character.hp = run2.character.maxHp;
        cs.player.block = 0;
        const _curNode = run2.map?.nodes?.find(n => n.id === run2.currentNodeId);
        const _isBoss = _curNode && _curNode.type === 'boss';
        if(!_isBoss){
          cs.enemies.forEach(e => { if(e.hp > 0){ e.hp = 0; e._dead = true; } });
          UI._triggerPocketWatch(_isBoss, ()=>{ try{ Combat._onVictory(); }catch(e){} });
        } else {
          UI._triggerPocketWatch(_isBoss);
        }
        return;
      }
      // 护身符：第一次被致死时以 50% 最大HP存活
      if(run2.relics?.includes('amulet')&&!run2.amuletUsed){
        const amuletHp = Math.max(1, Math.floor(run2.character.maxHp * 0.5));
        cs.player.hp=amuletHp; run2.character.hp=amuletHp; run2.amuletUsed=true;
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,20,60,0.95);color:#a8d8ff;font-size:1.4rem;font-weight:900;padding:14px 32px;border-radius:16px;border:2px solid #60a8ff;z-index:9999;pointer-events:none;text-shadow:0 0 10px rgba(96,168,255,0.9);box-shadow:0 0 28px rgba(96,168,255,0.5),0 0 60px rgba(96,168,255,0.2)';
        tip.textContent='🔮 水晶球触发！命运庇护，以半血存活！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),2000);
      } else {
        cs.player.hp=0;cs.phase='dead';Combat._onDeath();return;
      }
    }
    cs.turn++;cs.phase='player';cs.energy=cs.maxEnergy;
    // 武装：下回合 +N 能量
    if((cs._extraEnergyNextTurn||0)>0){
      cs.energy+=cs._extraEnergyNextTurn;
      const _aTip=document.createElement('div');_aTip.style.cssText='position:fixed;top:46%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #f5c518;z-index:9999;pointer-events:none;';_aTip.textContent=`⚒ 武装：+${cs._extraEnergyNextTurn} 能量！`;document.body.appendChild(_aTip);setTimeout(()=>_aTip.remove(),1200);
      cs._extraEnergyNextTurn=0;
    }
    // 刘行的头巾：上一回合触发后，本回合+1能量
    if((cs._liuxingPendingEnergy||0)>0){ cs.energy+=cs._liuxingPendingEnergy; cs._liuxingPendingEnergy=0;
      const _leTip=document.createElement('div');_leTip.style.cssText='position:fixed;top:44%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #f5c518;z-index:9999;pointer-events:none;';_leTip.textContent='🧣 头巾能量！本回合+1能量！';document.body.appendChild(_leTip);setTimeout(()=>_leTip.remove(),1200);
    }
    // 王微的手绳：回合开始时，先将格挡截断为最多3点（携带上限），再加3，静默触发
    if(State.run?.relics?.includes('wangwei_bracelet')){
      cs.player.block = Math.min(cs.player.block||0, 3) + 3;

    } else {
      cs.player.block=0;
    }
    cs._speedDrawnThisTurn = false; // 速度感升挡抽牌回合级标记重置
    // ── 赛车手档位系统回合重置 ──
    if(State.run?.character?.id==='racer'){
      // 速度感积累：1挡+3，2挡+6，3挡+9
      const gearSpeedGain=[0,3,6,9];
      const _prevSpeed = cs.speed||0;
      cs.speed=(cs.speed||0)+gearSpeedGain[cs.gear||2];
      const _newSpeed = cs.speed;
      // 速度感分段解锁：检查是否突破阈值并触发解锁动画
      const _speedThresholds = [
        {val:20, name:'稳定行驶', desc:'每回合开始自动获得 1 点格挡', color:'#a8e6ff', icon:'🛡'},
        {val:40, name:'加速中',   desc:'攻击牌伤害 +2',               color:'#f9ca24', icon:'⚡'},
        {val:60, name:'高速行驶', desc:'每次升挡额外抽 1 张牌（每回合限1次）', color:'#ff9f43', icon:'🏎️'},
        {val:80, name:'极速状态', desc:'攻击牌伤害提升至 +5（叠加）',  color:'#ff6b6b', icon:'🔥'},
      ];
      _speedThresholds.forEach(t=>{
        if(_prevSpeed < t.val && _newSpeed >= t.val){
          // 解锁动画
          setTimeout(()=>{
            const overlay = document.createElement('div');
            overlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998;`;
            overlay.innerHTML = `<div style="position:absolute;top:28%;left:50%;transform:translate(-50%,-50%);
              background:linear-gradient(135deg,rgba(20,20,40,0.97),rgba(40,20,60,0.97));
              border:2px solid ${t.color};border-radius:18px;padding:18px 36px;text-align:center;
              box-shadow:0 0 32px ${t.color}66,0 0 8px ${t.color}33;
              animation:speedUnlockPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;">
              <div style="font-size:2rem;margin-bottom:4px">${t.icon}</div>
              <div style="color:${t.color};font-size:1.3rem;font-weight:900;letter-spacing:1px;text-shadow:0 0 12px ${t.color}">速度感解锁！</div>
              <div style="color:#fff;font-size:1.1rem;font-weight:800;margin:4px 0">${t.name}</div>
              <div style="color:rgba(255,255,255,0.75);font-size:0.9rem">${t.desc}</div>
              <div style="color:${t.color};font-size:0.8rem;margin-top:6px;opacity:0.8">⚡ 速度感 ${_newSpeed}</div>
            </div>`;
            if(!document.getElementById('speedUnlockStyle')){
              const s=document.createElement('style');s.id='speedUnlockStyle';
              s.textContent='@keyframes speedUnlockPop{from{opacity:0;transform:translate(-50%,-50%) scale(0.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}';
              document.head.appendChild(s);
            }
            document.body.appendChild(overlay);
            setTimeout(()=>{overlay.style.transition='opacity 0.5s';overlay.style.opacity='0';setTimeout(()=>overlay.remove(),500);},2200);
          },100);
        }
      });
      // 速度感激活：每回合开始额外+速度感（上限80）; +1/+2升级后+10
      if((cs.player.buffs.speed_activate||0)>0){ const _saLv=Combat._getCardUpgradeLevel(cs,'speed_activate'); const _saAmt=_saLv>=1?10:8; cs.speed=Math.min((cs.speed||0)+_saAmt,80); }
      // 速度感>=20：每回合开始自动获得1点格挡
      if(_newSpeed >= 20){ cs.player.block=(cs.player.block||0)+1; }
      // 赛车直觉：动量可用作额外费用（下回合开始时添加到能量）
      if((cs.momentum||0)>0){
        cs.energy=Math.min(cs.energy+(cs.momentum||0), cs.maxEnergy+2);
        cs.momentum=0;
      }
      // 红线突破：3挡时每回合开始抽1张牌（+1升级后额外+1能量，+2升级后抽2张牌）
      if((cs.player.buffs.redline||0)>0 && cs.gear>=3){
        const _redlineLv = Combat._getCardUpgradeLevel(cs, 'redline');
        const drawCount = _redlineLv >= 2 ? 2 : 1;
        Combat.drawCards(cs, drawCount);
        if(_redlineLv >= 1){ cs.energy = Math.min(cs.energy + 1, cs.maxEnergy + 2); }
      }
      // 节油行驶：回合结束时重置技能费用减免
      cs._fuelSaveActive=false;
      cs._fuelSaveAllActive=false;
      // 重置升挡标记
      cs._shiftedUpThisTurn=false;
      // 重置 race_instinct 首次升挡标记
      cs._raceInstinctDrawnThisTurn = false;
      // 重置档位锁定
      cs._gearLocked=false;
      // 重置 anti_skid 首次降挡标记
      cs._antiSkidDrawnThisTurn = false;
      // 重置换挡时机使用次数
      cs._gearShiftCount={};
    }
    // 高山的雪镜：每回合开始 35% 概率获得 1 点额外能量
    if(State.run?.relics?.includes('gaoshan_sunglasses') && Math.random()<0.35){
      cs.energy += 1;
      const _snowTip=document.createElement('div');_snowTip.style.cssText='position:fixed;top:46%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#a8e6ff;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #a8e6ff;z-index:9999;pointer-events:none;';_snowTip.textContent='🥽 雪镜触发！+1 能量！';document.body.appendChild(_snowTip);setTimeout(()=>_snowTip.remove(),1200);
    }
    // ── 射手蓄力系统回合开始处理 ──
    if(State.run?.character?.id==='archer'){
      // 猜手直觉：每 2 回合开始获得 1 点蓄力（削弱）
      if((cs.player.buffs.archer_instinct||0)>0){
        cs._instinctCounter=(cs._instinctCounter||0)+1;
        if(cs._instinctCounter%2===0) Combat.archerGainCharge(cs,1);
      }
      // 蓄力爆发：每回合开始若蓄力≥阈值，+1能量; +1/+2升级后阈值降为2
      if((cs.player.buffs.ar_threshold||0)>0){ const _atLv=Combat._getCardUpgradeLevel(cs,'ar_threshold'); const _atThreshold=_atLv>=1?2:4; if((cs.charge||0)>=_atThreshold){ cs.energy+=1; } }
      // 重置攻击牌费用折扣
      cs._archerNextAttackDiscount=0;
    }
    // ── 拳击手回合开始处理 ──
    let bloodlustExtraDraw = 0;
    if(State.run?.character?.id==='boxer'){
      // 嗜血本能：HP低于一半时+1能量；Lv2 额外抽1张
      if((cs.player.buffs?.box_bloodlust||0)>0 && cs.player.hp < cs.player.maxHp/2){
        cs.energy+=1;
        if(Combat._getCardUpgradeLevel(cs,'box_bloodlust')>=2) bloodlustExtraDraw=1;
      }
    }
    // ── 战士能力回合开始处理 ──
    let bruteExtraDraw = 0;
    if(State.run?.character?.id==='brute'){
      // 恶魔形态：每回合开始 +N 力量
      const df=cs.player.buffs?.demon_form||0;
      if(df>0) Combat.applyBuff(cs.player,'strength',df);
      // 凶残：每回合开始失去 1 HP，但 +1 抽牌
      if((cs.player.buffs?.brutal||0)>0){
        cs.player.hp=Math.max(1, cs.player.hp-1);
        State.run.character.hp=cs.player.hp;
        bruteExtraDraw=1;
      }
    }
    // 小九的六弦琴：每回合额外多抄 1 张牌
    const guitarDraw = (State.run.relics && State.run.relics.includes('xiaojiu_guitar')) ? 1 : 0;
    const baseDrawCount = State.run.character.id==='archer' ? 6 : 5;
    Combat.drawCards(cs, baseDrawCount + guitarDraw + bloodlustExtraDraw + (bruteExtraDraw||0));
    State.run.character.hp=cs.player.hp;
    // 玩家回合开始时，怪物执行防御行动（格挡即时生效，玩家当回合可打破）
    cs.enemies.forEach((e,i)=>{
      if(!e._dead){
        const actionName = e.actions[e.actionIndex % e.actions.length];
        if(Combat._isDefenseAction(e.id, actionName)){
          Data.enemies[e.id].doAction(cs,i);
        }
        // 更新意图（展示下一回合的行动预告）
        const _r=Data.enemies[e.id].getIntent(e);
        e.currentIntent=Array.isArray(_r)?_r:[_r];
      }
    });
  },
  dealDamage(cs,targetIndex,amount){ const enemy=cs.enemies[targetIndex];if(!enemy||enemy._dead)return 0;
    // 战士被动「重伤」：每层 wound +1 伤害
    const _bruteBonus = (State.run?.character?.id==='brute') ? (enemy.debuffs?.wound||0) : 0;
    let dmg=amount+(cs.player.buffs.strength||0)+_bruteBonus;
    // 速度感攻击加成：30-59=+2，>=60=+5
    if(State.run?.character?.id==='racer'){ const _spd=cs.speed||0; if(_spd>=60) dmg+=5; else if(_spd>=30) dmg+=2; } if((enemy.debuffs.vulnerable||0)>0)dmg=Math.floor(dmg*1.5); if((cs.player.debuffs.weak||0)>0)dmg=Math.floor(dmg*0.75); if((cs.player.debuffs.slow||0)>0)dmg=Math.floor(dmg*0.70); const absorbed=Math.min(enemy.block,dmg);enemy.block=Math.max(0,enemy.block-absorbed);const actualDmg=dmg-absorbed;enemy.hp-=actualDmg;
    // 大头的西班牙语书：记录本回合是否对敌人造成过实际伤害
    if(actualDmg > 0) cs.dealtDamageThisTurn = true;
    // 战士被动「重伤」：对该敌人造成伤害后施加 1 层 wound（永久叠加）
    if(State.run?.character?.id==='brute' && dmg>0 && !enemy._dead){
      if(!enemy.debuffs) enemy.debuffs={};
      enemy.debuffs.wound = (enemy.debuffs.wound||0) + 1;
    }
    // 死亡判定：HP≤0 立即标记死亡并归零（修复柠檬水等绕过 playCard 的伤害源）
    if(enemy.hp<=0 && !enemy._dead){ enemy._dead=true; enemy.hp=0; }
    return actualDmg; },
  enemyAttack(cs,enemyIndex,amount){ const enemy=cs.enemies[enemyIndex];if(!enemy||enemy._dead)return 0; let dmg=amount+(enemy.buffs.strength||0); if((enemy.debuffs.weak||0)>0)dmg=Math.floor(dmg*0.75); if((enemy.debuffs.slow||0)>0)dmg=Math.floor(dmg*0.70); if((cs.player.debuffs.vulnerable||0)>0)dmg=Math.floor(dmg*1.5);
    // 拳击手「铁下巴」：所有受到的伤害 -1（最低 0）
    if((cs.player.buffs?.box_iron_chin||0)>0){ dmg=Math.max(0, dmg - cs.player.buffs.box_iron_chin); }
    // 战士「硬抗」：本回合受到的所有伤害额外 -N（最低 0）
    if((cs.player.buffs?.gritReduce||0)>0){ dmg=Math.max(0, dmg - cs.player.buffs.gritReduce); }
    // 王微的眼镜：20%概率完全无视本次伤害（多段攻击中触发后，本轮后续攻击也全部跳过）
    const run=State.run;
    if(run?.relics?.includes('wangwei_glasses') && Math.random()<0.20){
      const reduction=Math.min(dmg,15);
      dmg=Math.max(0,dmg-reduction);
      setTimeout(()=>{
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,80,0.95);color:#a8d8ff;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #60a8ff;z-index:9999;pointer-events:none;text-shadow:0 0 8px rgba(96,168,255,0.8)';
        tip.textContent=`👓 王微的眼镜！减少 ${reduction} 点伤害！`;
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),1800);
      },50);
    }
    // 拳击手愤怒累计：基于原始来袭伤害（含被格挡部分），不受血量是否被扣影响
    if(dmg>0 && State.run?.character?.id==='boxer') cs.damageTakenThisEnemyPhase=(cs.damageTakenThisEnemyPhase||0)+dmg;
    const absorbed=Math.min(cs.player.block,dmg);cs.player.block=Math.max(0,cs.player.block-absorbed);const actualPlayerDmg=dmg-absorbed;cs.player.hp-=actualPlayerDmg;
    if(actualPlayerDmg>0){
      // 超载：受到伤害时额外获得格挡（每层+1，最多3层）
      const overloadStacks=cs.player.buffs?.overload||0;
      if(overloadStacks>0){ cs.player.block=(cs.player.block||0)+overloadStacks; }
      setTimeout(()=>Audio.playHurt(),50);
      cs._tookDamageThisCombat=true;
      // 累计本回合实际扣血，用于 endTurn 末尾统一飘字
      cs._turnHpLost = (cs._turnHpLost||0) + actualPlayerDmg;
      // 文豪的羽毛：生命首次低于最大生命值50%时立刻回满（全局仅一次，一击致死不触发）
      if(run?.relics?.includes('wenhao_feather') && !run._featherUsed &&
         cs.player.hp > 0 && cs.player.hp < cs.player.maxHp * 0.5){
        run._featherUsed = true;
        const featherHeal = Math.floor(cs.player.maxHp * 0.4);
        cs.player.hp = Math.min(cs.player.maxHp, cs.player.hp + featherHeal);
        run.character.hp = cs.player.hp;
        setTimeout(()=>{
          const tip=document.createElement('div');
          tip.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(10,30,10,0.95);color:#a0ffb0;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #50e070;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(80,224,112,0.6)';
          tip.textContent=`🪶 文豪的羽毛！回复 ${featherHeal} 点生命！`;
          document.body.appendChild(tip);
          setTimeout(()=>tip.remove(),2200);
        },80);
      }
    }
    return actualPlayerDmg; },
  // 统一的格挡获取函数，处理冲锋衣翻倍
  // fromPlayer=true 表示来源为玩家打牌或使用药水（可触发冲锋衣翻倍）
  // fromPlayer=false 表示来源为遗物自动触发（不触发冲锋衣）
  gainBlock(cs, amount, fromPlayer=false){
    const run = State.run;
    let finalAmount = amount;
    // 高山的冲锋衣：每场战斗中，第一次由玩家打牌/药水获得的格挡翻倍
    if(fromPlayer && run?.relics?.includes('gaoshan_jacket') && !cs._jacketUsed){
      cs._jacketUsed = true;
      finalAmount = amount * 2;
      const tip = document.createElement('div');
      tip.style.cssText = 'position:fixed;top:45%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#7dccff;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #7dccff;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(125,204,255,0.4)';
      tip.textContent = `🧥 冲锋衣触发！格挡 ${amount} → ${finalAmount}！`;
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(), 1500);
    }
    const _prevBlock = cs.player.block||0;
    cs.player.block = _prevBlock + finalAmount;
    // 刘行的头巾：首次格挡达到15触发，下回合+1能量
    if(run?.relics?.includes('liuxing_headband') && !cs._liuxingTriggered && _prevBlock < 15 && cs.player.block >= 15){
      cs._liuxingTriggered = true;
      cs._liuxingPendingEnergy = (cs._liuxingPendingEnergy||0) + 1;
      const _lTip=document.createElement('div');
      _lTip.style.cssText='position:fixed;top:44%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #f5c518;z-index:9999;pointer-events:none;';
      _lTip.textContent='🧣 刘行的头巾触发！下回合+1能量！';
      document.body.appendChild(_lTip);
      setTimeout(()=>_lTip.remove(),1400);
    }
    // 战士「压路机」：玩家获得格挡时，对随机存活敌人造成伤害
    if(fromPlayer && (cs.player.buffs?.juggernaut||0)>0 && !cs._juggernautInProgress){
      cs._juggernautInProgress = true;
      const alive = cs.enemies.map((e,i)=>({e,i})).filter(x=>!x.e._dead && x.e.hp>0);
      if(alive.length>0){
        const pick = alive[Math.floor(Math.random()*alive.length)];
        Combat.dealDamage(cs, pick.i, cs.player.buffs.juggernaut);
      }
      cs._juggernautInProgress = false;
    }
  },
  applyBuff(target,name,amount){ target.buffs=target.buffs||{};target.buffs[name]=(target.buffs[name]||0)+amount; },
  applyDebuff(target,name,amount){
    // Susu眼罩：每场战斗首次对玩家施加debuff时免疫
    const run = State.run;
    if(target === run?.combat?.player && run.relics?.includes('susu_eyemask') && !run.combat.susuEyemaskUsed){
      run.combat.susuEyemaskUsed = true;
      // 显示免疫提示
      setTimeout(()=>{
        const tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);z-index:9999;background:rgba(0,200,255,0.18);border:2px solid rgba(0,200,255,0.7);border-radius:14px;padding:12px 28px;color:#00e5ff;font-size:1.1rem;font-weight:700;text-align:center;pointer-events:none;text-shadow:0 0 10px rgba(0,200,255,0.8);backdrop-filter:blur(4px);';
        tip.innerHTML = '🥽 Susu的眼罩发动！<br><span style="font-size:0.9rem;opacity:0.85">负面状态已被抵御</span>';
        document.body.appendChild(tip);
        setTimeout(()=>{ tip.style.transition='opacity 0.5s'; tip.style.opacity='0'; setTimeout(()=>tip.remove(),500); },1500);
      },50);
      return; // 免疫此次debuff
    }
    target.debuffs=target.debuffs||{};target.debuffs[name]=(target.debuffs[name]||0)+amount;
  },
  _tickDebuffs(entity){ const manual=new Set(['burn','freeze','wound']); Object.keys(entity.debuffs||{}).forEach(k=>{ if(!manual.has(k)) entity.debuffs[k]=Math.max(0,entity.debuffs[k]-1); }); },
  _onVictory(){ Audio.playVictory(); const run=State.run;run.character.hp=run.combat.player.hp;run.character.block=0;const node=run.map.nodes.find(n=>n.id===run.currentNodeId);if(node)node.done=true;
    // 金币奖励：普通10-18金，精英22-32金，Boss50金
    if(node){
      let goldReward=0;
      if(node.type==='boss'){goldReward=50;}
      else if(node.type==='elite'){goldReward=22+Math.floor(Math.random()*11);}
      else{goldReward=10+Math.floor(Math.random()*9);}
      // 王微的钱包：金币奖励额外+25%（向上取整）
      if(run.relics?.includes('wangwei_wallet')){
        const bonus=Math.ceil(goldReward*0.25);
        goldReward+=bonus;
      }
      run.gold=(run.gold||0)+goldReward;
      // 文豪的红领巾：战斗全程未受任何伤害，永久+5最大HP
      if(run.relics?.includes('wenhao_scarf') && !run.combat?._tookDamageThisCombat){
        run.character.maxHp += 5;
        run.character.hp = Math.min(run.character.hp + 5, run.character.maxHp);
        if(run.combat) run.combat.player.hp = run.character.hp;
        const tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;top:35%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,10,0.95);color:#e8ff80;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #c8e060;z-index:9999;pointer-events:none;box-shadow:0 0 14px rgba(200,224,96,0.5)';
        tip.textContent = '👔 文豪的红领巾！最大HP +5！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(), 2200);
      }
      // 王微的碗：战斗结束后回复5点HP
      if(run.relics?.includes('wangwei_bowl')){
        run.character.hp=Math.min(run.character.hp+5,run.character.maxHp);
        if(run.combat)run.combat.player.hp=run.character.hp;
      }
      // 小草的小草：每场战斗胜利后永久+1最大HP
      if(run.relics?.includes('xiaocao_sprout')){
        run.character.maxHp += 1;
        if(run.combat) run.combat.player.maxHp = run.character.maxHp;
        const tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;top:42%;left:50%;transform:translate(-50%,-50%);background:rgba(10,35,10,0.95);color:#a8f080;font-size:1.05rem;font-weight:900;padding:10px 22px;border-radius:12px;border:2px solid #6cc040;z-index:9999;pointer-events:none;box-shadow:0 0 12px rgba(108,192,64,0.45)';
        tip.textContent = '🌱 小草的小草！最大HP +1！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(), 2200);
      }
      // 播放金币音效并展示动画
      setTimeout(()=>Anim.showGoldReward(goldReward), 150);
    }
    // 药水掉落逻辑：小怪20% / 精英50% / Boss100%
    {
      const potionDropRate = node ? (node.type==='boss' ? 1.0 : node.type==='elite' ? 0.50 : 0.20) : 0;
      if(Math.random() < potionDropRate){
        const emptySlot = run.potions.findIndex(p=>p===null);
        if(emptySlot !== -1){
          // 按稀有度抽取：普通60% / 稀有35% / 罕见5%
          // 普通：乌龙茶/面包/coco洗发水
          // 稀有：醪糟水 / 阿高的柠檬水（各半）
          // 罕见：（暂无，不掉落）
          const tierRoll = Math.random();
          let droppedPotion = null;
          if(tierRoll < 0.60){
            // 普通60%：乌龙茶、面包、coco洗发水三选一
            const commonRoll = Math.random();
            droppedPotion = commonRoll < 0.333 ? 'oolong' : commonRoll < 0.667 ? 'bread' : 'coco_shampoo';
          } else if(tierRoll < 0.95){
            // 稀有35%：醪糟水 50% / 阿高柠檬水 50%
            droppedPotion = Math.random() < 0.5 ? 'laozao' : 'lemon_water';
          } else {
            droppedPotion = null; // 罕见5%（暂无，不掉落）
          }
          if(droppedPotion){
            run.potions[emptySlot] = droppedPotion;
            const pData = Data.potions[droppedPotion];
            const borderColor = droppedPotion === 'lemon_water' ? 'rgba(198,232,41,0.75)' : droppedPotion === 'laozao' ? 'rgba(127,90,240,0.6)' : 'rgba(210,160,50,0.6)';
            const toast = document.createElement('div');
            toast.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.88);color:#fff;padding:10px 22px;border-radius:12px;font-size:1.1rem;z-index:9999;pointer-events:none;border:1px solid ${borderColor};animation:bounceIn 0.4s ease`;
            toast.textContent = `获得了 ${pData.emoji} ${pData.name}！`;
            document.body.appendChild(toast);
            setTimeout(()=>toast.remove(), 2500);
          }
        }
      }
    }
    // 刘行事件战斗：打赢后100%给头巾，跳过随机掉落
    if(run._liuxingFightReward){
      run._liuxingFightReward = false;
      if(!run.relics.includes('liuxing_headband')){ run.pendingRelic = 'liuxing_headband'; }
    }
    // 战斗后遗物掉落：小怪10% / 精英25% / Boss90%（刘行战斗已处理，跳过）
    if(!run.pendingRelic){
    {
      const dropRate = node ? (node.type==='boss' ? 0.90 : node.type==='elite' ? 0.25 : 0.10) : 0;
      if(Math.random() < dropRate){
        // 按等级权重随机：普通45% / 精良30% / 稀有20% / 史诗5%
        const owned = run.relics || [];
        const tierRoll = Math.random();
        let targetTier = tierRoll < 0.45 ? 'common' : tierRoll < 0.75 ? 'uncommon' : tierRoll < 0.95 ? 'rare' : 'epic';
        // 只从 source==='battle' 的遗物中抽取（event/shop/boss 专属遗物不在此池中）
        // actRestrict 字段限制遗物只在特定 act 掉落
        const currentAct = run.act || 1;
        let pool = Data.battleRelics.filter(r => r.source === 'battle' && r.tier === targetTier && !owned.includes(r.id) && (!r.actRestrict || r.actRestrict === currentAct));
        // 若该等级无可用遗物，降级查找
        const fallbackOrder = ['epic','rare','uncommon','common'];
        const startIdx = fallbackOrder.indexOf(targetTier);
        for(let fi = startIdx+1; fi < fallbackOrder.length && pool.length === 0; fi++){
          pool = Data.battleRelics.filter(r => r.source === 'battle' && r.tier === fallbackOrder[fi] && !owned.includes(r.id) && (!r.actRestrict || r.actRestrict === currentAct));
        }
        if(pool.length > 0){
          const picked = pool[Math.floor(Math.random() * pool.length)];
          run.pendingRelic = picked.id;  // 存入待领取，在奖励界面展示
        }
      }
    }
    } // end if(!run.pendingRelic)
    State.saveRun(0);
    if(node&&node.type==='boss'){
      const run=State.run;
      if(run.isTutorial){
        // 教程Boss：奖励结束后不跳act过渡，由Tutorial._doCardReward接管
        run.pendingNextState = 'card-reward-tutorial-end';
      } else if(run.act===1){
        run.pendingNextState = 'act2-transition';
      } else if(run.act===2){
        run.pendingNextState = 'act3-transition';
      } else {
        run.pendingNextState = 'victory';
      }
    }
    // Boss 和普通战斗统一走奖励流程（遗物弹窗 → 卡牌奖励 → 跳转）
    {
      const run=State.run;
      // 有待领取遗物时，先弹出遗物弹窗，玩家点击后再进入卡牌奖励
      if(run.pendingRelic){
        const pr = Data.battleRelics.find(r=>r.id===run.pendingRelic);
        if(pr){
          setTimeout(()=>{
            // 展示遗物弹窗，玩家主动选择拾取或放弃
            UI._showRelicPickup(
              pr.id, pr.name, pr.icon||'\uD83C\uDF81', pr.desc,
              // onPick: 拾取
              () => { UI._pickRelic(pr.id); },
              // onSkip: 放弃，清除 pendingRelic 并直接进入卡牌奖励界面
              () => { State.run.pendingRelic = null; State.go('card-reward'); }
            );
          }, 300);
        } else {
          setTimeout(()=>State.go('card-reward'),1000);
        }
      } else {
        setTimeout(()=>State.go('card-reward'),1000);
      }
    }
  },
  // ── 射手蓄力系统核心方法 ──────────────────────────────────────────────────────
  archerGainCharge(cs, amount){
    if(State.run?.character?.id !== 'archer') return;
    const max = cs.chargeMax || 5;
    const prev = cs.charge || 0;
    cs.charge = Math.min(prev + amount, max);
    // 蓄力里程碑音效：第一次到 3 / 第一次到 max 时触发（出牌音已在 _playCard 被预判跳过）
    if(prev < 3 && cs.charge >= 3 && cs.charge < max){ Audio.playChargeMid(); }
    if(prev < max && cs.charge >= max){ Audio.playChargeMax(); }
    // 只更新HUD数字，不重建整个战斗界面（避免在playCard执行中途破坏手牌DOM）
    if(cs.charge !== prev){
      const hudEl = document.getElementById('archer-charge-hud');
      if(hudEl){
        hudEl.textContent = `⚡ 蓄力 ${cs.charge}/${max}`;
      }
      // 同时更新满蓄爆射的可用状态（仅更新样式，不重建DOM）
      const handEl = document.getElementById('hand-cards');
      if(handEl){
        handEl.querySelectorAll('[data-card-id="ar_full_charge"]').forEach(el=>{
          if(cs.charge>=5) el.classList.remove('unplayable');
          else el.classList.add('unplayable');
        });
      }
    }
    // 蓄力变化后立即更新手牌显示（实时伤害数值）
    if(typeof UI !== 'undefined' && UI._renderHand && State.run?.character?.id === 'archer'){
      setTimeout(()=>{ const _cs=State.run?.combat; if(_cs) UI._renderHand(_cs); }, 0);
    }
  },  _onDeath(){ setTimeout(()=>State.go('game-over'),600); },

  // ── 赛车手档位系统核心方法 ────────────────────────────────────────────────────────────────────────────────
  // 获取 full_throttle 的实际伤害加成（考虑升级等级）
  // 拳击手：搏命加成（纯HP段位加成，不含愤怒）
  _getBoxerBerserk(cs){
    if(State.run?.character?.id!=='boxer') return 0;
    let mult=2;
    if((cs.player.buffs?.box_iron_will||0)>0){
      const lv=Combat._getCardUpgradeLevel(cs,'box_iron_will');
      mult=lv>=2?6:4;
    }
    const lost=1-cs.player.hp/cs.player.maxHp;
    return Math.min(mult*3, Math.floor(lost/0.25)*mult);
  },
  // 拳击手：全攻击加成 = 愤怒 + 搏命
  _getBoxerBonus(cs){
    if(State.run?.character?.id!=='boxer') return 0;
    const fury=cs.player.buffs?.fury||0;
    return fury+Combat._getBoxerBerserk(cs);
  },
  _getFtBonus(cs){
    if((cs.player.buffs.full_throttle||0) <= 0) return 0;
    const lv = Combat._getCardUpgradeLevel(cs, 'full_throttle');
    if(lv >= 2) return cs._shiftedUpThisTurn ? 4 : 2;
    if(lv >= 1) return cs._shiftedUpThisTurn ? 3 : 1;
    return cs._shiftedUpThisTurn ? 2 : 1;
  },

  // 获取某张牌在当前战斗中的升级等级（从 cs.powerUpgrades 中查找）
  // powerUpgrades 存储已打出的能力牌的升级等级
  _getCardUpgradeLevel(cs, cardId){
    return (cs.powerUpgrades && cs.powerUpgrades[cardId]) || 0;
  },

  _changeGear(cs, delta){
    if(cs._gearLocked) return; // 档位锁定时不能换挡
    const prev = cs.gear||2;
    const next = Math.max(1, Math.min(3, prev + delta));
    if(next === prev) return;
    cs.gear = next;
    const isUp = delta > 0;
    if(isUp){
      cs._shiftedUpThisTurn = true;
      // 速度感>=60：升挡时额外抽1张牌（每回合限1次）
      if((cs.speed||0)>=60 && !cs._speedDrawnThisTurn){
        cs._speedDrawnThisTurn=true;
        Combat.drawCards(cs,1);
        const _sdTip=document.createElement('div');
        _sdTip.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#ff9f43;font-size:0.95rem;font-weight:800;padding:7px 18px;border-radius:10px;border:1.5px solid #ff9f43;z-index:9999;pointer-events:none;';
        _sdTip.textContent='🏎️ 高速行驶！升挡额外抽1张牌！';
        document.body.appendChild(_sdTip);
        setTimeout(()=>_sdTip.remove(),1200);
      }
      // 赛车直觉：升挡时获得动量（+1升级后上限5，+2时首次升挡额外抽1牌）
      if((cs.player.buffs.race_instinct||0)>0){
        const _raceLv = Combat._getCardUpgradeLevel(cs, 'race_instinct');
        const momentumCap = _raceLv >= 1 ? 5 : 3;
        cs.momentum = Math.min((cs.momentum||0)+1, momentumCap);
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:38%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#ffd700;font-size:1rem;font-weight:800;padding:7px 18px;border-radius:10px;border:1.5px solid #ffd700;z-index:9999;pointer-events:none;';
        tip.textContent=`动量 +1 （${cs.momentum}/${momentumCap}）`;
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),900);
        // +2 升级：每回合首次升挡时额外抽1张牌
        if(_raceLv >= 2 && !cs._raceInstinctDrawnThisTurn){
          cs._raceInstinctDrawnThisTurn = true;
          Combat.drawCards(cs, 1);
        }
      }
      // 红线突破：3挡时格挡不受减损（在格挡计算时处理）
    } else {
      // 防侧滑系统：降挡时获得格挡（升级后+4格挡，+2时首次降挡额外抽1牌）
      if((cs.player.buffs.anti_skid||0)>0){
        const _antiSkidLv = Combat._getCardUpgradeLevel(cs, 'anti_skid');
        const blkPerStack = _antiSkidLv >= 1 ? 4 : 2;
        const blkAmt = blkPerStack * (cs.player.buffs.anti_skid||0);
        cs.player.block = (cs.player.block||0) + blkAmt;
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:42%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#7dccff;font-size:1rem;font-weight:800;padding:7px 18px;border-radius:10px;border:1.5px solid #7dccff;z-index:9999;pointer-events:none;';
        tip.textContent=`防侧滑 +${blkAmt} 格挡`;
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),900);
        // +2 升级：每回合首次降挡时额外抽1张牌
        if(_antiSkidLv >= 2 && !cs._antiSkidDrawnThisTurn){
          cs._antiSkidDrawnThisTurn = true;
          Combat.drawCards(cs, 1);
        }
      }
    }
    // 显示档位变化提示
    const tip2=document.createElement('div');
    const gearNames=['','1挡·防御','2挡·中立','3挡·攻击'];
    const gearColors=['','#7dccff','#f0f0f0','#ff7d7d'];
    tip2.style.cssText=`position:fixed;top:32%;left:50%;transform:translate(-50%,-50%);background:rgba(10,10,20,0.92);color:${gearColors[next]};font-size:1.2rem;font-weight:900;padding:8px 22px;border-radius:12px;border:2px solid ${gearColors[next]};z-index:9999;pointer-events:none;`;
    const absDelta=Math.abs(next-prev);
    const changeLabel=isUp?`↑ 升${absDelta}档 → ${gearNames[next]}`:`↓ 降${absDelta}档 → ${gearNames[next]}`;
    tip2.textContent=changeLabel;
    document.body.appendChild(tip2);
    setTimeout(()=>tip2.remove(),800);
    // 速度感积累：每回合结束时根据档位积累（在endTurn处理）
    UI._renderCombat && setTimeout(()=>UI._renderCombat(),50);
  },

  // coop 私有交互守卫：返回 true 表示本地不应弹出 modal（对方触发或纯访客端）
  // 仅在 coop 模式下使用；触发方（拥有 cs._coopWho 角色）才弹 modal。
  _coopBlockModal(cs, label){
    if (!(typeof Net !== 'undefined' && Net.connected)) return false;
    if (!cs || !cs._coopCs) return false;
    const who = cs._coopWho;
    if (!who) return false;
    const myRole = Net.isHost ? 'host' : 'guest';
    // 标记房主端权威 cs 上 pendingInteraction（供广播给对方）
    if (Net.isHost && cs._coopCs) {
      cs._coopCs.pendingInteraction = { who, label: label || '操作中…' };
    }
    // 如果不是我触发的卡 → 本地不渲染 modal
    if (who !== myRole) return true;
    return false;
  },
  _coopClearModal(cs){
    if (!(typeof Net !== 'undefined' && Net.connected)) return;
    if (cs && cs._coopCs && Net.isHost) {
      cs._coopCs.pendingInteraction = null;
    }
  },

  _gearShiftInteractive(cs, cardId){
    if (Combat._coopBlockModal(cs, '🔧 换挡选择')) return;
    // 记录本卡本轮使用次数
    if(!cs._gearShiftCount) cs._gearShiftCount={};
    const key = cardId||'gear_shift';
    const usedTimes = cs._gearShiftCount[key]||0;
    if(cardId==='gear_shift' && usedTimes>=2){
      const tip=document.createElement('div');
      tip.style.cssText='position:fixed;top:35%;left:50%;transform:translate(-50%,-50%);background:rgba(40,10,10,0.95);color:#ff7d7d;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #ff7d7d;z-index:9999;pointer-events:none;';
      tip.textContent='换挡时机本轮已达使用上限（2次）';
      document.body.appendChild(tip);
      setTimeout(()=>tip.remove(),1200);
      return;
    }
    // 创建选择弹窗
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:8000;display:flex;align-items:center;justify-content:center;gap:32px;';
    const g=cs.gear||2;
    const canUp=g<3, canDown=g>1;
    const makeBtn=(label,color,onClick)=>{
      const btn=document.createElement('button');
      btn.style.cssText=`background:rgba(20,20,40,0.97);color:${color};font-size:1.4rem;font-weight:900;padding:18px 36px;border-radius:16px;border:2.5px solid ${color};cursor:pointer;box-shadow:0 0 20px ${color}44;transition:transform 0.1s;`;
      btn.textContent=label;
      btn.onmouseenter=()=>btn.style.transform='scale(1.08)';
      btn.onmouseleave=()=>btn.style.transform='scale(1)';
      btn.onclick=()=>{ overlay.remove(); onClick(); };
      return btn;
    };
    if(canUp) overlay.appendChild(makeBtn(`↑ 升1档（→${g+1}挡）`,'#ff7d7d',()=>{ cs._gearShiftCount[key]=(cs._gearShiftCount[key]||0)+1; Combat._changeGear(cs,1); Combat._coopClearModal(cs); }));
    const cancelBtn=document.createElement('button');
    cancelBtn.style.cssText='background:rgba(20,20,40,0.97);color:#888;font-size:1rem;font-weight:700;padding:12px 24px;border-radius:12px;border:1.5px solid #555;cursor:pointer;';
    cancelBtn.textContent='取消';
    cancelBtn.onclick=()=>{ overlay.remove(); Combat._coopClearModal(cs); };
    overlay.appendChild(cancelBtn);
    if(canDown) overlay.appendChild(makeBtn(`↓ 降1档（→${g-1}挡）`,'#7dccff',()=>{ cs._gearShiftCount[key]=(cs._gearShiftCount[key]||0)+1; Combat._changeGear(cs,-1); Combat._coopClearModal(cs); }));
    document.body.appendChild(overlay);
  },

  _racePredictInteractive(cs){
    if (Combat._coopBlockModal(cs, '🏁 赛线预判')) return;
    const top3=[...cs.drawPile.slice(0,3)];
    if(top3.length===0){ Combat.drawCards(cs,1); Combat._coopClearModal(cs); return; }
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:8000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;';
    const title=document.createElement('div');
    title.style.cssText='color:#fff;font-size:1.2rem;font-weight:800;margin-bottom:8px;';
    title.textContent='赛线预判：拖动卡牌调整顺序';
    overlay.appendChild(title);
    const cardRow=document.createElement('div');
    cardRow.style.cssText='display:flex;gap:16px;';
    let order=[...top3];
    const renderOrder=()=>{
      cardRow.innerHTML='';
      order.forEach((cid,idx)=>{
        const el=UI.renderCard(cid);
        el.style.cssText+='cursor:grab;opacity:0.95;transform:scale(0.85);';
        el.draggable=true;
        el.dataset.idx=idx;
        el.ondragstart=e=>e.dataTransfer.setData('text',idx);
        el.ondragover=e=>e.preventDefault();
        el.ondrop=e=>{ e.preventDefault(); const from=parseInt(e.dataTransfer.getData('text')); const to=idx; if(from!==to){[order[from],order[to]]=[order[to],order[from]]; renderOrder();} };
        cardRow.appendChild(el);
      });
    };
    renderOrder();
    overlay.appendChild(cardRow);
    const confirmBtn=document.createElement('button');
    confirmBtn.style.cssText='background:#1a3a1a;color:#7fff7f;font-size:1.1rem;font-weight:800;padding:12px 32px;border-radius:12px;border:2px solid #7fff7f;cursor:pointer;margin-top:8px;';
    confirmBtn.textContent='确认顺序，抽 1 张牌';
    confirmBtn.onclick=()=>{
      overlay.remove();
      // 将调整后的顺序写回牌堆顶
      for(let i=0;i<order.length;i++) cs.drawPile[i]=order[i];
      Combat.drawCards(cs,1);
      Combat._coopClearModal(cs);
    };
    overlay.appendChild(confirmBtn);
    document.body.appendChild(overlay);
  },

  _showFreezeEffect(){
    // 屏幕边缘蓝光 + 冰冻字样
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9990;box-shadow:inset 0 0 80px 30px rgba(80,180,255,0.55);transition:opacity 0.6s ease;';
    const label = document.createElement('div');
    label.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#7ee8ff;font-size:2.8rem;font-weight:900;letter-spacing:0.2em;text-shadow:0 0 24px rgba(100,210,255,0.9),0 0 60px rgba(80,180,255,0.5);font-family:inherit;';
    label.textContent = '冰冻';
    overlay.appendChild(label);
    document.body.appendChild(overlay);
    setTimeout(()=>{ overlay.style.opacity='0'; setTimeout(()=>overlay.remove(),650); },900);
  },

  _arSwapInteractive(cs, lv=0){
    if (Combat._coopBlockModal(cs, '🔄 换箭选择')) return;
    const drawAmt = lv>=2 ? 3 : 2;
    const chargeAmt = lv>=1 ? 2 : 1;
    // 手牌为空时直接抽牌+蓄力
    if(cs.hand.length === 0){
      Combat.drawCards(cs, drawAmt);
      Combat.archerGainCharge(cs, chargeAmt);
      Combat._coopClearModal(cs);
      return;
    }
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:8000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;';
    const title = document.createElement('div');
    title.style.cssText = 'color:#ffe082;font-size:1.15rem;font-weight:800;';
    title.textContent = '🔄 换箭：选择一张牌弃置';
    overlay.appendChild(title);
    const cardRow = document.createElement('div');
    cardRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:90vw;';
    // 快照当前手牌（ar_swap 本身已被移出手牌，不会出现在列表里）
    const snapshot = [...cs.hand];
    snapshot.forEach((cid, idx) => {
      const el = UI.renderCard(cid);
      el.style.cssText += 'cursor:pointer;opacity:0.92;transform:scale(0.88);transition:transform 0.1s,box-shadow 0.1s;';
      el.onmouseenter = () => { el.style.transform = 'scale(0.94)'; el.style.boxShadow = '0 0 16px rgba(255,224,130,0.6)'; };
      el.onmouseleave = () => { el.style.transform = 'scale(0.88)'; el.style.boxShadow = ''; };
      el.onclick = () => {
        overlay.remove();
        // 从当前手牌中移除（用 indexOf 找实际位置，以防手牌顺序变化）
        const realIdx = cs.hand.indexOf(cid);
        if(realIdx !== -1) cs.discardPile.push(cs.hand.splice(realIdx, 1)[0]);
        Combat.drawCards(cs, drawAmt);
        Combat.archerGainCharge(cs, chargeAmt);
        Combat._coopClearModal(cs);
        UI._renderCombat && UI._renderCombat();
      };
      cardRow.appendChild(el);
    });
    overlay.appendChild(cardRow);
    document.body.appendChild(overlay);
  }
};

// ── animations.js ─────────────────────────────────────────────────────────────
const Anim = {
  floatNumber(text,el,type='damage'){ const rect=el.getBoundingClientRect();const num=document.createElement('div');num.className=`float-number ${type}`;num.textContent=text;num.style.left=`${rect.left+rect.width/2}px`;num.style.top=`${rect.top+rect.height*0.2}px`;document.getElementById('fx-layer').appendChild(num);num.addEventListener('animationend',()=>num.remove(),{once:true}); },
  shake(el){ if(!el)return;el.classList.remove('shake-anim');void el.offsetWidth;el.classList.add('shake-anim');el.addEventListener('animationend',()=>el.classList.remove('shake-anim'),{once:true}); },
  flashScreenDamage(){ const fx=document.getElementById('fx-layer');const overlay=document.createElement('div');overlay.style.cssText='position:fixed;inset:0;pointer-events:none;border:6px solid rgba(192,57,43,0);animation:dmgFlash 0.45s ease forwards;z-index:400;';fx.appendChild(overlay);overlay.addEventListener('animationend',()=>overlay.remove(),{once:true}); },
  flyCard(cardEl,targetRect,duration,onDone){ duration=duration||220;if(!cardEl){onDone&&onDone();return;} const fromRect=cardEl.getBoundingClientRect();const clone=cardEl.cloneNode(true);clone.style.cssText=`position:fixed;left:${fromRect.left}px;top:${fromRect.top}px;width:${fromRect.width}px;height:${fromRect.height}px;margin:0;z-index:9999;pointer-events:none;transition:left ${duration}ms ease-in,top ${duration}ms ease-in,width ${duration}ms ease-in,height ${duration}ms ease-in,opacity ${duration}ms ease-in,transform ${duration}ms ease-in;`;document.body.appendChild(clone);cardEl.style.opacity='0';requestAnimationFrame(()=>requestAnimationFrame(()=>{clone.style.left=`${targetRect.left+targetRect.width*0.2}px`;clone.style.top=`${targetRect.top+targetRect.height*0.1}px`;clone.style.width=`${targetRect.width*0.6}px`;clone.style.height=`${targetRect.height*0.6}px`;clone.style.opacity='0';clone.style.transform='rotate(20deg)';}));clone.addEventListener('transitionend',()=>{clone.remove();onDone&&onDone();},{once:true}); },
  lunge(el,dir){ if(!el)return;const cls=dir==='right'?'lunge-right':'lunge-left';el.classList.remove('lunge-right','lunge-left');void el.offsetWidth;el.classList.add(cls);el.addEventListener('animationend',()=>el.classList.remove(cls),{once:true}); },
  hitFlash(el){ if(!el)return;el.classList.remove('hit-flash');void el.offsetWidth;el.classList.add('hit-flash');el.addEventListener('animationend',()=>el.classList.remove('hit-flash'),{once:true}); },
  flipCard(cardEl,delay,onDone){ delay=delay||0;cardEl.style.opacity='0';setTimeout(()=>{cardEl.classList.add('card-flip-anim');cardEl.addEventListener('animationend',()=>{cardEl.classList.remove('card-flip-anim');cardEl.style.opacity='1';onDone&&onDone();},{once:true});},delay); },

  showGoldReward(amount){
    // 播放硬币音效
    Audio.playGoldReward();
    // 创建金币飞出粒子：从屏幕中心向四周散射
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const coinCount = Math.min(8, 3 + Math.floor(amount / 10));
    for(let i = 0; i < coinCount; i++){
      const coin = document.createElement('div');
      coin.className = 'coin-particle';
      coin.textContent = '💰';
      const angle = (i / coinCount) * Math.PI * 2;
      const dist = 80 + Math.random() * 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 40;
      coin.style.cssText = `left:${cx - 14}px;top:${cy - 14}px;--tx:${tx}px;--ty:${ty}px;animation-delay:${i * 0.04}s;animation-duration:${0.4 + Math.random() * 0.15}s;`;
      document.body.appendChild(coin);
      coin.addEventListener('animationend', ()=>coin.remove(), {once:true});
    }
    // 创建金色标语带
    const banner = document.createElement('div');
    banner.className = 'gold-banner';
    banner.style.top = `${cy - 80}px`;
    banner.innerHTML = `💰 +${amount} 金币`;
    document.body.appendChild(banner);
    // 停留后淡出
    setTimeout(()=>{
      banner.style.animation = 'goldBannerOut 0.4s ease forwards';
      banner.addEventListener('animationend', ()=>banner.remove(), {once:true});
    }, 1600);
  }
};

// ── tutorial.js ──────────────────────────────────────────────────────────────
const Tutorial = {
  isActive(){ try{ return !!State.run?.isTutorial; }catch(e){ return false; } },

  clearHint(){ document.getElementById('tut-live-hint')?.remove(); },

  showHint({ title, body, pos='center', onGotIt, noSkip=false }){
    this.clearHint();
    // inject keyframe once
    if(!document.getElementById('tut-style')){
      const s=document.createElement('style');s.id='tut-style';
      s.textContent=`
        @keyframes tutIn{from{opacity:0;transform:translateY(12px) translateX(-50%)}to{opacity:1;transform:translateY(0) translateX(-50%)}}
        @keyframes tutInC{from{opacity:0;transform:translateY(12px) translate(-50%,-50%)}to{opacity:1;transform:translateY(0) translate(-50%,-50%)}}
        @keyframes tutInR{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tutPulse{0%,100%{box-shadow:0 0 0 0 rgba(80,200,255,0.6)}50%{box-shadow:0 0 0 8px rgba(80,200,255,0)}}
        .tut-glow{animation:tutPulse 1.5s infinite!important;outline:2.5px solid rgba(80,200,255,0.8)!important;}
      `;
      document.head.appendChild(s);
    }
    const posMap={
      center:`top:50%;left:50%;transform:translate(-50%,-50%);animation:tutInC .3s ease`,
      top:`top:72px;left:50%;transform:translateX(-50%);animation:tutIn .3s ease`,
      bottom:`bottom:175px;left:50%;transform:translateX(-50%);animation:tutIn .3s ease`,
      'top-right':`top:72px;right:16px;left:auto;transform:none;animation:tutInR .3s ease`,
    };
    const hint=document.createElement('div');
    hint.id='tut-live-hint';
    hint.style.cssText=`position:fixed;${posMap[pos]||posMap.center};z-index:9800;max-width:330px;width:91%;background:linear-gradient(150deg,#0a1828 0%,#14273d 100%);border:2px solid rgba(80,200,255,0.55);border-radius:14px;padding:18px 20px 14px;box-shadow:0 4px 32px rgba(0,0,0,0.8),0 0 24px rgba(80,200,255,0.12);pointer-events:auto`;
    hint.innerHTML=`
      <div style="font-size:1.0rem;font-weight:900;color:#90d8ff;margin-bottom:8px;line-height:1.3">${title}</div>
      <div style="font-size:0.88rem;color:rgba(255,255,255,0.88);line-height:1.65;margin-bottom:14px">${body}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        ${noSkip?'<span></span>':'<button id="tut-skip" style="background:none;border:none;color:rgba(255,255,255,0.28);font-size:0.78rem;cursor:pointer;padding:2px 0">跳过教程</button>'}
        <button id="tut-ok" style="background:rgba(80,200,255,0.22);border:1.5px solid rgba(80,200,255,0.5);border-radius:8px;color:#90d8ff;font-size:0.9rem;font-weight:700;cursor:pointer;padding:6px 18px">我知道了 →</button>
      </div>`;
    document.body.appendChild(hint);
    hint.querySelector('#tut-ok').onclick=()=>{ this.clearHint(); onGotIt?.(); };
    const _skipBtn=hint.querySelector('#tut-skip'); if(_skipBtn) _skipBtn.onclick=()=>{ this.end(); State.go('menu'); };
  },

  end(){
    this.clearHint();
    document.querySelectorAll('.tut-glow').forEach(e=>e.classList.remove('tut-glow'));
    try{ State.run.isTutorial=false; }catch(e){}
  },

  handleScreen(screen){
    if(!this.isActive()) return;
    const run=State.run;
    setTimeout(()=>{
      if(screen==='map')        this._doMap(run);
      else if(screen==='combat') this._doCombat(run);
      else if(screen==='card-reward') this._doCardReward(run);
      else if(screen==='question') this._doQuestion(run);
      else if(screen==='rest')  this._doRest(run);
      else if(screen==='shop')  this._doShop(run);
    }, 480);
  },

  // ── MAP ──────────────────────────────────────────────────────────────────────
  _doMap(run){
    const ph=run.tutorialPhase||'init';
    if(ph==='init'){
      run.tutorialPhase='pre-combat';
      this.showHint({
        title:'🗺️ 这是冒险地图！',
        body:'顶部栏显示你的 ❤️ HP、💰 金币，以及拾取的遗物图标（悬停查看效果）。<br><br>地图上<b>高亮发光的节点</b>才能点击前进，其余节点不可选。<br>教程路线固定：<b>⚔️小怪 → ❓事件 → 🏘️篝火 → 🛒商店 → 👑Boss</b>',
        pos:'center',
        onGotIt:()=>{
          this.showHint({
            title:'⚔️ 出发！点击小怪节点',
            body:'点击地图上高亮的 <b>⚔️</b> 节点，进入第一场战斗。教程会手把手教你战斗操作。',
            pos:'bottom',
            onGotIt:null
          });
          setTimeout(()=>this._glowReachable(),100);
        }
      });
    } else if(ph==='back-from-combat'){
      run.tutorialPhase='pre-question';
      this._glowReachable();
      this.showHint({title:'✅ 战斗完成！',body:'下一步：点击 <b>❓</b> 节点，体验随机问号事件。',pos:'bottom',onGotIt:null});
    } else if(ph==='back-from-question'){
      run.tutorialPhase='pre-rest';
      this._glowReachable();
      this.showHint({title:'❓ 事件完成！',body:'接下来去 <b>🏘️ 篝火</b> 休息——可以回血或升级一张牌。',pos:'bottom',onGotIt:null});
    } else if(ph==='back-from-rest'){
      run.tutorialPhase='pre-shop';
      this._glowReachable();
      this.showHint({title:'🔥 休息完毕！',body:'前往 <b>🛒 商店</b>，花费金币购买卡牌、遗物或药水。',pos:'bottom',onGotIt:null});
    } else if(ph==='back-from-shop'){
      run.tutorialPhase='pre-boss';
      this._glowReachable();
      this.showHint({title:'🛒 购物完成！',body:'最后一步：挑战教程 <b>👑 Boss</b>！击败它即完成新手教程，祝你好运！',pos:'bottom',onGotIt:null});
    }
  },

  _glowReachable(){
    document.querySelectorAll('.tut-glow').forEach(e=>e.classList.remove('tut-glow'));
    document.querySelectorAll('.map-node.reachable').forEach(el=>el.classList.add('tut-glow'));
  },

  // ── COMBAT ───────────────────────────────────────────────────────────────────
  _doCombat(run){
    const ph=run.tutorialPhase||'';
    if(ph==='pre-combat'||ph==='init'){
      run.tutorialPhase='first-combat';
      this._combatStep(1);
    } else if(ph==='pre-boss'){
      run.tutorialPhase='boss-combat';
      this.showHint({
        title:'👑 教程Boss！',
        body:'这是新手教程的最后一战。综合运用所学：<br>• 管理好每回合的能量<br>• 攻防兼顾，不要只攻不守<br>• 注意敌人的行动意图<br><br>击败它即完成教程！加油！',
        pos:'top',onGotIt:null
      });
    }
  },

  _combatStep(step){
    const steps=[
      { title:'⚔️ 战斗界面总览',
        body:'屏幕<b>上方</b>是敌人区域——显示敌人HP、格挡值，以及头顶的<b>行动意图图标</b>（⚔️=下回合攻击 / 🛡=下回合防御）。<br>屏幕<b>下方</b>是你的HP和格挡。' },
      { title:'🃏 手牌 & 能量',
        body:'底部排列的是你的<b>手牌</b>（每回合开始抽5张）。每张牌左上角是<b>费用数字</b>。<br>右下角的 <b>⚡ 能量槽</b> 每回合开始时有3点，打牌会消耗能量。' },
      { title:'💡 怎么打牌？',
        body:'🔴 <b>攻击牌</b>：点击选中（卡片高亮）→ 再点击目标敌人，造成伤害。<br>🟢 <b>技能牌</b>：直接点击生效（格挡/抽牌等），无需选择目标。<br><br>🛡 <b>格挡</b>（蓝色数字）优先抵消伤害，每回合开始<b>清零</b>，所以当回合要用完！' },
      { title:'▶️ 现在动手！',
        body:'试着打出几张手牌——攻击敌人，或者获取格挡都行。<br>能量用完或觉得可以了，点右下角 <b>「结束回合」</b>，让敌人行动，然后继续下一回合。<br><br>把敌人HP归零即可获胜 💪',
        onGotIt:null },  // 最后一步不自动跳下一步，让玩家自由操作
    ];
    const s=steps[step-1];
    if(!s) return;
    this.showHint({
      pos: step<=2?'top':'bottom',
      ...s,
      onGotIt: s.onGotIt!==undefined ? s.onGotIt : ()=>this._combatStep(step+1)
    });
  },

  // ── CARD REWARD ──────────────────────────────────────────────────────────────
  _doCardReward(run){
    const ph=run.tutorialPhase||'';
    if(ph==='first-combat'){
      run.tutorialPhase='back-from-combat';
      this.showHint({
        title:'🎁 选择一张新牌',
        body:'每场战斗后可以从3张候选牌里选1张加入牌组，或者点<b>「跳过」</b>不拿。<br><br>💡 牌组越精简越好——弱牌太多会拖慢节奏。有时跳过反而更聪明。',
        pos:'top', onGotIt:null
      });
    }
    // boss-combat 阶段：_complete() 由 'card-reward-tutorial-end' 屏幕路由直接触发
  },

  // ── QUESTION ─────────────────────────────────────────────────────────────────
  _doQuestion(run){
    run.tutorialPhase='back-from-question';
    this.showHint({
      title:'❓ 随机问号事件',
      body:'每个选项旁边有<b>详细说明</b>，告诉你大概的风险和收益。仔细阅读后做出选择。<br><br>事件结果可能是：获得遗物、金币、HP变动，或者无事发生。有时候甚至全是好事！',
      pos:'center', onGotIt:null
    });
  },

  // ── REST ─────────────────────────────────────────────────────────────────────
  _doRest(run){
    run.tutorialPhase='back-from-rest';
    this.showHint({
      title:'🏘️ 篝火休息点',
      body:'你有两个选择：<br>🩹 <b>休息</b>：恢复 30% 最大HP（HP偏低时优先选）<br>⚒️ <b>升级</b>：选一张牌升级，效果永久增强<br><br>HP充足时可以升级关键牌。记住：每次只能二选一。',
      pos:'center', onGotIt:null
    });
  },

  // ── SHOP ─────────────────────────────────────────────────────────────────────
  _doShop(run){
    run.tutorialPhase='back-from-shop';
    this.showHint({
      title:'🛒 商店',
      body:'用 💰 金币购买：<br>🃏 <b>卡牌</b>——加入牌组强化战力<br>💎 <b>遗物</b>——永久被动效果，价值极高<br>🧪 <b>药水</b>——一次性消耗品，关键时刻救命<br>🗑️ <b>删牌</b>——移除弱牌，让牌组更精锐（强烈推荐）<br><br>将鼠标悬停在遗物上可查看效果说明。',
      pos:'center', onGotIt:null
    });
  },

  // ── COMPLETE ─────────────────────────────────────────────────────────────────
  _complete(){
    this.clearHint();
    const ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:9900;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.87)';
    ov.innerHTML=`
      <div style="background:linear-gradient(160deg,#0d1b2a,#1a3040);border:2.5px solid rgba(255,210,80,0.65);border-radius:20px;padding:36px 30px;max-width:400px;width:91%;text-align:center;box-shadow:0 8px 48px rgba(0,0,0,0.9)">
        <div style="font-size:3.2rem;margin-bottom:10px">🎓</div>
        <div style="font-size:1.4rem;font-weight:900;color:#ffd060;margin-bottom:12px">新手教程完成！</div>
        <div style="color:rgba(255,255,255,0.82);font-size:0.93rem;line-height:1.72;margin-bottom:24px">
          恭喜你完成了完整的新手教程！<br>你已学会：战斗操作、问号事件、篝火休息和商店购物。<br><br>
          <span style="color:#90d8ff;font-weight:700">现在选择一个角色，开始真正的冒险吧！</span>
        </div>
        <button id="tut-finish" style="background:rgba(255,210,80,0.18);border:2px solid rgba(255,210,80,0.65);border-radius:12px;color:#ffd060;font-size:1.05rem;font-weight:800;cursor:pointer;padding:13px 0;width:100%;letter-spacing:0.04em">⚔️ 开始正式冒险 →</button>
      </div>`;
    document.body.appendChild(ov);
    ov.querySelector('#tut-finish').onclick=()=>{ ov.remove(); this.end(); State.go('char-select'); };
  },
};

// ── net.js ────────────────────────────────────────────────────────────────────
// MQTT 联机层：HiveMQ 公共 Broker，房主权威模式，5位房间码。
// 无需账号，走 WSS/HTTPS，穿透任何防火墙。
const Net = {
  _client: null,
  _joinTimer: null,
  isHost: false,
  connected: false,
  roomCode: null,
  _handlers: {},
  _CHARS: 'ABCDEFGHJKMNPQRSTUVWXYZ23456789',
  _BROKER: 'wss://broker.emqx.io:8084/mqtt',
  _TP: 'slaycuriosity/v1/',   // topic prefix

  on(type, fn) { this._handlers[type] = fn; },
  _emit(type, data) { try { if (this._handlers[type]) this._handlers[type](data); } catch(e){ console.error('Net handler error', e); } },

  _genCode() {
    let c = '';
    for (let i = 0; i < 5; i++) c += this._CHARS[Math.floor(Math.random() * this._CHARS.length)];
    return c;
  },

  // topic: slaycuriosity/v1/{code}
  _topic(code) { return this._TP + (code || this.roomCode); },

  _connect(code, onReady) {
    if (typeof mqtt === 'undefined') { this._emit('error', 'MQTT 库未加载，请检查网络'); return; }
    this.disconnect();
    this.roomCode = code;
    const role = this.isHost ? 'host' : 'guest';
    const clientId = 'stc-' + role + '-' + Math.random().toString(36).slice(2, 9);
    const client = mqtt.connect(this._BROKER, {
      clientId,
      clean: true,
      connectTimeout: 10000,
      reconnectPeriod: 0,
    });
    this._client = client;

    // broker 连接超时保险
    const brokerTimer = setTimeout(() => {
      if (!this.connected) this._emit('error', '无法连接服务器（10s超时），请检查网络');
    }, 12000);

    client.on('connect', () => {
      clearTimeout(brokerTimer);
      client.subscribe(this._topic(code), { qos: 1 }, err => {
        if (err) { this._emit('error', '订阅失败：' + err.message); return; }
        onReady();
      });
    });

    client.on('message', (_topic, raw) => {
      let data;
      try { data = JSON.parse(raw.toString()); } catch(e) { return; }
      // 忽略自己发的消息
      if (data._from === role) return;

      if (!this.connected) {
        // 握手阶段
        if (!this.isHost && data.t === 'join-ack') {
          if (this._joinTimer) { clearTimeout(this._joinTimer); this._joinTimer = null; }
          this.connected = true;
          this._emit('connected');
          this._pub({ t: 'hello' });
        } else if (this.isHost && data.t === 'join') {
          this.connected = true;
          this._emit('connected');
          this._pub({ t: 'join-ack' });
          this._pub({ t: 'hello' });
        }
      } else {
        // 正常消息
        if (data.t === 'hello') { this._pub({ t: 'hello-ack' }); this._emit('message', data); }
        else if (data.t === 'bye') { this.connected = false; this._emit('disconnected'); }
        else { this._emit('message', data); }
      }
    });

    client.on('error', err => { clearTimeout(brokerTimer); this._emit('error', '连接错误：' + (err.message || err)); });
    client.on('offline', () => { clearTimeout(brokerTimer); if (this.connected) { this.connected = false; this._emit('disconnected'); } });
  },

  _pub(msg) {
    if (!this._client || !this.roomCode) return;
    const role = this.isHost ? 'host' : 'guest';
    try { this._client.publish(this._topic(), JSON.stringify({ ...msg, _from: role }), { qos: 1 }); }
    catch(e) { console.error('Net pub error', e); }
  },

  // 房主：创建房间
  host() {
    this.isHost = true;
    this.connected = false;
    const code = this._genCode();
    this._connect(code, () => this._emit('hosted', code));
  },

  // 访客：加入房间
  join(code) {
    code = (code || '').trim().toUpperCase();
    this.isHost = false;
    this.connected = false;
    this._connect(code, () => {
      this._pub({ t: 'join' });
      this._joinTimer = setTimeout(() => {
        if (!this.connected) this._emit('error', '连接超时（15s），请确认房间码正确且房主在线');
      }, 15000);
    });
  },

  send(msg) { if (this.connected) this._pub(msg); },

  disconnect() {
    if (this._joinTimer) { clearTimeout(this._joinTimer); this._joinTimer = null; }
    if (this.connected) { try { this._pub({ t: 'bye' }); } catch(e){} }
    try { if (this._client) this._client.end(true); } catch(e){}
    this._client = null; this.connected = false; this.roomCode = null;
  },
};

// ── coop-game.js ─────────────────────────────────────────────────────────────
const CoopGame = {
  _coopCs: null,

  // 初始化联机战斗状态（仅房主调用）
  init(hostCharId, guestCharId, enemyIds, opts) {
    opts = opts || {};
    const hChar = Data.characters.find(c => c.id === hostCharId);
    const gChar = Data.characters.find(c => c.id === guestCharId);
    const enemies = enemyIds.map(id => Data.makeEnemy(id));
    // 双人模式敌人 HP × 1.8（伤害保持不变）
    enemies.forEach(e => {
      const newMax = Math.round(e.maxHp * 1.8);
      e.maxHp = newMax;
      e.hp = newMax;
    });
    enemies.forEach(e => {
      const r = Data.enemies[e.id].getIntent(e);
      e.currentIntent = Array.isArray(r) ? r : [r];
    });
    // 持续 run 数据：HP 在战斗外保留，deck 持久
    const hostDeck = opts.hostDeck ? [...opts.hostDeck] : [...hChar.startingDeck];
    const guestDeck = opts.guestDeck ? [...opts.guestDeck] : [...gChar.startingDeck];
    const hostHp = (opts.hostHp != null) ? opts.hostHp : hChar.hp;
    const hostMaxHp = (opts.hostMaxHp != null) ? opts.hostMaxHp : hChar.maxHp;
    const guestHp = (opts.guestHp != null) ? opts.guestHp : gChar.hp;
    const guestMaxHp = (opts.guestMaxHp != null) ? opts.guestMaxHp : gChar.maxHp;
    // 根据 deck + per-index 升级表，构建 {cardId: [lvl, lvl, ...]} 升级队列
    const buildUpgradeMap = (deck, upgrades) => {
      const map = {};
      if (!upgrades) return map;
      deck.forEach((cardId, idx) => {
        const lvl = upgrades[idx] || 0;
        if (lvl > 0) {
          if (!map[cardId]) map[cardId] = [];
          map[cardId].push(lvl);
        }
      });
      return map;
    };
    const coopCs = {
      host: { hp: hostHp, maxHp: hostMaxHp, block: 0, buffs: {}, debuffs: {}, charId: hChar.id, charName: hChar.name, charEmoji: hChar.emoji },
      guest: { hp: guestHp, maxHp: guestMaxHp, block: 0, buffs: {}, debuffs: {}, charId: gChar.id, charName: gChar.name, charEmoji: gChar.emoji },
      enemies,
      hostEnergy: 3, hostMaxEnergy: 3,
      hostHand: [], hostDrawPile: [...hostDeck].sort(() => Math.random() - 0.5),
      hostDiscardPile: [], hostHandUpgrades: {},
      // 升级数据：来自 _coopRun.hostUpgrades / guestUpgrades
      hostDeckSnapshot: [...hostDeck], hostUpgradesSnapshot: { ...(opts.hostUpgrades||{}) },
      hostUpgradeMap: buildUpgradeMap(hostDeck, opts.hostUpgrades),
      guestEnergy: 3, guestMaxEnergy: 3,
      guestHand: [], guestDrawPile: [...guestDeck].sort(() => Math.random() - 0.5),
      guestDiscardPile: [], guestHandUpgrades: {},
      guestDeckSnapshot: [...guestDeck], guestUpgradesSnapshot: { ...(opts.guestUpgrades||{}) },
      guestUpgradeMap: buildUpgradeMap(guestDeck, opts.guestUpgrades),
      turn: 1,
      // 同时行动模式：双方都在 'player' 阶段同时打牌，各自点结束回合后才进入 'enemy'
      phase: 'player',
      hostEnded: false,
      guestEnded: false,
      // 私有交互（赛车手换挡/赛线预判等）— 触发方设置，对方屏幕显示等待 banner
      pendingInteraction: null, // { who: 'host'|'guest', label: '换挡选择' }
    };
    // 同时行动：双方各自抽 5 张起始手牌（射手 6 张）
    this._drawCards(coopCs, 'host', hChar.id==='archer'?6:5);
    this._drawCards(coopCs, 'guest', gChar.id==='archer'?6:5);
    this._coopCs = coopCs;
    return coopCs;
  },

  _drawCards(coopCs, who, n) {
    const hand = who === 'host' ? coopCs.hostHand : coopCs.guestHand;
    const draw = who === 'host' ? coopCs.hostDrawPile : coopCs.guestDrawPile;
    const discard = who === 'host' ? coopCs.hostDiscardPile : coopCs.guestDiscardPile;
    const handUpg = who === 'host' ? coopCs.hostHandUpgrades : coopCs.guestHandUpgrades;
    const upgMap = who === 'host' ? coopCs.hostUpgradeMap : coopCs.guestUpgradeMap;
    const deckSnap = who === 'host' ? coopCs.hostDeckSnapshot : coopCs.guestDeckSnapshot;
    const upgSnap = who === 'host' ? coopCs.hostUpgradesSnapshot : coopCs.guestUpgradesSnapshot;
    for (let i = 0; i < n; i++) {
      if (draw.length === 0) {
        if (discard.length === 0) break;
        const shuffled = [...discard].sort(() => Math.random() - 0.5);
        discard.length = 0;
        draw.push(...shuffled);
        // 洗牌：重建 upgradeMap，让升级在重洗后继续生效
        const fresh = {};
        if (upgSnap && deckSnap) {
          deckSnap.forEach((cardId, idx) => {
            const lvl = upgSnap[idx] || 0;
            if (lvl > 0) { if (!fresh[cardId]) fresh[cardId] = []; fresh[cardId].push(lvl); }
          });
        }
        // 用新表替换（保留引用）
        Object.keys(upgMap).forEach(k => delete upgMap[k]);
        Object.assign(upgMap, fresh);
      }
      const drawnCard = draw.shift();
      hand.push(drawnCard);
      // 应用升级等级到 handUpgrades
      if (upgMap && upgMap[drawnCard] && upgMap[drawnCard].length > 0) {
        const lvl = upgMap[drawnCard].shift();
        handUpg[hand.length - 1] = lvl;
        if (upgMap[drawnCard].length === 0) delete upgMap[drawnCard];
      }
    }
  },

  // 为 State.run getter 提供一个假的 run，避免在联机模式下抛出异常
  _withFakeRun(charId, fn) {
    const prev = State.current.run;
    State.current.run = { character: { id: charId }, relics: [], cardUpgrades: {}, deck: [], mode: 'coop' };
    try { return fn(); } finally { State.current.run = prev; }
  },

  // 处理玩家打牌（房主端执行）— 同时行动模式：玩家阶段任何未结束回合的人都能打
  playCard(coopCs, who, cardId, targetEnemyIndex, handIndex) {
    if (coopCs.phase !== 'player') return false;
    // 已经点了结束回合的玩家不能再打牌
    if ((who === 'host' && coopCs.hostEnded) || (who === 'guest' && coopCs.guestEnded)) return false;
    const hand = who === 'host' ? coopCs.hostHand : coopCs.guestHand;
    const discard = who === 'host' ? coopCs.hostDiscardPile : coopCs.guestDiscardPile;
    const player = coopCs[who];
    const energyKey = who + 'Energy';

    // 确认手牌索引
    const idx = (handIndex !== undefined && handIndex >= 0 && handIndex < hand.length && hand[handIndex] === cardId)
      ? handIndex : hand.indexOf(cardId);
    if (idx === -1) return false;

    const def = Data.cards[cardId];
    if (!def) return false;
    if (coopCs[energyKey] < def.cost) return false;
    if (def.needsTarget) {
      const t = coopCs.enemies[targetEnemyIndex];
      if (!t || t.hp <= 0) return false;
    }

    // 取出该手牌的升级等级（来自 handUpgrades）
    const handUpgKey = who + 'HandUpgrades';
    const handUpg = coopCs[handUpgKey] || {};
    const upgradeLv = handUpg[idx] || 0;

    coopCs[energyKey] -= def.cost;
    hand.splice(idx, 1);
    // splice 后重建 handUpgrades 索引（后面的索引整体 -1，被打出的那张丢弃）
    const newHandUpg = {};
    Object.keys(handUpg).forEach(k => {
      const ki = parseInt(k);
      if (ki < idx) newHandUpg[ki] = handUpg[ki];
      else if (ki > idx) newHandUpg[ki - 1] = handUpg[ki];
    });
    coopCs[handUpgKey] = newHandUpg;

    // 构造一个临时 cs 对象供 card effect 使用
    const tempCs = this._makeTempCs(coopCs, who);
    this._withFakeRun(player.charId, () => def.effect(tempCs, targetEnemyIndex, upgradeLv));
    // 将 tempCs 中的变化写回 coopCs
    this._applyTempCs(coopCs, who, tempCs);

    if (def.type !== 'power') discard.push(cardId);

    // 检查胜利条件
    if (coopCs.enemies.every(e => e._dead || e.hp <= 0)) {
      coopCs.enemies.forEach(e => { if (e.hp <= 0) { e._dead = true; e.hp = 0; } });
      coopCs.phase = 'victory';
    }
    return true;
  },

  // 构造一个临时 cs 供现有 card effect 函数使用
  _makeTempCs(coopCs, who) {
    const player = coopCs[who];
    const isRacer = player.charId === 'racer';
    const isArcher = player.charId === 'archer';
    return {
      player: { hp: player.hp, maxHp: player.maxHp, block: player.block, buffs: { ...player.buffs }, debuffs: { ...player.debuffs } },
      enemies: coopCs.enemies,
      energy: coopCs[who + 'Energy'],
      maxEnergy: coopCs[who + 'MaxEnergy'],
      hand: who === 'host' ? coopCs.hostHand : coopCs.guestHand,
      drawPile: who === 'host' ? coopCs.hostDrawPile : coopCs.guestDrawPile,
      discardPile: who === 'host' ? coopCs.hostDiscardPile : coopCs.guestDiscardPile,
      exhaustPile: [],
      handUpgrades: who === 'host' ? coopCs.hostHandUpgrades : coopCs.guestHandUpgrades,
      turn: coopCs.turn,
      phase: 'player',
      // 角色专属字段（赛车手 / 射手）
      gear: isRacer ? (coopCs[who+'Gear'] != null ? coopCs[who+'Gear'] : 2) : undefined,
      speed: isRacer ? (coopCs[who+'Speed'] || 0) : undefined,
      momentum: isRacer ? (coopCs[who+'Momentum'] || 0) : undefined,
      charge: isArcher ? (coopCs[who+'Charge'] || 0) : undefined,
      chargeMax: isArcher ? (coopCs[who+'ChargeMax'] || 5) : undefined,
      // stubs for single-player-only features
      _coopWho: who,
      _coopCs: coopCs,
    };
  },

  // 将 tempCs 中玩家和敌人状态写回 coopCs
  _applyTempCs(coopCs, who, tempCs) {
    const player = coopCs[who];
    player.hp = tempCs.player.hp;
    player.maxHp = tempCs.player.maxHp;
    player.block = tempCs.player.block;
    player.buffs = tempCs.player.buffs;
    player.debuffs = tempCs.player.debuffs;
    coopCs[who + 'Energy'] = tempCs.energy;
    // 写回角色专属字段
    if (tempCs.gear !== undefined) coopCs[who+'Gear'] = tempCs.gear;
    if (tempCs.speed !== undefined) coopCs[who+'Speed'] = tempCs.speed;
    if (tempCs.momentum !== undefined) coopCs[who+'Momentum'] = tempCs.momentum;
    if (tempCs.charge !== undefined) coopCs[who+'Charge'] = tempCs.charge;
    if (tempCs.chargeMax !== undefined) coopCs[who+'ChargeMax'] = tempCs.chargeMax;
    // 敌人已是引用，不需要额外写回
    // 如果 tempCs 抽了牌（drawCards 修改了 hand/draw/discard 数组引用），已同步
  },

  // 标记某玩家点了"结束回合"。双方都点了之后才会真正进入敌方回合。
  // 返回 true 表示双方都已结束、调用者应当接着跑 runEnemyTurn；否则返回 false。
  markEnded(coopCs, who) {
    if (coopCs.phase !== 'player') return false;
    if (who === 'host') {
      if (coopCs.hostEnded) return false;
      coopCs.hostEnded = true;
    } else {
      if (coopCs.guestEnded) return false;
      coopCs.guestEnded = true;
    }
    return coopCs.hostEnded && coopCs.guestEnded;
  },

  // 兼容旧调用：直接结束某玩家回合（同时模式下相当于打 ended 标记）。
  endPlayerTurn(coopCs, who) {
    return this.markEnded(coopCs, who);
  },

  _tickDebuffs(entity) {
    const manual = new Set(['burn', 'freeze', 'wound']);
    Object.keys(entity.debuffs || {}).forEach(k => {
      if (!manual.has(k)) entity.debuffs[k] = Math.max(0, entity.debuffs[k] - 1);
    });
  },

  // 敌方回合逻辑（同时行动模式）：在双方都点了结束回合后调用
  runEnemyTurn(coopCs) {
    coopCs.phase = 'enemy';

    // 双方各自弃手牌 + tick debuffs
    ['host', 'guest'].forEach(who => {
      const hand = who === 'host' ? coopCs.hostHand : coopCs.guestHand;
      const discard = who === 'host' ? coopCs.hostDiscardPile : coopCs.guestDiscardPile;
      discard.push(...hand);
      hand.length = 0;
      this._tickDebuffs(coopCs[who]);
    });

    // 清敌人格挡
    coopCs.enemies.forEach(e => { if (!e._dead) e.block = 0; });

    // 构造一个可以传入 Data.enemies[id].doAction 的临时 cs
    // 敌人 doAction 会调用 Combat.enemyAttack(cs, enemyIndex, amount)
    // 我们需要让伤害分配到双方玩家（简化：各承担一半，或随机分配一个）
    // 简化实现：敌人攻击轮流作用于房主和访客
    let attackTarget = 'host'; // 交替攻击

    const tempCs = {
      player: { hp: coopCs.host.hp, maxHp: coopCs.host.maxHp, block: coopCs.host.block, buffs: { ...coopCs.host.buffs }, debuffs: { ...coopCs.host.debuffs } },
      enemies: coopCs.enemies,
      energy: 0, maxEnergy: 0,
      hand: [], drawPile: [], discardPile: [], exhaustPile: [],
      handUpgrades: {},
      turn: coopCs.turn,
      phase: 'enemy',
      // 标记当前受击对象
      _coopEnemyTarget: coopCs.host,
      _coopEnemyTargetGuest: coopCs.guest,
      _coopEnemyAttackCount: 0,
    };

    const hostAlive = coopCs.host.hp > 0;
    const guestAlive = coopCs.guest.hp > 0;
    coopCs.enemies.forEach((e, i) => {
      if (e._dead || e.hp <= 0) return;
      if ((e.debuffs.freeze || 0) > 0) {
        e.debuffs.freeze = Math.max(0, e.debuffs.freeze - 1);
        return;
      }
      // 同时行动模式：按 index 决定目标，偶数攻房主、奇数攻访客；
      // 若一方已倒下，攻击全部落到活着的另一方身上。
      let targetWho;
      if (!hostAlive && !guestAlive) return;
      else if (!hostAlive) targetWho = 'guest';
      else if (!guestAlive) targetWho = 'host';
      else targetWho = (i % 2 === 0) ? 'host' : 'guest';
      const targetPlayer = coopCs[targetWho];
      tempCs.player = { hp: targetPlayer.hp, maxHp: targetPlayer.maxHp, block: targetPlayer.block, buffs: { ...targetPlayer.buffs }, debuffs: { ...targetPlayer.debuffs } };

      try { this._withFakeRun(coopCs.host.charId, () => Data.enemies[e.id].doAction(tempCs, i)); } catch(err) { console.error('CoopGame enemy doAction error', err); }

      // 写回受击玩家状态
      targetPlayer.hp = tempCs.player.hp;
      targetPlayer.block = tempCs.player.block;
      targetPlayer.buffs = tempCs.player.buffs;
      targetPlayer.debuffs = tempCs.player.debuffs;

      // 燃烧
      const burnStacks = e.debuffs.burn || 0;
      if (burnStacks > 0) {
        e.hp = Math.max(0, e.hp - burnStacks);
        e.debuffs.burn = burnStacks - 1;
        if (e.hp <= 0) e._dead = true;
      }
      this._tickDebuffs(e);
      e.actionIndex = (e.actionIndex || 0) + 1;
    });

    // 检查死亡
    if (coopCs.host.hp <= 0) coopCs.host.hp = 0;
    if (coopCs.guest.hp <= 0) coopCs.guest.hp = 0;

    // 检查胜败
    if (coopCs.enemies.every(e => e._dead || e.hp <= 0)) {
      coopCs.enemies.forEach(e => { if (e.hp <= 0) { e._dead = true; e.hp = 0; } });
      coopCs.phase = 'victory';
      return;
    }
    if (coopCs.host.hp <= 0 && coopCs.guest.hp <= 0) {
      coopCs.phase = 'defeat';
      return;
    }

    // 下一回合（同时行动模式）：双方一起重置
    coopCs.turn++;
    coopCs.phase = 'player';
    coopCs.hostEnded = false;
    coopCs.guestEnded = false;
    coopCs.host.block = 0;
    coopCs.guest.block = 0;
    coopCs.hostEnergy = coopCs.hostMaxEnergy;
    coopCs.guestEnergy = coopCs.guestMaxEnergy;
    if (coopCs.host.hp > 0) this._drawCards(coopCs, 'host', 5);
    if (coopCs.guest.hp > 0) this._drawCards(coopCs, 'guest', 5);
    // 更新敌人意图
    coopCs.enemies.forEach(e => {
      if (!e._dead) {
        try {
          const r = Data.enemies[e.id].getIntent(e);
          e.currentIntent = Array.isArray(r) ? r : [r];
        } catch(err) {}
      }
    });
  },

  // 序列化（去掉函数，保留数据）
  serialize(coopCs) {
    return JSON.parse(JSON.stringify(coopCs, (k, v) => typeof v === 'function' ? undefined : v));
  },
};

// ── ui.js ─────────────────────────────────────────────────────────────────────
const DAYAN_IMG_SRC = 'manus-storage/img_03_574k_632f1438.png';
const WANGWEI_IMG_SRC = 'manus-storage/wangwei_sprite_nobg_90111a38.png';
const IRON_STOMACH_IMG_SRC = 'manus-storage/img_00_572k_79c2d105.png';
const UI = {
  _selectedCard:null, _drag:null,
  app(){ return document.getElementById('app'); },
  renderCard(cardId, overrideCost, upgradeLevel, inCombatHand=false){
    const def=Data.cards[cardId];if(!def)return document.createElement('div');
    const el=document.createElement('div');el.className='card';el.dataset.cardId=cardId;el.dataset.type=def.type;
    // 防御类技能（主效果为格挡）→ 蓝色色条；其余技能 → 紫色
    const DEFENSE_CARDS = new Set([
      'box_guard','box_iron_step','box_footwork','box_endure','box_dodge_punch',
      'gear_defend','gear_lock','corner_line','corner_guard','pit_repair',
      'br_shield_wall','br_grit','armaments','shrug',
      'ar_block_charge','ar_roll','ar_wind_step','ar_gale','ar_dodge'
    ]);
    if(def.type==='skill' && DEFENSE_CARDS.has(cardId)) el.dataset.subtype='defend';
    // 升级后可能改变费用
    let _upgradedCost = def.cost;
    if(upgradeLevel > 0){
      const _upgDef2 = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][upgradeLevel];
      if(_upgDef2 && _upgDef2.cost !== undefined) _upgradedCost = _upgDef2.cost;
    }
    const displayCost = overrideCost !== undefined ? overrideCost : _upgradedCost;
    // 实时档位描述：如果当前在战斗中且是赛车手，动态计算实际数值
    // 升级描述：如果有升级等级，显示升级后的描述
    let desc = def.description;
    if(upgradeLevel > 0){
      const upgDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][upgradeLevel];
      if(upgDef && upgDef.desc) desc = upgDef.desc;
    }
    const cs = State.run?.combat;
    const isRacer = State.run?.character?.id === 'racer';
    if(cs && isRacer && inCombatHand){
      const g = cs.gear || 2;
      const atkMul = [0, 0.8, 1.0, 1.5][g];
      const blkMul = [0, 1.4, 1.0, 0.7][g];
      const spd = cs.speed || 0;
      const ft = (cs.player?.buffs?.full_throttle||0) > 0;
      const ftBonus = Combat._getFtBonus(cs);
      const str = cs.player?.buffs?.strength || 0;
      const spdAtk = spd>=60?5:(spd>=30?2:0);
      const dmgExtra = str + spdAtk; // 力量+速度感攻击加成（在 dealDamage 里自动加）
      const gearLabel = ['','<span style="color:#7dccff">1挡</span>','<span style="color:#e0e0e0">2挡</span>','<span style="color:#ff7d7d">3挡</span>'][g];
      const RACER_CARDS = {
        gear_strike: ()=>{ const d=Math.floor(6*atkMul)+ftBonus+dmgExtra; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_defend: ()=>{ const d=Math.floor(5*blkMul); const rl=(cs.player?.buffs?.redline||0)>0; return `获得 <b>${rl&&g===3?5:d}</b> 点格挡。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_brake:  ()=>{ const base=[10,13,16][upgradeLevel||0]||10; const slow=[2,2,3][upgradeLevel||0]||2; const d=Math.floor(base*atkMul)+ftBonus+dmgExtra; const extra=g>=3?` <span style="color:#f9ca24">并施加 ${slow} 层「减速」</span>`:''; return `造成 <b>${d}</b> 点伤害。${extra}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        nitro_boost: ()=>{ const d=(g>=3?18:Math.floor(14*atkMul)+ftBonus)+dmgExtra; const note=g>=3?'<span style="color:#f9ca24">已处于最高挡，改为直接造成 18 伤</span>':'<span style="opacity:0.8">升至 3 挡</span>'; return `造成 <b>${d}</b> 点伤害。${note}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        collision_block: ()=>{ const lv=upgradeLevel||0; const blkBase=[5,6,7][lv]||5; const dmgBase=[7,9,10][lv]||7; const blk=Math.floor(blkBase*blkMul); const dmg=Math.floor(dmgBase*atkMul)+ftBonus+dmgExtra; return `获得 <b>${blk}</b> 点格挡，造成 <b>${dmg}</b> 点伤害${lv>=2?' 并施加 1 层易伤':''}。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        drift_charge: ()=>{ const lv=upgradeLevel||0; const base2=[6,7,7][lv]||6; const step2=[20,20,16][lv]||20; const base=Math.floor(base2*atkMul)+ftBonus+dmgExtra; const extra=Math.min(Math.floor(spd/step2)*2,8); return `对所有敌人造成 <b>${base}</b> 点伤害，速度感加成 <b>+${extra}</b>（每满${step2}点+2，上限+8）。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        overtake:    ()=>{ const d=Math.floor(5*atkMul)+ftBonus+dmgExtra; const free=g>=3?'<span style="color:#7dff7d">【免费】</span>':''; return `造成 <b>${d}+${d}</b> 点伤害（两段）。${free}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        turbo_crush: ()=>{ const d=8*g+dmgExtra; const note=g>=3?'<span style="color:#f9ca24">降至 1 挡</span>':'<span style="color:#f9ca24">降 2 挡</span>'; return `造成 <b>${d}</b> 点伤害。${note}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        pit_repair:  ()=>{ const d=Math.floor(10*blkMul); const heal=g<=2?'<span style="color:#7dff7d">额外回血 6 HP</span>':''; return `获得 <b>${d}</b> 点格挡。${heal}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_lock:   ()=>{ const d=(cs.gear||2)*3; return `本回合挡位锁定。获得 <b>${d}</b> 点格挡。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        overspeed:   ()=>{ const d=g>=3?16+ftBonus+dmgExtra:0; const lv=upgradeLevel||0; const csmark=lv>=2?'':' 消耗。'; return g>=3?`造成 <b>${d}</b> 点伤害并降 1 挡。${csmark}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`:`<span style="color:#888">当前不在 3 挡，此牌无效果。</span>`; },
        speed_rush:  ()=>{ const lv=upgradeLevel||0; const base=[3,4,5][lv]||3; const spMult=[3,4,5][lv]||3; const d=Math.floor(base*atkMul)+ftBonus; const sp=g*spMult; return `造成 <b>${d}</b> 点伤害，获得 <b>${sp}</b> 点速度感（当前${spd}）。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        corner_guard:()=>{ const lv=upgradeLevel||0; const base=[5,6,7][lv]||5; const extra=cs._shiftedUpThisTurn?([3,4,5][lv]||3):0; return `获得 <b>${base+extra}</b> 点格挡${cs._shiftedUpThisTurn?'（已升挡加成）':''}。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        inertia_strike:()=>{ const lv=upgradeLevel||0; const base=[8,9,10][lv]||8; const spBonus=Math.floor((spd||0)/20)*2; const d=Math.floor((base+spBonus)*atkMul)+ftBonus; return `造成 <b>${d}</b> 点伤害（基础${base}+速度感加成${spBonus}，×档位倍率）。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel} · 速度感每满20点+2</span>`; },
        speed_limit_break:()=>{ const lv=upgradeLevel||0; const thr=lv>=1?30:40; const ok=(spd||0)>=thr; return ok?`<span style="color:#7dff7d">✅ 速度感 ${spd} ≥ ${thr}，本回合 +1 能量。</span>`:`<span style="color:#ff7d7d">❌ 速度感 ${spd} 未达 ${thr}，无效果。</span>`; },
        corner_line: ()=>{ const lv=upgradeLevel||0; const baseUp=lv>=1?10:8; const baseNo=lv>=1?6:5; const extra=lv>=2&&cs._shiftedUpThisTurn?' +抽1张':''; const blk=cs._shiftedUpThisTurn?baseUp:baseNo; return `获得 <b>${blk}</b> 点格挡${extra}（${cs._shiftedUpThisTurn?'已升挡':'未升挡'}）。`; },
        fuel_save:   ()=>{ const lv=upgradeLevel||0; const scope=lv>=2?'所有牌':'技能牌'; return `降1挡。本回合${scope}费用 -1（最低0）。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
      };
      if(RACER_CARDS[cardId]) desc = RACER_CARDS[cardId]();
    }
    // ── 射手：根据当前蓄力值实时计算并显示实际伤害 ──
    const isArcher = State.run?.character?.id === 'archer';
    if(cs && isArcher && inCombatHand){
      const charge = cs.charge || 0;
      const chargeMax = cs.chargeMax || 5;
      const chargeBar = `<span style="font-size:0.72em;opacity:0.75">蓄力 ${charge}/${chargeMax}</span>`;
      const lv = upgradeLevel || 0;
      const str = cs.player?.buffs?.strength || 0;
      const ARCHER_CARDS = {
        ar_shoot: ()=>{
          const base = lv>=1?5:3;
          const total = base + charge*3 + str;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×3${str?'+力量'+str:''}）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_charge_shot: ()=>{
          const base = lv>=1?6:4;
          const mult = lv>=2?4:3;
          const total = base + charge*mult + str;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×${mult}${str?'+力量'+str:''}）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_vuln_arrow: ()=>{
          const base = lv>=1?5:3;
          const mult = lv>=2?3:2;
          const vuln = lv>=1?2:1;
          const total = base + charge*mult + str;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×${mult}${str?'+力量'+str:''}），施加 ${vuln} 层易伤。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_double_shot: ()=>{
          const base = lv>=2?5:(lv>=1?4:3);
          const mult = lv>=2?3:2;
          const single = base + charge*mult + str;
          const total = single * 2;
          return `造成 <b>${single}</b> 点伤害 2 次（共 <b>${total}</b> 点）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_pierce: ()=>{
          const base = lv>=1?10:8;
          const mult = lv>=2?4:3;
          const total = base + charge*mult + str;
          return `造成 <b>${total}</b> 点伤害（无视格挡）（基础${base}+蓄力${charge}×${mult}${str?'+力量'+str:''}）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_rapid_fire: ()=>{
          const base = lv>=1?5:4;
          const single = base + charge*2 + str;
          const total = single * 3;
          return `造成 <b>${single}</b> 点伤害 3 次（共 <b>${total}</b> 点）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_arrow_rain: ()=>{
          const base = lv>=2?5:(lv>=1?4:3);
          const single = base + charge*2 + str;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = single * 2 * enemyCount;
          return `对所有敌人造成 <b>${single}</b> 点伤害 2 次（共 <b>${total}</b> 点，${enemyCount}个目标）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_full_charge: ()=>{
          const threshold = lv>=2?4:chargeMax;
          const dmg = (lv>=1?38:30) + str;
          const canFire = charge >= threshold;
          if(canFire) return `消耗全部蓄力，造成 <b>${dmg}</b> 点伤害。<br><span style="color:#f9ca24">✅ 蓄力已满足（${charge}/${threshold}）</span>`;
          return `<span style="color:#ff7d7d">❌ 需要蓄力 ≥ ${threshold}（当前 ${charge}）</span>，造成 <b>${dmg}</b> 点伤害。<br>${chargeBar}`;
        },
        ar_pierce_all: ()=>{
          const base = lv>=1?10:8;
          const single = base + charge*3 + str;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = single * enemyCount;
          return `对所有敌人造成 <b>${single}</b> 点伤害（共 <b>${total}</b> 点，${enemyCount}个目标）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_ultimate: ()=>{
          const base = lv>=1?7:6;
          const single = base + charge*3 + str;
          const total = single * 4;
          return `造成 <b>${single}</b> 点伤害 4 次（共 <b>${total}</b> 点）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_block_charge: ()=>{
          const mult = lv>=1?3:2;
          const chgGain = lv>=2?2:1;
          const blk = charge * mult;
          return `获得 <b>${blk}</b> 点格挡（蓄力${charge}×${mult}），然后获得 ${chgGain} 点蓄力。<br>${chargeBar}`;
        },
        ar_aim: ()=>{
          const amt = lv>=1?3:2;
          const draw = lv>=2?' 抽 1 张牌。':'';
          return `获得 <b>${amt}</b> 点蓄力。${draw}<br>${chargeBar}`;
        },
        ar_dodge: ()=>{
          const blk = lv>=1?6:4;
          const chg = lv>=2?2:1;
          return `获得 <b>${blk}</b> 点格挡，获得 <b>${chg}</b> 点蓄力。<br>${chargeBar}`;
        },
        ar_sprint: ()=>{
          const blk = lv>=1?5:3;
          return `获得 <b>${blk}</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。<br>${chargeBar}`;
        },
        ar_focus_aim: ()=>{
          const amt = lv>=1?4:3;
          const exhaust = lv>=2?'':'消耗。';
          return `获得 <b>${amt}</b> 点蓄力。${exhaust}<br>${chargeBar}`;
        },
        ar_scatter: ()=>{
          const base = [2,3,4][lv]||2;
          const chgGain = [1,1,2][lv]||1;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = base * enemyCount;
          return `对所有敌人造成 <b>${base}</b> 点伤害（共<b>${total}</b>点，${enemyCount}个目标），获得 <b>${chgGain}</b> 点蓄力。<br>${chargeBar}`;
        },
        ar_weak_arrow: ()=>{
          const base = [3,4,5][lv]||3;
          const vulnAmt = [1,1,2][lv]||1;
          return `造成 <b>${base}</b> 点伤害，施加 <b>${vulnAmt}</b> 层虚弱，获得 <b>1</b> 点蓄力。<br>${chargeBar}`;
        },
        ar_dodge_counter: ()=>{
          const blk = [5,6,8][lv]||5;
          const chgGain = lv>=2?4:3;
          const cond = cs._tookDamageThisCombat?`<span style="color:#7dff7d">✅ 已受伤，额外+${chgGain}蓄力</span>`:'<span style="opacity:0.7">（未受伤则无额外蓄力）</span>';
          return `获得 <b>${blk}</b> 点格挡。${cond}<br>${chargeBar}`;
        },
        ar_hunter_rhythm: ()=>{
          const amt = lv>=1?3:2;
          const exhaust = lv>=2?'':'消耗。';
          return `获得 <b>${amt}</b> 点蓄力，抽 <b>1</b> 张牌。${exhaust}<br>${chargeBar}`;
        },
        ar_arrow_storm: ()=>{
          const c = charge;
          const base = [2,3,3][lv]||2;
          const single = base + c;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = single * 4 * enemyCount;
          return `对所有敌人造成 <b>${single}</b> 点伤害 4 次（共 <b>${total}</b> 点，${enemyCount}个目标）。消耗全部蓄力。<br>${chargeBar}`;
        },
      };
      if(ARCHER_CARDS[cardId]) desc = ARCHER_CARDS[cardId]();
    }
    // ── 拳击手：根据愤怒/搏命/上回合受击实时计算卡面 ──
    const isBoxer = State.run?.character?.id === 'boxer';
    if(cs && isBoxer && inCombatHand){
      const fury = cs.player?.buffs?.fury || 0;
      const berserk = Combat._getBoxerBerserk(cs);
      const str = cs.player?.buffs?.strength || 0;
      const bonus = fury + berserk + str;
      const tookLast = (cs.damageTakenLastTurn||0) > 0;
      const lv = upgradeLevel || 0;
      const bonusTag = bonus>0?`<span style="font-size:0.72em;opacity:0.85;color:#ff9060"> (+${bonus})</span>`:'';
      const BOXER_CARDS = {
        box_jab:       ()=>{ const d=([5,7,10][lv]||5)+bonus; return `造成 <b>${d}</b> 点伤害。${bonusTag}`; },
        box_cross:     ()=>{ const d=([9,12,15][lv]||9)+bonus; return `造成 <b>${d}</b> 点伤害。${bonusTag}`; },
        box_uppercut:  ()=>{ const base=tookLast?([22,26,30][lv]||22):([10,13,16][lv]||10); const d=base+bonus; const tag=tookLast?'<span style="color:#7dff7d">已挨打</span>':'<span style="color:#888">未挨打</span>'; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.85">${tag}${bonusTag}</span>`; },
        box_combo:     ()=>{ const each=([3,4,5][lv]||3)+bonus; return `造成 3 段 <b>${each}</b> 点伤害。${bonusTag}`; },
        box_body_blow: ()=>{ const d=([10,13,16][lv]||10)+bonus; const weak=[1,1,2][lv]||1; return `造成 <b>${d}</b> 点伤害，施加 ${weak} 层虚弱。${bonusTag}`; },
        box_counter:   ()=>{ const has=fury>0; const d=has?([10,13,16][lv]||10)+bonus:([5,7,9][lv]||5)+bonus; const tag=has?'<span style="color:#ff9060">愤怒触发</span>':'<span style="opacity:0.7">普通</span>'; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em">${tag}${has?'（将消耗愤怒）':''}</span>`; },
        box_haymaker:  ()=>{ const mult=[3,4,5][lv]||3; const baseD=[14,18,22][lv]||14; const d=baseD+fury*mult+berserk; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.85">基础${baseD}+愤怒${fury}×${mult}+搏命${berserk}</span>`; },
        box_rage_combo:()=>{ const thr=[3,2,2][lv]||3; if(fury>=thr){ const each=([3,4,5][lv]||3)+fury+bonus; return `3 段 <b>${each}</b> 点伤害。<br><span style="font-size:0.78em;color:#7dff7d">愤怒 ${fury} 已触发</span>`; } else { const d=([6,8,10][lv]||6)+bonus; return `1 段 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.7">需要愤怒 ≥ ${thr}</span>`; } },
        box_taunt:     ()=>{ const fg=[2,3,3][lv]||2; return `获得 <b>${fg}</b> 点愤怒。消耗。<br><span style="font-size:0.78em;opacity:0.7">当前愤怒 ${fury}</span>`; },
        box_second_wind:()=>{ const half=cs.player.maxHp/2; const heal=cs.player.hp<half?([12,14,16][lv]||12):([8,10,12][lv]||8); return `回复 <b>${heal}</b> 点 HP。<br><span style="font-size:0.78em;opacity:0.7">${cs.player.hp<half?'已触发血量加成':'血量充足时为基础值'}</span>`; },
        box_guard:     ()=>{ const d=[6,8,11][lv]||6; return `获得 <b>${d}</b> 点格挡。`; },
        box_iron_step: ()=>{ const d=[10,13,16][lv]||10; return `获得 <b>${d}</b> 点格挡。`; },
      };
      if(BOXER_CARDS[cardId]) desc = BOXER_CARDS[cardId]();
    }
    // ── 战士（Brute）：力量加成实时显示 ──
    const isBrute = State.run?.character?.id === 'brute';
    if(cs && isBrute && inCombatHand){
      const str = cs.player?.buffs?.strength || 0;
      const lv = upgradeLevel || 0;
      const strTag = str>0?`<span style="font-size:0.72em;opacity:0.85;color:#ff9060"> (+力量${str})</span>`:'';
      const BRUTE_CARDS = {
        strike:      ()=>{ const d=([6,9,12][lv]||6)+str; return `造成 <b>${d}</b> 点伤害。${strTag}`; },
        defend:      ()=>{ const d=[5,8,11][lv]||5; return `获得 <b>${d}</b> 点格挡。`; },
        bash:        ()=>{ const baseD=lv>=1?10:8; const vuln=lv>=1?3:2; const d=baseD+str; return `造成 <b>${d}</b> 点伤害并施加 <b>${vuln}</b> 层易伤。${strTag}`; },
        clash:       ()=>{ const all=cs.hand.every(id=>Data.cards[id]&&Data.cards[id].type==='attack'); const full=[12,16,20][lv]||12; const half=[5,7,9][lv]||5; const d=(all?full:half)+str; const tag=all?'<span style="color:#7dff7d">手牌全攻击</span>':'<span style="color:#888">手牌非全攻击</span>'; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em">${tag}${strTag}</span>`; },
        pommel:      ()=>{ const d=9+str; const draw=lv>=1?2:1; return `造成 <b>${d}</b> 点伤害，摸 ${draw} 张牌。${strTag}`; },
        shrug:       ()=>{ const blk=lv>=1?11:8; const draw=lv>=2?2:1; return `获得 <b>${blk}</b> 点格挡，摸 ${draw} 张牌。`; },
        armaments:   ()=>{ return lv>=2?`获得 <b>5</b> 点格挡，升级手牌中<b>所有</b>牌。`:(lv>=1?`获得 <b>5</b> 点格挡，升级手牌中 1 张牌。`:`获得 <b>5</b> 点格挡。`); },
        inflame:     ()=>{ const gain=lv>=1?3:2; return `永久获得 <b>${gain}</b> 层力量（当前 ${str}）。`; },
        ironwave:    ()=>{ const base=lv>=2?7:5; const mult=lv>=1?2:1; const a=base+str*mult; return `获得 <b>${a}</b> 点格挡，造成 <b>${a+str}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.85">基础${base}+力量${str}×${mult}${str?', 攻击再叠 +'+str:''}</span>`; },
        thunderclap: ()=>{ const baseD=lv>=1?7:4; const vuln=lv>=2?2:1; const d=baseD+str; return `对所有敌人造成 <b>${d}</b> 点伤害并施加 ${vuln} 层易伤。${strTag}`; },
      };
      if(BRUTE_CARDS[cardId]) desc = BRUTE_CARDS[cardId]();
    }
        // 品质颜色边框和标签
    const RARITY_STYLE = {
      common:   { border:'rgba(200,200,200,0.55)', glow:'none',                          label:'',   labelColor:'' },
      uncommon: { border:'#3b82f6',               glow:'0 0 8px rgba(59,130,246,0.55)', label:'罕见', labelColor:'#7eb6ff' },
      rare:     { border:'#a855f7',               glow:'0 0 10px rgba(168,85,247,0.6)', label:'稀有', labelColor:'#c8a0ff' },
      epic:     { border:'#9c27b0',               glow:'0 0 14px rgba(156,39,176,0.7)', label:'史诗', labelColor:'#ce93d8' },
    };
    const rarity = def.rarity || 'common';
    const rs = RARITY_STYLE[rarity] || RARITY_STYLE.common;
    el.style.border = `2px solid ${rs.border}`;
    if(rs.glow !== 'none') el.style.boxShadow = rs.glow;
    el.style.position = 'relative';
    // \u628a\u5b8c\u6574\u63cf\u8ff0\u5b58\u5230 data \u5c5e\u6027\uff0c\u4f9b\u60ac\u6d6e tooltip \u4f7f\u7528
    el.dataset.fullDesc = desc;
    el.dataset.cardName = def.name;
    el.dataset.cardEmoji = def.emoji || '';
    const rarityTag = rs.label ? `<div style="position:absolute;top:3px;left:6px;font-size:0.62rem;font-weight:800;color:${rs.labelColor};letter-spacing:0.5px;text-shadow:0 0 6px ${rs.border};pointer-events:none">${rs.label}</div>` : '';
    // \u5361\u9762\u7cbe\u7b80\u63cf\u8ff0\uff1a\u53bb\u6389<br>\u53ca\u4e4b\u540e\u5185\u5bb9\u3001\u53bb\u6389span\u3001\u53bb\u6389\u957f\u62ec\u53f7\u8bf4\u660e\uff0c\u907f\u514d\u8d85\u51fa\u5361\u6846
    const faceDesc = (() => {
      let d = desc
        .replace(/<br[^>]*>[\s\S]*/i, '')              // \u5220\u9664<br>\u53ca\u4e4b\u540e\u5168\u90e8
        .replace(/<span[^>]*>[\s\S]*?<\/span>/g, '')   // \u5220\u9664span
        .replace(/\uff08[^\uff09]{6,}\uff09/g, '')                  // \u5220\u9664\u957f\u62ec\u53f7\u8bf4\u660e
        .replace(/\s{2,}/g, ' ').trim();
      // \u53ea\u53d6\u7b2c\u4e00\u53e5\uff08\u7b2c\u4e00\u4e2a\u53e5\u53f7\u4e3a\u6b62\uff09\uff0c\u591a\u4f59\u5185\u5bb9\u653e\u5230\u53cc\u51fb\u8be6\u60c5
      const dot = d.indexOf('\u3002');
      if (dot !== -1 && dot < d.length - 1) d = d.slice(0, dot + 1);
      return d;
    })();
el.innerHTML=`<div class="card-type-bar"></div>${rarityTag}<div class="card-cost${overrideCost===0?' cost-zero':''}">${ displayCost===99?'X':displayCost}</div><div class="card-art">${def.emoji||'\ud83c\udccf'}</div><div class="card-name">${def.name}</div><div class="card-desc">${faceDesc}</div>`;
    return el;
  },
  // ── 药水槽位渲染 ───────────────────────────────────────────────────────

  renderRelicBar(container) {
    const run = State.run;
    if (!run || !run.relics || run.relics.length === 0) return;
    // 遗物信息映射
    const relicInfo = {
      protein_powder: { name: '大眼的蛋白粉', icon: '💪', desc: '永久 +1 力量，所有攻击伤害+1。' },
      spike_shoes:    { name: '大眼的钉鞋',   icon: '👟', desc: '每回合结束后，有 5% 概率跳过怪物回合。' },
      magnifier:      { name: '大眼的放大镜', icon: '🔍', desc: '每场战斗开始时，随机1张手牌本回合费用变0。' },
      iron_stomach:   { name: '大眼的铁胃',   icon: null, img: 'manus-storage/img_00_572k_79c2d105.png', desc: '永久增加 11 点生命上限，并立即回复 11 HP。' },
      amulet:         { name: '大眼的水晶球', icon: '🔮', desc: '第一次被致死时，以 50% 最大生命值存活（仅触发一次）。命运早已在水晶球中显现。' },
      football:       { name: '橄榄球', icon: '🏈', img: 'manus-storage/football_icon_0390dd99.png', desc: '每场战斗第一回合增加 1 点能量。' },
      susu_eyemask:   { name: 'Susu的眼罩', icon: null, img: 'manus-storage/img_01_3443k_f8fb25b0.png', desc: '每场战斗中，第一次受到负面状态效果时免疫（弱化/易伤/中毒等），仅触发一次。' },
      susu_pocketwatch:{ name: 'susu的怀表', icon: '⌚', desc: '当你被致死时，有 5% 概率时间倒流：满血复活，并瞬间击溃当前房间所有敌人（Boss 房：仅复活）。每场冒险仅触发一次。' },
      xiaojiu_guitar: { name: '小九的六弦琴', icon: null, img: 'manus-storage/xiaojiu_guitar_e444f0fa.png', desc: '从第二回合开始，每个回合额外多抽 1 张牌。' },
      wangwei_bracelet: { name: '王微的手绳', icon: '📿', desc: '每回合开始时，获得 3 点格挡（不会消失，可累计）。' },
      wangwei_glasses:  { name: '王微的眼镜', icon: '👓', desc: '受到伤害时，有 20% 概率减少最多 15 点伤害。' },
      wangwei_bowl:     { name: '王微的碗',   icon: '🍜', desc: '每场战斗结束后，回复 5 点 HP。' },
      wangwei_wallet:   { name: '王微的钱包', icon: '👛', desc: '每场战斗结束后，金币奖励额外 +25%。' },
      wangwei_optimism: { name: '王微的乐观', icon: '🌟', desc: '每场战斗开始时，随机回复 1~10 点 HP。' },
      // 文豪遗物
      wenhao_scarf:       { name: '文豪的红领巾', icon: '👔', desc: '每场战斗结束时，若全程未受任何伤害，永久+5最大HP。' },
      wenhao_feather:     { name: '文豪的羽毛', icon: '🪶', desc: '生命首次低于最大生命值50%时，回复40%最大生命值。（全局仅一次；一击致死不触发）' },
      wenhao_script:      { name: '文豪的剧本', icon: '📜', desc: '获取时，免费删除至多2张卡牌；之后可花费50金币再删1张。' },
      // 大头遗物
      datou_spanish_book: { name: '大头的西班牙语书', icon: '📖', desc: '回合结束时，若本回合造成过伤害，回复 2 点 HP。' },
      datou_sunglasses:   { name: '大头的墨镜',       icon: '🕶️', desc: '每场战斗第一回合，额外抽 2 张牌并获得 1 点能量。' },
      datou_drumstick:    { name: '大头的鼓棒',       icon: '🥁', desc: '打出攻击牌时，10% 概率额外释放一次。' },
      datou_hat:          { name: '大头的帽子',       icon: '🧢', desc: '永久增加 20 点生命上限，并立即回复 20 点 HP。' },
      datou_whistle:      { name: '大头的哨子',       icon: '🎺', desc: '回合结束时，若本回合未打出过防御牌，获得 10 点格挡。' },
      // 高山遗物
      gaoshan_sunglasses: { name: '高山的雪镜',   icon: '🥽', desc: '每回合开始时，有 35% 概率获得 1 点额外能量。' },
      gaoshan_jacket:     { name: '高山的冲锋衣', icon: '🧥', desc: '每场战斗中，第一次获得格挡时，格挡值翻倍。' },
      gaoshan_compass:    { name: '高山的指南针', icon: '🧭', desc: '激活后，第三层地图变为一条直路。规则：最多 1 精英；普通战斗 2 个（仅 10 节点地图可能出现 3 个）；问号/休息/商店至少各 1 个，最后一节点必为商店。' },
      gaoshan_braid:      { name: '高山的麻花辫', icon: '💇', desc: '每场战斗开始时，随机回复 3~8 点 HP。' },
      // 事件专属遗物
      football:           { name: '橄榄球',           icon: '🏈', desc: '每场战斗第一回合增加 1 点能量。' },
      lemon_chicken:      { name: '莹姐的柠檬烧鸡',   icon: '🍗', desc: '尹姐食堂尝新菜成功的纪念品。（最大HP+5已在事件中生效）' },
      liuxing_headband:   { name: '刘行的头巾',       icon: '🧣', desc: '每场战斗中，首次格挡值达到或超过 15 点时，下一回合开始额外获得 1 点能量（每场战斗仅触发一次）。' },
      xiaocao_sprout:     { name: '小草的小草',         icon: '🌱', desc: '每场战斗胜利后，永久增加 1 点最大HP（无上限）。' },
    };
    // 确保全局遗物 tooltip 元素存在
    let relicTip = document.getElementById('global-relic-tooltip');
    if (!relicTip) {
      relicTip = document.createElement('div');
      relicTip.id = 'global-relic-tooltip';
      relicTip.style.cssText = [
        'position:fixed', 'z-index:9999',
        'background:rgba(10,15,35,0.97)',
        'border:1.5px solid rgba(241,196,15,0.5)',
        'border-radius:10px', 'padding:8px 12px',
        'min-width:160px', 'max-width:240px',
        'font-size:0.88rem', 'color:#e8e8f0',
        'white-space:normal', 'pointer-events:none',
        'display:none', 'box-shadow:0 4px 20px rgba(0,0,0,0.6)',
        'line-height:1.5'
      ].join(';');
      document.body.appendChild(relicTip);
    }

    const bar = document.createElement('div');
    bar.className = 'relic-bar';
    run.relics.forEach(id => {
      const info = relicInfo[id] || { name: id, icon: '❓', desc: '' };
      const slot = document.createElement('div');
      slot.className = 'relic-slot';
      if (info.img) {
        slot.innerHTML = `<img src="${info.img}" />`;
      } else {
        slot.innerHTML = `<span>${info.icon}</span>`;
      }
      // 动态定位 tooltip
      slot.addEventListener('mouseenter', (e) => {
        relicTip.innerHTML = `<div style="font-weight:700;color:#f1c40f;margin-bottom:4px;font-size:0.95rem">${info.name}</div>${info.desc}`;
        relicTip.style.display = 'block';
        const rect = slot.getBoundingClientRect();
        let top = rect.bottom + 8;
        let left = rect.left + rect.width / 2 - 80;
        // 防止超出底部
        if (top + 80 > window.innerHeight - 8) top = rect.top - 80 - 8;
        // 防止超出右侧
        if (left + 240 > window.innerWidth - 8) left = window.innerWidth - 248;
        // 防止超出左侧
        if (left < 8) left = 8;
        relicTip.style.top = top + 'px';
        relicTip.style.left = left + 'px';
      });
      slot.addEventListener('mouseleave', () => {
        relicTip.style.display = 'none';
      });
      bar.appendChild(slot);
    });
    container.appendChild(bar);
  },
  // ── 全局药水 Tooltip（动态定位，防止超出屏幕）──────────────────────────
  _potionTooltipEl: null,
  _ensurePotionTooltip(){
    if (!UI._potionTooltipEl) {
      const el = document.createElement('div');
      el.id = 'global-potion-tooltip';
      el.style.cssText = [
        'position:fixed',
        'z-index:9999',
        'background:rgba(16,20,28,0.97)',
        'border:1px solid rgba(255,255,255,0.18)',
        'border-radius:8px',
        'padding:8px 14px',
        'font-size:0.95rem',
        'color:#e8e8f0',
        'box-shadow:0 4px 16px rgba(0,0,0,0.6)',
        'pointer-events:none',
        'display:none',
        'max-width:260px',
        'line-height:1.5',
        'white-space:normal',
        'word-break:break-word'
      ].join(';');
      document.body.appendChild(el);
      UI._potionTooltipEl = el;
    }
    return UI._potionTooltipEl;
  },
  _showPotionTooltip(e){
    const slot = e.currentTarget;
    const html = slot.dataset.tooltipHtml;
    if (!html) return;
    const tip = UI._ensurePotionTooltip();
    tip.innerHTML = html;
    tip.style.display = 'block';
    // 计算位置：默认显示在槽位上方
    const rect = slot.getBoundingClientRect();
    const tipW = tip.offsetWidth || 220;
    const tipH = tip.offsetHeight || 80;
    const margin = 8;
    let left = rect.left + rect.width / 2 - tipW / 2;
    let top  = rect.top - tipH - margin;
    // 防止超出右边
    if (left + tipW > window.innerWidth - margin) left = window.innerWidth - tipW - margin;
    // 防止超出左边
    if (left < margin) left = margin;
    // 如果上方空间不够，改为显示在下方
    if (top < margin) top = rect.bottom + margin;
    // 防止超出下边
    if (top + tipH > window.innerHeight - margin) top = rect.top - tipH - margin;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
  },
  _hidePotionTooltip(){
    if (UI._potionTooltipEl) UI._potionTooltipEl.style.display = 'none';
  },
  _potionTooltipGuardBound: false,
  _initPotionTooltipGuard(){
    if (UI._potionTooltipGuardBound) return;
    UI._potionTooltipGuardBound = true;
    // 全局兜底：鼠标不在任何 potion-slot 上时立即隐藏 tooltip
    document.addEventListener('mousemove', (e) => {
      if (!UI._potionTooltipEl || UI._potionTooltipEl.style.display === 'none') return;
      const over = e.target && e.target.closest ? e.target.closest('.potion-slot') : null;
      if (!over) UI._hidePotionTooltip();
    }, { passive: true });
    // 页面滚动或点击时也隐藏
    document.addEventListener('scroll', () => UI._hidePotionTooltip(), { passive: true, capture: true });
    document.addEventListener('click', () => setTimeout(() => UI._hidePotionTooltip(), 50), { passive: true });
  },

  renderPotionSlots(container, potions, inCombat){
    UI._hidePotionTooltip();
    UI._initPotionTooltipGuard();
    container.innerHTML = '';
    const slots = (potions || [null, null, null]).slice(0, 3);
    slots.forEach((potionId, idx) => {
      const slot = document.createElement('div');
      const pData = potionId ? Data.potions[potionId] : null;
      if (pData) {
        slot.className = 'potion-slot has-potion';
        slot.style.setProperty('--potion-glow', pData.glowColor || 'rgba(255,200,50,0.6)');
        slot.style.background = `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.18), ${pData.color}88)`;
        slot.style.border = `2px solid ${pData.color}`;
        // 图片或emoji
        const imgEl = pData.img
          ? `<img src="${pData.img}" style="width:32px;height:32px;object-fit:contain;border-radius:4px;pointer-events:none" />`
          : `<span style="font-size:1.6rem;pointer-events:none">${pData.emoji}</span>`;
        // 丢弃按钮
        const discardBtn = `<div class="potion-discard" onclick="event.stopPropagation();UI.discardPotion(${idx})" title="丢弃">✕</div>`;
        // tooltip
        const useHint = inCombat ? '点击使用' : '（仅战斗中可使用）';
        const tooltipHTML = `<b>${pData.emoji} ${pData.name}</b><br>${pData.desc}<br><span style="opacity:0.7;font-size:0.85rem">${useHint} · 出售: 💰${pData.sellPrice}</span>`;
        slot.innerHTML = `${imgEl}${discardBtn}`;
        slot.dataset.tooltipHtml = tooltipHTML;
        slot.addEventListener('mouseenter', UI._showPotionTooltip);
        slot.addEventListener('mouseleave', UI._hidePotionTooltip);
        if (inCombat) {
          slot.style.cursor = 'pointer';
          slot.addEventListener('click', () => UI.usePotion(idx));
        } else {
          slot.style.cursor = 'default';
        }
      } else {
        slot.className = 'potion-slot empty';
        slot.title = '药水槽位（暂无药水）';
        slot.innerHTML = `<span style="font-size:1rem;opacity:0.35">⊕</span>`;
      }
      container.appendChild(slot);
    });
  },

  usePotion(idx){
    UI._hidePotionTooltip();
    const run = State.run;
    const potionId = run.potions[idx];
    if (!potionId) return;
    const pData = Data.potions[potionId];
    if (!pData) return;
    const cs = run.combat;
    const msg = pData.use(run, cs);
    run.potions[idx] = null;
    State.saveRun(0);
    // 显示提示
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#fff;padding:10px 22px;border-radius:12px;font-size:1.1rem;z-index:9999;pointer-events:none;border:1px solid rgba(255,200,50,0.5)';
    toast.textContent = `🍵 ${pData.name}：${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
    // 药水使用后检查胜利条件（柠檬水等可秒杀敌人，需立即结算）
    if (cs && cs.enemies.every(e=>e._dead) && cs.phase!=='victory') {
      cs.phase='victory';
      Combat._onVictory();
      return;
    }
    // 重新渲染
    if (cs) {
      UI._renderCombat(cs);
    } else {
      State.go('map');
    }
  },

  discardPotion(idx){
    UI._hidePotionTooltip();
    const run = State.run;
    if (!run.potions[idx]) return;
    run.potions[idx] = null;
    State.saveRun(0);
    State.go(State.current.screen);
  },

  renderHpBar(current,max,width,block){ width=width||'100%';block=block||0;const hpPct=Math.max(0,Math.min(100,(current/max)*100));const blkPct=block>0?Math.min(100-hpPct,Math.max(3,(block/max)*100)):0;const low=hpPct<30;
    const blockBadge=block>0?`<div style="display:inline-flex;align-items:center;gap:3px;background:linear-gradient(135deg,#1a6fa8,#2e86c1);border:2px solid rgba(93,173,226,0.8);border-radius:8px;padding:2px 8px;font-size:0.95rem;font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.8);box-shadow:0 0 10px rgba(93,173,226,0.5),inset 0 1px 0 rgba(255,255,255,0.2);min-width:36px;justify-content:center;flex-shrink:0">🛡 ${block}</div>`:'';
    return`<div style="display:flex;align-items:center;gap:6px;width:${width}"><div class="hp-bar-wrap" style="flex:1;height:24px;position:relative"><div class="hp-bar-fill${low?' low':''}" style="width:${hpPct}%"></div>${blkPct>0?`<div class="hp-bar-block" style="width:${blkPct}%"></div>`:''}<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.0rem;font-weight:800;color:#fff;letter-spacing:0.5px;text-shadow:0 0 4px rgba(0,0,0,1),0 1px 4px rgba(0,0,0,0.9),1px 1px 0 rgba(0,0,0,0.8);pointer-events:none">${current}/${max}</div></div>${blockBadge}</div>`; },
  // buff/debuff 描述字典
  _buffDescs: {
    strength:       { name: '力量',     icon: '💪', desc: '每层使攻击伤害 +1' },
    dexterity:      { name: '敏捷',     icon: '🏃', desc: '每层使格挡 +1' },
    ritual:         { name: '仪式',     icon: '✨', desc: '每回合获得力量' },
    fury:           { name: '愤怒',     icon: '💢', desc: '上回合敌人来袭伤害总量÷3（含被格挡的部分），本回合所有攻击 +等量伤害，回合结束清零' },
    box_bloodlust:  { name: '嗜血本能', icon: '🩸', desc: '每回合开始时，若 HP 低于一半，获得 1 点额外能量' },
    box_iron_will:  { name: '钢铁意志', icon: '⚙️', desc: '搏命加成翻倍：每损失 25% HP 攻击 +4' },
  },
  _debuffDescs: {
    vulnerable: { name: '易伤', icon: '💔', desc: '受到的伤害增加 50%，持续到回合结束时减 1 层' },
    weak:       { name: '虚弱', icon: '😵', desc: '造成的伤害减少 25%，持续到回合结束时减 1 层' },
    frail:      { name: '脆弱', icon: '🦴', desc: '获得的格挡减少 25%，持续到回合结束时减 1 层' },
    slow:       { name: '减速', icon: '🐢', desc: '赛车手专属：攻击伤害减少 30%，每回合结束减 1 层' },
    burn:       { name: '燃烧', icon: '🔥', desc: '每回合结束受到等于层数的伤害，随后层数 -1' },
    freeze:     { name: '冻结', icon: '❄️', desc: '本回合跳过行动，回合结束层数 -1' },
    wound:      { name: '重伤', icon: '🩸', desc: '战士专属：每层使战士对该敌人的伤害 +1（永久叠加，不消失）' },
  },

  renderBuffs(entity){
    const b=Object.entries(entity.buffs||{}).filter(([,v])=>v>0).map(([k,v])=>{
      const info=UI._buffDescs[k]||{name:k,icon:'✨',desc:'增益效果'};
      return `<span class="buff-badge" data-buff-key="${k}" data-buff-type="buff" data-buff-stacks="${v}">${info.icon||k} ${v}</span>`;
    }).join('');
    const d=Object.entries(entity.debuffs||{}).filter(([,v])=>v>0).map(([k,v])=>{
      const info=UI._debuffDescs[k]||{name:k,icon:'❌',desc:'减益效果'};
      return `<span class="debuff-badge" data-buff-key="${k}" data-buff-type="debuff" data-buff-stacks="${v}">${info.icon||k} ${v}</span>`;
    }).join('');
    return b+d;
  },

  // 为 buff/debuff badge 绑定悬停 tooltip
  _bindBuffTooltips(container){
    const showTip=(badge,evt)=>{
      const key=badge.dataset.buffKey;
      const type=badge.dataset.buffType;
      const stacks=badge.dataset.buffStacks;
      const dict=type==='buff'?UI._buffDescs:UI._debuffDescs;
      const info=dict[key]||{name:key,icon:'',desc:type==='buff'?'增益效果':'减益效果'};
      // 移除残留
      document.querySelectorAll('.buff-tooltip-fixed').forEach(n=>n.remove());
      const tt=document.createElement('div');
      tt.className='buff-tooltip-fixed';
      tt.innerHTML=`<div class="tt-name">${info.icon||''} ${info.name}</div><div class="tt-desc">${info.desc}</div><div class="tt-stacks">当前层数：${stacks}</div>`;
      document.body.appendChild(tt);
      // 视口居中夹紧
      const br=badge.getBoundingClientRect();
      const tw=tt.offsetWidth, th=tt.offsetHeight;
      const vw=window.innerWidth, vh=window.innerHeight;
      let left=br.left+br.width/2-tw/2;
      let top=br.top-th-10;
      if(left<8) left=8;
      if(left+tw>vw-8) left=vw-tw-8;
      if(top<8) top=br.bottom+10; // 上方放不下就翻到下方
      if(top+th>vh-8) top=vh-th-8;
      tt.style.left=left+'px';
      tt.style.top=top+'px';
      badge._activeTip=tt;
    };
    const hideTip=(badge)=>{ if(badge._activeTip){ badge._activeTip.remove(); badge._activeTip=null; } };
    container.querySelectorAll('.buff-badge, .debuff-badge').forEach(badge=>{
      badge.addEventListener('mouseenter', (e)=>showTip(badge,e));
      badge.addEventListener('mouseleave', ()=>hideTip(badge));
      badge.addEventListener('touchstart', (e)=>{ e.stopPropagation(); showTip(badge,e); setTimeout(()=>hideTip(badge), 2500); });
    });
  },


  showCharacterGuide(charId){
    if(document.getElementById('char-guide-overlay')) return;
    if(!document.getElementById('charGuideStyle')){
      const s=document.createElement('style');s.id='charGuideStyle';
      s.textContent='@keyframes charGuideIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}';
      document.head.appendChild(s);
    }
    const overlay=document.createElement('div');
    overlay.id='char-guide-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:10200;background:rgba(0,0,0,0.72);display:flex;align-items:center;justify-content:center';

    const guides={
      racer:{
        emoji:'🏎️', name:'赛车手',
        color:'#ff7d7d', accent:'rgba(255,125,125,0.15)',
        sections:[
          { title:'⚙️ 档位系统', color:'#ff7d7d', rows:[
            { icon:'↓', label:'1 挡 · 防御档', desc:'格挡效果 ×<b>1.4</b>，攻击伤害 ×<b>0.8</b><br><span style="opacity:0.65;font-size:0.82em">适合积累格挡、苟住血量</span>' },
            { icon:'•', label:'2 挡 · 中立档', desc:'格挡效果 ×<b>1.0</b>，攻击伤害 ×<b>1.0</b><br><span style="opacity:0.65;font-size:0.82em">起手默认档位，均衡状态</span>' },
            { icon:'↑', label:'3 挡 · 攻击档', desc:'格挡效果 ×<b>0.7</b>，攻击伤害 ×<b>1.5</b><br><span style="opacity:0.65;font-size:0.82em">全力进攻，格挡会大幅降低</span>' },
          ]},
          { title:'⚡ 速度感', color:'#f9ca24', rows:[
            { icon:'🛡', label:'≥ 20 · 稳定行驶', desc:'每回合开始自动获得 <b>1</b> 点格挡' },
            { icon:'⚡', label:'≥ 40 · 加速中',   desc:'攻击牌造成的伤害 <b>+2</b>' },
            { icon:'🏎️', label:'≥ 60 · 高速行驶', desc:'每次升挡额外抽 <b>1</b> 张牌（每回合限 1 次）' },
            { icon:'🔥', label:'≥ 80 · 极速状态', desc:'攻击牌伤害提升至 <b>+5</b>（与上方叠加）' },
          ]},
        ]
      },
      boxer:{
        emoji:'🥊', name:'拳击手',
        color:'#ff6b6b', accent:'rgba(255,107,107,0.15)',
        sections:[
          { title:'💢 愤怒（Fury）', color:'#ff6b6b', rows:[
            { icon:'😤', label:'如何积累愤怒', desc:'敌人攻击阶段所有来袭伤害总量 ÷ 3（向下取整），无上限<br><span style="opacity:0.65;font-size:0.82em">被格挡吸收的部分也计入：来袭 10 伤即使全格挡也能 +3 愤怒</span>' },
            { icon:'💢', label:'愤怒的效果', desc:'下回合所有攻击牌伤害 +愤怒点数<br><span style="opacity:0.65;font-size:0.82em">例：本回合敌人总来袭 24 点 → 下回合愤怒 = 8，每张攻击 +8</span>' },
            { icon:'🔄', label:'愤怒的消耗', desc:'回合结束时愤怒清零，由新一轮被攻击量重新计算' },
          ]},
          { title:'🩸 搏命（Berserk）', color:'#ff9f43', rows:[
            { icon:'❤️', label:'75–100% HP', desc:'无额外加成' },
            { icon:'🟡', label:'50–74% HP',  desc:'所有攻击伤害 <b>+2</b>' },
            { icon:'🟠', label:'25–49% HP',  desc:'所有攻击伤害 <b>+4</b>' },
            { icon:'🔴', label:'≤ 24% HP',   desc:'所有攻击伤害 <b>+6</b>（极限暴力）' },
          ]},
        ]
      },
      archer:{
        emoji:'🏹', name:'弓箭手',
        color:'#74d7ff', accent:'rgba(116,215,255,0.15)',
        sections:[
          { title:'⚡ 蓄力系统', color:'#74d7ff', rows:[
            { icon:'➕', label:'如何积累蓄力', desc:'使用弓箭手专属牌时，多数牌会额外获得 <b>1</b> 点蓄力<br><span style="opacity:0.65;font-size:0.82em">蓄力最多累积至 <b>5</b> 点（满蓄）</span>' },
            { icon:'🎯', label:'满蓄（5点）', desc:'达到满蓄后，下次触发蓄力消耗时效果大幅增强<br><span style="opacity:0.65;font-size:0.82em">满蓄状态会在屏幕上显示「🎯 满蓄！」提示</span>' },
            { icon:'💥', label:'消耗蓄力', desc:'部分牌会消耗全部蓄力来造成额外伤害或获得效果<br><span style="opacity:0.65;font-size:0.82em">蓄力越高，消耗时的爆发越强</span>' },
          ]},
          { title:'🏹 核心机制', color:'#f9ca24', rows:[
            { icon:'🔵', label:'蓄力条（左下角）', desc:'蓝色 → 黄色 → 红色，满蓄时变为红色并显示「满蓄！」' },
            { icon:'🎲', label:'蓄力阈值牌', desc:'部分牌在特定蓄力值以上才触发额外效果<br><span style="opacity:0.65;font-size:0.82em">如「飞矢连发」在满蓄时多射 1 箭</span>' },
            { icon:'⚖️', label:'策略核心', desc:'在累积蓄力与消耗爆发之间找到最佳时机<br><span style="opacity:0.65;font-size:0.82em">不必每次都等满蓄再打出</span>' },
          ]},
        ]
      }
    };

    const g=guides[charId];
    if(!g){ overlay.remove(); return; }

    let html=`<div style="background:rgba(12,12,28,0.98);border:1.5px solid ${g.color}55;border-radius:18px;padding:24px 28px;max-width:420px;width:90vw;max-height:85vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.7);position:relative;animation:charGuideIn 0.18s ease both">`;
    html+=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
      <span style="font-size:2rem">${g.emoji}</span>
      <div>
        <div style="font-size:1.2rem;font-weight:900;color:${g.color}">${g.name} · 角色说明</div>
        <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-top:2px">点击空白处关闭</div>
      </div>
    </div>`;

    g.sections.forEach(sec=>{
      html+=`<div style="margin-bottom:16px">`;
      html+=`<div style="font-size:0.95rem;font-weight:800;color:${sec.color};margin-bottom:8px;border-bottom:1px solid ${sec.color}33;padding-bottom:4px">${sec.title}</div>`;
      sec.rows.forEach(row=>{
        html+=`<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;padding:8px 10px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid ${sec.color}66">
          <span style="font-size:1.1rem;min-width:22px;text-align:center;margin-top:1px">${row.icon}</span>
          <div>
            <div style="font-size:0.88rem;font-weight:700;color:#e8e8f0;margin-bottom:2px">${row.label}</div>
            <div style="font-size:0.82rem;color:rgba(255,255,255,0.6);line-height:1.45">${row.desc}</div>
          </div>
        </div>`;
      });
      html+=`</div>`;
    });

    html+=`<button onclick="document.getElementById('char-guide-overlay')?.remove()" style="width:100%;margin-top:6px;padding:9px 0;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.2);border-radius:10px;color:#fff;font-size:0.95rem;cursor:pointer;font-weight:600">关闭</button>`;
    html+=`</div>`;
    overlay.innerHTML=html;
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  },

  toggleSpeedPanel(spd){
    const existing=document.getElementById('speed-panel');
    if(existing){existing.remove();return;}
    const tiers=[
      {val:20,name:'稳定行驶',desc:'每回合开始自动获得 1 点格挡',color:'#a8e6ff',icon:'🛡'},
      {val:40,name:'加速中',  desc:'攻击牌伤害 +1',              color:'#f9ca24',icon:'⚡'},
      {val:60,name:'高速行驶',desc:'每次升挡额外抽 1 张牌（每回合限1次）',color:'#ff9f43',icon:'🏎️'},
      {val:80,name:'极速状态',desc:'攻击牌伤害提升至 +3（叠加）', color:'#ff6b6b',icon:'🔥'},
    ];
    if(!document.getElementById('speedUnlockStyle')){
      const s=document.createElement('style');s.id='speedUnlockStyle';
      s.textContent='@keyframes speedPanelIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
      document.head.appendChild(s);
    }
    const panel=document.createElement('div');
    panel.id='speed-panel';
    panel.style.cssText='position:fixed;bottom:180px;left:50%;transform:translateX(-50%);background:rgba(10,10,30,0.97);border:1.5px solid rgba(249,202,36,0.5);border-radius:14px;padding:14px 20px;z-index:9997;min-width:270px;max-width:330px;box-shadow:0 4px 24px rgba(0,0,0,0.6);animation:speedPanelIn 0.2s ease both';
    let html='<div style="font-size:1rem;font-weight:900;color:#f9ca24;margin-bottom:10px;text-align:center">⚡ 速度感 '+spd+' — 冲刺档位</div>';
    tiers.forEach(function(t){
      const unlocked=spd>=t.val;
      html+='<div style="display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:8px;margin-bottom:4px;background:'+(unlocked?'rgba(255,255,255,0.07)':'rgba(255,255,255,0.02)')+';opacity:'+(unlocked?1:0.4)+'">';
      html+='<div style="font-size:1.3rem">'+t.icon+'</div>';
      html+='<div style="flex:1">';
      html+='<div style="color:'+t.color+';font-size:0.88rem;font-weight:800">'+t.name+'（'+t.val+'点）';
      html+=unlocked?'<span style="color:#7fff7f;font-size:0.75rem;margin-left:6px">✓ 已解锁</span>':'<span style="color:rgba(255,255,255,0.4);font-size:0.75rem;margin-left:6px">未解锁</span>';
      html+='</div>';
      html+='<div style="color:rgba(255,255,255,0.65);font-size:0.78rem">'+t.desc+'</div>';
      html+='</div></div>';
    });
    html+='<div style="border-top:1px solid rgba(255,255,255,0.1);margin:10px 0 6px"></div>';
    html+='<div style="color:#a8e6ff;font-size:0.8rem;font-weight:800;margin-bottom:4px">⚡ 如何获得速度感</div>';
    html+='<div style="color:rgba(255,255,255,0.6);font-size:0.76rem;line-height:1.6">';
    html+='每回合<b>结束时</b>自动积累，积累量取决于当前档位：<br>';
    html+='🔵 1挡 <span style="color:#a8e6ff">+3</span> &nbsp;|&nbsp; 🟡 2挡 <span style="color:#f9ca24">+6</span> &nbsp;|&nbsp; 🔴 3挡 <span style="color:#ff6b6b">+9</span><br>';
    html+='维持高档位可更快解锁强力效果。速度感在战斗结束后归零。';
    html+='</div>';
    html+='<div style="color:rgba(255,255,255,0.25);font-size:0.7rem;text-align:center;margin-top:8px">再次点击速度感或点击其他区域关闭</div>';
    panel.innerHTML=html;
    document.body.appendChild(panel);
    setTimeout(function(){
      document.addEventListener('click',function h(e){
        if(!panel.contains(e.target) && e.target.id!=='speed-hud-btn'){
          panel.remove();document.removeEventListener('click',h);
        }
      },true);
    },100);
  },
  menu(){
    const saves=Save.list();const hasSave=saves.some(s=>s.run!==null);
    UI.app().innerHTML=`<div class="menu-screen slide-up"><div class="menu-title">Slay the<br>Curiosity</div><div class="menu-subtitle">一场好奇心的冒险</div><div style="display:flex;flex-direction:column;gap:12px;align-items:stretch;width:260px;margin:16px auto 0"><button class="btn primary" id="btn-new">✨ 新游戏</button>${hasSave?'<button class="btn" id="btn-continue">📂 继续游戏</button>':''}<button class="btn" id="btn-coop" style="background:rgba(80,200,140,0.14);border-color:rgba(80,200,140,0.45);color:#7fe0a8">🤝 联机合作</button><button class="btn" id="btn-saves">💾 存档管理</button><button class="btn" id="btn-tutorial" style="background:rgba(80,160,255,0.12);border-color:rgba(80,160,255,0.4);color:#90c8ff">📖 新手教程</button><button class="btn" id="btn-database" style="background:rgba(160,90,255,0.12);border-color:rgba(160,90,255,0.4);color:#c8a0ff">📚 图鉴</button><button class="btn" id="btn-debug" style="background:rgba(255,200,80,0.12);border-color:rgba(255,200,80,0.4);color:#ffd060;font-size:0.85rem">🧭 模拟罗盘</button></div><div style="font-size:0.85rem;color:var(--ink-light);margin-top:32px">Slay the Curiosity v0.1 demo</div></div>`;
    document.getElementById('btn-new').onclick=()=>State.go('char-select');
    if(hasSave)document.getElementById('btn-continue').onclick=()=>UI.showSaveSlots('load');
    document.getElementById('btn-coop').onclick=()=>State.go('coop-lobby');
    document.getElementById('btn-saves').onclick=()=>UI.showSaveSlots('manage');
    document.getElementById('btn-tutorial').onclick=()=>UI.tutorial();
    document.getElementById('btn-database').onclick=()=>UI.showDatabase();
    document.getElementById('btn-debug').onclick=()=>UI.showDebugPanel();
  },

  // ── 模拟罗盘：触发各种特效动画，无需进游戏 ───────────────────────
  showDebugPanel(){
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(8,8,18,0.96);z-index:9000;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:40px 20px;overflow-y:auto;font-family:var(--font);';
    overlay.innerHTML=`
      <div style="max-width:820px;width:100%">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
          <h2 style="color:#ffd060;margin:0;font-size:1.6rem">🧭 模拟罗盘</h2>
          <button id="dbg-close" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;padding:6px 14px;cursor:pointer">✕ 关闭</button>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,200,80,0.3);border-radius:14px;padding:18px">
          <div style="color:#ffd060;font-weight:800;font-size:1.05rem;margin-bottom:6px">高山的指南针 · 第三层地图生成预览</div>
          <div style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-bottom:10px">规则：最多 1 个精英；普通战斗 2 个（仅 10 节点地图可能 3 个）；问号/休息/商店至少各 1 个，最后一节点必商店。</div>
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap">
            <button id="dbg-roll" style="background:rgba(127,224,168,0.18);border:1.5px solid rgba(127,224,168,0.5);color:#a9f0c5;border-radius:8px;padding:8px 18px;cursor:pointer;font-weight:700">🎲 生成新地图</button>
            <button id="dbg-roll10" style="background:rgba(127,224,168,0.10);border:1.5px solid rgba(127,224,168,0.35);color:#a9f0c5;border-radius:8px;padding:8px 14px;cursor:pointer">🎲×10 统计</button>
            <span id="dbg-stats" style="color:rgba(255,255,255,0.5);font-size:0.85rem">点击生成查看节点序列</span>
          </div>
          <div id="dbg-map" style="background:rgba(0,0,0,0.25);border-radius:10px;padding:14px;min-height:90px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:flex-start"></div>
          <div id="dbg-multi" style="margin-top:14px;color:rgba(255,255,255,0.65);font-size:0.85rem"></div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.12);border-radius:14px;padding:18px;margin-top:14px">
          <div style="color:#e8d8ff;font-weight:800;font-size:1.05rem;margin-bottom:10px">⌚ susu 的怀表（特效演示）</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="dbg-btn" data-test="pocketwatch-normal" style="background:rgba(127,224,168,0.15);border:1.5px solid rgba(127,224,168,0.45);color:#a9f0c5;border-radius:8px;padding:8px 16px;cursor:pointer;font-weight:700">▶ 普通房间版（含秒杀）</button>
            <button class="dbg-btn" data-test="pocketwatch-boss" style="background:rgba(240,150,150,0.15);border:1.5px solid rgba(240,150,150,0.45);color:#ff9b8f;border-radius:8px;padding:8px 16px;cursor:pointer;font-weight:700">▶ Boss 房间版（仅复活）</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector('#dbg-close').onclick=()=>overlay.remove();
    overlay.addEventListener('click',(e)=>{ if(e.target===overlay) overlay.remove(); });
    overlay.querySelectorAll('.dbg-btn').forEach(btn=>{
      btn.onclick=()=>{
        const t=btn.dataset.test;
        if(t==='pocketwatch-normal'){ overlay.remove(); UI._triggerPocketWatch(false, ()=>UI.menu()); }
        else if(t==='pocketwatch-boss'){ overlay.remove(); UI._triggerPocketWatch(true, ()=>UI.menu()); }
      };
    });

    // ── 罗盘地图生成预览 ─────────────────────────────────────
    const TYPE_META = {
      start:    { icon:'🚶', label:'起点', color:'#aaa' },
      combat:   { icon:'⚔️', label:'普通', color:'#ff9090' },
      elite:    { icon:'💀', label:'精英', color:'#ffb060' },
      question: { icon:'❓', label:'问号', color:'#90e0ff' },
      shop:     { icon:'🏪', label:'商店', color:'#ffd060' },
      rest:     { icon:'🏕️', label:'休息', color:'#80ff80' },
      boss:     { icon:'👑', label:'Boss', color:'#e056fd' },
    };
    const rollOnce = () => {
      const map = MapGen.generateCompass();
      // map.nodes 已经是顺序的（按 floor 0..N）
      return map.nodes;
    };
    const renderRoll = () => {
      const nodes = rollOnce();
      const mapBox = overlay.querySelector('#dbg-map');
      mapBox.innerHTML = '';
      // 统计中间节点（去掉 start 和 boss）
      const mid = nodes.filter(n => n.type!=='start' && n.type!=='boss');
      const counts = {};
      mid.forEach(n => counts[n.type] = (counts[n.type]||0) + 1);
      nodes.forEach((n, i) => {
        const meta = TYPE_META[n.type] || { icon:'?', label:n.type, color:'#fff' };
        const cell = document.createElement('div');
        cell.title = `第 ${n.floor} 层 · ${meta.label}`;
        cell.style.cssText = `display:flex;flex-direction:column;align-items:center;padding:6px 8px;background:rgba(255,255,255,0.04);border:1.5px solid ${meta.color}55;border-radius:8px;min-width:48px`;
        cell.innerHTML = `<div style="font-size:1.5rem;line-height:1">${meta.icon}</div><div style="font-size:0.65rem;color:${meta.color};margin-top:2px;font-weight:700">${meta.label}</div><div style="font-size:0.6rem;color:rgba(255,255,255,0.4);margin-top:1px">${n.floor}</div>`;
        mapBox.appendChild(cell);
        if (i < nodes.length - 1) {
          const arrow = document.createElement('div');
          arrow.style.cssText = 'color:rgba(255,255,255,0.4);font-size:1.2rem';
          arrow.textContent = '→';
          mapBox.appendChild(arrow);
        }
      });
      const statsTxt = `总节点 ${nodes.length}（中间 ${mid.length} + 起点 + Boss）｜` +
        ['elite','combat','question','rest','shop'].map(t => {
          const m = TYPE_META[t];
          const c = counts[t]||0;
          return `${m.icon} ${m.label} ${c}`;
        }).join(' · ');
      overlay.querySelector('#dbg-stats').textContent = statsTxt;
      overlay.querySelector('#dbg-multi').textContent = '';
    };
    const rollMulti = () => {
      const N = 10;
      const totals = { elite:0, combat:0, question:0, rest:0, shop:0 };
      let totalMid = 0;
      for(let k=0;k<N;k++){
        const nodes = rollOnce();
        nodes.filter(n => n.type!=='start' && n.type!=='boss').forEach(n => {
          totals[n.type] = (totals[n.type]||0) + 1;
          totalMid++;
        });
      }
      const lines = ['elite','combat','question','rest','shop'].map(t => {
        const m = TYPE_META[t];
        const c = totals[t]||0;
        const pct = totalMid > 0 ? (c/totalMid*100).toFixed(1) : '0';
        return `${m.icon} ${m.label.padEnd(2)}：${String(c).padStart(2)} 个（${pct}%）`;
      });
      overlay.querySelector('#dbg-multi').innerHTML = `<b>10 张地图的中间节点统计</b>（共 ${totalMid} 个）<br><pre style="margin:6px 0 0;font-family:monospace;color:rgba(255,255,255,0.8);font-size:0.85rem;line-height:1.55">${lines.join('\n')}</pre>`;
    };
    overlay.querySelector('#dbg-roll').onclick = renderRoll;
    overlay.querySelector('#dbg-roll10').onclick = rollMulti;
    renderRoll(); // 首次自动生成一张
  },

  // ── 联机合作大厅（阶段1：PeerJS 连接 + 房间码）──────────────────────────────
  coopLobby(){
    // 如果已经连接（例如从战斗返回），恢复 connected 状态
    const initView = Net.connected ? 'connected' : 'choose';
    const C = UI._coop = { view: initView, error:'', code: Net.roomCode||'', pingOk: Net.connected, myChar: null, oppChar: null };

    const leave = () => { Net.disconnect(); UI._coop=null; State.go('menu'); };

    function render(){
      const err = C.error
        ? `<div style="background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.5);color:#ff9b8f;border-radius:10px;padding:8px 14px;font-size:0.88rem;margin-bottom:14px;max-width:340px">⚠️ ${C.error}</div>`
        : '';
      let body = '';

      if (C.view === 'choose') {
        body = `${err}
          <div style="display:flex;flex-direction:column;gap:12px;align-items:stretch;width:280px;margin:8px auto 0">
            <button class="btn primary" id="cl-host">🏠 创建房间</button>
            <button class="btn" id="cl-join" style="background:rgba(80,160,255,0.12);border-color:rgba(80,160,255,0.4);color:#90c8ff">🔑 加入房间</button>
            <button class="btn" id="cl-back">← 返回主菜单</button>
          </div>`;
      } else if (C.view === 'creating') {
        body = `<div style="font-size:1rem;color:rgba(255,255,255,0.7);margin:20px 0">⏳ 正在创建房间…</div>
          <button class="btn" id="cl-cancel" style="width:200px;margin:0 auto">取消</button>`;
      } else if (C.view === 'hosting') {
        body = `${err}
          <div style="font-size:0.95rem;color:rgba(255,255,255,0.65);margin-bottom:10px">把房间码发给朋友，让他「加入房间」：</div>
          <div style="display:flex;align-items:center;gap:10px;justify-content:center;margin-bottom:8px">
            <div style="font-family:monospace;font-size:2.4rem;font-weight:900;letter-spacing:6px;color:#7fe0a8;background:rgba(80,200,140,0.12);border:2px solid rgba(80,200,140,0.5);border-radius:14px;padding:10px 22px">${C.code}</div>
            <button class="btn" id="cl-copy" style="width:auto;padding:8px 14px;font-size:0.85rem">📋 复制</button>
          </div>
          <div style="font-size:0.95rem;color:rgba(255,255,255,0.55);margin:16px 0">⏳ 等待朋友加入…</div>
          <button class="btn" id="cl-cancel" style="width:200px;margin:0 auto">取消房间</button>`;
      } else if (C.view === 'joining') {
        body = `${err}
          <div style="font-size:0.95rem;color:rgba(255,255,255,0.65);margin-bottom:12px">输入朋友给你的 5 位房间码：</div>
          <input id="cl-code" maxlength="5" placeholder="ABCDE" autocomplete="off"
            style="font-family:monospace;font-size:1.8rem;font-weight:900;letter-spacing:6px;text-align:center;text-transform:uppercase;width:240px;padding:10px;border-radius:12px;border:2px solid rgba(80,160,255,0.5);background:rgba(255,255,255,0.06);color:#fff;outline:none;margin-bottom:14px">
          <div style="display:flex;flex-direction:column;gap:10px;align-items:stretch;width:280px;margin:0 auto">
            <button class="btn primary" id="cl-connect">🔗 连接</button>
            <button class="btn" id="cl-back2">← 返回</button>
          </div>`;
      } else if (C.view === 'connecting') {
        body = `<div style="font-size:1rem;color:rgba(255,255,255,0.7);margin:20px 0">🔗 连接中…</div>
          <button class="btn" id="cl-cancel" style="width:200px;margin:0 auto">取消</button>`;
      } else if (C.view === 'connected') {
        // 阶段2：角色选择界面
        const myChar = C.myChar;
        const oppChar = C.oppChar;
        const myRole = Net.isHost ? '房主' : '访客';
        const charBtns = Data.characters.map(ch => {
          const sel = myChar === ch.id;
          return `<button class="btn coop-char-btn" data-char="${ch.id}" style="background:${sel?'rgba(127,224,168,0.22)':'rgba(255,255,255,0.06)'};border:${sel?'2px solid #7fe0a8':'2px solid rgba(255,255,255,0.18)'};color:${sel?'#7fe0a8':'#fff'};padding:8px 14px;display:flex;align-items:center;gap:8px;border-radius:12px;cursor:pointer;font-size:0.9rem;font-family:var(--font);transition:all 0.15s">${ch.emoji} ${ch.name}<span style="font-size:0.75rem;color:rgba(255,255,255,0.45);margin-left:4px">HP ${ch.hp}</span></button>`;
        }).join('');
        const waitMsg = oppChar
          ? `<div style="font-size:0.85rem;color:#7fe0a8;margin-top:6px">对方：${Data.characters.find(c=>c.id===oppChar)?.emoji||''} ${Data.characters.find(c=>c.id===oppChar)?.name||'?'}</div>`
          : `<div style="font-size:0.85rem;color:rgba(255,255,255,0.4);margin-top:6px">⏳ 等待对方选择…</div>`;
        const canStart = Net.isHost && myChar && oppChar;
        body = `
          <div style="font-size:1rem;font-weight:800;color:#7fe0a8;margin-bottom:4px">✅ 已连接 — ${myRole}</div>
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);margin-bottom:12px">房间码：<b style="color:#fff;font-family:monospace">${Net.roomCode||''}</b></div>
          <div style="font-size:0.92rem;font-weight:700;color:#fff;margin-bottom:8px">选择你的角色：</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:340px;margin:0 auto 10px">${charBtns}</div>
          ${myChar?`<div style="font-size:0.85rem;color:#fff;margin-bottom:4px">你选了：${Data.characters.find(c=>c.id===myChar)?.emoji||''} ${Data.characters.find(c=>c.id===myChar)?.name||''}</div>`:'<div style="font-size:0.85rem;color:rgba(255,255,255,0.4);margin-bottom:4px">请选择一个角色</div>'}
          ${waitMsg}
          ${canStart?'<button class="btn primary" id="cl-start-battle" style="margin-top:14px;width:220px">⚔️ 开始战斗</button>':''}
          ${!Net.isHost && myChar && oppChar?'<div style="font-size:0.85rem;color:rgba(255,255,255,0.5);margin-top:12px">⏳ 等待房主开始战斗…</div>':''}
          <button class="btn" id="cl-back3" style="width:220px;margin:14px auto 0">← 断开并返回</button>`;
      }

      UI.app().innerHTML = `<div class="menu-screen slide-up">
        <div class="screen-title" style="color:#7fe0a8">🤝 联机合作</div>
        <div style="margin-top:14px">${body}</div>
      </div>`;
      bind();
    }

    function bind(){
      const $ = id => document.getElementById(id);
      if ($('cl-host'))   $('cl-host').onclick   = () => { C.view='creating'; C.error=''; render(); Net.host(); };
      if ($('cl-join'))   $('cl-join').onclick   = () => { C.view='joining';  C.error=''; render(); };
      if ($('cl-back'))   $('cl-back').onclick   = leave;
      if ($('cl-back2'))  $('cl-back2').onclick  = () => { C.view='choose'; C.error=''; render(); };
      if ($('cl-back3'))  $('cl-back3').onclick  = leave;
      if ($('cl-cancel')) $('cl-cancel').onclick = () => { Net.disconnect(); C.view='choose'; C.error=''; render(); };
      if ($('cl-copy'))   $('cl-copy').onclick   = () => { try{ navigator.clipboard.writeText(C.code); $('cl-copy').textContent='✓ 已复制'; }catch(e){} };
      if ($('cl-connect')) $('cl-connect').onclick = () => {
        const code = ($('cl-code').value||'').trim().toUpperCase();
        if (code.length !== 5) { C.error='请输入完整的 5 位房间码'; render(); return; }
        C.view='connecting'; C.error=''; render(); Net.join(code);
      };
      if ($('cl-code')) $('cl-code').oninput = e => { e.target.value = e.target.value.toUpperCase(); };
      // 联机阶段2：角色选择按钮
      document.querySelectorAll('.coop-char-btn').forEach(btn => {
        btn.onclick = () => {
          const charId = btn.dataset.char;
          C.myChar = charId;
          Net.send({ t: 'coop-pick', charId });
          render();
        };
      });
      // 开始战斗按钮（房主）— 改为启动完整 run
      if ($('cl-start-battle')) {
        $('cl-start-battle').onclick = () => {
          if (!Net.isHost || !C.myChar || !C.oppChar) return;
          C.combatActive = true;
          // 初始化 coop run
          UI._coopStartRun(C.myChar, C.oppChar);
          // 广播 run 数据给访客 + 切屏到地图
          Net.send({ t: 'coop-run-start', hostChar: C.myChar, guestChar: C.oppChar });
          setTimeout(() => {
            Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
            Net.send({ t: 'coop-screen', screen: 'map' });
            State.current.screen = 'coop-map';
            UI.coopMap();
          }, 60);
        };
      }
    }

    // Net 事件
    Net.on('hosted', code => { if(!UI._coop) return; C.code=code; C.view='hosting'; C.error=''; render(); });
    Net.on('connected', () => {
      if(!UI._coop) return;
      C.view='connected'; C.pingOk=false; C.myChar=null; C.oppChar=null; render();
      Net.send({ t:'hello', from: Net.isHost?'host':'guest' });
    });
    Net.on('message', data => {
      if(!UI._coop || !data) return;
      if (data.t==='hello') { Net.send({ t:'hello-ack' }); C.pingOk=true; if(!C.combatActive) render(); }
      else if (data.t==='hello-ack') { C.pingOk=true; if(!C.combatActive) render(); }
      // ── 联机阶段2消息 ──
      else if (data.t==='coop-pick') {
        // 对方选了角色
        C.oppChar = data.charId;
        // 如果我是房主并且对方选好了，通知对方我自己选好的角色（如果还没发过）
        if (Net.isHost && C.myChar) Net.send({ t:'coop-pick', charId: C.myChar });
        if(!C.combatActive) render();
      }
      else if (data.t==='coop-start') {
        // 旧版兼容：访客收到开始战斗消息
        if (!Net.isHost) {
          C.myChar = data.guestChar;
          C.oppChar = data.hostChar;
          C.combatActive = true;
        }
      }
      else if (data.t==='coop-run-start') {
        // 访客收到开始 run
        if (!Net.isHost) {
          C.myChar = data.guestChar;
          C.oppChar = data.hostChar;
          C.combatActive = true;
        }
      }
      else if (data.t==='coop-run-state') {
        // 访客收到 run 全量同步
        if (!Net.isHost) {
          UI._coopRunGuest = data.run;
          UI._coopRun = data.run; // 访客端共用同一份只读副本
        }
      }
      else if (data.t==='coop-screen') {
        // 访客切屏
        if (!Net.isHost) {
          if (data.screen === 'map') { State.current.screen = 'coop-map'; UI.coopMap(); }
          else if (data.screen === 'combat') { /* 等下个 coop-state */ }
          else if (data.screen === 'coop-rest') { State.current.screen = 'coop-rest'; UI.coopRest(); }
          else if (data.screen === 'coop-shop') { State.current.screen = 'coop-shop'; UI.coopShop(); }
          else if (data.screen === 'coop-question') { State.current.screen = 'coop-question'; UI.coopQuestion(); }
        }
      }
      else if (data.t==='coop-state') {
        // 访客收到战斗状态同步
        if (!Net.isHost) {
          UI._coopGuestCs = data.cs;
          UI.coopCombat(data.cs, true);
        }
      }
      else if (data.t==='coop-card') {
        // 房主收到访客打牌请求
        if (Net.isHost && UI._coopCs) {
          const ok = CoopGame.playCard(UI._coopCs, 'guest', data.cardId, data.targetEnemyIndex, data.handIndex);
          if (UI._coopCs.phase === 'victory') UI._coopEnterReward(UI._coopCs);
          Net.send({ t:'coop-state', cs: CoopGame.serialize(UI._coopCs) });
          UI.coopCombat(UI._coopCs);
        }
      }
      else if (data.t==='coop-end-turn') {
        // 房主收到访客"结束回合"消息
        if (Net.isHost && UI._coopCs) {
          const bothEnded = CoopGame.markEnded(UI._coopCs, 'guest');
          if (bothEnded) {
            CoopGame.runEnemyTurn(UI._coopCs);
            if (UI._coopCs.phase === 'victory') UI._coopEnterReward(UI._coopCs);
          }
          Net.send({ t:'coop-state', cs: CoopGame.serialize(UI._coopCs) });
          UI.coopCombat(UI._coopCs);
        }
      }
      else if (data.t==='coop-reward-pick') {
        // 访客挑了奖励卡
        if (Net.isHost && UI._coopCs) {
          UI._coopCs.guestRewardPicked = data.cardId;
          UI._coopApplyReward(UI._coopCs, 'guest');
          Net.send({ t:'coop-state', cs: CoopGame.serialize(UI._coopCs) });
          UI.coopCombat(UI._coopCs);
        }
      }
      else if (data.t==='coop-reward-continue') {
        // 访客点了"前往地图"按钮
        if (Net.isHost && UI._coopCs) {
          UI._coopGoToMap(UI._coopCs);
        }
      }
      else if (data.t==='coop-rest-choice') {
        // 访客提交休息选择
        if (Net.isHost && UI._coopRun) {
          UI._coopApplyRest('guest', data.choice);
          Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
          if (State.current.screen === 'coop-rest') UI.coopRest();
        }
      }
      else if (data.t==='coop-shop-buy') {
        // 访客购买
        if (Net.isHost && UI._coopRun) {
          UI._coopApplyShopBuy('guest', data.idx);
          Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
          if (State.current.screen === 'coop-shop') UI.coopShop();
        }
      }
      else if (data.t==='coop-shop-leave') {
        // 访客离开商店
        if (Net.isHost && UI._coopRun) {
          UI._coopApplyShopLeave('guest');
          Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
          if (State.current.screen === 'coop-shop') UI.coopShop();
        }
      }
      else if (data.t==='coop-question-vote') {
        // 访客对问号事件投票
        if (Net.isHost && UI._coopRun) {
          UI._coopRun.questionVotes = UI._coopRun.questionVotes || { host: null, guest: null };
          UI._coopRun.questionVotes.guest = data.optIdx;
          UI._coopTryResolveQuestion();
          Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
          if (State.current.screen === 'coop-question') UI.coopQuestion();
        }
      }
    });
    Net.on('disconnected', () => {
      if(!UI._coop) return;
      C.error='对方已断开连接'; C.view='choose'; C.combatActive=false;
      UI._coopRun = null; UI._coopRunGuest = null; UI._coopCs = null; UI._coopGuestCs = null;
      render();
    });
    Net.on('error', msg => {
      if(!UI._coop) return;
      C.error=msg;
      if (C.view==='creating'||C.view==='hosting') C.view='choose';
      if (C.view==='connecting') C.view='joining';
      render();
    });

    render();
  },

  tutorial(){
    const pages=[
      {
        icon:'🎮',title:'欢迎来到 Slay the Curiosity！',
        body:`这是一个<b>卡牌 Roguelike</b> 游戏。每次冒险都是全新旅程——选择角色、收集卡牌、获取遗物，挑战一层又一层的敌人，直到击败最终 Boss。<br><br>死亡即重来，每局随机不同，但经验和策略会越来越强。`
      },
      {
        icon:'🗺️',title:'地图与行进',
        body:`每一层都是一张分叉路线图。<b>点击高亮节点</b>即可前进。<br><br>节点类型：<br>
<span style="color:#ff9090">⚔️ 普通战斗</span> — 风险低，奖励少<br>
<span style="color:#ffb060">⭐ 精英战斗</span> — 更难，但遗物掉落率高<br>
<span style="color:#e056fd">👑 Boss</span> — 每层终点，必须击败才能继续<br>
<span style="color:#90e0ff">❓ 问号事件</span> — 随机好事坏事，充满惊喜<br>
<span style="color:#ffd060">🏪 商店</span> — 花金币买牌/遗物/药水<br>
<span style="color:#80ff80">🔥 篝火</span> — 回血或升级一张牌`
      },
      {
        icon:'⚔️',title:'战斗基础',
        body:`每回合你会获得 <b>3点能量</b> 并抽取 <b>5张手牌</b>。<br><br>
① <b>打出手牌</b>：消耗左上角数字对应的能量。攻击牌需先点击选中，再点击目标敌人；技能牌直接点击生效。<br><br>
② <b>结束回合</b>：点右下角"结束回合"，剩余手牌丢弃，敌人行动，然后开始下一回合。<br><br>
③ <b>胜利</b>：把所有敌人HP打到0即可。`
      },
      {
        icon:'🛡️',title:'格挡 & 伤害',
        body:`<b>格挡</b>（角色下方蓝色数字）会在受到攻击时优先抵消伤害。超出格挡的伤害才扣HP。<br><br>
⚠️ <b>格挡不会延续到下一回合</b>，每回合开始时清零，所以要在当回合内把格挡用在刀刃上。<br><br>
HP降到0 = 游戏失败，提前规划好格挡量是胜利关键。`
      },
      {
        icon:'💎',title:'遗物',
        body:`遗物是<b>全局被动道具</b>，拾取后在每场战斗中持续生效，无需手动激活。<br><br>
获取途径：战斗掉落（小怪10%、精英25%、Boss90%）、事件奖励、商店购买。<br><br>
<b>💡 小技巧</b>：将鼠标悬停在遗物图标上可查看效果说明。遗物的叠加搭配往往比单张强力牌更稳定。`
      },
      {
        icon:'🧪',title:'药水',
        body:`药水是<b>一次性消耗品</b>，最多同时携带 3 瓶（三个槽位）。<br><br>
战斗中和战斗外均可点击使用。将鼠标悬停在药水图标上可查看效果。<br><br>
<b>💡 小技巧</b>：不要囤着不用，关键的 Boss 战前确保药水槽满载，增加容错空间。`
      },
      {
        icon:'👆',title:'双击查看详情',
        body:`游戏多个地方支持<b>双击</b>来查看更详细的说明：<br><br>
🧑‍🤝‍🧑 <b>角色选择界面</b>：双击角色卡片 → 查看打法介绍、起始金币、核心机制<br><br>
🃏 <b>战斗中的手牌</b>：双击卡牌 → 查看完整效果文字（包括升级后效果）<br><br>
💎 <b>战斗中的遗物</b>：悬停/双击图标 → 查看遗物效果说明`
      },
      {
        icon:'💡',title:'新手建议',
        body:`① <b>精简牌组</b>：在商店或篝火删除初始弱牌（打击/防御），让牌组更流畅。<br><br>
② <b>优先打精英</b>：遗物掉落率高，强力遗物是胜负关键。<br><br>
③ <b>看敌人意图</b>：敌人头顶图标显示下一步行动，提前决定是攻击还是格挡。<br><br>
④ <b>善用事件</b>：问号事件有高收益选项，风险可控时大胆选。<br><br>
⑤ <b>多局练习</b>：每个角色打法差异大，多试几局找到手感！`
      },
    ];
    let cur=0;
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.82);backdrop-filter:blur(4px)';
    const render=()=>{
      const p=pages[cur];
      const dots=pages.map((_,i)=>`<span style="display:inline-block;width:${i===cur?18:8}px;height:8px;border-radius:4px;background:${i===cur?'#90c8ff':'rgba(255,255,255,0.2)'};transition:all 0.25s;margin:0 3px"></span>`).join('');
      overlay.innerHTML=`
        <div style="background:linear-gradient(160deg,#0d1b2a 0%,#1a2740 100%);border:1.5px solid rgba(80,160,255,0.3);border-radius:20px;padding:32px 30px 24px;max-width:480px;width:92%;position:relative;box-shadow:0 8px 40px rgba(0,0,0,0.7)">
          <button id="tut-close" style="position:absolute;top:14px;right:18px;background:none;border:none;color:rgba(255,255,255,0.4);font-size:1.3rem;cursor:pointer">✕</button>
          <div style="text-align:center;font-size:3.2rem;margin-bottom:12px">${p.icon}</div>
          <div style="text-align:center;font-size:1.25rem;font-weight:900;color:#e8f0ff;margin-bottom:16px">${p.title}</div>
          <div style="color:rgba(255,255,255,0.82);font-size:0.93rem;line-height:1.75;min-height:160px">${p.body}</div>
          <div style="text-align:center;margin:20px 0 16px">${dots}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
            <button id="tut-prev" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:10px;color:rgba(255,255,255,0.6);padding:8px 18px;cursor:pointer;font-size:0.9rem;${cur===0?'opacity:0.2;pointer-events:none':''}">&larr; 上一步</button>
            <span style="font-size:0.8rem;color:rgba(255,255,255,0.3)">${cur+1} / ${pages.length}</span>
            <button id="tut-next" style="background:${cur===pages.length-1?'rgba(80,160,255,0.25)':'rgba(80,160,255,0.18)'};border:1px solid rgba(80,160,255,0.4);border-radius:10px;color:#90c8ff;padding:8px 18px;cursor:pointer;font-size:0.9rem;font-weight:700">${cur===pages.length-1?'开始游戏！':'下一步 &rarr;'}</button>
          </div>
        </div>`;
      overlay.querySelector('#tut-close').onclick=()=>overlay.remove();
      overlay.querySelector('#tut-prev').onclick=()=>{ if(cur>0){cur--;render();} };
      overlay.querySelector('#tut-next').onclick=()=>{
        if(cur<pages.length-1){cur++;render();}
        else{ overlay.remove(); UI.startTutorialRun(); }
      };
    };
    render();
    document.body.appendChild(overlay);
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.remove(); });
  },

  startTutorialRun(){
    // 使用 Brute 角色（最简单的机制）进行教程关卡
    const char = Data.characters.find(c=>c.id==='brute');
    State.current.run = {
      character:{id:char.id,name:char.name,emoji:char.emoji,color:char.color,hp:char.hp,maxHp:char.maxHp,block:0,buffs:{},debuffs:{}},
      floor:0, act:1, gold:99,
      deck:[...char.startingDeck],
      relics:[], pendingRelic:null, potions:[null,null,null],
      map: MapGen.generateTutorial(),
      currentNodeId: 0, combat: null,
      isTutorial: true, tutorialPhase: 'init',
    };
    State.current.screen = 'map';
    State.emit('screenChange',{screen:'map'});
  },

  showSaveSlots(mode){
    const saves=Save.list();const overlay=document.createElement('div');overlay.className='overlay';
    overlay.innerHTML=`<div class="panel bounce-in" style="min-width:320px;max-width:90vw"><h3 class="screen-title" style="margin-bottom:16px">${mode==='load'?'📂 选择存档':'💾 存档管理'}</h3><div id="save-slots" style="display:flex;flex-direction:column;gap:10px"></div><button class="btn" id="close-saves" style="margin-top:16px;width:100%">关闭</button></div>`;
    const slotsEl=overlay.querySelector('#save-slots');
    saves.forEach(({slot,run})=>{
      const div=document.createElement('div');div.style.cssText='display:flex;align-items:center;gap:8px;';
      if(run){
        const d=new Date(run._savedAt);
        div.innerHTML=`<div class="panel" style="flex:1;padding:8px;font-size:0.95rem"><b>${run.character.emoji} ${run.character.name}</b><span style="color:var(--ink-light)"> · ${run.act===3?'露营周':run.act===2?'常识周':'第 '+run.floor+' 层'}</span><br><span style="font-size:0.75rem;color:var(--ink-light)">${d.toLocaleString()}</span></div>`;
        if(mode==='load'){const btn=document.createElement('button');btn.className='btn primary';btn.style.fontSize='1rem';btn.textContent='读取';btn.onclick=()=>{overlay.remove();State.loadRun(slot);};div.appendChild(btn);}
        const del=document.createElement('button');del.className='btn danger';del.style.fontSize='1rem';del.textContent='删除';del.onclick=()=>{Save.erase(slot);overlay.remove();UI.menu();};div.appendChild(del);
      }else{
        div.innerHTML=`<div class="panel" style="flex:1;padding:8px;opacity:0.5;font-size:0.95rem">空存档槽 ${slot+1}</div>`;
        if(mode==='load'){const btn=document.createElement('button');btn.className='btn';btn.style.fontSize='1rem';btn.textContent='新游戏';btn.onclick=()=>{overlay.remove();State.go('char-select');};div.appendChild(btn);}
      }
      slotsEl.appendChild(div);
    });
    overlay.querySelector('#close-saves').onclick=()=>overlay.remove();
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});
    document.body.appendChild(overlay);
  },

  _showCharDetail(char){
    const d = char.detail || {};
    const counts={};char.startingDeck.forEach(id=>counts[id]=(counts[id]||0)+1);
    const deckNames=Object.entries(counts).map(([id,n])=>`${Data.cards[id]?.name||id}×${n}`).join(' · ');
    const mechHtml=(d.mechanics||[]).map(m=>`
      <div style="margin-bottom:14px">
        <div style="font-weight:700;color:#e8e8f0;font-size:1.12rem;margin-bottom:5px">${m.name}</div>
        <div style="color:rgba(255,255,255,0.82);font-size:1.02rem;line-height:1.6">${m.desc}</div>
      </div>`).join('');
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:8000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.75);backdrop-filter:blur(3px)';
    overlay.innerHTML=`
      <div style="background:linear-gradient(160deg,#1a1a2e 0%,#16213e 100%);border:2px solid ${char.color}66;border-radius:18px;padding:28px 32px;max-width:520px;width:92%;max-height:88vh;overflow-y:auto;position:relative;box-shadow:0 8px 40px rgba(0,0,0,0.7),0 0 30px ${char.color}22">
        <button id="charDetailClose" style="position:absolute;top:14px;right:18px;background:none;border:none;color:rgba(255,255,255,0.5);font-size:1.4rem;cursor:pointer;line-height:1">✕</button>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
          <div style="background:${char.color}22;border:2px solid ${char.color}55;border-radius:14px;padding:10px 16px;font-size:3rem">${char.emoji}</div>
          <div>
            <div style="font-size:1.5rem;font-weight:900;color:#fff">${char.name}</div>
            <div style="font-size:0.9rem;color:rgba(255,255,255,0.5);margin-top:3px">双击选中并查看详情</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap">
          <span style="background:rgba(255,100,100,0.15);border:1px solid rgba(255,100,100,0.4);border-radius:8px;padding:5px 12px;font-size:0.9rem;color:#ff9090">❤️ ${char.maxHp} HP</span>
          <span style="background:rgba(255,200,50,0.12);border:1px solid rgba(255,200,50,0.35);border-radius:8px;padding:5px 12px;font-size:0.9rem;color:#ffd060">💰 ${d.gold ?? '—'} 起始金币</span>
          <span style="background:rgba(100,180,255,0.1);border:1px solid rgba(100,180,255,0.3);border-radius:8px;padding:5px 12px;font-size:0.9rem;color:#90d0ff">🃏 ${char.startingDeck.length} 张起始牌</span>
        </div>
        <div style="margin-bottom:18px">
          <div style="font-size:0.75rem;letter-spacing:0.12em;color:${char.color};font-weight:700;margin-bottom:6px;text-transform:uppercase">打法简介</div>
          <div style="color:rgba(255,255,255,0.88);font-size:1.05rem;line-height:1.7">${d.playstyle||char.description}</div>
        </div>
        <div style="margin-bottom:18px">
          <div style="font-size:0.75rem;letter-spacing:0.12em;color:${char.color};font-weight:700;margin-bottom:10px;text-transform:uppercase">核心机制</div>
          ${mechHtml}
        </div>
        <div>
          <div style="font-size:0.75rem;letter-spacing:0.12em;color:${char.color};font-weight:700;margin-bottom:8px;text-transform:uppercase">起始牌组</div>
          <div style="color:rgba(255,255,255,0.7);font-size:0.88rem;line-height:1.8">${deckNames}</div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#charDetailClose').onclick=()=>overlay.remove();
    overlay.addEventListener('click',e=>{ if(e.target===overlay) overlay.remove(); });
  },

  characterSelect(){
    let selected=null;
    UI.app().innerHTML=`<div class="char-select-screen slide-up"><h2 class="screen-title">选择角色</h2><p style="text-align:center;color:rgba(255,255,255,0.45);font-size:0.85rem;margin:-8px 0 10px">双击角色卡片查看详细介绍</p><div class="char-grid" id="char-grid"></div><div id="char-detail" style="font-size:0.9rem;color:var(--ink-light);min-height:20px"></div><div style="display:flex;gap:12px;margin-top:4px"><button class="btn" id="btn-back">← 返回</button><button class="btn primary" id="btn-start" disabled>开始冒险 →</button></div></div>`;
    const grid=document.getElementById('char-grid');
    Data.characters.forEach(char=>{
      const card=document.createElement('div');card.className='char-card panel';card.dataset.id=char.id;
      card.innerHTML=`<div class="char-figure" style="background:${char.color}22"><span style="font-size:4.5rem">${char.emoji}</span></div><div class="char-info"><div class="char-name">${char.name}</div><div class="char-stat">❤️ ${char.maxHp} HP</div><div class="char-stat" style="font-size:1.0rem;margin-top:6px;color:rgba(255,255,255,0.75);line-height:1.5">${char.description}</div></div>`;
      card.onclick=()=>{
        grid.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));card.classList.add('selected');selected=char.id;document.getElementById('btn-start').disabled=false;
        const counts={};char.startingDeck.forEach(id=>counts[id]=(counts[id]||0)+1);
        const names=Object.entries(counts).map(([id,n])=>`${Data.cards[id]?.name||id}×${n}`).join(' · ');
        document.getElementById('char-detail').innerHTML=`<span style="font-size:1.05rem;color:rgba(255,255,255,0.85)">起始牌组：<b style="color:#e8e8f0">${names}</b></span>`;
      };
      card.ondblclick=e=>{ e.preventDefault(); UI._showCharDetail(char); };
      grid.appendChild(card);
    });
    document.getElementById('btn-back').onclick=()=>State.go('menu');
    document.getElementById('btn-start').onclick=()=>{
      if(!selected)return;
      State.startRun(selected);
      const freeSlot=Save.list().find(s=>!s.run)?.slot??0;
      State.saveRun(freeSlot);
      // 50%概率选大眼，50%概率选王微
      if(Math.random() < 0.5) UI.dayanSelect();
      else UI.wangweiSelect();
    };
  },

  dayanSelect(){
    const run = State.run;
    // 从5个遗物中随机抽3个
    const pool = [...Data.dayanRelics];
    const chosen = [];
    while(chosen.length < 3 && pool.length > 0){
      const idx = Math.floor(Math.random() * pool.length);
      chosen.push(pool.splice(idx, 1)[0]);
    }
    let selectedRelic = null;

    UI.app().innerHTML = `<div class="dayan-screen slide-up">
      <img src="${DAYAN_IMG_SRC}" alt="大眼" style="width:min(240px,38vh);height:min(240px,38vh);object-fit:contain;margin-bottom:6px;filter:drop-shadow(0 0 22px rgba(100,180,255,0.8));flex-shrink:0;" />
      <div class="dayan-title">✨ 大眼的礼物 ✨</div>
      <div class="dayan-bubble">
        嘿！冒险者，我是<b style="color:#f1c40f">大眼</b>！<br>
        出发前，从我这里挑一件宝贝带上吧～
      </div>
      <div class="dayan-relics" id="dayan-relics-grid"></div>
      <button class="btn primary" id="btn-dayan-confirm" disabled style="font-size:1.2rem;padding:12px 40px;margin-top:8px;flex-shrink:0">带上它，出发！→</button>
    </div>`;

    const grid = document.getElementById('dayan-relics-grid');
    chosen.forEach(relic => {
      const card = document.createElement('div');
      card.className = 'dayan-relic-card';
      card.innerHTML = `<div class="dayan-relic-icon">${relic.icon}</div>
        <div class="dayan-relic-name">${relic.name}</div>
        <div class="dayan-relic-desc">${relic.desc}</div>`;
      card.onclick = () => {
        grid.querySelectorAll('.dayan-relic-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic = relic;
        document.getElementById('btn-dayan-confirm').disabled = false;
      };
      card.ondblclick = () => {
        grid.querySelectorAll('.dayan-relic-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic = relic;
        document.getElementById('btn-dayan-confirm').disabled = false;
        document.getElementById('btn-dayan-confirm').click();
      };
      grid.appendChild(card);
    });

    document.getElementById('btn-dayan-confirm').onclick = () => {
      if(!selectedRelic) return;
      // 应用遗物效果
      selectedRelic.apply(run);
      // 记录遗物id（非spike_shoes/magnifier/amulet类已在apply中push）
      if(!run.relics.includes(selectedRelic.id)){
        run.relics.push(selectedRelic.id);
      }
      // 保存并进入地图
      const freeSlot = Save.list().find(s => s.run && s.run.floor === 0)?.slot ?? 0;
      State.saveRun(freeSlot);
      // 嗨玩周开场动画
      (function showHaiwanzhou() {
        const overlay = document.createElement('div');
        overlay.id = 'haiwanzhou-overlay';
        overlay.innerHTML = '<div id="haiwanzhou-text">嗨玩周</div>';
        document.body.appendChild(overlay);
        // 1.2秒后开始淡出
        setTimeout(() => {
          const txt = document.getElementById('haiwanzhou-text');
          if(txt) {
            txt.style.animation = 'haiwanzhou-out 0.6s ease-in forwards';
          }
          setTimeout(() => {
            overlay.remove();
          }, 650);
        }, 1200);
      })();
      State.go('map');
    };
  },


  map(){
    const run=State.run;
    UI.app().innerHTML=`<div class="map-screen slide-up"><div class="map-topbar"><span style="font-size:1.6rem">${run.character.emoji}</span><b style="font-size:1.3rem">${run.character.name}</b><div style="min-width:140px">${UI.renderHpBar(run.character.hp,run.character.maxHp,'140px')}</div><div id="map-relic-bar-slot" style="display:flex;align-items:center"></div><span class="gold-display" style="margin-left:8px;font-size:1.1rem">💰 ${run.gold}</span><span style="font-size:1rem;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.08);padding:4px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.12)">${run.act===3?'露营周':run.act===2?'常识周':'第 '+run.floor+' 层'}</span><div class="potion-bar" id="map-potion-bar"></div><button class="btn" id="btn-deck" style="font-size:1rem;padding:6px 14px;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8)">🃏 牌组 (${run.deck.length})</button><button class="btn" onclick="Audio.showSettings()" style="font-size:1rem;padding:6px 12px;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8)">🎵 音频</button><button class="btn" onclick="UI.showPauseMenu()" style="font-size:1rem;padding:6px 12px;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.8)">☰ 菜单</button></div><div class="map-container" id="map-container"></div></div>`;
    // 渲染药水槽位
    const potionBarEl = document.getElementById('map-potion-bar');
    if(potionBarEl){ UI.renderPotionSlots(potionBarEl, run.potions||[null,null,null], false); }
    // 渲染遗物栏（在HP下方）
    const mapRelicSlot = document.getElementById('map-relic-bar-slot');
    if(mapRelicSlot){ mapRelicSlot.innerHTML=''; UI.renderRelicBar(mapRelicSlot); }
    const container=document.getElementById('map-container');
    MapGen.render(container,run.map,run.currentNodeId,node=>UI._enterNode(node),run.act||1);
    document.getElementById('btn-deck').onclick=()=>UI.showDeckOverlay(run.deck);
  },

  showDeckOverlay(deck){
    const overlay=document.createElement('div');overlay.className='overlay';
    const panel=document.createElement('div');panel.className='panel bounce-in';
    panel.style.cssText='max-width:90vw;max-height:85vh;overflow-y:auto';
    panel.innerHTML=`<h3 class="screen-title" style="margin-bottom:12px">🃏 牌组 (${deck.length} 张)</h3>`;
    const grid=document.createElement('div');grid.style.cssText='display:flex;flex-wrap:wrap;justify-content:center';
    const counts={};deck.forEach(id=>counts[id]=(counts[id]||0)+1);
    Object.entries(counts).forEach(([id,n])=>{
      const wrap=document.createElement('div');wrap.style.cssText='display:inline-block;margin:6px;position:relative;cursor:pointer';
      const inner=document.createElement('div');inner.style.position='relative';
      const cardEl=UI.renderCard(id);inner.appendChild(cardEl);
      const badge=document.createElement('span');
      badge.style.cssText='position:absolute;top:-8px;right:-8px;background:var(--energy);color:#fff;border:2.5px solid #fff;border-radius:50%;min-width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;box-shadow:0 2px 6px rgba(0,0,0,0.5);padding:0 3px';
      badge.textContent=`×${n}`;inner.appendChild(badge);wrap.appendChild(inner);
      const label=document.createElement('div');label.style.cssText='text-align:center;margin-top:4px;font-size:0.75rem;color:rgba(255,255,255,0.45)';label.textContent='双击查看详情';wrap.appendChild(label);
      // 双击查看单张卡牌详情
      let deckClickTimer=null;
      let deckLastTap=0;
      const _deckHandlePress = () => {
        const now = Date.now();
        if(now - deckLastTap < 280){
          clearTimeout(deckClickTimer); deckClickTimer=null;
          deckLastTap=0;
          UI._showCardDetailOverlay(id);
          return;
        }
        deckLastTap = now;
        if(deckClickTimer){clearTimeout(deckClickTimer);deckClickTimer=null;return;}
        deckClickTimer=setTimeout(()=>{deckClickTimer=null;},220);
      };
      wrap.addEventListener('click', _deckHandlePress);
      wrap.addEventListener('touchstart', e => { if(e.touches.length===1){ e.preventDefault(); _deckHandlePress(); } }, { passive: false });
      wrap.addEventListener('dblclick',()=>{
        if(deckClickTimer){clearTimeout(deckClickTimer);deckClickTimer=null;}
        UI._showCardDetailOverlay(id);
      });
      grid.appendChild(wrap);
    });
    panel.appendChild(grid);
    const closeBtn=document.createElement('button');closeBtn.className='btn';closeBtn.style.cssText='margin-top:16px;width:100%';closeBtn.textContent='关闭';
    closeBtn.onclick=()=>overlay.remove();panel.appendChild(closeBtn);
    overlay.appendChild(panel);
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});document.body.appendChild(overlay);
  },

  _enterNode(node){
    const run=State.run;
    // 记录实际行进过的边（用于地图高亮）
    if(run.currentNodeId!=null && run.currentNodeId!==node.id){
      if(!run.travelEdges) run.travelEdges=[];
      const edgeKey=run.currentNodeId+'->'+node.id;
      if(!run.travelEdges.includes(edgeKey)) run.travelEdges.push(edgeKey);
    }
    run.currentNodeId=node.id;run.floor=node.floor;State.saveRun(0);
    if(node.type==='boss'){
      const run=State.run;
      // 教程模式使用专属简单Boss
      if(run.isTutorial){ Combat.init(Data.encounters.boss_tutorial[0]); State.go('combat'); return; }
      // act3使用act2的boss（班布），act1使用兔子，其他同样
      const bossEnc=run.act===3?Data.encounters.boss3[0]:(run.act===2?Data.encounters.boss2[0]:Data.encounters.boss[0]);
      Combat.init(bossEnc);State.go('combat');
    }
    else if(node.type==='combat'||node.type==='elite'){
      const run=State.run;
      let table;
      if(run.act===3){
        // 第三层专属战斗表
        table=node.type==='elite'?'hard3':node.floor<=3?'easy3':node.floor<=6?'medium3':'hard3';
      } else if(run.act===2){
        table=node.type==='elite'?'hard2':node.floor<=3?'easy2':node.floor<=6?'medium2':'hard2';
      } else {
        table=node.type==='elite'?'hard':node.floor<=2?'easy':node.floor<=4?'medium':'hard';
      }
      const enc=Data.encounters[table];Combat.init(enc[Math.floor(Math.random()*enc.length)]);State.go('combat');
    }
    else if(node.type==='rest'){State.go('rest');}
    else if(node.type==='shop'){State.go('shop');}
    else if(node.type==='question'){State.go('question');}
  },

  // ── susu的怀表：时间倒流演出（onDone 在动画结束后回调） ──────────────
  _triggerPocketWatch(isBoss, onDone){
    // 先暂停 BGM；演出结束后根据当前屏幕恢复
    const _bgmModeBefore = Audio._bgmMode;
    try { Audio.stopAll && Audio.stopAll(); } catch(e){}

    // 先黑屏 0.5s，然后再开始整套动画
    const blackVeil = document.createElement('div');
    blackVeil.style.cssText = 'position:fixed;inset:0;z-index:99998;background:#000;opacity:0;transition:opacity 0.1s linear;pointer-events:auto;';
    document.body.appendChild(blackVeil);
    requestAnimationFrame(()=>{ blackVeil.style.opacity = '1'; });

    const _startAnim = () => {
      // 黑幕保留在底下，等怀表 overlay 自己淡入盖住它；动画结束时一起移除
      this._renderPocketWatchScene(isBoss, _bgmModeBefore, blackVeil, onDone);
    };
    setTimeout(_startAnim, 200);
  },

  _renderPocketWatchScene(isBoss, _bgmModeBefore, blackVeil, onDone){
    // 注入一次性 keyframes（如果还没注入）
    if(!document.getElementById('pocketwatch-style')){
      const st=document.createElement('style'); st.id='pocketwatch-style';
      st.textContent=`
        @keyframes pw-spinHour { from{transform:translate(-50%,-100%) rotate(0deg);} to{transform:translate(-50%,-100%) rotate(-73deg);} }
        @keyframes pw-spinMin  { from{transform:translate(-50%,-100%) rotate(0deg);} to{transform:translate(-50%,-100%) rotate(-227deg);} }
        @keyframes pw-spinSec  { from{transform:translate(-50%,-100%) rotate(0deg);} to{transform:translate(-50%,-100%) rotate(-1043deg);} }
        @keyframes pw-fadeIn { from{opacity:0;backdrop-filter:blur(0);} to{opacity:1;backdrop-filter:blur(8px);} }
        @keyframes pw-fadeOut { from{opacity:1;backdrop-filter:blur(8px);} to{opacity:0;backdrop-filter:blur(0);} }
        /* Elastic 弹性入场：模拟 GSAP Elastic.easeOut(1.2, 0.75)，从 0 弹大，多次振荡后稳定 */
        @keyframes pw-watchIn {
          0%   { transform:translate(-50%,-50%) scale(0)    rotate(-180deg); opacity:0; }
          20%  { transform:translate(-50%,-50%) scale(0.45) rotate(-50deg);  opacity:1; }
          35%  { transform:translate(-50%,-50%) scale(1.18) rotate(18deg);   opacity:1; }
          50%  { transform:translate(-50%,-50%) scale(0.88) rotate(-10deg);  opacity:1; }
          65%  { transform:translate(-50%,-50%) scale(1.08) rotate(6deg);    opacity:1; }
          78%  { transform:translate(-50%,-50%) scale(0.96) rotate(-3deg);   opacity:1; }
          88%  { transform:translate(-50%,-50%) scale(1.02) rotate(1deg);    opacity:1; }
          100% { transform:translate(-50%,-50%) scale(1)    rotate(0deg);    opacity:1; }
        }
        @keyframes pw-titleIn { 0%{transform:translateX(-50%) translateY(40px);opacity:0;letter-spacing:1em;} 100%{transform:translateX(-50%) translateY(0);opacity:1;letter-spacing:0.18em;} }
        @keyframes pw-rayRotate { from{transform:translate(-50%,-50%) rotate(0deg);} to{transform:translate(-50%,-50%) rotate(360deg);} }
        @keyframes pw-rayPulse { 0%,100%{opacity:0.35;} 50%{opacity:0.7;} }
        @keyframes pw-vignette { 0%{box-shadow:inset 0 0 0 0 rgba(0,0,0,0);} 100%{box-shadow:inset 0 0 300px 60px rgba(0,0,0,0.85);} }
      `;
      document.head.appendChild(st);
    }
    // 延迟 0.5s 后再播放语音，让指针先转起来；语音结束 + 0.5s 后再淡出并恢复 BGM
    let _audioEl = null;
    let _dismissed = false;
    const restoreBgm = () => {
      try {
        if(_bgmModeBefore === 'combat') Audio.startBgmCombat();
        else if(_bgmModeBefore === 'map') Audio.startBgmMap();
      } catch(e){}
    };
    const dismiss = () => {
      if(_dismissed) return; _dismissed = true;
      if(overlay && overlay.parentNode){
        overlay.style.animation = 'pw-fadeOut 0.7s ease forwards';
        if(blackVeil) blackVeil.style.transition = 'opacity 0.7s ease';
        if(blackVeil) blackVeil.style.opacity = '0';
        setTimeout(()=>{
          overlay.remove();
          if(blackVeil && blackVeil.parentNode) blackVeil.remove();
          restoreBgm();
          if(typeof onDone==='function') onDone();
        }, 750);
      } else {
        if(blackVeil && blackVeil.parentNode) blackVeil.remove();
        restoreBgm();
        if(typeof onDone==='function') onDone();
      }
    };
    setTimeout(()=>{
      try{
        _audioEl = new window.Audio('manus-storage/susu_pocketwatch.m4a');
        _audioEl.volume = 0.9;
        _audioEl.play().catch(()=>{});
        _audioEl.onended = ()=>{ setTimeout(dismiss, 500); };
      }catch(e){ setTimeout(dismiss, 4000); }
    }, 500);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:radial-gradient(circle at center,#1a1208 0%,#06050a 70%);animation:pw-fadeIn 0.6s ease forwards, pw-vignette 1.5s ease forwards;pointer-events:auto;overflow:hidden;';

    // 旋转光芒射线（大圆放射状）
    overlay.innerHTML = `
      <div style="position:absolute;top:50%;left:50%;width:140vmax;height:140vmax;animation:pw-rayRotate 6s linear infinite,pw-rayPulse 2.4s ease-in-out infinite;background:conic-gradient(from 0deg, rgba(180,180,200,0.14) 0deg 4deg, transparent 4deg 18deg, rgba(180,180,200,0.14) 18deg 22deg, transparent 22deg 40deg, rgba(180,180,200,0.14) 40deg 44deg, transparent 44deg 60deg, rgba(180,180,200,0.14) 60deg 64deg, transparent 64deg 90deg, rgba(180,180,200,0.14) 90deg 94deg, transparent 94deg 120deg, rgba(180,180,200,0.14) 120deg 124deg, transparent 124deg 150deg, rgba(180,180,200,0.14) 150deg 154deg, transparent 154deg 180deg, rgba(180,180,200,0.14) 180deg 184deg, transparent 184deg 210deg, rgba(180,180,200,0.14) 210deg 214deg, transparent 214deg 240deg, rgba(180,180,200,0.14) 240deg 244deg, transparent 244deg 270deg, rgba(180,180,200,0.14) 270deg 274deg, transparent 274deg 300deg, rgba(180,180,200,0.14) 300deg 304deg, transparent 304deg 330deg, rgba(180,180,200,0.14) 330deg 334deg, transparent 334deg 360deg);transform:translate(-50%,-50%);"></div>
      <!-- 怀表本体 SVG -->
      <div id="pw-watch" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);width:min(60vmin,560px);height:min(60vmin,560px);animation:pw-watchIn 1.8s linear forwards;filter:drop-shadow(0 0 22px rgba(200,200,220,0.45)) drop-shadow(0 0 70px rgba(60,60,90,0.7));">
        <svg viewBox="0 0 400 460" style="width:100%;height:100%;">
          <defs>
            <radialGradient id="pw-bodyGrad" cx="40%" cy="30%" r="75%">
              <stop offset="0%" stop-color="#4a4a52"/>
              <stop offset="35%" stop-color="#26262c"/>
              <stop offset="75%" stop-color="#0d0d12"/>
              <stop offset="100%" stop-color="#000"/>
            </radialGradient>
            <radialGradient id="pw-faceGrad" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stop-color="#252530"/>
              <stop offset="70%" stop-color="#101015"/>
              <stop offset="100%" stop-color="#02020a"/>
            </radialGradient>
            <linearGradient id="pw-handGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d4d4dc"/>
              <stop offset="100%" stop-color="#7a7a86"/>
            </linearGradient>
          </defs>
          <!-- 链条小环 -->
          <circle cx="200" cy="22" r="14" fill="none" stroke="#2a2a32" stroke-width="6"/>
          <circle cx="200" cy="22" r="14" fill="none" stroke="#050508" stroke-width="2"/>
          <!-- 上方按钮 -->
          <rect x="188" y="38" width="24" height="22" rx="4" fill="url(#pw-bodyGrad)" stroke="#000" stroke-width="2"/>
          <!-- 表壳外圈 -->
          <circle cx="200" cy="240" r="180" fill="url(#pw-bodyGrad)" stroke="#000" stroke-width="4"/>
          <!-- 表壳内环装饰 -->
          <circle cx="200" cy="240" r="165" fill="none" stroke="#3a3a44" stroke-width="2" opacity="0.85"/>
          <circle cx="200" cy="240" r="158" fill="none" stroke="#5a5a66" stroke-width="1.5"/>
          <!-- 表面 -->
          <circle cx="200" cy="240" r="148" fill="url(#pw-faceGrad)" stroke="#0a0a10" stroke-width="3"/>
          <!-- 罗马数字时标（银白色） -->
          ${[
            ['XII',200,108],['I',267,124],['II',316,168],['III',332,240],['IV',316,312],['V',267,356],
            ['VI',200,372],['VII',133,356],['VIII',84,312],['IX',68,240],['X',84,168],['XI',133,124]
          ].map(([n,x,y])=>`<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="#d8d8e4">${n}</text>`).join('')}
          <!-- 中心装饰小圆 -->
          <circle cx="200" cy="240" r="14" fill="#1a1a22"/>
          <circle cx="200" cy="240" r="8" fill="#050508"/>
        </svg>
        <!-- 指针：3秒内由快到慢停下，停留角度刻意不规整 -->
        <div style="position:absolute;top:54.5%;left:50%;width:8px;height:30%;background:linear-gradient(to bottom,#e8e8f0 0%,#9a9aa6 100%);border-radius:4px 4px 0 0;transform-origin:50% 100%;transform:translate(-50%,-100%);animation:pw-spinHour 3s cubic-bezier(0.05,0.7,0.25,1) forwards;box-shadow:0 0 5px rgba(0,0,0,0.9);"></div>
        <div style="position:absolute;top:54.5%;left:50%;width:5px;height:40%;background:linear-gradient(to bottom,#f0f0f8 0%,#b0b0bc 100%);border-radius:2.5px 2.5px 0 0;transform-origin:50% 100%;transform:translate(-50%,-100%);animation:pw-spinMin 3s cubic-bezier(0.05,0.7,0.25,1) forwards;box-shadow:0 0 5px rgba(0,0,0,0.8);"></div>
        <div style="position:absolute;top:54.5%;left:50%;width:2.5px;height:44%;background:#e23a44;transform-origin:50% 100%;transform:translate(-50%,-100%);animation:pw-spinSec 3s cubic-bezier(0.05,0.7,0.25,1) forwards;box-shadow:0 0 5px rgba(226,58,68,0.85);"></div>
      </div>
      <!-- 顶部标题 -->
      <div style="position:absolute;top:8vh;left:50%;transform:translateX(-50%);font-family:'Georgia',serif;color:#e8e8f0;font-size:clamp(1.4rem,3.4vw,2.6rem);font-weight:900;letter-spacing:0.12em;text-shadow:0 0 24px rgba(220,220,240,0.7),0 0 48px rgba(120,120,160,0.5),0 2px 0 #000;animation:pw-titleIn 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.4s forwards;opacity:0;white-space:nowrap;">咦？真由氏的怀表怎么停掉了？</div>
      <div style="position:absolute;top:calc(8vh + clamp(2.0rem,4vw,3.2rem) + 16px);left:50%;transform:translateX(-50%);color:rgba(220,220,240,0.7);font-size:clamp(0.85rem,1.6vw,1.05rem);letter-spacing:0.32em;text-shadow:0 0 12px rgba(180,180,220,0.5);animation:pw-titleIn 1.0s ease-out 0.9s forwards;opacity:0;white-space:nowrap;">SUSU'S POCKET WATCH</div>
    `;
    document.body.appendChild(overlay);

    // 兜底：如果语音加载失败或 onended 不触发，最长 15 秒后强制淡出
    setTimeout(dismiss, 15000);
  },

  _showRelicPickup(relicId, name, icon, effectText, onPick, onSkip){
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.82);pointer-events:auto;';
    const relic = Data.battleRelics.find(r => r.id === relicId);
    // 根据稀有度决定颜色和发光动画
    const tierColor = { common:'#c0c0c0', uncommon:'#4caf50', rare:'#7ecfff', epic:'#e056fd' };
    const tierName  = { common:'普通', uncommon:'精良', rare:'稀有', epic:'史诗' };
    const tierAnim  = { common:'relicGlowCommon', uncommon:'relicGlowCommon', rare:'relicGlow', epic:'relicGlowEpic' };
    const tier = (relic && relic.tier) || 'common';
    const color = tierColor[tier] || '#7ecfff';
    const glowAnim = tierAnim[tier] || 'relicGlow';
    const imgHtml = (relic && relic.img)
      ? `<img src="${relic.img}" style="width:120px;height:120px;object-fit:contain;image-rendering:pixelated;animation:relicIconFloat 2s ease-in-out infinite;display:block;margin:0 auto 16px;">`
      : `<div style="font-size:6rem;margin-bottom:16px;animation:relicIconFloat 2s ease-in-out infinite">${icon||'🎁'}</div>`;
    overlay.innerHTML = `
      <div id="relic-popup-card" style="background:linear-gradient(135deg,rgba(20,20,40,0.95),rgba(10,10,30,0.98));border:2px solid ${color};border-radius:22px;padding:36px 56px 28px;text-align:center;animation:bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1),${glowAnim} 2s ease-in-out 0.5s infinite;max-width:420px;">
        <div style="font-size:1.2rem;font-weight:900;color:#FFD700;text-shadow:0 0 20px rgba(255,215,0,0.8);margin-bottom:14px;letter-spacing:3px">✨ 遗物掉落！</div>
        ${imgHtml}
        <div style="display:inline-block;font-size:0.75rem;padding:2px 10px;border-radius:10px;background:${color}22;color:${color};border:1px solid ${color}66;margin-bottom:10px">${tierName[tier]||''}</div>
        <div style="font-size:1.7rem;font-weight:700;color:${color};text-shadow:0 0 16px ${color}99;margin-bottom:8px">${name}</div>
        <div style="font-size:0.95rem;color:rgba(255,255,255,0.8);line-height:1.5;margin-bottom:24px">${effectText}</div>
        <div style="display:flex;gap:16px;justify-content:center;">
          <button id="relic-btn-pick" style="padding:12px 32px;background:${color};color:#0a0a1a;border:none;border-radius:12px;font-size:1.05rem;font-weight:700;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;box-shadow:0 0 16px ${color}88">✅ 拾取</button>
          <button id="relic-btn-skip" style="padding:12px 32px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6);border:1.5px solid rgba(255,255,255,0.2);border-radius:12px;font-size:1.05rem;font-weight:600;cursor:pointer;transition:transform 0.15s">❌ 放弃</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const dismiss = (cb) => {
      overlay.style.transition = 'opacity 0.35s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.remove(); if(cb) cb(); }, 350);
    };
    overlay.querySelector('#relic-btn-pick').onclick = (e) => {
      e.stopPropagation();
      dismiss(onPick);
    };
    overlay.querySelector('#relic-btn-skip').onclick = (e) => {
      e.stopPropagation();
      dismiss(onSkip);
    };
  },

  combat(){ UI._selectedCard=null;UI._renderCombat(); },

  _renderCombat(){
    const run=State.run,cs=run.combat;if(!cs)return;const app=UI.app();app.innerHTML='';
    const screen=document.createElement('div');screen.className='combat-screen';
    screen.innerHTML=`
<div class="combat-topbar">
  <div style="display:flex;align-items:center;gap:10px;flex:1;flex-wrap:wrap">
    <span style="font-size:1.4rem">${run.character.emoji}</span>
    <b style="font-size:1.1rem;color:#fff">${run.character.name}</b>
    <div style="min-width:140px">${UI.renderHpBar(cs.player.hp,cs.player.maxHp,'140px',cs.player.block)}</div>
    <div id="combat-relic-bar-slot" style="display:flex;align-items:center"></div>
    
  </div>
  <div style="display:flex;align-items:center;gap:6px">
    <span style="font-size:0.95rem;color:rgba(255,255,255,0.6)">第 ${cs.turn} 回合</span>
  </div>
  <div style="display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-end">
    <div class="potion-bar" id="combat-potion-bar"></div>
    <button onclick="Audio.showSettings()" style="font-size:0.9rem;padding:4px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;cursor:pointer;">🎵</button><button onclick="UI.showPauseMenu()" style="font-size:0.9rem;padding:4px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;cursor:pointer;">☰</button>
  </div>
</div>
<div class="combat-field">
  <div class="player-area" id="player-area">
    <div class="player-figure" id="player-figure" title="点击查看角色说明" style="cursor:pointer;transition:transform 0.15s" onmouseenter="this.style.transform='scale(1.18)'" onmouseleave="this.style.transform='scale(1)'">${run.character.emoji}</div>
    <div style="width:130px">${UI.renderHpBar(cs.player.hp,cs.player.maxHp,'130px',cs.player.block)}</div>
    <div style="font-size:1rem;color:#e8e8f0;font-weight:600;text-align:center">${cs.player.hp}/${cs.player.maxHp} HP${cs.player.block>0?` · <span style='color:#5dade2'>🛡${cs.player.block}</span>`:''}</div>
    <div style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center">${UI.renderBuffs(cs.player)}</div>
    ${run.character.id==='archer'?(()=>{
      const chg=cs.charge||0;
      const max=cs.chargeMax||5;
      const pct=Math.round(chg/max*100);
      const barColor=chg>=max?'#ff6b6b':chg>=3?'#f9ca24':'#5dade2';
      return `<div id="archer-charge-hud-wrap" style="margin-top:8px;display:flex;flex-direction:column;align-items:center;gap:5px">
        <div id="archer-charge-hud" style="font-size:1.05rem;font-weight:900;color:${barColor};letter-spacing:0.5px;text-shadow:0 0 8px ${barColor}88">⚡ 蓄力 ${chg}/${max}</div>
        <div style="width:110px;height:8px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden">
          <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.3s"></div>
        </div>
        ${chg>=max?'<div style="font-size:0.78rem;color:#ff6b6b;font-weight:700;animation:pulse 0.8s infinite">🎯 满蓄！</div>':''}
      </div>`;
    })():''}
    ${run.character.id==='racer'?(()=>{
      const g=cs.gear||2;
      const gearColors=['','#7dccff','#e8e8e8','#ff7d7d'];
      const gearNames=['','1挡·防御','2挡·中立','3挡·攻击'];
      const gearIcons=['','↓','•','↑'];
      const gc=gearColors[g];
      const spd=cs.speed||0;
      const mom=cs.momentum||0;
      return `<div id="gear-hud" style="margin-top:8px;display:flex;flex-direction:column;align-items:center;gap:6px">
        <div style="display:flex;gap:5px;align-items:center">
          ${[1,2,3].map(i=>{
            const active=g===i;
            const c=gearColors[i];
            return `<div style="width:52px;padding:5px 0;border-radius:10px;font-size:${active?'1.05rem':'0.82rem'};font-weight:900;text-align:center;border:${active?'2.5px':'1.5px'} solid ${active?c:'rgba(255,255,255,0.2)'};background:${active?c+'33':'rgba(255,255,255,0.04)'};color:${active?c:'rgba(255,255,255,0.3)'};box-shadow:${active?'0 0 10px '+c+'66':'none'};transition:all 0.2s">${gearIcons[i]}${i}挡</div>`;
          }).join('')}
        </div>
        <div style="font-size:1.05rem;font-weight:900;color:${gc};letter-spacing:0.5px;text-shadow:0 0 8px ${gc}88">${gearNames[g]}</div>
        <div style="display:flex;gap:8px;align-items:center">
          <div id="speed-hud-btn" onclick="UI.toggleSpeedPanel(${spd})" style="cursor:pointer;font-size:0.88rem;font-weight:700;color:#f9ca24;background:rgba(249,202,36,0.12);border:1.5px solid rgba(249,202,36,0.4);border-radius:8px;padding:2px 10px;user-select:none;transition:background 0.15s" onmouseenter="this.style.background='rgba(249,202,36,0.25)'" onmouseleave="this.style.background='rgba(249,202,36,0.12)'">⚡ 速度感 <b>${spd}</b>${spd>=60?' 🔥':spd>=30?' ⚡':spd>=15?' 🛡':''}</div>'+
          ${mom>0?`<div style="font-size:0.85rem;font-weight:700;color:#a8e6cf;background:rgba(168,230,207,0.12);border:1.5px solid rgba(168,230,207,0.4);border-radius:8px;padding:2px 10px">⬆ 势头 <b>${mom}</b></div>`:''}
        </div>
      </div>`;
    })():''}
  </div>
  <div class="enemies-area" id="enemies-area"></div>
</div>
<div class="combat-hand-area">
  <div class="combat-controls" style="margin-left:64px">
    <div class="pile" id="draw-pile">
      <div class="pile-icon">🃏</div>
      <div class="pile-count">${cs.drawPile.length}</div>
      <div class="pile-label">摸牌堆</div>
    </div>
    <div class="energy-orb" id="energy-orb">${cs.energy}<div class="energy-label">能量</div></div>
  </div>
  <div class="hand-cards" id="hand-cards"></div>
  <div class="combat-controls" style="flex-direction:column;gap:10px">
    <div class="pile discard" id="discard-pile">
      <div class="pile-icon">🗑️</div>
      <div class="pile-count">${cs.discardPile.length}</div>
      <div class="pile-label">弃牌堆</div>
    </div>
    <button class="btn end-turn-btn" id="btn-end-turn" ${cs.phase!=='player'?'disabled':''}>结束回合</button>
  </div>
</div>`;
    app.appendChild(screen);
    if(cs.phase==='victory'){const v=document.createElement('div');v.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);z-index:50;font-family:var(--font);font-size:3rem;color:var(--gold);font-weight:700;';v.textContent='🏆 胜利!';v.classList.add('bounce-in');app.appendChild(v);}
    UI._renderEnemies(cs);UI._renderHand(cs);
    // 绑定玩家区域的 buff tooltip
    UI._bindBuffTooltips(screen);
    document.getElementById('btn-end-turn')?.addEventListener('click',()=>UI._doEndTurn());
    // ✅ 修复：摘牌堆显示真实牌内容
    // 双击查看牌堆详情
    document.getElementById('draw-pile')?.addEventListener('dblclick',()=>UI._showPileOverlay('摘牌堆（下次抽牌从顶部开始）',[...cs.drawPile]));
    document.getElementById('discard-pile')?.addEventListener('dblclick',()=>UI._showPileOverlay('弃牌堆',cs.discardPile));
    // 单击显示提示（不弹出内容）
    document.getElementById('draw-pile')?.addEventListener('click',()=>{
      const el=document.getElementById('draw-pile');
      if(!el._hintShown){
        el._hintShown=true;
        const tip=document.createElement('div');
        tip.style.cssText='position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:0.7rem;color:rgba(255,255,255,0.5);white-space:nowrap;pointer-events:none;z-index:10';
        tip.textContent='双击查看';
        el.style.position='relative';
        el.appendChild(tip);
        setTimeout(()=>{ tip.remove(); el._hintShown=false; },1500);
      }
    });
    document.getElementById('discard-pile')?.addEventListener('click',()=>{
      const el=document.getElementById('discard-pile');
      if(!el._hintShown){
        el._hintShown=true;
        const tip=document.createElement('div');
        tip.style.cssText='position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:0.7rem;color:rgba(255,255,255,0.5);white-space:nowrap;pointer-events:none;z-index:10';
        tip.textContent='双击查看';
        el.style.position='relative';
        el.appendChild(tip);
        setTimeout(()=>{ tip.remove(); el._hintShown=false; },1500);
      }
    });
    // 点击人物头像显示角色说明
    document.getElementById('player-figure')?.addEventListener('click',()=>UI.showCharacterGuide(run.character.id));
    // 渲染战斗药水槽位
    const combatPotionBar = document.getElementById('combat-potion-bar');
    if(combatPotionBar){ UI.renderPotionSlots(combatPotionBar, run.potions||[null,null,null], true); }
    // 渲染遗物栏（在HP下方）
    const combatRelicSlot = document.getElementById('combat-relic-bar-slot');
    if(combatRelicSlot){ combatRelicSlot.innerHTML=''; UI.renderRelicBar(combatRelicSlot); }
  },

  _renderEnemies(cs){
    const area=document.getElementById('enemies-area');if(!area)return;area.innerHTML='';
    cs.enemies.forEach((enemy,i)=>{
      if(enemy._dead)return;const wrap=document.createElement('div');wrap.className='enemy-card';wrap.id=`enemy-wrap-${i}`;wrap.dataset.enemyIndex=i;
      const intentArr=Array.isArray(enemy.currentIntent)?enemy.currentIntent:(enemy.currentIntent?[enemy.currentIntent]:[{type:'unknown',label:'❓',num:'?'}]);
      // 过滤掉纯防御意图的格挡预告图标（格挡只在真正进入血条时才显示，不提前预告）
      const visibleIntentArr=intentArr.filter(it=>it.type!=='defend');
      // 若所有意图均为防御则留空，不显示问号
      const _hasGlasses=State.run?.relics?.includes('wangwei_glasses');
      const _hasSlow=(enemy.debuffs?.slow||0)>0;
      const _hasWeak=(enemy.debuffs?.weak||0)>0;
      const _hasVuln=(cs.player.debuffs?.vulnerable||0)>0;
      // 把怪物攻击意图换算成玩家实际会承受的伤害（虚弱/减速 减伤，易伤 增伤），玩家无需自己算
      const _modDmg=(v)=>{
        let d=v;
        if(_hasWeak) d=Math.floor(d*0.75);
        if(_hasSlow) d=Math.floor(d*0.70);
        if(_hasVuln) d=Math.floor(d*1.5);
        return d;
      };
      const intentHtml=visibleIntentArr.map(it=>{
        const glassesTag=(_hasGlasses&&it.type==='attack')?`<span style="font-size:0.7em;margin-left:2px;opacity:0.85;vertical-align:middle" title="👓 王微的眼镜：20% 概率减少最多 15 点伤害">👓</span>`:'';
        const slowTag=(_hasSlow&&it.type==='attack')?`<span style="font-size:0.7em;margin-left:2px;opacity:0.85;vertical-align:middle" title="🐢 减速（赛车手专属）：攻击伤害 -30%">🐢</span>`:'';
        const weakTag=(_hasWeak&&it.type==='attack')?`<span style="font-size:0.7em;margin-left:2px;opacity:0.85;vertical-align:middle" title="💧 虚弱：怪物攻击伤害 -25%">💧</span>`:'';
        const vulnTag=(_hasVuln&&it.type==='attack')?`<span style="font-size:0.7em;margin-left:2px;opacity:0.85;vertical-align:middle" title="💥 易伤：你受到的伤害 +50%">💥</span>`:'';
        // 攻击意图数值实时换算成玩家实际会承受的伤害（支持单段与「×N(每段)」多段格式）
        let displayNum=it.num||'';
        if(it.type==='attack' && (_hasWeak||_hasSlow||_hasVuln) && displayNum){
          const m=String(displayNum).match(/^×(\d+)\((\d+)\)$/);
          if(m){
            displayNum=`×${m[1]}(${_modDmg(parseInt(m[2]))})`;
          } else if(typeof it.val==='number'){
            displayNum=String(_modDmg(it.val));
          } else if(!isNaN(parseInt(displayNum))){
            displayNum=String(_modDmg(parseInt(displayNum)));
          }
        }
        return `<span class="intent-badge ${it.type||'unknown'}">${it.label}<span style="font-size:0.95em">${displayNum}</span>${glassesTag}${slowTag}${weakTag}${vulnTag}</span>`;
      }).join('');
      wrap.style.position='relative';
      wrap.innerHTML=`<div class="enemy-intent">${intentHtml}</div><div class="enemy-figure" id="enemy-fig-${i}">${enemy.emoji}</div><div style="width:130px">${UI.renderHpBar(enemy.hp,enemy.maxHp,'130px',enemy.block)}</div><div style="font-size:1.1rem;font-weight:700;color:#e8e8f0">${enemy.name}</div><div style="font-size:0.95rem;color:rgba(255,255,255,0.8)">${enemy.hp}/${enemy.maxHp} HP${enemy.block>0?` · 🛡${enemy.block}`:''}</div><div class="enemy-buffs" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center">${UI.renderBuffs(enemy)}</div>`;
      // 悬停敌人显示详细 tooltip（含下一步意图说明）
      wrap.addEventListener('mouseenter', ()=>{
        const allBuffs=Object.entries(enemy.buffs||{}).filter(([,v])=>v>0);
        const allDebuffs=Object.entries(enemy.debuffs||{}).filter(([,v])=>v>0);
        const intentArr2=Array.isArray(enemy.currentIntent)?enemy.currentIntent:(enemy.currentIntent?[enemy.currentIntent]:[]);
        if(allBuffs.length===0 && allDebuffs.length===0 && intentArr2.length===0) return;
        const tt=document.createElement('div');
        tt.className='enemy-tooltip';
        let html=`<div class="ett-title">${enemy.emoji} ${enemy.name}</div>`;
        // 意图说明区（支持多个）
        if(intentArr2.length>0){
          const colorMap={attack:'#ff6b6b',buff:'#6bcb77',debuff:'#f4a261',defend:'#74b9ff',mixed:'#cc88ff'};
          html+=`<div style="font-size:0.78rem;color:rgba(255,255,255,0.45);margin:2px 0 4px">▶ 下一步行动</div>`;
          intentArr2.forEach(intentObj=>{
            if(!intentObj.detail) return;
            const intentColor=colorMap[intentObj.type]||'#e8e8f0';
            html+=`<div class="ett-section" style="border-left:3px solid ${intentColor};padding-left:8px;margin-bottom:6px">`;
            html+=`<div style="font-size:0.88rem;font-weight:700;color:${intentColor};margin-bottom:3px">${intentObj.label} ${intentObj.num||''}</div>`;
            intentObj.detail.split('\n').forEach(line=>{
              html+=`<div class="ett-text" style="color:rgba(255,255,255,0.82);font-size:0.8rem">${line}</div>`;
            });
            html+=`</div>`;
          });
        }
        if(allBuffs.length>0){
          html+=`<div style="font-size:0.78rem;color:rgba(255,255,255,0.45);margin:4px 0 2px">当前增益</div>`;
          html+=`<div class="ett-section">`;
          allBuffs.forEach(([k,v])=>{
            const info=UI._buffDescs[k]||{name:k,icon:'✨',desc:'增益效果'};
            html+=`<div class="ett-row"><div class="ett-icon buff">${info.icon}</div><div class="ett-text">${info.name}：${info.desc}</div><div class="ett-val">×${v}</div></div>`;
          });
          html+=`</div>`;
        }
        if(allDebuffs.length>0){
          html+=`<div style="font-size:0.78rem;color:rgba(255,255,255,0.45);margin:4px 0 2px">当前减益</div>`;
          html+=`<div class="ett-section">`;
          allDebuffs.forEach(([k,v])=>{
            const info=UI._debuffDescs[k]||{name:k,icon:'❌',desc:'减益效果'};
            html+=`<div class="ett-row"><div class="ett-icon debuff">${info.icon}</div><div class="ett-text">${info.name}：${info.desc}</div><div class="ett-val">×${v}</div></div>`;
          });
          html+=`</div>`;
        }
        tt.innerHTML=html;
        wrap.appendChild(tt);
      });
      wrap.addEventListener('mouseleave', ()=>{
        wrap.querySelector('.enemy-tooltip')?.remove();
      });
      wrap.onclick=()=>UI._onEnemyClick(i);area.appendChild(wrap);
    });
  },

  _showMagnifierAnim(handIdx){
    // 轻量提示：仅在被选中牌上方显示小气泡，0.8s后淡出
    const handEl = document.getElementById('hand-cards');
    if(!handEl) return;
    const cards = handEl.querySelectorAll('.card');
    const targetCard = cards[handIdx];
    if(!targetCard) return;
    const rect = targetCard.getBoundingClientRect();
    const tip = document.createElement('div');
    tip.style.cssText = `position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top - 42}px;transform:translateX(-50%);background:rgba(20,20,20,0.88);color:#f1c40f;font-size:0.9rem;font-weight:bold;padding:5px 14px;border-radius:16px;border:1.5px solid #f1c40f;z-index:10000;pointer-events:none;white-space:nowrap;opacity:1;transition:opacity 0.5s`;
    tip.textContent = '🔍 0费';
    document.body.appendChild(tip);
    setTimeout(()=>{ tip.style.opacity='0'; setTimeout(()=>tip.remove(), 520); }, 800);
  },

  _renderHand(cs){
    const handEl=document.getElementById('hand-cards');if(!handEl)return;handEl.innerHTML='';
    UI._hideCardHoverTip();
    cs.hand.forEach((cardId,idx)=>{
      const def=Data.cards[cardId];if(!def)return;
      // 放大镜：直接用手牌位置索引判断，精确匹配唯一那张牌
      const isMagnifier = cs.magnifierActive && cs.magnifierHandIndex === idx;
      // 醪糟水：显示随机化后的费用
      const isLaozao2 = cs.laozaoActive && Array.isArray(cs.laozaoCostsArr) && idx < cs.laozaoCostsArr.length;
      const laozaoCost2 = isLaozao2 ? cs.laozaoCostsArr[idx] : null;
      // 升级后的费用
      const _rhUpgLv = cs.handUpgrades ? (cs.handUpgrades[idx] || 0) : 0;
      let _rhBaseCost = def.cost;
      if(_rhUpgLv > 0){
        const _rhUpgDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][_rhUpgLv];
        if(_rhUpgDef && _rhUpgDef.cost !== undefined) _rhBaseCost = _rhUpgDef.cost;
      }
      const effectiveCost = isMagnifier ? 0 : (isLaozao2 ? laozaoCost2 : _rhBaseCost);
      const displayOverride = isMagnifier ? 0 : (isLaozao2 ? laozaoCost2 : (_rhUpgLv > 0 ? _rhBaseCost : undefined));
      const _handUpgradeLv = cs.handUpgrades ? (cs.handUpgrades[idx] || 0) : 0;
      const cardEl=UI.renderCard(cardId, displayOverride, _handUpgradeLv, true);
      cardEl.dataset.handIdx = String(idx); // 精确手牌位置，供打牌逻辑使用
      const canPlay=cs.energy>=effectiveCost&&cs.phase==='player'&&effectiveCost!==99;
      if(!canPlay)cardEl.classList.add('unplayable');if(UI._selectedCard===cardId)cardEl.classList.add('selected');
      // 放大镜高亮效果
      if(isMagnifier){
        cardEl.classList.add('magnifier-highlight');
        cardEl.title = '🔍 放大镜：本场战斗费用为 0！';
      }
      cardEl.classList.add('card-draw-anim');cardEl.style.animationDelay=`${idx*50}ms`;
      // 双击检测：用 UI._tapTime 存储（不依赖DOM元素，重渲染后仍有效）
      if(!UI._tapTime) UI._tapTime = {};
      const _handleCardPress = (e, isTouchEvent) => {
        if(!isTouchEvent && e.button!==0) return;
        e.preventDefault();
        const now = Date.now();
        const tapKey = cardId + '_' + idx;
        const cs2=State.run?.combat;
        const def2=Data.cards[cardId];
        // 判断是否双击（280ms内第二次按下同一张牌）
        if(UI._tapTime[tapKey] && now - UI._tapTime[tapKey] < 280 && cs2 && cs2.phase==='player' && def2){
          UI._tapTime[tapKey] = 0; // 重置，防止三击
          if(!def2.needsTarget){
            UI._playCard(cardId,cardEl,undefined,idx);
          } else {
            // 多怪时：自动攻击从左往右第一个存活怪物
            const autoIdx2=(cs2.enemies||[]).findIndex(en=>!en._dead);
            if(autoIdx2!==-1) UI._playCard(cardId,cardEl,autoIdx2,idx);
          }
          return; // 双击处理完毕，不进入拖拽
        }
        UI._tapTime[tapKey] = now;
        if(!isTouchEvent) UI._startDrag(cardId,cardEl,e);
      };
      cardEl.addEventListener('mousedown', e => _handleCardPress(e, false));
      // 移动端 touch 支持：touchstart 触发双击检测
      cardEl.addEventListener('touchstart', e => {
        if(e.touches.length !== 1) return;
        const touch = e.touches[0];
        const fakeE = { button:0, clientX:touch.clientX, clientY:touch.clientY, preventDefault:()=>e.preventDefault() };
        _handleCardPress(fakeE, true);
      }, { passive: false });
      // 悬浮显示完整描述
      cardEl.addEventListener('mouseenter', () => UI._showCardHoverTip(cardEl));
      cardEl.addEventListener('mouseleave', () => UI._hideCardHoverTip());
      handEl.appendChild(cardEl);
    });
  },

  _showCardHoverTip(cardEl){
    const fullDesc = cardEl.dataset.fullDesc;
    const name = cardEl.dataset.cardName;
    const emoji = cardEl.dataset.cardEmoji;
    if(!fullDesc || !name) return;
    let tip = document.getElementById('card-hover-tip');
    if(!tip){ tip=document.createElement('div'); tip.id='card-hover-tip'; document.body.appendChild(tip); }
    tip.innerHTML = `<div style="font-size:1rem;font-weight:700;margin-bottom:6px;color:#fff">${emoji} ${name}</div><div style="font-size:0.9rem;line-height:1.6;color:rgba(255,255,255,0.92)">${fullDesc}</div>`;
    tip.style.cssText = 'position:fixed;z-index:9000;background:rgba(12,16,28,0.97);border:1.5px solid rgba(255,255,255,0.22);border-radius:10px;padding:10px 14px;max-width:220px;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,0.7);display:block;transition:opacity 0.1s;opacity:0;';
    // 定位到卡牌正上方居中
    const rect = cardEl.getBoundingClientRect();
    const tipW = 220;
    let left = rect.left + rect.width/2 - tipW/2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipW - 8));
    tip.style.left = left + 'px';
    tip.style.top = '0px'; // 先放到顶部测量高度
    tip.style.display = 'block';
    const tipH = tip.offsetHeight;
    let top = rect.top - tipH - 12;
    if(top < 8) top = rect.bottom + 12; // 卡牌在屏幕顶部时改为显示在下方
    tip.style.top = top + 'px';
    tip.style.opacity = '1';
  },

  _hideCardHoverTip(){
    const tip = document.getElementById('card-hover-tip');
    if(tip) tip.style.opacity = '0';
  },

  _onCardClick(cardId,cardEl){
    const cs=State.run.combat;if(cs.phase!=='player')return;const def=Data.cards[cardId];if(!def)return;
    const _handIdx=cardEl?.dataset?.handIdx!==undefined?parseInt(cardEl.dataset.handIdx):cs.hand.indexOf(cardId);
    const _effCost=(cs.magnifierActive&&cs.magnifierHandIndex===_handIdx)?0:def.cost;if(cs.energy<_effCost||_effCost===99)return;
    if(!def.needsTarget){UI._playCard(cardId,cardEl,undefined,_handIdx);}
    else{UI._selectedCard=(UI._selectedCard===cardId)?null:cardId;UI._selectedCardHandIdx=_handIdx;UI._renderHand(cs);const targeted=UI._selectedCard!==null;document.querySelectorAll('.enemy-card').forEach(e=>e.classList.toggle('targeted',targeted));}
  },

  _onEnemyClick(enemyIndex){
    const cs=State.run.combat;if(cs.phase!=='player'||!UI._selectedCard)return;const cardEl=document.querySelector(`[data-card-id="${UI._selectedCard}"]`);UI._playCard(UI._selectedCard,cardEl,enemyIndex,UI._selectedCardHandIdx);
  },

  _playCard(cardId,cardEl,targetIndex,handIndexOverride){
    const _pdef=Data.cards[cardId];
    // 预判：射手卡牌打出后是否会越过蓄力 3 / 5 里程碑 → 是则跳过出牌音，留给"嗒嗒/叮"
    const _arCs=(State.run?.character?.id==='archer')?State.run.combat:null;
    // 蓄力增益（基础值，未计升级）：宁可保守不抓 → 升级后实际多给 1 蓄力，会出现"出牌音 + 里程碑音"双响，但比"该响出牌音不响"好接受
    const _arGainMap={ar_dodge:1,ar_aim:2,ar_focus_aim:3,ar_charge_defend:1,ar_block_charge:1,ar_charge_block_plus:2,ar_charge_swift:1,ar_gale:2,ar_cap_up:2,ar_arrow_rain:1,ar_aim_weak:1,ar_dodge_aim:2,ar_hunter_rhythm:2};
    let _suppressCardSfx=false;
    if(_arCs){
      const _max=_arCs.chargeMax||5;
      const _cur=_arCs.charge||0;
      const _gain=_arGainMap[cardId]||0;
      const _after=Math.min(_max,_cur+_gain);
      if((_cur<3 && _after>=3 && _after<_max) || (_cur<_max && _after>=_max)) _suppressCardSfx=true;
    }
    if(_pdef && !_suppressCardSfx){if(_pdef.type==='attack')Audio.playAttack();else if(_pdef.type==='skill')Audio.playBlock();else Audio.playPowerUp();}
    const cs=State.run.combat,def=Data.cards[cardId];UI._selectedCard=null;document.querySelectorAll('.enemy-card').forEach(e=>e.classList.remove('targeted'));
    const enemyHpBefore=targetIndex!==undefined?(cs.enemies[targetIndex]?.hp??0):0;const playerBlockBefore=cs.player.block;
    const discardEl=document.getElementById('discard-pile');const targetRect=discardEl?discardEl.getBoundingClientRect():{left:window.innerWidth-80,top:window.innerHeight-100,width:60,height:85};
    const ok=Combat.playCard(cardId,targetIndex,handIndexOverride);if(!ok)return;
    const isAttack=def&&def.type==='attack';const flyDuration=isAttack?440:320;
    if(isAttack){const playerFig=document.getElementById('player-figure');if(playerFig)Anim.lunge(playerFig,'right');if(targetIndex!==undefined){const dmgDealt=enemyHpBefore-(cs.enemies[targetIndex]?.hp??enemyHpBefore);setTimeout(()=>{const fig=document.getElementById(`enemy-fig-${targetIndex}`);if(fig){Anim.hitFlash(fig);Anim.shake(fig);if(dmgDealt>0)Anim.floatNumber(`-${dmgDealt}`,fig,'damage');}},150);}}
    if(cardEl){Anim.flyCard(cardEl,targetRect,flyDuration,()=>UI._renderCombat());}else{setTimeout(()=>UI._renderCombat(),flyDuration);}
    if(!isAttack&&targetIndex!==undefined){const dmgDealt=enemyHpBefore-(cs.enemies[targetIndex]?.hp??enemyHpBefore);if(dmgDealt>0){const fig=document.getElementById(`enemy-fig-${targetIndex}`);if(fig){Anim.floatNumber(`-${dmgDealt}`,fig,'damage');Anim.shake(fig);}}}
    const blockGained=cs.player.block-playerBlockBefore;if(blockGained>0){const pf=document.getElementById('player-figure');if(pf)Anim.floatNumber(`🛡+${blockGained}`,pf,'block');}
  },

  _doEndTurn(){
    const cs=State.run.combat;if(!cs||cs.phase!=='player')return;document.getElementById('btn-end-turn')?.setAttribute('disabled','');
    const attackers=cs.enemies.map((e,i)=>({i,attacks:!e._dead&&e.currentIntent?.type==='attack'})).filter(x=>x.attacks);
    const playerHpBefore=cs.player.hp;
    if(cs) cs._turnHpLost=0;
    Combat.endTurn();
    const tookDamage=cs.player.hp<playerHpBefore;
    const totalHpLost=cs._turnHpLost||Math.max(0, playerHpBefore-cs.player.hp);
    if(tookDamage){
      Anim.flashScreenDamage();
      attackers.forEach(({i})=>{const fig=document.getElementById(`enemy-fig-${i}`);if(fig)Anim.lunge(fig,'left');});
      setTimeout(()=>{
        const playerFig=document.getElementById('player-figure');
        if(playerFig){
          Anim.hitFlash(playerFig); Anim.shake(playerFig);
          if(totalHpLost>0) Anim.floatNumber(`-${totalHpLost}`, playerFig, 'damage');
        }
      },150);
    }
    const delay=tookDamage?280:0;setTimeout(()=>{if(cs.phase!=='dead'&&cs.phase!=='victory')UI._renderCombat();},delay);
  },

  // 单张卡牌详情弹窗（商店单击、牌堆双击等场景共用）
  _showCardDetailOverlay(cardId){
    const def = Data.cards[cardId];
    if(!def) return;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.cssText = 'z-index:9999';
    const rarityNames = {common:'普通',uncommon:'罕见',rare:'稀有',epic:'史诗'};
    const rarityColors = {common:'#aaa',uncommon:'#7eb6ff',rare:'#c8a0ff',epic:'#f9ca24'};
    const rarity = def.rarity||'common';
    const typeNames = {attack:'攻击',skill:'技能',power:'能力'};
    const costText = def.cost===99?'无法出牌':(def.cost===0?'免费':def.cost+' 能量');
    // 构建升级预览HTML
    const upgrades = Data.upgrades && Data.upgrades[cardId];
    let upgradeHTML = '';
    if(upgrades){
      const costLabel = c => c===99?'无法出牌':(c===0?'免费':c+' 能量');
      upgradeHTML = `<div style="width:100%;margin-top:4px">
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.4);text-align:center;margin-bottom:6px;letter-spacing:1px">── 升级预览 ──</div>
        <div style="display:flex;flex-direction:column;gap:8px">`;
      if(upgrades[1]){
        upgradeHTML += `<div style="background:rgba(76,175,80,0.12);border:1px solid rgba(76,175,80,0.4);border-radius:8px;padding:8px 12px">
          <div style="font-size:0.75rem;font-weight:700;color:#4caf50;margin-bottom:4px">第一次升级（+1）· ${costLabel(upgrades[1].cost)}</div>
          <div style="font-size:0.88rem;color:#e8e8f0;line-height:1.6">${upgrades[1].desc}</div>
        </div>`;
      }
      if(upgrades[2]){
        upgradeHTML += `<div style="background:rgba(156,39,176,0.12);border:1px solid rgba(156,39,176,0.4);border-radius:8px;padding:8px 12px">
          <div style="font-size:0.75rem;font-weight:700;color:#ce93d8;margin-bottom:4px">第二次升级（+2）· ${costLabel(upgrades[2].cost)}</div>
          <div style="font-size:0.88rem;color:#e8e8f0;line-height:1.6">${upgrades[2].desc}</div>
        </div>`;
      }
      upgradeHTML += `</div></div>`;
    }
    overlay.innerHTML = `<div class="panel bounce-in" style="max-width:400px;width:90vw;max-height:85vh;overflow-y:auto;padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:12px">
      <h3 style="margin:0;font-size:1.25rem;color:#fff">${def.emoji||''} ${def.name}</h3>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center">
        <span style="font-size:0.85rem;padding:2px 10px;border-radius:8px;border:1.5px solid ${rarityColors[rarity]||'#aaa'};color:${rarityColors[rarity]||'#aaa'}">${rarityNames[rarity]||rarity}</span>
        <span style="font-size:0.85rem;color:rgba(255,255,255,0.6)">${typeNames[def.type]||def.type} · ${costText}</span>
      </div>
      <div style="font-size:0.98rem;color:#e8e8f0;text-align:center;line-height:1.7;padding:8px 10px;background:rgba(255,255,255,0.04);border-radius:8px;width:100%">${def.description||''}</div>
      ${upgradeHTML}
      <button class="btn" style="width:100%;margin-top:4px" onclick="this.closest('.overlay').remove()">✕ 关闭</button>
    </div>`;
    overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  },
  _showPileOverlay(title,cardIds){
    const overlay=document.createElement('div');overlay.className='overlay';
    const panel=document.createElement('div');panel.className='panel bounce-in';
    panel.style.cssText='max-width:85vw;max-height:80vh;overflow-y:auto';
    panel.innerHTML=`<h3 style="margin:0 0 12px">${title} (${cardIds.length})</h3>`;
    const grid=document.createElement('div');grid.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center';
    if(cardIds.length===0){
      grid.innerHTML='<p style="color:var(--ink-light)">空</p>';
    } else {
      cardIds.forEach(id=>{
        if(!id){ const back=document.createElement('div');back.className='card-back';back.textContent='🎴';grid.appendChild(back);return; }
        const wrap=document.createElement('div');wrap.style.cssText='position:relative;cursor:pointer';
        const cardEl=UI.renderCard(id);wrap.appendChild(cardEl);
        const label=document.createElement('div');label.style.cssText='text-align:center;margin-top:3px;font-size:0.7rem;color:rgba(255,255,255,0.4)';label.textContent='双击查看';wrap.appendChild(label);
        let pileClickTimer=null;
        let pileLastTap=0;
        const _pileHandlePress = () => {
          const now = Date.now();
          if(now - pileLastTap < 280){
            clearTimeout(pileClickTimer); pileClickTimer=null;
            pileLastTap=0;
            UI._showCardDetailOverlay(id);
            return;
          }
          pileLastTap = now;
          if(pileClickTimer){clearTimeout(pileClickTimer);pileClickTimer=null;return;}
          pileClickTimer=setTimeout(()=>{pileClickTimer=null;},220);
        };
        wrap.addEventListener('click', _pileHandlePress);
        wrap.addEventListener('touchstart', e => { if(e.touches.length===1){ e.preventDefault(); _pileHandlePress(); } }, { passive: false });
        wrap.addEventListener('dblclick',()=>{
          if(pileClickTimer){clearTimeout(pileClickTimer);pileClickTimer=null;}
          UI._showCardDetailOverlay(id);
        });
        grid.appendChild(wrap);
      });
    }
    panel.appendChild(grid);
    const closeBtn=document.createElement('button');closeBtn.className='btn';closeBtn.style.cssText='margin-top:12px;width:100%';closeBtn.textContent='关闭';
    closeBtn.onclick=()=>overlay.remove();panel.appendChild(closeBtn);
    overlay.appendChild(panel);
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});document.body.appendChild(overlay);
  },

  cardReward(){
    const run=State.run,rewardCards=Data.getRewardCards(run.deck);
    const pendingRelic = run.pendingRelic ? Data.battleRelics.find(r=>r.id===run.pendingRelic) : null;
    const tierColor = {'common':'#aaa','uncommon':'#4caf50','rare':'#7ecfff','epic':'#e056fd'};
    const tierName = {'common':'普通','rare':'稀有','epic':'罕见'};
    const relicSection = pendingRelic ? `
      <div id="relic-reward-section" style="margin-bottom:18px;padding:12px 18px;background:rgba(255,255,255,0.05);border:1.5px solid ${tierColor[pendingRelic.tier]||'#aaa'};border-radius:14px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:background 0.2s;position:relative;" onmouseenter="this.style.background='rgba(255,255,255,0.12)'" onmouseleave="this.style.background='rgba(255,255,255,0.05)'" onclick="UI._pickRelic('${pendingRelic.id}')">
        <div style="flex-shrink:0;width:52px;height:52px;display:flex;align-items:center;justify-content:center;">
          ${pendingRelic.img ? `<img src="${pendingRelic.img}" style="width:52px;height:52px;object-fit:contain;image-rendering:pixelated;">` : `<span style="font-size:2.4rem">${pendingRelic.icon||'🎁'}</span>`}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
            <span style="font-size:1rem;font-weight:700;color:#fff">${pendingRelic.name}</span>
            <span style="font-size:0.7rem;padding:1px 7px;border-radius:8px;background:${tierColor[pendingRelic.tier]||'#aaa'}22;color:${tierColor[pendingRelic.tier]||'#aaa'};border:1px solid ${tierColor[pendingRelic.tier]||'#aaa'}66">${tierName[pendingRelic.tier]||''}</span>
          </div>
          <div style="font-size:0.82rem;color:rgba(255,255,255,0.65);line-height:1.4">${pendingRelic.desc}</div>
        </div>
        <div style="flex-shrink:0;font-size:0.8rem;color:rgba(255,255,255,0.5);white-space:nowrap">点击拾取</div>
      </div>` : '';
    UI.app().innerHTML=`<div style="position:relative;width:100%;height:100%"><div class="reward-screen">${relicSection}<div class="reward-title bounce-in" style="font-size:1.3rem;margin-bottom:4px">⚔️ 战斗胜利!</div><div class="reward-subtitle">选择一张卡牌加入牌组</div><div class="reward-cards" id="reward-cards"></div><button class="btn" id="btn-skip" style="margin-top:4px;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.9)">跳过</button></div></div>`;
    const container=document.getElementById('reward-cards');
    rewardCards.forEach((cardId,i)=>{
      const wrap=document.createElement('div');wrap.className='reward-card-wrap';const back=document.createElement('div');back.className='card-back';back.textContent='🎴';wrap.appendChild(back);container.appendChild(wrap);
      setTimeout(()=>{
        wrap.innerHTML='';
        const cardEl=UI.renderCard(cardId);
        wrap.appendChild(cardEl);
        const hint=document.createElement('div');
        hint.style.cssText='text-align:center;margin-top:5px;font-size:0.72rem;color:rgba(255,255,255,0.4)';
        hint.textContent='单击查看 · 双击拿牌';
        wrap.appendChild(hint);
        Anim.flipCard(cardEl,0);
        // 单击查看详情，双击拿牌
        let rewardTapTime=0,rewardTapTimer=null;
        const handlePress=()=>{
          const now=Date.now();
          if(now-rewardTapTime<280){
            clearTimeout(rewardTapTimer);rewardTapTimer=null;rewardTapTime=0;
            UI._pickReward(cardId);
            return;
          }
          rewardTapTime=now;
          if(rewardTapTimer){clearTimeout(rewardTapTimer);rewardTapTimer=null;return;}
          rewardTapTimer=setTimeout(()=>{rewardTapTimer=null;UI._showCardDetailOverlay(cardId);},220);
        };
        wrap.addEventListener('click',handlePress);
        wrap.addEventListener('touchstart',e=>{if(e.touches.length===1){e.preventDefault();handlePress();}},{passive:false});
        wrap.style.cursor='pointer';
      },80+i*100);
    });
    document.getElementById('btn-skip').onclick=()=>{
      run.pendingRelic=null;
      const next = run.pendingNextState || 'map';
      run.pendingNextState = null;
      State.saveRun(0);
      State.go(next);
    };
  },
  _pickRelic(relicId){
    const run = State.run;
    const relic = Data.battleRelics.find(r=>r.id===relicId);
    if(!relic) return;
    relic.apply(run);
    run.pendingRelic = null;
    State.saveRun(0);
    // 显示获得动画
    const tierColor = {'common':'#aaa','uncommon':'#4caf50','rare':'#7ecfff','epic':'#e056fd'};
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;top:70px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.9);color:#fff;padding:10px 22px;border-radius:12px;font-size:1rem;z-index:9999;pointer-events:none;border:1.5px solid ${tierColor[relic.tier]||'#aaa'};animation:bounceIn 0.4s ease;`;
    toast.innerHTML = `获得遗物：<strong style="color:${tierColor[relic.tier]||'#fff'}">${relic.name}</strong> ✨`;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(), 2500);
    // 刷新奖励界面（移除遗物区域）
    UI.cardReward();
  },

  _pickReward(cardId){
    Audio.playLevelUp();
    const run = State.run;
    run.deck.push(cardId);
    const next = run.pendingNextState || 'map';
    run.pendingNextState = null;
    State.saveRun(0);
    UI.app().innerHTML=`<div class="menu-screen bounce-in"><div style="font-size:4rem">✨</div><div class="screen-title" style="color:var(--gold);text-shadow:0 0 20px rgba(241,196,15,0.5)">获得 ${Data.cards[cardId].emoji} ${Data.cards[cardId].name}!</div><div style="font-size:1rem;color:rgba(255,255,255,0.8);margin-top:8px">卡牌已加入牌组</div></div>`;
    setTimeout(()=>State.go(next),400);
  },

   question(){
    const run = State.run;
    const app = document.getElementById('app');
    app.innerHTML = '';
    // 进入问号节点时，对关键字段做快照，以便「保存并退出」时回滚
    run._questionSnapshot = {
      hp: run.character.hp,
      maxHp: run.character.maxHp,
      gold: run.gold,
      relics: [...run.relics],
      deck: [...run.deck],
    };
    // 随机选一个问号事件（过滤掉已拿到对应遗物的事件）
    const _ownedRelics = run.relics||[];
    // 检测下一房间是否为 boss：是则排除标记了 noBeforeBoss 的事件，避免抄近路跳过 boss
    const _reachableIds = run.map.paths.filter(p => p.from === run.currentNodeId).map(p => p.to);
    const _nextHasBoss = _reachableIds.some(id => {
      const n = run.map.nodes.find(nn => nn.id === id);
      return n && n.type === 'boss';
    });
    let events = Data.questionEvents.filter(e => !e.relicId || !_ownedRelics.includes(e.relicId));
    if (_nextHasBoss) events = events.filter(e => !e.noBeforeBoss);
    const _evtPool = events.length > 0 ? events : Data.questionEvents; // 全部过滤完时保底随机
    const evt = _evtPool[Math.floor(Math.random() * _evtPool.length)];

    const wrap = document.createElement('div');
    wrap.style.cssText = 'min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;background:#1a1a2e;';

    wrap.innerHTML = `
      <div style="max-width:480px;width:100%;background:#16213e;border:2px solid #e2b96a;border-radius:16px;padding:28px 24px;box-shadow:0 0 32px #e2b96a44;">
        <div style="text-align:center;margin-bottom:8px;">${evt.img ? `<img src="${evt.img}" style="width:100px;height:100px;object-fit:contain;border-radius:12px;">` : `<div style="font-size:2.4rem;">❓</div>`}</div>
        <h2 style="color:#e2b96a;text-align:center;margin:0 0 16px;font-size:1.3rem;">${evt.title}</h2>
        <p style="color:#ccc;line-height:1.7;margin:0 0 28px;text-align:center;font-size:1rem;">${evt.desc}</p>
        <div id="q-options" style="display:flex;flex-direction:column;gap:12px;"></div>
        <div id="q-result" style="display:none;margin-top:20px;padding:14px;border-radius:10px;text-align:center;font-size:1rem;"></div>
        <button id="q-continue" style="display:none;margin-top:16px;width:100%;padding:12px;background:#e2b96a;color:#1a1a2e;border:none;border-radius:8px;font-size:1rem;font-weight:bold;cursor:pointer;">继续旅程 →</button>
      </div>
    `;

    const optContainer = wrap.querySelector('#q-options');
    // 创建全局 tooltip 元素（如果不存在）
    let qTooltip = document.getElementById('q-option-tooltip');
    if (!qTooltip) {
      qTooltip = document.createElement('div');
      qTooltip.id = 'q-option-tooltip';
      qTooltip.style.cssText = 'position:fixed;z-index:9999;background:#1a1a2e;border:1.5px solid #e2b96a;border-radius:10px;padding:10px 14px;color:#e2b96a;font-size:0.88rem;line-height:1.7;pointer-events:none;display:none;max-width:220px;white-space:pre-line;box-shadow:0 4px 16px rgba(0,0,0,0.5);';
      document.body.appendChild(qTooltip);
    }

    evt.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.textContent = opt.label;
      btn.style.cssText = 'width:100%;padding:13px;background:#0f3460;color:#e2b96a;border:1.5px solid #e2b96a;border-radius:8px;font-size:1rem;cursor:pointer;transition:background 0.2s;position:relative;';
      btn.onmouseover = (e) => {
        btn.style.background = '#1a4a80';
        if (opt.tooltip) {
          qTooltip.innerText = opt.tooltip;
          qTooltip.style.display = 'block';
          const rect = btn.getBoundingClientRect();
          let top = rect.top - qTooltip.offsetHeight - 10;
          let left = rect.left;
          if (top < 8) top = rect.bottom + 10;
          if (left + 220 > window.innerWidth - 8) left = window.innerWidth - 228;
          if (left < 8) left = 8;
          qTooltip.style.top = top + 'px';
          qTooltip.style.left = left + 'px';
        }
      };
      btn.onmouseout = () => { btn.style.background = '#0f3460'; qTooltip.style.display = 'none'; };
        btn.onclick = () => {
        // 禁用所有选项
        optContainer.querySelectorAll('button').forEach(b => b.disabled = true);
        optContainer.style.opacity = '0.5';
        // 执行事件结果
        const result = opt.resolve(run, UI);
        if (result === null) return; // 异步处理（如色环药水选择），由事件内部更新 UI
        // 不在此处保存存档，等玩家点击「继续旅程」后再标记 done 并保存
        // 这样在结果展示阶段「保存并退出」时，回滚逻辑能正确撤销本次事件效果
        // 显示结果
        const resultDiv = wrap.querySelector('#q-result');
        resultDiv.style.display = 'block';
        resultDiv.style.background = result.type === 'good' ? '#1a4a1a' : '#4a1a1a';
        resultDiv.style.border = `1.5px solid ${result.type === 'good' ? '#4caf50' : '#f44336'}`;
        resultDiv.style.color = result.type === 'good' ? '#81c784' : '#ef9a9a';
        resultDiv.textContent = result.msg;
        // 显示继续按钮
        const continueBtn = wrap.querySelector('#q-continue');
        continueBtn.style.display = 'block';
        continueBtn.onclick = () => {
          // 点击继续旅程时：标记节点完成并保存存档
          const node = run.map.nodes.find(n => n.id === run.currentNodeId);
          if (node) node.done = true;
          State.saveRun(0);
          State.go('map');
        };
      };
      optContainer.appendChild(btn);
    });

    app.appendChild(wrap);
  },

  rest(){
    const run=State.run,char=run.character;
    // 初始化本次市井行动点（每次进入市井时重置）
    if(run.restPoints===undefined) run.restPoints=2;
    const healAmt=Math.floor(char.maxHp*0.18);
    const canHeal=char.hp<char.maxHp && run.restPoints>0;
    const upgradable=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99);
    const canLearn=upgradable.length>0 && run.restPoints>0;
    UI.app().innerHTML=`<div class="rest-screen slide-up">
      <div style="font-size:3rem">🏘️</div>
      <div class="rest-title">市井</div>
      <div style="color:rgba(255,255,255,0.8);font-size:1.1rem">❤️ ${char.hp} / ${char.maxHp}</div>
      <div style="color:#f9ca24;font-size:1.05rem;font-weight:700;margin:6px 0">🪙 剩余行动点：${run.restPoints} / 2</div>
      <div style="color:rgba(255,255,255,0.5);font-size:0.85rem;text-align:center;max-width:300px;margin-bottom:8px">每次进入市井共 2 个行动点，可自由组合：升牌 ×2 / 升牌 + 回血 / 回血 ×2</div>
      <div class="rest-options">
        <button class="btn primary" id="btn-heal" ${!canHeal?'disabled':''}>❤️ 休息<br><small>恢复 ${healAmt} HP</small></button>
        <button class="btn" id="btn-learn" ${!canLearn?'disabled':''}>📖 学习<br><small>升级一张牌</small></button>
        <button class="btn" id="btn-skip-rest">👣 继续旅程</button>
      </div>
    </div>`;
    document.getElementById('btn-heal').onclick=()=>{
      if(!canHeal)return;
      char.hp=Math.min(char.maxHp,char.hp+healAmt);
      run.restPoints--;
      State.saveRun(0);
      if(run.restPoints<=0){ run.restPoints=undefined; State.go('map'); } else UI.rest();
    };
    document.getElementById('btn-skip-rest').onclick=()=>{ run.restPoints=undefined; State.go('map'); };
    document.getElementById('btn-learn').onclick=()=>{if(!canLearn)return;UI._showLearnOverlay();};
  },
  _showLearnOverlay(){
    const run=State.run;
    const upgradable=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99);
    if(upgradable.length===0)return;
    // 初始化升级记录
    if(!run.cardUpgrades) run.cardUpgrades={};
    const overlay=document.createElement('div');overlay.className='overlay';overlay.style.zIndex='9999';
    const panel=document.createElement('div');panel.className='panel bounce-in';
    panel.style.cssText='max-width:85vw;max-height:82vh;overflow-y:auto;padding:20px';
    panel.innerHTML='<h3 style="margin:0 0 8px;text-align:center">📖 学习 · 选择一张牌升级</h3><p style="color:rgba(255,255,255,0.5);font-size:0.85rem;text-align:center;margin:0 0 14px">单击查看详情，双击确认升级</p>';
    const grid=document.createElement('div');grid.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center';
    // 统计每张牌的升级次数（按deck索引）
    const deckWithIdx=run.deck.map((id,i)=>({id,i})).filter(({id})=>Data.cards[id]&&Data.cards[id].cost!==99);
    deckWithIdx.forEach(({id,i})=>{
      const level=run.cardUpgrades[i]||0;
      const upgrades=Data.upgrades&&Data.upgrades[id];
      const maxLevel=upgrades?2:0;
      const wrap=document.createElement('div');wrap.style.cssText='position:relative;cursor:pointer;display:flex;flex-direction:column;align-items:center';
      const cardEl=UI.renderCard(id, undefined, level);wrap.appendChild(cardEl);
      // 显示当前升级等级标记
      if(level>0){
        const badge=document.createElement('div');
        badge.style.cssText='position:absolute;top:4px;right:4px;background:#4caf50;color:#fff;font-size:0.65rem;font-weight:700;padding:1px 5px;border-radius:6px;pointer-events:none';
        badge.textContent='+'+level;
        wrap.appendChild(badge);
      }
      const label=document.createElement('div');
      label.style.cssText='text-align:center;margin-top:3px;font-size:0.7rem';
      if(level>=maxLevel&&maxLevel>0){
        label.style.color='rgba(255,255,255,0.3)';label.textContent='已满级';
        wrap.style.opacity='0.5';wrap.style.cursor='default';
      } else if(maxLevel===0){
        label.style.color='rgba(255,255,255,0.3)';label.textContent='不可升级';
        wrap.style.opacity='0.5';wrap.style.cursor='default';
      } else {
        label.style.color='rgba(255,200,80,0.8)';label.textContent='双击升级';
      }
      wrap.appendChild(label);
      let learnTimer=null;
      let learnLastTap=0;
      const _learnHandlePress = () => {
        const now = Date.now();
        if(now - learnLastTap < 280){ // 双击/双触
          clearTimeout(learnTimer); learnTimer=null;
          learnLastTap=0;
          if(level>=maxLevel||maxLevel===0) return;
          run.cardUpgrades[i]=(run.cardUpgrades[i]||0)+1;
          if(run.restPoints!==undefined){ run.restPoints--; }
          State.saveRun(0);
          overlay.remove();
          if(run.restPoints!==undefined && run.restPoints>0){ UI.rest(); }
          else { run.restPoints=undefined; State.go('map'); }
          return;
        }
        learnLastTap = now;
        if(learnTimer){clearTimeout(learnTimer);learnTimer=null;return;}
        learnTimer=setTimeout(()=>{learnTimer=null;UI._showCardDetailOverlay(id);},220);
      };
      wrap.addEventListener('click', _learnHandlePress);
      wrap.addEventListener('touchstart', e => { if(e.touches.length===1){ e.preventDefault(); _learnHandlePress(); } }, { passive: false });
      wrap.addEventListener('dblclick',()=>{
        if(learnTimer){clearTimeout(learnTimer);learnTimer=null;}
        if(level>=maxLevel||maxLevel===0)return;
        run.cardUpgrades[i]=(run.cardUpgrades[i]||0)+1;
        State.saveRun(0);
        overlay.remove();
        State.go('map');
      });
      grid.appendChild(wrap);
    });
    panel.appendChild(grid);
    const closeBtn=document.createElement('button');closeBtn.className='btn';closeBtn.style.cssText='margin-top:14px;width:100%';closeBtn.textContent='取消';closeBtn.onclick=()=>overlay.remove();
    panel.appendChild(closeBtn);
    overlay.appendChild(panel);
    overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});
    document.body.appendChild(overlay);
  },

  shop(){
    const run = State.run;
    // 生成本次商店库存（存入 run 以便刷新时保持一致）
    if (!run.shopInventory) {
      run.shopInventory = Data.getShopInventory(run.deck);
      run.shopSold = {};   // 已购买的槽位
      run.removeUsed = false;
    }
    UI._renderShop();
  },

  _renderShop(){
    const run = State.run;
    const inv = run.shopInventory;
    const gold = run.gold;

    const app = UI.app();
    app.innerHTML = '';
    // 商店界面允许滚动
    app.style.overflowY = 'auto';
    app.style.overflowX = 'hidden';

    const screen = document.createElement('div');
    screen.className = 'shop-screen slide-up';

    // 预先计算憨人台词，以便后续判断是否触发音效
    const _hanrenLine = (()=>{
      // 测试强制台词（用完即清）
      if(run._forceHanrenLine){ const l=run._forceHanrenLine; run._forceHanrenLine=null; return l; }
      // 刚刚删了防御牌：一次性嘲讽，读完即清
      if(run._shopJustRemovedBlock){
        run._shopJustRemovedBlock = false;
        return '有个勇士说进攻是最好的防守，把所有防御牌全删了……后来没再来过。';
      }
      const g = run.gold || 0;
      if(g >= 500) return '500金！？你是这关的老板吗！？能不能顺手资助我装修一下？💸';
      if(g < 50) return '这身家？兄弟你确定你走对地方了？这里最便宜的也比你钱包厚。';
      const lines = [
        '欢迎光临好奇小卖部！<br>本店货真价实，童叟无欺～',
        '今天想买点什么？😊',
        '嘟嘟嘟嘟嘟嘟～🎵',
        '上次那个冒险者买了三瓶药水……没撑过下一关。请好好规划！',
      ];
      return lines[Math.floor(Math.random() * lines.length)];
    })();

    // 顶栏
    screen.innerHTML = `
      <div class="shop-topbar">
        <span style="font-size:1.6rem">🏪</span>
        <div class="shop-title">好奇小卖部</div>
        <div style="flex:1"></div>
        <span style="font-size:1.1rem;color:var(--gold);font-weight:700">💰 ${gold}</span>
      </div>
      <!-- 憨人老板区域 -->
      <div style="display:flex;align-items:flex-end;gap:18px;padding:12px 20px 0;margin-bottom:-8px">
        <div class="hanren-wrapper">
          <img src="manus-storage/hanren_merchant_8f300175.png" alt="憨人" style="width:200px;height:200px;object-fit:contain;display:block;" />
          <div style="text-align:center;font-size:0.8rem;color:rgba(255,255,255,0.6);margin-top:2px">憨人</div>
        </div>
        <div style="background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);border-radius:14px 14px 14px 4px;padding:10px 16px;font-size:0.95rem;color:rgba(255,255,255,0.9);max-width:260px;line-height:1.5;margin-bottom:28px">
          ${_hanrenLine}
        </div>
      </div>
      <div class="shop-section-title">购买卡牌</div>
      <div class="shop-cards-grid" id="shop-cards-grid"></div>
      <div class="shop-section-title">购买药水</div>
      <div id="shop-potion-buy-section"></div>
      <div class="shop-section-title">服务</div>
      <div class="shop-remove-section" id="shop-remove-section"></div>
      <div class="shop-section-title">出售药水</div>
      <div id="shop-potion-sell-section"></div>
      <button class="btn" style="margin-top:8px;margin-bottom:20px;min-width:160px" id="btn-shop-leave">👣 离开好奇小卖部</button>
    `;
    app.appendChild(screen);

    // 嘟嘟嘟台词触发音效（进入商店 1 秒后播放）
    if(_hanrenLine === '嘟嘟嘟嘟嘟嘟～🎵'){
      const _dudu = new window.Audio('manus-storage/hanren_dudu_bd3a1f22.m4a');
      _dudu.volume = 0.85;
      setTimeout(()=>{ _dudu.play().catch(()=>{}); }, 1000);
    }

    // 渲染卡牌
    const grid = document.getElementById('shop-cards-grid');
    inv.forEach((item, idx) => {
      const sold = run.shopSold[idx];
      const canAfford = gold >= item.price;
      const wrap = document.createElement('div');
      wrap.className = 'shop-card-wrap' + (sold ? ' sold-out' : '');
      const cardEl = UI.renderCard(item.id);
      wrap.appendChild(cardEl);
      const priceTag = document.createElement('div');
      priceTag.className = 'shop-price-tag' + (!sold && !canAfford ? ' cant-afford' : '');
      priceTag.innerHTML = sold ? '✅ 已购买' : `💰 ${item.price}`;
      wrap.appendChild(priceTag);
      // 单击查看详情，双击购买
      if (!sold) {
        let shopClickTimer = null;
        let shopLastTap = 0;
        const _shopHandlePress = () => {
          const now = Date.now();
          if(now - shopLastTap < 280){ // 双击/双触
            clearTimeout(shopClickTimer); shopClickTimer = null;
            shopLastTap = 0;
            UI._shopBuyCard(idx, item);
            return;
          }
          shopLastTap = now;
          if (shopClickTimer) { clearTimeout(shopClickTimer); shopClickTimer = null; return; }
          shopClickTimer = setTimeout(() => { shopClickTimer = null; UI._showCardDetailOverlay(item.id); }, 220);
        };
        wrap.addEventListener('click', _shopHandlePress);
        wrap.addEventListener('touchstart', e => { if(e.touches.length===1){ e.preventDefault(); _shopHandlePress(); } }, { passive: false });
        wrap.addEventListener('dblclick', (e) => {
          if (shopClickTimer) { clearTimeout(shopClickTimer); shopClickTimer = null; }
          UI._shopBuyCard(idx, item);
        });
        // 提示文字
        const hint = document.createElement('div');
        hint.style.cssText = 'font-size:0.72rem;color:rgba(255,255,255,0.4);text-align:center;margin-top:2px';
        hint.textContent = '单击查看 · 双击购买';
        wrap.appendChild(hint);
      }
      grid.appendChild(wrap);
    });

    // 移除卡牌服务
    const removeSection = document.getElementById('shop-remove-section');
    const removePrice = Data.getRemovePrice(run);
    const canAffordRemove = gold >= removePrice;
    removeSection.innerHTML = `
      <div class="shop-remove-title">🗑️ 移除卡牌</div>
      <div class="shop-remove-desc">从牌组中永久移除一张卡牌</div>
      <div class="shop-price-tag ${run.removeUsed ? '' : (!canAffordRemove ? 'cant-afford' : '')}" style="margin:4px 0">
        ${run.removeUsed ? '✅ 已使用' : `💰 ${removePrice}`}
      </div>
      ${!run.removeUsed ? `<button class="btn" id="btn-remove-card" ${!canAffordRemove ? 'disabled' : ''} style="font-size:0.9rem;padding:6px 18px">选择要移除的卡牌</button>` : ''}
    `;
    if (!run.removeUsed) {
      document.getElementById('btn-remove-card')?.addEventListener('click', () => UI._shopRemoveCard());
    }

    // 渲染药水购买区域
    const potionBuySection = document.getElementById('shop-potion-buy-section');
    if (potionBuySection) {
      const oolongData = Data.potions['oolong'];
      const oolongPrice = 100;
      const hasEmptySlot = (run.potions || [null,null,null]).some(p => p === null);
      const shopOolongBought = run.shopOolongBought || false;
      const canAffordOolong = gold >= oolongPrice;
      const buyCard = document.createElement('div');
      buyCard.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid ${shopOolongBought ? 'rgba(255,255,255,0.1)' : 'rgba(210,160,50,0.35)'};border-radius:12px;padding:12px 18px;cursor:${shopOolongBought || !hasEmptySlot || !canAffordOolong ? 'default' : 'pointer'};transition:all 0.2s;opacity:${shopOolongBought ? '0.5' : '1'}`;
      buyCard.innerHTML = `
        <img src="${oolongData.img || ''}" style="width:56px;height:56px;object-fit:contain" onerror="this.style.display='none'">
        <div style="font-size:1rem;font-weight:700;color:#fff">${oolongData.name}</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.6)">${oolongData.desc}</div>
        <div class="shop-price-tag ${shopOolongBought ? '' : (!canAffordOolong ? 'cant-afford' : '')}">${shopOolongBought ? '✅ 已购买' : (!hasEmptySlot ? '药水栏已满' : `💰 ${oolongPrice}`)}</div>
      `;
      if (!shopOolongBought && hasEmptySlot && canAffordOolong) {
        buyCard.addEventListener('mouseenter', () => buyCard.style.background = 'rgba(255,255,255,0.12)');
        buyCard.addEventListener('mouseleave', () => buyCard.style.background = 'rgba(255,255,255,0.06)');
        buyCard.addEventListener('click', () => {
          run.gold -= oolongPrice;
          const slot = run.potions.findIndex(p => p === null);
          run.potions[slot] = 'oolong';
          run.shopOolongBought = true;
          State.saveRun(0);
          UI._renderShop();
        });
      }
      potionBuySection.appendChild(buyCard);

      // ── 醪糟水 ──
      const laozaoData = Data.potions['laozao'];
      const laozaoPrice = 120;
      const shopLaozaoBought = run.shopLaozaoBought || false;
      const canAffordLaozao = gold >= laozaoPrice;
      const hasEmptySlot2 = (run.potions || [null,null,null]).some(p => p === null);
      const laozaoCard = document.createElement('div');
      laozaoCard.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid ${shopLaozaoBought ? 'rgba(255,255,255,0.1)' : 'rgba(127,90,240,0.45)'};border-radius:12px;padding:12px 18px;cursor:${shopLaozaoBought || !hasEmptySlot2 || !canAffordLaozao ? 'default' : 'pointer'};transition:all 0.2s;opacity:${shopLaozaoBought || !hasEmptySlot2 ? '0.45' : '1'};`;
      laozaoCard.innerHTML = `
        <img src="${laozaoData.img || ''}" style="width:56px;height:56px;object-fit:contain" onerror="this.style.display='none';this.nextSibling.style.display='block'">
        <span style="font-size:2rem;display:none">${laozaoData.emoji || '🍶'}</span>
        <div style="font-size:1rem;font-weight:700;color:#fff">${laozaoData.name}</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.6);text-align:center;max-width:160px">${laozaoData.desc}</div>
        <div class="shop-price-tag ${shopLaozaoBought ? '' : (!canAffordLaozao ? 'cant-afford' : '')}">${shopLaozaoBought ? '✅ 已购买' : (!hasEmptySlot2 ? '药水杠已满' : `💰 ${laozaoPrice}`)}</div>
      `;
      if (!shopLaozaoBought && hasEmptySlot2 && canAffordLaozao) {
        laozaoCard.addEventListener('mouseenter', () => laozaoCard.style.background = 'rgba(255,255,255,0.12)');
        laozaoCard.addEventListener('mouseleave', () => laozaoCard.style.background = 'rgba(255,255,255,0.06)');
        laozaoCard.addEventListener('click', () => {
          run.gold -= laozaoPrice;
          const slot2 = run.potions.findIndex(p => p === null);
          run.potions[slot2] = 'laozao';
          run.shopLaozaoBought = true;
          State.saveRun(0);
          UI._renderShop();
        });
      }
      potionBuySection.appendChild(laozaoCard);

      // ── 阿高的柠檬水 ──
      const lemonData = Data.potions['lemon_water'];
      const lemonPrice = 120;
      const shopLemonBought = run.shopLemonBought || false;
      const canAffordLemon = gold >= lemonPrice;
      const hasEmptySlot3 = (run.potions || [null,null,null]).some(p => p === null);
      const lemonCard = document.createElement('div');
      lemonCard.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid ${shopLemonBought ? 'rgba(255,255,255,0.1)' : 'rgba(198,232,41,0.5)'};border-radius:12px;padding:12px 18px;cursor:${shopLemonBought || !hasEmptySlot3 || !canAffordLemon ? 'default' : 'pointer'};transition:all 0.2s;opacity:${shopLemonBought || !hasEmptySlot3 ? '0.45' : '1'};`;
      lemonCard.innerHTML = `
        <img src="${lemonData.img}" style="width:56px;height:56px;object-fit:contain;image-rendering:pixelated" onerror="this.style.display='none';this.nextSibling.style.display='block'">
        <span style="font-size:2rem;display:none">${lemonData.emoji}</span>
        <div style="font-size:1rem;font-weight:700;color:#fff">${lemonData.name}</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.6);text-align:center;max-width:160px">${lemonData.desc}</div>
        <div class="shop-price-tag ${shopLemonBought ? '' : (!canAffordLemon ? 'cant-afford' : '')}">${shopLemonBought ? '✅ 已购买' : (!hasEmptySlot3 ? '药水栏已满' : `💰 ${lemonPrice}`)}</div>
      `;
      if (!shopLemonBought && hasEmptySlot3 && canAffordLemon) {
        lemonCard.addEventListener('mouseenter', () => lemonCard.style.background = 'rgba(198,232,41,0.1)');
        lemonCard.addEventListener('mouseleave', () => lemonCard.style.background = 'rgba(255,255,255,0.06)');
        lemonCard.addEventListener('click', () => {
          run.gold -= lemonPrice;
          const slot3 = run.potions.findIndex(p => p === null);
          run.potions[slot3] = 'lemon_water';
          run.shopLemonBought = true;
          State.saveRun(0);
          UI._renderShop();
        });
      }
      potionBuySection.appendChild(lemonCard);
    }

    // 渲染药水出售区域
    const potionSellSection = document.getElementById('shop-potion-sell-section');
    if (potionSellSection) {
      const hasPotions = (run.potions || [null,null,null]).some(p => p !== null);
      if (!hasPotions) {
        potionSellSection.innerHTML = `<div style="color:rgba(255,255,255,0.4);font-size:0.95rem;padding:8px 0">暂无可出售的药水</div>`;
      } else {
        potionSellSection.innerHTML = '';
        const sellGrid = document.createElement('div');
        sellGrid.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;justify-content:center;padding:8px 0';
        (run.potions || [null,null,null]).forEach((potionId, idx) => {
          if (!potionId) return;
          const pData = Data.potions[potionId];
          if (!pData) return;
          const card = document.createElement('div');
          card.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 18px;cursor:pointer;transition:all 0.2s';
          card.innerHTML = `
            <img src="${pData.img || ''}" style="width:48px;height:48px;object-fit:contain" onerror="this.style.display='none';this.nextSibling.style.display='block'">
            <span style="font-size:2rem;display:none">${pData.emoji}</span>
            <div style="font-size:1rem;font-weight:700;color:#fff">${pData.name}</div>
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.6)">${pData.desc}</div>
            <div class="shop-price-tag" style="background:rgba(212,175,55,0.2);border-color:rgba(212,175,55,0.5)">💰 出售 +${pData.sellPrice}</div>
          `;
          card.addEventListener('mouseenter', () => card.style.background = 'rgba(255,255,255,0.12)');
          card.addEventListener('mouseleave', () => card.style.background = 'rgba(255,255,255,0.06)');
          card.addEventListener('click', () => {
            run.potions[idx] = null;
            run.gold += pData.sellPrice;
            State.saveRun(0);
            UI._renderShop();
          });
          sellGrid.appendChild(card);
        });
        potionSellSection.appendChild(sellGrid);
      }
    }

    document.getElementById('btn-shop-leave').addEventListener('click', () => {
      run.shopInventory = null; // 离开后清空，下次进入重新生成
      // 离开商店时重置app的overflow
      const appEl = UI.app();
      appEl.style.overflowY = '';
      appEl.style.overflowX = '';
      State.go('map');
    });
  },

  _shopBuyCard(idx, item){
    const run = State.run;
    if (run.shopSold[idx]) return;
    if (run.gold < item.price) {
      // 金币不足提示
      const priceTag = document.querySelectorAll('.shop-price-tag')[idx];
      if (priceTag) { priceTag.style.animation = 'shake 0.3s'; setTimeout(() => priceTag.style.animation = '', 400); }
      return;
    }
    run.gold -= item.price;
    run.deck.push(item.id);
    run.shopSold[idx] = true;
    State.saveRun(0);
    UI._renderShop();
  },

  _shopRemoveCard(){
    const run = State.run;
    const removePrice = Data.getRemovePrice(run);
    if (run.removeUsed || run.gold < removePrice) return;
    // 显示牌组选择覆层
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const removable = run.deck.filter(id => Data.cards[id] && Data.cards[id].cost !== 99);
    const cardsHtml = removable.length === 0
      ? '<p style="color:var(--ink-light)">没有可移除的卡牌</p>'
      : removable.map((id, i) => `<div class="shop-card-wrap" data-remove-idx="${i}" style="cursor:pointer">${UI.renderCard(id).outerHTML}<div class="shop-price-tag" style="font-size:0.8rem">点击移除</div></div>`).join('');
    overlay.innerHTML = `<div class="panel bounce-in" style="max-width:90vw;max-height:80vh;overflow-y:auto">
      <h3 style="margin:0 0 12px;color:var(--gold)">🗑️ 选择要移除的卡牌</h3>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${cardsHtml}</div>
      <button class="btn" style="margin-top:14px;width:100%" id="btn-cancel-remove">取消</button>
    </div>`;
    let _removeHandled = false;
    overlay.addEventListener('click', e => {
      const wrap = e.target.closest('[data-remove-idx]');
      if (wrap) {
        if (_removeHandled) return;
        _removeHandled = true;
        const i = parseInt(wrap.dataset.removeIdx, 10);
        const cardId = removable[i];
        const deckIdx = run.deck.indexOf(cardId);
        if (deckIdx !== -1) run.deck.splice(deckIdx, 1);
        if (Data.cards[cardId]?.description?.includes('格挡')) run._shopJustRemovedBlock = true;
        run.gold -= removePrice;
        run.removedTotal = (run.removedTotal || 0) + 1;
        run.removeUsed = true;
        State.saveRun(0);
        overlay.remove();
        UI._renderShop();
        return;
      }
      if (e.target === overlay || e.target.id === 'btn-cancel-remove') overlay.remove();
    });
    document.body.appendChild(overlay);
  },

  gameOver(){ Audio.playGameOver(); Audio.stopAll();
    const run=State.current.run;
    UI.app().innerHTML=`<div class="menu-screen slide-up"><div style="font-size:5rem">💀</div><div class="screen-title" style="color:#e74c3c;text-shadow:0 0 20px rgba(231,76,60,0.5)">你倒下了</div><div style="font-size:1.2rem;color:rgba(255,255,255,0.8);margin-top:-8px">到达第 ${run?.floor??0} 层 · ${run?.character?.name??''}</div><button class="btn danger" style="margin-top:24px" onclick="State.current.run=null;State.go('menu')">返回主菜单</button></div>`;
  },

  act2Transition(){
    const run=State.run;
    // 进入第二层：更新 run 数据，并回满生命值
    run.act=2;
    run.floor=0;
    run.map=MapGen.generate(2);
    run.travelEdges=[];  // 清空上一层的路线高亮
    run.mapDrawingData=null;  // 清空上一层的手绘线
    const startNode=run.map.nodes.find(n=>n.floor===0);
    if(startNode)run.currentNodeId=startNode.id;
    // 全量回血
    run.character.hp=run.character.maxHp;
    State.saveRun(0);
    // 显示「常识周」过场动画
    const app=UI.app();
    app.innerHTML='<div id="act2-splash" style="position:fixed;inset:0;background:#0d1b2a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;"></div>';
    const splash=document.getElementById('act2-splash');
    splash.innerHTML=`
      <div id="act2-text" style="text-align:center;opacity:0;transform:scale(0.7);transition:opacity 0.6s ease,transform 0.6s cubic-bezier(0.34,1.56,0.64,1);">
        <div style="font-size:1.1rem;letter-spacing:0.3em;color:rgba(255,210,80,0.7);margin-bottom:12px;font-weight:500;">第二章</div>
        <div style="font-size:3.8rem;font-weight:900;color:#f5c518;text-shadow:0 0 40px rgba(245,197,24,0.6),0 0 80px rgba(245,197,24,0.2);letter-spacing:0.08em;">常识周</div>
        <div style="margin-top:16px;font-size:1rem;color:rgba(255,255,255,0.5);letter-spacing:0.15em;">Knowledge Week (常识周)</div>
      </div>`;
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        const t=document.getElementById('act2-text');
        if(t){t.style.opacity='1';t.style.transform='scale(1)';}
      });
    });
    setTimeout(()=>{
      const t=document.getElementById('act2-text');
      if(t){t.style.transition='opacity 0.5s ease,transform 0.5s ease';t.style.opacity='0';t.style.transform='scale(1.1)';}
      // 50% 概率触发大头，50% 概率触发文豪
      if(Math.random()<0.5) setTimeout(()=>UI.datouSelect(),500);
      else setTimeout(()=>UI.wenhaoSelect(),500);
    },1800);
  },

  act3Transition(){
    const run=State.run;
    // 进入第三层：更新 run 数据，并回满生命值
    run.act=3;
    run.floor=0;
    // 指南针效果：第三层生成直路地图
    if(run.relics?.includes('gaoshan_compass')){
      run.map=MapGen.generateCompass();
    } else {
      run.map=MapGen.generate(3);
    }
    run.travelEdges=[];  // 清空上一层的路线高亮
    run.mapDrawingData=null;  // 清空上一层的手绘线
    const startNode=run.map.nodes.find(n=>n.floor===0);
    if(startNode)run.currentNodeId=startNode.id;
    // 全量回血
    run.character.hp=run.character.maxHp;
    State.saveRun(0);
    // 显示「露营周」过场动画
    const app=UI.app();
    app.innerHTML='<div id="act3-splash" style="position:fixed;inset:0;background:#1a2a1a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;"></div>';
    const splash=document.getElementById('act3-splash');
    splash.innerHTML=`
      <div id="act3-text" style="text-align:center;opacity:0;transform:scale(0.7);transition:opacity 0.6s ease,transform 0.6s cubic-bezier(0.34,1.56,0.64,1);">
        <div style="font-size:1.1rem;letter-spacing:0.3em;color:rgba(120,255,120,0.7);margin-bottom:12px;font-weight:500;">第三章</div>
        <div style="font-size:3.8rem;font-weight:900;color:#7fff7f;text-shadow:0 0 40px rgba(127,255,127,0.6),0 0 80px rgba(127,255,127,0.2);letter-spacing:0.08em;">露营周</div>
        <div style="margin-top:16px;font-size:1rem;color:rgba(255,255,255,0.5);letter-spacing:0.15em;">Camping Week</div>
      </div>`;
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        const t=document.getElementById('act3-text');
        if(t){t.style.opacity='1';t.style.transform='scale(1)';}
      });
    });
    setTimeout(()=>{
      const t=document.getElementById('act3-text');
      if(t){t.style.transition='opacity 0.5s ease,transform 0.5s ease';t.style.opacity='0';t.style.transform='scale(1.1)';}
      // 进入高山选择界面
      setTimeout(()=>UI.gaoshanSelect(),500);
    },1800);
  },
  wangweiSelect(){
    const run = State.run;
    // 从5件遗物中随机抽3个
    const pool = [...Data.wangweiRelics];
    const chosen = [];
    while(chosen.length < 3 && pool.length > 0){
      const idx = Math.floor(Math.random() * pool.length);
      chosen.push(pool.splice(idx, 1)[0]);
    }
    let selectedRelic = null;
    // 存入守护神标记
    run.guardian = 'wangwei';

    UI.app().innerHTML = `<div class="dayan-screen wangwei-theme slide-up">
      <img src="${WANGWEI_IMG_SRC}" alt="王微" style="width:min(220px,35vh);height:min(220px,35vh);object-fit:contain;margin-bottom:6px;filter:drop-shadow(0 0 22px rgba(255,160,80,0.7));flex-shrink:0;" />
      <div class="dayan-title" style="color:#ff9a3c;">✨ 王微的礼物 ✨</div>
      <div class="dayan-bubble">
        嗨！冒险者，我是<b style="color:#ff9a3c">王微</b>！<br>
        出发前，从我这里挑一件宝贝带上吧～
      </div>
      <div class="dayan-relics" id="wangwei-relics-grid"></div>
      <button class="btn primary" id="btn-wangwei-confirm" disabled style="font-size:1.2rem;padding:12px 40px;margin-top:8px;flex-shrink:0;background:rgba(255,154,60,0.18);border-color:rgba(255,154,60,0.6);color:#ff9a3c">带上它，出发！→</button>
    </div>`;

    const grid = document.getElementById('wangwei-relics-grid');
    chosen.forEach(relic => {
      const card = document.createElement('div');
      card.className = 'dayan-relic-card';
      card.innerHTML = `<div class="dayan-relic-icon">${relic.icon}</div>
        <div class="dayan-relic-name">${relic.name}</div>
        <div class="dayan-relic-desc">${relic.desc}</div>`;
      card.onclick = () => {
        grid.querySelectorAll('.dayan-relic-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic = relic;
        document.getElementById('btn-wangwei-confirm').disabled = false;
      };
      card.ondblclick = () => {
        grid.querySelectorAll('.dayan-relic-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic = relic;
        document.getElementById('btn-wangwei-confirm').disabled = false;
        document.getElementById('btn-wangwei-confirm').click();
      };
      grid.appendChild(card);
    });

    document.getElementById('btn-wangwei-confirm').onclick = () => {
      if(!selectedRelic) return;
      selectedRelic.apply(run);
      if(!run.relics.includes(selectedRelic.id)){
        run.relics.push(selectedRelic.id);
      }
      const freeSlot = Save.list().find(s => s.run && s.run.floor === 0)?.slot ?? 0;
      State.saveRun(freeSlot);
      // 嗨玩周开场动画
      (function showHaiwanzhou() {
        const overlay = document.createElement('div');
        overlay.id = 'haiwanzhou-overlay';
        overlay.innerHTML = '<div id="haiwanzhou-text">嗨玩周</div>';
        document.body.appendChild(overlay);
        setTimeout(() => {
          const txt = document.getElementById('haiwanzhou-text');
          if(txt) txt.style.animation = 'haiwanzhou-out 0.6s ease-in forwards';
          setTimeout(() => overlay.remove(), 650);
        }, 1200);
      })();
      State.go('map');
    };
  },

  datouSelect(){
    const run=State.run;
    const pool=[...Data.datouRelics];
    const chosen=[];
    while(chosen.length<3&&pool.length>0){
      const idx=Math.floor(Math.random()*pool.length);
      chosen.push(pool.splice(idx,1)[0]);
    }
    let selectedRelic=null;
    const DATOU_IMG_SRC='manus-storage/datou_sprite.png';
    UI.app().innerHTML=`<div class="dayan-screen datou-theme slide-up">
      <img src="${DATOU_IMG_SRC}" alt="大头" style="width:min(200px,32vh);height:min(200px,32vh);object-fit:contain;margin-bottom:6px;filter:drop-shadow(0 0 22px rgba(245,197,24,0.8));flex-shrink:0;" />
      <div class="dayan-title" style="color:#f5c518;">🎁 大头的礼物 🎁</div>
      <div class="dayan-bubble">
        嘿！冒险者，我是<b style="color:#f5c518">大头</b>！<br>
        挑一件我的宝贝，带上它继续冒险吧！
      </div>
      <div class="dayan-relics" id="datou-relics-grid"></div>
      <button class="btn primary" id="btn-datou-confirm" disabled style="font-size:1.2rem;padding:12px 40px;margin-top:8px;flex-shrink:0">带上它，出发！→</button>
    </div>`;
    const grid=document.getElementById('datou-relics-grid');
    chosen.forEach(relic=>{
      const card=document.createElement('div');
      card.className='dayan-relic-card';
      card.innerHTML=`<div class="dayan-relic-icon">${relic.icon}</div>
        <div class="dayan-relic-name">${relic.name}</div>
        <div class="dayan-relic-desc">${relic.desc}</div>`;
      card.onclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-datou-confirm').disabled=false;
      };
      card.ondblclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-datou-confirm').disabled=false;
        document.getElementById('btn-datou-confirm').click();
      };
      grid.appendChild(card);
    });
    document.getElementById('btn-datou-confirm').onclick=()=>{
      if(!selectedRelic)return;
      selectedRelic.apply(run);
      if(!run.relics.includes(selectedRelic.id)){
        run.relics.push(selectedRelic.id);
      }
      State.saveRun(0);
      State.go('map');
    };
  },
  wenhaoSelect(){
    const run=State.run;
    const pool=[...Data.wenhaoRelics];
    const chosen=[];
    while(chosen.length<3&&pool.length>0){
      const idx=Math.floor(Math.random()*pool.length);
      chosen.push(pool.splice(idx,1)[0]);
    }
    let selectedRelic=null;
    const WENHAO_IMG_SRC='manus-storage/wenhao_sprite.png';
    UI.app().innerHTML=`<div class="dayan-screen wenhao-theme slide-up">
      <img src="${WENHAO_IMG_SRC}" alt="文豪" style="width:min(280px,42vh);height:min(280px,42vh);object-fit:contain;margin-bottom:6px;filter:drop-shadow(0 0 18px rgba(255,255,255,0.5));flex-shrink:0;" />
      <div class="dayan-title" style="color:#a8d8ff;">✨ 文豪的礼物 ✨</div>
      <div class="dayan-bubble">
        哦！冒险者，我是<b style="color:#a8d8ff">文豪</b>！<br>
        人生的剧本由你自己决定，选一件宝贝再出发吧。
      </div>
      <div class="dayan-relics" id="wenhao-relics-grid"></div>
      <button class="btn primary" id="btn-wenhao-confirm" disabled style="font-size:1.2rem;padding:12px 40px;margin-top:8px;flex-shrink:0">带上它，出发！→</button>
    </div>`;
    const grid=document.getElementById('wenhao-relics-grid');
    chosen.forEach(relic=>{
      const card=document.createElement('div');
      card.className='dayan-relic-card';
      card.innerHTML=`<div class="dayan-relic-icon">${relic.icon}</div>
        <div class="dayan-relic-name">${relic.name}</div>
        <div class="dayan-relic-desc">${relic.desc}</div>`;
      card.onclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-wenhao-confirm').disabled=false;
      };
      card.ondblclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-wenhao-confirm').disabled=false;
        document.getElementById('btn-wenhao-confirm').click();
      };
      grid.appendChild(card);
    });
    document.getElementById('btn-wenhao-confirm').onclick=()=>{
      if(!selectedRelic)return;
      selectedRelic.apply(run);
      State.saveRun(0);
      // 如果选了剧本，立刻弹出删牌界面
      if(selectedRelic.id==='wenhao_script'){
        UI._wenhaoScriptRemove(()=>State.go('map'));
      } else {
        State.go('map');
      }
    };
  },
  // 文豪剧本：免费删 2 张，之后可花 50 金再删 1 张
  _wenhaoScriptRemove(onDone){
    const run=State.run;
    let removedCount=0;
    const FREE_REMOVE=2;
    const EXTRA_COST=50;

    function openRemovePanel(isPaid){
      const removable=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99);
      const overlay=document.createElement('div');
      overlay.className='overlay';
      const freeLeft=FREE_REMOVE-removedCount;
      const subtitle=isPaid
        ?`<p style="margin:0 0 12px;color:rgba(255,255,255,0.65);font-size:0.9rem">已花费 <b style="color:#f5c518">50 💰</b>，再删 1 张牌</p>`
        :`<p style="margin:0 0 12px;color:rgba(255,255,255,0.65);font-size:0.9rem">人生的剧本由你自己决定！还可免费删除 <b style="color:#a8d8ff">${freeLeft}</b> 张卡牌</p>`;
      const cardsHtml=removable.length===0
        ?'<p style="color:var(--ink-light)">没有可删除的卡牌</p>'
        :removable.map((id,i)=>`<div class="shop-card-wrap" data-remove-idx="${i}" style="cursor:pointer">${UI.renderCard(id).outerHTML}<div class="shop-price-tag" style="font-size:0.8rem">点击删除</div></div>`).join('');
      overlay.innerHTML=`<div class="panel bounce-in" style="max-width:90vw;max-height:82vh;overflow-y:auto">
        <h3 style="margin:0 0 4px;color:#a8d8ff">📜 文豪的剧本</h3>
        ${subtitle}
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${cardsHtml}</div>
        <button class="btn" style="margin-top:14px;width:100%" id="btn-script-done">完成（已删 ${removedCount} 张）</button>
      </div>`;
      overlay.addEventListener('click',e=>{
        const wrap=e.target.closest('[data-remove-idx]');
        if(wrap){
          const i=parseInt(wrap.dataset.removeIdx,10);
          const cardId=removable[i];
          const deckIdx=run.deck.indexOf(cardId);
          if(deckIdx!==-1)run.deck.splice(deckIdx,1);
          removedCount++;
          overlay.remove();
          const hasMore=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99).length>0;
          if(!isPaid&&removedCount<FREE_REMOVE&&hasMore){
            openRemovePanel(false);
          } else if(!isPaid&&removedCount>=FREE_REMOVE&&hasMore){
            openExtraPanel();
          } else {
            onDone();
          }
        }
        if(e.target.id==='btn-script-done'){overlay.remove();onDone();}
      });
      document.body.appendChild(overlay);
    }

    function openExtraPanel(){
      const canAfford=(run.gold||0)>=EXTRA_COST;
      const overlay=document.createElement('div');
      overlay.className='overlay';
      overlay.innerHTML=`<div class="panel bounce-in" style="max-width:380px;text-align:center">
        <h3 style="margin:0 0 8px;color:#a8d8ff">📜 文豪的剧本</h3>
        <p style="color:rgba(255,255,255,0.65);font-size:0.9rem;margin:0 0 16px">已完成 2 次免费删除。<br>是否花费 <b style="color:#f5c518">50 💰</b> 再删 1 张？</p>
        <p style="color:${canAfford?'#f5c518':'#ff6b6b'};font-size:0.85rem;margin:0 0 14px">当前金币：${run.gold||0}${canAfford?'':' （不足）'}</p>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn" id="btn-extra-yes" ${canAfford?'':'disabled'} style="padding:8px 24px">花 50 💰 再删一张</button>
          <button class="btn" id="btn-extra-no" style="padding:8px 24px">不了，完成</button>
        </div>
      </div>`;
      overlay.addEventListener('click',e=>{
        if(e.target.id==='btn-extra-yes'&&canAfford){
          run.gold-=EXTRA_COST;
          overlay.remove();
          openRemovePanel(true);
        }
        if(e.target.id==='btn-extra-no'){overlay.remove();onDone();}
      });
      document.body.appendChild(overlay);
    }

    openRemovePanel(false);
  },
  gaoshanSelect(){
    const run=State.run;
    const pool=[...Data.gaoshanRelics];
    const chosen=[];
    while(chosen.length<3&&pool.length>0){
      const idx=Math.floor(Math.random()*pool.length);
      chosen.push(pool.splice(idx,1)[0]);
    }
    let selectedRelic=null;
    const GAOSHAN_IMG_SRC='manus-storage/gaoshan_sprite.png';
    UI.app().innerHTML=`<div class="dayan-screen gaoshan-theme slide-up">
      <img src="${GAOSHAN_IMG_SRC}" alt="高山" style="width:min(320px,45vh);height:min(480px,68vh);object-fit:contain;margin-bottom:6px;flex-shrink:0;" />
      <div class="dayan-title" style="color:#7ecfff;">✨ 高山的礼物 ✨</div>
      <div class="dayan-bubble">
        嘿！冒险者，我是<b style="color:#7ecfff">高山</b>！<br>
        山顶的风很冷，拿一件装备再出发吧。
      </div>
      <div class="dayan-relics" id="gaoshan-relics-grid"></div>
      <button class="btn primary" id="btn-gaoshan-confirm" disabled style="font-size:1.2rem;padding:12px 40px;margin-top:8px;flex-shrink:0">带上它，出发！→</button>
    </div>`;
    const grid=document.getElementById('gaoshan-relics-grid');
    chosen.forEach(relic=>{
      const card=document.createElement('div');
      card.className='dayan-relic-card';
      card.innerHTML=`<div class="dayan-relic-icon">${relic.icon}</div>
        <div class="dayan-relic-name">${relic.name}</div>
        <div class="dayan-relic-desc">${relic.desc}</div>`;
      card.onclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-gaoshan-confirm').disabled=false;
      };
      card.ondblclick=()=>{
        grid.querySelectorAll('.dayan-relic-card').forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        selectedRelic=relic;
        document.getElementById('btn-gaoshan-confirm').disabled=false;
        document.getElementById('btn-gaoshan-confirm').click();
      };
      grid.appendChild(card);
    });
    document.getElementById('btn-gaoshan-confirm').onclick=()=>{
      if(!selectedRelic)return;
      selectedRelic.apply(run);
      if(!run.relics.includes(selectedRelic.id)){
        run.relics.push(selectedRelic.id);
      }
      // 指南针效果：选完后如果持有指南针，重新生成直路地图
      if(run.relics.includes('gaoshan_compass')){
        run.map=MapGen.generateCompass();
        run.travelEdges=[];  // 清空路线高亮
        const startNode=run.map.nodes.find(n=>n.floor===0);
        if(startNode)run.currentNodeId=startNode.id;
      }
      State.saveRun(0);
      State.go('map');
    };
  },
  victory(){
    UI.app().innerHTML=`<div class="menu-screen bounce-in"><div style="font-size:5rem">🏆</div><div class="screen-title" style="color:var(--gold);text-shadow:0 0 30px rgba(241,196,15,0.6)">通关!</div><div style="font-size:1.2rem;color:rgba(255,255,255,0.85)">你击败了守护者！</div><button class="btn primary" style="margin-top:24px" onclick="State.current.run=null;State.go('menu')">返回主菜单</button></div>`;
  },

  _startDrag(cardId,cardEl,e){
    const cs=State.run?.combat;if(!cs||cs.phase!=='player')return;const def=Data.cards[cardId];if(!def)return;
    // 优先使用 DOM 上的精确索引（_renderHand 注入），避免同名牌时 indexOf 返回错误位置
    const _dragHandIdx=cardEl?.dataset?.handIdx!==undefined?parseInt(cardEl.dataset.handIdx):cs.hand.indexOf(cardId);
    const _dragUpgLv = cs.handUpgrades ? (cs.handUpgrades[_dragHandIdx] || 0) : 0;
    let _dragBaseCost = def.cost;
    if(_dragUpgLv > 0){
      const _dragUpgDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][_dragUpgLv];
      if(_dragUpgDef && _dragUpgDef.cost !== undefined) _dragBaseCost = _dragUpgDef.cost;
    }
    const _effCostDrag=(cs.magnifierActive&&cs.magnifierHandIndex===_dragHandIdx)?0:_dragBaseCost;if(cs.energy<_effCostDrag||_effCostDrag===99)return;
    const rect=cardEl.getBoundingClientRect();const fromX=rect.left+rect.width/2,fromY=rect.top+rect.height/2;
    const svg=UI._createArrowSvg();document.body.appendChild(svg);
    UI._drag={cardId,cardEl,fromX,fromY,svg,active:false,hoveredEnemy:null,startX:e.clientX,startY:e.clientY,handIdx:_dragHandIdx};
    const onMove=ev=>UI._onDragMove(ev),onUp=ev=>UI._onDragEnd(ev);
    document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp,{once:true});
    UI._drag._onMove=onMove;UI._drag._onUp=onUp;
  },

  _onDragMove(e){
    const drag=UI._drag;if(!drag)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;
    if(!drag.active&&Math.sqrt(dx*dx+dy*dy)>15){drag.active=true;drag.cardEl.style.opacity='0.5';drag.svg.style.display='block';document.querySelectorAll('.enemy-card').forEach(el=>el.classList.add('targeted'));}
    if(!drag.active)return;UI._updateArrow(drag.svg,drag.fromX,drag.fromY,e.clientX,e.clientY);
    // 检测是否进入屏幕下1/3取消区
    const cancelZoneY=window.innerHeight*(2/3);
    const inCancel=e.clientY>=cancelZoneY;
    if(inCancel){
      drag.svg.querySelector('#drag-arrow-path')?.setAttribute('stroke','#e74c3c');
      drag.svg.querySelector('#drag-arrow-shadow')?.setAttribute('stroke','rgba(231,76,60,0.3)');
      drag.svg.querySelector('#drag-arrow-path polygon');
      const poly=drag.svg.querySelector('polygon');if(poly)poly.setAttribute('fill','#e74c3c');
    } else {
      drag.svg.querySelector('#drag-arrow-path')?.setAttribute('stroke','#f5c518');
      drag.svg.querySelector('#drag-arrow-shadow')?.setAttribute('stroke','rgba(0,0,0,0.35)');
      const poly=drag.svg.querySelector('polygon');if(poly)poly.setAttribute('fill','#f5c518');
    }
    drag._inCancelZone=inCancel;
    // 单怪时：向上拖出手牌区则箭头变绿色提示
    if(!inCancel){
      const aliveEnemies2=(State.run?.combat?.enemies||[]).filter(en=>!en._dead);
      const isAutoTarget = aliveEnemies2.length===1 && e.clientY < window.innerHeight*0.85;
      const arrowColor = isAutoTarget ? '#2ecc71' : '#f5c518';
      const shadowColor = isAutoTarget ? 'rgba(46,204,113,0.35)' : 'rgba(0,0,0,0.35)';
      drag.svg.querySelector('#drag-arrow-path')?.setAttribute('stroke', arrowColor);
      drag.svg.querySelector('#drag-arrow-shadow')?.setAttribute('stroke', shadowColor);
      const poly2=drag.svg.querySelector('polygon');if(poly2)poly2.setAttribute('fill', arrowColor);
    }
    let found=null;document.querySelectorAll('.enemy-card').forEach(el=>{el.classList.remove('drag-hover');const r=el.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){found=parseInt(el.dataset.enemyIndex??el.id?.replace('enemy-wrap-','')??'-1',10);el.classList.add('drag-hover');}});
    drag.hoveredEnemy=isNaN(found)?null:found;
  },

  _onDragEnd(e){
    const drag=UI._drag;if(!drag)return;document.removeEventListener('mousemove',drag._onMove);drag.svg.remove();document.querySelectorAll('.enemy-card').forEach(el=>el.classList.remove('targeted','drag-hover'));
    if(drag.active){
      drag.cardEl.style.opacity='';
      // 在取消区松手 → 取消出牌
      if(drag._inCancelZone){UI._drag=null;return;}
      const def=Data.cards[drag.cardId];
      if(def.needsTarget){
        // 单怪优化：场上只剩1只活着的怪物时，向上拖出手牌区（鼠标Y < 屏幕85%）即可自动攻击
        const aliveEnemies=(State.run?.combat?.enemies||[]).filter(en=>!en._dead);
        const draggedUp = e.clientY < window.innerHeight * 0.85;
        if(drag.hoveredEnemy!==null){
          UI._playCard(drag.cardId,drag.cardEl,drag.hoveredEnemy,drag.handIdx);
        } else if(draggedUp){
          // 多怪时：自动攻击从左往右第一个存活怪物
          const autoIdx=(State.run.combat.enemies||[]).findIndex(en=>!en._dead);
          if(autoIdx!==-1) UI._playCard(drag.cardId,drag.cardEl,autoIdx,drag.handIdx);
        }
      }else{
        UI._playCard(drag.cardId,drag.cardEl,undefined,drag.handIdx);
      }
    } else{
      // 拖拽距离不足时当作点击，直接用 drag.handIdx 避免重新查找
      const _fallbackEl = drag.cardEl;
      if(_fallbackEl) _fallbackEl.dataset.handIdx = String(drag.handIdx);
      UI._onCardClick(drag.cardId,_fallbackEl);
    }
    UI._drag=null;
  },

  _createArrowSvg(){
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.style.cssText='position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;display:none;';svg.setAttribute('viewBox',`0 0 ${window.innerWidth} ${window.innerHeight}`);svg.setAttribute('preserveAspectRatio','none');
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');const marker=document.createElementNS('http://www.w3.org/2000/svg','marker');marker.setAttribute('id','drag-arrow-head');marker.setAttribute('markerWidth','10');marker.setAttribute('markerHeight','7');marker.setAttribute('refX','9');marker.setAttribute('refY','3.5');marker.setAttribute('orient','auto');
    const poly=document.createElementNS('http://www.w3.org/2000/svg','polygon');poly.setAttribute('points','0 0, 10 3.5, 0 7');poly.setAttribute('fill','#f5c518');marker.appendChild(poly);defs.appendChild(marker);svg.appendChild(defs);
    const shadow=document.createElementNS('http://www.w3.org/2000/svg','path');shadow.setAttribute('id','drag-arrow-shadow');shadow.setAttribute('fill','none');shadow.setAttribute('stroke','rgba(0,0,0,0.35)');shadow.setAttribute('stroke-width','7');shadow.setAttribute('stroke-linecap','round');shadow.setAttribute('stroke-dasharray','14 8');svg.appendChild(shadow);
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('id','drag-arrow-path');path.setAttribute('fill','none');path.setAttribute('stroke','#f5c518');path.setAttribute('stroke-width','5');path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-dasharray','14 8');path.setAttribute('marker-end','url(#drag-arrow-head)');svg.appendChild(path);
    return svg;
  },

  _updateArrow(svg,x1,y1,x2,y2){ const mx=(x1+x2)/2,my=Math.min(y1,y2)-80,d=`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;svg.querySelector('#drag-arrow-path')?.setAttribute('d',d);svg.querySelector('#drag-arrow-shadow')?.setAttribute('d',d); },

  showPauseMenu(){
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'pause-overlay';

    function buildSlotsHtml(){
      return Save.list().map(({slot, run: sr}) => {
        if (sr) {
          const d = new Date(sr._savedAt);
          return `<option value="${slot}">槽位${slot+1}: ${sr.character.emoji}${sr.character.name} 第${sr.floor}层 (${d.toLocaleString()})</option>`;
        }
        return `<option value="${slot}">槽位${slot+1}: 空存档</option>`;
      }).join('');
    }

    overlay.innerHTML = `
      <div class="panel bounce-in" style="min-width:300px;max-width:90vw;padding:24px 28px">
        <h3 class="screen-title" style="margin-bottom:20px;font-size:1.6rem">⏸ 游戏菜单</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <button class="btn" id="pause-load-btn" style="font-size:1.1rem">📂 读取存档</button>
          <div id="pause-load-sub" style="display:none;flex-direction:column;gap:8px;padding:8px;background:rgba(255,255,255,0.05);border-radius:8px"></div>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:4px 0">
          <button class="btn primary" id="pause-quit-btn" style="font-size:1.1rem">💾 保存并退出到主菜单</button>
          <div id="pause-quit-sub" style="display:none;flex-direction:column;gap:8px;padding:8px;background:rgba(255,255,255,0.05);border-radius:8px"></div>
          <button class="btn danger" id="pause-abandon-btn" style="font-size:1.1rem">🗑 放弃存档，退出游戏</button>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:4px 0">
          <button class="btn" id="pause-close-btn" style="font-size:1.1rem;background:rgba(255,255,255,0.05)">✖ 继续游戏</button>
        </div>
      </div>`;

    // 读取存档：点击后展开槽位选择
    overlay.querySelector('#pause-load-btn').onclick = () => {
      const sub = overlay.querySelector('#pause-load-sub');
      if (sub.style.display === 'flex') { sub.style.display = 'none'; return; }
      sub.innerHTML = `
        <select id="pause-load-slot" style="font-family:var(--font);font-size:1rem;padding:6px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;cursor:pointer">${buildSlotsHtml()}</select>
        <button class="btn" id="pause-load-confirm" style="font-size:1rem">✅ 确认读取</button>`;
      sub.style.display = 'flex';
      sub.querySelector('#pause-load-confirm').onclick = () => {
        const slot = parseInt(sub.querySelector('#pause-load-slot').value, 10);
        const sr = Save.read(slot);
        if (!sr) { alert('该存档槽为空！'); return; }
        overlay.remove();
        State.loadRun(slot);
      };
    };

    // 保存并退出：点击后展开槽位选择
    overlay.querySelector('#pause-quit-btn').onclick = () => {
      const sub = overlay.querySelector('#pause-quit-sub');
      if (sub.style.display === 'flex') { sub.style.display = 'none'; return; }
      sub.innerHTML = `
        <select id="pause-save-slot" style="font-family:var(--font);font-size:1rem;padding:6px 10px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;cursor:pointer">${buildSlotsHtml()}</select>
        <button class="btn primary" id="pause-save-confirm" style="font-size:1rem">✅ 确认保存并退出</button>`;
      sub.style.display = 'flex';
      sub.querySelector('#pause-save-confirm').onclick = () => {
        const slot = parseInt(sub.querySelector('#pause-save-slot').value, 10);
        const run = State.run;
        // 修复漏洞：保存前将 currentNodeId 回滚到父节点
        // 找到当前节点的父节点（即 paths 中 to===currentNodeId 且 done===true 的 from）
        const curId = run.currentNodeId;
        const curNode = run.map.nodes.find(n => n.id === curId);
        // 只有当前节点未完成（done 不为 true）时才需要回滚
        if (curNode && !curNode.done) {
          // 如果是问号节点，且有快照，先回滚快照中的关键字段
          if (curNode.type === 'question' && run._questionSnapshot) {
            const snap = run._questionSnapshot;
            run.character.hp = snap.hp;
            run.character.maxHp = snap.maxHp;
            run.gold = snap.gold;
            run.relics = [...snap.relics];
            run.deck = [...snap.deck];
          }
          // 清除快照
          delete run._questionSnapshot;
          // 找父节点：paths 中 to===curId 的 from
          const parentPath = run.map.paths.find(p => p.to === curId);
          if (parentPath) {
            // 回滚：将 currentNodeId 设为父节点
            run.currentNodeId = parentPath.from;
          } else {
            // 起始节点，没有父节点，设为 null
            run.currentNodeId = null;
          }
        }
        // 清除战斗状态（防止读档后直接进入战斗中间状态）
        run.combat = null;
        State.saveRun(slot);
        overlay.remove();
        Audio.stopAll && Audio.stopAll();
        State.current.run = null;
        State.go('menu');
      };
    };

    // 放弃存档退出：二次确认
    overlay.querySelector('#pause-abandon-btn').onclick = () => {
      const confirmed = confirm('确定放弃当前存档并退出游戏？此操作不可撤销！');
      if (!confirmed) return;
      overlay.remove();
      Audio.stopAll && Audio.stopAll();
      State.current.run = null;
      State.go('menu');
    };

    // 继续游戏
    overlay.querySelector('#pause-close-btn').onclick = () => overlay.remove();
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  },

  // ── 游戏图鉴 ──────────────────────────────────────────────────────────────
  showDatabase() {
    // ── 常量 ──
    const TC = { epic:'#c084fc', rare:'#60a5fa', uncommon:'#4ade80', common:'#94a3b8' };
    const TN = { epic:'史诗', rare:'稀有', uncommon:'非凡', common:'普通' };
    const TE = { epic:'🔮', rare:'💠', uncommon:'🟩', common:'⬜' };
    const TBG = { epic:'rgba(192,132,252,0.12)', rare:'rgba(96,165,250,0.12)', uncommon:'rgba(74,222,128,0.12)', common:'rgba(148,163,184,0.1)' };
    const typeLabel = { attack:'攻击', skill:'技能', power:'能力', curse:'诅咒' };
    const typeBg    = { attack:'rgba(220,60,60,0.3)', skill:'rgba(60,120,220,0.3)', power:'rgba(160,60,220,0.3)', curse:'rgba(80,80,80,0.4)' };
    const typeColor = { attack:'#ff9090', skill:'#90c8ff', power:'#d090ff', curse:'#aaa' };

    // ── 收集所有遗物 ──
    const allRelics = (() => {
      const seen = new Set(); const list = [];
      [...(Data.dayanRelics||[]),...(Data.datouRelics||[]),...(Data.wenhaoRelics||[]),
       ...(Data.gaoshanRelics||[]),...(Data.wangweiRelics||[]),...(Data.battleRelics||[])]
        .forEach(r => { if (!seen.has(r.id)) { seen.add(r.id); list.push(r); } });
      return list;
    })();
    const relicGroups = { epic:[], rare:[], uncommon:[], common:[] };
    allRelics.forEach(r => { const t = r.tier||'common'; if (relicGroups[t]) relicGroups[t].push(r); });

    // ── 共用：单张卡牌详情块 ──
    function cardBlock(id) {
      const card = Data.cards[id]; if (!card) return '';
      const upg = Data.upgrades[id] || {};
      const t = card.type || 'skill';
      const costStr = card.cost === 99 ? '—' : card.cost;
      return `<div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.13);border-radius:12px;padding:12px 14px;width:210px;box-sizing:border-box;flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px;">
          <span style="background:rgba(0,0,0,0.5);border:1.5px solid rgba(255,220,80,0.5);border-radius:50%;min-width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:800;color:#ffe082;flex-shrink:0;">${costStr}</span>
          <span style="font-weight:800;color:#fff;font-size:0.95rem;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${card.name}</span>
          <span style="font-size:0.7rem;padding:2px 7px;border-radius:5px;background:${typeBg[t]};color:${typeColor[t]};flex-shrink:0;">${typeLabel[t]||t}</span>
        </div>
        <div style="font-size:0.82rem;color:rgba(255,255,255,0.82);line-height:1.5;">${card.description}</div>
        ${upg[1]?`<div style="font-size:0.76rem;color:#90c8ff;border-top:1px solid rgba(255,255,255,0.1);padding-top:5px;margin-top:6px;line-height:1.45;"><b style="opacity:0.6">+1 </b>${upg[1].desc}</div>`:''}
        ${upg[2]?`<div style="font-size:0.76rem;color:#c8a8ff;border-top:1px solid rgba(255,255,255,0.08);padding-top:4px;margin-top:4px;line-height:1.45;"><b style="opacity:0.6">+2 </b>${upg[2].desc}</div>`:''}
      </div>`;
    }

    // ── 共用：返回按钮 ──
    function backBtn(label, onclick) {
      const b = document.createElement('button');
      b.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.22);color:rgba(255,255,255,0.75);border-radius:10px;padding:7px 18px;cursor:pointer;font-size:0.9rem;font-family:var(--font);margin-bottom:20px;display:flex;align-items:center;gap:6px;';
      b.innerHTML = `← ${label}`;
      b.onclick = onclick;
      return b;
    }

    // ════════════════════════════════════════
    // 角色卡牌：第一层大图标，第二层卡池
    // ════════════════════════════════════════
    function renderCards(box) {
      box.innerHTML = '';
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:8px 0;';
      Data.characters.forEach(char => {
        const rewardIds = Data.rewardPool[char.id] || Data.rewardPool.default;
        const totalCards = [...new Set(char.startingDeck)].length + rewardIds.length;
        const tile = document.createElement('div');
        tile.style.cssText = `background:${char.color}18;border:2px solid ${char.color}55;border-radius:20px;padding:32px 24px;text-align:center;cursor:pointer;transition:all 0.18s;box-sizing:border-box;`;
        tile.innerHTML = `
          <div style="font-size:5rem;line-height:1.1;margin-bottom:14px;">${char.emoji}</div>
          <div style="font-size:1.4rem;font-weight:800;color:#fff;margin-bottom:6px;">${char.name}</div>
          <div style="font-size:0.9rem;color:rgba(255,255,255,0.55);margin-bottom:12px;">${char.description}</div>
          <div style="display:flex;justify-content:center;gap:16px;font-size:0.82rem;color:rgba(255,255,255,0.45);">
            <span>❤️ ${char.maxHp} HP</span>
            <span>🃏 ${totalCards} 张牌</span>
          </div>`;
        tile.onmouseenter = () => { tile.style.background = `${char.color}30`; tile.style.borderColor = `${char.color}aa`; tile.style.transform = 'translateY(-4px)'; };
        tile.onmouseleave = () => { tile.style.background = `${char.color}18`; tile.style.borderColor = `${char.color}55`; tile.style.transform = ''; };
        tile.onclick = () => renderCharDetail(box, char);
        grid.appendChild(tile);
      });
      box.appendChild(grid);
    }

    function renderCharDetail(box, char) {
      box.innerHTML = '';
      box.appendChild(backBtn('角色卡牌', () => renderCards(box)));
      // 角色信息条
      const header = document.createElement('div');
      header.style.cssText = `display:flex;align-items:center;gap:16px;padding:16px 20px;background:${char.color}20;border-radius:14px;border-left:5px solid ${char.color};margin-bottom:22px;`;
      header.innerHTML = `<span style="font-size:3rem;">${char.emoji}</span><div><div style="font-size:1.2rem;font-weight:800;color:#fff;">${char.name}</div><div style="font-size:0.85rem;color:rgba(255,255,255,0.55);margin-top:3px;">${char.description}</div></div>`;
      box.appendChild(header);

      // ── 卡牌按稀有度 / 起始 分类 ──
      const RC = { start:'#facc15', common:'#94a3b8', uncommon:'#3b82f6', rare:'#a855f7' };
      const RN = { start:'起始牌组', common:'普通', uncommon:'罕见', rare:'稀有' };
      const RE = { start:'🎴', common:'⚪', uncommon:'🔵', rare:'🟣' };

      const startUniq = [...new Set(char.startingDeck)];
      const rewardIds = Data.rewardPool[char.id] || Data.rewardPool.default;
      const cats = {
        start:    startUniq,
        common:   rewardIds.filter(id => (Data.cards[id]?.rarity||'common') === 'common'),
        uncommon: rewardIds.filter(id => Data.cards[id]?.rarity === 'uncommon'),
        rare:     rewardIds.filter(id => Data.cards[id]?.rarity === 'rare'),
      };
      const catKeys = ['start','common','uncommon','rare'].filter(k => cats[k].length);

      // 分类按钮行
      const btnRow = document.createElement('div');
      btnRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;';
      const cardArea = document.createElement('div');
      cardArea.style.cssText = 'display:flex;flex-wrap:wrap;gap:14px;';

      const catBtns = {};
      function selectCat(key) {
        catKeys.forEach(k => {
          const b = catBtns[k]; const on = k === key; const c = RC[k];
          b.style.cssText = `cursor:pointer;border-radius:14px;padding:16px 22px;box-sizing:border-box;text-align:center;transition:all 0.15s;min-width:130px;background:${on?c+'30':'rgba(255,255,255,0.05)'};border:2px solid ${on?c+'cc':'rgba(255,255,255,0.14)'};${on?'transform:translateY(-3px);':''}`;
        });
        cardArea.innerHTML = cats[key].map(id => cardBlock(id)).join('');
      }

      catKeys.forEach(key => {
        const c = RC[key];
        const b = document.createElement('div');
        b.innerHTML = `<div style="font-size:1.8rem;line-height:1;margin-bottom:6px;">${RE[key]}</div>
          <div style="font-size:1rem;font-weight:800;color:${c};">${RN[key]}</div>
          <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);margin-top:3px;">${cats[key].length} 张</div>`;
        b.onclick = () => selectCat(key);
        b.onmouseenter = () => { if (cardArea.dataset.cur !== key) b.style.transform = 'translateY(-3px)'; };
        b.onmouseleave = () => { if (cardArea.dataset.cur !== key) b.style.transform = ''; };
        const origClick = b.onclick;
        b.onclick = () => { cardArea.dataset.cur = key; origClick(); };
        catBtns[key] = b;
        btnRow.appendChild(b);
      });

      box.appendChild(btnRow);
      box.appendChild(cardArea);
      if (catKeys.length) { cardArea.dataset.cur = catKeys[0]; selectCat(catKeys[0]); }
    }

    // ════════════════════════════════════════
    // 遗物：第一层 4 个档位大块，第二层遗物列表
    // ════════════════════════════════════════
    function renderRelics(box) {
      box.innerHTML = '';
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:8px 0;';
      ['epic','rare','uncommon','common'].forEach(tier => {
        const list = relicGroups[tier];
        if (!list.length) return;
        const tc = TC[tier];
        const tile = document.createElement('div');
        tile.style.cssText = `background:${TBG[tier]};border:2px solid ${tc}55;border-radius:20px;padding:32px 24px;text-align:center;cursor:pointer;transition:all 0.18s;box-sizing:border-box;`;
        // 展示前3个遗物图标作为预览
        const previewIcons = list.slice(0,3).map(r => r.img
          ? `<img src="${r.img}" style="width:36px;height:36px;object-fit:contain;vertical-align:middle;">`
          : `<span style="font-size:2rem;">${r.icon||'❓'}</span>`).join('');
        tile.innerHTML = `
          <div style="font-size:3rem;margin-bottom:10px;">${TE[tier]}</div>
          <div style="font-size:1.5rem;font-weight:800;color:${tc};margin-bottom:8px;">${TN[tier]}</div>
          <div style="font-size:0.9rem;color:rgba(255,255,255,0.45);margin-bottom:16px;">${list.length} 件遗物</div>
          <div style="display:flex;justify-content:center;align-items:center;gap:8px;min-height:36px;">${previewIcons}</div>`;
        tile.onmouseenter = () => { tile.style.background = `${TBG[tier].replace('0.12','0.22')}`; tile.style.borderColor = `${tc}99`; tile.style.transform = 'translateY(-4px)'; };
        tile.onmouseleave = () => { tile.style.background = TBG[tier]; tile.style.borderColor = `${tc}55`; tile.style.transform = ''; };
        tile.onclick = () => renderRelicDetail(box, tier);
        grid.appendChild(tile);
      });
      box.appendChild(grid);
    }

    function renderRelicDetail(box, tier) {
      box.innerHTML = '';
      box.appendChild(backBtn('遗物', () => renderRelics(box)));
      const tc = TC[tier];
      const header = document.createElement('div');
      header.style.cssText = `display:flex;align-items:center;gap:14px;padding:14px 20px;background:${TBG[tier]};border-radius:14px;border-left:5px solid ${tc};margin-bottom:22px;`;
      header.innerHTML = `<span style="font-size:2.5rem;">${TE[tier]}</span><div><div style="font-size:1.2rem;font-weight:800;color:${tc};">${TN[tier]}遗物</div><div style="font-size:0.85rem;color:rgba(255,255,255,0.45);margin-top:3px;">${relicGroups[tier].length} 件</div></div>`;
      box.appendChild(header);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;flex-wrap:wrap;gap:14px;';
      relicGroups[tier].forEach(r => {
        const iconHtml = r.img
          ? `<img src="${r.img}" style="width:48px;height:48px;object-fit:contain;flex-shrink:0;">`
          : `<span style="font-size:2.6rem;line-height:1;flex-shrink:0;">${r.icon||'❓'}</span>`;
        const card = document.createElement('div');
        card.style.cssText = `background:rgba(255,255,255,0.05);border:1.5px solid ${tc}44;border-radius:14px;padding:16px 18px;width:250px;box-sizing:border-box;flex-shrink:0;`;
        card.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            ${iconHtml}
            <div style="font-weight:800;color:#fff;font-size:1rem;flex:1;">${r.name}</div>
          </div>
          <div style="font-size:0.83rem;color:rgba(255,255,255,0.75);line-height:1.55;">${r.desc||''}</div>`;
        row.appendChild(card);
      });
      box.appendChild(row);
    }

    // ════════════════════════════════════════
    // 药水：大卡片直接展示（数量少）
    // ════════════════════════════════════════
    function renderPotions(box) {
      box.innerHTML = '';
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:8px 0;';
      Object.values(Data.potions).forEach(p => {
        const tier = p.tier || 'uncommon';
        const tc = TC[tier] || '#94a3b8';
        const imgHtml = p.img
          ? `<img src="${p.img}" style="width:56px;height:56px;object-fit:contain;">`
          : `<span style="font-size:3.2rem;line-height:1;">${p.emoji||'🧪'}</span>`;
        const tile = document.createElement('div');
        tile.style.cssText = `background:${TBG[tier]||'rgba(148,163,184,0.1)'};border:2px solid ${tc}55;border-radius:20px;padding:28px 24px;box-sizing:border-box;`;
        tile.innerHTML = `
          <div style="display:flex;align-items:center;gap:18px;margin-bottom:14px;">
            ${imgHtml}
            <div>
              <div style="font-size:1.25rem;font-weight:800;color:#fff;margin-bottom:4px;">${p.name}</div>
              <div style="font-size:0.8rem;color:${tc};font-weight:700;">${TN[tier]||''}</div>
            </div>
          </div>
          <div style="font-size:0.88rem;color:rgba(255,255,255,0.8);line-height:1.6;">${p.desc||''}</div>`;
        grid.appendChild(tile);
      });
      box.appendChild(grid);
    }

    // ════════════════════════════════════════
    // 怪物：第一层分区大块，第二层怪物详情
    // ════════════════════════════════════════
    const monsterGroups = [
      { key:'act1n',  label:'第一层 · 普通', emoji:'⚔️', color:'#64b5f6', ids:['slime','cultist','louse','jawworm'] },
      { key:'act1b',  label:'第一层 · Boss',  emoji:'💀', color:'#ef5350', ids:['guardian'] },
      { key:'act2n',  label:'第二层 · 普通', emoji:'⚔️', color:'#81c784', ids:['louse2','cultist2','jawworm2'] },
      { key:'act2b',  label:'第二层 · Boss',  emoji:'💀', color:'#ef9a9a', ids:['banbu'] },
      { key:'act3n',  label:'第三层 · 普通', emoji:'⚔️', color:'#b39ddb', ids:['ironguard','cursemage','berserker'] },
      { key:'act3b',  label:'第三层 · Boss',  emoji:'👑', color:'#ce93d8', ids:['boge'] },
      { key:'event',  label:'事件遭遇',        emoji:'❓', color:'#ffb74d', ids:['liuxing1','liuxing2','liuxing3'] },
      { key:'tut',    label:'教程',             emoji:'📖', color:'#90a4ae', ids:['tutorial_boss'] },
    ];

    function getEnemyActions(enemy) {
      const uniqueActions = [...new Set(enemy.actions||[])];
      const typeIcons = { attack:'⚔️', defend:'🛡️', buff:'✨', debuff:'💢', pollute:'☣️' };
      return uniqueActions.map(actionName => {
        try {
          const mockState = { actionIndex:0, buffs:{strength:0}, gear:2, actions:[actionName] };
          const intents = enemy.getIntent(mockState);
          const arr = Array.isArray(intents) ? intents : [intents];
          const desc = arr.map(i => i.detail || i.label || '').filter(Boolean).join('，');
          const icon = typeIcons[arr[0]?.type] || '▸';
          return `<div style="display:flex;gap:9px;margin-bottom:8px;align-items:flex-start;"><span style="flex-shrink:0;font-size:1.05rem;">${icon}</span><span style="font-size:0.95rem;color:rgba(255,255,255,0.72);line-height:1.5;">${desc}</span></div>`;
        } catch(e) { return ''; }
      }).join('');
    }

    function renderMonsters(box) {
      box.innerHTML = '';
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding:8px 0;';
      monsterGroups.forEach(g => {
        const validIds = g.ids.filter(id => Data.enemies[id]);
        if (!validIds.length) return;
        const tile = document.createElement('div');
        tile.style.cssText = `background:${g.color}15;border:2px solid ${g.color}55;border-radius:24px;padding:48px 32px;text-align:center;cursor:pointer;transition:all 0.18s;box-sizing:border-box;`;
        const previewEmojis = validIds.slice(0,3).map(id => `<span style="font-size:3rem;">${Data.enemies[id].emoji}</span>`).join('');
        tile.innerHTML = `
          <div style="font-size:4.6rem;line-height:1.05;margin-bottom:16px;">${g.emoji}</div>
          <div style="font-size:1.75rem;font-weight:800;color:${g.color};margin-bottom:10px;">${g.label}</div>
          <div style="font-size:1.1rem;color:rgba(255,255,255,0.5);margin-bottom:22px;">${validIds.length} 种怪物</div>
          <div style="display:flex;justify-content:center;gap:14px;min-height:48px;align-items:center;">${previewEmojis}</div>`;
        tile.onmouseenter = () => { tile.style.background = `${g.color}25`; tile.style.borderColor = `${g.color}99`; tile.style.transform = 'translateY(-4px)'; };
        tile.onmouseleave = () => { tile.style.background = `${g.color}15`; tile.style.borderColor = `${g.color}55`; tile.style.transform = ''; };
        tile.onclick = () => renderMonsterDetail(box, g);
        grid.appendChild(tile);
      });
      box.appendChild(grid);
    }

    function renderMonsterDetail(box, g) {
      box.innerHTML = '';
      box.appendChild(backBtn('怪物图鉴', () => renderMonsters(box)));
      const header = document.createElement('div');
      header.style.cssText = `display:flex;align-items:center;gap:14px;padding:14px 20px;background:${g.color}18;border-radius:14px;border-left:5px solid ${g.color};margin-bottom:22px;`;
      header.innerHTML = `<span style="font-size:2.2rem;">${g.emoji}</span><div><div style="font-size:1.2rem;font-weight:800;color:${g.color};">${g.label}</div><div style="font-size:0.85rem;color:rgba(255,255,255,0.45);margin-top:3px;">${g.ids.filter(id=>Data.enemies[id]).length} 种怪物</div></div>`;
      box.appendChild(header);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;flex-wrap:wrap;gap:20px;';
      g.ids.filter(id => Data.enemies[id]).forEach(id => {
        const e = Data.enemies[id];
        const card = document.createElement('div');
        card.style.cssText = `background:rgba(255,255,255,0.05);border:1.5px solid ${g.color}44;border-radius:20px;padding:24px 26px;width:360px;box-sizing:border-box;flex-shrink:0;`;
        card.innerHTML = `
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <span style="font-size:3.8rem;line-height:1;">${e.emoji}</span>
            <div>
              <div style="font-weight:800;color:#fff;font-size:1.35rem;">${e.name}</div>
              <div style="font-size:0.95rem;color:rgba(255,255,255,0.5);margin-top:5px;">❤️ ${e.maxHp} HP</div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:14px;">${getEnemyActions(e)}</div>`;
        row.appendChild(card);
      });
      box.appendChild(row);
    }

    // ════════════════════════════════════════
    // 组装 overlay
    // ════════════════════════════════════════
    const activeTabStyle = 'background:rgba(140,90,255,0.25);border:1.5px solid rgba(160,100,255,0.6);color:#c8a0ff;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:0.95rem;font-weight:700;font-family:var(--font);';
    const normalTabStyle = 'background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.16);color:rgba(255,255,255,0.55);border-radius:10px;padding:8px 18px;cursor:pointer;font-size:0.95rem;font-family:var(--font);';

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(6,6,18,0.97);z-index:9500;display:flex;flex-direction:column;overflow:hidden;font-family:var(--font);';
    overlay.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;padding:14px 22px;border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.35);flex-shrink:0;">
        <div style="font-size:1.2rem;font-weight:800;color:#e8d8ff;margin-right:8px;">📚 游戏图鉴</div>
        <button id="dbt-cards">🃏 角色卡牌</button>
        <button id="dbt-relics">💎 遗物</button>
        <button id="dbt-potions">🧪 药水</button>
        <button id="dbt-monsters">👾 怪物</button>
        <button id="db-close" style="margin-left:auto;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.2);color:#fff;border-radius:10px;padding:8px 18px;cursor:pointer;font-size:0.95rem;font-family:var(--font);">✕ 关闭</button>
      </div>
      <div id="db-content" style="flex:1;overflow-y:auto;padding:24px 28px;"></div>`;

    const box  = overlay.querySelector('#db-content');
    const btns = {
      cards:    overlay.querySelector('#dbt-cards'),
      relics:   overlay.querySelector('#dbt-relics'),
      potions:  overlay.querySelector('#dbt-potions'),
      monsters: overlay.querySelector('#dbt-monsters'),
    };
    const renders = { cards: renderCards, relics: renderRelics, potions: renderPotions, monsters: renderMonsters };

    function switchTab(tab) {
      box.scrollTop = 0;
      Object.entries(btns).forEach(([k,b]) => b.style.cssText = k===tab ? activeTabStyle : normalTabStyle);
      renders[tab](box);
    }

    Object.entries(btns).forEach(([k,b]) => b.onclick = () => switchTab(k));
    overlay.querySelector('#db-close').onclick = () => overlay.remove();

    switchTab('cards');
    document.body.appendChild(overlay);
  },

  // ── 联机合作战斗界面（同时行动模式）─────────────────────────────────────────
  // UI 参照单人 _renderCombat：复用 renderCard / renderHpBar / renderBuffs，
  // 玩家区域同时显示两个角色（房主+访客）
  coopCombat(coopCs, isGuestView) {
    if (!coopCs) return;
    // 房主端保存状态引用
    if (Net.isHost) UI._coopCs = coopCs;
    UI._coopGuestCs = coopCs; // 访客端也存一份，给修复 modal 等使用

    const app = UI.app();
    const myRole = Net.isHost ? 'host' : 'guest';
    const oppRole = Net.isHost ? 'guest' : 'host';
    const myPlayer = coopCs[myRole];
    const oppPlayer = coopCs[oppRole];
    const myEndedKey = myRole + 'Ended';
    const oppEndedKey = oppRole + 'Ended';
    const myEnded = !!coopCs[myEndedKey];
    const oppEnded = !!coopCs[oppEndedKey];
    const isPlayerPhase = coopCs.phase === 'player';
    // 私有交互 banner（对方正在操作时本地等待）
    const pi = coopCs.pendingInteraction;
    const piActive = pi && pi.who && pi.who !== myRole;
    // 在玩家阶段、未点结束、自己还活着、且没有对方在私有交互 → 可操作
    const canAct = isPlayerPhase && !myEnded && myPlayer.hp > 0 && !piActive;

    const phaseLabel = {
      'player': `回合 ${coopCs.turn} · 进行中`,
      'enemy': '👹 敌方回合',
      'victory': '🏆 胜利！',
      'defeat': '💀 失败',
      'reward': '🎁 战斗奖励',
    }[coopCs.phase] || coopCs.phase;

    // 渲染敌人（接近单人 _renderEnemies 样式）
    function renderEnemy(e, ei) {
      if (e._dead || e.hp <= 0) return `<div class="enemy-card" style="opacity:0.25;text-align:center;font-size:2rem;padding:14px">💀</div>`;
      const intentArr = Array.isArray(e.currentIntent) ? e.currentIntent : (e.currentIntent ? [e.currentIntent] : []);
      const visible = intentArr.filter(it => it && it.type !== 'defend');
      const intentHtml = visible.map(it => {
        return `<span class="intent-badge ${it.type||'unknown'}">${it.label||''}<span style="font-size:0.95em">${it.num||''}</span></span>`;
      }).join('');
      return `<div class="enemy-card coop-enemy-target" data-enemy-idx="${ei}" style="cursor:${canAct?'pointer':'default'}">
        <div class="enemy-intent">${intentHtml}</div>
        <div class="enemy-figure" id="coop-enemy-fig-${ei}">${e.emoji || '👾'}</div>
        <div style="width:130px">${UI.renderHpBar(e.hp, e.maxHp, '130px', e.block)}</div>
        <div style="font-size:1.05rem;font-weight:700;color:#e8e8f0">${e.name}</div>
        <div style="font-size:0.92rem;color:rgba(255,255,255,0.8)">${e.hp}/${e.maxHp} HP${e.block>0?` · 🛡${e.block}`:''}</div>
        <div class="enemy-buffs" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center">${UI.renderBuffs(e)}</div>
      </div>`;
    }

    // 渲染玩家状态栏（同时行动模式：双方都常驻显示完整信息）
    // 参考单人 .player-area 样式，做成大头像+HP条+buff，并按角色追加 HUD（挡位/蓄力）
    function renderPlayerBar(p, role, label, isSelf) {
      const energy = coopCs[role + 'Energy'];
      const maxEnergy = coopCs[role + 'MaxEnergy'];
      const handCount = role === 'host' ? coopCs.hostHand.length : coopCs.guestHand.length;
      const ended = !!coopCs[role + 'Ended'];
      const dead = p.hp <= 0;
      const ring = isSelf ? '2px solid rgba(127,224,168,0.55)' : '2px solid rgba(255,255,255,0.12)';
      const bg = isSelf ? 'rgba(127,224,168,0.1)' : 'rgba(255,255,255,0.05)';

      // 赛车手挡位 HUD（仅在角色为 racer 时显示）
      let racerHud = '';
      if (p.charId === 'racer') {
        const g = coopCs[role + 'Gear'] != null ? coopCs[role + 'Gear'] : 2;
        const spd = coopCs[role + 'Speed'] || 0;
        const mom = coopCs[role + 'Momentum'] || 0;
        const gearColors = ['', '#7dccff', '#e8e8e8', '#ff7d7d'];
        const gearIcons = ['', '↓', '•', '↑'];
        const gc = gearColors[g] || '#fff';
        const gearNames = ['', '1挡·防御', '2挡·中立', '3挡·攻击'];
        racerHud = `<div style="margin-top:4px;display:flex;flex-direction:column;align-items:center;gap:4px;border-top:1px dashed rgba(255,255,255,0.15);padding-top:6px;width:100%">
          <div style="display:flex;gap:3px;align-items:center">
            ${[1,2,3].map(i => {
              const active = g === i;
              const c = gearColors[i];
              return `<div style="width:36px;padding:3px 0;border-radius:7px;font-size:${active?'0.78rem':'0.66rem'};font-weight:900;text-align:center;border:${active?'2px':'1px'} solid ${active?c:'rgba(255,255,255,0.2)'};background:${active?c+'33':'rgba(255,255,255,0.04)'};color:${active?c:'rgba(255,255,255,0.3)'}">${gearIcons[i]}${i}</div>`;
            }).join('')}
          </div>
          <div style="font-size:0.7rem;color:${gc};font-weight:800">${gearNames[g]||''}</div>
          <div style="display:flex;gap:4px;font-size:0.7rem;flex-wrap:wrap;justify-content:center">
            <span style="color:#f9ca24;background:rgba(249,202,36,0.12);border:1px solid rgba(249,202,36,0.4);border-radius:5px;padding:1px 5px">⚡${spd}</span>
            ${mom>0?`<span style="color:#a8e6cf;background:rgba(168,230,207,0.12);border:1px solid rgba(168,230,207,0.4);border-radius:5px;padding:1px 5px">⬆${mom}</span>`:''}
          </div>
        </div>`;
      }

      // 射手蓄力条 HUD（仅在角色为 archer 时显示）
      let archerHud = '';
      if (p.charId === 'archer') {
        const charge = coopCs[role + 'Charge'] || 0;
        const chargeMax = coopCs[role + 'ChargeMax'] || 5;
        const pct = chargeMax > 0 ? Math.min(100, charge / chargeMax * 100) : 0;
        const isFull = charge >= chargeMax;
        archerHud = `<div style="margin-top:4px;display:flex;flex-direction:column;align-items:center;gap:3px;border-top:1px dashed rgba(255,255,255,0.15);padding-top:6px;width:100%">
          <div style="font-size:0.72rem;font-weight:800;color:${isFull?'#f5c518':'#7dccff'}">🎯 蓄力 ${charge}/${chargeMax}${isFull?' 🔥':''}</div>
          <div style="width:110px;height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)">
            <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,#7dccff,${isFull?'#f5c518':'#a4d8ff'});transition:width 0.3s"></div>
          </div>
        </div>`;
      }

      // 个人遗物（仅对自己生效）
      const myRelics = (UI._coopRun && Array.isArray(UI._coopRun[role+'Relics'])) ? UI._coopRun[role+'Relics'] : [];
      const relicsHtml = myRelics.length > 0
        ? `<div style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center;margin-top:3px">
            ${myRelics.map(rid => {
              const r = Data.relics && Data.relics[rid];
              const emoji = r?.emoji || '🔮';
              const name = r?.name || rid;
              return `<span title="${name}" style="font-size:0.95rem;cursor:help;background:rgba(245,197,24,0.12);border:1px solid rgba(245,197,24,0.4);border-radius:5px;padding:0 4px">${emoji}</span>`;
            }).join('')}
          </div>` : '';

      return `<div class="player-area coop-player-area" style="flex:1;padding:12px 10px;background:${bg};border:${ring};border-radius:14px;text-align:center;position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;${dead?'opacity:0.55;':''}">
        ${ended && !dead ? `<div style="position:absolute;top:6px;right:8px;font-size:0.7rem;font-weight:800;color:#7fe0a8;background:rgba(127,224,168,0.18);border:1px solid rgba(127,224,168,0.5);border-radius:6px;padding:1px 6px">已结束 ✓</div>` : ''}
        ${dead ? `<div style="position:absolute;top:6px;right:8px;font-size:0.7rem;font-weight:800;color:#ff9b8f">已阵亡</div>` : ''}
        <div class="player-figure" style="font-size:2.6rem;line-height:1">${p.charEmoji || '?'}</div>
        <div style="font-size:0.88rem;font-weight:800;color:${isSelf?'#7fe0a8':'#fff'}">${label}${isSelf?' (你)':''}</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.6)">${p.charName || ''}</div>
        <div style="width:130px">${UI.renderHpBar(p.hp, p.maxHp, '130px', p.block)}</div>
        <div style="font-size:0.95rem;color:#e8e8f0;font-weight:600">${p.hp}/${p.maxHp} HP${p.block>0?` · <span style='color:#5dade2'>🛡${p.block}</span>`:''}</div>
        <div style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center">${UI.renderBuffs(p)}</div>
        <div style="display:flex;justify-content:center;gap:10px;font-size:0.82rem;margin-top:2px">
          <span style="color:#f5c518;font-weight:800">⚡ ${ended?0:energy}/${maxEnergy}</span>
          <span style="color:rgba(255,255,255,0.6)">🂠 ${handCount}</span>
        </div>
        ${relicsHtml}
        ${racerHud}${archerHud}
      </div>`;
    }

    // 自己的手牌、能量
    const myHand = myRole === 'host' ? coopCs.hostHand : coopCs.guestHand;
    const myDraw = myRole === 'host' ? coopCs.hostDrawPile : coopCs.guestDrawPile;
    const myDiscard = myRole === 'host' ? coopCs.hostDiscardPile : coopCs.guestDiscardPile;
    const myEnergy = coopCs[myRole + 'Energy'];
    const myMaxEnergy = coopCs[myRole + 'MaxEnergy'];

    const enemiesHtml = coopCs.enemies.map((e, ei) => renderEnemy(e, ei)).join('');
    const hostBarHtml = renderPlayerBar(coopCs.host, 'host', '🏠 房主', Net.isHost);
    const guestBarHtml = renderPlayerBar(coopCs.guest, 'guest', '🔑 访客', !Net.isHost);

    // 手牌区状态文本
    let handAreaStatus;
    if (coopCs.phase === 'enemy') handAreaStatus = '👹 敌方行动中…';
    else if (coopCs.phase === 'reward') handAreaStatus = '🎁 战斗胜利，选择奖励';
    else if (piActive) handAreaStatus = `⏳ ${pi.label||'对方正在操作…'}（${pi.who==='host'?'🏠 房主':'🔑 访客'}），请等待`;
    else if (myEnded) handAreaStatus = `✓ 已结束回合，等待对方${oppEnded?'':''}…`;
    else if (myPlayer.hp <= 0) handAreaStatus = '💀 你已阵亡';
    else handAreaStatus = '';

    // 战斗结果（胜利/失败）— 控制流转到地图或返回大厅
    const isFinalDefeat = coopCs.phase === 'defeat';
    const isReward = coopCs.phase === 'reward';
    const resultHtml = isReward
      ? '' // 奖励界面单独渲染
      : isFinalDefeat
        ? `<div style="text-align:center;padding:18px;background:rgba(231,76,60,0.15);border:2px solid rgba(231,76,60,0.5);border-radius:14px;margin:14px 0">
            <div style="font-size:2.5rem">💀</div>
            <div style="font-size:1.4rem;font-weight:900;color:#ff9b8f">战斗失败！双方均已阵亡。</div>
            <button class="btn" id="coop-back-lobby" style="margin-top:14px;width:200px">← 返回大厅</button>
          </div>`
        : '';

    // 私有交互 banner
    const banner = piActive
      ? `<div style="background:rgba(168,90,255,0.18);border:1.5px solid rgba(168,90,255,0.55);border-radius:10px;padding:8px 14px;text-align:center;color:#d8b8ff;font-weight:700">${pi.label||'对方正在操作…'} — ${pi.who==='host'?'🏠 房主':'🔑 访客'} 操作中，请等待…</div>`
      : '';

    // 共享药水栏（双方共用，从 _coopRun.sharedPotions 读取）
    const sharedPotions = (UI._coopRun && Array.isArray(UI._coopRun.sharedPotions)) ? UI._coopRun.sharedPotions : [null,null,null];
    const sharedPotionBarHtml = `<div style="display:flex;gap:4px;align-items:center">
        <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);font-weight:700">药水（共享）</span>
        ${sharedPotions.map((pid, i) => {
          if (!pid) return `<span style="width:22px;height:22px;border:1px dashed rgba(255,255,255,0.15);border-radius:50%;display:inline-block"></span>`;
          const pdef = Data.potions && Data.potions[pid];
          const emoji = pdef?.emoji || '🧪';
          const name = pdef?.name || pid;
          return `<span title="${name}" style="font-size:1.15rem;cursor:help;background:rgba(127,224,168,0.15);border:1px solid rgba(127,224,168,0.45);border-radius:50%;padding:1px 5px">${emoji}</span>`;
        }).join('')}
      </div>`;

    const sharedGold = UI._coopRun ? (UI._coopRun.gold||0) : 0;
    app.innerHTML = `
      <div class="combat-screen">
        <div class="combat-topbar">
          <div style="display:flex;align-items:center;gap:10px;flex:1;flex-wrap:wrap">
            <span style="font-size:1.1rem;font-weight:800;color:#7fe0a8">🤝 联机合作</span>
            <span style="font-size:0.9rem;color:rgba(255,255,255,0.6)">第 ${coopCs.turn} 回合</span>
            <span style="font-size:0.95rem;color:#f5c518;font-weight:800">💰 ${sharedGold}（共享）</span>
            ${sharedPotionBarHtml}
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:0.9rem;color:#f9ca24;font-weight:700">${phaseLabel}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex:1;justify-content:flex-end">
            <button id="coop-leave" style="font-size:0.85rem;padding:4px 12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;cursor:pointer">← 返回大厅</button>
          </div>
        </div>
        ${banner}
        ${resultHtml}
        <div class="combat-field" style="display:flex;flex-direction:column;gap:12px">
          <div class="enemies-area" id="enemies-area" style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
            ${enemiesHtml}
          </div>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            ${hostBarHtml}
            ${guestBarHtml}
          </div>
        </div>
        <div class="combat-hand-area">
          <div class="combat-controls" style="margin-left:24px;flex-direction:column;align-items:center;gap:8px">
            <div class="pile" id="coop-draw-pile" title="摸牌堆">
              <div class="pile-icon">🃏</div>
              <div class="pile-count">${myDraw.length}</div>
              <div class="pile-label">摸牌堆</div>
            </div>
            <div class="energy-orb" id="energy-orb">${myEnded?0:myEnergy}<div class="energy-label">能量</div></div>
          </div>
          <div class="hand-cards" id="coop-hand-cards" style="min-height:140px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px">
            ${handAreaStatus ? `<div style="color:rgba(255,255,255,0.55);font-size:0.95rem;padding:14px">${handAreaStatus}</div>` : ''}
          </div>
          <div class="combat-controls" style="flex-direction:column;gap:10px;align-items:center">
            <div class="pile discard" id="coop-discard-pile" title="弃牌堆">
              <div class="pile-icon">🗑️</div>
              <div class="pile-count">${myDiscard.length}</div>
              <div class="pile-label">弃牌堆</div>
            </div>
            ${isPlayerPhase ? (
              myEnded
                ? `<button class="btn end-turn-btn" id="coop-end-turn" disabled>✓ 已结束</button>`
                : (myPlayer.hp <= 0
                    ? `<button class="btn end-turn-btn" id="coop-end-turn" disabled>💀 已阵亡</button>`
                    : `<button class="btn end-turn-btn" id="coop-end-turn" ${piActive?'disabled':''}>结束回合</button>`)
            ) : ''}
          </div>
        </div>
        <div id="coop-reward-area"></div>
      </div>`;

    // 用 UI.renderCard 渲染手牌（在 fake-run 上下文内，让 racer 描述正确）
    const handEl = document.getElementById('coop-hand-cards');
    if (handEl && !handAreaStatus) {
      handEl.innerHTML = '';
      const fakeRunPrev = State.current.run;
      // 注入伪 combat 以便 renderCard 的 racer/archer 实时预览能读到 gear/charge
      const myHandUpg = coopCs[myRole + 'HandUpgrades'] || {};
      State.current.run = { character: { id: myPlayer.charId }, relics: [], cardUpgrades: {}, deck: [], mode: 'coop',
        combat: {
          gear: coopCs[myRole+'Gear'] != null ? coopCs[myRole+'Gear'] : 2,
          speed: coopCs[myRole+'Speed'] || 0,
          momentum: coopCs[myRole+'Momentum'] || 0,
          charge: coopCs[myRole+'Charge'] || 0,
          chargeMax: coopCs[myRole+'ChargeMax'] || 5,
          player: { buffs: myPlayer.buffs||{}, debuffs: myPlayer.debuffs||{}, hp: myPlayer.hp, maxHp: myPlayer.maxHp, block: myPlayer.block||0 }
        } };
      try {
        myHand.forEach((cardId, idx) => {
          const def = Data.cards[cardId];
          if (!def) return;
          const lvl = myHandUpg[idx] || 0;
          const cardEl = UI.renderCard(cardId, undefined, lvl, true);
          cardEl.dataset.handIdx = String(idx);
          const canPlay = canAct && myEnergy >= def.cost;
          if (!canPlay) cardEl.classList.add('unplayable');
          cardEl.classList.add('card-draw-anim');
          cardEl.style.animationDelay = `${idx*40}ms`;
          if (canPlay) cardEl.addEventListener('click', () => UI._coopOnCardClick(cardId, cardEl, idx));
          handEl.appendChild(cardEl);
        });
      } finally {
        State.current.run = fakeRunPrev;
      }
    }

    // 战斗奖励界面（胜利后进入 reward 阶段）
    if (isReward) {
      const rewardArea = document.getElementById('coop-reward-area');
      if (rewardArea) UI._coopRenderReward(coopCs, rewardArea);
    }

    // 绑定事件
    document.getElementById('coop-back-lobby')?.addEventListener('click', () => {
      UI._coopCs = null;
      UI._coopGuestCs = null;
      State.go('coop-lobby');
    });
    document.getElementById('coop-leave')?.addEventListener('click', () => {
      if (!confirm('确定退出当前合作 run？')) return;
      UI._coopCs = null;
      UI._coopGuestCs = null;
      State.go('coop-lobby');
    });

    document.getElementById('coop-end-turn')?.addEventListener('click', () => {
      if (!canAct) return;
      if (Net.isHost) {
        const bothEnded = CoopGame.markEnded(UI._coopCs, 'host');
        if (bothEnded) {
          CoopGame.runEnemyTurn(UI._coopCs);
          // 战斗胜利 → 进入 reward 阶段（如果有奖励）
          if (UI._coopCs.phase === 'victory') UI._coopEnterReward(UI._coopCs);
        }
        Net.send({ t: 'coop-state', cs: CoopGame.serialize(UI._coopCs) });
        UI.coopCombat(UI._coopCs);
      } else {
        Net.send({ t: 'coop-end-turn' });
      }
    });

    // 敌人点击：仅当某张需要选目标的卡被选中时才生效
    if (canAct) {
      document.querySelectorAll('.coop-enemy-target').forEach(el => {
        el.addEventListener('click', () => {
          const ti = parseInt(el.dataset.enemyIdx);
          if (UI._coopSelectedCard == null) return;
          UI._coopPlaySelectedCard(ti);
        });
      });
    } else {
      UI._coopSelectedCard = null;
      UI._coopSelectedIdx = null;
    }
  },

  // 选中/打出手牌（自己角度）
  _coopOnCardClick(cardId, cardEl, idx) {
    const def = Data.cards[cardId];
    if (!def) return;
    if (def.needsTarget) {
      UI._coopSelectedCard = cardId;
      UI._coopSelectedIdx = idx;
      document.querySelectorAll('#coop-hand-cards .card').forEach(c => c.classList.remove('selected'));
      cardEl.classList.add('selected');
      document.querySelectorAll('.coop-enemy-target').forEach(e => e.classList.add('targeted'));
    } else {
      UI._coopSendPlayCard(cardId, undefined, idx);
    }
  },
  _coopPlaySelectedCard(targetIdx) {
    const cardId = UI._coopSelectedCard;
    const idx = UI._coopSelectedIdx;
    UI._coopSelectedCard = null;
    UI._coopSelectedIdx = null;
    document.querySelectorAll('.coop-enemy-target').forEach(e => e.classList.remove('targeted'));
    UI._coopSendPlayCard(cardId, targetIdx, idx);
  },
  _coopSendPlayCard(cardId, targetIdx, handIdx) {
    if (Net.isHost && UI._coopCs) {
      const ok = CoopGame.playCard(UI._coopCs, 'host', cardId, targetIdx==null?0:targetIdx, handIdx);
      if (ok) {
        if (UI._coopCs.phase === 'victory') UI._coopEnterReward(UI._coopCs);
        Net.send({ t: 'coop-state', cs: CoopGame.serialize(UI._coopCs) });
        UI.coopCombat(UI._coopCs);
      }
    } else {
      Net.send({ t: 'coop-card', cardId, targetEnemyIndex: targetIdx==null?0:targetIdx, handIndex: handIdx });
    }
  },

  // 战斗胜利 → 进入奖励阶段：双方各自从 3 张候选里选 1 加入自己牌组
  _coopEnterReward(coopCs) {
    // 只有房主端调用（权威）
    if (!Net.isHost) return;
    coopCs.phase = 'reward';
    coopCs.hostRewardCards = UI._coopRollCardChoices(coopCs.host.charId);
    coopCs.guestRewardCards = UI._coopRollCardChoices(coopCs.guest.charId);
    coopCs.hostRewardPicked = null;
    coopCs.guestRewardPicked = null;
    coopCs.rewardGold = 8 + Math.floor(Math.random()*8); // 共享金币池
    coopCs.pendingInteraction = null;
  },
  // 使用 Data.cardsByCharacter 显式映射 + 权重，从该角色奖励池抽 3 张候选
  _coopRollCardChoices(charId) {
    const explicit = (Data.cardsByCharacter && Data.cardsByCharacter[charId]) || [];
    // 起始牌排除（防止重复同张起始牌作为奖励）
    const starterSet = new Set();
    Data.characters.forEach(ch => ch.startingDeck.forEach(id => starterSet.add(id)));
    // 排除通用诅咒/状态牌
    const curseSet = new Set(['wound','slime_goo','curse_card','bleed_card','poison_card']);
    let pool = explicit.filter(id => Data.cards[id] && !starterSet.has(id) && !curseSet.has(id));
    if (pool.length < 3) {
      // 兜底：使用 default rewardPool
      (Data.rewardPool.default||[]).forEach(id => { if (pool.indexOf(id)===-1 && !starterSet.has(id) && !curseSet.has(id)) pool.push(id); });
    }
    // 按稀有度权重抽 3 张不重复
    const weights = (Data._getActWeights ? Data._getActWeights('reward') : null) || { epic:5, rare:15, uncommon:35, common:45 };
    const out = [];
    const used = new Set();
    for (let attempt=0; attempt<30 && out.length<3; attempt++) {
      const remaining = pool.filter(id => !used.has(id));
      if (remaining.length === 0) break;
      const picked = Data._pickByRarity ? Data._pickByRarity(remaining, weights) : remaining[Math.floor(Math.random()*remaining.length)];
      if (picked && !used.has(picked)) { used.add(picked); out.push(picked); }
    }
    // 不够 3 张时用随机补足
    while (out.length < 3 && pool.length > 0) {
      const extra = pool[Math.floor(Math.random()*pool.length)];
      out.push(extra);
    }
    return out;
  },
  // 渲染战斗奖励 UI（双方各自挑卡，挑完才能继续到地图）
  _coopRenderReward(coopCs, container) {
    const myRole = Net.isHost ? 'host' : 'guest';
    const myPicked = coopCs[myRole + 'RewardPicked'];
    const oppPicked = coopCs[(myRole==='host'?'guest':'host') + 'RewardPicked'];
    const myChoices = coopCs[myRole + 'RewardCards'] || [];
    const fakeRunPrev = State.current.run;
    container.innerHTML = `
      <div style="background:rgba(80,200,140,0.1);border:2px solid rgba(127,224,168,0.5);border-radius:14px;padding:16px;margin-top:14px">
        <div style="text-align:center;font-size:1.4rem;font-weight:900;color:#7fe0a8;margin-bottom:6px">🏆 战斗胜利！</div>
        <div style="text-align:center;color:#f5c518;font-size:0.95rem;margin-bottom:14px">+${coopCs.rewardGold||0} 金币 · 选 1 张卡加入你的牌组</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap" id="coop-reward-cards"></div>
        <div style="text-align:center;margin-top:14px;font-size:0.9rem;color:rgba(255,255,255,0.7)">
          ${myPicked ? `<span style="color:#7fe0a8">✓ 你已选 ${Data.cards[myPicked]?.name||myPicked}</span>` : '请选择一张'}
          · ${oppPicked ? `<span style="color:#7fe0a8">✓ 对方已选</span>` : '对方还未选'}
        </div>
        ${myPicked && oppPicked ? `<button class="btn primary" id="coop-reward-continue" style="display:block;margin:14px auto 0;width:240px">前往地图 →</button>` : ''}
      </div>`;
    const cardsRow = container.querySelector('#coop-reward-cards');
    if (cardsRow) {
      State.current.run = { character: { id: coopCs[myRole].charId }, relics: [], cardUpgrades: {}, deck: [], mode: 'coop', combat: null };
      try {
        myChoices.forEach(cid => {
          const el = UI.renderCard(cid);
          el.style.cursor = myPicked ? 'default' : 'pointer';
          if (myPicked && myPicked === cid) el.classList.add('selected');
          if (!myPicked) {
            el.addEventListener('click', () => {
              if (Net.isHost) {
                UI._coopCs.hostRewardPicked = cid;
                // 立刻加入房主牌组
                UI._coopApplyReward(UI._coopCs, 'host');
                Net.send({ t: 'coop-state', cs: CoopGame.serialize(UI._coopCs) });
                UI.coopCombat(UI._coopCs);
              } else {
                Net.send({ t: 'coop-reward-pick', cardId: cid });
              }
            });
          }
          cardsRow.appendChild(el);
        });
      } finally {
        State.current.run = fakeRunPrev;
      }
    }
    container.querySelector('#coop-reward-continue')?.addEventListener('click', () => {
      if (Net.isHost) {
        UI._coopGoToMap(UI._coopCs);
      } else {
        Net.send({ t: 'coop-reward-continue' });
      }
    });
  },
  // 把房主/访客的奖励选择写回 deck
  _coopApplyReward(coopCs, who) {
    const picked = coopCs[who + 'RewardPicked'];
    if (!picked) return;
    const runState = UI._coopRun;
    if (!runState) return;
    const deckKey = who + 'Deck';
    if (!runState[deckKey]) runState[deckKey] = [];
    runState[deckKey].push(picked);
    if (who === 'host') runState.gold = (runState.gold||0) + (coopCs.rewardGold||0);
  },

  // 合作 run：初始化（房主调用）
  // 数据结构：UI._coopRun = { hostChar, guestChar, hostDeck, guestDeck, hostHp, hostMaxHp, guestHp, guestMaxHp,
  //                          map, currentNodeId, act, gold }
  _coopStartRun(hostCharId, guestCharId) {
    const hChar = Data.characters.find(c => c.id === hostCharId);
    const gChar = Data.characters.find(c => c.id === guestCharId);
    const map = MapGen.generate ? MapGen.generate(1) : (MapGen.generateCompass ? MapGen.generateCompass() : {nodes:[],paths:[]});
    const startNode = (map.nodes||[]).find(n => n.floor === 0);
    UI._coopRun = {
      hostCharId, guestCharId,
      hostDeck: [...hChar.startingDeck],
      guestDeck: [...gChar.startingDeck],
      hostUpgrades: {}, // index → level
      guestUpgrades: {},
      hostHp: hChar.hp, hostMaxHp: hChar.maxHp,
      guestHp: gChar.hp, guestMaxHp: gChar.maxHp,
      // 个人遗物（每人独立持有，只对自己生效）
      hostRelics: [], guestRelics: [],
      // 共享药水池（双方共用 6 个槽位）
      sharedPotions: [null,null,null,null,null,null],
      // 共享金币池
      gold: 0,
      map,
      currentNodeId: startNode ? startNode.id : null,
      act: 1,
    };
    return UI._coopRun;
  },

  // 序列化 run（去掉 function）
  _coopSerializeRun() {
    if (!UI._coopRun) return null;
    return JSON.parse(JSON.stringify(UI._coopRun, (k, v) => typeof v === 'function' ? undefined : v));
  },

  // 战斗结束 → 回到地图（房主调用）
  _coopGoToMap(coopCs) {
    if (!Net.isHost) return;
    // 把战斗结束时的 HP 写回 run
    if (coopCs && UI._coopRun) {
      UI._coopRun.hostHp = coopCs.host.hp;
      UI._coopRun.guestHp = coopCs.guest.hp;
    }
    // 检查刚刚是不是 boss 节点 → 推进幕
    const map = UI._coopRun?.map;
    const curId = UI._coopRun?.currentNodeId;
    const curNode = map?.nodes.find(n => n.id === curId);
    if (curNode && curNode.type === 'boss') {
      UI._coopAdvanceAct();
      if (!UI._coopRun) return; // 已通关
    }
    UI._coopCs = null;
    Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
    Net.send({ t: 'coop-screen', screen: 'map' });
    UI.coopMap();
  },

  // 合作地图视图：参考单人 UI.map 简化版
  // 房主可点击下一个可达节点；访客只读
  coopMap() {
    const runState = UI._coopRun || UI._coopRunGuest;
    if (!runState) { State.go('coop-lobby'); return; }
    const app = UI.app();
    const myRole = Net.isHost ? 'host' : 'guest';
    const hChar = Data.characters.find(c => c.id === runState.hostCharId) || {};
    const gChar = Data.characters.find(c => c.id === runState.guestCharId) || {};
    const map = runState.map;
    const curId = runState.currentNodeId;
    const curNode = map.nodes.find(n => n.id === curId);
    // 可达节点：从当前节点出发的 path 终点
    const reachableIds = new Set();
    (map.paths||[]).forEach(p => { if (p.from === curId) reachableIds.add(p.to); });

    // 节点类型 emoji
    const NODE_EMOJI = {start:'🚪', combat:'⚔️', enemy:'⚔️', elite:'💀', boss:'👑', question:'❓', shop:'🛒', rest:'🏘️', treasure:'💎', event:'❓'};
    const nodeColor = (t, reachable) => {
      if (!reachable) return 'rgba(255,255,255,0.25)';
      return { combat:'#ff9090', enemy:'#ff9090', elite:'#ffb060', boss:'#e056fd', question:'#90e0ff', shop:'#ffd060', rest:'#80ff80', event:'#90e0ff', start:'#fff' }[t] || '#fff';
    };

    // 按层分组
    const byFloor = {};
    map.nodes.forEach(n => { (byFloor[n.floor] = byFloor[n.floor] || []).push(n); });
    const floors = Object.keys(byFloor).map(Number).sort((a,b)=>a-b);

    const floorsHtml = floors.map(f => {
      const nodes = byFloor[f];
      return `<div style="display:flex;gap:10px;justify-content:center;margin:6px 0">
        ${nodes.map(n => {
          const reachable = reachableIds.has(n.id);
          const isCur = n.id === curId;
          const done = n.done;
          const color = nodeColor(n.type, reachable || isCur);
          const clickable = Net.isHost && reachable;
          return `<div class="coop-map-node ${clickable?'clickable':''}" data-node-id="${n.id}" style="
            min-width:64px;padding:10px;border-radius:14px;text-align:center;
            background:${isCur?'rgba(127,224,168,0.25)':(reachable?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.02)')};
            border:2px solid ${isCur?'#7fe0a8':(reachable?color:'rgba(255,255,255,0.1)')};
            color:${color};opacity:${done?0.4:1};
            cursor:${clickable?'pointer':'default'};transition:transform 0.15s;
          " onmouseenter="if(${clickable})this.style.transform='scale(1.08)'" onmouseleave="this.style.transform=''">
            <div style="font-size:1.6rem">${NODE_EMOJI[n.type]||'?'}</div>
            <div style="font-size:0.68rem;font-weight:700">${n.type||''}</div>
            ${isCur?'<div style="font-size:0.65rem;color:#7fe0a8;margin-top:2px">当前</div>':''}
          </div>`;
        }).join('')}
      </div>`;
    }).join('');

    app.innerHTML = `
      <div style="min-height:100vh;background:var(--bg,#0c0c1a);padding:18px;font-family:var(--font);color:#fff;max-width:780px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div style="font-size:1.1rem;font-weight:800;color:#7fe0a8">🤝 合作 · 第 ${runState.act||1} 幕</div>
          <div style="font-size:0.92rem">💰 ${runState.gold||0}</div>
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.5)">${Net.isHost?'🏠 房主（操控）':'🔑 访客（只读）'}</div>
        </div>
        <div style="display:flex;gap:14px;justify-content:center;margin-bottom:14px">
          <div style="padding:10px 14px;background:rgba(127,224,168,0.1);border:1.5px solid rgba(127,224,168,0.5);border-radius:12px;text-align:center;flex:1;max-width:220px">
            <div style="font-size:1.4rem">${hChar.emoji||'?'} 🏠 房主</div>
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.65);margin:3px 0">${hChar.name||''}</div>
            <div>${UI.renderHpBar(runState.hostHp, runState.hostMaxHp, '160px')}</div>
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.55);margin-top:4px">${runState.hostHp}/${runState.hostMaxHp} HP · 牌组 ${(runState.hostDeck||[]).length}</div>
          </div>
          <div style="padding:10px 14px;background:rgba(80,160,255,0.1);border:1.5px solid rgba(80,160,255,0.5);border-radius:12px;text-align:center;flex:1;max-width:220px">
            <div style="font-size:1.4rem">${gChar.emoji||'?'} 🔑 访客</div>
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.65);margin:3px 0">${gChar.name||''}</div>
            <div>${UI.renderHpBar(runState.guestHp, runState.guestMaxHp, '160px')}</div>
            <div style="font-size:0.78rem;color:rgba(255,255,255,0.55);margin-top:4px">${runState.guestHp}/${runState.guestMaxHp} HP · 牌组 ${(runState.guestDeck||[]).length}</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:14px;max-height:60vh;overflow-y:auto">
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.55);text-align:center;margin-bottom:8px">${Net.isHost?'点击高亮节点前进':'等待房主选择节点…'}</div>
          ${floorsHtml}
        </div>
        <div style="text-align:center;margin-top:12px">
          <button class="btn" id="coop-map-leave" style="width:200px">← 退出 run</button>
        </div>
      </div>`;

    document.querySelectorAll('.coop-map-node.clickable').forEach(el => {
      el.addEventListener('click', () => {
        const nid = parseInt(el.dataset.nodeId);
        UI._coopEnterNode(nid);
      });
    });
    document.getElementById('coop-map-leave').addEventListener('click', () => {
      if (!confirm('确定退出当前合作 run？')) return;
      UI._coopRun = null; UI._coopRunGuest = null; UI._coopCs = null;
      State.go('coop-lobby');
    });
  },

  // 房主进入节点：根据类型分发
  _coopEnterNode(nodeId) {
    if (!Net.isHost || !UI._coopRun) return;
    const map = UI._coopRun.map;
    const node = map.nodes.find(n => n.id === nodeId);
    if (!node) return;
    // 标记当前节点
    if (UI._coopRun.currentNodeId != null) {
      const prev = map.nodes.find(n => n.id === UI._coopRun.currentNodeId);
      if (prev) prev.done = true;
    }
    UI._coopRun.currentNodeId = nodeId;

    if (node.type === 'combat' || node.type === 'enemy' || node.type === 'elite' || node.type === 'boss') {
      // 启动战斗
      let enemyIds;
      // 默认敌人池（兜底，保证至少能跑）
      const easyIds = ['louse', 'jawworm', 'cultist', 'redslime', 'greenslime'].filter(id => Data.enemies[id]);
      const eliteIds = ['jawworm', 'sentry', 'gremlin_nob'].filter(id => Data.enemies[id]);
      const bossIds = ['boss_sky', 'slime_boss', 'hexa'].filter(id => Data.enemies[id]);
      if (node.type === 'boss') enemyIds = bossIds.length ? [bossIds[0]] : [easyIds[0]];
      else if (node.type === 'elite') enemyIds = eliteIds.length ? [eliteIds[Math.floor(Math.random()*eliteIds.length)]] : [easyIds[0]];
      else enemyIds = [easyIds[Math.floor(Math.random()*Math.max(1,easyIds.length))]];
      // 尝试用现有的敌人选择逻辑（如果存在）
      try {
        if (Data.pickEnemyIds) {
          const got = Data.pickEnemyIds(UI._coopRun.act||1, node.type);
          if (Array.isArray(got) && got.length > 0) enemyIds = got;
        }
      } catch(e){}
      // 兜底：确保 ids 存在于 Data.enemies
      enemyIds = enemyIds.filter(id => Data.enemies[id]);
      if (enemyIds.length === 0) enemyIds = Object.keys(Data.enemies).slice(0, 1);

      const coopCs = CoopGame.init(UI._coopRun.hostCharId, UI._coopRun.guestCharId, enemyIds, {
        hostDeck: UI._coopRun.hostDeck,
        guestDeck: UI._coopRun.guestDeck,
        hostHp: UI._coopRun.hostHp, hostMaxHp: UI._coopRun.hostMaxHp,
        guestHp: UI._coopRun.guestHp, guestMaxHp: UI._coopRun.guestMaxHp,
        hostUpgrades: UI._coopRun.hostUpgrades || {},
        guestUpgrades: UI._coopRun.guestUpgrades || {},
      });
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-start', hostChar: UI._coopRun.hostCharId, guestChar: UI._coopRun.guestCharId, enemyIds });
      setTimeout(() => {
        Net.send({ t: 'coop-state', cs: CoopGame.serialize(coopCs) });
        Net.send({ t: 'coop-screen', screen: 'combat' });
        UI.coopCombat(coopCs);
      }, 80);
    } else if (node.type === 'rest') {
      // 休息篝火：双方各自选治疗 / 升牌
      UI._coopRun.restChoices = { host: null, guest: null };
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'coop-rest' });
      State.current.screen = 'coop-rest';
      UI.coopRest();
    } else if (node.type === 'shop') {
      // 商店：生成库存（按双方角色），共享金币
      UI._coopRun.shopInv = UI._coopGenShopInventory();
      UI._coopRun.shopSold = {};   // idx → 'host'|'guest'
      UI._coopRun.shopLeft = { host:false, guest:false };
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'coop-shop' });
      State.current.screen = 'coop-shop';
      UI.coopShop();
    } else if (node.type === 'question' || node.type === 'event') {
      // 问号事件：房主操作，访客只读
      const pool = (Data.questionEvents || []).filter(e => {
        if (e.relicId && ((UI._coopRun.hostRelics||[]).includes(e.relicId) || (UI._coopRun.guestRelics||[]).includes(e.relicId))) return false;
        return true;
      });
      const evt = pool.length ? pool[Math.floor(Math.random()*pool.length)] : (Data.questionEvents||[])[0];
      UI._coopRun.questionEventId = evt ? evt.id : null;
      UI._coopRun.questionResult = null;
      UI._coopRun.questionResolvedBy = null;
      UI._coopRun.questionVotes = { host: null, guest: null };
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'coop-question' });
      State.current.screen = 'coop-question';
      UI.coopQuestion();
    } else {
      // 未知类型兜底：直接小回血走人
      if (UI._coopRun) {
        UI._coopRun.hostHp = Math.min(UI._coopRun.hostMaxHp, UI._coopRun.hostHp + 5);
        UI._coopRun.guestHp = Math.min(UI._coopRun.guestMaxHp, UI._coopRun.guestHp + 5);
      }
      const stillReachable = (map.paths||[]).some(p => p.from === nodeId);
      if (!stillReachable) UI._coopAdvanceAct();
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'map' });
      UI.coopMap();
    }
  },

  // 商店库存生成：双方角色各 3 张（按单人 getShopInventory 但分别按角色）
  _coopGenShopInventory() {
    const result = [];
    const _genFor = (charId, role) => {
      const out = [];
      const prevRun = State.current.run;
      State.current.run = { character: { id: charId } };
      try {
        const all = (Data.getShopInventory && Data.getShopInventory([])) || [];
        for (const item of all) {
          if (out.length >= 3) break;
          if (item && item.id) out.push({ id: item.id, price: item.price, role });
        }
      } catch(e) {}
      finally { State.current.run = prevRun; }
      return out;
    };
    const hostItems = _genFor(UI._coopRun.hostCharId, 'host');
    const guestItems = _genFor(UI._coopRun.guestCharId, 'guest');
    return [...hostItems, ...guestItems];
  },

  // ── 合作 · 休息篝火 ──
  coopRest() {
    const run = UI._coopRun || UI._coopRunGuest;
    if (!run) { State.go('coop-lobby'); return; }
    if (!run.restChoices) run.restChoices = { host:null, guest:null };
    const app = UI.app();
    const myRole = Net.isHost ? 'host' : 'guest';
    const oppRole = myRole === 'host' ? 'guest' : 'host';
    const myDone = !!run.restChoices[myRole];
    const oppDone = !!run.restChoices[oppRole];
    const hChar = Data.characters.find(c => c.id === run.hostCharId) || {};
    const gChar = Data.characters.find(c => c.id === run.guestCharId) || {};
    const myMaxHp = myRole==='host'?run.hostMaxHp:run.guestMaxHp;
    const myHp = myRole==='host'?run.hostHp:run.guestHp;
    const myDeck = myRole==='host'?(run.hostDeck||[]):(run.guestDeck||[]);
    const healAmt = Math.floor(myMaxHp * 0.30);
    app.innerHTML = `
      <div style="min-height:100vh;background:var(--bg,#0c0c1a);padding:24px;color:#fff;font-family:var(--font);max-width:760px;margin:0 auto;">
        <div style="text-align:center;font-size:3rem">🏘️</div>
        <h2 style="text-align:center;color:#7fe0a8;margin:6px 0 4px">联机 · 休息篝火</h2>
        <div style="text-align:center;color:rgba(255,255,255,0.55);font-size:0.9rem;margin-bottom:18px">双方各自选择，不互相干扰；都做完后进入下一个节点。</div>
        <div style="display:flex;gap:14px;justify-content:center;margin-bottom:16px">
          <div style="flex:1;max-width:260px;padding:10px;background:rgba(127,224,168,0.08);border:1.5px solid rgba(127,224,168,0.45);border-radius:12px;text-align:center">
            <div style="font-size:1.4rem">${hChar.emoji||'?'} 🏠 房主</div>
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.6)">${run.hostHp}/${run.hostMaxHp} HP · 牌组 ${(run.hostDeck||[]).length}</div>
            <div style="font-size:0.85rem;margin-top:6px;color:${run.restChoices.host?'#7fe0a8':'rgba(255,255,255,0.5)'}">${run.restChoices.host?('✓ 已完成：'+UI._coopRestLabel(run.restChoices.host)):'未选择'}</div>
          </div>
          <div style="flex:1;max-width:260px;padding:10px;background:rgba(80,160,255,0.08);border:1.5px solid rgba(80,160,255,0.45);border-radius:12px;text-align:center">
            <div style="font-size:1.4rem">${gChar.emoji||'?'} 🔑 访客</div>
            <div style="font-size:0.85rem;color:rgba(255,255,255,0.6)">${run.guestHp}/${run.guestMaxHp} HP · 牌组 ${(run.guestDeck||[]).length}</div>
            <div style="font-size:0.85rem;margin-top:6px;color:${run.restChoices.guest?'#7fe0a8':'rgba(255,255,255,0.5)'}">${run.restChoices.guest?('✓ 已完成：'+UI._coopRestLabel(run.restChoices.guest)):'未选择'}</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:14px;text-align:center">
          ${myDone
            ? `<div style="font-size:0.95rem;color:#7fe0a8;margin-bottom:10px">✓ 你已选择：${UI._coopRestLabel(run.restChoices[myRole])}</div><div style="color:rgba(255,255,255,0.6);font-size:0.9rem">${oppDone?'双方都已完成':'等待对方选择…'}</div>`
            : `<div style="margin-bottom:10px;color:#f5c518;font-weight:700">你的回合：选 1 项</div>
               <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
                 <button class="btn primary" id="coop-rest-heal" ${myHp>=myMaxHp?'disabled':''}>❤️ 治疗<br><small>恢复 ${healAmt} HP</small></button>
                 <button class="btn" id="coop-rest-learn" ${myDeck.length===0?'disabled':''}>📖 升级一张牌</button>
                 <button class="btn" id="coop-rest-skip">👣 跳过</button>
               </div>`}
        </div>
        ${(myDone && oppDone && Net.isHost) ? '<div style="text-align:center;margin-top:14px"><button class="btn primary" id="coop-rest-continue" style="width:240px">前往地图 →</button></div>' : ''}
      </div>`;
    document.getElementById('coop-rest-heal')?.addEventListener('click', () => UI._coopSubmitRest({ type:'heal' }));
    document.getElementById('coop-rest-skip')?.addEventListener('click', () => UI._coopSubmitRest({ type:'skip' }));
    document.getElementById('coop-rest-learn')?.addEventListener('click', () => {
      UI._coopShowLearnOverlay(myRole, myDeck, choice => {
        UI._coopSubmitRest({ type:'learn', deckIndex: choice });
      });
    });
    document.getElementById('coop-rest-continue')?.addEventListener('click', () => {
      if (!Net.isHost) return;
      // 推进到地图
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'map' });
      State.current.screen = 'coop-map';
      UI.coopMap();
    });
  },
  _coopRestLabel(c) {
    if (!c) return '';
    if (c.type==='heal') return '治疗';
    if (c.type==='learn') return '升级';
    if (c.type==='skip') return '跳过';
    return c.type;
  },
  _coopShowLearnOverlay(role, deck, onPick) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
    const panel = document.createElement('div');
    panel.style.cssText = 'background:#16213e;border:2px solid #e2b96a;border-radius:14px;padding:18px;max-width:85vw;max-height:80vh;overflow:auto';
    panel.innerHTML = '<h3 style="margin:0 0 12px;text-align:center;color:#e2b96a">📖 选择一张牌升级</h3>';
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center';
    // 用 fake-run 上下文渲染卡牌（让 renderCard 不报错）
    const prevRun = State.current.run;
    State.current.run = { character: { id: role==='host'?UI._coopRun?.hostCharId:UI._coopRun?.guestCharId }, deck:[], cardUpgrades:{}, relics:[], mode:'coop', combat:null };
    try {
      deck.forEach((cardId, i) => {
        const def = Data.cards[cardId];
        if (!def || def.cost === 99) return;
        const wrap = document.createElement('div');
        wrap.style.cssText = 'cursor:pointer';
        try { wrap.appendChild(UI.renderCard(cardId)); } catch(e) {
          wrap.textContent = cardId;
        }
        wrap.addEventListener('click', () => {
          overlay.remove();
          State.current.run = prevRun;
          onPick(i);
        });
        grid.appendChild(wrap);
      });
    } finally { State.current.run = prevRun; }
    panel.appendChild(grid);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn';
    closeBtn.style.cssText = 'margin-top:12px;width:100%';
    closeBtn.textContent = '取消';
    closeBtn.onclick = () => overlay.remove();
    panel.appendChild(closeBtn);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  },
  _coopSubmitRest(choice) {
    const myRole = Net.isHost ? 'host' : 'guest';
    if (Net.isHost) {
      UI._coopApplyRest('host', choice);
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      UI.coopRest();
    } else {
      Net.send({ t: 'coop-rest-choice', choice });
    }
  },
  _coopApplyRest(role, choice) {
    const run = UI._coopRun;
    if (!run || !run.restChoices) return;
    if (run.restChoices[role]) return; // 已选过
    run.restChoices[role] = choice;
    if (choice.type === 'heal') {
      const maxKey = role+'MaxHp', hpKey = role+'Hp';
      const heal = Math.floor(run[maxKey] * 0.30);
      run[hpKey] = Math.min(run[maxKey], run[hpKey] + heal);
    } else if (choice.type === 'learn' && typeof choice.deckIndex === 'number') {
      const upKey = role+'Upgrades';
      run[upKey] = run[upKey] || {};
      run[upKey][choice.deckIndex] = (run[upKey][choice.deckIndex] || 0) + 1;
    }
  },

  // ── 合作 · 商店 ──
  coopShop() {
    const run = UI._coopRun || UI._coopRunGuest;
    if (!run) { State.go('coop-lobby'); return; }
    const app = UI.app();
    app.style.overflowY = 'auto';
    const myRole = Net.isHost ? 'host' : 'guest';
    const oppRole = myRole==='host'?'guest':'host';
    const inv = run.shopInv || [];
    const sold = run.shopSold || {};
    const left = run.shopLeft || { host:false, guest:false };
    const hChar = Data.characters.find(c => c.id === run.hostCharId) || {};
    const gChar = Data.characters.find(c => c.id === run.guestCharId) || {};

    let cardsHtml = '<div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center"></div>';
    app.innerHTML = `
      <div style="min-height:100vh;background:var(--bg,#0c0c1a);padding:18px;color:#fff;font-family:var(--font);max-width:920px;margin:0 auto;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:1.4rem;font-weight:800;color:#ffd060">🏪 好奇小卖部（联机）</div>
          <div style="font-size:1.05rem;color:#f5c518;font-weight:800">💰 ${run.gold||0}（共享）</div>
        </div>
        <div style="font-size:0.9rem;color:rgba(255,255,255,0.6);margin-bottom:14px">每张卡只能由对应角色购买，金币从共享池扣。两人都点「离开」才能进入下一个节点。</div>
        <div id="coop-shop-cards" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-bottom:14px"></div>
        <div style="display:flex;gap:14px;justify-content:center;margin-top:8px;flex-wrap:wrap">
          <div style="padding:8px 14px;background:rgba(127,224,168,0.08);border:1.5px solid rgba(127,224,168,0.45);border-radius:12px;text-align:center">
            <div>${hChar.emoji||'?'} 🏠 房主 · 牌组 ${(run.hostDeck||[]).length}</div>
            <div style="color:${left.host?'#7fe0a8':'rgba(255,255,255,0.55)'};font-size:0.88rem">${left.host?'✓ 已离开':'购物中…'}</div>
          </div>
          <div style="padding:8px 14px;background:rgba(80,160,255,0.08);border:1.5px solid rgba(80,160,255,0.45);border-radius:12px;text-align:center">
            <div>${gChar.emoji||'?'} 🔑 访客 · 牌组 ${(run.guestDeck||[]).length}</div>
            <div style="color:${left.guest?'#7fe0a8':'rgba(255,255,255,0.55)'};font-size:0.88rem">${left.guest?'✓ 已离开':'购物中…'}</div>
          </div>
        </div>
        <div style="text-align:center;margin-top:16px">
          ${left[myRole] ? '<div style="color:#7fe0a8">✓ 你已离开，等待对方…</div>' : `<button class="btn" id="coop-shop-leave" style="width:200px">👣 离开商店</button>`}
          ${(left.host && left.guest && Net.isHost) ? '<button class="btn primary" id="coop-shop-continue" style="margin-left:10px;width:200px">前往地图 →</button>' : ''}
        </div>
      </div>`;

    const grid = document.getElementById('coop-shop-cards');
    const prevRun = State.current.run;
    inv.forEach((item, idx) => {
      const isSold = !!sold[idx];
      const buyerRole = item.role; // 只能 host 或 guest 角色对应购买
      const canBuy = !isSold && (buyerRole === myRole) && (run.gold||0) >= item.price;
      const isMine = buyerRole === myRole;
      const wrap = document.createElement('div');
      wrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;opacity:${isSold?'0.4':'1'};border:2px solid ${isMine?(canBuy?'#7fe0a8':'rgba(127,224,168,0.3)'):'rgba(255,255,255,0.15)'};border-radius:12px;padding:8px;background:rgba(255,255,255,0.03);`;
      // 渲染卡牌（用对应角色 fake-run 上下文）
      State.current.run = { character: { id: buyerRole==='host'?run.hostCharId:run.guestCharId }, deck:[], cardUpgrades:{}, relics:[], mode:'coop', combat:null };
      try {
        const cardEl = UI.renderCard(item.id);
        wrap.appendChild(cardEl);
      } catch(e) {
        const fb = document.createElement('div'); fb.textContent = item.id; wrap.appendChild(fb);
      } finally { State.current.run = prevRun; }
      const label = document.createElement('div');
      label.style.cssText = `font-size:0.75rem;font-weight:700;color:${buyerRole==='host'?'#7fe0a8':'#5dade2'}`;
      label.textContent = buyerRole==='host'?'🏠 房主专属':'🔑 访客专属';
      wrap.appendChild(label);
      const price = document.createElement('div');
      price.style.cssText = `font-weight:800;color:${isSold?'rgba(255,255,255,0.5)':((run.gold||0)>=item.price?'#f5c518':'#ff7d7d')}`;
      price.textContent = isSold ? `✅ 已被 ${sold[idx]==='host'?'🏠':'🔑'} 买走` : `💰 ${item.price}`;
      wrap.appendChild(price);
      if (canBuy) {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.style.cssText = 'padding:4px 14px;font-size:0.88rem';
        btn.textContent = '购买';
        btn.onclick = () => UI._coopShopBuy(idx);
        wrap.appendChild(btn);
      }
      grid.appendChild(wrap);
    });

    document.getElementById('coop-shop-leave')?.addEventListener('click', () => UI._coopShopLeave());
    document.getElementById('coop-shop-continue')?.addEventListener('click', () => {
      if (!Net.isHost) return;
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'map' });
      State.current.screen = 'coop-map';
      UI.coopMap();
    });
  },
  _coopShopBuy(idx) {
    const myRole = Net.isHost ? 'host' : 'guest';
    if (Net.isHost) {
      UI._coopApplyShopBuy('host', idx);
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      UI.coopShop();
    } else {
      Net.send({ t: 'coop-shop-buy', idx });
    }
  },
  _coopApplyShopBuy(role, idx) {
    const run = UI._coopRun;
    if (!run) return;
    const item = (run.shopInv||[])[idx];
    if (!item || (run.shopSold||{})[idx]) return;
    if (item.role !== role) return;
    if ((run.gold||0) < item.price) return;
    run.gold -= item.price;
    run.shopSold = run.shopSold || {};
    run.shopSold[idx] = role;
    if (role === 'host') (run.hostDeck = run.hostDeck || []).push(item.id);
    else (run.guestDeck = run.guestDeck || []).push(item.id);
  },
  _coopShopLeave() {
    const myRole = Net.isHost ? 'host' : 'guest';
    if (Net.isHost) {
      UI._coopApplyShopLeave('host');
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      UI.coopShop();
    } else {
      Net.send({ t: 'coop-shop-leave' });
    }
  },
  _coopApplyShopLeave(role) {
    const run = UI._coopRun;
    if (!run) return;
    run.shopLeft = run.shopLeft || { host:false, guest:false };
    run.shopLeft[role] = true;
  },

  // ── 合作 · 问号事件 ──
  coopQuestion() {
    const run = UI._coopRun || UI._coopRunGuest;
    if (!run) { State.go('coop-lobby'); return; }
    const app = UI.app();
    const evt = (Data.questionEvents || []).find(e => e.id === run.questionEventId) || (Data.questionEvents||[])[0];
    if (!evt) { State.go('coop-map'); return; }
    const isHost = Net.isHost;
    const myRole = isHost ? 'host' : 'guest';
    const hChar = Data.characters.find(c => c.id === run.hostCharId) || {};
    const gChar = Data.characters.find(c => c.id === run.guestCharId) || {};
    const result = run.questionResult;
    const votes = run.questionVotes || { host: null, guest: null };
    const myVote = votes[myRole];
    const oppVote = votes[myRole==='host'?'guest':'host'];

    const optsHtml = (evt.options || []).map((opt, i) => {
      const picked = myVote === i;
      const oppPicked = oppVote === i;
      const disabled = !!result; // 出结果后不能再投
      const bg = picked ? '#1f5f3a' : '#0f3460';
      const border = picked ? '#7fe0a8' : '#e2b96a';
      const color = picked ? '#a9f0c5' : '#e2b96a';
      return `<button data-opt-i="${i}" class="coop-q-opt" ${disabled?'disabled':''} style="width:100%;padding:12px;background:${bg};color:${color};border:2px solid ${border};border-radius:8px;font-size:1rem;cursor:${disabled?'default':'pointer'};opacity:${disabled?0.65:1};margin-bottom:8px;text-align:left;position:relative;">
        <div style="font-weight:700">${opt.label}</div>
        ${opt.tooltip?`<div style="font-size:0.8rem;color:rgba(226,185,106,0.7);margin-top:4px;white-space:pre-line">${opt.tooltip}</div>`:''}
        <div style="position:absolute;right:8px;top:8px;display:flex;gap:4px;font-size:0.75rem;font-weight:800">
          ${picked?'<span style="color:#7fe0a8">你 ✓</span>':''}
          ${oppPicked?`<span style="color:#5dade2">${myRole==='host'?'🔑':'🏠'} ✓</span>`:''}
        </div>
      </button>`;
    }).join('');

    const resultHtml = result
      ? `<div style="margin-top:14px;padding:12px;border-radius:10px;background:${result.type==='good'?'#1a4a1a':'#4a1a1a'};border:1.5px solid ${result.type==='good'?'#4caf50':'#f44336'};color:${result.type==='good'?'#81c784':'#ef9a9a'};text-align:center">${result.msg}</div>`
      : '';
    const contBtn = (result && isHost) ? '<button id="coop-q-continue" class="btn primary" style="margin-top:14px;width:240px">继续旅程 →</button>' : '';

    // 状态提示
    const isMapChanging = UI._COOP_MAP_CHANGING_EVENTS && UI._COOP_MAP_CHANGING_EVENTS.has(evt.id);
    let statusLine;
    if (result) statusLine = '';
    else if (myVote == null) {
      statusLine = isMapChanging
        ? '⚠️ 本事件涉及地图进度，需要<b>双方都同意才能执行风险项</b>，否则走"安全选项"'
        : '各人独立选择，互不干扰（你的选择只影响你自己）';
    }
    else if (oppVote == null) statusLine = `你已选 #${myVote+1}，等待对方选择…`;
    else statusLine = '双方均已投票，结算中…';

    app.innerHTML = `
      <div style="min-height:100vh;background:#1a1a2e;padding:24px;color:#fff;font-family:var(--font)">
        <div style="max-width:520px;margin:0 auto;background:#16213e;border:2px solid #e2b96a;border-radius:16px;padding:24px">
          <div style="text-align:center;font-size:2.4rem;margin-bottom:8px">${evt.img?`<img src="${evt.img}" style="width:100px;height:100px;object-fit:contain;border-radius:12px">`:'❓'}</div>
          <h2 style="color:#e2b96a;text-align:center;margin:0 0 12px">${evt.title}</h2>
          <p style="color:#ccc;line-height:1.7;margin:0 0 16px;text-align:center">${evt.desc}</p>
          <div style="display:flex;gap:10px;justify-content:center;margin-bottom:14px;font-size:0.85rem">
            <span>${hChar.emoji||'?'} 🏠 ${run.hostHp}/${run.hostMaxHp}</span>
            <span style="color:#f5c518">💰 ${run.gold||0}（共享）</span>
            <span>${gChar.emoji||'?'} 🔑 ${run.guestHp}/${run.guestMaxHp}</span>
          </div>
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.6);text-align:center;margin-bottom:10px">${statusLine}</div>
          ${optsHtml}
          ${resultHtml}
          <div style="text-align:center">${contBtn}</div>
        </div>
      </div>`;

    document.querySelectorAll('.coop-q-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (result) return;
        const i = parseInt(btn.dataset.optI);
        UI._coopVoteQuestion(i);
      });
    });
    document.getElementById('coop-q-continue')?.addEventListener('click', () => {
      if (!Net.isHost) return;
      UI._coopRun.questionEventId = null;
      UI._coopRun.questionResult = null;
      UI._coopRun.questionVotes = { host: null, guest: null };
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      Net.send({ t: 'coop-screen', screen: 'map' });
      State.current.screen = 'coop-map';
      UI.coopMap();
    });
  },

  // 投票：双方各自投，房主端聚合 → 若两人投同一项执行该项；不同则默认走 index 最大的项（"安全选项"）
  _coopVoteQuestion(optIdx) {
    const myRole = Net.isHost ? 'host' : 'guest';
    if (Net.isHost) {
      const run = UI._coopRun;
      if (!run) return;
      run.questionVotes = run.questionVotes || { host: null, guest: null };
      run.questionVotes.host = optIdx;
      UI._coopTryResolveQuestion();
      Net.send({ t: 'coop-run-state', run: UI._coopSerializeRun() });
      UI.coopQuestion();
    } else {
      Net.send({ t: 'coop-question-vote', optIdx });
    }
  },

  // 改地图状态的事件 id 集合（这类事件必须双方同意才执行风险项，否则走安全项）
  // 因为如果只有一人跳关、地图进度就会错位
  _COOP_MAP_CHANGING_EVENTS: new Set(['datou_drive']),

  // 房主端尝试聚合投票，若双方都投了则执行
  // 规则：
  //   - 大头跳关等改地图事件：双方投同项才执行；不同则走 index 大的"安全"项
  //   - 其他事件：双方各自独立结算自己的选项（影响各自的 hp/relics/deck），共享资源（金币/药水）顺序应用
  _coopTryResolveQuestion() {
    if (!Net.isHost) return;
    const run = UI._coopRun;
    if (!run) return;
    const v = run.questionVotes || {};
    if (v.host == null || v.guest == null) return;
    if (run.questionResult) return; // 已结算过
    const evt = (Data.questionEvents || []).find(e => e.id === run.questionEventId);
    if (!evt || !evt.options) return;

    const isMapChanging = UI._COOP_MAP_CHANGING_EVENTS.has(evt.id);

    let result;
    if (isMapChanging) {
      // 改地图事件：必须双方同意才能执行风险项
      let chosenIdx;
      if (v.host === v.guest) chosenIdx = v.host;
      else chosenIdx = Math.max(v.host, v.guest); // 投不同 → 走"安全"选项
      if (!evt.options[chosenIdx]) chosenIdx = 0;
      const shim = UI._coopMakeQuestionShim(run);
      let r;
      try { r = evt.options[chosenIdx].resolve(shim, UI); }
      catch(e) { console.warn(e); r = { type:'bad', msg:'事件解析失败（已跳过）' }; }
      if (r === null) r = { type:'good', msg:'事件已完成' };
      UI._coopApplyQuestionShim(run, shim);
      if (v.host !== v.guest) {
        r = { ...r, msg: `🤝 双方投票不一致（${v.host+1} vs ${v.guest+1}）→ 走"${evt.options[chosenIdx].label}"\n` + r.msg };
      }
      result = r;
    } else {
      // 普通事件：双方各自独立结算
      // host shim：用 host 个人字段 + 共享金币/药水
      const hostShim = UI._coopMakeHostShim(run);
      let hostRes;
      try { hostRes = evt.options[v.host].resolve(hostShim, UI); }
      catch(e) { console.warn('host resolve', e); hostRes = { type:'bad', msg:'解析失败' }; }
      if (hostRes === null) hostRes = { type:'good', msg:'已完成' };
      // 把 host shim 的变化写回（共享字段会同步进 run.gold / run.sharedPotions）
      UI._coopApplyHostShim(run, hostShim);

      // guest shim：使用更新后的共享资源（gold/potions），加 guest 个人字段
      const guestShim = UI._coopMakeGuestShim(run);
      let guestRes;
      try { guestRes = evt.options[v.guest].resolve(guestShim, UI); }
      catch(e) { console.warn('guest resolve', e); guestRes = { type:'bad', msg:'解析失败' }; }
      if (guestRes === null) guestRes = { type:'good', msg:'已完成' };
      UI._coopApplyGuestShim(run, guestShim);

      // 合并结果文本：双方独立显示
      const hostOptName = evt.options[v.host].label;
      const guestOptName = evt.options[v.guest].label;
      const same = v.host === v.guest;
      const mergedMsg = same
        ? `🤝 双方都选了「${hostOptName}」\n\n🏠 ${hostRes.msg}\n🔑 ${guestRes.msg}`
        : `🤝 双方独立选择：\n🏠 选「${hostOptName}」→ ${hostRes.msg}\n🔑 选「${guestOptName}」→ ${guestRes.msg}`;
      // type：双方都 good 才 good，否则 mixed
      const type = (hostRes.type === 'good' && guestRes.type === 'good') ? 'good' : 'bad';
      result = { type, msg: mergedMsg };
    }

    run.questionResult = result;
    run.questionResolvedBy = 'consensus';
  },

  // host 专属 shim（仅用于非改地图事件的独立结算）
  _coopMakeHostShim(run) {
    return {
      character: { id: run.hostCharId, hp: run.hostHp, maxHp: run.hostMaxHp },
      gold: run.gold || 0,
      relics: [...(run.hostRelics||[])],
      potions: [...(run.sharedPotions||[null,null,null,null,null,null])],
      deck: [...(run.hostDeck||[])],
      cardUpgrades: {},
      // map 字段在地图事件 shim 才提供
    };
  },
  _coopApplyHostShim(run, shim) {
    run.hostMaxHp = shim.character.maxHp;
    run.hostHp = Math.max(0, Math.min(run.hostMaxHp, shim.character.hp));
    run.gold = Math.max(0, shim.gold);
    run.hostRelics = shim.relics || [];
    const np = shim.potions || [];
    run.sharedPotions = [0,1,2,3,4,5].map(i => np[i] || null);
    run.hostDeck = shim.deck || [];
  },
  _coopMakeGuestShim(run) {
    return {
      character: { id: run.guestCharId, hp: run.guestHp, maxHp: run.guestMaxHp },
      gold: run.gold || 0,
      relics: [...(run.guestRelics||[])],
      potions: [...(run.sharedPotions||[null,null,null,null,null,null])],
      deck: [...(run.guestDeck||[])],
      cardUpgrades: {},
    };
  },
  _coopApplyGuestShim(run, shim) {
    run.guestMaxHp = shim.character.maxHp;
    run.guestHp = Math.max(0, Math.min(run.guestMaxHp, shim.character.hp));
    run.gold = Math.max(0, shim.gold);
    run.guestRelics = shim.relics || [];
    const np = shim.potions || [];
    run.sharedPotions = [0,1,2,3,4,5].map(i => np[i] || null);
    run.guestDeck = shim.deck || [];
  },
  // 构造一个伪 run 对象（character / gold / relics / potions / deck），事件执行后把变化回写
  // 改地图事件用的 shim：包含 map / currentNodeId / travelEdges（这些是引用，会被直接修改）
  _coopMakeQuestionShim(run) {
    return {
      character: {
        id: run.hostCharId,
        hp: run.hostHp,
        maxHp: run.hostMaxHp,
      },
      gold: run.gold || 0,
      relics: [...(run.hostRelics||[])],
      potions: [...(run.sharedPotions||[null,null,null,null,null,null])],
      deck: [...(run.hostDeck||[])],
      cardUpgrades: {},
      // 地图引用 — 跳关事件会写 currentNodeId / travelEdges / done
      map: run.map,
      currentNodeId: run.currentNodeId,
      travelEdges: run.travelEdges,
    };
  },
  _coopApplyQuestionShim(run, shim) {
    run.hostHp = Math.max(0, Math.min(shim.character.maxHp, shim.character.hp));
    run.hostMaxHp = shim.character.maxHp;
    if (run.hostHp > run.hostMaxHp) run.hostHp = run.hostMaxHp;
    run.gold = Math.max(0, shim.gold);
    run.hostRelics = shim.relics || [];
    const np = shim.potions || [];
    run.sharedPotions = [0,1,2,3,4,5].map(i => np[i] || null);
    run.hostDeck = shim.deck || [];
    // 地图状态：跳关 / 移动会通过 shim 直接修改了 run.map 的节点（done 标记），
    // 但 currentNodeId / travelEdges 是 shim 上的值，需要写回 run
    if (shim.currentNodeId != null) run.currentNodeId = shim.currentNodeId;
    if (shim.travelEdges) run.travelEdges = shim.travelEdges;
  },

  // 多幕推进（Boss 后自动）
  _coopAdvanceAct() {
    if (!UI._coopRun) return;
    if ((UI._coopRun.act||1) >= 3) {
      // 全部 3 幕通关
      alert('🎉 三幕通关！恭喜！');
      UI._coopRun = null; UI._coopRunGuest = null; UI._coopCs = null;
      State.go('coop-lobby');
      return;
    }
    UI._coopRun.act = (UI._coopRun.act||1) + 1;
    const newMap = MapGen.generate ? MapGen.generate(UI._coopRun.act) : (MapGen.generateCompass ? MapGen.generateCompass() : {nodes:[],paths:[]});
    const startNode = (newMap.nodes||[]).find(n => n.floor === 0);
    UI._coopRun.map = newMap;
    UI._coopRun.currentNodeId = startNode ? startNode.id : null;
  },

};

// ── main.js ───────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const screens = {
    'menu':        () => UI.menu(),
    'coop-lobby':  () => UI.coopLobby(),
    'coop-map':    () => UI.coopMap(),
    'coop-rest':   () => UI.coopRest(),
    'coop-shop':   () => UI.coopShop(),
    'coop-question': () => UI.coopQuestion(),
    'char-select': () => UI.characterSelect(),
    'map':         () => UI.map(),
    'combat':      () => UI.combat(),
    'card-reward': () => UI.cardReward(),
    'rest':        () => UI.rest(),
    'shop':        () => UI.shop(),
    'question':    () => UI.question(),
    'game-over':   () => UI.gameOver(),
    'victory':     () => UI.victory(),
    'act2-transition': () => UI.act2Transition(),
    'act3-transition': () => UI.act3Transition(),
    'card-reward-tutorial-end': () => Tutorial._complete(),
  };
  State.on('screenChange', ({ screen }) => {
    // 切屏时清理所有可能残留的悬浮 tooltip（防止从问号事件/商店等带到下一屏）
    ['q-option-tooltip','global-relic-tooltip','global-potion-tooltip','card-hover-tip']
      .forEach(id=>{ const el=document.getElementById(id); if(el) el.style.display='none'; });
    document.querySelectorAll('.enemy-tooltip,.buff-tooltip').forEach(el=>el.remove());
    const fn = screens[screen];
    if (fn) fn();
    else console.warn('Unknown screen:', screen);
    Tutorial.handleScreen(screen);
    // BGM 切换：仅在模式需要变化时才重启（避免同类屏幕间的打断）
    if (screen === 'combat') {
      if (Audio._bgmMode !== 'map') Audio.startBgmMap();
    } else {
      if (Audio._bgmMode !== 'combat') Audio.startBgmCombat();
    }
  });
  Audio.startBgmCombat();
  UI.menu();
});
