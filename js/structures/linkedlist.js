const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const stepText = document.getElementById("step-text");
const listRow = document.getElementById("listRow");
const headArrow = document.getElementById("headArrow");
const newNodeArea = document.getElementById("newNodeArea");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");

const codeLines = [line1, line2, line3];

const steps = [
    "Step 1: Original list. Head points to the first node, which contains 3.",
    "Step 2: A new node with value 8 is created. It is separate from the list for now.",
    "Step 3: The new node’s next pointer is updated so it points to the old head node.",
    "Step 4: Head is updated so the new node becomes the first node in the list."
];

let currentStep = 0;

function clearCodeHighlight() {
    codeLines.forEach(function (line) {
        line.classList.remove("active-line");
    });
}

function highlightCodeLine(step) {
    clearCodeHighlight();

    if (step === 1) {
        line1.classList.add("active-line");
    } else if (step === 2) {
        line2.classList.add("active-line");
    } else if (step === 3) {
        line3.classList.add("active-line");
    }
}

function createNodeElement(value, highlighted = false) {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = value;

    if (highlighted) {
        node.style.backgroundColor = "#ffd966";
        node.style.border = "2px solid #cc9900";
    }

    return node;
}

function createArrow() {
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "→";
    return arrow;
}

function renderMainList() {
    listRow.innerHTML = "";

    let mainList;

    if (currentStep < 3) {
        mainList = [3, 5, 9];
    } else {
        mainList = [8, 3, 5, 9];
    }

    mainList.forEach(function (value, index) {
        const node = createNodeElement(value, value === 8);
        listRow.appendChild(node);

        if (index < mainList.length - 1) {
            listRow.appendChild(createArrow());
        }
    });

    const nullBox = document.createElement("div");
    nullBox.className = "null-box";
    nullBox.textContent = "NULL";
    listRow.appendChild(nullBox);
}

function renderNewNodeArea() {
    newNodeArea.innerHTML = "";

    if (currentStep === 1) {
        const label = document.createElement("div");
        label.className = "floating-node-label";
        label.textContent = "newNode";

        newNodeArea.appendChild(label);
        newNodeArea.appendChild(createNodeElement(8, true));
    }

    if (currentStep === 2) {
        const label = document.createElement("div");
        label.className = "floating-node-label";
        label.textContent = "newNode";

        const floatingArrow = document.createElement("div");
        floatingArrow.className = "floating-link";
        floatingArrow.textContent = "→ head";

        newNodeArea.appendChild(label);
        newNodeArea.appendChild(createNodeElement(8, true));
        newNodeArea.appendChild(floatingArrow);
    }
}

function updateHeadPointer() {
    const firstNode = listRow.querySelector(".node");
    if (!firstNode) return;

    const containerRect = listRow.getBoundingClientRect();
    const nodeRect = firstNode.getBoundingClientRect();

    const nodeCenter = nodeRect.left - containerRect.left + (nodeRect.width / 2);

    headArrow.style.left = `${nodeCenter}px`;
}

function updateUI() {
    stepText.textContent = steps[currentStep];
    highlightCodeLine(currentStep);
    renderNewNodeArea();
    renderMainList();
    updateHeadPointer();
}

nextBtn.addEventListener("click", function () {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
});

prevBtn.addEventListener("click", function () {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
});

updateUI();