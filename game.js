let selectedCell = null; // 当前选中的方块
let score = 0; // 得分

// 初始化游戏网格（3x3）
const gameGrid = document.getElementById('gameGrid');
const colors = ['color1', 'color2', 'color3']; // 3种颜色类型

// 生成随机颜色
function createRandomCell() {
    const cell = document.createElement('div');
    cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
    return cell;
}

// 初始化网格
function initGrid() {
    for (let i = 0; i < 9; i++) {
        const cell = createRandomCell();
        cell.dataset.index = i; // 记录位置索引
        cell.addEventListener('click', handleCellClick);
        gameGrid.appendChild(cell);
    }
}

// 处理方块点击事件
function handleCellClick(event) {
    const cell = event.target;

    if (!selectedCell) {
        // 第一次点击：选中方块
        selectedCell = cell;
        cell.style.border = '2px solid gold';
    } else {
        // 第二次点击：交换两个方块
        const index1 = parseInt(selectedCell.dataset.index);
        const index2 = parseInt(cell.dataset.index);
        
        // 检查是否相邻（仅限上下左右）
        if (Math.abs(index1 - index2) === 3 || (Math.abs(index1 - index2) === 1 && Math.floor(index1 / 3) === Math.floor(index2 / 3))) {
            swapCells(selectedCell, cell);
            checkMatches(); // 检查是否有匹配
        }

        // 重置选中状态
        selectedCell.style.border = '2px solid #333';
        selectedCell = null;
    }
}

// 交换两个方块的位置
function swapCells(cell1, cell2) {
    const tempClass = cell1.className;
    cell1.className = cell2.className;
    cell2.className = tempClass;
}

// 检查是否有3个连续相同颜色的方块
function checkMatches() {
    const cells = document.getElementsByClassName('cell');
    let matched = false;

    // 检查行
    for (let i = 0; i < 9; i += 3) {
        if (cells[i].className === cells[i+1].className && cells[i].className === cells[i+2].className) {
            removeMatchedCells([i, i+1, i+2]);
            matched = true;
        }
    }

    // 检查列
    for (let i = 0; i < 3; i++) {
        if (cells[i].className === cells[i+3].className && cells[i].className === cells[i+6].className) {
            removeMatchedCells([i, i+3, i+6]);
            matched = true;
        }
    }

    if (matched) {
        score += 100;
        document.getElementById('score').textContent = `得分：${score}`;
        setTimeout(refillGrid, 500); // 延迟填充新方块
    }
}

// 移除匹配的方块并填充新方块
function removeMatchedCells(indices) {
    indices.forEach(index => {
        const cell = document.getElementsByClassName('cell')[index];
        cell.style.animation = 'explode 0.5s ease-out'; // 添加爆炸动画（需在CSS中定义）
        setTimeout(() => {
            cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
            cell.style.animation = '';
        }, 500);
    });
}

// 填充新方块
function refillGrid() {
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        if (cell.className.includes('color')) return;
        cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
    }
}

// 启动游戏
initGrid();
