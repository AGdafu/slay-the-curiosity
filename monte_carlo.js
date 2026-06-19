// 复制这整个代码块，粘贴到 Console 按回车
(function() {
  const CHARS = ['boxer','brute','racer','archer'];
  const RUNS = 25;
  const results = {};

  for (const cid of CHARS) {
    const char = Data.characters.find(c => c.id === cid);
    let wins = 0;
    for (let i = 0; i < RUNS; i++) {
      State.current = State.current || {};
      State.current.run = {
        character: { id: char.id, name: char.name, hp: char.hp, maxHp: char.maxHp, block:0, buffs:{}, debuffs:{} },
        deck: [...char.startingDeck], relics: [], potions: [null,null,null],
        act: 1, gold: 99, map: { nodes: [] }, currentNodeId: 'n0'
      };
      const pool = [Data.encounters.easy, Data.encounters.medium][Math.floor(Math.random()*2)];
      const enemies = pool[Math.floor(Math.random()*pool.length)];
      Combat.init(enemies);
      var cs = State.current.run.combat;
      for (var t = 0; t < 50; t++) {
        if (cs.phase === 'victory') { wins++; break; }
        if (cs.player.hp <= 0) break;
        var acted = false;
        for (var pass = 0; pass < 3 && !acted; pass++) {
          for (var hi = cs.hand.length-1; hi >= 0; hi--) {
            var cid2 = cs.hand[hi], def = Data.cards[cid2];
            if (!def || def.cost > cs.energy || def.cost === 99) continue;
            var want = (pass===0&&def.type==='skill')||(pass===1&&def.type==='attack')||pass===2;
            if (!want) continue;
            var ti = -1;
            if (def.needsTarget) {
              for (var ei = 0; ei < cs.enemies.length; ei++) {
                if (!cs.enemies[ei]._dead && cs.enemies[ei].hp > 0) { ti = ei; break; }
              }
              if (ti === -1) continue;
            }
            Combat.playCard(cid2, def.needsTarget ? ti : undefined, hi);
            acted = true; break;
          }
        }
        if (!acted || cs.energy === 0) {
          Combat._doEndTurn(cs);
          if (cs.phase === 'victory') { wins++; break; }
          if (cs.player.hp <= 0) break;
        }
      }
    }
    results[cid] = { wins: wins, total: RUNS, rate: Math.round(wins/RUNS*100) };
  }

  console.log('\n=== 通关率 ('+RUNS+'局/角色) ===');
  for (var j = 0; j < CHARS.length; j++) {
    var cid3 = CHARS[j], r = results[cid3];
    console.log(Data.characters.find(function(c){return c.id===cid3}).name + ': ' + r.wins + '/' + r.total + ' = ' + r.rate + '%');
  }
})();
