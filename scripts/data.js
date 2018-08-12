ColorCodes = {
    black: "#00000",
    white: "#FFFFFF",
    red: "#B22222",
    green: "#01662C",
    blue: "#4E7092",
    wood: "#A3610A",
    fish: "#9D0B0E",
    gray: "#5B5B5B",
    tableborder: "#d0c9c9",
    user: "#4E7092",
    friday: "#ED7D31",
    both: "#00B050",
    axe: "#A3610A",
    net: "#9D0B0E",
    transparent: 'transparent',
    sliderPoint: "#00B050",
}

var userPPFTable = [
    [0, 0],
    [8, 250],
    [16, 500],
    [24, 750],
    [32, 1000],
    [40, 1250],
    [48, 1500],
    [56, 1750],
    [64, 2000],
    [72, 2250],
    [80, 2500],
    [88, 2750],
    [96, 3000]
]
var userPPF = [
    [0, 3000],
    [8, 2750],
    [16, 2500],
    [24, 2250],
    [32, 2000],
    [40, 1750],
    [48, 1500],
    [56, 1250],
    [64, 1000],
    [72, 750],
    [80, 500],
    [88, 250],
    [96, 0]
]
var fridayPPFTable = [
    [0, 0],
    [4, 500],
    [8, 1000],
    [12, 1500],
    [16, 2000],
    [20, 2500],
    [24, 3000],
    [28, 3500],
    [32, 4000],
    [36, 4500],
    [40, 5000],
    [44, 5500],
    [48, 6000]
]
var fridayPPF = [
    [0, 6000],
    [4, 5500],
    [8, 5000],
    [12, 4500],
    [16, 4000],
    [20, 3500],
    [24, 3000],
    [28, 2500],
    [32, 2000],
    [36, 1500],
    [40, 1000],
    [44, 500],
    [48, 0]
]

var ValidationProps = {
    wood: 0,
    fish: 0
}
var ToolProps = {
    tool: "notool", //"shelter","feast","book"
    goal: 0, //90,5000,10,
    unit: "", //"logs", "cals","hrs"
}
var AnimConfig = {
    duration: 400,
    totalTime: 24,
    dayTime: 12,    
    nightWoodValueDeduction: 32,
    nightFishValueDeduction: 2000,
    AnimType: "default",
    toolTime: 0,
    woodPerHr: 8,
    fishPerHr: 250,
    isFriday: false,
    fridayWoodPerHr: 4,
    fridayFishPerHr: 500
}
var _Settings = {
    dataRoot: "pagedata/",
    assetsRoot: "assets/",
    enableCache: true,
    topMargin: 144,
    minHeight: 437
}

var _QData = {
    "Q1": {
        Qid: "Q1",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        type: "question",
        options: [{
            type: "input",
            id: "inputCal",
            answer: "3000",
            answerId: ""
        }],
        feedback: ["l1p2/q1c1.htm", "ic1.htm", "l1p2/q1ic2.htm"]
    },
    "Q2": {
        Qid: "Q2",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        options: [{
            type: "input",
            id: "inputLal",
            answer: "96",
            answerId: ""
        }],
        feedback: ["l1p2/q2c1.htm", "ic1.htm", "l1p2/q2ic2.htm"]
    },
    "Q3": {
        Qid: "Q3",
        type: "graph",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        graphData: [
            [0, 3000],
            [96, 0]
        ],
        correctData: userPPF,
        options: [{
            type: "graph"
        }],
        feedback: ["l1p2/q3c1.htm", "l1p2/q3ic1.htm", "l1p2/q3ic2.htm"]
    },
    "Q4": {
        Qid: "Q4",
        type: "activity",
        tryCount: "",
        totalPoints: 1,
        options: [{
            type: "activity"
        }],
        feedback: ["l1p3/q4c1.htm", "l1p3/q4ic1.htm", "l1p3/q4ic2.htm"],        
    },
    "Q5": {
        Qid: "Q5",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        options: [{
            type: "input",
            id: "inputCal",
            answer: "6000",
            answerId: ""
        }],
        feedback: ["l1p4/q5c1.htm", "ic1.htm", "l1p4/q5ic2.htm"]
    },
    "Q6": {
        Qid: "Q6",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "input",
            id: "inputLal",
            answer: "48",
            answerId: ""
        }],
        feedback: ["l1p4/q6c1.htm", "ic1.htm", "l1p4/q6ic2.htm"]
    },
    "Q7": {
        Qid: "Q7",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        type: "graph",
        graphData: [
            [0, 6000],
            [48, 0]
        ],
        correctData: fridayPPF,
        options: [{
            type: "graph"
        }],
        feedback: ["l1p4/q7c1.htm", "l1p4/q7ic1.htm", "l1p4/q7ic2.htm"]
    },
    "Q8": {
        Qid: "Q8",
        type: "activity",
        tryCount: "",
        totalPoints: 1,        
        options: [{
            type: "activity"
        }],
        feedback: ["l1p5/q8c1.htm", "l1p5/q8ic1.htm", "l1p5/q8ic2.htm"]
    },
    "Q9": {
        Qid: "Q9",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
                type: "input",
                id: "inputlog",
                answer: "8",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcal",
                answer: "250",
                answerId: ""
            }
        ],
        feedback: ["l2p2/q9c1.htm", "ic1.htm", "l2p2/q9ic2.htm"]
    },
    "Q10": {
        Qid: "Q10",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
                type: "input",
                id: "inputcalfishlost",
                answer: "250",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogwoodgain",
                answer: "8",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalperlog",
                answer: "31.25",
                answerId: ""
            }
        ],
        feedback: ["l2p2/q10c1.htm", "ic1.htm", "l2p2/q10ic2.htm"]
    },
    "Q11": {
        Qid: "Q11",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
                type: "input",
                id: "inputcalfishlost",
                answer: "500",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogwoodgain",
                answer: "4",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalperlog",
                answer: "125",
                answerId: ""
            }
        ],
        feedback: ["l2p2/q11c1.htm", "ic1.htm", "l2p2/q11ic2.htm"]
    },
    "Q12": {
        Qid: "Q12",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "radio",
            group: "l2_q12",
            answer: "You should specialize in gathering firewood because you give up fewer fish per log",
            answerId: "option1"
        }],
        feedback: ["l2p2/q12c1.htm", "ic1.htm", "l2p2/q12ic2.htm"]
    },
    "Q13": {
        Qid: "Q13",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
                type: "input",
                id: "inputlogwoodlosty",
                answer: "8",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalfishgainy",
                answer: "250",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogpercaly",
                answer: "0.032",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogwoodlostF",
                answer: "4",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalfishgainF",
                answer: "500",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogpercalyF",
                answer: "0.006",
                answerId: ""
            },
        ],
        feedback: ["l2p2/q13c1.htm", "ic1.htm", "l2p2/q13ic2.htm"]
    },
    "Q14": {
        Qid: "Q14",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "radio",
            group: "l2_q14",
            answer: "Friday should specialize in fishing because he has a smaller opportunity cost of fishing",
            answerId: "option2"
        }],
        feedback: ["l2p2/q14c1.htm", "ic1.htm", "l2p2/q14ic2.htm"]
    },
    "Q15": {
        Qid: "Q15",
        type: "activity",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "activity"
        }],
        feedback: ["l2p3/q15c1.htm", "l2p3/q15ic1.htm", "l2p3/q15ic2.htm"]
    },
    "Q16": {
        Qid: "Q16",
        type: "activity",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "activity"
        }],
        feedback: ["l3p2/q16c1.htm", "ic1.htm", "l3p2/q16ic2.htm"]
    }
}