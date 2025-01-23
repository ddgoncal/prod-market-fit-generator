"use client";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useRouter } from 'next/navigation';

function QuestionBuilder() {
    const router = useRouter();
    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            questions: []
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = data => {
        localStorage.setItem('quizData', JSON.stringify(data));
        router.push('/quiz/preview');
    };

    const QuestionOptions = ({ questionIndex, type }) => {
        const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
            control,
            name: `questions.${questionIndex}.options`
        });

        return (
            <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">Options</label>
                    <button 
                        type="button" 
                        onClick={() => appendOption({ text: "" })}
                        className="text-blue-500 text-sm hover:text-blue-700"
                    >
                        + Add Option
                    </button>
                </div>
                
                {optionFields.map((option, optionIndex) => (
                    <div key={option.id} className="flex items-center space-x-2">
                        <input
                            type={type === 'single-choice' ? 'radio' : 'checkbox'}
                            disabled
                            className="mt-1"
                        />
                        <input
                            type="text"
                            {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
                            placeholder={`Option ${optionIndex + 1}`}
                            className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button 
                            type="button" 
                            onClick={() => removeOption(optionIndex)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6">
            <div className="space-y-6">
                {fields.map((field, index) => {
                    const questionType = watch(`questions.${index}.type`);
                    
                    return (
                        <div key={field.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                                    <button 
                                        type="button" 
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700 px-3 py-1 rounded-md border border-red-500 hover:border-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Question Text</label>
                                    <input
                                        type="text"
                                        {...register(`questions.${index}.text`)}
                                        placeholder="Enter your question"
                                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Question Type</label>
                                    <select 
                                        {...register(`questions.${index}.type`)}
                                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        <option value="single-choice">Single Choice</option>
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="text">Text</option>
                                    </select>
                                </div>

                                {(questionType === 'single-choice' || questionType === 'multiple-choice') && (
                                    <QuestionOptions questionIndex={index} type={questionType} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 space-x-4">
                <button 
                    type="button" 
                    onClick={() => append({ 
                        text: "", 
                        type: "single-choice",
                        options: [{ text: "" }, { text: "" }]  // Default with two empty options
                    })}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Question
                </button>
                
                <button 
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    disabled={fields.length === 0}
                >
                    Preview Quiz
                </button>
            </div>
        </form>
    );
}

export default QuestionBuilder;