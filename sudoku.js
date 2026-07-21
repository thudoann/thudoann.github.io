/* ---------- Sudoku ---------- */
(function () {

  /* ---- Helpers ---- */

  function shuffled(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function findEmpty(g) {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++)
        if (g[r][c] === 0) return [r, c];
    return null;
  }

  function canPlace(g, r, c, n) {
    if (g[r].includes(n)) return false;
    for (let i = 0; i < 9; i++) if (g[i][c] === n) return false;
    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++)
      for (let j = bc; j < bc + 3; j++)
        if (g[i][j] === n) return false;
    return true;
  }

  /* ---- Generator ---- */

  function fillGrid(g) {
    const pos = findEmpty(g);
    if (!pos) return true;
    const [r, c] = pos;
    for (const n of shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (canPlace(g, r, c, n)) {
        g[r][c] = n;
        if (fillGrid(g)) return true;
        g[r][c] = 0;
      }
    }
    return false;
  }

  function generateSolution() {
    const g = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillGrid(g);
    return g;
  }

  /* MRV: pick the empty cell with fewest valid options — dramatically faster for sparse grids */
  function findBestEmpty(g) {
    let best = null, bestCount = 10;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] !== 0) continue;
        let count = 0;
        for (let n = 1; n <= 9; n++) if (canPlace(g, r, c, n)) count++;
        if (count === 0) return "dead";
        if (count < bestCount) { bestCount = count; best = [r, c]; if (count === 1) return best; }
      }
    }
    return best; // null = all filled (solved)
  }

  function countSolutions(grid, limit) {
    let count = 0;
    const g = grid.map((r) => [...r]);
    function solve() {
      if (count >= limit) return;
      const pos = findBestEmpty(g);
      if (pos === null)   { count++; return; }
      if (pos === "dead") return;
      const [r, c] = pos;
      for (let n = 1; n <= 9; n++) {
        if (canPlace(g, r, c, n)) {
          g[r][c] = n;
          solve();
          g[r][c] = 0;
        }
      }
    }
    solve();
    return count;
  }

  function createPuzzle(solution, difficulty) {
    const clues = { easy: 46, medium: 36, hard: 28, expert: 24, evil: 21 }[difficulty] ?? 36;
    const toRemove = 81 - clues;
    const puzzle = solution.map((r) => [...r]);
    let removed = 0;
    for (const pos of shuffled([...Array(81).keys()])) {
      if (removed >= toRemove) break;
      const r = Math.floor(pos / 9), c = pos % 9;
      const backup = puzzle[r][c];
      puzzle[r][c] = 0;
      if (countSolutions(puzzle, 2) === 1) {
        removed++;
      } else {
        puzzle[r][c] = backup;
      }
    }
    return puzzle;
  }

  /* ---- Game ---- */

  function initSudoku(panel) {
    const boardEl = panel.querySelector("[data-role='sudoku-board']");
    if (!boardEl || boardEl.dataset.initialized) return;
    boardEl.dataset.initialized = "1";

    const timerEl  = panel.querySelector("[data-role='sudoku-timer']");
    const msgEl    = panel.querySelector("[data-role='sudoku-message']");
    const notesBtn = panel.querySelector("[data-role='sudoku-notes']");
    const numpadEl = panel.querySelector("[data-role='sudoku-numpad']");
    const diffEl   = panel.querySelector("[data-role='sudoku-difficulty']");
    const bestsEl      = panel.querySelector("[data-role='sudoku-bests']");
    const namePromptEl = panel.querySelector("[data-role='sudoku-name-prompt']");
    const mistakesEl   = panel.querySelector("[data-role='sudoku-mistakes']");
    const fr = typeof isFr !== "undefined" && isFr;
    const MAX_MISTAKES = 3;

    const BEST_KEY = "sudoku_best_v2";
    const NAME_KEY = "sudoku_player_name";

    function loadBests() {
      try { return JSON.parse(localStorage.getItem(BEST_KEY)) || {}; } catch (_) { return {}; }
    }

    function saveBestTime(diff, seconds) {
      const bests = loadBests();
      const prev = bests[diff];
      if (!prev || seconds < prev.time) {
        bests[diff] = { time: seconds, name: prev ? prev.name : "" };
        localStorage.setItem(BEST_KEY, JSON.stringify(bests));
        return true;
      }
      return false;
    }

    function saveBestName(diff, name) {
      const bests = loadBests();
      if (bests[diff]) { bests[diff].name = name; localStorage.setItem(BEST_KEY, JSON.stringify(bests)); }
      if (name) localStorage.setItem(NAME_KEY, name);
    }

    function fmtSecs(s) {
      return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    }

    function renderBests(newRecordDiff) {
      if (!bestsEl) return;
      const bests = loadBests();
      const diffs = fr
        ? [["easy", "Facile"], ["medium", "Moyen"], ["hard", "Difficile"], ["expert", "Expert"], ["evil", "Extrême"]]
        : [["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"], ["expert", "Expert"], ["evil", "Evil"]];
      const heading = fr ? "Meilleurs temps" : "Best times";
      bestsEl.innerHTML = `
        <span class="sudoku-bests-label">${heading}</span>
        ${diffs.map(([key, label]) => {
          const entry = bests[key];
          const isNew = key === newRecordDiff;
          return `<span class="sudoku-best-item${isNew ? " sudoku-best-new" : ""}">
            <span class="sudoku-best-diff">${label}</span>
            <span class="sudoku-best-time">${entry ? fmtSecs(entry.time) : "—"}</span>
            ${entry && entry.name ? `<span class="sudoku-best-name">${entry.name}</span>` : ""}
          </span>`;
        }).join("")}
      `;
    }

    function showNamePrompt(diff) {
      if (!namePromptEl) return;
      const input   = namePromptEl.querySelector("[data-role='sudoku-name-input']");
      const saveBtn = namePromptEl.querySelector("[data-role='sudoku-name-save']");
      if (input) input.value = localStorage.getItem(NAME_KEY) || "";
      namePromptEl.classList.add("visible");
      if (input) setTimeout(() => input.focus(), 80);

      function commit() {
        const name = input ? input.value.trim() : "";
        saveBestName(diff, name);
        renderBests(null);
        namePromptEl.classList.remove("visible");
      }
      if (saveBtn) saveBtn.onclick = commit;
      if (input)   input.onkeydown = (e) => { if (e.key === "Enter") commit(); };
    }

    let solution, puzzle, board, notes, given;
    let selected = null;
    let notesMode = false;
    let undoStack = [];
    let timerStart = 0, timerInterval = null;
    let isSolved = false;
    let completedUnits = new Set();
    let mistakes = 0;

    /* Build numpad */
    for (let n = 1; n <= 9; n++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sudoku-num-btn";
      btn.textContent = n;
      btn.dataset.num = n;
      btn.addEventListener("click", () => input(n));
      numpadEl.appendChild(btn);
    }
    const eraseBtn = document.createElement("button");
    eraseBtn.type = "button";
    eraseBtn.className = "sudoku-num-btn sudoku-erase-btn";
    eraseBtn.textContent = "⌫";
    eraseBtn.addEventListener("click", () => input(0));
    numpadEl.appendChild(eraseBtn);

    panel.querySelector("[data-role='sudoku-new']").addEventListener("click", newGame);
    panel.querySelector("[data-role='sudoku-undo']").addEventListener("click", undoLast);
    panel.querySelector("[data-role='sudoku-check']").addEventListener("click", checkSolution);
    panel.querySelector("[data-role='sudoku-reveal']").addEventListener("click", revealSolution);
    notesBtn.addEventListener("click", toggleNotes);
    document.addEventListener("keydown", onKey);

    newGame();
    renderBests(null);
    renderMistakes();

    /* ---- New game ---- */

    async function newGame() {
      isSolved = false;
      notesMode = false;
      undoStack = [];
      notesBtn.classList.remove("active");
      notesBtn.setAttribute("aria-pressed", "false");
      boardEl.classList.remove("sudoku-solved");
      if (namePromptEl) namePromptEl.classList.remove("visible");
      stopTimer();
      if (timerEl) timerEl.textContent = "00:00";
      completedUnits = new Set();
      mistakes = 0;
      renderMistakes();
      selected = null;

      const diff = diffEl ? diffEl.value : "medium";
      const slow = diff === "expert" || diff === "evil";
      if (slow) {
        setMsg(fr ? "Génération…" : "Generating…");
        boardEl.style.opacity = "0.4";
        await new Promise((res) => setTimeout(res, 30));
      } else {
        setMsg("");
      }

      solution = generateSolution();
      puzzle   = createPuzzle(solution, diff);
      board    = puzzle.map((r) => [...r]);
      notes    = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
      given    = puzzle.map((r) => r.map((v) => v !== 0));

      boardEl.style.opacity = "";
      setMsg("");
      startTimer();
      renderBoard();
    }

    /* ---- Render ---- */

    function renderBoard() {
      boardEl.innerHTML = "";
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const cell = document.createElement("div");
          cell.className = "sudoku-cell";
          cell.dataset.r = r;
          cell.dataset.c = c;
          cell.setAttribute("role", "gridcell");
          if (given[r][c]) cell.classList.add("sudoku-given");
          cell.addEventListener("click", () => selectCell(r, c));
          boardEl.appendChild(cell);
        }
      }
      refresh();
    }

    function refresh() {
      const conflicts = findConflicts();
      const counts = Array(10).fill(0);
      for (let r = 0; r < 9; r++)
        for (let c = 0; c < 9; c++)
          if (board[r][c]) counts[board[r][c]]++;

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const cell = boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
          if (!cell) continue;

          cell.classList.remove("sudoku-selected", "sudoku-related", "sudoku-same", "sudoku-conflict", "sudoku-unit-done");
          cell.innerHTML = "";

          const val = board[r][c];
          if (val !== 0) {
            const s = document.createElement("span");
            s.textContent = val;
            cell.appendChild(s);
          } else {
            const ns = notes[r][c];
            if (ns.size > 0) {
              const ng = document.createElement("div");
              ng.className = "sudoku-notes-grid";
              for (let n = 1; n <= 9; n++) {
                const nd = document.createElement("span");
                nd.textContent = ns.has(n) ? n : "";
                ng.appendChild(nd);
              }
              cell.appendChild(ng);
            }
          }

          if (conflicts.has(`${r},${c}`)) cell.classList.add("sudoku-conflict");
          const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
          if (completedUnits.has(`r${r}`) || completedUnits.has(`c${c}`) || completedUnits.has(`b${b}`)) {
            cell.classList.add("sudoku-unit-done");
          }
        }
      }

      /* Selection highlight */
      if (selected) {
        const { r, c } = selected;
        const selVal = board[r][c];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            const cell = boardEl.querySelector(`[data-r="${i}"][data-c="${j}"]`);
            if (!cell) continue;
            if (i === r && j === c) {
              cell.classList.add("sudoku-selected");
            } else if (
              i === r || j === c ||
              (Math.floor(i / 3) === Math.floor(r / 3) && Math.floor(j / 3) === Math.floor(c / 3))
            ) {
              cell.classList.add("sudoku-related");
              if (selVal && board[i][j] === selVal) cell.classList.add("sudoku-same");
            } else if (selVal && board[i][j] === selVal) {
              cell.classList.add("sudoku-same");
            }
          }
        }
      }

      /* Dim numpad buttons for completed numbers */
      numpadEl.querySelectorAll(".sudoku-num-btn[data-num]").forEach((btn) => {
        const n = parseInt(btn.dataset.num, 10);
        btn.classList.toggle("sudoku-num-done", counts[n] >= 9);
      });
    }

    function findConflicts() {
      const set = new Set();
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const v = board[r][c];
          if (!v) continue;
          for (let j = 0; j < 9; j++)
            if (j !== c && board[r][j] === v) { set.add(`${r},${c}`); set.add(`${r},${j}`); }
          for (let i = 0; i < 9; i++)
            if (i !== r && board[i][c] === v) { set.add(`${r},${c}`); set.add(`${i},${c}`); }
          const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
          for (let i = br; i < br + 3; i++)
            for (let j = bc; j < bc + 3; j++)
              if ((i !== r || j !== c) && board[i][j] === v) { set.add(`${r},${c}`); set.add(`${i},${j}`); }
        }
      }
      return set;
    }

    /* ---- Interaction ---- */

    function selectCell(r, c) {
      selected = { r, c };
      refresh();
    }

    function input(n) {
      if (!selected || isSolved) return;
      const { r, c } = selected;
      if (given[r][c]) return;

      const oldVal   = board[r][c];
      const oldNotes = new Set(notes[r][c]);

      if (notesMode && n !== 0) {
        if (notes[r][c].has(n)) notes[r][c].delete(n);
        else notes[r][c].add(n);
        undoStack.push({ r, c, oldVal, oldNotes });
        refresh();
        return;
      }

      /* Wrong number → count mistake */
      if (n !== 0 && n !== solution[r][c]) {
        mistakes++;
        renderMistakes();
        board[r][c] = n;          /* show the wrong digit briefly */
        refresh();
        if (mistakes >= MAX_MISTAKES) {
          undoStack.push({ r, c, oldVal, oldNotes });
          gameOver();
        }
        return;
      }

      board[r][c] = n;
      if (n !== 0) {
        notes[r][c].clear();
        eraseRelatedNotes(r, c, n);
      }
      undoStack.push({ r, c, oldVal, oldNotes });

      refresh();
      if (n !== 0) {
        checkUnitCompletions();
        autoWinCheck();
      }
    }

    function eraseRelatedNotes(r, c, n) {
      for (let j = 0; j < 9; j++) notes[r][j].delete(n);
      for (let i = 0; i < 9; i++) notes[i][c].delete(n);
      const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
      for (let i = br; i < br + 3; i++)
        for (let j = bc; j < bc + 3; j++)
          notes[i][j].delete(n);
    }

    function undoLast() {
      if (!undoStack.length || isSolved) return;
      const { r, c, oldVal, oldNotes } = undoStack.pop();
      board[r][c]  = oldVal;
      notes[r][c]  = oldNotes;
      refresh();
    }

    function toggleNotes() {
      notesMode = !notesMode;
      notesBtn.classList.toggle("active", notesMode);
      notesBtn.setAttribute("aria-pressed", String(notesMode));
    }

    function checkSolution() {
      const conflicts = findConflicts();
      const allFilled = board.every((row) => row.every((v) => v !== 0));
      if (!allFilled) {
        setMsg(fr ? "La grille n'est pas encore complète." : "Not complete yet — keep going.");
      } else if (conflicts.size > 0) {
        setMsg(fr ? "Des conflits — vérifiez les cases en rouge." : "Conflicts detected — check the red cells.");
      } else {
        triggerWin();
      }
    }

    function autoWinCheck() {
      if (board.every((row, r) => row.every((v, c) => v === solution[r][c]))) {
        triggerWin();
      }
    }

    function triggerWin() {
      isSolved = true;
      stopTimer();
      const elapsed = Math.floor((Date.now() - timerStart) / 1000);
      const diff = diffEl ? diffEl.value : "medium";
      const isRecord = saveBestTime(diff, elapsed);

      boardEl.classList.add("sudoku-solved");
      setTimeout(() => boardEl.classList.remove("sudoku-solved"), 900);

      const t = timerEl ? timerEl.textContent : fmtSecs(elapsed);
      const extra = isRecord ? (fr ? " 🏆 Nouveau record !" : " 🏆 New record!") : "";
      setMsg(fr ? `Bravo ! Résolu en ${t}${extra}` : `Solved in ${t}!${extra}`);

      renderBests(isRecord ? diff : null);
      showNamePrompt(diff);
    }

    function revealSolution() {
      board  = solution.map((r) => [...r]);
      notes  = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
      isSolved = true;
      stopTimer();
      completedUnits = findCompletedUnits();
      refresh();
      setMsg(fr ? "Solution affichée." : "Solution revealed.");
    }

    /* ---- Timer ---- */

    function startTimer() {
      stopTimer();
      timerStart = Date.now();
      timerInterval = setInterval(() => {
        if (!timerEl) return;
        const s = Math.floor((Date.now() - timerStart) / 1000);
        timerEl.textContent =
          `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      }, 500);
    }

    function stopTimer() {
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    }

    /* ---- Keyboard ---- */

    function onKey(e) {
      if (!panel.classList.contains("active")) return;
      if (!selected) return;
      const { r, c } = selected;
      if (e.key >= "1" && e.key <= "9") { e.preventDefault(); input(parseInt(e.key, 10)); }
      else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") { e.preventDefault(); input(0); }
      else if (e.key === "ArrowUp")    { e.preventDefault(); selectCell((r + 8) % 9, c); }
      else if (e.key === "ArrowDown")  { e.preventDefault(); selectCell((r + 1) % 9, c); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); selectCell(r, (c + 8) % 9); }
      else if (e.key === "ArrowRight") { e.preventDefault(); selectCell(r, (c + 1) % 9); }
    }

    /* ---- Mistakes ---- */

    function renderMistakes() {
      if (!mistakesEl) return;
      mistakesEl.innerHTML = Array.from({ length: MAX_MISTAKES }, (_, i) =>
        `<span class="sudoku-mistake-dot${i < mistakes ? " sudoku-mistake-used" : ""}"></span>`
      ).join("");
    }

    function gameOver() {
      isSolved = true;
      stopTimer();
      boardEl.classList.add("sudoku-gameover");
      setTimeout(() => boardEl.classList.remove("sudoku-gameover"), 600);
      setMsg(fr
        ? "3 erreurs — partie terminée. Lancez une nouvelle partie."
        : "3 mistakes — game over. Start a new game.");
    }

    /* ---- Unit completion ---- */

    function findCompletedUnits() {
      const done = new Set();
      for (let r = 0; r < 9; r++) {
        const s = new Set(board[r]);
        if (s.size === 9 && !s.has(0)) done.add(`r${r}`);
      }
      for (let c = 0; c < 9; c++) {
        const s = new Set();
        for (let r = 0; r < 9; r++) s.add(board[r][c]);
        if (s.size === 9 && !s.has(0)) done.add(`c${c}`);
      }
      for (let br = 0; br < 3; br++) {
        for (let bc = 0; bc < 3; bc++) {
          const s = new Set();
          for (let r = br * 3; r < br * 3 + 3; r++)
            for (let c = bc * 3; c < bc * 3 + 3; c++)
              s.add(board[r][c]);
          if (s.size === 9 && !s.has(0)) done.add(`b${br * 3 + bc}`);
        }
      }
      return done;
    }

    function unitCells(unit) {
      const cells = [];
      if (unit[0] === "r") {
        const r = +unit.slice(1);
        for (let c = 0; c < 9; c++) cells.push([r, c]);
      } else if (unit[0] === "c") {
        const c = +unit.slice(1);
        for (let r = 0; r < 9; r++) cells.push([r, c]);
      } else {
        const b = +unit.slice(1), br = Math.floor(b / 3) * 3, bc = (b % 3) * 3;
        for (let r = br; r < br + 3; r++)
          for (let c = bc; c < bc + 3; c++)
            cells.push([r, c]);
      }
      return cells;
    }

    function checkUnitCompletions() {
      const current = findCompletedUnits();
      for (const u of current) {
        if (!completedUnits.has(u)) {
          for (const [r, c] of unitCells(u)) {
            const cell = boardEl.querySelector(`[data-r="${r}"][data-c="${c}"]`);
            if (!cell) continue;
            cell.classList.remove("sudoku-unit-flash");
            void cell.offsetWidth;
            cell.classList.add("sudoku-unit-flash");
            cell.addEventListener("animationend", () => cell.classList.remove("sudoku-unit-flash"), { once: true });
          }
        }
      }
      completedUnits = current;
    }

    /* ---- Util ---- */

    function setMsg(msg) {
      if (msgEl) msgEl.textContent = msg;
    }
  }

  window.initSudoku = initSudoku;
})();
