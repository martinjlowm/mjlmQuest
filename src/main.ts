/**
 * @noSelfInFile
 */

const f = CreateFrame('Frame', null, UIParent)

f.QUEST_GREETING = function(this: typeof f) {
  for (let i = 1; i <= GetNumActiveQuests(); i++) {
    const [, isComplete] = GetActiveTitle(i);

    if (isComplete) {
      SelectActiveQuest(i);
      return;
    }
  }

  for (let i = 1; i <= GetNumAvailableQuests(); i++) {
    const title = GetAvailableTitle(i);
    if (title) {
      SelectAvailableQuest(i);
      return;
    }
  }
};

f.QUEST_DETAIL = function() {
  AcceptQuest();
};

f.QUEST_PROGRESS = function() {
  if (IsShiftKeyDown()) {
    return;
  }

  CompleteQuest();
};

f.QUEST_COMPLETE = function() {
  if (IsShiftKeyDown()) {
    return;
  }

  const numRewards = GetNumQuestChoices();

  if (0 < numRewards) {
    /* let itemName: string;
     * let itemId: any; */
    let isUsable: any;
    for (let i = 1; i <= numRewards; i++) {
      [/* itemName */, /* itemId */, , , isUsable] = GetQuestItemInfo('choice', i);
      if (isUsable) {
        _G[`QuestInfoRewardsFrameQuestInfoItem${i}`].Click()
        /* GetQuestReward(i) */
      }
    }
    /* TODO: Compare vendor prices and whether the item is usable and preselect for now */
    /* print(numRewards) */

  } else {
    GetQuestReward(0);
  }
};

f.QUEST_FINISHED = function() {
};
f.QUEST_ITEM_UPDATE = function() {
};
f.QUEST_LOG_UPDATE = function() {
};
f.UNIT_PORTRAIT_UPDATE = function() {
};
f.PORTRAITS_UPDATED = function() {
};

f.GOSSIP_SHOW = function() {
  if (IsShiftKeyDown()) {
    return;
  }

  let questIndex = 0;

  let title: string;
  let isComplete: any;

  do {
    [title, , , isComplete] = select(questIndex * 6 + 1, ...GetGossipActiveQuests());

    if (isComplete) {
      SelectGossipActiveQuest(questIndex + 1);
      return;
    }

    questIndex++;
  } while (title);

  questIndex = 0;
  do {
    [title] = select(questIndex * 6 + 1, ...GetGossipAvailableQuests());

    if (title) {
      SelectGossipAvailableQuest(questIndex + 1);
      return;
    }

    questIndex++;
  } while (title);
};

f.GOSSIP_CLOSED = function() {
};


f.Show()

/* Quest */
f.RegisterEvent('QUEST_GREETING');
f.RegisterEvent('QUEST_DETAIL');
f.RegisterEvent('QUEST_PROGRESS');
f.RegisterEvent('QUEST_COMPLETE');
f.RegisterEvent('QUEST_FINISHED');
f.RegisterEvent('QUEST_ITEM_UPDATE');
f.RegisterEvent('QUEST_LOG_UPDATE');
f.RegisterEvent('UNIT_PORTRAIT_UPDATE');
f.RegisterEvent('PORTRAITS_UPDATED');

/* Gossip */
f.RegisterEvent("GOSSIP_SHOW");
f.RegisterEvent("GOSSIP_CLOSED");

f.SetScript('OnEvent', function(event: string, ...args: Vararg<any>) {
  return this[event](this, event, ...args);
});
