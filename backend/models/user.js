const mongoose = require("../db");
const School = require("./school");
const Course = require("./courses");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Relações (opcionais para admins)
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },

    role: { type: String, enum: ["student", "admin"], default: "student" },
    reputation: { type: Number, default: 0 },

    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exchange" }]
}, { timestamps: true });

userSchema.pre("validate", async function() {
    if (this.role === "student") { // validação só para students
        if (!this.school) throw new Error("Escola é obrigatória para students");
        if (!this.course) throw new Error("Curso é obrigatório para students");

        const course = await Course.findById(this.course);
        if (!course) throw new Error("Curso inválido");

        if (course.school.toString() !== this.school.toString()) {
            throw new Error("O curso selecionado não pertence à escola informada");
        }
    }
});



module.exports = mongoose.model("User", userSchema);
