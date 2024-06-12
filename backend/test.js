const user = {
    _id: "petya",
    arrayFriends: [
        {
            _id: "vasya",
            arrayFriends: [
                {
                    _id: "dima",
                    arrayFriends: {
                        
                    }
                },
                {
                    _id: "kolya",
                    arrayFriends: {
                        
                    }
                }
            ]
        },
        {
            _id: "dima",
            arrayFriends: {

            }
        }
    ]
};
const maxInt = 1e5
const used = new Set()
const answer = []

function dfs(v, p=undefined) {
    if (used.find(v) !== -1) {
    console.log("has cycle");
    return v
    }
    used.add(v);
    user.arrayFriends.array.forEach(u => {
    if (u._id !== p._id) {
        let k = dfs(u, v);
        if (k !== undefined) {
        answer.push(v)
        if (k._id == v._id) {
            process.exit(0);
        }
        return k
        }
    }
    });
}