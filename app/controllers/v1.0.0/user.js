var business = require('../../business/index').v1_0_0;
/**
 * @apiDefine auth
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiError {number} status http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} error error description
 */

/**
 * @api {post} /register 01) Register user
 * @apiGroup Authentication
 * @apiName userRegister
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiParam {string} name valid name
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 */
exports.register = (req, res) => {
    business.user.register(req.body.email, req.body.password, req.body.name).then(
        user => {
            business.utils.createToken(user, req.connection.remoteAddress).then(
                token => res.status(200).json({ token: token, user: user.id }),
                error => res.status(error.code).send(error.msg));
        },
        error => res.status(500).send(error.msg)
    );
}

/**
 * @api {post} /login 02) Login user
 * @apiGroup Authentication
 * @apiName userLogin
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 * @apiSuccess {string} id user id
 * @apiSuccess {string} name user name
 * @apiSuccess {string} email user email
 * @apiSuccessExample {json} Response example:
 * {
 *      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA",
 *      "id": "84bb251c-f1ca-4ecd-893e-56ae404ef8ef",
 *      "name": "Administrator Exemple",
 *      "email": "admin@some.thing",
 *      "is_admin": true
 * }
 */
exports.login = (req, res) => {
    business.user.login(req.body.email, req.body.password).then(
        user => {
            business.utils.createToken(user, req.connection.remoteAddress).then(
                token => res.status(200).json({
                    token: token,
                    id: user.id,
                    name: business.utils.decrypt(user.name),
                    email: business.utils.decrypt(user.email),
                    is_admin: user.admin
                }),
                error => res.status(error.code).send(error.msg));
        },
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {post} /chpass 03) Change password
 * @apiGroup Authentication
 * @apiName changePassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} password new password
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.changePassword = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.user.changePassword(req.client, req.body.password).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /forgot 04) Forgot Password
 * @apiGroup Authentication
 * @apiName forgotPassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiSuccess {boolean} result return true if the email was sucessfuly sended
 */
exports.forgotPassword = (req, res) => {
    business.user.findByEmail(req.body.email).then(
        user => business.user.createRecoverToken(user).then(
            token => business.user.sendRecoverEmail(user, token).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg)),
        error => {
            if (error.code === 404) res.status(200).json({ result: true })
            else res.status(error.code).send(error.msg)
        });
}

/**
 * @api {post} /reset 05) Reset password
 * @apiGroup Authentication
 * @apiName resetPassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} token valid email
 * @apiParam {string} password new password
 * @apiSuccess {boolean} result return true if was sucessfuly reseted
 */
exports.resetPassword = (req, res) => {
    business.user.verifyRecoverToken(req.body.token).then(
        user => business.user.changePassword(user, req.body.password).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg)),
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {get} /photo 06) Get photo
 * @apiGroup Authentication
 * @apiName getPhotoToUser
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiSuccess {file} image 
 */
exports.getPhoto = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.utils.download(req.client.photo).then(
            download => {
                res.writeHead(200, download.header);
                res.end(download.file, 'binary');
            }, error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /photo 07) Update photo
 * @apiGroup Authentication
 * @apiName setPhotoFromUser
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} photo html name to input type file
 * @apiSuccess {boolean} result return true if was sucessfuly reseted
 */
exports.setPhoto = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.utils.upload('photo', req.client.id).then(
            upload => upload(req, res, (err) => {
                if (err) res.status(500).send(err.message);
                else business.user.updatePhoto(req.client, req.file.filename).then(
                    () => res.status(200).json({ filename: req.file.filename }),
                    error => res.status(error.code).send(error.msg));
            }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send("Unauthorized"); }
}