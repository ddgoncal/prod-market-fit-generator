// components/QuestionBuilder.js
"use client"; // Added this directive
import { useFieldArray, useForm } from "react-hook-form";

function QuestionBuilder() {
    const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = data => {
        console.log(data);
        // Here you would handle saving the quiz data to your API
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           {fields.map((field, index) => (
                <div key={field.id}>
                <div>
                <label>Question {index + 1}</label>
                   <input
                    type="text"
                    {...register(`questions.${index}.text`)}
                    placeholder="Enter your question"
                     />
                     <label>Question type</label>
                     <select {...register(`questions.${index}.type`)}>
                         <option value="single-choice">Single Choice</option>
                         <option value="multiple-choice">Multiple Choice</option>
                          <option value="text">Text</option>
                     </select>
                  </div>
                  <button type="button" onClick={() => remove(index)}>Remove</button>
                   </div>
                    ))}

            <button type="button" onClick={() => append({ text: "", type: "single-choice" })}>Add Question</button>

            <button type="submit">Save Quiz</button>
        </form>
    );
}

export default QuestionBuilder;