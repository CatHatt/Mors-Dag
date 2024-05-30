const CELL_WIDTH = 50
const CELL_HEIGHT = 50
const TIME_STEP_MS = 50

const usedPattern = 1

const PATTERNS: string[][] = [
    [
        '110000000111',
        '100000000011',
        '000110110001',
        '001111111000',
        '001111111000',
        '001111111000',
        '000111110000',
        '000011100000',
        '110001000110',
        '111000001111',
        '111000001111',
        '111000001111',
    ],
    [
        '01010010',
        '11111000',
        '11111000',
        '01110000',
        '00100101',
        '10001111',
        '10001111',
        '00000111',
    ],
]

let width = Math.round(window.innerWidth / CELL_WIDTH)
let height = Math.round(window.innerHeight / CELL_HEIGHT)
const grid = document.getElementsByClassName('grid')[0] as HTMLElement

let infoGrid2D: { number: number; timeout: number | null }[][]

makeGrid()

let heartArray: number[][]

makeHeart()

addNewButtons(grid, width, height)

window.addEventListener('resize', () => {
    width = Math.round(window.innerWidth / CELL_WIDTH)
    height = Math.round(window.innerHeight / CELL_HEIGHT)
    addNewButtons(grid, width, height)
    makeGrid()
})

function addNewButtons(grid: HTMLElement, width: number, height: number) {
    grid.style.gridTemplateColumns = `repeat(${width}, auto)`
    grid.style.gridTemplateRows = `repeat(${height}, auto)`

    removeAllChildren(grid)

    for (let i = 0; i < width * height; i++) {
        const button = createButton(i % width, Math.floor(i / width))

        const pinkOrCream =
            (i + (width % 2 === 0 ? Math.floor(i / width) : 0)) % 2 === 0

        button.classList.add(pinkOrCream ? 'pink' : 'cream')

        // For development
        button.id = i.toString()

        //button.textContent = '0'

        grid.appendChild(button)
    }
}

function removeAllChildren(element: HTMLElement) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
    for (const y of infoGrid2D) {
        for (const x of y) {
            if (x.timeout !== null) clearInterval(x.timeout)
        }
    }
}

function createButton(x?: number, y?: number) {
    const button = document.createElement('button')

    if (x !== undefined && y !== undefined)
        button.addEventListener('click', () => {
            sendWave(x, y)
        })

    //const edge = document.createElement('span')
    //const front = document.createElement('span')

    //edge.classList.add('edge')
    //front.classList.add('front')

    //button.appendChild(edge)
    //button.appendChild(front)

    return button
}

function changeColor(index: number) {
    const gridChildren = grid.childNodes

    const x = index % width
    const y = Math.floor(index / width)

    const pinkOrCream = heartArray[y][x] === 1

    ;(gridChildren[index] as HTMLElement).classList.add(
        pinkOrCream ? 'cream' : 'pink'
    )
    ;(gridChildren[index] as HTMLElement).classList.remove(
        pinkOrCream ? 'pink' : 'cream'
    )

    /*;['pink', 'cream'].forEach((color) => {
        ;(gridChildren[index] as HTMLElement).classList.toggle(color)
    })*/
}

function sendWave(x: number, y: number) {
    infoGrid2D[y][x].number += 1
    changeColor(x + width * y)
    //;(grid.childNodes[x + width * y] as HTMLElement).setAttribute(
    //    'before-data',
    //    infoGrid2D[y][x].number.toString()
    //)

    const indexes = [
        { x: x + 1, y: y },
        { x: x - 1, y: y },
        { x: x, y: y + 1 },
        { x: x, y: y - 1 },
    ]

    for (const index of indexes) {
        if (
            index.x < 0 ||
            index.y < 0 ||
            index.x > width - 1 ||
            index.y > height - 1
        )
            continue

        if (infoGrid2D[y][x].number > infoGrid2D[index.y][index.x].number) {
            if (infoGrid2D[index.y][index.x].timeout !== null)
                clearTimeout(infoGrid2D[index.y][index.x].timeout!)

            infoGrid2D[index.y][index.x].timeout = setTimeout(() => {
                sendWave(index.x, index.y)
                infoGrid2D[index.y][index.x].timeout = null
            }, TIME_STEP_MS)
        }
    }
}

function arrayTo2DGrid(array: any[], width: number, height: number) {
    const result: any[][] = []

    for (let y = 0; y < height; y++) {
        result.push([])
        for (let x = 0; x < width; x++) {
            result[y].push(array[x + width * y])
        }
    }

    return result
}

function Grid2DToArray(grid: any[][]) {
    const result: any[] = []

    grid.forEach((row) => row.forEach((item) => result.push(item)))

    return result
}

function makeGrid() {
    infoGrid2D = new Array(height)

    for (let i = 0; i < infoGrid2D.length; i++) {
        infoGrid2D[i] = new Array(width)
        for (let j = 0; j < infoGrid2D[i].length; j++) {
            infoGrid2D[i][j] = { number: 0, timeout: null }
        }
    }
}

function makeHeart() {
    heartArray = new Array(height)

    for (let i = 0; i < heartArray.length; i++) {
        heartArray[i] = new Array(width)
        for (let j = 0; j < heartArray[i].length; j++) {
            heartArray[i][j] = 0
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            console.log(x, y)
            heartArray[y][x] = Number(
                PATTERNS[usedPattern][y % PATTERNS[usedPattern].length][
                    x %
                        PATTERNS[usedPattern][y % PATTERNS[usedPattern].length]
                            .length
                ]
            )
        }
    }
}
