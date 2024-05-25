let width = Math.round(window.innerWidth / 100)
let height = Math.round(window.innerHeight / 100)
const grid = document.getElementsByClassName('grid')[0] as HTMLElement
const grid2D = arrayTo2D(new Array(width * height).fill(null), width, height)

addNewButtons(grid, width, height)

let wave = setInterval(() => {}, 1000)

window.addEventListener('resize', () => {
    width = Math.round(window.innerWidth / 100)
    height = Math.round(window.innerHeight / 100)
    addNewButtons(grid, width, height)
})

function addNewButtons(grid: HTMLElement, width: number, height: number) {
    grid.style.gridTemplateColumns = `repeat(${width}, auto)`
    grid.style.gridTemplateRows = `repeat(${height}, auto)`

    removeAllChildren(grid)

    for (let i = 0; i < width * height; i++) {
        const button = createButton()

        const pinkOrCream =
            (i + (width % 2 === 0 ? Math.floor(i / width) : 0)) % 2 === 0

        button.childNodes.forEach((element) => {
            const htmlelement = element as HTMLElement
            htmlelement.classList.add(pinkOrCream ? 'pink' : 'cream')
        })

        button.classList.add(pinkOrCream ? 'pink' : 'cream')

        // For development
        button.id = i.toString()

        //button.textContent = '0'

        grid.appendChild(button)
    }
}

function removeAllChildren(element: HTMLElement) {
    while (element.firstChild) {
        if (element.lastChild) {
            element.removeChild(element.lastChild)
        }
    }
}

function createButton(/*extraElements?: HTMLElement[]*/) {
    const button = document.createElement('button')

    button.addEventListener('click', changeColor)

    //const edge = document.createElement('span')
    //const front = document.createElement('span')

    //edge.classList.add('edge')
    //front.classList.add('front')

    //button.appendChild(edge)
    //button.appendChild(front)
    //if (extraElements)
    //    extraElements.forEach((element) => button.append(element))

    return button
}

function changeColor() {
    //const gridChildren = grid.childNodes
    //
    //for (let gridChild of gridChildren) {
    //    ;(gridChild as HTMLElement).childNodes.forEach((element) => {
    //        const htmlelement = element as HTMLElement
    //        ;['pink', 'cream'].forEach((color) => {
    //            htmlelement.classList.toggle(color)
    //        })
    //    })
    //}
}

function sendWave(x: number, y: number, direction?: number) {
    const elementGrid2D: any[][] = arrayTo2D(
        Array.from(grid.childNodes),
        width,
        height
    )

    switch (direction) {
        case 0:
            break
        case 1:
            break
        case 2:
            break
        case 3:
            break
        case 4:
            break
        case 5:
            break
        case 6:
            break
        case 7:
            break
    }
}

function arrayTo2D(gridArray: any[], width: number, height: number) {
    const result: any[][] = []

    for (let y = 0; y < height; y++) {
        result.push([])
        for (let x = 0; x < width; x++) {
            result[y].push(gridArray[x + width * y])
        }
    }

    return result
}
