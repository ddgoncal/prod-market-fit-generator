"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PreviewPage() {
    const [quizData, setQuizData] = useState(null);
    const [activeTab, setActiveTab] = useState('form'); // 'form' or 'json'

    useEffect(() => {
        const data = localStorage.getItem('quizData');
        if (data) {
            setQuizData(JSON.parse(data));
        }
    }, []);

    if (!quizData) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl mb-4">No quiz data found</p>
                    <Link 
                        href="/quiz" 
                        className="text-blue-500 hover:text-blue-600 underline"
                    >
                        Go back to create a quiz
                    </Link>
                </div>
            </div>
        );
    }

    const TabButton = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === tab
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );

    const FormPreview = () => (
        <div className="space-y-6">
            {quizData.questions.map((question, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">
                        Question {index + 1}: {question.text}
                    </h3>
                    {question.type === 'single-choice' && (
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    id={`q${index}-option1`}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor={`q${index}-option1`}>Option 1</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    id={`q${index}-option2`}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor={`q${index}-option2`}>Option 2</label>
                            </div>
                        </div>
                    )}
                    {question.type === 'multiple-choice' && (
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`q${index}-option1`}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor={`q${index}-option1`}>Option 1</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`q${index}-option2`}
                                    className="mr-2"
                                    disabled
                                />
                                <label htmlFor={`q${index}-option2`}>Option 2</label>
                            </div>
                        </div>
                    )}
                    {question.type === 'text' && (
                        <input
                            type="text"
                            placeholder="Enter your answer"
                            className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500"
                            disabled
                        />
                    )}
                </div>
            ))}
        </div>
    );

    const JsonPreview = () => (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <pre className="whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(quizData, null, 2)}
            </pre>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-4">Quiz Preview</h1>
                    <div className="flex gap-2 mb-4">
                        <TabButton tab="form" label="Form View" />
                        <TabButton tab="json" label="JSON View" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        {activeTab === 'form' ? <FormPreview /> : <JsonPreview />}
                    </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                    <Link 
                        href="/quiz"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Edit Quiz
                    </Link>
                </div>
            </div>
        </div>
    );
}