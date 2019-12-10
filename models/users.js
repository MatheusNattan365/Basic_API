const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UsersSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true },
    password: {type: String, required: true, select: false },
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
});

// Função antes de salvar
// Não usa ArrowFunction por conta do contexto do this
// nessa função.

UsersSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10,)
    return next();
})

module.exports = mongoose.model('Users', UsersSchema);
// ready to go!