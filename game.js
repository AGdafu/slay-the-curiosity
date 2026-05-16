// ── data.js ──────────────────────────────────────────────────────────────────
const Data = {
  characters: [
    {
      id: 'archer', name: '射手', emoji: '🏹', color: '#27ae60',
      hp: 60, maxHp: 60, description: '蓄力型角色。打出技能牌积累蓄力，在关键时刻一击爆发。HP较低。',
      startingDeck: ['ar_shoot','ar_shoot','ar_shoot','ar_shoot','ar_dodge','ar_dodge','ar_dodge','ar_aim','ar_aim','ar_sprint']
    },
    {
      id: 'brute', name: 'The Brute', emoji: '⚔️', color: '#c0392b',
      hp: 90, maxHp: 90, description: '力量型角色，重伤敌人。',
      startingDeck: ['strike','strike','strike','strike','strike','strike','defend','defend','defend','clash']
    },
    {
      id: 'racer', name: '赛车手', emoji: '🏎️', color: '#e67e22',
      hp: 75, maxHp: 75, description: '档位系统角色。通过换挡在攻守之间切换，高档爆发伤害，低档厚实防御。',
      startingDeck: ['gear_strike','gear_strike','gear_strike','gear_strike','gear_defend','gear_defend','gear_defend','gear_shift','gear_shift','gear_brake']
    }
  ],
  cards: {
    strike:   { id:'strike',   name:'打击',   cost:1, type:'attack', emoji:'👊', description:'造成 6 点伤害。',                          needsTarget:true,  effect(cs,ti,lv=0){ const dmg=[6,9,12][lv]||6; Combat.dealDamage(cs,ti,dmg); } },
    defend:   { id:'defend',   name:'防御',   cost:1, type:'skill',  emoji:'🛡', description:'获得 5 点格挡。',                          needsTarget:false, effect(cs,ti,lv=0){ const blk=[5,8,11][lv]||5; Combat.gainBlock(cs,blk,true); } },
    bash:     { id:'bash',     name:'猛击',   cost:2, type:'attack', emoji:'🔨', description:'造成 8 点伤害并施加 2 层易伤。',            needsTarget:true,  effect(cs,ti,lv=0){ const dmg=lv>=1?10:8; const vuln=lv>=1?3:2; Combat.dealDamage(cs,ti,dmg); Combat.applyDebuff(cs.enemies[ti],'vulnerable',vuln); } },
    zap:      { id:'zap',      name:'电击',   cost:1, type:'attack', emoji:'⚡', description:'造成 5 点伤害。若目标有易伤则额外 3 点。',  needsTarget:true,  effect(cs,ti){ const b=(cs.enemies[ti].debuffs.vulnerable||0)>0?3:0; Combat.dealDamage(cs,ti,5+b); } },
    clash:    { id:'clash',    name:'冲撞',   cost:0, type:'attack', emoji:'💢', description:'若手牌全为攻击牌，造成 14 点伤害，否则 6 点。', needsTarget:true, effect(cs,ti,lv=0){ const a=cs.hand.every(id=>Data.cards[id]&&Data.cards[id].type==='attack'); const dmgFull=[14,18,22][lv]||14; const dmgElse=[6,8,10][lv]||6; Combat.dealDamage(cs,ti,a?dmgFull:dmgElse); } },
    pommel:   { id:'pommel',   name:'剑柄击', cost:1, type:'attack', emoji:'🗡', description:'造成 9 点伤害，摸 1 张牌。',                needsTarget:true,  effect(cs,ti,lv=0){ Combat.dealDamage(cs,ti,9); Combat.drawCards(cs,lv>=1?2:1); } },
    shrug:    { id:'shrug',    name:'耸肩',   cost:1, type:'skill',  emoji:'🤷', description:'获得 8 点格挡，摸 1 张牌。',                needsTarget:false, effect(cs,ti,lv=0){ const blk=lv>=1?11:8; const draw=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.drawCards(cs,draw); } },
    armaments:{ id:'armaments',name:'武装',   cost:1, type:'skill',  emoji:'⚒', description:'获得 5 点格挡。',                          needsTarget:false, effect(cs,ti,lv=0){
      Combat.gainBlock(cs,5,true);
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
    inflame:  { id:'inflame',  name:'激怒',   cost:1, type:'power',  emoji:'🔥', description:'永久获得 2 层力量。',                      needsTarget:false, effect(cs,ti,lv=0){ Combat.applyBuff(cs.player,'strength',lv>=1?3:2); } },
    ironwave: { id:'ironwave', name:'铁浪',   cost:1, type:'attack', emoji:'🌊', description:'获得 5+力量 格挡，造成等量伤害。',          needsTarget:true,  effect(cs,ti,lv=0){ const str=cs.player.buffs.strength||0; const base=lv>=2?7:5; const mult=lv>=1?2:1; const a=base+str*mult; Combat.gainBlock(cs,a,true); Combat.dealDamage(cs,ti,a); } },
    thunderclap:{ id:'thunderclap',name:'霹雳',cost:1,type:'attack', emoji:'🌩', description:'对所有敌人造成 4 点伤害并施加 1 层易伤。',  needsTarget:false, effect(cs,ti,lv=0){ const dmg=lv>=1?7:4; const vuln=lv>=2?2:1; cs.enemies.forEach((e,i)=>{ if(e.hp>0){ Combat.dealDamage(cs,i,dmg); Combat.applyDebuff(e,'vulnerable',vuln); } }); } },
    wound:    { id:'wound',    name:'伤口',   cost:99,type:'curse',  emoji:'🩸', description:'诅咒。无法打出。',                          needsTarget:false, effect(){} },

    // ── 赛车手起始牌组 ────────────────────────────────────────────────────────────────────────────────
    // 档位辅助函数：获取当前档位（1-6）
    // 档位系统：1挡=防御 2挡=中立（初始）3挡=攻击
    // 伤害倍率：1挡×0.8  2挡×1.0  3挡×1.3（floor取整）
    // 格挡倍率：1挡×1.3  2挡×1.0  3挡×0.7（floor取整）
    // 档位格挡倍率：1挡=1.3 2挡=1.15 3挡=1.0 4挡=0.85 5挡=0.75 6挡=0.5

    // 起始牌：档位打击（替代打击）
    gear_strike: { id:'gear_strike', rarity:'common', name:'档位打击', cost:1, type:'attack', emoji:'👊', description:'造成 6 点伤害。<br><span style="font-size:0.8em;opacity:0.7">1挡=5伤 · 2挡=6伤 · 3挡=8伤</span>', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.3][g]; const bonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,Math.floor(6*dmgMult)+bonus); } },
    // 起始牌：档位防御（替代防御）
    gear_defend: { id:'gear_defend', rarity:'common', name:'档位防御', cost:1, type:'skill', emoji:'🛡', description:'获得 5 点格挡。<br><span style="font-size:0.8em;opacity:0.7">1挡=7挡 · 2挡=5挡 · 3挡=4挡（红线突破时=5挡）</span>', needsTarget:false,
      effect(cs){ const g=cs.gear||2; const hasRedline=(cs.player.buffs.redline||0)>0; const blkMult=hasRedline&&g>=3?1.0:[0,1.3,1.0,0.7][g]; Combat.gainBlock(cs,Math.floor(5*blkMult),true); } },
    // 起始牌：换挡时机
    gear_shift: { id:'gear_shift', rarity:'common', name:'换挡时机', cost:0, type:'skill', emoji:'🔄', description:'升 1 挡或降 1 挡（选择）。本卡本轮最多使用 2 次。', needsTarget:false,
      effect(cs){ Combat._gearShiftInteractive(cs, 'gear_shift'); } },
    // 起始牌：刹车漂移（替代猛击）
    gear_brake: { id:'gear_brake', rarity:'common', name:'刹车漂移', cost:1, type:'attack', emoji:'💨', description:'造成 8 点伤害。<br><span style="font-size:0.8em;opacity:0.7">1挡=6伤 · 2挡=8伤 · 3挡=10伤+减速2</span>', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.3][g]; const bonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,Math.floor(8*dmgMult)+bonus); if(g>=3){ Combat.applyDebuff(cs.enemies[ti],'slow',2); } } },

    // ── 攻击牌（6张）────────────────────────────────────────────────────────────────────────────────
    // 1. 刹车漂移（起始牌已包含）
    // 2. 氮气加速：2费 攻击+换挡 12伤+升±1挡，6挡时改为16伤
    nitro_boost: { id:'nitro_boost', rarity:'rare', name:'氮气加速', cost:2, type:'attack', emoji:'💥', description:'造成 12 点伤害并立即升 1 挡。若已处于 3 挡（最高），改为造成 16 点伤害。<br><span style="font-size:0.8em;opacity:0.7">2挡出牌=12伤+升至3挡 · 3挡出牌=16伤</span>', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const bonus=Combat._getFtBonus(cs); if(g>=3){ Combat.dealDamage(cs,ti,16+bonus); } else { Combat.dealDamage(cs,ti,12+bonus); Combat._changeGear(cs,1); } } },
    // 3. 碰撞拦截：1费 攻击 4格挡+造成等同格挡值伤害
    collision_block: { id:'collision_block', rarity:'uncommon', name:'碰撞拦截', cost:1, type:'attack', emoji:'💥', description:'获得 4 点格挡（含档位加成），随后造成等同于当前格挡总量的伤害。', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const blkMult=[0,1.3,1.0,0.7][g]; Combat.gainBlock(cs,Math.floor(4*blkMult),true); const bonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,(cs.player.block||0)+bonus); } },
    // 4. 甩尾冲锋：2费 全体攻击 5伤，速度感每10点+2伤
    drift_charge: { id:'drift_charge', rarity:'rare', name:'甩尾冲锋', cost:2, type:'attack', emoji:'🏎️', description:'对所有敌人造成 5 点伤害（含档位倍率）。速度感每有 10 点，额外造成 2 点伤害。', needsTarget:false,
      effect(cs){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.3][g]; const speedBonus=Math.floor((cs.speed||0)/10)*2; const ftBonus=Combat._getFtBonus(cs); cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,Math.floor(5*dmgMult)+speedBonus+ftBonus); }); } },
    // 5. 超车外线：1费 攻击 5+5伤（两段），3挡时免费
    overtake: { id:'overtake', rarity:'rare', name:'超车外线', cost:1, type:'attack', emoji:'🏎️', description:'造成 5+5 点伤害（两段，含档位倍率）。若处于 3 挡，本卡免费使用。<br><span style="font-size:0.8em;opacity:0.7">2挡=5+5伤 · 3挡=7+7伤且免费</span>', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const dmgMult=[0,0.8,1.0,1.3][g]; const ftBonus=Combat._getFtBonus(cs); const hit=Math.floor(5*dmgMult)+ftBonus; Combat.dealDamage(cs,ti,hit); Combat.dealDamage(cs,ti,hit); } },
    // 6. 涡轮压榨：3费 攻击+换挡 6×档位伤害，降2挡
    turbo_crush: { id:'turbo_crush', rarity:'rare', name:'涡轮压榨', cost:3, type:'attack', emoji:'⚡', description:'造成 6×（当前档位）点伤害，随后降 2 挡（最低降至 1 挡）。<br><span style="font-size:0.8em;opacity:0.7">1挡=6伤 · 2挡=12伤 · 3挡=18伤+降至1挡</span>', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; const ftBonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,6*g+ftBonus); Combat._changeGear(cs,-2); } },

    // ── 技能牌（8张）────────────────────────────────────────────────────────────────────────────────
    // 7. 进站维修：1费 技能 10格挡，1/2挡时+4回血
    pit_repair: { id:'pit_repair', rarity:'uncommon', name:'进站维修', cost:1, type:'skill', emoji:'🔧', description:'获得 10 点格挡（含档位倍率）。若处于 1 挡或 2 挡，额外恢复 4 点生命。<br><span style="font-size:0.8em;opacity:0.7">1挡=13挡+4回血 · 2挡=10挡+4回血 · 3挡=7挡</span>', needsTarget:false,
      effect(cs){ const g=cs.gear||2; const blkMult=[0,1.3,1.0,0.7][g]; Combat.gainBlock(cs,Math.floor(10*blkMult),true); if(g<=2){ cs.player.hp=Math.min(cs.player.hp+4,cs.player.maxHp); State.run.character.hp=cs.player.hp; } } },
    // 8. 换挡时机（起始牌已包含）
    // 9. 赛线预判：1费 技能 看牌堆顶3张，可重新排列，再抄±1张
    race_predict: { id:'race_predict', rarity:'uncommon', name:'赛线预判', cost:1, type:'skill', emoji:'🔮', description:'查看牌堆顶 3 张牌，可重新排列顺序，再抄 1 张牌。', needsTarget:false,
      effect(cs){ Combat._racePredictInteractive(cs); } },
    // 10. 压力测试：2费 技能 获得1层超载（受伤时+1格挡），抄2，上限3层
    pressure_test: { id:'pressure_test', rarity:'rare', name:'压力测试', cost:2, type:'skill', emoji:'📊', description:'获得 1 层「超载」（每次受到伤害时额外获得 1 点格挡，上限 3 层，本战斗持续），然后抽 2 张牌。', needsTarget:false,
      effect(cs){ const cur=cs.player.buffs.overload||0; if(cur<3){ Combat.applyBuff(cs.player,'overload',1); } Combat.drawCards(cs,2); } },
    // 11. 节油行驶：1费 换挡+技能 降1挡，本回合所有技能费用-1
    fuel_save: { id:'fuel_save', rarity:'uncommon', name:'节油行驶', cost:1, type:'skill', emoji:'⛽', description:'降 1 挡。本回合所有技能牌费用 -1（最低 0）。', needsTarget:false,
      effect(cs){ Combat._changeGear(cs,-1); cs._fuelSaveActive=true; } },
    // 12. 过弯线路：0费 技能 升过挡获得8格挡，否则获得5格挡（不受档位倍率影响）
    corner_line: { id:'corner_line', rarity:'common', name:'过弯线路', cost:0, type:'skill', emoji:'🛣️', description:'如果此回合已经升过挡，获得 8 点格挡；否则获得 5 点格挡。（不受档位倍率影响）', needsTarget:false,
      effect(cs){ const amt = cs._shiftedUpThisTurn ? 8 : 5; cs.player.block=(cs.player.block||0)+amt; } },
    // 13. 瞬时升挡：1费 换挡+技能 升2挡（不超过3挡上限），抄1张
    quick_upshift: { id:'quick_upshift', rarity:'uncommon', name:'瞬时升挡', cost:1, type:'skill', emoji:'⬆️', description:'升 2 挡（不超过 3 挡上限），抽 1 张牌。<br><span style="font-size:0.8em;opacity:0.7">1挡→3挡 · 2挡→3挡（上限）</span>', needsTarget:false,
      effect(cs){ Combat._changeGear(cs,2); Combat.drawCards(cs,1); } },
    // 14. 强制降挡：0费消耗 换挡+技能 降±2挡，对敌施加减速层数=降幅×2
    forced_downshift: { id:'forced_downshift', rarity:'uncommon', name:'强制降挡', cost:0, type:'skill', emoji:'⬇️', description:'降 2 挡。对敌人施加「减速」层数等于降幅×2。消耗。', needsTarget:false,
      effect(cs){ const prev=cs.gear||2; Combat._changeGear(cs,-2); const dropped=prev-(cs.gear||2); if(dropped>0){ cs.enemies.forEach(e=>{ if(!e._dead) Combat.applyDebuff(e,'slow',dropped*2); }); }
      // 消耗牌：从手牌移出后不再进入弃牌堆，而是进入消耗堆
      const ci=cs.discardPile.lastIndexOf('forced_downshift'); if(ci!==-1) cs.discardPile.splice(ci,1); cs.exhaustPile.push('forced_downshift'); } },

    // ── 能力牌（4张）────────────────────────────────────────────────────────────────────────────────
    // 15. 红线突破：3费 能力+换挡 永久：6挡时无格挡惩罚，5挡以上每回合开始抄±1
    redline: { id:'redline', rarity:'epic', name:'红线突破', cost:3, type:'power', emoji:'🔴', description:'永久：处于 3 挡时，格挡获取不受减损（视为 2 挡倍率）。每回合开始时，若处于 3 挡，抽 1 张牌。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'redline',1); } },
    // 16. 赛车直觉：2费 能力 永久：每次升挡获得1点势头（战斗内可用作额外费用，上限±4）
    race_instinct: { id:'race_instinct', rarity:'epic', name:'赛车直觉', cost:2, type:'power', emoji:'💡', description:'永久：每当你升挡，获得 1 点「势头」（战斗内可用作额外费用，上限 4 点）。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'race_instinct',1); } },
    // 17. 全油门：2费 能力 永久：攻击牌伤害+1，升挡回合攻击牌伤害+3
    full_throttle: { id:'full_throttle', rarity:'epic', name:'全油门', cost:2, type:'power', emoji:'🔥', description:'永久：攻击牌造成的伤害 +1。若你在这一回合升过挡，攻击牌改为 +3。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'full_throttle',1); } },
    // 18. 防侧滑系统：1费 能力 永久：每次降挡获得3格挡
    anti_skid: { id:'anti_skid', rarity:'rare', name:'防侧滑系统', cost:1, type:'power', emoji:'🔧', description:'永久：每当你降挡，获得 3 点格挡。', needsTarget:false,
      effect(cs){ Combat.applyBuff(cs.player,'anti_skid',1); } },

    // ── 换挡标签牌（2张）────────────────────────────────────────────────────────────────────────────────
    // 19. 档位锁定：1费 技能+换挡 本回合档位不变，获得档位×3格挡
    gear_lock: { id:'gear_lock', rarity:'uncommon', name:'档位锁定', cost:1, type:'skill', emoji:'🔒', description:'本回合档位不会因任何效果改变。获得等于当前档位×3 的格挡。<br><span style="font-size:0.8em;opacity:0.7">1挡=3格挡 · 2挡=6格挡 · 3挡=9格挡</span>', needsTarget:false,
      effect(cs){ cs._gearLocked=true; Combat.gainBlock(cs,(cs.gear||2)*3,true); } },
    // 20. 超速警告：0费消耗 攻击+换挡 3挡时造成10伤+降至2挡，否则无效
    overspeed: { id:'overspeed', rarity:'common', name:'超速警告', cost:0, type:'attack', emoji:'🚨', description:'若你处于 3 挡，造成 10 点伤害（含×1.3倍率=13伤）并强制降 1 挡（→2挡）。否则此牌无效果。消耗。', needsTarget:true,
      effect(cs,ti){ const g=cs.gear||2; if(g>=3){ const ftBonus=Combat._getFtBonus(cs); Combat.dealDamage(cs,ti,Math.floor(10*1.3)+ftBonus); Combat._changeGear(cs,-1); }
      const oi=cs.discardPile.lastIndexOf('overspeed'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('overspeed'); } },

    // ── 负面牌（怪物插入手牌）────────────────────────────────────────────────────────────────
    // 黏液：史莱姆插入，99费无法打出，纯占手牌位
    slime_goo: { id:'slime_goo', name:'黏液', cost:99, type:'curse', emoji:'💚', description:'<span style="color:#ff8080">诅咒。无法打出。</span><br>黏糊糊的，没什么用。', needsTarget:false,
      effect(cs){} },
    // 伤口：已在第32行定义，99费无法打出，纯占手牌位（颚虫/巨颚虫插入）
    // 诅咒：邪教徒系列插入，99费无法打出，纯占手牌位
    curse_card: { id:'curse_card', name:'诅咒', cost:99, type:'curse', emoji:'💀', description:'<span style="color:#ff8080">诅咒。无法打出。</span><br>黑暗的力量缠绕着你。', needsTarget:false,
      effect(cs){} },
    // 中毒：毒虱/Boss插入，1费可打出（无效果），回合结束若在手牌扣3HP
    poison_card: { id:'poison_card', name:'中毒', cost:1, type:'curse', emoji:'☠️', description:'<span style="color:#ff8080">诅咒。</span>打出无效果。<br><span style="color:#ffaa60">⚠ 回合结束若仍在手牌中，扣 3 点 HP。</span>', needsTarget:false,
      effect(cs){} },
    // 流血：Boss专属，1费可打出（无效果），回合结束若在手牌扣4HP
    bleed_card: { id:'bleed_card', name:'流血', cost:1, type:'curse', emoji:'🔴', description:'<span style="color:#ff8080">诅咒。</span>打出无效果。<br><span style="color:#ffaa60">⚠ 回合结束若仍在手牌中，扣 4 点 HP。</span>', needsTarget:false,
      effect(cs){} },

    // ── 射手专属卡牌 ──────────────────────────────────────────────────────────────
    // 普通牌
    ar_shoot:   { id:'ar_shoot',   rarity:'common',   name:'精准射击', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>3</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:3; Combat.dealDamage(cs,ti,base+c*3); } },
    ar_dodge:   { id:'ar_dodge',   rarity:'common',   name:'闪身',     cost:1, type:'skill',  emoji:'🛡️', description:'获得 <b>4</b> 点格挡，获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv){ const blk=lv>=1?6:4; const chg=lv>=2?2:1; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,chg); } },
    ar_aim:     { id:'ar_aim',     rarity:'common',   name:'瞄准',     cost:0, type:'skill',  emoji:'🎯', description:'获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs,ti,lv){ const amt=lv>=1?4:3; Combat.archerGainCharge(cs,amt); if(lv>=2) Combat.drawCards(cs,1); } },
    ar_sprint:  { id:'ar_sprint',  rarity:'common',   name:'急步',     cost:1, type:'skill',  emoji:'💨', description:'获得 <b>3</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', needsTarget:false,
      effect(cs,ti,lv){ const blk=lv>=1?5:3; Combat.gainBlock(cs,blk,true); Combat.archerGainCharge(cs,1); Combat.drawCards(cs,1); } },
    ar_charge_shot: { id:'ar_charge_shot', rarity:'common', name:'蓄力射击', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>4</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?6:4; const mult=lv>=2?4:3; Combat.dealDamage(cs,ti,base+c*mult); } },
    ar_vuln_arrow: { id:'ar_vuln_arrow', rarity:'common', name:'易伤箭', cost:1, type:'attack', emoji:'🎯', description:'造成 <b>3</b> 点伤害，施加 <b>1</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:3; const mult=lv>=2?3:2; const vuln=lv>=1?2:1; Combat.dealDamage(cs,ti,base+c*mult); Combat.applyDebuff(cs.enemies[ti],'vulnerable',vuln); } },

    // 精良牌
    ar_double_shot: { id:'ar_double_shot', rarity:'uncommon', name:'双箭齐发', cost:1, type:'attack', emoji:'🏹', description:'造成 <b>3</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于 2 次）。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=2?5:(lv>=1?4:3); const mult=lv>=2?3:2; Combat.dealDamage(cs,ti,base+c*mult); Combat.dealDamage(cs,ti,base+c*mult); } },
    ar_block_charge: { id:'ar_block_charge', rarity:'uncommon', name:'格挡蓄力', cost:1, type:'skill', emoji:'🛡️', description:'获得等于当前蓄力×<b>2</b> 的格挡，然后获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs){ const c=cs.charge||0; Combat.gainBlock(cs,c*2,true); Combat.archerGainCharge(cs,1); } },
    ar_roll:    { id:'ar_roll',    rarity:'uncommon', name:'翻滚闪避', cost:2, type:'skill',  emoji:'💨', description:'获得 <b>10</b> 点格挡，获得 <b>2</b> 点蓄力。', needsTarget:false,
      effect(cs){ Combat.gainBlock(cs,10,true); Combat.archerGainCharge(cs,2); } },
    ar_pierce:  { id:'ar_pierce',  rarity:'uncommon', name:'穿甲箭',   cost:2, type:'attack', emoji:'🏹', description:'造成 <b>8</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const e=cs.enemies[ti]; const oldBlock=e.block; e.block=0; const base=lv>=1?10:8; const mult=lv>=2?4:3; Combat.dealDamage(cs,ti,base+c*mult); e.block=oldBlock; } },
    ar_swap:    { id:'ar_swap',    rarity:'uncommon', name:'换箭',     cost:0, type:'skill',  emoji:'🔄', description:'丢弃手牌中任意 1 张牌，抽 <b>2</b> 张牌，获得 <b>1</b> 点蓄力。', needsTarget:false,
      effect(cs){ if(cs.hand.length>0){ const idx=Math.floor(Math.random()*cs.hand.length); cs.discardPile.push(cs.hand.splice(idx,1)[0]); } Combat.drawCards(cs,2); Combat.archerGainCharge(cs,1); } },
    ar_rapid_fire: { id:'ar_rapid_fire', rarity:'uncommon', name:'连续射击', cost:2, type:'attack', emoji:'🎯', description:'造成 <b>4</b> 点伤害 3 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 3 次）。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?5:4; for(let i=0;i<3;i++) Combat.dealDamage(cs,ti,base+c*2); } },
    ar_wind_step: { id:'ar_wind_step', rarity:'uncommon', name:'风驰步', cost:1, type:'skill', emoji:'💨', description:'获得 <b>4</b> 点格挡，获得 <b>1</b> 点蓄力。本回合下一张攻击牌费用 -1。', needsTarget:false,
      effect(cs){ Combat.gainBlock(cs,4,true); Combat.archerGainCharge(cs,1); cs._archerNextAttackDiscount=(cs._archerNextAttackDiscount||0)+1; } },

    // 稀有牌
    ar_arrow_rain: { id:'ar_arrow_rain', rarity:'rare', name:'箭雨', cost:2, type:'attack', emoji:'🏹', description:'对所有敌人造成 <b>3</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', needsTarget:false,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=2?5:(lv>=1?4:3); cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead){ Combat.dealDamage(cs,i,base+c*2); Combat.dealDamage(cs,i,base+c*2); } }); } },
    ar_full_charge: { id:'ar_full_charge', rarity:'rare', name:'满蓄爆射', cost:1, type:'attack', emoji:'🎯', description:'<b>仅当蓄力 = 5（满蓄）时可打出。</b>消耗全部蓄力，造成 <b>50</b> 点伤害。', needsTarget:true,
      effect(cs,ti,lv){ const c=cs.charge||0; const threshold=lv>=2?4:(cs.chargeMax||5); const dmg=lv>=1?60:50; if(c>=threshold){ cs.charge=0; Combat.dealDamage(cs,ti,dmg); } } },
    ar_gale:    { id:'ar_gale',    rarity:'rare',     name:'疾风步',   cost:1, type:'skill',  emoji:'💨', description:'获得 <b>6</b> 点格挡，获得 <b>2</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', needsTarget:false,
      effect(cs){ Combat.gainBlock(cs,6,true); Combat.archerGainCharge(cs,2); Combat.drawCards(cs,1); const oi=cs.discardPile.lastIndexOf('ar_gale'); if(oi!==-1) cs.discardPile.splice(oi,1); cs.exhaustPile.push('ar_gale'); } },
    ar_pierce_all: { id:'ar_pierce_all', rarity:'rare', name:'贯穿射击', cost:2, type:'attack', emoji:'🏹', description:'对所有敌人造成 <b>8</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', needsTarget:false,
      effect(cs,ti,lv){ const c=cs.charge||0; cs.charge=0; const base=lv>=1?10:8; cs.enemies.forEach((_,i)=>{ if(!cs.enemies[i]._dead) Combat.dealDamage(cs,i,base+c*3); }); } },

    // 史诗牌
    ar_instinct: { id:'ar_instinct', rarity:'epic', name:'猎手直觉', cost:2, type:'power', emoji:'✨', description:'永久：每回合开始时，获得 <b>1</b> 点蓄力（不超过上限）。', needsTarget:false,
      effect(cs){ cs.player.buffs.archer_instinct=(cs.player.buffs.archer_instinct||0)+1; } },
    ar_cap_up:  { id:'ar_cap_up',  rarity:'epic',     name:'蓄力上限', cost:2, type:'power',  emoji:'✨', description:'永久：蓄力上限提升至 <b>8</b>（原为5）。立即获得 <b>3</b> 点蓄力。', needsTarget:false,
      effect(cs){ cs.chargeMax=8; Combat.archerGainCharge(cs,3); } },
    ar_ultimate: { id:'ar_ultimate', rarity:'epic',   name:'终极连射', cost:3, type:'attack', emoji:'🏹', description:'造成 <b>6</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于全部 4 次）。', needsTarget:true,
      effect(cs,ti){ const c=cs.charge||0; cs.charge=0; for(let i=0;i<4;i++) Combat.dealDamage(cs,ti,6+c*3); } }
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
        if(a==='buff') return [{type:'buff',label:'✨',num:'鼓舞',detail:'获得 2 层【力量】和 15 点格挡'}];
        if(a==='heavy') return [{type:'attack',val:20+str,label:'⚔️',num:String(20+str),detail:'沉重一击'}];
        if(a==='ultimate') return [{type:'attack',val:10+str,label:'⚔️',num:`×3(${10+str})`,detail:'连环三连击'}];
        return [{type:'attack',val:12+str,label:'⚔️',num:String(12+str),detail:'快速斩击'}];
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
    easy2:  [['louse2','louse2'],['cultist2'],['louse2','louse2','louse2']],
    medium2:[['jawworm2'],['louse2','cultist2'],['jawworm2','louse2']],
    hard2:  [['jawworm2','cultist2'],['jawworm2','jawworm2']],
    boss2:  [['banbu']],
    boss3:  [['boge']]
  },
  // 大眼开局遗物池
  dayanRelics: [
    {
      id: 'protein_powder',
      name: '大眼的蛋白粉',
      icon: '💪',
      desc: '拾起后永久获得 +1 力量，使所有攻击永久加成 1 点伤害。',
      apply(run){ run.character.buffs = run.character.buffs||{}; run.character.buffs.strength = (run.character.buffs.strength||0)+1; }
    },
    {
      id: 'spike_shoes',
      name: '大眼的钉鞋',
      icon: '👟',
      desc: '每个回合结束后，有 5% 的概率跳过怪物回合，直接进入下一个玩家回合。',
      apply(run){ run.relics.push('spike_shoes'); }
    },
    {
      id: 'magnifier',
      name: '大眼的放大镜',
      icon: '🔍',
      desc: '每场战斗开始时，手牌中随机 1 张牌费用变为 0（仅本回合有效）。',
      apply(run){ run.relics.push('magnifier'); }
    },
    {
      id: 'iron_stomach',
      name: '大眼的鐵胃',
      icon: `<img src="/manus-storage/img_00_572k_79c2d105.png" style="width:44px;height:44px;object-fit:contain;vertical-align:middle">`,
      desc: '永久增加 11 点生命上限，并立即回复 11 点 HP。',
      apply(run){ run.character.maxHp+=11; run.character.hp=Math.min(run.character.hp+11,run.character.maxHp); }
    },
    {
      id: 'amulet',
      name: '大眼的水晶球',
      icon: '🔮',
      desc: '每局游戏第一次被致死时，以 1 HP 存活（仅触发一次）。',
      apply(run){ run.relics.push('amulet'); }
    }
  ],

  datouRelics: [
    {
      id: 'datou_spanish_book',
      name: '大头的西班牙语书',
      icon: '📖',
      desc: '回合结束时，若本回合造成过伤害，回复 2 点 HP',
      apply(run){ run.relics.push('datou_spanish_book'); }
    },
    {
      id: 'datou_sunglasses',
      name: '大头的墨镜',
      icon: '🕶️',
      desc: '每次抽牌时，25% 概率额外再抽一张',
      apply(run){ run.relics.push('datou_sunglasses'); }
    },
    {
      id: 'datou_drumstick',
      name: '大头的鼓棒',
      icon: '🥁',
      desc: '打出攻击牌时，10% 概率额外释放一次',
      apply(run){ run.relics.push('datou_drumstick'); }
    },
    {
      id: 'datou_hat',
      name: '大头的帽子',
      icon: '🧢',
      desc: '永久增加 20 点生命上限，并立即回复 20 点 HP。',
      apply(run){ run.character.maxHp += 20; run.character.hp = Math.min(run.character.hp + 20, run.character.maxHp); run.relics.push('datou_hat'); }
    },
    {
      id: 'datou_whistle',
      name: '大头的哨子',
      icon: '🎺',
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
      desc: '每场战斗结束时，若本场战斗全程未受到任何伤害，永久增加 3 点生命上限。',
      apply(run){ run.relics.push('wenhao_scarf'); }
    },
    {
      id: 'wenhao_feather',
      name: '文豪的羽毛',
      icon: '🪶',
      desc: '生命首次低于最大生命值的 50% 时，立刻回满生命。（全局仅触发一次；一击致死不触发）',
      apply(run){ run.relics.push('wenhao_feather'); }
    },
    {
      id: 'wenhao_script',
      name: '文豪的剧本',
      icon: '📜',
      desc: '获取时，立刻打开牌库，选择至多 3 张卡牌删除。（人生的剧本由你自己决定）',
      apply(run){ run.relics.push('wenhao_script'); }
    }
  ],
  // 高山开局遗物池（第三层守护神）
  gaoshanRelics: [
    {
      id: 'gaoshan_sunglasses',
      name: '高山的雪镜',
      icon: '🥽',
      desc: '每回合开始时，有 50% 概率获得 1 点额外能量。',
      apply(run){ run.relics.push('gaoshan_sunglasses'); }
    },
    {
      id: 'gaoshan_jacket',
      name: '高山的冲锋衣',
      icon: '🧥',
      desc: '每场战斗中，第一次获得格挡时，格挡值翻倍。',
      apply(run){ run.relics.push('gaoshan_jacket'); }
    },
    {
      id: 'gaoshan_compass',
      name: '高山的指南针',
      icon: '🧭',
      desc: '激活后，第三层地图变为一条直路（7~10节点），难度大幅降低：精英 5%、普通战斗 35%、商店 25%、市井 35%，最后一个节点必为商店。',
      apply(run){ run.relics.push('gaoshan_compass'); }
    },
    {
      id: 'gaoshan_braid',
      name: '高山的麻花辫',
      icon: '💇',
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
      desc: '每回合开始时，获得 3 点格挡（不会消失，可累计）。',
      apply(run){ run.relics.push('wangwei_bracelet'); }
    },
    {
      id: 'wangwei_glasses',
      name: '王微的眼镜',
      icon: '👓',
      desc: '受到伤害时，有 20% 概率完全无视本次伤害。',
      apply(run){ run.relics.push('wangwei_glasses'); }
    },
    {
      id: 'wangwei_bowl',
      name: '王微的碗',
      icon: '🍜',
      desc: '每场战斗结束后，回复 5 点 HP。',
      apply(run){ run.relics.push('wangwei_bowl'); }
    },
    {
      id: 'wangwei_wallet',
      name: '王微的钱包',
      icon: '👛',
      desc: '每场战斗结束后，金币奖励额外 +25%。',
      apply(run){ run.relics.push('wangwei_wallet'); }
    },
    {
      id: 'wangwei_optimism',
      name: '王微的乐观',
      icon: '🌟',
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
      actRestrict: 3,    // 仅在尬玩周（act3）掉落
      desc: '尬玩周限定。拾取时立即获得 333 枚金币。报销成功！',
      apply(run){ run.gold = (run.gold||0) + 333; }
    },
    {
      id: 'susu_eyemask',
      name: 'Susu的眼罩',
      icon: null,
      tier: 'rare',
      source: 'battle',  // 可通过战斗掉落获得
      img: '/manus-storage/img_01_3443k_f8fb25b0.png',
      desc: '每场战斗中，抵御第一次受到的负面状态（弱化/易伤/中毒等）。',
      apply(run){ run.relics.push('susu_eyemask'); }
    },
    {
      id: 'xiaojiu_guitar',
      name: '小九的六弦琴',
      icon: null,
      tier: 'rare',
      source: 'battle',  // 可通过战斗掉落获得
      img: '/manus-storage/xiaojiu_guitar_e444f0fa.png',
      desc: '每场战斗的每个回合额外多抽 1 张牌。',
      apply(run){ run.relics.push('xiaojiu_guitar'); }
    },
    {
      id: 'football',
      name: '橄榄球',
      icon: '🏈',
      tier: 'rare',
      source: 'event',   // 仅能通过腰旗橄榄球事件获得，不在战斗掉落池中
      img: '/manus-storage/football_icon_0390dd99.png',
      desc: '每场战斗第一回合增加 1 点能量。',
      apply(run){ run.relics.push('football'); }
    },
  ],
  // source 字段说明：'battle'=战斗掉落，'event'=事件专属，'shop'=商店专属，'boss'=Boss专属
  // 未来新增特殊来源遗物时，设置对应 source 值即可自动从战斗掉落池中排除
    rewardPool: {
    // 默认角色奖励池
    default: ['pommel','shrug','armaments','inflame','ironwave','thunderclap','zap','clash','bash'],
    // 赛车手专属奖励池
    racer: ['nitro_boost','collision_block','drift_charge','overtake','turbo_crush',
      'pit_repair','race_predict','pressure_test','fuel_save','corner_line',
      'quick_upshift','forced_downshift','redline','race_instinct','full_throttle',
      'anti_skid','gear_lock','overspeed'],
    // 射手专属奖励池
    archer: ['ar_shoot','ar_dodge','ar_aim','ar_sprint','ar_charge_shot','ar_vuln_arrow',
      'ar_double_shot','ar_block_charge','ar_roll','ar_pierce','ar_swap','ar_rapid_fire','ar_wind_step',
      'ar_arrow_rain','ar_full_charge','ar_gale','ar_pierce_all','ar_instinct','ar_cap_up','ar_ultimate'],
  },
  // 问号事件列表
  questionEvents: [
    {
      id: 'flag_football',
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
      title: '尹姐食堂',
      desc: '尹姐最近研究了一些新菜，热情地招呼你过来尝尝。听说吃了新菜有 50% 的概率永久提升 5 点生命上限，但也有 50% 的概率让你难受失去 8 点血……你的选择是？',
      options: [
        {
          label: '品尝新菜',
          tooltip: '🎲 50% 概率：最大HP永久 +5\n⚠️ 50% 概率：HP -8',
          resolve(run, UI) {
            const r = Math.random();
            if (r < 0.50) {
              run.character.maxHp = (run.character.maxHp || 80) + 5;
              run.character.hp = Math.min(run.character.maxHp, run.character.hp);
              return { type: 'good', msg: '味道绝了！最大HP永久 +5！' };
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
    {id:'full_throttle', rarity:'epic',   price:130}, // 能力牌：升挡回合攻击+5，雪球效应强
    {id:'race_instinct', rarity:'epic',   price:120}, // 能力牌：每次升挡+1势头，中期资源强
    {id:'turbo_crush', rarity:'rare',     price:120}, // 3费3挡=18伤，高性价比爆发
    // ★★½ 中高强度（100-115）：强力功能卡
    {id:'nitro_boost', rarity:'rare',     price:110}, // 2费12伤+升挡，或3挡时16伤
    {id:'pressure_test', rarity:'rare',   price:100}, // 2费戧5+超载层，卡牌质量高
    {id:'drift_charge', rarity:'rare',    price:100}, // 2费全体攻击+速度感层叠
    // ★★ 中强度（75-95）：实用功能卡
    {id:'collision_block', rarity:'uncommon', price:90},  // 1费格挡+等量伤害，攻守兼备
    {id:'overtake', rarity:'rare',        price:90},  // 1费3挡时免费且两段伤
    {id:'anti_skid', rarity:'rare',       price:80},  // 能力牌：降挡时获得3格挡，防御强化
    {id:'race_predict', rarity:'uncommon',    price:80},  // 1费看牌堆顶+排序+戧1，运营强
    {id:'gear_lock', rarity:'uncommon',       price:80},  // 1费锁挡+挡位×3格挡
    {id:'pit_repair', rarity:'uncommon',      price:75},  // 1费10格挡+低挡回血，防御实用
    {id:'quick_upshift', rarity:'uncommon',   price:75},  // 1费升戧2挡+戧1张
    // ★ 低中强度（55-70）：辅助/条件卡
    {id:'fuel_save', rarity:'uncommon',       price:65},  // 1费降挡+本回技能费用-1
    {id:'forced_downshift', rarity:'uncommon',price:65},  // 0费降2挡+减速×2层，消耗
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
    {id:'ar_block_charge',rarity:'uncommon',  price:75},
    {id:'ar_roll',        rarity:'uncommon',  price:80},
    {id:'ar_pierce',      rarity:'uncommon',  price:90},
    {id:'ar_swap',        rarity:'uncommon',  price:70},
    {id:'ar_rapid_fire',  rarity:'uncommon',  price:85},
    {id:'ar_wind_step',   rarity:'uncommon',  price:75},
    {id:'ar_arrow_rain',  rarity:'rare',      price:110},
    {id:'ar_full_charge', rarity:'rare',      price:120},
    {id:'ar_gale',        rarity:'rare',      price:100},
    {id:'ar_pierce_all',  rarity:'rare',      price:110},
    {id:'ar_instinct',    rarity:'epic',      price:140},
    {id:'ar_cap_up',      rarity:'epic',      price:130},
    {id:'ar_ultimate',    rarity:'epic',      price:150},
  ],
  removeCardPrice: 75,
  getShopInventory(deck){
    // 根据当前角色过滤商店卡牌池
    const charId = State.run?.character?.id || 'default';
    const racerCards = new Set(['nitro_boost','collision_block','drift_charge','overtake','turbo_crush',
      'pit_repair','race_predict','pressure_test','fuel_save','corner_line',
      'quick_upshift','forced_downshift','redline','race_instinct','full_throttle',
      'anti_skid','gear_lock','overspeed','gear_strike','gear_defend','gear_brake','gear_shift']);
    const archerCards = new Set(['ar_shoot','ar_dodge','ar_aim','ar_sprint','ar_charge_shot','ar_vuln_arrow',
      'ar_double_shot','ar_block_charge','ar_roll','ar_pierce','ar_swap','ar_rapid_fire','ar_wind_step',
      'ar_arrow_rain','ar_full_charge','ar_gale','ar_pierce_all','ar_instinct','ar_cap_up','ar_ultimate']);
    const defaultCards = new Set(['pommel','shrug','armaments','inflame','ironwave','thunderclap','zap','clash','bash','strike','defend']);
    let pool;
    if(charId === 'racer'){
      pool = Data.shopPool.filter(item => racerCards.has(item.id));
    } else if(charId === 'archer'){
      pool = Data.shopPool.filter(item => archerCards.has(item.id));
    } else {
      pool = Data.shopPool.filter(item => defaultCards.has(item.id));
    }
    const weights = Data.rarityWeights.shop;
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
  // 品质权重配置
  rarityWeights: {
    reward: { common:45, uncommon:32, rare:17, epic:6 },
    shop:   { common:40, uncommon:32, rare:20, epic:8 },
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
    const charId = State.run?.character?.id || 'default';
    const fullPool = Data.rewardPool[charId] || Data.rewardPool.default;
    const weights = Data.rarityWeights.reward;
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
      img: '/manus-storage/img_02_6k_7120b6b8.png',
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
      name: 'skype的醒糟水',
      emoji: '🍶',
      img: '/manus-storage/laozao_icon_7788818e.png',
      color: '#c8860a',
      glowColor: 'rgba(200,134,10,0.6)',
      tier: 'rare',
      sellPrice: 100,
      desc: '喝下后本回合所有手牌费用随机变为 0~3。',
      use(run, cs) {
        if (!cs) return '只能在战斗中使用！';
        // 为每张手牌随机分配0~3的费用，存入cs.laozaoCosts
        cs.laozaoCosts = {};
        const results = cs.hand.map((cardId, i) => {
          const newCost = Math.floor(Math.random() * 4); // 0,1,2,3
          cs.laozaoCosts[cardId + '_' + i] = newCost;
          return newCost;
        });
        cs.laozaoActive = true;
        return `手牌费用已随机变化：${results.join(', ')}！`;
      }
    },
    bread: {
      id: 'bread',
      name: '小七的面包',
      emoji: '🍞',
      img: '/manus-storage/bread_icon_15f90b35.png',
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
    }
  },

  // ── 卡牌升级数据（每张牌最多升级两次）────────────────────────────────────────
  upgrades: {
    // ── 赛车手卡牌升级 ──
    gear_strike:    { 1:{desc:'造成 <b>8</b> 点伤害。',      cost:1}, 2:{desc:'造成 <b>10</b> 点伤害。若处于3挡，额外施加 1 层减速。', cost:1} },
    gear_defend:    { 1:{desc:'获得 <b>7</b> 点格挡（含档位倍率）。', cost:1}, 2:{desc:'获得 <b>7</b> 点格挡（含档位倍率），抽 <b>1</b> 张牌。', cost:1} },
    gear_shift:     { 1:{desc:'0费。升1挡或降1挡，本轮最多 <b>3</b> 次。', cost:0}, 2:{desc:'0费。升1挡或降1挡，本轮最多 <b>3</b> 次，首次使用后抽 <b>1</b> 张牌。', cost:0} },
    gear_brake:     { 1:{desc:'造成 <b>10</b> 点伤害（含档位倍率）。3挡时额外施加 2 层减速。', cost:1}, 2:{desc:'<b>0费</b>。造成 <b>8</b> 点固定伤害。3挡时额外施加 2 层减速。', cost:0} },
    overspeed:      { 1:{desc:'处于3挡时造成 <b>16</b> 点伤害并降1挡。消耗。', cost:0}, 2:{desc:'处于3挡时造成 <b>16</b> 点伤害并降1挡。<b>去除消耗。</b>', cost:0} },
    pit_repair:     { 1:{desc:'获得 <b>12</b> 点格挡。1/2挡时额外回血 <b>5</b> HP。', cost:1}, 2:{desc:'<b>0费</b>。获得 <b>10</b> 点格挡。1/2挡时额外回血 4 HP。', cost:0} },
    race_predict:   { 1:{desc:'查看牌堆顶 <b>4</b> 张，自由排序，抽 1 张。', cost:1}, 2:{desc:'查看牌堆顶 <b>4</b> 张，自由排序，抽 <b>2</b> 张。', cost:1} },
    forced_downshift:{ 1:{desc:'0费。降2挡，对敌人施加减速×降幅×<b>2</b>。消耗。', cost:0}, 2:{desc:'0费。降2挡，对敌人施加减速×降幅×<b>2</b>。<b>去除消耗。</b>', cost:0} },
    quick_upshift:  { 1:{desc:'升2挡（上限3挡），抽 <b>2</b> 张牌。', cost:1}, 2:{desc:'<b>0费</b>。升2挡（上限3挡），抽 1 张牌。', cost:0} },
    collision_block:{ 1:{desc:'获得 <b>6</b> 点格挡（含档位倍率），随后造成等同于当前格挡总量的伤害。', cost:1}, 2:{desc:'获得 <b>6</b> 点格挡（含档位倍率），随后造成等同于当前格挡总量的伤害，施加 1 层易伤。', cost:1} },
    gear_lock:      { 1:{desc:'本回合挡位锁定，获得挡位×<b>4</b> 点格挡。', cost:1}, 2:{desc:'<b>0费</b>。本回合挡位锁定，获得挡位×3 点格挡。', cost:0} },
    nitro_boost:    { 1:{desc:'造成 <b>14</b> 点伤害并升1挡。3挡时改为造成 <b>18</b> 点伤害。', cost:2}, 2:{desc:'<b>1费</b>。造成 <b>12</b> 点伤害并升1挡。3挡时改为造成 <b>16</b> 点伤害。', cost:1} },
    drift_charge:   { 1:{desc:'对所有敌人造成 <b>7</b> 点伤害（含档位倍率）。速度感每有 10 点，额外造成 2 点伤害。', cost:2}, 2:{desc:'对所有敌人造成 <b>7</b> 点伤害（含档位倍率）。速度感每有 <b>8</b> 点，额外造成 2 点伤害。', cost:2} },
    overtake:       { 1:{desc:'造成 <b>6+6</b> 点伤害（两段，含档位倍率）。3挡时本牌费用变为0。', cost:1}, 2:{desc:'造成 <b>7+7</b> 点伤害（两段，含档位倍率）。3挡时本牌费用变为0，且施加 1 层减速。', cost:1} },
    turbo_crush:    { 1:{desc:'造成 <b>7×（当前档位）</b> 点伤害，随后降2挡（最低降至1挡）。', cost:3}, 2:{desc:'<b>2费</b>。造成 <b>6×（当前档位）</b> 点伤害，随后降2挡（最低降至1挡）。', cost:2} },
    anti_skid:      { 1:{desc:'能力：每次降挡时获得 <b>4</b> 点格挡。', cost:1}, 2:{desc:'能力：每次降挡时获得 <b>4</b> 点格挡，且每回合首次降挡时抽 1 张牌。', cost:1} },
    redline:        { 1:{desc:'能力：3挡时格挡不受减损。每回合开始若处于3挡，抽 <b>1</b> 张牌并获得 <b>1</b> 点能量。', cost:3}, 2:{desc:'能力：3挡时格挡不受减损。每回合开始若处于3挡，抽 <b>2</b> 张牌并获得 <b>1</b> 点能量。', cost:3} },
    race_instinct:  { 1:{desc:'能力：每次升挡获得 1 点势头（上限 <b>5</b>）。', cost:2}, 2:{desc:'能力：每次升挡获得 1 点势头（上限 <b>5</b>），且每回合首次升挡时抽 1 张牌。', cost:2} },
    full_throttle:  { 1:{desc:'能力：攻击牌伤害 +<b>2</b>；升挡回合攻击牌改为 +<b>4</b>。', cost:2}, 2:{desc:'能力：攻击牌伤害 +<b>2</b>；升挡回合攻击牌改为 +<b>5</b>。', cost:2} },
    overload:       { 1:{desc:'获得 1 层超载（受伤时+1格挡，上限 <b>4</b> 层），抽 2 张牌。', cost:2}, 2:{desc:'获得 <b>2</b> 层超载（上限 <b>4</b> 层），抽 2 张牌。', cost:2} },
    // ── 射手卡牌升级 ──
    ar_shoot:       { 1:{desc:'造成 <b>5</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1}, 2:{desc:'<b>0费</b>。造成 <b>3</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:0} },
    ar_dodge:       { 1:{desc:'获得 <b>6</b> 点格挡，获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'获得 <b>6</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:1} },
    ar_aim:         { 1:{desc:'获得 <b>3</b> 点蓄力。', cost:0}, 2:{desc:'获得 <b>3</b> 点蓄力，抽 <b>1</b> 张牌。', cost:0} },
    ar_sprint:      { 1:{desc:'获得 <b>5</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', cost:1}, 2:{desc:'<b>0费</b>。获得 <b>3</b> 点格挡，获得 <b>1</b> 点蓄力，抽 <b>1</b> 张牌。', cost:0} },
    ar_charge_shot: { 1:{desc:'造成 <b>6</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>6</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>4</b> 点伤害。', cost:1} },
    ar_vuln_arrow:  { 1:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害，施加 <b>2</b> 层易伤，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:1} },
    ar_double_shot: { 1:{desc:'造成 <b>4</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于 2 次）。', cost:1}, 2:{desc:'造成 <b>5</b> 点伤害 2 次，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于 2 次）。', cost:1} },
    ar_block_charge:{ 1:{desc:'获得等于当前蓄力×<b>3</b> 的格挡，然后获得 <b>1</b> 点蓄力。', cost:1}, 2:{desc:'获得等于当前蓄力×<b>3</b> 的格挡，然后获得 <b>2</b> 点蓄力。', cost:1} },
    ar_roll:        { 1:{desc:'获得 <b>13</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:2}, 2:{desc:'<b>1费</b>。获得 <b>10</b> 点格挡，获得 <b>2</b> 点蓄力。', cost:1} },
    ar_pierce:      { 1:{desc:'造成 <b>10</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害。', cost:2}, 2:{desc:'造成 <b>10</b> 点伤害，无视目标格挡，消耗全部蓄力，每消耗 1 点额外造成 <b>4</b> 点伤害。', cost:2} },
    ar_swap:        { 1:{desc:'丢弃手牌中任意 1 张牌，抽 <b>2</b> 张牌，获得 <b>2</b> 点蓄力。', cost:0}, 2:{desc:'丢弃手牌中任意 1 张牌，抽 <b>3</b> 张牌，获得 <b>2</b> 点蓄力。', cost:0} },
    ar_rapid_fire:  { 1:{desc:'造成 <b>5</b> 点伤害 3 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 3 次）。', cost:2}, 2:{desc:'<b>1费</b>。造成 <b>4</b> 点伤害 3 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全部 3 次）。', cost:1} },
    ar_wind_step:   { 1:{desc:'获得 <b>6</b> 点格挡，获得 <b>1</b> 点蓄力。本回合下一张攻击牌费用 -1。', cost:1}, 2:{desc:'获得 <b>6</b> 点格挡，获得 <b>2</b> 点蓄力。本回合下一张攻击牌费用 -1。', cost:1} },
    ar_arrow_rain:  { 1:{desc:'对所有敌人造成 <b>4</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', cost:2}, 2:{desc:'对所有敌人造成 <b>5</b> 点伤害 <b>2</b> 次，消耗全部蓄力，每消耗 1 点额外造成 <b>2</b> 点伤害（作用于全体每次）。', cost:2} },
    ar_full_charge: { 1:{desc:'<b>仅当蓄力满（≥上限）时可打出。</b>消耗全部蓄力，造成 <b>60</b> 点伤害。', cost:1}, 2:{desc:'<b>仅当蓄力 ≥ 4 时可打出。</b>消耗全部蓄力，造成 <b>60</b> 点伤害。', cost:1} },
    ar_gale:        { 1:{desc:'获得 <b>8</b> 点格挡，获得 <b>2</b> 点蓄力，抽 <b>1</b> 张牌。消耗。', cost:1}, 2:{desc:'获得 <b>8</b> 点格挡，获得 <b>3</b> 点蓄力，抽 <b>2</b> 张牌。消耗。', cost:1} },
    ar_pierce_all:  { 1:{desc:'对所有敌人造成 <b>10</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', cost:2}, 2:{desc:'<b>1费</b>。对所有敌人造成 <b>8</b> 点伤害，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于所有敌人）。', cost:1} },
    ar_instinct:    { 1:{desc:'永久：每回合开始时，获得 <b>2</b> 点蓄力（不超过上限）。', cost:2}, 2:{desc:'<b>1费</b>。永久：每回合开始时，获得 <b>2</b> 点蓄力（不超过上限）。', cost:1} },
    ar_cap_up:      { 1:{desc:'永久：蓄力上限提升至 <b>8</b>（原为5）。立即获得 <b>4</b> 点蓄力。', cost:2}, 2:{desc:'<b>1费</b>。永久：蓄力上限提升至 <b>8</b>（原为5）。立即获得 <b>4</b> 点蓄力。', cost:1} },
    ar_ultimate:    { 1:{desc:'造成 <b>7</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于全部 4 次）。', cost:3}, 2:{desc:'<b>2费</b>。造成 <b>6</b> 点伤害 4 次，消耗全部蓄力，每消耗 1 点额外造成 <b>3</b> 点伤害（作用于全部 4 次）。', cost:2} },
    // ── Brute 卡牌升级 ──
    strike:       { 1:{desc:'造成 <b>9</b> 点伤害。', cost:1}, 2:{desc:'造成 <b>12</b> 点伤害。', cost:1} },
    defend:       { 1:{desc:'获得 <b>8</b> 点格挡。', cost:1}, 2:{desc:'获得 <b>11</b> 点格挡。', cost:1} },
    bash:         { 1:{desc:'造成 <b>10</b> 点伤害并施加 <b>3</b> 层易伤。', cost:2}, 2:{desc:'造成 <b>10</b> 点伤害并施加 <b>3</b> 层易伤。<b>费用降为 1。</b>', cost:1} },
    clash:        { 1:{desc:'若手牌全为攻击牌，造成 <b>18</b> 点伤害，否则 <b>8</b> 点。', cost:0}, 2:{desc:'若手牌全为攻击牌，造成 <b>22</b> 点伤害，否则 <b>10</b> 点。', cost:0} },
    pommel:       { 1:{desc:'造成 <b>9</b> 点伤害，摸 <b>2</b> 张牌。', cost:1}, 2:{desc:'造成 <b>9</b> 点伤害，摸 <b>2</b> 张牌。<b>费用降为 0。</b>', cost:0} },
    shrug:        { 1:{desc:'获得 <b>11</b> 点格挡，摸 1 张牌。', cost:1}, 2:{desc:'获得 <b>11</b> 点格挡，摸 <b>2</b> 张牌。', cost:1} },
    armaments:    { 1:{desc:'获得 <b>5</b> 点格挡，并升级手牌中 <b>1</b> 张牌（本战斗有效）。', cost:1}, 2:{desc:'获得 <b>5</b> 点格挡，并升级手牌中 <b>所有</b> 牌（本战斗有效）。', cost:1} },
    inflame:      { 1:{desc:'永久获得 <b>3</b> 层力量。', cost:1}, 2:{desc:'永久获得 <b>3</b> 层力量。<b>费用降为 0。</b>', cost:0} },
    ironwave:     { 1:{desc:'获得 <b>5+力量</b> 格挡，造成等量伤害。<b>力量加成翻倍计入。</b>', cost:1}, 2:{desc:'获得 <b>7+力量</b> 格挡，造成等量伤害。力量加成翻倍计入。', cost:1} },
    thunderclap:  { 1:{desc:'对所有敌人造成 <b>7</b> 点伤害并施加 1 层易伤。', cost:1}, 2:{desc:'对所有敌人造成 <b>7</b> 点伤害并施加 <b>2</b> 层易伤。', cost:1} },
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

    // 层1：轻快和弦底音（C大调）
    const bassFreqs = [130.8, 196, 261.6]; // C3 G3 C4
    const bassOscs = bassFreqs.map((f, idx) => {
      const o = this._osc(ctx, 'triangle', f);
      const g = this._gain(ctx, 0.05);
      const lfo = this._osc(ctx, 'sine', 0.4 + idx * 0.15);
      const lg = this._gain(ctx, 1.2);
      lfo.connect(lg); lg.connect(g.gain);
      o.connect(g); g.connect(this._bgmGain);
      o.start(); lfo.start();
      return [o, lfo];
    });

    // 层2：明亮和声垫（C大调三和弦）
    const padFreqs = [261.6, 329.6, 392, 523.3]; // C4 E4 G4 C5
    const padOscs = padFreqs.map(f => {
      const o = this._osc(ctx, 'sine', f);
      const g = this._gain(ctx, 0.025);
      const lfo = this._osc(ctx, 'sine', 0.6 + Math.random() * 0.3);
      const lg = this._gain(ctx, 0.8);
      lfo.connect(lg); lg.connect(g.gain);
      o.connect(g); g.connect(this._bgmGain);
      o.start(); lfo.start();
      return [o, lfo];
    });

    this._bgmNodes = [...bassOscs.flat(), ...padOscs.flat()];

    // 层3：跳跃旋律（C大调，活泼节奏）
    const scale = [261.6, 293.7, 329.6, 349.2, 392, 440, 493.9, 523.3]; // C大调
    const melodyPattern = [4, 7, 6, 4, 2, 4, 5, 7, 4, 2, 0, 2, 4, 5, 4, 2]; // 跳跃旋律
    const bassPattern  = [0, 0, 3, 3, 4, 4, 2, 2]; // 伴奏低音
    let melodyStep = 0, bassStep = 0;

    this._bgmInterval = setInterval(() => {
      if (!this._bgmPlaying) return;
      const ctx2 = this._getCtx(), t = ctx2.currentTime;

      // 旋律音符（方波+低通，轻快感）
      const noteFreq = scale[melodyPattern[melodyStep % melodyPattern.length]];
      melodyStep++;
      const osc = this._osc(ctx2, 'square', noteFreq);
      const filt = this._filter(ctx2, 'lowpass', 2000);
      const g = this._gain(ctx2, 0);
      g.gain.linearRampToValueAtTime(0.05, t + 0.02);
      g.gain.setValueAtTime(0.05, t + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(filt); filt.connect(g); g.connect(this._bgmGain);
      osc.start(t); osc.stop(t + 0.28);

      // 每两拍一个伴奏低音
      if (melodyStep % 2 === 0) {
        const bf = scale[bassPattern[bassStep % bassPattern.length]] / 2;
        bassStep++;
        const bo = this._osc(ctx2, 'triangle', bf);
        const bg = this._gain(ctx2, 0);
        bg.gain.linearRampToValueAtTime(0.08, t + 0.03);
        bg.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        bo.connect(bg); bg.connect(this._bgmGain);
        bo.start(t); bo.stop(t + 0.5);
      }

      // 每四拍加一个高音装饰
      if (melodyStep % 4 === 0) {
        const hiFreq = scale[4] * 2; // G5
        const hi = this._osc(ctx2, 'sine', hiFreq);
        const hg = this._gain(ctx2, 0);
        hg.gain.linearRampToValueAtTime(0.028, t + 0.01);
        hg.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        hi.connect(hg); hg.connect(this._bgmGain);
        hi.start(t); hi.stop(t + 0.14);
      }

      // 每八拍加一个轻鼓点（噪声冲击）
      if (melodyStep % 8 === 0) {
        const buf = ctx2.createBuffer(1, ctx2.sampleRate * 0.08, ctx2.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const src = ctx2.createBufferSource();
        src.buffer = buf;
        const ng = ctx2.createGain(); ng.gain.value = 0.06;
        const nf = this._filter(ctx2, 'bandpass', 200);
        src.connect(nf); nf.connect(ng); ng.connect(this._bgmGain);
        src.start(t);
      }
    }, 280); // 280ms节拍，约107BPM，轻快活泼
  },

  startBgmCombat() {
    this._stopBgm();
    this._bgmMode = 'combat';
    if (this._customBgmCombat) { this._playCustomBgm(this._customBgmCombat); return; }
    const ctx = this._getCtx();
    this._bgmPlaying = true;

    // 层1：低频持续底音（A1）
    const bass = this._osc(ctx, 'sawtooth', 55);
    const bf = this._filter(ctx, 'lowpass', 150);
    const bg = this._gain(ctx, 0.12);
    const blfo = this._osc(ctx, 'sine', 0.5);
    const blg = this._gain(ctx, 4);
    blfo.connect(blg); blg.connect(bass.frequency);
    bass.connect(bf); bf.connect(bg); bg.connect(this._bgmGain);
    bass.start(); blfo.start();

    // 层2：紧张弦乐垫（A2, E3, C3）
    const strFreqs = [110, 164.8, 130.8];
    const strOscs = strFreqs.map((f, i) => {
      const o = this._osc(ctx, 'sawtooth', f);
      const filt = this._filter(ctx, 'bandpass', f * 2, 1.5);
      const g = this._gain(ctx, 0.035);
      const lfo = this._osc(ctx, 'sine', 5 + i);
      const lg = this._gain(ctx, 1.5);
      lfo.connect(lg); lg.connect(o.frequency);
      o.connect(filt); filt.connect(g); g.connect(this._bgmGain);
      o.start(); lfo.start();
      return [o, lfo];
    });

    this._bgmNodes = [bass, bf, blfo, ...strOscs.flat()];

    // 层3：鼓点节奏 + 旋律
    const bpm = 130;
    const beatMs = (60 / bpm) * 1000;
    let beat = 0;
    // 战斗旋律（小调五声）
    const combatScale = [220, 246.9, 261.6, 293.7, 329.6, 349.2, 392, 440];
    const combatMelody = [0, 0, 2, 4, 3, 1, 0, 5, 4, 2, 0, 1, 3, 2, 0, 4];
    let melStep = 0;

    this._bgmInterval = setInterval(() => {
      if (!this._bgmPlaying) return;
      const ctx2 = this._getCtx(), t = ctx2.currentTime;
      beat++;

      // 低音鼓（第1、3拍）
      if (beat % 4 === 1 || beat % 4 === 3) {
        const { src: ns, out: nf } = this._noise(ctx2, 0.18, 180);
        const ng = this._gain(ctx2, 0);
        ng.gain.setValueAtTime(0.35, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        const kick = this._osc(ctx2, 'sine', 80);
        const kg = this._gain(ctx2, 0.3);
        kg.gain.setValueAtTime(0.3, t); kg.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        kick.frequency.setValueAtTime(120, t); kick.frequency.exponentialRampToValueAtTime(40, t + 0.1);
        nf.connect(ng); ng.connect(this._bgmGain);
        kick.connect(kg); kg.connect(this._bgmGain);
        ns.start(t); ns.stop(t + 0.18);
        kick.start(t); kick.stop(t + 0.15);
      }

      // 军鼓（第2、4拍）
      if (beat % 4 === 2 || beat % 4 === 0) {
        const { src: ns, out: nf } = this._noise(ctx2, 0.12, 4000);
        const ng = this._gain(ctx2, 0);
        ng.gain.setValueAtTime(0.22, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        const snare = this._osc(ctx2, 'triangle', 200);
        const sg = this._gain(ctx2, 0.1);
        sg.gain.setValueAtTime(0.1, t); sg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        nf.connect(ng); ng.connect(this._bgmGain);
        snare.connect(sg); sg.connect(this._bgmGain);
        ns.start(t); ns.stop(t + 0.12);
        snare.start(t); snare.stop(t + 0.08);
      }

      // 高帽（每拍）
      const { src: hs, out: hf } = this._noise(ctx2, 0.04, null);
      const hfilt = this._filter(ctx2, 'highpass', 8000);
      const hg = this._gain(ctx2, beat % 2 === 0 ? 0.06 : 0.03);
      hg.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      hs.connect(hfilt); hfilt.connect(hg); hg.connect(this._bgmGain);
      hs.start(t); hs.stop(t + 0.04);

      // 战斗旋律（每2拍出一个音）
      if (beat % 2 === 1) {
        const noteFreq = combatScale[combatMelody[melStep % combatMelody.length]];
        melStep++;
        const mo = this._osc(ctx2, 'square', noteFreq);
        const mf = this._filter(ctx2, 'lowpass', 1200);
        const mg = this._gain(ctx2, 0);
        mg.gain.linearRampToValueAtTime(0.06, t + 0.02);
        mg.gain.setValueAtTime(0.06, t + beatMs / 1000 * 0.6);
        mg.gain.exponentialRampToValueAtTime(0.001, t + beatMs / 1000 * 1.8);
        mo.connect(mf); mf.connect(mg); mg.connect(this._bgmGain);
        mo.start(t); mo.stop(t + beatMs / 1000 * 1.8);
      }

      // 低音线（每4拍）
      if (beat % 4 === 1) {
        const bassNote = combatScale[0] / 2;
        const bo = this._osc(ctx2, 'sawtooth', bassNote);
        const bfilt = this._filter(ctx2, 'lowpass', 300);
        const bgg = this._gain(ctx2, 0);
        bgg.gain.linearRampToValueAtTime(0.15, t + 0.02);
        bgg.gain.setValueAtTime(0.15, t + beatMs / 1000 * 1.5);
        bgg.gain.exponentialRampToValueAtTime(0.001, t + beatMs / 1000 * 3.5);
        bo.connect(bfilt); bfilt.connect(bgg); bgg.connect(this._bgmGain);
        bo.start(t); bo.stop(t + beatMs / 1000 * 3.5);
      }
    }, beatMs / 2);
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
      floor:0,act:1,gold:99,deck:[...char.startingDeck],relics:[],pendingRelic:null,potions:[null,null,null],map:MapGen.generate(1),currentNodeId:null,combat:null
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
  // 指南针直路地图：7~10个节点，一条直路，精英5%/普通35%/商店25%/市井35%，最后节点必为商店
  generateCompass(){
    const nodes=[],paths=[];let idCounter=0;const floorNodes=[];
    const rng=MapGen._rng(Date.now()&0xfffff);
    // 随机决7~10个中间节点（不含起点和终点boss）
    const midCount = 7 + Math.floor(rng() * 4); // 7,8,9,10
    const totalFloors = midCount + 1; // 包含起点floor=0，中间节点floor=1..midCount，boss在floor=midCount+1
    // 起点
    const entry={id:idCounter++,type:'start',floor:0,col:2,emoji:'🚶',done:false};
    nodes.push(entry);floorNodes[0]=[entry];
    // 中间节点：每层只有一个，最后一个必为商店
    for(let f=1;f<=midCount;f++){
      let type;
      if(f===midCount){
        // 最后一个节点必为商店
        type='shop';
      } else {
        const r=rng();
        // 精英5% 普通35% 商店25% 市井35%
        if(r<0.05) type='elite';
        else if(r<0.40) type='combat';
        else if(r<0.65) type='shop';
        else type='rest';
      }
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
      const count=f===3||f===5?2:(rng()<0.5?3:2);
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
      // 每个 from 节点连接最近的 to 节点
      from.forEach(n=>{
        const sorted=[...to].sort((a,b)=>Math.abs(a.col-n.col)-Math.abs(b.col-n.col));
        paths.push({from:n.id,to:sorted[0].id});
        // 30% 概率额外连接第二近的节点，增加路线分叉
        if(sorted.length>1&&rng()<0.35)paths.push({from:n.id,to:sorted[1].id});
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
  getReachableNodes(map,currentNodeId){ return map.paths.filter(p=>p.from===currentNodeId).map(p=>p.to); },
  render(container,map,currentNodeId,onNodeClick,act=1){
    container.innerHTML='';
    const W=container.clientWidth||window.innerWidth;
    const H=container.clientHeight||(window.innerHeight-50);
    container.style.cssText='position:relative;width:100%;height:100%;overflow:hidden;';

    // ── 节点坐标计算 ──
    // 水平：5列均匀分布，加小幅随机抖动
    // 垂直：8层（0-7）均匀分布，加小幅随机抖动
    const COLS=5;
    // 缩小水平范围使路线更紧凑（使用屏幕中间 60% 宽度）
    const mapWidth=Math.min(W*0.6, 520);
    const padX=(W-mapWidth)/2;
    const padY=56;
    const usableW=mapWidth;
    const usableH=H-padY*2;
    const colW=usableW/(COLS-1); // 列间距
    const totalFloors = map.totalFloors || 7;
    const floorH=usableH/totalFloors;      // 层间距
    const nodePos={};
    map.nodes.forEach(n=>{
      // 固定抖动：用节点 id 生成确定性偏移
      const s1=Math.imul((n.id*2654435761)>>>0,0x45d9f3b)>>>0;
      const s2=Math.imul((n.id*1234567891)>>>0,0x45d9f3b)>>>0;
      // x 抖动：±colW*0.28，避免节点重叠但保持列感
      const jx=((s1%1000)/1000-0.5)*colW*0.56;
      // y 抖动：±floorH*0.22
      const jy=((s2%1000)/1000-0.5)*floorH*0.44;
      const x=Math.max(padX+10,Math.min(W-padX-10, padX+n.col*colW+jx));
      const y=Math.max(padY+10,Math.min(H-padY-10, padY+usableH*(1-n.floor/totalFloors)+jy));
      nodePos[n.id]={x,y};
    });

    // ── SVG 路线 ──
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('class','map-svg');
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
    // 已走过路径集合
    const doneNodes=new Set(map.nodes.filter(n=>n.done).map(n=>String(n.id)));
    // 绘制路径
    map.paths.forEach(p=>{
      const a=nodePos[p.from],b=nodePos[p.to];if(!a||!b)return;
      const ir=reachable.has(String(p.to));
      const isDone=doneNodes.has(String(p.from))&&doneNodes.has(String(p.to));
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
      // 所有路径统一显示为淡虚线
      const line=document.createElementNS('http://www.w3.org/2000/svg','path');
      line.setAttribute('d',d);
      line.setAttribute('stroke', isDone ? (act===2?'rgba(180,80,20,0.35)':'rgba(241,196,15,0.30)') : (act===2?'rgba(220,150,40,0.30)':'rgba(255,255,255,0.18)'));
      line.setAttribute('stroke-width','1.2');line.setAttribute('fill','none');line.setAttribute('stroke-linecap','round');
      line.setAttribute('stroke-dasharray','5,7');
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
  }
};

// ── combat.js ─────────────────────────────────────────────────────────────────
const Combat = {
  init(enemyIds){
    const run=State.run,char=run.character;char.block=0;
    const cs={player:{hp:char.hp,maxHp:char.maxHp,block:0,buffs:{...(char.buffs||{})},debuffs:{...(char.debuffs||{})}},enemies:enemyIds.map(id=>Data.makeEnemy(id)),energy:3,maxEnergy:3,hand:[],drawPile:[],discardPile:[],exhaustPile:[],turn:1,phase:'player',pendingReward:false,susuEyemaskUsed:false};
    // 赛车手：初始化档位为2（中立挡）
    if(State.run?.character?.id==='racer'){ cs.gear=2; cs._shiftedUpThisTurn=false; cs._gearLocked=false; cs._fuelSaveActive=false; cs.speed=0; cs.momentum=0; cs._gearShiftCount={}; }
    // 射手：初始化蓄力系统
    if(State.run?.character?.id==='archer'){ cs.charge=0; cs.chargeMax=5; cs._archerNextAttackDiscount=0; }
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
    run.combat=cs;    Combat.drawCards(cs, 5);
    // 高山的冲锋衣：战斗开始时重置翻倍标记（新效果：第一次获得格挡时翻倍）
    cs._jacketUsed = false;
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
    const hasSunglasses = State.run?.relics?.includes('datou_sunglasses');
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
      // 大头的墨镜：每回合最多触发一次额外抽牌（回合级别标记，回合结束时才重置）
      if(hasSunglasses && !cs._sunglassesUsedThisTurn && Math.random()<0.25){
        cs._sunglassesUsedThisTurn = true; // 本回合已触发，不再重置直到回合结束
        if(cs.drawPile.length===0&&cs.discardPile.length>0){cs.drawPile=[...cs.discardPile].sort(()=>Math.random()-0.5);cs.discardPile=[];}
        if(cs.drawPile.length>0){
          const bonusCard=cs.drawPile.shift();
          cs.hand.push(bonusCard);
          if(cs.handTokens){ cs.handTokens.push((cs.hand.length-1)+'_'+Math.random().toString(36).slice(2)); }
          const tip = document.createElement('div');
          tip.style.cssText = 'position:fixed;top:45%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.95);color:#f5c518;font-size:1.0rem;font-weight:900;padding:8px 20px;border-radius:10px;border:2px solid #f5c518;z-index:9999;pointer-events:none;box-shadow:0 0 12px rgba(245,197,24,0.4)';
          tip.textContent = '🕶️ 大头的墨镜触发！额外抽一张！';
          document.body.appendChild(tip);
          setTimeout(()=>tip.remove(), 1000);
        }
      }
    }
  },
  playCard(cardId,targetEnemyIndex,handIndexOverride){
    const cs=State.run.combat;if(cs.phase!=='player')return false;
    // 优先使用调用方传入的精确索引（闭包捕获），避免同名牌时 indexOf 返回错误位置
    const handIndex=(handIndexOverride!==undefined&&handIndexOverride>=0&&handIndexOverride<cs.hand.length&&cs.hand[handIndexOverride]===cardId)?handIndexOverride:cs.hand.indexOf(cardId);if(handIndex===-1)return false;
    const def=Data.cards[cardId];if(!def)return false;
    // 放大镜：用手牌位置索引精确匹配唯一那张牌
    const isMagnifierCard = cs.magnifierActive && cs.magnifierHandIndex === handIndex;
    // 醪糟水：本回合手牌费用随机化
    const laozaoKey = cardId + '_' + handIndex;
    const isLaozaoCard = cs.laozaoActive && cs.laozaoCosts && laozaoKey in cs.laozaoCosts;
    // 升级后的费用（从 handUpgrades 读取升级等级，再查 Data.upgrades 获取费用）
    const _playCardLv = cs.handUpgrades ? (cs.handUpgrades[handIndex] || 0) : 0;
    let _baseCost = def.cost;
    if(_playCardLv > 0){
      const _upgCostDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][_playCardLv];
      if(_upgCostDef && _upgCostDef.cost !== undefined) _baseCost = _upgCostDef.cost;
    }
    let effectiveCost = isMagnifierCard ? 0 : (isLaozaoCard ? cs.laozaoCosts[laozaoKey] : _baseCost);
    // 赛车手超车外线：3挡时免费
    if(cardId==='overtake' && (cs.gear||2)>=3) effectiveCost=0;
    // 赛车手节油行驶：本回合技能牌费用-1（最低0）
    if(cs._fuelSaveActive && def.type==='skill' && effectiveCost>0) effectiveCost=Math.max(0,effectiveCost-1);
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
    if(def.type!=='power')cs.discardPile.push(cardId);
    // 记录能力牌的升级等级（用于遗物联动）
    if(def.type==='power' && _upgradeLevel > 0){
      if(!cs.powerUpgrades) cs.powerUpgrades = {};
      cs.powerUpgrades[cardId] = Math.max(cs.powerUpgrades[cardId] || 0, _upgradeLevel);
    }
    // 大头的哨子：记录本回合是否打出过防御牌（type==='skill'）
    if(def.type==='skill'){ cs.defensePlayedThisTurn = true; }
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
    if(cs.laozaoActive){ cs.laozaoActive=false; cs.laozaoCosts={}; }
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
        const actionName = e.actions[e.actionIndex % e.actions.length];
        if(!Combat._isDefenseAction(e.id, actionName)){
          Data.enemies[e.id].doAction(cs,i);
        }
        Combat._tickDebuffs(e);
      }
    });
    } // end spike_shoes else
    if(cs.player.hp<=0){
      // 护身符：第一次被致死时以1HP存活
      const run2=State.run;
      if(run2.relics?.includes('amulet')&&!run2.amuletUsed){
        cs.player.hp=1;run2.character.hp=1;run2.amuletUsed=true;
        const tip=document.createElement('div');
        tip.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,20,60,0.95);color:#a8d8ff;font-size:1.4rem;font-weight:900;padding:14px 32px;border-radius:16px;border:2px solid #60a8ff;z-index:9999;pointer-events:none;text-shadow:0 0 10px rgba(96,168,255,0.9);box-shadow:0 0 28px rgba(96,168,255,0.5),0 0 60px rgba(96,168,255,0.2)';
        tip.textContent='🔮 水晶球触发！命运庇护，以 1 HP 存活！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(),2000);
      } else {
        cs.player.hp=0;cs.phase='dead';Combat._onDeath();return;
      }
    }
    cs.turn++;cs.phase='player';cs.energy=cs.maxEnergy;
    // 王微的手绳：回合开始时，先将格挡截断为最多3点（携带上限），再加3，静默触发
    if(State.run?.relics?.includes('wangwei_bracelet')){
      cs.player.block = Math.min(cs.player.block||0, 3) + 3;

    } else {
      cs.player.block=0;
    }
    cs._sunglassesUsedThisTurn = false; // 大头墨镜回合级标记重置
    cs._speedDrawnThisTurn = false; // 速度感升挡抽牌回合级标记重置
    cs._glassesBlockedThisTurn = false; // 王微眼镜回合级标记重置
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
        {val:40, name:'加速中',   desc:'攻击牌伤害 +1',               color:'#f9ca24', icon:'⚡'},
        {val:60, name:'高速行驶', desc:'每次升挡额外抽 1 张牌（每回合限1次）', color:'#ff9f43', icon:'🏎️'},
        {val:80, name:'极速状态', desc:'攻击牌伤害提升至 +3（叠加）',  color:'#ff6b6b', icon:'🔥'},
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
    // 高山的雪镜：每回合开始 50% 概率获得 1 点额外能量
    if(State.run?.relics?.includes('gaoshan_sunglasses') && Math.random()<0.50){
      cs.energy += 1;
      const _snowTip=document.createElement('div');_snowTip.style.cssText='position:fixed;top:46%;left:50%;transform:translate(-50%,-50%);background:rgba(20,20,40,0.92);color:#a8e6ff;font-size:1rem;font-weight:800;padding:8px 20px;border-radius:10px;border:1.5px solid #a8e6ff;z-index:9999;pointer-events:none;';_snowTip.textContent='🥽 雪镜触发！+1 能量！';document.body.appendChild(_snowTip);setTimeout(()=>_snowTip.remove(),1200);
    }
    // ── 射手蓄力系统回合开始处理 ──
    if(State.run?.character?.id==='archer'){
      // 猜手直觉：每回合开始获得 1 点蓄力
      if((cs.player.buffs.archer_instinct||0)>0){ Combat.archerGainCharge(cs,1); }
      // 重置攻击牌费用折扣
      cs._archerNextAttackDiscount=0;
    }
    // 小九的六弦琴：每回合额外多抄 1 张牌
    const guitarDraw = (State.run.relics && State.run.relics.includes('xiaojiu_guitar')) ? 1 : 0;
    Combat.drawCards(cs, 5 + guitarDraw);
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
  dealDamage(cs,targetIndex,amount){ const enemy=cs.enemies[targetIndex];if(!enemy||enemy._dead)return 0; let dmg=amount+(cs.player.buffs.strength||0);
    // 速度感攻击加成：40-79=+1，>=80=+3
    if(State.run?.character?.id==='racer'){ const _spd=cs.speed||0; if(_spd>=80) dmg+=3; else if(_spd>=40) dmg+=1; } if((enemy.debuffs.vulnerable||0)>0)dmg=Math.floor(dmg*1.5); if((cs.player.debuffs.weak||0)>0)dmg=Math.floor(dmg*0.75); const absorbed=Math.min(enemy.block,dmg);enemy.block=Math.max(0,enemy.block-absorbed);const actualDmg=dmg-absorbed;enemy.hp-=actualDmg;
    // 大头的西班牙语书：记录本回合是否对敌人造成过实际伤害
    if(actualDmg > 0) cs.dealtDamageThisTurn = true;
    return actualDmg; },
  enemyAttack(cs,enemyIndex,amount){ const enemy=cs.enemies[enemyIndex];if(!enemy||enemy._dead)return 0; let dmg=amount+(enemy.buffs.strength||0); if((enemy.debuffs.weak||0)>0)dmg=Math.floor(dmg*0.75); if((cs.player.debuffs.vulnerable||0)>0)dmg=Math.floor(dmg*1.5);
    // 王微的眼镜：20%概率完全无视本次伤害（多段攻击中触发后，本轮后续攻击也全部跳过）
    const run=State.run;
    if(run?.relics?.includes('wangwei_glasses') && (cs._glassesBlockedThisTurn || Math.random()<0.20)){
      if(!cs._glassesBlockedThisTurn){
        cs._glassesBlockedThisTurn=true;
        setTimeout(()=>{
          const tip=document.createElement('div');
          tip.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,80,0.95);color:#a8d8ff;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #60a8ff;z-index:9999;pointer-events:none;text-shadow:0 0 8px rgba(96,168,255,0.8)';
          tip.textContent='👓 王微的眼镜！伤害被完全无视！';
          document.body.appendChild(tip);
          setTimeout(()=>tip.remove(),1800);
        },50);
      }
      return 0;
    }
    const absorbed=Math.min(cs.player.block,dmg);cs.player.block=Math.max(0,cs.player.block-absorbed);const actualPlayerDmg=dmg-absorbed;cs.player.hp-=actualPlayerDmg;
    if(actualPlayerDmg>0){
      // 超载：受到伤害时额外获得格挡（每层+1，最多3层）
      const overloadStacks=cs.player.buffs?.overload||0;
      if(overloadStacks>0){ cs.player.block=(cs.player.block||0)+overloadStacks; }
      setTimeout(()=>Audio.playHurt(),50);
      cs._tookDamageThisCombat=true;
      // 文豪的羽毛：生命首次低于最大生命值50%时立刻回满（全局仅一次，一击致死不触发）
      if(run?.relics?.includes('wenhao_feather') && !run._featherUsed &&
         cs.player.hp > 0 && cs.player.hp < cs.player.maxHp * 0.5){
        run._featherUsed = true;
        cs.player.hp = cs.player.maxHp;
        run.character.hp = cs.player.maxHp;
        setTimeout(()=>{
          const tip=document.createElement('div');
          tip.style.cssText='position:fixed;top:30%;left:50%;transform:translate(-50%,-50%);background:rgba(10,30,10,0.95);color:#a0ffb0;font-size:1.2rem;font-weight:900;padding:12px 28px;border-radius:14px;border:2px solid #50e070;z-index:9999;pointer-events:none;box-shadow:0 0 16px rgba(80,224,112,0.6)';
          tip.textContent='🪶 文豪的羽毛！生命值回满！';
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
    cs.player.block = (cs.player.block||0) + finalAmount;
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
  _tickDebuffs(entity){ Object.keys(entity.debuffs||{}).forEach(k=>{entity.debuffs[k]=Math.max(0,entity.debuffs[k]-1);}); },
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
      // 文豪的红领巾：战斗全程未受任何伤害，永久+3最大HP
      if(run.relics?.includes('wenhao_scarf') && !run.combat?._tookDamageThisCombat){
        run.character.maxHp += 3;
        run.character.hp = Math.min(run.character.hp + 3, run.character.maxHp);
        if(run.combat) run.combat.player.hp = run.character.hp;
        const tip = document.createElement('div');
        tip.style.cssText = 'position:fixed;top:35%;left:50%;transform:translate(-50%,-50%);background:rgba(20,40,10,0.95);color:#e8ff80;font-size:1.1rem;font-weight:900;padding:10px 24px;border-radius:12px;border:2px solid #c8e060;z-index:9999;pointer-events:none;box-shadow:0 0 14px rgba(200,224,96,0.5)';
        tip.textContent = '👔 文豪的红领巾！最大HP +3！';
        document.body.appendChild(tip);
        setTimeout(()=>tip.remove(), 2200);
      }
      // 王微的碗：战斗结束后回复5点HP
      if(run.relics?.includes('wangwei_bowl')){
        run.character.hp=Math.min(run.character.hp+5,run.character.maxHp);
        if(run.combat)run.combat.player.hp=run.character.hp;
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
          // 按稀有度抽取：普通60% / 稀有30% / 罕见10%
          // 普通：乌龙茶  稀有：醪糟水  罕见：（暂无）
          const tierRoll = Math.random();
          let droppedPotion = null;
          if(tierRoll < 0.60){
            // 普通60%：乌龙茶、面包、coco洗发水三选一
            const commonRoll = Math.random();
            droppedPotion = commonRoll < 0.333 ? 'oolong' : commonRoll < 0.667 ? 'bread' : 'coco_shampoo';
          } else if(tierRoll < 0.90){
            droppedPotion = 'laozao'; // 稀有30%
          } else {
            droppedPotion = null; // 罕见10%（暂无，不掉落）
          }
          if(droppedPotion){
            run.potions[emptySlot] = droppedPotion;
            const pData = Data.potions[droppedPotion];
            const borderColor = droppedPotion === 'laozao' ? 'rgba(127,90,240,0.6)' : 'rgba(210,160,50,0.6)';
            const toast = document.createElement('div');
            toast.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.88);color:#fff;padding:10px 22px;border-radius:12px;font-size:1.1rem;z-index:9999;pointer-events:none;border:1px solid ${borderColor};animation:bounceIn 0.4s ease`;
            toast.textContent = `获得了 ${pData.emoji} ${pData.name}！`;
            document.body.appendChild(toast);
            setTimeout(()=>toast.remove(), 2500);
          }
        }
      }
    }
    // 战斗后遗物掉落：小怪10% / 精英25% / Boss90%
    {
      const dropRate = node ? (node.type==='boss' ? 0.90 : node.type==='elite' ? 0.25 : 0.10) : 0;
      if(Math.random() < dropRate){
        // 按等级权重随机：普通60% / 稀有30% / 罕见10%
        const owned = run.relics || [];
        const tierRoll = Math.random();
        let targetTier = tierRoll < 0.60 ? 'common' : tierRoll < 0.90 ? 'rare' : 'epic';
        // 只从 source==='battle' 的遗物中抽取（event/shop/boss 专属遗物不在此池中）
        // actRestrict 字段限制遗物只在特定 act 掉落
        const currentAct = run.act || 1;
        let pool = Data.battleRelics.filter(r => r.source === 'battle' && r.tier === targetTier && !owned.includes(r.id) && (!r.actRestrict || r.actRestrict === currentAct));
        // 若该等级无可用遗物，降级查找
        if(pool.length === 0) pool = Data.battleRelics.filter(r => r.source === 'battle' && r.tier === 'rare' && !owned.includes(r.id) && (!r.actRestrict || r.actRestrict === currentAct));
        if(pool.length === 0) pool = Data.battleRelics.filter(r => r.source === 'battle' && r.tier === 'common' && !owned.includes(r.id) && (!r.actRestrict || r.actRestrict === currentAct));
        if(pool.length > 0){
          const picked = pool[Math.floor(Math.random() * pool.length)];
          run.pendingRelic = picked.id;  // 存入待领取，在奖励界面展示
        }
      }
    }
    State.saveRun(0);
    if(node&&node.type==='boss'){
      const run=State.run;
      // 记录 boss 胜利后应跳转的目标，奖励流程结束后再跳转
      if(run.act===1){
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
  _getFtBonus(cs){
    if((cs.player.buffs.full_throttle||0) <= 0) return 0;
    const lv = Combat._getCardUpgradeLevel(cs, 'full_throttle');
    if(lv >= 2) return cs._shiftedUpThisTurn ? 5 : 2;
    if(lv >= 1) return cs._shiftedUpThisTurn ? 4 : 2;
    return cs._shiftedUpThisTurn ? 3 : 1;
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
        const momentumCap = _raceLv >= 1 ? 5 : 4;
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
        const blkPerStack = _antiSkidLv >= 1 ? 4 : 3;
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

  _gearShiftInteractive(cs, cardId){
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
    if(canUp) overlay.appendChild(makeBtn(`↑ 升1档（→${g+1}挡）`,'#ff7d7d',()=>{ cs._gearShiftCount[key]=(cs._gearShiftCount[key]||0)+1; Combat._changeGear(cs,1); }));
    const cancelBtn=document.createElement('button');
    cancelBtn.style.cssText='background:rgba(20,20,40,0.97);color:#888;font-size:1rem;font-weight:700;padding:12px 24px;border-radius:12px;border:1.5px solid #555;cursor:pointer;';
    cancelBtn.textContent='取消';
    cancelBtn.onclick=()=>overlay.remove();
    overlay.appendChild(cancelBtn);
    if(canDown) overlay.appendChild(makeBtn(`↓ 降1档（→${g-1}挡）`,'#7dccff',()=>{ cs._gearShiftCount[key]=(cs._gearShiftCount[key]||0)+1; Combat._changeGear(cs,-1); }));
    document.body.appendChild(overlay);
  },

  _racePredictInteractive(cs){
    const top3=[...cs.drawPile.slice(0,3)];
    if(top3.length===0){ Combat.drawCards(cs,1); return; }
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
    };
    overlay.appendChild(confirmBtn);
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

// ── ui.js ─────────────────────────────────────────────────────────────────────
const DAYAN_IMG_SRC = '/manus-storage/img_03_574k_632f1438.png';
const WANGWEI_IMG_SRC = '/manus-storage/wangwei_sprite_nobg_90111a38.png';
const IRON_STOMACH_IMG_SRC = '/manus-storage/img_00_572k_79c2d105.png';
const UI = {
  _selectedCard:null, _drag:null,
  app(){ return document.getElementById('app'); },
  renderCard(cardId, overrideCost, upgradeLevel){
    const def=Data.cards[cardId];if(!def)return document.createElement('div');
    const el=document.createElement('div');el.className='card';el.dataset.cardId=cardId;el.dataset.type=def.type;
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
    if(cs && isRacer){
      const g = cs.gear || 2;
      const atkMul = [0, 0.8, 1.0, 1.3][g];
      const blkMul = [0, 1.3, 1.0, 0.7][g];
      const spd = cs.speed || 0;
      const ft = (cs.player?.buffs?.full_throttle||0) > 0;
      const ftBonus = Combat._getFtBonus(cs);
      const gearLabel = ['','<span style="color:#7dccff">1挡</span>','<span style="color:#e0e0e0">2挡</span>','<span style="color:#ff7d7d">3挡</span>'][g];
      const RACER_CARDS = {
        gear_strike: ()=>{ const d=Math.floor(6*atkMul)+ftBonus; return `造成 <b>${d}</b> 点伤害。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_defend: ()=>{ const d=Math.floor(5*blkMul); const rl=(cs.player?.buffs?.redline||0)>0; return `获得 <b>${rl&&g===3?5:d}</b> 点格挡。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_brake:  ()=>{ const d=Math.floor(8*atkMul)+ftBonus; const extra=g>=3?' <span style="color:#f9ca24">并施加 2 层「减速」</span>':''; return `造成 <b>${d}</b> 点伤害。${extra}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        nitro_boost: ()=>{ const d=g>=3?16:Math.floor(12*atkMul)+ftBonus; const note=g>=3?'<span style="color:#f9ca24">已处于最高挡，改为直接造成 16 伤</span>':'<span style="opacity:0.8">升至 3 挡</span>'; return `造成 <b>${d}</b> 点伤害。${note}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        collision_block: ()=>{ const blk=Math.floor(4*blkMul); return `获得 <b>${blk}</b> 点格挡，随后造成等同于当前格挡总量的伤害。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        drift_charge: ()=>{ const base=Math.floor(5*atkMul)+ftBonus; const extra=Math.floor(spd/10)*2; return `对所有敌人造成 <b>${base}</b> 点伤害。<br>速度感 ${spd} 点，额外 <b>+${extra}</b> 伤。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        overtake:    ()=>{ const d=Math.floor(5*atkMul)+ftBonus; const free=g>=3?'<span style="color:#7dff7d">【免费】</span>':''; return `造成 <b>${d}+${d}</b> 点伤害（两段）。${free}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        turbo_crush: ()=>{ const d=6*g; const note=g>=3?'<span style="color:#f9ca24">降至 1 挡</span>':'<span style="color:#f9ca24">降 2 挡</span>'; return `造成 <b>${d}</b> 点伤害。${note}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        pit_repair:  ()=>{ const d=Math.floor(10*blkMul); const heal=g<=2?'<span style="color:#7dff7d">额外回血 4 HP</span>':''; return `获得 <b>${d}</b> 点格挡。${heal}<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        gear_lock:   ()=>{ const d=(cs.gear||2)*3; return `本回合挡位锁定。获得 <b>${d}</b> 点格挡。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`; },
        overspeed:   ()=>{ const d=g>=3?Math.floor(10*1.3)+ftBonus:0; return g>=3?`造成 <b>${d}</b> 点伤害并降 1 挡。消耗。<br><span style="font-size:0.78em;opacity:0.8">${gearLabel}</span>`:`<span style="color:#888">当前不在 3 挡，此牌无效果。</span>`; },
      };
      if(RACER_CARDS[cardId]) desc = RACER_CARDS[cardId]();
    }
    // ── 射手：根据当前蓄力值实时计算并显示实际伤害 ──
    const isArcher = State.run?.character?.id === 'archer';
    if(cs && isArcher){
      const charge = cs.charge || 0;
      const chargeMax = cs.chargeMax || 5;
      const chargeBar = `<span style="font-size:0.72em;opacity:0.75">蓄力 ${charge}/${chargeMax}</span>`;
      const lv = upgradeLevel || 0;
      const ARCHER_CARDS = {
        ar_shoot: ()=>{
          const base = lv>=1?5:3;
          const total = base + charge*3;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×3）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_charge_shot: ()=>{
          const base = lv>=1?6:4;
          const mult = lv>=2?4:3;
          const total = base + charge*mult;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×${mult}）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_vuln_arrow: ()=>{
          const base = lv>=1?5:3;
          const mult = lv>=2?3:2;
          const vuln = lv>=1?2:1;
          const total = base + charge*mult;
          return `造成 <b>${total}</b> 点伤害（基础${base}+蓄力${charge}×${mult}），施加 ${vuln} 层易伤。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_double_shot: ()=>{
          const base = lv>=2?5:(lv>=1?4:3);
          const mult = lv>=2?3:2;
          const single = base + charge*mult;
          const total = single * 2;
          return `造成 <b>${single}</b> 点伤害 2 次（共 <b>${total}</b> 点）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_pierce: ()=>{
          const base = lv>=1?10:8;
          const mult = lv>=2?4:3;
          const total = base + charge*mult;
          return `造成 <b>${total}</b> 点伤害（无视格挡）（基础${base}+蓄力${charge}×${mult}）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_rapid_fire: ()=>{
          const base = lv>=1?5:4;
          const single = base + charge*2;
          const total = single * 3;
          return `造成 <b>${single}</b> 点伤害 3 次（共 <b>${total}</b> 点）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_arrow_rain: ()=>{
          const base = lv>=2?5:(lv>=1?4:3);
          const single = base + charge*2;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = single * 2 * enemyCount;
          return `对所有敌人造成 <b>${single}</b> 点伤害 2 次（共 <b>${total}</b> 点，${enemyCount}个目标）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_full_charge: ()=>{
          const threshold = lv>=2?4:chargeMax;
          const dmg = lv>=1?60:50;
          const canFire = charge >= threshold;
          if(canFire) return `消耗全部蓄力，造成 <b>${dmg}</b> 点伤害。<br><span style="color:#f9ca24">✅ 蓄力已满足（${charge}/${threshold}）</span>`;
          return `<span style="color:#ff7d7d">❌ 需要蓄力 ≥ ${threshold}（当前 ${charge}）</span>，造成 <b>${dmg}</b> 点伤害。<br>${chargeBar}`;
        },
        ar_pierce_all: ()=>{
          const base = lv>=1?10:8;
          const single = base + charge*3;
          const enemyCount = (cs.enemies||[]).filter(e=>!e._dead).length || 1;
          const total = single * enemyCount;
          return `对所有敌人造成 <b>${single}</b> 点伤害（共 <b>${total}</b> 点，${enemyCount}个目标）。消耗全部蓄力。<br>${chargeBar}`;
        },
        ar_ultimate: ()=>{
          const base = lv>=1?7:6;
          const single = base + charge*3;
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
      };
      if(ARCHER_CARDS[cardId]) desc = ARCHER_CARDS[cardId]();
    }
        // 品质颜色边框和标签
    const RARITY_STYLE = {
      common:   { border:'rgba(180,180,180,0.35)', glow:'none',                          label:'',   labelColor:'' },
      uncommon: { border:'#4caf50',               glow:'0 0 8px rgba(76,175,80,0.5)',   label:'精良', labelColor:'#4caf50' },
      rare:     { border:'#2196f3',               glow:'0 0 10px rgba(33,150,243,0.6)', label:'稀有', labelColor:'#64b5f6' },
      epic:     { border:'#9c27b0',               glow:'0 0 14px rgba(156,39,176,0.7)', label:'史诗', labelColor:'#ce93d8' },
    };
    const rarity = def.rarity || 'common';
    const rs = RARITY_STYLE[rarity] || RARITY_STYLE.common;
    if(rarity !== 'common'){
      el.style.border = `2px solid ${rs.border}`;
      el.style.boxShadow = rs.glow;
    }
    el.style.position = 'relative';
    const rarityTag = rs.label ? `<div style="position:absolute;top:3px;left:6px;font-size:0.62rem;font-weight:800;color:${rs.labelColor};letter-spacing:0.5px;text-shadow:0 0 6px ${rs.border};pointer-events:none">${rs.label}</div>` : '';
el.innerHTML=`<div class="card-type-bar"></div>${rarityTag}<div class="card-cost${overrideCost===0?' cost-zero':''}">${ displayCost===99?'X':displayCost}</div><div class="card-art">${def.emoji||'\ud83c\udccf'}</div><div class="card-name">${def.name}</div><div class="card-desc">${desc}</div>`;
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
      iron_stomach:   { name: '大眼的铁胃',   icon: null, img: '/manus-storage/img_00_572k_79c2d105.png', desc: '永久增加 11 点生命上限，并立即回复 11 HP。' },
      amulet:         { name: '大眼的水晶球', icon: '🔮', desc: '第一次被致死时，以 1 HP 存活（仅触发一次）。命运早已在水晶球中显现。' },
      football:       { name: '橄榄球', icon: '🏈', img: '/manus-storage/football_icon_0390dd99.png', desc: '每场战斗第一回合增加 1 点能量。' },
      susu_eyemask:   { name: 'Susu的眼罩', icon: null, img: '/manus-storage/img_01_3443k_f8fb25b0.png', desc: '每场战斗中，第一次受到负面状态效果时免疫（弱化/易伤/中毒等），仅触发一次。' },
      xiaojiu_guitar: { name: '小九的六弦琴', icon: null, img: '/manus-storage/xiaojiu_guitar_e444f0fa.png', desc: '从第二回合开始，每个回合额外多抽 1 张牌。' },
      wangwei_bracelet: { name: '王微的手绳', icon: '📿', desc: '每回合开始时，获得 3 点格挡（不会消失，可累计）。' },
      wangwei_glasses:  { name: '王微的眼镜', icon: '👓', desc: '受到伤害时，有 20% 概率完全无视本次伤害。' },
      wangwei_bowl:     { name: '王微的碗',   icon: '🍜', desc: '每场战斗结束后，回复 5 点 HP。' },
      wangwei_wallet:   { name: '王微的钱包', icon: '👛', desc: '每场战斗结束后，金币奖励额外 +25%。' },
      wangwei_optimism: { name: '王微的乐观', icon: '🌟', desc: '每场战斗开始时，随机回复 1~10 点 HP。' },
      // 文豪遗物
      wenhao_scarf:       { name: '文豪的红领巾', icon: '👔', desc: '每场战斗结束时，若全程未受任何伤害，永久+3最大HP。' },
      wenhao_feather:     { name: '文豪的羽毛', icon: '🪶', desc: '生命首次低于最大生命值50%时，立刻回满。（全局仅一次；一击致死不触发）' },
      wenhao_script:      { name: '文豪的剧本', icon: '📜', desc: '获取时，立刻打开牌库，选择至多3张卡牌删除。' },
      // 大头遗物
      datou_spanish_book: { name: '大头的西班牙语书', icon: '📖', desc: '回合结束时，若本回合造成过伤害，回复 2 点 HP。' },
      datou_sunglasses:   { name: '大头的墨镜',       icon: '🕶️', desc: '每次抽牌时，25% 概率额外再抽一张（每回合最多触发一次）。' },
      datou_drumstick:    { name: '大头的鼓棒',       icon: '🥁', desc: '打出攻击牌时，10% 概率额外释放一次。' },
      datou_hat:          { name: '大头的帽子',       icon: '🧢', desc: '永久增加 20 点生命上限，并立即回复 20 点 HP。' },
      datou_whistle:      { name: '大头的哨子',       icon: '🎺', desc: '回合结束时，若本回合未打出过防御牌，获得 10 点格挡。' },
      // 高山遗物
      gaoshan_sunglasses: { name: '高山的雪镜',   icon: '🥽', desc: '每回合开始时，有 50% 概率获得 1 点额外能量。' },
      gaoshan_jacket:     { name: '高山的冲锋衣', icon: '🧥', desc: '每场战斗中，第一次获得格挡时，格挡值翻倍。' },
      gaoshan_compass:    { name: '高山的指南针', icon: '🧭', desc: '激活后，第三层地图变为一条直路，难度大幅降低。' },
      gaoshan_braid:      { name: '高山的麻花辫', icon: '💇', desc: '每场战斗开始时，随机回复 3~8 点 HP。' }
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
    strength: { name: '力量', icon: '💪', desc: '每层使攻击伤害 +1' },
    dexterity: { name: '敏捷', icon: '🏃', desc: '每层使格挡 +1' },
    ritual: { name: '仪式', icon: '✨', desc: '每回合获得力量' },
  },
  _debuffDescs: {
    vulnerable: { name: '易伤', icon: '💔', desc: '受到的伤害增加 50%，持续到回合结束时减 1 层' },
    weak: { name: '虚弱', icon: '😵', desc: '造成的伤害减少 25%，持续到回合结束时减 1 层' },
    frail: { name: '脆弱', icon: '🦴', desc: '获得的格挡减少 25%，持续到回合结束时减 1 层' },

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
    container.querySelectorAll('.buff-badge, .debuff-badge').forEach(badge=>{
      badge.addEventListener('mouseenter', ()=>{
        const key=badge.dataset.buffKey;
        const type=badge.dataset.buffType;
        const stacks=badge.dataset.buffStacks;
        const dict=type==='buff'?UI._buffDescs:UI._debuffDescs;
        const info=dict[key]||{name:key,icon:'',desc:type==='buff'?'增益效果':'减益效果'};
        const tt=document.createElement('div');
        tt.className='buff-tooltip';
        tt.innerHTML=`<div class="tt-name">${info.icon||''} ${info.name}</div><div class="tt-desc">${info.desc}</div><div class="tt-stacks">当前层数：${stacks}</div>`;
        badge.appendChild(tt);
      });
      badge.addEventListener('mouseleave', ()=>{
        badge.querySelector('.buff-tooltip')?.remove();
      });
    });
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
    UI.app().innerHTML=`<div class="menu-screen slide-up"><div class="menu-title">Slay the<br>Curiosity</div><div class="menu-subtitle">一场好奇心的冒险</div><div style="display:flex;flex-direction:column;gap:12px;align-items:center;margin-top:16px"><button class="btn primary" id="btn-new">✨ 新游戏</button>${hasSave?'<button class="btn" id="btn-continue">📂 继续游戏</button>':''}<button class="btn" id="btn-saves">💾 存档管理</button></div><div style="font-size:0.85rem;color:var(--ink-light);margin-top:32px">Slay the Curiosity v0.1 demo</div></div>`;
    document.getElementById('btn-new').onclick=()=>State.go('char-select');
    if(hasSave)document.getElementById('btn-continue').onclick=()=>UI.showSaveSlots('load');
    document.getElementById('btn-saves').onclick=()=>UI.showSaveSlots('manage');
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

  characterSelect(){
    let selected=null;
    UI.app().innerHTML=`<div class="char-select-screen slide-up"><h2 class="screen-title">选择角色</h2><div class="char-grid" id="char-grid"></div><div id="char-detail" style="font-size:0.9rem;color:var(--ink-light);min-height:20px"></div><div style="display:flex;gap:12px;margin-top:4px"><button class="btn" id="btn-back">← 返回</button><button class="btn primary" id="btn-start" disabled>开始冒险 →</button></div></div>`;
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
    const run=State.run;run.currentNodeId=node.id;run.floor=node.floor;State.saveRun(0);
    if(node.type==='boss'){
      const run=State.run;
      // act3使用act2的boss（班布），act1使用兔子，其他同样
      const bossEnc=run.act===3?Data.encounters.boss3[0]:(run.act===2?Data.encounters.boss2[0]:Data.encounters.boss[0]);
      Combat.init(bossEnc);State.go('combat');
    }
    else if(node.type==='combat'||node.type==='elite'){
      const run=State.run;
      let table;
      if(run.act===3){
        // 第三层（露营周）使用act2的战斗表
        table=node.type==='elite'?'hard2':node.floor<=3?'easy2':node.floor<=6?'medium2':'hard2';
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

  _showRelicPickup(relicId, name, icon, effectText, onPick, onSkip){
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.82);pointer-events:auto;';
    const relic = Data.battleRelics.find(r => r.id === relicId);
    // 根据稀有度决定颜色和发光动画
    const tierColor = { common:'#c0c0c0', rare:'#7ecfff', epic:'#e056fd' };
    const tierName  = { common:'普通', rare:'稀有', epic:'罕见' };
    const tierAnim  = { common:'relicGlowCommon', rare:'relicGlow', epic:'relicGlowEpic' };
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

  combat(){ Audio.startBgmCombat(); UI._selectedCard=null;UI._renderCombat(); },

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
    <div class="player-figure" id="player-figure">${run.character.emoji}</div>
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
          <div id="speed-hud-btn" onclick="UI.toggleSpeedPanel(${spd})" style="cursor:pointer;font-size:0.88rem;font-weight:700;color:#f9ca24;background:rgba(249,202,36,0.12);border:1.5px solid rgba(249,202,36,0.4);border-radius:8px;padding:2px 10px;user-select:none;transition:background 0.15s" onmouseenter="this.style.background='rgba(249,202,36,0.25)'" onmouseleave="this.style.background='rgba(249,202,36,0.12)'">⚡ 速度感 <b>${spd}</b>${spd>=80?' 🔥':spd>=60?' 🏎️':spd>=40?' ⚡':spd>=20?' 🛡':''}</div>'+
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
      const intentHtml=visibleIntentArr.map(it=>{
        const glassesTag=(_hasGlasses&&it.type==='attack')?`<span style="font-size:0.7em;margin-left:2px;opacity:0.85;vertical-align:middle" title="👓 王微的眼镜：20% 概率完全无视此次伤害">👓</span>`:'';
        return `<span class="intent-badge ${it.type||'unknown'}">${it.label}<span style="font-size:0.95em">${it.num||''}</span>${glassesTag}</span>`;
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
    cs.hand.forEach((cardId,idx)=>{
      const def=Data.cards[cardId];if(!def)return;
      // 放大镜：直接用手牌位置索引判断，精确匹配唯一那张牌
      const isMagnifier = cs.magnifierActive && cs.magnifierHandIndex === idx;
      // 醪糟水：显示随机化后的费用
      const laozaoKey2 = cardId + '_' + idx;
      const isLaozao2 = cs.laozaoActive && cs.laozaoCosts && laozaoKey2 in cs.laozaoCosts;
      // 升级后的费用
      const _rhUpgLv = cs.handUpgrades ? (cs.handUpgrades[idx] || 0) : 0;
      let _rhBaseCost = def.cost;
      if(_rhUpgLv > 0){
        const _rhUpgDef = Data.upgrades && Data.upgrades[cardId] && Data.upgrades[cardId][_rhUpgLv];
        if(_rhUpgDef && _rhUpgDef.cost !== undefined) _rhBaseCost = _rhUpgDef.cost;
      }
      const effectiveCost = isMagnifier ? 0 : (isLaozao2 ? cs.laozaoCosts[laozaoKey2] : _rhBaseCost);
      const displayOverride = isMagnifier ? 0 : (isLaozao2 ? cs.laozaoCosts[laozaoKey2] : (_rhUpgLv > 0 ? _rhBaseCost : undefined));
      const _handUpgradeLv = cs.handUpgrades ? (cs.handUpgrades[idx] || 0) : 0;
      const cardEl=UI.renderCard(cardId, displayOverride, _handUpgradeLv);
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
      handEl.appendChild(cardEl);
    });
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
    if(_pdef){if(_pdef.type==='attack')Audio.playAttack();else if(_pdef.type==='skill')Audio.playBlock();else Audio.playPowerUp();}
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
    const playerHpBefore=cs.player.hp;Combat.endTurn();
    const tookDamage=cs.player.hp<playerHpBefore;
    if(tookDamage){Anim.flashScreenDamage();attackers.forEach(({i})=>{const fig=document.getElementById(`enemy-fig-${i}`);if(fig)Anim.lunge(fig,'left');});setTimeout(()=>{const playerFig=document.getElementById('player-figure');if(playerFig){Anim.hitFlash(playerFig);Anim.shake(playerFig);}},150);}
    const delay=tookDamage?280:0;setTimeout(()=>{if(cs.phase!=='dead'&&cs.phase!=='victory')UI._renderCombat();},delay);
  },

  // 单张卡牌详情弹窗（商店单击、牌堆双击等场景共用）
  _showCardDetailOverlay(cardId){
    const def = Data.cards[cardId];
    if(!def) return;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.cssText = 'z-index:9999';
    const rarityNames = {common:'普通',uncommon:'精良',rare:'稀有',epic:'史诗'};
    const rarityColors = {common:'#aaa',uncommon:'#7ecfff',rare:'#e056fd',epic:'#f9ca24'};
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
    const tierColor = {'common':'#aaa','rare':'#7ecfff','epic':'#e056fd'};
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
      setTimeout(()=>{wrap.innerHTML='';const cardEl=UI.renderCard(cardId);wrap.appendChild(cardEl);Anim.flipCard(cardEl,0);wrap.onclick=()=>UI._pickReward(cardId);},80+i*100);
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
    const tierColor = {'common':'#aaa','rare':'#7ecfff','epic':'#e056fd'};
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
    // 随机选一个问号事件
    const events = Data.questionEvents;
    const evt = events[Math.floor(Math.random() * events.length)];

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
    const run=State.run,char=run.character,healAmt=Math.floor(char.maxHp*0.3),canHeal=char.hp<char.maxHp;
    const upgradable=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99);
    const canLearn=upgradable.length>0;
    UI.app().innerHTML=`<div class="rest-screen slide-up">
      <div style="font-size:3rem">🏘️</div>
      <div class="rest-title">市井</div>
      <div style="color:rgba(255,255,255,0.8);font-size:1.1rem">❤️ ${char.hp} / ${char.maxHp}</div>
      <div class="rest-options">
        <button class="btn primary" id="btn-heal" ${!canHeal?'disabled':''}>❤️ 休息<br><small>恢复 ${healAmt} HP</small></button>
        <button class="btn" id="btn-learn" ${!canLearn?'disabled':''}>📖 学习<br><small>升级一张牌</small></button>
        <button class="btn" id="btn-skip-rest">👣 继续旅程</button>
      </div>
    </div>`;
    document.getElementById('btn-heal').onclick=()=>{if(!canHeal)return;char.hp=Math.min(char.maxHp,char.hp+healAmt);State.saveRun(0);State.go('map');};
    document.getElementById('btn-skip-rest').onclick=()=>State.go('map');
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
          State.saveRun(0);
          overlay.remove();
          State.go('map');
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
          <img src="/manus-storage/hanren_merchant_8f300175.png" alt="憨人" style="width:200px;height:200px;object-fit:contain;display:block;" />
          <div style="text-align:center;font-size:0.8rem;color:rgba(255,255,255,0.6);margin-top:2px">憨人</div>
        </div>
        <div style="background:rgba(255,255,255,0.07);border:1.5px solid rgba(255,255,255,0.15);border-radius:14px 14px 14px 4px;padding:10px 16px;font-size:0.95rem;color:rgba(255,255,255,0.9);max-width:260px;line-height:1.5;margin-bottom:28px">
          ${(()=>{
  const gold = run.gold || 0;
  if(gold >= 1000) return '我去，这么有钱，富婆哦！💰';
  const lines = [
    '欢迎光临好奇小卖部！<br>本店货真价实，童叟无欺～',
    '今天想买点什么？😊',
    '嘟嘟嘟嘟嘟嘟～🎵'
  ];
  return lines[Math.floor(Math.random() * lines.length)];
})()}
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
    const removePrice = Data.removeCardPrice;
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
    if (run.removeUsed || run.gold < Data.removeCardPrice) return;
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
    overlay.addEventListener('click', e => {
      const wrap = e.target.closest('[data-remove-idx]');
      if (wrap) {
        const i = parseInt(wrap.dataset.removeIdx, 10);
        const cardId = removable[i];
        const deckIdx = run.deck.indexOf(cardId);
        if (deckIdx !== -1) run.deck.splice(deckIdx, 1);
        run.gold -= Data.removeCardPrice;
        run.removeUsed = true;
        State.saveRun(0);
        overlay.remove();
        UI._renderShop();
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
    const DATOU_IMG_SRC='/manus-storage/datou_sprite.png';
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
    const WENHAO_IMG_SRC='/manus-storage/wenhao_sprite.png';
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
  // 文豪剧本：删牌界面（至多删 3 张）
  _wenhaoScriptRemove(onDone){
    const run=State.run;
    let removedCount=0;
    const MAX_REMOVE=3;
    function openRemovePanel(){
      const removable=run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99);
      const overlay=document.createElement('div');
      overlay.className='overlay';
      const remaining=MAX_REMOVE-removedCount;
      const cardsHtml=removable.length===0
        ?'<p style="color:var(--ink-light)">没有可删除的卡牌</p>'
        :removable.map((id,i)=>`<div class="shop-card-wrap" data-remove-idx="${i}" style="cursor:pointer">${UI.renderCard(id).outerHTML}<div class="shop-price-tag" style="font-size:0.8rem">点击删除</div></div>`).join('');
      overlay.innerHTML=`<div class="panel bounce-in" style="max-width:90vw;max-height:82vh;overflow-y:auto">
        <h3 style="margin:0 0 4px;color:#a8d8ff">📜 文豪的剧本</h3>
        <p style="margin:0 0 12px;color:rgba(255,255,255,0.65);font-size:0.9rem">人生的剧本由你自己决定！还可删除 <b style="color:#a8d8ff">${remaining}</b> 张卡牌</p>
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${cardsHtml}</div>
        <button class="btn" style="margin-top:14px;width:100%" id="btn-script-done">完成（已删 ${removedCount}/${MAX_REMOVE} 张）</button>
      </div>`;
      overlay.addEventListener('click',e=>{
        const wrap=e.target.closest('[data-remove-idx]');
        if(wrap&&removedCount<MAX_REMOVE){
          const i=parseInt(wrap.dataset.removeIdx,10);
          const cardId=removable[i];
          const deckIdx=run.deck.indexOf(cardId);
          if(deckIdx!==-1)run.deck.splice(deckIdx,1);
          removedCount++;
          overlay.remove();
          if(removedCount<MAX_REMOVE&&run.deck.filter(id=>Data.cards[id]&&Data.cards[id].cost!==99).length>0){
            openRemovePanel();
          } else {
            onDone();
          }
        }
        if(e.target.id==='btn-script-done'){
          overlay.remove();
          onDone();
        }
      });
      document.body.appendChild(overlay);
    }
    openRemovePanel();
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
    const GAOSHAN_IMG_SRC='/manus-storage/gaoshan_sprite.png';
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

};

// ── main.js ───────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const screens = {
    'menu':        () => UI.menu(),
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
    'act3-transition': () => UI.act3Transition()
  };
  State.on('screenChange', ({ screen }) => {
    const fn = screens[screen];
    if (fn) fn();
    else console.warn('Unknown screen:', screen);
  });
  UI.menu();
});
