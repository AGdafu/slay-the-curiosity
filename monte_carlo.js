// ═══════════════════════════════════════════════
// 蒙特卡洛通关率测试（纯数据驱动，跳过 UI）
// 用法：打开游戏 → F12 → 粘贴运行
// ═══════════════════════════════════════════════

(async function run() {
  const CHARS = ['boxer','brute','racer','archer'];
  const RUNS = 30;
  const results = {};

  function autoCombat(charId) {
    const char = Data.characters.find(c => c.id === charId);
    State.current.run = {
      character: { id: char.id, name: char.name, emoji: char.emoji, color: char.color,
        hp: char.hp, maxHp: char.maxHp, block: 0, buffs: {}, debuffs: {} },
      deck: [...char.startingDeck], relics: [], potions: [null,null,null],
      floor: 0, act: 1, gold: 99, combat: null, map: { nodes: [] }, currentNodeId: 'n0'
    };
    // 随机一个普通敌人
    const pools = [Data.encounters.easy, Data.encounters.medium];
    const pool = pools[Math.floor(Math.random() * 2)];
    const enemies = pool[Math.floor(Math.random() * pool.length)];
    Combat.init(enemies);
    let cs = State.run.combat;

    for (let t = 0; t < 60; t++) {
      if (cs.phase === 'victory') return true;
      if (cs.player.hp <= 0) return false;

      // 出牌：按 格挡>攻击>技能 优先级
      let acted = false;
      for (let pass = 0; pass < 3 && !acted; pass++) {
        for (let hi = cs.hand.length - 1; hi >= 0; hi--) {
          const cid = cs.hand[hi];
          const def = Data.cards[cid];
          if (!def || def.cost > cs.energy || def.cost === 99) continue;
          const isBlock = def.type === 'skill' || def.id.includes('defend') || def.id.includes('guard') || def.id.includes('block');
          const isAtk = def.type === 'attack';
          const want = (pass === 0 && isBlock) || (pass === 1 && isAtk) || (pass === 2);
          if (!want) continue;

          const target = def.needsTarget
            ? cs.enemies.reduce((best, e, i) => (!e._dead && e.hp > 0 && (best === -1 || e.hp < cs.enemies[best].hp)) ? i : best, -1)
            : undefined;
          if (def.needsTarget && target === -1) continue;

          Combat.playCard(cid, target, hi);
          acted = true;
          break;
        }
      }
      if (!acted || cs.energy === 0) {
        Combat._doEndTurn(cs);
        if (cs.phase === 'victory') return true;
        if (cs.player.hp <= 0 || cs.phase === 'defeat') return false;
      }
    }
    return cs.phase === 'victory';
  }

  for (const cid of CHARS) {
    let wins = 0;
    for (let i = 0; i < RUNS; i++) {
      if (autoCombat(cid)) wins++;
    }
    results[cid] = { wins, total: RUNS, rate: Math.round(wins / RUNS * 100) };
  }

  console.log('\n═══ 蒙特卡洛通关率（每角色' + RUNS + '局普通战斗）═══');
  for (const cid of CHARS) {
    const r = results[cid];
    console.log(Data.characters.find(c => c.id === cid)?.name.padEnd(6) + ' | ' + String(r.wins).padStart(2) + '/' + r.total + ' = ' + r.rate + '%');
  }
  console.log('═══════════════════════════════════');
})();
