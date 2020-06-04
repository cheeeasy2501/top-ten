async function getUsers() {
    const users = [
        {
            "id": 1,
            "name": "Leanne",
            "gender": 0
        },
        {
            "id": 2,
            "name": "Graham",
            "gender": 0
        },
        {
            "id": 3,
            "name": "Tady",
            "gender": 1
        },
        {
            "id": 4,
            "name": "Bob",
            "gender": 0
        },
        {
            "id": 5,
            "name": "Fill",
            "gender": 1
        }
    ]

    return users;
};

function getPreferences(userID) {
    const preferencesData = [
        { userId: 1, productId: 1 },
        { userId: 1, productId: 2 },
        { userId: 1, productId: 3 },
        { userId: 1, productId: 4 },
        { userId: 1, productId: 5 },

        { userId: 2, productId: 4 },
        { userId: 2, productId: 2 },
        { userId: 2, productId: 1 },
        { userId: 2, productId: 7 },
        { userId: 2, productId: 8 },

        { userId: 3, productId: 10 },
        { userId: 3, productId: 9 },
        { userId: 3, productId: 1 },
        { userId: 3, productId: 3 },
        { userId: 3, productId: 6 },
    ];

    let preferences = preferencesData.filter(dataObject => dataObject.userId === userID);

    return preferences;
};


async function getGenderPreferences(gender) {
    const femaleData = [
        1,
        2,
        3,
        4,
    ];

    const maleData = [
        2,
        5,
        8,
        1,
    ];

    if (gender === 0) {
        return femaleData;
    }

    if (gender === 1) {
        return maleData;
    }
};

function validateCount(length) {
    if (length < 5) {
        return false;
    }

    return true;
}

function sortByCount(array) {
    array.sort((a, b) => a.count > b.count ? 1 : -1).reverse();
}

function cutArray(array, limit = 10, directionFirst = false) {
    while (array.length > limit) {
        directionFirst ? array.splice(1, 1) : array.pop();
    }
}

async function getTop() {

    let topProducts = [];
    let users = await getUsers().then((response) => {
        return response;
    });

    users.forEach(user => {

        let userPreferences = getPreferences(user.id);

        if (!validateCount(userPreferences.length)) {
            let genderPreferences = getGenderPreferences(user.gender);

            if (genderPreferences.length > (5 - userPreferences.length)) {
                for (i = 0; i < (5 - userPreferences.length); i++) {
                    userPreferences.push(genderPreferences[i]);
                }
            }

            if (!validateCount(userPreferences.length)) {
                return;
            }
        }

        setTopProducts(userPreferences, topProducts);
    })
    sortByCount(topProducts);
    cutArray(topProducts);
    console.log('TOP PRODUCT COUNT with cut:', topProducts.length);
    console.log('TOP PRODUCT:', topProducts);
    console.log('---------------------------------------------------------------------');
    return topProducts;
};

function setTopProducts(userPreferences, resultArray) {
    userPreferences.forEach(productData => {
        let productElement = { id: productData.productId, count: 1 };
        let searchElementIndex = resultArray.findIndex(product => product.id === productElement.id);

        if (searchElementIndex !== -1) {
            resultArray[searchElementIndex].count += 1;
            return;
        };

        resultArray.push(productElement);
    })
}

getTop();
