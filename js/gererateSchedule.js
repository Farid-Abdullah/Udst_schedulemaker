
function load_test_data(numCourses) {
    let c1_data = document.getElementById("hidden1").innerText
    let c2_data = document.getElementById("hidden2").innerText
    let c1 = document.getElementById("course-data")
    let c2 = document.getElementById("course-data2")

    c1.innerHTML = c1_data
    c2.innerHTML = c2_data

    if (numCourses > 2) {
        const c3_data = document.getElementById("hidden3").innerText
        let c3 = document.getElementById("course-data3")
        c3.innerHTML = c3_data
    }
    if (numCourses > 3) {
        const c4_data = document.getElementById("hidden4").innerText
        let c4 = document.getElementById("course-data4")
        c4.innerHTML = c4_data

    }
    if (numCourses == 5) {
        const c5_data = document.getElementById("hidden2").innerText // reusing
        let c5 = document.getElementById("course-data5")
        c5.innerHTML = c5_data
    }
}


function combination(...arrays) {

    return arrays.reduce((acc, array) =>
        acc.flatMap(d =>
            array.map(e => [...d, e])
        ), [[]]);
}

function countSpaces(str) { // testing
    const matches = str.match(/ /g);  // Match all spaces in the string
    return matches ? matches.length : 0;  // Return the count of spaces (0 if no spaces)
}
function outputIs4() {
    const course1 = document.getElementById("course-1").value
    const course2 = document.getElementById("course-2").value
    const course3 = document.getElementById("course-3").value
    const course4 = document.getElementById("course-4").value


    Course_names = [course1, course2, course3, course4]
    let all_sections = [processArray('course-data'), processArray('course-data2'), processArray('course-data3'), processArray('course-data4')]

    let all_combination = combination(processArray('course-data'), processArray('course-data2'), processArray('course-data3'), processArray('course-data4'))
    let i = 0

    let min = 999


    let noConflicts = 0
    let randomCounter = 0
    let best = []
    while (i < all_combination.length) {
        for (let j = 0; j < all_combination[i].length; j++) {
            all_combination[i][j] = all_combination[i][j].replace(/\s+/g, ' ').trim()
        }

        [conflictBoolean, noConflictHours] = conflictFinder(all_combination[i])

        if (conflictBoolean) {  // if there's no conflict of timings
            if (noConflictHours < min) {
                min = noConflictHours
                best.push([all_combination[i], noConflictHours])
            }
            else if (noConflictHours === min) {
                best.push([all_combination[i], noConflictHours])
            }
        }
        i++
    }

    // document.write(`<br> Here are some schedule (The minimum one is ${min} hours) <br>`)
    // for (let h = best.length - 1; h >= 0; h--) {
    //     document.write(`<br><br>Schedule no ${best.length - h}, total hours: ${best[h][1]}<br>`)
    //     for (let g = 0; g < best[h][0].length; g++) {
    //         document.write(` <br> ${Course_names[g]} : ${best[h][0][g]} <br>`)
    //     }
    // }
    schedule_show(best, min, Course_names)



}
function outputIs3() {
    const course1 = document.getElementById("course-1").value
    const course2 = document.getElementById("course-2").value
    const course3 = document.getElementById("course-3").value


    Course_names = [course1, course2, course3]


    let all_sections = [processArray('course-data'), processArray('course-data2'), processArray('course-data3')]

    let all_combination = combination(processArray('course-data'), processArray('course-data2'), processArray('course-data3'))
    let i = 0

    let min = 999


    let noConflicts = 0
    let randomCounter = 0
    let best = []
    while (i < all_combination.length) {
        for (let j = 0; j < all_combination[i].length; j++) {
            all_combination[i][j] = all_combination[i][j].replace(/\s+/g, ' ').trim()
        }

        [conflictBoolean, noConflictHours] = conflictFinder(all_combination[i])

        if (conflictBoolean) {  // if there's no conflict of timings
            if (noConflictHours < min) {
                min = noConflictHours
                best.push([all_combination[i], noConflictHours])
            }
            else if (noConflictHours === min) {
                best.push([all_combination[i], noConflictHours])
            }
        }
        i++
    }
    schedule_show(best, min, Course_names)
}
function outputIs2() {
    const course1 = document.getElementById("course-1").value
    const course2 = document.getElementById("course-2").value



    Course_names = [course1, course2]


    let all_sections = [processArray('course-data'), processArray('course-data2')]

    let all_combination = combination(processArray('course-data'), processArray('course-data2'))

    let i = 0

    let min = 999


    let noConflicts = 0
    let randomCounter = 0
    let best = []
    while (i < all_combination.length) {
        for (let j = 0; j < all_combination[i].length; j++) {
            all_combination[i][j] = all_combination[i][j].replace(/\s+/g, ' ').trim()
        }

        [conflictBoolean, noConflictHours] = conflictFinder(all_combination[i])

        if (conflictBoolean) {  // if there's no conflict of timings
            if (noConflictHours < min) {
                min = noConflictHours
                best.push([all_combination[i], noConflictHours])
            }
            else if (noConflictHours === min) {
                best.push([all_combination[i], noConflictHours])
            }
        }
        i++
    }


    schedule_show(best, min, Course_names)

}

function timeToMinutes(t) {
    let [h, m] = t.split(":");

    h = Number(h);

    if (m.includes("PM")) {
        m = Number(m.replace("PM", ""));

        if (h !== 12) {
            h += 12;
        }

    } else if (m.includes("AM")) {
        m = Number(m.replace("AM", ""));

        if (h === 12) {
            h = 0;
        }

    } else {
        m = Number(m);
    }

    return h * 60 + m;
}

function visualize(text) {

    const COLORS = [
        "#e74c3c",
        "#3498db",
        "#2ecc71",
        "#9b59b6",
        "#f39c12",
        "#1abc9c"
    ];
    
    const events = [];
    let colorIndex = 0;

    text.split("<p>").forEach(line => {
        line = line.trim();
        if (!line) return;

        const course = line.split(":")[0].trim();

 





        const matches = [...line.matchAll(
            /(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s+to\s+(\d{1,2}:\d{2}\s*(?:AM|PM)?)/gi
        )];


        matches.forEach(match => {
        
            events.push({
                course,
                timing: [match[2],match[3]],
                day: match[1],
                start: timeToMinutes(match[2]),
                end: timeToMinutes(match[3]),
                color: COLORS[colorIndex % COLORS.length],
                processed: false,
                slotSpan: (timeToMinutes(match[3]) - timeToMinutes(match[2])) / 30
            });
        });

        colorIndex++;
    });

    const startDay = 8 * 60;
    const endDay = 22 * 60;
    const slotSize = 30;

    // for filling out table's first row
    const DAYS = [ 
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",

    ];
    let html = "<table>";
    // first row, table header:
    html += "<tr><th>Time</th>";

    DAYS.forEach(day => html += `<th>${day}</th>`);
    html += "</tr>";

    // remaining rows: 
    let time = startDay;

    while (time < endDay) {

        // time column:
        const hour = String(Math.floor(time / 60)).padStart(2, "0");
        const min = String(time % 60).padStart(2, "0");
        html += `<tr><td class="time">${hour}:${min}</td>`;

        // day columns
        DAYS.forEach(day => {
            const event = events.find(e =>
                e.day === day &&
                time >= e.start && time < e.end
            );

            if (event) {
                if (!event.processed) {
                    html += `
                <td rowspan=${event.slotSpan} class="course"
                    style="background:${event.color}">
                    ${event.course}<br><span>${event.timing[0]} to ${event.timing[1]}</span> <br>
                </td>`;
                    event.processed = true;
                }
            } else {
                html += "<td></td>";

            }
        });

        html += "</tr>";
        time += slotSize;
    }

    html += "</table>";
    return html

}
function schedule_show(all, min, Course_names) {
    let result = document.getElementById('best-schedules')
    result.innerHTML = `` 
    const h1 = document.createElement("h1") // main heading
    h1.innerHTML = `Here are some schedule (The minimum one is ${min} hours)`
    result.appendChild(h1)

        // reversing  'all' because for some reason i am passing it to this function in reverse, so i am reversing the reversed array so it can go back to not being reversed, 
    all.reverse()
    // mapping course names with each and every timing, as well as creating, this is hell
    all.forEach(
        (schedule,index) =>{
            const content = document.createElement("div") // main container for each schedule text and visualization
            const aside = document.createElement("aside") // just text
            const h3 = document.createElement("h3")
            h3.innerHTML = `#${index+1} schedule __ Total h/week= ${schedule[1]}`
            aside.appendChild(h3)
            
            schedule[0].forEach((text, index)=>{ 
                const p2 = document.createElement("p")
                p2.innerHTML+= `${Course_names[index]} : ${text}`  // 
                aside.appendChild(p2)
            })
        
            
           
            
            content.innerHTML+= visualize(aside.innerHTML)
            content.appendChild(aside)
            result.appendChild(content)
        }
    )

}
function outputIs5() {
    const course1 = document.getElementById("course-1").value
    const course2 = document.getElementById("course-2").value
    const course3 = document.getElementById("course-3").value
    const course4 = document.getElementById("course-4").value
    const course5 = document.getElementById('course-5').value


    Course_names = [course1, course2, course3, course4, course5]
    let all_sections = [processArray('course-data'), processArray('course-data2'), processArray('course-data3'), processArray('course-data4'), processArray('course-data5')]

    let all_combination = combination(processArray('course-data'), processArray('course-data2'), processArray('course-data3'), processArray('course-data4'), processArray('course-data5'))
    let i = 0

    let min = 999


    let noConflicts = 0
    let randomCounter = 0
    let best = []
    while (i < all_combination.length) {
        for (let j = 0; j < all_combination[i].length; j++) {
            all_combination[i][j] = all_combination[i][j].replace(/\s+/g, ' ').trim()
        }

        [conflictBoolean, noConflictHours] = conflictFinder(all_combination[i])

        if (conflictBoolean) {  // if there's no conflict of timings
            if (noConflictHours < min) {
                min = noConflictHours
                best.push([all_combination[i], noConflictHours])
            }
            else if (noConflictHours === min) {
                best.push([all_combination[i], noConflictHours])
            }
        }
        i++
    }

    document.write(`<br> Here are some schedule (The minimum one is ${min} hours) <br>`)
    for (let h = best.length - 1; h >= 0; h--) {
        document.write(`<br><br>Schedule no ${best.length - h}, total hours: ${best[h][1]}<br>`)
        for (let g = 0; g < best[h][0].length; g++) {
            document.write(` <br> ${Course_names[g]} : ${best[h][0][g]} <br>`)
        }
    }



}

function processArray(d_id) {

    let c_data = document.getElementById(d_id).value;

    let courses = [];
    let sections = [];
    let timings = [];
    let hours = [];

    let i = 0;

    if (c_data.includes('Closed')) {
        c_data = c_data.slice(c_data.indexOf('Regular Academic'), c_data.indexOf('Closed'))

    }
    while (c_data.includes('Regular Academic')) {


        c_data = c_data.slice(c_data.indexOf('Regular Academic') + 1, c_data.length)
        courses[i] = c_data.slice(c_data.indexOf('Class'), c_data.indexOf("Seats"))


        let slice1 = courses[i].slice(courses[i].indexOf('Section') + 1, courses[i].length)
        sections[i] = 'S' + slice1.slice(0, 9) + ' ' + slice1.slice(slice1.indexOf('Section'), slice1.indexOf('Section') + 10)
        timings[i] = courses[i].slice(courses[i].indexOf('day') - 6, courses[i].indexOf('.') - 3) + " => " + sections[i]
        courses[i] += '//////////////' + sections[i] + '////////elo haha/////' + timings[i]

        i++

    }




    return timings

}
function dayFinder(day, schedule) {
    let i = 0;
    let TheString = ''
    let TheArray = [[]]
    let indexOfDay
    let j = 0
    let len
    let temp
    let temp2
    let strt
    let stp


    while (i < schedule.length) {

        temp2 = schedule[i]

        while (temp2.includes(day)) {

            indexOfDay = temp2.indexOf(day)

            len = day.length


            temp = temp2.slice(indexOfDay + len + 8, temp2.length)

            strt = temp2.slice(indexOfDay + len + 1, indexOfDay + len + 8)



            stp = temp.slice(temp.indexOf('o') + 2, temp.indexOf(':') + 5)

            TheArray[j] = [twelveTo(strt), twelveTo(stp)]

            temp2 = temp
            //TheArray[j] = [schedule[i].slice(indexOfDay+len+1,indexOfDay+len+8),temp.slice(temp.indexOf('to')+3,temp.indexOf('M')+1)]

            j++
        }
        i++
    }

    TheArray.sort((a, b) => a[0] - b[0]);

    return TheArray
}

function twelveTo(T) {
    // In case there is no AM and PM in the timings, means it is already in military format
    // so :

    let times = T
    let minutes
    let hour
    if (times.includes("M")) {
        let period = times.slice(times.indexOf(":") + 3, times.indexOf("M") + 1)

        minutes = times.slice(times.indexOf(":") + 1, times.indexOf(period))

        hour = parseFloat(times.slice(0, times.indexOf(":")))


        if (period === "PM" && hour !== 12) {
            hour += 12
        }



    }
    else {
        hour = parseFloat(times.slice(0, times.indexOf(":")))
        minutes = times.slice(times.indexOf(":") + 1, times.indexOf(":") + 3)

    }
    if (minutes == '00') {
        return hour
    }
    if (minutes == "30") {
        return hour + 0.5
    }
}
function conflictFinder(schedule) {

    let sun = dayFinder('Sunday', schedule)
    let mon = dayFinder("Monday", schedule)
    let tue = dayFinder("Tuesday", schedule)
    let thu = dayFinder("Thursday", schedule)
    let wed = dayFinder("Wednesday", schedule)
    let totalHours


    let [sunBool, sunHour] = hasConflict(sun)
    let [monBool, monHour] = hasConflict(mon)
    let [tueBool, tueHour] = hasConflict(tue)
    let [wedBool, wedHour] = hasConflict(wed)
    let [thuBool, thuHour] = hasConflict(thu)

    if (!sunBool && !monBool && !tueBool && !wedBool && !thuBool) {
        totalHours = sunHour + monHour + tueHour + wedHour + thuHour

        return [true, totalHours]
    }
    else {
        return [false, NaN]
    }
}
function hasConflict(day) {

    let total = 0
    let strt2
    let stp1
    if (day.length > 1) {
        for (let b = 0; b < day.length - 1; b++) {
            // Checking conflict between consecutive terms

            stp1 = day[b][1]
            strt2 = day[b + 1][0]

            if (stp1 > strt2) {
                return [true, NaN]
            }



        }
        total = day[day.length - 1][1] - day[0][0]
    }

    else if (day.length == 1 && day[0].length == 2) {

        total = day[0][1] - day[0][0]

    }




    return [false, total]
}