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
//senario
var userPPFTable_ScenarioSeen_1 = [
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
var userPPF_ScenarioSeen_1 = [
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
var userPPFTable_ScenarioSeen_2 = [
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
var userPPF_ScenarioSeen_2 = [
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

var fridayPPFTable_ScenarioSeen_1 = [
    [0, 0],
    [4, 225],
    [8, 450],
    [12, 675],
    [16, 900],
    [20, 1125],
    [24, 1350],
    [28, 1575],
    [32, 1800],
    [36, 2025],
    [40, 2250],
    [44, 2475],
    [48, 2700]
]
var fridayPPF_ScenarioSeen_1 = [
    [0, 2700],
    [4, 2475],
    [8, 2250],
    [12, 2025],
    [16, 1800],
    [20, 1575],
    [24, 1350],
    [28, 1125],
    [32, 900],
    [36, 675],
    [40, 450],
    [44, 225],
    [48, 0]
]
var fridayPPFTable_ScenarioSeen_2 = [
    [0, 0],
    [3.5, 350],
    [7, 700],
    [10.5, 1050],
    [14, 1400],
    [17.5, 1750],
    [21, 2100],
    [24.5, 2450],
    [28, 2800],
    [31.5, 3150],
    [35, 3500],
    [38.5, 3850],
    [42, 4200]
]
var fridayPPF_ScenarioSeen_2 = [
    [0, 4200],
    [3.5, 3850],
    [7, 3500],
    [10.5, 3150],
    [14, 2800],
    [17.5, 2450],
    [21, 2100],
    [24.5, 1750],
    [28, 1400],
    [31.5, 1050],
    [35, 700],
    [38.5, 350],
    [42, 0]
]


var TimePPFTable = [
    [0, 12],
    [1, 11],
    [2, 10],
    [3, 9],
    [4, 8],
    [5, 7],
    [6, 6],
    [7, 5],
    [8, 4],
    [9, 3],
    [10, 2],
    [11, 1],
    [12, 0]
]




var ValidationProps = {
    wood: 0,
    fish: 0
}
var AnimConfig = {
    duration: 400,
    totalTime: 24,
    dayTime: 12,
    nightWoodValueDeduction: 32,
    nightFishValueDeduction: 2000,
    nightWoodValueDeductionfriday: 32,
    nightFishValueDeductionfriday: 2000,
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
    hiddenAnchor: "#hiddenAnchor",
    enableCache: true,
    topMargin: 144,
    minHeight: 437
}

var _QData = {
    "Q1": {
        Qid: "Q1",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,        
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
        type: "graph",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
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
                answer: "0.008",
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
        totalTry: 0,
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
        totalTry: 0,
        totalPoints: 1,
        level: 2,
        options: [{
            type: "activity"
        }],
        feedback: ["l3p2/q16c1.htm", "l3p2/q16ic1.htm", "l3p2/q16ic2.htm", "l3p2/q16c2.htm", "l3p2/q16c3.htm", "l3p2/q16c4.htm"]
    },
    "Q17": {
        Qid: "Q17",
        type: "activity",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "activity"
        }],
        feedback: ["l3p3/q17c1.htm", "l3p3/q17ic1.htm", "l3p3/q17ic2.htm", "l3p3/q17c2.htm"]
    },
    "Q18": {
        Qid: "Q18",
        type: "graph",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 2,
        graphData: [],
        correctData: undefined,
        options: [{
            type: "graph"
        }],
        feedback: ["l4p2/q18c1.htm", "l4p2/q18ic1.htm", "l4p2/q18ic2.htm"]
    },

    "Q19": {
        Qid: "Q19",
        type: "graph",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 2,        
        graphData: [
        ],
        correctData: undefined,
        options: [{
            type: "graph"
        }],
        feedback: ["l4p3/q19c1.htm", "l4p3/q19ic1.htm", "l4p3/q19ic2.htm"]
    },
    "Q20": {
        Qid: "Q20",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
                type: "input",
                id: "inputcalfishlosty",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogfirewoodgainy",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalperlogy",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalfishlostF",
                answerId: ""
            },
            {
                type: "input",
                id: "inputlogfirewoodgainF",
                answerId: ""
            },
            {
                type: "input",
                id: "inputcalperlogF",
                answerId: ""
            },
        ],
        feedback: ["l4p4/q20c1.htm", "ic1.htm", "l4p4/q20ic2.htm"]
    },
    "Q21": {
        Qid: "Q21",
        type: "question",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "radio",
            id: "optionsL4",
            group: "l4-q21"
        }],
        feedback: ["l4p4/q21c1.htm", "ic1.htm", "l4p4/q21ic2.htm"]
    },
    "Q22": {
        Qid: "Q22",
        type: "activity",
        tryCount: 0,
        totalTry: 2,
        totalPoints: 1,
        level: 1,
        options: [{
            type: "activity"
        }],
        feedback: ["l4p5/q22c1.htm", "l4p5/q22c2.htm",
            "l4p5/q22yic1.htm", "l4p5/q22yic2.htm", "l4p5/q22yic3.htm",
            "l4p5/q22fic1.htm", "l4p5/q22fic2.htm", "l4p5/q22fic3.htm"
        ]
    }
}