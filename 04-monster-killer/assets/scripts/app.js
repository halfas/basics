const ATK_VALUE = 10;
const STRONG_ATK_VALUE = 17;
const MONSTER_ATK_VALUE = 14;
const HEAL_VALUE = 20;
const NORMAL_ATTACK = 'NORMAL_ATTACK';
const STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATK = 'PLAYER_ATK';
const LOG_EVENT_PLAYER_STRONG_ATK = 'PLAYER_STRONG_ATK';
const LOG_EVENT_MONSTER_ATK = 'MONSTER_ATK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const enteredHealth = prompt('Enter amount of HP for u and ur oponent', '100');
const battleLogs = [];

let maxHealth = parseInt(enteredHealth);

if (isNaN(maxHealth) || maxHealth <= 0) {
  maxHealth = 100;
}

let currentMonsterHealth = maxHealth;
let currentPlayerHealth = maxHealth;
let hasBonusLife = true;

adjustHealthBars(maxHealth);

function writeLogs(event, value, playerHealth, monsterHealth) {
  let logEntry = {
    event: event,
    value: value,
    monsterHP: monsterHealth,
    playerHP: playerHealth,
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_GAME_OVER:
      break;
    default: logEntry = {};
  }


  // if (event === LOG_EVENT_PLAYER_ATK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_PLAYER_STRONG_ATK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_MONSTER_ATK) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = 'PLAYER';
  // } else if (event === LOG_EVENT_GAME_OVER) {
  // }
  battleLogs.push(logEntry);
}

function endRound() {
  const initialPhayerHealth = currentPlayerHealth;
  const monsterAttack = dealPlayerDamage(MONSTER_ATK_VALUE);
  currentPlayerHealth -= monsterAttack;

  writeLogs(LOG_EVENT_MONSTER_ATK, monsterAttack, currentPlayerHealth, currentMonsterHealth);
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPhayerHealth;
    setPlayerHealth(initialPhayerHealth);
    alert('Bonus life');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Player won');
    writeLogs(LOG_EVENT_GAME_OVER, 'Player won', currentPlayerHealth, currentMonsterHealth);
    resetGame(maxHealth);
  }
  else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('Draw');
    writeLogs(LOG_EVENT_GAME_OVER, 'Draw', currentPlayerHealth, currentMonsterHealth);
    resetGame(maxHealth);
  }
  else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster won');
    writeLogs(LOG_EVENT_GAME_OVER, 'Monster won', currentPlayerHealth, currentMonsterHealth);
    resetGame(maxHealth);
  }
}

function atkMonster(atkType) {
  const maxDamage = atkType === NORMAL_ATTACK ? ATK_VALUE : STRONG_ATK_VALUE;
  let logEvent = atkType === NORMAL_ATTACK ? LOG_EVENT_PLAYER_ATK : LOG_EVENT_PLAYER_STRONG_ATK;

  // if (atkType === NORMAL_ATTACK) {
  //   maxDamage = ATK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATK;
  // } else if (atkType === STRONG_ATTACK) {
  //   maxDamage = STRONG_ATK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATK;
  // }
  const playerAttack = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= playerAttack;
  writeLogs(logEvent, playerAttack, currentPlayerHealth, currentMonsterHealth);
  endRound();
}

function attackHandler() {
  atkMonster(NORMAL_ATTACK);
}

function strongAttackHandler() {
  atkMonster(STRONG_ATTACK);
}

function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeLogs(LOG_EVENT_PLAYER_HEAL, HEAL_VALUE, currentPlayerHealth, currentMonsterHealth);
  endRound();
}

function printLogs() {
  console.log(battleLogs);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogs);