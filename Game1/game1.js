let amount = 15,
    instructions = [
        "Hello.",
        "The goal of the game is to get all the swimmers in the pool to reach the end within a certain length of time.",
        `You have ${amount} amount of food you can feed to your team.`,
        "Click a swimmer's lane to make them go faster.",
        "Remember to save your tokens!",
        "Your ability to distribute that influences how many of your swimmers make it to the end."]
let count = 0,
    countI = 0,
    myReq
const animate_instructions = () => {
    // myReq = requestAnimationFrame(animate_instructions)
    document.getElementById("intro").innerHTML += instructions[count][countI]
    if (instructions[count][countI + 1]) {
        countI++
    } else if (instructions[count + 1]) {
        count++
        document.getElementById("intro").innerHTML += "<br><br>"
        countI = 0
    } else {
        // Finished
        document.getElementById("clickI").style.opacity = 1
        clearInterval(myReq)
    }
}
myReq = setInterval(animate_instructions, 50)
let b = document.getElementById("a"),
    c = b.getContext("2d")
b.width = window.innerWidth
b.height = window.innerHeight
var elemLeft = b.offsetLeft + b.clientLeft,
    elemTop = b.offsetTop + b.clientTop,
    elements = [];

// How speed should be distributed:
// Amongst everyone.
/*
According to research, having a tendancy towards just
getting one or two to the other side may show that the 
user is exhibiting symptoms of ADHD.
*/
// So draw 6 lanes.
// In each lane we have n people.
class Person {
    constructor(pos) {
        // Pos - Their beginning position
        this.pos = pos
        this.speed = 0.5
        this.clickUpSpeed = 0
        this.madeToOtherSide = false
    }
    draw() {
        c.beginPath()
        c.fillStyle = ""
        c.lineWidth = 2;
        c.font = "30px sans-serif"
        c.textAlign = "center"
        c.fillText("\u{1F3CA}", ...this.pos)
    }
    move() {
        c.fillStyle = "#00bbff"
        c.fillRect(this.pos[0] - 25, this.pos[1] - 30, 50, 50)
        this.pos[1] += this.speed
    }
}
let swimmers = [],
    timeCount = 10,
    start = Date.now()
const interv = () => {
    var delta = Date.now() - start // milliseconds elapsed since start
    start = Date.now()
    timeCount -= delta / 1000 // in seconds
    // alternatively just show wall clock time:
    // output(new Date().toUTCString());
    // Timer at the top as well
    document.getElementById("remainingFood").innerHTML = `${amount} TOKENS`
    if (Math.round(timeCount * 100) / 100 >= 0) {
        document.getElementById("remainingTime").innerHTML = `${Math.round(timeCount)} TIME`
    } else {
        document.getElementById("remainingTime").innerHTML = `0 TIME`
        /* STOP; time is up. */
    }
}
const drawLanes = () => {
    for (let i = 0; i < b.width; i += b.width / 6) {
        // These are the lanes.
        c.beginPath()
        c.fillStyle = "#00bbff"
        c.fillRect(i + 5, 0, b.width / 6 - 10, b.height)
        elements.push({
            width: b.width / 6 - 10,
            height: b.height,
            top: 0,
            left: i + 5
        })
        // These are the lane lines:
        for (let ii = 0; ii < b.height; ii += (b.height) / 100) {
            c.beginPath()
            c.fillStyle = `hsl(${Math.cos(ii / 10) * 65}, 100%, 50%)`
            c.arc(i + b.width / 6 - 5, 5 + ii, 10, 0, 2 * Math.PI)
            c.fill()
        }
        swimmers.push(new Person([i - 5 + b.width / 12, 30]))
        swimmers[swimmers.length - 1].draw()
    }
    for (let ii = 0; ii < b.height; ii += (b.height) / 100) {
        c.beginPath()
        c.fillStyle = `hsl(${Math.cos(ii / 10) * 65}, 100%, 50%)`
        c.arc(5, 5 + ii, 10, 0, 2 * Math.PI)
        c.fill()
    }
}
let rStart
const startSwimming = () => {
    rStart = requestAnimationFrame(startSwimming)
    for (let i = 0; i < swimmers.length; i++) {
        swimmers[i].move()
        swimmers[i].draw()
        if (swimmers[i].pos[1] >= b.height) {
            /* The swimmer got to the other side, yay!
            Add on to the tokens */
            if (!swimmers[i].madeToOtherSide) {
                // amount++
                swimmers[i].madeToOtherSide = true
            }
        }
    }
    if (timeCount <= 0) {
        // Stop
        // Put the time out in.
        c.beginPath()
        c.fillStyle = "black"
        c.textAlign = "center"
        c.font = "30px Roboto"
        c.fillText("Time's Up!", b.width/2, b.height/2)
        document.getElementById("clickN").style.opacity = 1
        document.getElementById("clickN").style.pointerEvents = "auto"
        cancelAnimationFrame(rStart)
    }
}
document.getElementById("clickN").addEventListener("click", () => {
    // Next round
    // Save the ones that made it, reset their speeds, and save the amount of tokens.
    document.getElementById("clickN").style.opacity = 0
    let avgY = 0,
    swimmersAcross = 0
    for(let i = 0; i < swimmers.length; i++) {
        // Reset. Save the swimmer's y position and look at the average distribution.
        avgY += swimmers[i].clickUpSpeed
        if(swimmers[i].madeToOtherSide) {
            swimmersAcross++
        }
    }
    avgY /= swimmers.length
    // avgY is the slope, and our 
    // distribution is 1/avyY.
    // Also, not doing anything would make us do well.
    // So we need to weight how many we get across.
    c.beginPath()
    c.fillStyle = "black"
    c.textAlign = "center"
    c.font = "15px Roboto"
    c.fillText(`You rate ${Math.round(1/(avgY)*100)}% on self-focus.`, b.width / 2, b.height / 2 + 60)
    // The big number is the distribution.
    let xhttp = new XMLHttpRequest()
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            // Yay! The database has synced with us!
            document.getElementById("sync").style.opacity = 0
            document.getElementById("quickT").style.opacity = 0
        } else if(xhttp.readyState == 4) {
            document.getElementById("sync").style.opacity = 0
            document.getElementById("quickT").style.background = "red"    
        }
    }
    // xhttp.open("PUT", "/game1/:username")
    xhttp.open("PUT", "/game1/un4")
    document.getElementById("sync").style.opacity = 1
    document.getElementById("quickT").style.opacity = 1
    console.log(Math.round(1/(avgY)*100)*0.75 + Math.round((swimmersAcross / 6)*100)*0.25)
    var data = JSON.stringify({"score": Math.round(1/(avgY)*100)*0.75 + Math.round((swimmersAcross / 6)*100)*0.25});
    xhr.send(data);

    c.fillText(`You rate ${Math.round((swimmersAcross / 6)*100)}% on using your tokens efficiently.`, b.width / 2, b.height / 2 + 100)
})
// Add event listener for `click` events.
function clickEv(event) {
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        // Collision detection between clicked offset and element.
        elements.forEach(function (element, pos) {
            if (y > element.top && y < element.top + element.height
                && x > element.left && x < element.left + element.width) {
                if(amount - 1 < 0) {
                    // We've run out of tokens.
                } else if(Math.round(timeCount * 100) / 100 >= 0) {
                    swimmers[pos].speed += 1
                    swimmers[pos].clickUpSpeed += 1
                    amount--
                }
            }
        });
}


drawLanes()
document.getElementById("clickI").addEventListener("click", () => {
    // Start actual game!
    // Let everything fade away.
    document.getElementById("clickI").style.opacity = 0;
    document.getElementById("intro").style.opacity = 0;
    document.getElementById("clickI").style.display = "none";
    document.getElementById("intro").style.display = "none";
    b.style.filter = "brightness(100%)";
    rStart = requestAnimationFrame(startSwimming)
    // startSwimming()
    start = Date.now()
    setInterval(interv, 10);
    b.addEventListener('click', clickEv, false);
})