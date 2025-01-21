"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

function QuestionBuilder() {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            questions: []
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const onSubmit = data => {
        // Store the quiz data in localStorage before navigation
        localStorage.setItem('quizData', JSON.stringify(data));
        router.push('/quiz/preview');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6">
            <div className="space-y-6">
                {fields.map((field, index) => (
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
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 space-x-4">
                <button 
                    type="button" 
                    onClick={() => append({ text: "", type: "single-choice" })}
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