(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const flowPaths = $$(".flow-line");
  const sludgePaths = $$(".sludge-line");
  const nodes = $$(".node-group");
  const infoTitle = $("#infoTitle");
  const infoText = $("#infoText");
  const btnToggle = $("#toggleFlow");
  const btnReplay = $("#replayFlow");

  let playing = false;

  function setPlaying(next) {
    playing = next;
    document.body.classList.toggle("playing", playing);
    btnToggle.textContent = playing ? "⏸ 暂停流动" : "🌊 开始流动";
  }

  function replay() {
    // 重置动画
    const allPaths = flowPaths.concat(sludgePaths);
    allPaths.forEach(p => {
      p.style.animation = "none";
      // 触发回流
      // eslint-disable-next-line no-unused-expressions
      p.offsetHeight;
      p.style.animation = "";
    });

    if (!playing) {
      setPlaying(true);
    }
  }

  function clearActive() {
    nodes.forEach(n => n.classList.remove("active"));
  }

  function showInfoFromNode(el) {
    const title = el.getAttribute("data-title") || "流程节点";
    const text = el.getAttribute("data-text") || "";
    infoTitle.textContent = title;
    infoText.textContent = text;
  }

  // 绑定事件：节点点击
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      clearActive();
      node.classList.add("active");
      showInfoFromNode(node);
    });
    node.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        node.click();
      }
    });
    node.setAttribute("tabindex", "0");
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", node.getAttribute("data-title") || "流程节点");
  });

  // 控制按钮
  btnToggle.addEventListener("click", () => setPlaying(!playing));
  btnReplay.addEventListener("click", replay);

  // 初始提示
  const first = $("#source");
  if (first) {
    first.classList.add("active");
    showInfoFromNode(first);
  }
})();


