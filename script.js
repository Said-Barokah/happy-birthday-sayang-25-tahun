const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
    "Gakkkkk... 😢",
    "Sayang kamu yakin? 🤔",
    "Ayolah, sayang... 🥺",
    "Kalau kamu bilang gak, aku benar-benar sedih... 😭",
    "Aku akan sangat sedih... 😢",
    "Tolong dong cintaku sayangnya aku??? 💔",
    "Jangan lakukan ini padaku sayangnya aku...",
    "Ini kesempatan terakhir adek! 😭",
    "ayo coba klik aku disini 😜"
]

const yesTeasePokes = [
    "Tekan merah dulu dong... 😏",
    "Ayo coba sekali klik merah 👀, Adek pasti penasaran 😈",
    "Klik merah dulu sayang, sampe hilang tombolnya😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')

/* ============================= */
/*           YES CLICK           */
/* ============================= */

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }

    // Redirect setelah tahap terakhir
    window.location.href = "yes.html"
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')

    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => {
        toast.classList.remove('show')
    }, 2500)
}

/* ============================= */
/*            NO CLICK           */
/* ============================= */

function handleNoClick() {

    // Jika sudah tahap terakhir → kabur terus
    if (noClickCount >= noMessages.length - 1) {
        runAway()
        return
    }

    noClickCount++

    // Ganti pesan
    noBtn.textContent = noMessages[noClickCount]

    // Besarkan YES
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.01}px`

    const padY = Math.min(18 + noClickCount * 2, 70)
    const padX = Math.min(45 + noClickCount * 4, 140)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Kecilkan NO
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.9, 10)}px`
    }

    // Ganti GIF
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // 🔥 Aktifkan runaway HANYA di pesan terakhir
    if (noClickCount === noMessages.length - 1) {
        enableRunaway()
        runawayEnabled = true
        yesBtn.textContent = "Iya, aku mauu 💍💚"
        const finalText = document.getElementById("final-text")
        finalText.classList.add("show")
    }
}

/* ============================= */
/*          GIF SWAP             */
/* ============================= */

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

/* ============================= */
/*          RUNAWAY MODE         */
/* ============================= */

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight

    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}

/* ============================= */
/*      EVENT LISTENERS          */
/* ============================= */

yesBtn.addEventListener('click', handleYesClick)
noBtn.addEventListener('click', handleNoClick)
