import FundleUser from "../model/usersModel"
import jwt from "jwt-simple";

const secret: any = process.env.JWT_SECRET;

export async function loadUser(req: any, res: any) {
    try {
        const { userInfo } = req.cookies;
        console.log('username:' +userInfo)// shows encoded userInfo when hide
        console.log('server data (showen when not encoded): ' + userInfo.username)//undefined .username when encoded (hide)

        const decoded: any = jwt.decode(userInfo, secret);

        if (decoded) {
            res.send(decoded)
        } else {
            res.send('noLog')
        }
        //to find and show all users:
        // const allUsers = await FundleUser.find({});
        // console.log('allUsers: ' + allUsers)
        // res.send({allUsers})
    } catch (error) {

        if (error instanceof Error) {  //<===in brackets to let TS know type is error
            console.log("Error on loadUser", error.message);
            res.send({ error: error.message })
        }
    }
}

export async function getUser(req: any, res: any) {

    let { username, password } = req.query
    const userMatch = await FundleUser.find({ username: username, password: password })
    
    if (userMatch.length >= 1) {
        const payload = { username };
        const token = jwt.encode(payload, secret);
        res.cookie(
            "userInfo",
            token,// jwt- adding 'token' to req.cookie
            { username, httpOnly: true }///httponly- so client cant touch cookies//can also set {maxage} (time to erase) 
        );
        res.send({ user: userMatch })
    }
    else {
        const noPass = await FundleUser.find({ username: username })
        if (noPass.length >= 1) {
            res.send({ msg: "nopass", user: noPass })
        }
        else {
            res.send("nouser")
        }
    }
}

export async function addUser(req: any, res: any) {

    let { username, password, email } = req.body;

    const noPass = await FundleUser.find({ username: username })

    if (noPass.length === 0) {
        let played = 0;
        let wins = 0;
        let current_streak = 0;
        let max_streak = 0;
        let oneattempt = 0;
        let twoattempts = 0;
        let threeattempts = 0;
        let fourattempts = 0;
        let fiveattempts = 0;
        let sixattempts = 0;
        const newFundleUser = new FundleUser({ username, password, email, played, wins, current_streak, max_streak, oneattempt, twoattempts, threeattempts, fourattempts, fiveattempts, sixattempts })
        const result = await newFundleUser.save()
        res.send({ result });
    }

    else {
        res.send('AlreadyUser')
    }
}


export async function updateUser(req: any, res: any) {

    let { win, attempts, username } = req.body

    const user = await FundleUser.find({ username: username })

    if (user[0]) {

        if (attempts === 1) {
            user[0].oneattempt++;
        }
        if (attempts === 2) {
            user[0].twoattempts++;
        }
        if (attempts === 3) {
            user[0].threeattempts++;
        }
        if (attempts === 4) {
            user[0].fourattempts++;
        }
        if (attempts === 5) {
            user[0].fiveattempts++;
        }
        if (attempts === 6) {
            user[0].sixattempts++;
        }

        user[0].played++;

        console.log('played: ' + user[0].played)
        console.log(win)

        if (win) {
            user[0].wins++;
            user[0].current_streak++;
            console.log(user[0].current_streak)
            if (user[0].current_streak > user[0].max_streak) {
                user[0].max_streak = user[0].current_streak;
            }
        }

        else if (win === false) {
            user[0].current_streak = 0;
            user[0].sixattempts--;
        }

        const updatedUser = await FundleUser.updateOne(
            { username: username },
            {
                played: user[0].played,
                wins: user[0].wins,
                current_streak: user[0].current_streak,
                max_streak: user[0].max_streak,
                oneattempt: user[0].oneattempt,
                twoattempts: user[0].twoattempts,
                threeattempts: user[0].threeattempts,
                fourattempts: user[0].fourattempts,
                fiveattempts: user[0].fiveattempts,
                sixattempts: user[0].sixattempts
            })

    }

    res.send({ ok: true });
}