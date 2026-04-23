/* 🎵 MUSIC */
function toggleMusic() {
  document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");

  if (!music) return;

  if (music.paused) {
    music.play().catch(() => {});
    if (btn) btn.textContent = "🔇 Mute";
  } else {
    music.pause();
    if (btn) btn.textContent = "🔊 Music";
  }
}

/* 🎮 VARIABLES */
let love = 0;
let curse = 0;

const MAX = 5;

if (music.paused) {
  music.play();
}

intro();

/* ▶ START GAME */
function startGame() {
  toggleScreen("home", false);
  toggleScreen("game", true);

  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.5;
    music.play().catch(() => {});
  }

  intro();
}

/* 🔄 RESTART */
function restart() {
  love = 0;
  curse = 0;

  updateBars(true);

  document.getElementById("story").innerText = "";
  document.getElementById("choices").innerHTML = "";
  document.getElementById("restart").style.display = "none";

  // 🔥 BACK TO MENU
  toggleScreen("game", false);
  toggleScreen("home", true);

  // 🎵 resetar música
  if (music.paused) {
    music.play();
  }

  intro();
}

/* 🔁 TOGGLE SCREENS */
function toggleScreen(id, show) {
  const el = document.getElementById(id);
  if (!el) return;

  el.style.display = show ? "flex" : "none";
}

/* 🎬 UPDATE BARS */
function updateBars(reset = false) {
  const loveFill = document.getElementById("loveFill");
  const curseFill = document.getElementById("curseFill");

  if (!loveFill || !curseFill) return;

  if (reset) {
    loveFill.style.width = "0%";
    curseFill.style.width = "0%";
    return;
  }

  let lovePercent = (love / MAX) * 100;
  let cursePercent = (curse / MAX) * 100;

  loveFill.style.width = lovePercent + "%";
  curseFill.style.width = cursePercent + "%";

  // 🔥 GARANTE AS CORES SEMPRE
  loveFill.style.background = "#ffc0cb"; //  beuatiful pink
  curseFill.style.background = "#800080"; //  strong purple

  // ✨ brilho dinâmico
  loveFill.style.boxShadow = "0 0 15px #ffc0cb";
  curseFill.style.boxShadow = "0 0 15px #800080";
}

/* 🌟 COMPLETE BAR */
function completeBar(type) {
  const loveFill = document.getElementById("loveFill");
  const curseFill = document.getElementById("curseFill");

  if (!loveFill || !curseFill) return;

  if (type === "love") {
    loveFill.style.width = "100%";
    curseFill.style.width = "0%";
  } else {
    loveFill.style.width = "0%";
    curseFill.style.width = "100%";
  }
}

/* ✨ TRANSITION */
function fade(callback) {
  const box = document.getElementById("box");
  if (!box) {
    callback();
    return;
  }

  box.style.transition = "opacity 0.3s";
  box.style.opacity = 0;

  setTimeout(() => {
    callback();
    box.style.opacity = 1;
  }, 300);
}

/* 🎮 SCENE */
function setScene(text, options) {
  document.getElementById("story").innerText = text;

  let div = document.getElementById("choices");
  div.innerHTML = "";

  options.forEach((opt) => {
    let btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.className = "choice";
    btn.onclick = opt.action;
    div.appendChild(btn);
  });
}

/* 🟣 INTRO */
function intro() {
  setScene(
    `Aurora hears a faint whisper in the castle...

"Don't go alone," Louis says.

What should she do?`,
    [
      { text: "💜 Trust Louis", action: scene2, type: "love" },
      { text: "🌑 Go alone", action: scene3, type: "curse" },
    ],
  );
}
/* 💜 SCENE 2  */
function scene2() {
  love++;
  updateBars();
  setScene(
    `They walk together through the cold halls.

She feels safer with him.`,
    [
      { text: "💜 Hold his hand", action: scene4, type: "love" },
      { text: "🌑 Let go", action: scene5, type: "curse" },
    ],
  );
}
/* 💜 SCENE 3  */
function scene3() {
  curse++;
  updateBars();
  curse++;
  setScene(
    `The whisper grows louder...

"You belong to me..."`,
    [
      { text: "🌑 Follow the voice", action: scene5, type: "curse" },
      { text: "💜 Go back to Louis", action: scene2, type: "love" },
    ],
  );
}

/* 💜 SCENE 4  */
function scene4() {
  love++;
  updateBars();
  setScene(
    `Aurora feels something strange inside her.

Should she tell Louis?`,
    [
      { text: "💜 Tell him everything", action: trustLouis, type: "love" },
      { text: "🌑 Hide the truth", action: hideTruth, tyoe: "curse" },
    ],
  );
}
/* 💜 SCENE 5  */
function scene5() {
  curse++;
  updateBars();
  setScene(
    `A shadow appears in the corridor...

Watching her.`,
    [
      { text: "🌑 Follow the shadow", action: scene6, type: "curse" },
      { text: "💜 Run back to Louis", action: scene4, type: "love" },
    ],
  );
}
/* 💜  TRUST LOUIS   */
function trustLouis() {
  love++;
  updateBars();
  setScene(
    `"I trust you," Aurora says.

Louis smiles gently.

"We face this together."`,
    [
      { text: "💜 Stay close", action: scene7, type: "love" },
      { text: "🌑 Pull away", action: scene6, type: "curse" },
    ],
  );
}
/* 🌑 HIDE TRUTH   */
function hideTruth() {
  curse++;
  updateBars();
  setScene(
    `Aurora stays silent.

The darkness grows inside her.`,
    [
      { text: "🌑 Push him away", action: scene6, type: "curse" },
      { text: "💜 Change your mind", action: trustLouis, type: "love" },
    ],
  );
}
/* 💜  SCENE 6   */
function scene6() {
  curse++;
  updateBars();
  setScene(
    `The castle begins to shake.

The curse is getting stronger.`,
    [
      { text: "🌑 Accept the power", action: scene8, type: "curse" },
      { text: "💜 Resist it", action: scene7, type: "love" },
    ],
  );
}
/* 💜  SCENE 7  */
function scene7() {
  love++;
  updateBars();
  setScene(
    `They find a glowing mirror.

Their reflections look different.`,
    [
      { text: "💜 Look together", action: scene9, type: "love" },
      { text: "🌑 Look alone", action: scene8, type: "curse" },
    ],
  );
}
/* 💜  SCENE 8  */
function scene8() {
  curse++;
  updateBars();
  setScene(
    `A dark version of Aurora appears.

"You are powerful," it whispers.`,
    [
      { text: "🌑 Listen to it", action: scene10, type: "curse" },
      { text: "💜 Fight it", action: scene9, type: "love" },
    ],
  );
}
/* ⚔ SCENE 9 */
function scene9() {
  love++;
  updateBars();
  setScene(
    `Aurora feels the final moment is near.

What should she do?`,
    [
      { text: "💜 Face the curse", action: faceCurse, type: "love" },
      { text: "🌑 Run away", action: runAway, type: "curse" },
    ],
  );
}
/* ⚔ SCENE 10 */
function scene10() {
  curse++;
  updateBars();
  setScene(`The darkness surrounds her completely...`, [
    { text: "🌑 Give in", action: finalBad, type: "cursse" },
    { text: "💜 Last resistance", action: faceCurse, type: "love" },
  ]);
}
/* 💜 FACE CURSE*/
function faceCurse() {
  love++;
  updateBars();
  setScene(
    `Aurora stands strong.

With Louis beside her, she is not afraid.`,
    [
      { text: "💜 Fight together", action: finalGood, type: "love" },
      { text: "🌑 Lose control", action: finalBad, type: "curse" },
    ],
  );
}
/* 🌑 RUN AWAY*/
function runAway() {
  curse++;
  updateBars();
  setScene(
    `Aurora turns away...

But the darkness follows.`,
    [
      { text: "🌑 Give in", action: finalBad, type: "curse" },
      { text: "💜 Turn back", action: faceCurse, type: "love" },
    ],
  );
}
/* FINAL GOOD  */
function finalGood() {
  fade(() => {
    setScene(
      `💜 HAPPY ENDING  
      
Aurora takes Louis' hand.

Together, they break the curse.

Light returns to the castle.

They build a life together.
`,
      [],
    );

    showRestart(); // 🔥 SHOW BUTTON
  });
}

/* FINAL BAD */
function finalBad() {
  fade(() => {
    setScene(
      `🌑 TRAGIC ENDING  

Aurora lets the darkness win.

Louis reaches for her...

But she is gone.

Louis loses Aurora forever.`,
      [],
    );

    showRestart(); // 🔥 SHOW BUTTON
  });
}
function showRestart() {
  const btn = document.getElementById("restart");
  btn.style.display = "inline-block";
}

document.body.style.background = "black";
document.body.style.background = "#1a0f1f";
