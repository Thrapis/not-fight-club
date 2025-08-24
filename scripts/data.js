const PLAYER_IMAGES = [
  "./assets/img/player/Amazon.gif",
  "./assets/img/player/Assassin.gif",
  "./assets/img/player/Barbarian.gif",
  "./assets/img/player/Druid.gif",
  "./assets/img/player/Necromancer.gif",
  "./assets/img/player/Paladin.gif",
  "./assets/img/player/Sorceress.gif",
];

const PLAYER_CHARS = {
  maxHealth: 100,
  damage: 10,
  criticalChance: 25,
};

const ATTACK_DIRECTIONS = [
  { code: "head-point-attack", name: "Head" },
  { code: "neck-point-attack", name: "Neck" },
  { code: "body-point-attack", name: "Body" },
  { code: "belly-point-attack", name: "Belly" },
  { code: "legs-point-attack", name: "Legs" },
];

const DEFENCE_DIRECTIONS = [
  { code: "head-point-defence", name: "Head" },
  { code: "neck-point-defence", name: "Neck" },
  { code: "body-point-defence", name: "Body" },
  { code: "belly-point-defence", name: "Belly" },
  { code: "legs-point-defence", name: "Legs" },
];

const ENEMY_LIST = [
  {
    img: "./assets/img/enemy/Fallen.gif",
    name: "Fallen",
    attackCount: 1,
    defenceCount: 1,
    maxHealth: 80,
    damage: 5,
    criticalChance: 10,
    weight: 24,
  },
  {
    img: "./assets/img/enemy/Fetish.gif",
    name: "Fetish",
    attackCount: 3,
    defenceCount: 0,
    maxHealth: 45,
    damage: 7,
    criticalChance: 10,
    weight: 20,
  },
  {
    img: "./assets/img/enemy/Abominable.gif",
    name: "Abominable",
    attackCount: 1,
    defenceCount: 3,
    maxHealth: 160,
    damage: 6,
    criticalChance: 5,
    weight: 14,
  },
  {
    img: "./assets/img/enemy/Fallen_Shaman.gif",
    name: "Fallen Shaman",
    attackCount: 1,
    defenceCount: 1,
    maxHealth: 120,
    damage: 12,
    criticalChance: 5,
    weight: 14,
  },
  {
    img: "./assets/img/enemy/Fetish_Shaman.gif",
    name: "Fetish Shaman",
    attackCount: 2,
    defenceCount: 0,
    maxHealth: 60,
    damage: 15,
    criticalChance: 25,
    weight: 12,
  },
  {
    img: "./assets/img/enemy/Hell_Bovine.gif",
    name: "Hell Bovine",
    attackCount: 1,
    defenceCount: 1,
    maxHealth: 160,
    damage: 7,
    criticalChance: 10,
    weight: 8,
  },
  {
    img: "./assets/img/enemy/Moon_Lord.gif",
    name: "Moon Lord",
    attackCount: 1,
    defenceCount: 2,
    maxHealth: 180,
    damage: 10,
    criticalChance: 15,
    weight: 5,
  },
  {
    img: "./assets/img/enemy/Mephisto.gif",
    name: "Mephisto",
    attackCount: 1,
    defenceCount: 0,
    maxHealth: 300,
    damage: 15,
    criticalChance: 10,
    weight: 1,
  },
];

const HIT_SOUNDS = [
  "../assets/sound/hit/blade1.wav",
  "../assets/sound/hit/blade2.wav",
  "../assets/sound/hit/blade3.wav",
  "../assets/sound/hit/blade4.wav",
  "../assets/sound/hit/blade5.wav",
  "../assets/sound/hit/blade6.wav",
  "../assets/sound/hit/sword1.wav",
  "../assets/sound/hit/sword2.wav",
  "../assets/sound/hit/sword3.wav",
  "../assets/sound/hit/sword4.wav",
  "../assets/sound/hit/sword5.wav",
  "../assets/sound/hit/sword6.wav",
];


const BLOCK_SOUNDS = [
  "../assets/sound/block/block-arrow1.wav",
  "../assets/sound/block/block-arrow2.wav",
  "../assets/sound/block/block-arrow3.wav",
  "../assets/sound/block/block-blade1.wav",
  "../assets/sound/block/block-blade4.wav",
  "../assets/sound/block/block-blade5.wav",
  "../assets/sound/block/block-blunt1.wav",
  "../assets/sound/block/block-blunt2.wav",
  "../assets/sound/block/block-blunt4.wav",
];
