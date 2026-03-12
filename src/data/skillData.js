export const SKILLS_DATA = {
    "deep_breath": {
        "id": "deep_breath",
        "type": "keystone",
        "name": "Deep Breath",
        "description": "First 5-min pause forgiven.",
        "tier": 1,
        "cost": 1,
        "prerequisites": [],
        "position": {
            "x": 50,
            "y": 45
        }
    },
    "void_sense": {
        "id": "void_sense",
        "type": "keystone",
        "name": "Void Sense",
        "description": "Show passive XP rate.",
        "tier": 1,
        "cost": 1,
        "prerequisites": [],
        "position": {
            "x": 45,
            "y": 55
        }
    },
    "iron_will": {
        "id": "iron_will",
        "type": "keystone",
        "name": "Iron Will",
        "description": "Flat +5 XP per session.",
        "tier": 1,
        "cost": 1,
        "prerequisites": [],
        "position": {
            "x": 55,
            "y": 55
        }
    },
    "stargazer": {
        "id": "stargazer",
        "type": "keystone",
        "name": "Stargazer",
        "description": "Night time bonus.",
        "tier": 2,
        "cost": 3,
        "stats": {
            "voidMatterChance": 0.05
        },
        "position": {
            "x": 50,
            "y": 25
        },
        "prerequisites": [
            "focus_path_1_4"
        ]
    },
    "chain_reaction": {
        "id": "chain_reaction",
        "type": "keystone",
        "name": "Chain Reaction",
        "description": "3 perfects = double.",
        "tier": 3,
        "cost": 5,
        "position": {
            "x": 50,
            "y": 10
        },
        "prerequisites": [
            "focus_path_2_6"
        ]
    },
    "singularity": {
        "id": "singularity",
        "type": "keystone",
        "name": "Singularity",
        "description": "+10% XP permanently.",
        "tier": 4,
        "cost": 10,
        "stats": {
            "xpMultiplier": 0.1
        },
        "position": {
            "x": 25,
            "y": 25
        },
        "prerequisites": [
            "bridge_w_5"
        ]
    },
    "momentum": {
        "id": "momentum",
        "type": "keystone",
        "name": "Momentum",
        "description": "Break XP generation.",
        "tier": 2,
        "cost": 3,
        "position": {
            "x": 30,
            "y": 65
        },
        "prerequisites": [
            "mom_path_1_4"
        ]
    },
    "deep_void": {
        "id": "deep_void",
        "type": "keystone",
        "name": "Deep Void",
        "description": "Marathon 2x Void Matter.",
        "tier": 3,
        "cost": 5,
        "position": {
            "x": 15,
            "y": 75
        },
        "prerequisites": [
            "mom_path_2_6"
        ]
    },
    "event_horizon": {
        "id": "event_horizon",
        "type": "keystone",
        "name": "Event Horizon",
        "description": "Chain reaction reduced to 2.",
        "tier": 4,
        "cost": 10,
        "position": {
            "x": 50,
            "y": 90
        },
        "prerequisites": [
            "bridge_se_4"
        ]
    },
    "focus_lens": {
        "id": "focus_lens",
        "type": "keystone",
        "name": "Focus Lens",
        "description": "+1 Void Matter on 100%.",
        "tier": 2,
        "cost": 3,
        "position": {
            "x": 70,
            "y": 65
        },
        "prerequisites": [
            "void_path_1_4"
        ]
    },
    "eclipse": {
        "id": "eclipse",
        "type": "keystone",
        "name": "Eclipse",
        "description": "Eclipse aesthetic mode.",
        "tier": 3,
        "cost": 5,
        "position": {
            "x": 85,
            "y": 75
        },
        "prerequisites": [
            "void_path_2_6"
        ]
    },
    "void_ascendant": {
        "id": "void_ascendant",
        "type": "keystone",
        "name": "Void Ascendant",
        "description": "Level up Void Matter.",
        "tier": 4,
        "cost": 15,
        "position": {
            "x": 75,
            "y": 25
        },
        "prerequisites": [
            "bridge_e_5"
        ]
    },
    "focus_path_1_1": {
        "id": "focus_path_1_1",
        "type": "minor",
        "name": "Focus 1",
        "description": "+2% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "deep_breath"
        ],
        "position": {
            "x": 50,
            "y": 40.6
        },
        "stats": {
            "xpMultiplier": 0.02
        }
    },
    "focus_path_1_2": {
        "id": "focus_path_1_2",
        "type": "minor",
        "name": "Focus 2",
        "description": "+2% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_1_1"
        ],
        "position": {
            "x": 50,
            "y": 36.9
        },
        "stats": {
            "xpMultiplier": 0.02
        }
    },
    "focus_path_1_3": {
        "id": "focus_path_1_3",
        "type": "minor",
        "name": "Focus 3",
        "description": "+2% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_1_2"
        ],
        "position": {
            "x": 50,
            "y": 33.1
        },
        "stats": {
            "xpMultiplier": 0.02
        }
    },
    "focus_path_1_4": {
        "id": "focus_path_1_4",
        "type": "minor",
        "name": "Focus 4",
        "description": "+2% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_1_3"
        ],
        "position": {
            "x": 50,
            "y": 29.4
        },
        "stats": {
            "xpMultiplier": 0.02
        }
    },
    "focus_path_2_1": {
        "id": "focus_path_2_1",
        "type": "minor",
        "name": "Clarity 1",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "stargazer"
        ],
        "position": {
            "x": 50,
            "y": 21.7
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "focus_path_2_2": {
        "id": "focus_path_2_2",
        "type": "minor",
        "name": "Clarity 2",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_2_1"
        ],
        "position": {
            "x": 50,
            "y": 20
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "focus_path_2_3": {
        "id": "focus_path_2_3",
        "type": "minor",
        "name": "Clarity 3",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_2_2"
        ],
        "position": {
            "x": 50,
            "y": 18.3
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "focus_path_2_4": {
        "id": "focus_path_2_4",
        "type": "minor",
        "name": "Clarity 4",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_2_3"
        ],
        "position": {
            "x": 50,
            "y": 16.7
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "focus_path_2_5": {
        "id": "focus_path_2_5",
        "type": "minor",
        "name": "Clarity 5",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_2_4"
        ],
        "position": {
            "x": 50,
            "y": 15
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "focus_path_2_6": {
        "id": "focus_path_2_6",
        "type": "minor",
        "name": "Clarity 6",
        "description": "+3% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_path_2_5"
        ],
        "position": {
            "x": 50,
            "y": 13.3
        },
        "stats": {
            "xpMultiplier": 0.03
        }
    },
    "mom_path_1_1": {
        "id": "mom_path_1_1",
        "type": "minor",
        "name": "Meditation 1",
        "description": "+1 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_sense"
        ],
        "position": {
            "x": 41.7,
            "y": 57.2
        },
        "stats": {
            "flatXpBonus": 1
        }
    },
    "mom_path_1_2": {
        "id": "mom_path_1_2",
        "type": "minor",
        "name": "Meditation 2",
        "description": "+1 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_1_1"
        ],
        "position": {
            "x": 38.9,
            "y": 59.1
        },
        "stats": {
            "flatXpBonus": 1
        }
    },
    "mom_path_1_3": {
        "id": "mom_path_1_3",
        "type": "minor",
        "name": "Meditation 3",
        "description": "+1 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_1_2"
        ],
        "position": {
            "x": 36.1,
            "y": 60.9
        },
        "stats": {
            "flatXpBonus": 1
        }
    },
    "mom_path_1_4": {
        "id": "mom_path_1_4",
        "type": "minor",
        "name": "Meditation 4",
        "description": "+1 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_1_3"
        ],
        "position": {
            "x": 33.3,
            "y": 62.8
        },
        "stats": {
            "flatXpBonus": 1
        }
    },
    "mom_path_2_1": {
        "id": "mom_path_2_1",
        "type": "minor",
        "name": "Tranquility 1",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "momentum"
        ],
        "position": {
            "x": 26.7,
            "y": 67.2
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "mom_path_2_2": {
        "id": "mom_path_2_2",
        "type": "minor",
        "name": "Tranquility 2",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_2_1"
        ],
        "position": {
            "x": 25,
            "y": 68.3
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "mom_path_2_3": {
        "id": "mom_path_2_3",
        "type": "minor",
        "name": "Tranquility 3",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_2_2"
        ],
        "position": {
            "x": 23.3,
            "y": 69.4
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "mom_path_2_4": {
        "id": "mom_path_2_4",
        "type": "minor",
        "name": "Tranquility 4",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_2_3"
        ],
        "position": {
            "x": 21.7,
            "y": 70.6
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "mom_path_2_5": {
        "id": "mom_path_2_5",
        "type": "minor",
        "name": "Tranquility 5",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_2_4"
        ],
        "position": {
            "x": 20,
            "y": 71.7
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "mom_path_2_6": {
        "id": "mom_path_2_6",
        "type": "minor",
        "name": "Tranquility 6",
        "description": "+2 Flat XP per session",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "mom_path_2_5"
        ],
        "position": {
            "x": 18.3,
            "y": 72.8
        },
        "stats": {
            "flatXpBonus": 2
        }
    },
    "void_path_1_1": {
        "id": "void_path_1_1",
        "type": "minor",
        "name": "Darkness 1",
        "description": "+2% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "iron_will"
        ],
        "position": {
            "x": 58.3,
            "y": 57.2
        },
        "stats": {
            "voidMatterChance": 0.02
        }
    },
    "void_path_1_2": {
        "id": "void_path_1_2",
        "type": "minor",
        "name": "Darkness 2",
        "description": "+2% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_1_1"
        ],
        "position": {
            "x": 61.1,
            "y": 59.1
        },
        "stats": {
            "voidMatterChance": 0.02
        }
    },
    "void_path_1_3": {
        "id": "void_path_1_3",
        "type": "minor",
        "name": "Darkness 3",
        "description": "+2% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_1_2"
        ],
        "position": {
            "x": 63.9,
            "y": 60.9
        },
        "stats": {
            "voidMatterChance": 0.02
        }
    },
    "void_path_1_4": {
        "id": "void_path_1_4",
        "type": "minor",
        "name": "Darkness 4",
        "description": "+2% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_1_3"
        ],
        "position": {
            "x": 66.7,
            "y": 62.8
        },
        "stats": {
            "voidMatterChance": 0.02
        }
    },
    "void_path_2_1": {
        "id": "void_path_2_1",
        "type": "minor",
        "name": "Abyss 1",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "focus_lens"
        ],
        "position": {
            "x": 73.3,
            "y": 67.2
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "void_path_2_2": {
        "id": "void_path_2_2",
        "type": "minor",
        "name": "Abyss 2",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_2_1"
        ],
        "position": {
            "x": 75,
            "y": 68.3
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "void_path_2_3": {
        "id": "void_path_2_3",
        "type": "minor",
        "name": "Abyss 3",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_2_2"
        ],
        "position": {
            "x": 76.7,
            "y": 69.4
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "void_path_2_4": {
        "id": "void_path_2_4",
        "type": "minor",
        "name": "Abyss 4",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_2_3"
        ],
        "position": {
            "x": 78.3,
            "y": 70.6
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "void_path_2_5": {
        "id": "void_path_2_5",
        "type": "minor",
        "name": "Abyss 5",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_2_4"
        ],
        "position": {
            "x": 80,
            "y": 71.7
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "void_path_2_6": {
        "id": "void_path_2_6",
        "type": "minor",
        "name": "Abyss 6",
        "description": "+3% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "void_path_2_5"
        ],
        "position": {
            "x": 81.7,
            "y": 72.8
        },
        "stats": {
            "voidMatterChance": 0.03
        }
    },
    "bridge_nw_1": {
        "id": "bridge_nw_1",
        "type": "minor",
        "name": "Event Horizon 1",
        "description": "+4% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "chain_reaction"
        ],
        "position": {
            "x": 44.5,
            "y": 13.3
        },
        "stats": {
            "xpMultiplier": 0.04
        }
    },
    "bridge_nw_2": {
        "id": "bridge_nw_2",
        "type": "minor",
        "name": "Event Horizon 2",
        "description": "+4% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_nw_1"
        ],
        "position": {
            "x": 39.8,
            "y": 16.1
        },
        "stats": {
            "xpMultiplier": 0.04
        }
    },
    "bridge_nw_3": {
        "id": "bridge_nw_3",
        "type": "minor",
        "name": "Event Horizon 3",
        "description": "+4% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_nw_2"
        ],
        "position": {
            "x": 35.2,
            "y": 18.9
        },
        "stats": {
            "xpMultiplier": 0.04
        }
    },
    "bridge_nw_4": {
        "id": "bridge_nw_4",
        "type": "minor",
        "name": "Event Horizon 4",
        "description": "+4% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_nw_3"
        ],
        "position": {
            "x": 30.5,
            "y": 21.7
        },
        "stats": {
            "xpMultiplier": 0.04
        }
    },
    "bridge_w_1": {
        "id": "bridge_w_1",
        "type": "minor",
        "name": "Gravity 1",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "deep_void"
        ],
        "position": {
            "x": 17.2,
            "y": 64
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_w_2": {
        "id": "bridge_w_2",
        "type": "minor",
        "name": "Gravity 2",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_w_1"
        ],
        "position": {
            "x": 18.6,
            "y": 57
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_w_3": {
        "id": "bridge_w_3",
        "type": "minor",
        "name": "Gravity 3",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_w_2"
        ],
        "position": {
            "x": 20,
            "y": 50
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_w_4": {
        "id": "bridge_w_4",
        "type": "minor",
        "name": "Gravity 4",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_w_3"
        ],
        "position": {
            "x": 21.4,
            "y": 43
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_w_5": {
        "id": "bridge_w_5",
        "type": "minor",
        "name": "Gravity 5",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_w_4"
        ],
        "position": {
            "x": 22.8,
            "y": 36
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_ne_1": {
        "id": "bridge_ne_1",
        "type": "minor",
        "name": "Ascension 1",
        "description": "+5% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "chain_reaction"
        ],
        "position": {
            "x": 55.5,
            "y": 13.3
        },
        "stats": {
            "voidMatterChance": 0.05
        }
    },
    "bridge_ne_2": {
        "id": "bridge_ne_2",
        "type": "minor",
        "name": "Ascension 2",
        "description": "+5% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_ne_1"
        ],
        "position": {
            "x": 60.2,
            "y": 16.1
        },
        "stats": {
            "voidMatterChance": 0.05
        }
    },
    "bridge_ne_3": {
        "id": "bridge_ne_3",
        "type": "minor",
        "name": "Ascension 3",
        "description": "+5% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_ne_2"
        ],
        "position": {
            "x": 64.8,
            "y": 18.9
        },
        "stats": {
            "voidMatterChance": 0.05
        }
    },
    "bridge_ne_4": {
        "id": "bridge_ne_4",
        "type": "minor",
        "name": "Ascension 4",
        "description": "+5% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_ne_3"
        ],
        "position": {
            "x": 69.5,
            "y": 21.7
        },
        "stats": {
            "voidMatterChance": 0.05
        }
    },
    "bridge_e_1": {
        "id": "bridge_e_1",
        "type": "minor",
        "name": "Cosmos 1",
        "description": "+5% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "eclipse"
        ],
        "position": {
            "x": 82.8,
            "y": 64
        },
        "stats": {
            "xpMultiplier": 0.05
        }
    },
    "bridge_e_2": {
        "id": "bridge_e_2",
        "type": "minor",
        "name": "Cosmos 2",
        "description": "+5% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_e_1"
        ],
        "position": {
            "x": 81.4,
            "y": 57
        },
        "stats": {
            "xpMultiplier": 0.05
        }
    },
    "bridge_e_3": {
        "id": "bridge_e_3",
        "type": "minor",
        "name": "Cosmos 3",
        "description": "+5% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_e_2"
        ],
        "position": {
            "x": 80,
            "y": 50
        },
        "stats": {
            "xpMultiplier": 0.05
        }
    },
    "bridge_e_4": {
        "id": "bridge_e_4",
        "type": "minor",
        "name": "Cosmos 4",
        "description": "+5% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_e_3"
        ],
        "position": {
            "x": 78.6,
            "y": 43
        },
        "stats": {
            "xpMultiplier": 0.05
        }
    },
    "bridge_e_5": {
        "id": "bridge_e_5",
        "type": "minor",
        "name": "Cosmos 5",
        "description": "+5% XP Gain",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_e_4"
        ],
        "position": {
            "x": 77.2,
            "y": 36
        },
        "stats": {
            "xpMultiplier": 0.05
        }
    },
    "bridge_sw_1": {
        "id": "bridge_sw_1",
        "type": "minor",
        "name": "Spacetime 1",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "deep_void"
        ],
        "position": {
            "x": 22.7,
            "y": 78.3
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_sw_2": {
        "id": "bridge_sw_2",
        "type": "minor",
        "name": "Spacetime 2",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_sw_1"
        ],
        "position": {
            "x": 29.2,
            "y": 81.1
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_sw_3": {
        "id": "bridge_sw_3",
        "type": "minor",
        "name": "Spacetime 3",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_sw_2"
        ],
        "position": {
            "x": 35.8,
            "y": 83.9
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_sw_4": {
        "id": "bridge_sw_4",
        "type": "minor",
        "name": "Spacetime 4",
        "description": "+3 Flat XP",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_sw_3"
        ],
        "position": {
            "x": 42.3,
            "y": 86.7
        },
        "stats": {
            "flatXpBonus": 3
        }
    },
    "bridge_se_1": {
        "id": "bridge_se_1",
        "type": "minor",
        "name": "Continuum 1",
        "description": "+4% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "eclipse"
        ],
        "position": {
            "x": 77.3,
            "y": 78.3
        },
        "stats": {
            "voidMatterChance": 0.04
        }
    },
    "bridge_se_2": {
        "id": "bridge_se_2",
        "type": "minor",
        "name": "Continuum 2",
        "description": "+4% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_se_1"
        ],
        "position": {
            "x": 70.8,
            "y": 81.1
        },
        "stats": {
            "voidMatterChance": 0.04
        }
    },
    "bridge_se_3": {
        "id": "bridge_se_3",
        "type": "minor",
        "name": "Continuum 3",
        "description": "+4% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_se_2"
        ],
        "position": {
            "x": 64.2,
            "y": 83.9
        },
        "stats": {
            "voidMatterChance": 0.04
        }
    },
    "bridge_se_4": {
        "id": "bridge_se_4",
        "type": "minor",
        "name": "Continuum 4",
        "description": "+4% Void Drop Chance",
        "tier": 1,
        "cost": 1,
        "prerequisites": [
            "bridge_se_3"
        ],
        "position": {
            "x": 57.7,
            "y": 86.7
        },
        "stats": {
            "voidMatterChance": 0.04
        }
    }
};

export const SKILL_CONNECTIONS = [
    {
        "source": "deep_breath",
        "target": "void_sense",
        "isHub": true
    },
    {
        "source": "void_sense",
        "target": "iron_will",
        "isHub": true
    },
    {
        "source": "iron_will",
        "target": "deep_breath",
        "isHub": true
    },
    {
        "source": "deep_breath",
        "target": "focus_path_1_1",
        "isHub": false
    },
    {
        "source": "focus_path_1_1",
        "target": "focus_path_1_2",
        "isHub": false
    },
    {
        "source": "focus_path_1_2",
        "target": "focus_path_1_3",
        "isHub": false
    },
    {
        "source": "focus_path_1_3",
        "target": "focus_path_1_4",
        "isHub": false
    },
    {
        "source": "focus_path_1_4",
        "target": "stargazer",
        "isHub": false
    },
    {
        "source": "stargazer",
        "target": "focus_path_2_1",
        "isHub": false
    },
    {
        "source": "focus_path_2_1",
        "target": "focus_path_2_2",
        "isHub": false
    },
    {
        "source": "focus_path_2_2",
        "target": "focus_path_2_3",
        "isHub": false
    },
    {
        "source": "focus_path_2_3",
        "target": "focus_path_2_4",
        "isHub": false
    },
    {
        "source": "focus_path_2_4",
        "target": "focus_path_2_5",
        "isHub": false
    },
    {
        "source": "focus_path_2_5",
        "target": "focus_path_2_6",
        "isHub": false
    },
    {
        "source": "focus_path_2_6",
        "target": "chain_reaction",
        "isHub": false
    },
    {
        "source": "void_sense",
        "target": "mom_path_1_1",
        "isHub": false
    },
    {
        "source": "mom_path_1_1",
        "target": "mom_path_1_2",
        "isHub": false
    },
    {
        "source": "mom_path_1_2",
        "target": "mom_path_1_3",
        "isHub": false
    },
    {
        "source": "mom_path_1_3",
        "target": "mom_path_1_4",
        "isHub": false
    },
    {
        "source": "mom_path_1_4",
        "target": "momentum",
        "isHub": false
    },
    {
        "source": "momentum",
        "target": "mom_path_2_1",
        "isHub": false
    },
    {
        "source": "mom_path_2_1",
        "target": "mom_path_2_2",
        "isHub": false
    },
    {
        "source": "mom_path_2_2",
        "target": "mom_path_2_3",
        "isHub": false
    },
    {
        "source": "mom_path_2_3",
        "target": "mom_path_2_4",
        "isHub": false
    },
    {
        "source": "mom_path_2_4",
        "target": "mom_path_2_5",
        "isHub": false
    },
    {
        "source": "mom_path_2_5",
        "target": "mom_path_2_6",
        "isHub": false
    },
    {
        "source": "mom_path_2_6",
        "target": "deep_void",
        "isHub": false
    },
    {
        "source": "iron_will",
        "target": "void_path_1_1",
        "isHub": false
    },
    {
        "source": "void_path_1_1",
        "target": "void_path_1_2",
        "isHub": false
    },
    {
        "source": "void_path_1_2",
        "target": "void_path_1_3",
        "isHub": false
    },
    {
        "source": "void_path_1_3",
        "target": "void_path_1_4",
        "isHub": false
    },
    {
        "source": "void_path_1_4",
        "target": "focus_lens",
        "isHub": false
    },
    {
        "source": "focus_lens",
        "target": "void_path_2_1",
        "isHub": false
    },
    {
        "source": "void_path_2_1",
        "target": "void_path_2_2",
        "isHub": false
    },
    {
        "source": "void_path_2_2",
        "target": "void_path_2_3",
        "isHub": false
    },
    {
        "source": "void_path_2_3",
        "target": "void_path_2_4",
        "isHub": false
    },
    {
        "source": "void_path_2_4",
        "target": "void_path_2_5",
        "isHub": false
    },
    {
        "source": "void_path_2_5",
        "target": "void_path_2_6",
        "isHub": false
    },
    {
        "source": "void_path_2_6",
        "target": "eclipse",
        "isHub": false
    },
    {
        "source": "chain_reaction",
        "target": "bridge_nw_1",
        "isHub": false
    },
    {
        "source": "bridge_nw_1",
        "target": "bridge_nw_2",
        "isHub": false
    },
    {
        "source": "bridge_nw_2",
        "target": "bridge_nw_3",
        "isHub": false
    },
    {
        "source": "bridge_nw_3",
        "target": "bridge_nw_4",
        "isHub": false
    },
    {
        "source": "bridge_nw_4",
        "target": "singularity",
        "isHub": false
    },
    {
        "source": "deep_void",
        "target": "bridge_w_1",
        "isHub": false
    },
    {
        "source": "bridge_w_1",
        "target": "bridge_w_2",
        "isHub": false
    },
    {
        "source": "bridge_w_2",
        "target": "bridge_w_3",
        "isHub": false
    },
    {
        "source": "bridge_w_3",
        "target": "bridge_w_4",
        "isHub": false
    },
    {
        "source": "bridge_w_4",
        "target": "bridge_w_5",
        "isHub": false
    },
    {
        "source": "bridge_w_5",
        "target": "singularity",
        "isHub": false
    },
    {
        "source": "chain_reaction",
        "target": "bridge_ne_1",
        "isHub": false
    },
    {
        "source": "bridge_ne_1",
        "target": "bridge_ne_2",
        "isHub": false
    },
    {
        "source": "bridge_ne_2",
        "target": "bridge_ne_3",
        "isHub": false
    },
    {
        "source": "bridge_ne_3",
        "target": "bridge_ne_4",
        "isHub": false
    },
    {
        "source": "bridge_ne_4",
        "target": "void_ascendant",
        "isHub": false
    },
    {
        "source": "eclipse",
        "target": "bridge_e_1",
        "isHub": false
    },
    {
        "source": "bridge_e_1",
        "target": "bridge_e_2",
        "isHub": false
    },
    {
        "source": "bridge_e_2",
        "target": "bridge_e_3",
        "isHub": false
    },
    {
        "source": "bridge_e_3",
        "target": "bridge_e_4",
        "isHub": false
    },
    {
        "source": "bridge_e_4",
        "target": "bridge_e_5",
        "isHub": false
    },
    {
        "source": "bridge_e_5",
        "target": "void_ascendant",
        "isHub": false
    },
    {
        "source": "deep_void",
        "target": "bridge_sw_1",
        "isHub": false
    },
    {
        "source": "bridge_sw_1",
        "target": "bridge_sw_2",
        "isHub": false
    },
    {
        "source": "bridge_sw_2",
        "target": "bridge_sw_3",
        "isHub": false
    },
    {
        "source": "bridge_sw_3",
        "target": "bridge_sw_4",
        "isHub": false
    },
    {
        "source": "bridge_sw_4",
        "target": "event_horizon",
        "isHub": false
    },
    {
        "source": "eclipse",
        "target": "bridge_se_1",
        "isHub": false
    },
    {
        "source": "bridge_se_1",
        "target": "bridge_se_2",
        "isHub": false
    },
    {
        "source": "bridge_se_2",
        "target": "bridge_se_3",
        "isHub": false
    },
    {
        "source": "bridge_se_3",
        "target": "bridge_se_4",
        "isHub": false
    },
    {
        "source": "bridge_se_4",
        "target": "event_horizon",
        "isHub": false
    }
];
