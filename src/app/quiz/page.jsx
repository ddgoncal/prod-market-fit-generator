import QuestionBuilder from "../components/QuestionBuilder"

function CreateQuizPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create Your Quiz</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Add questions to your quiz using the form below
                    </p>
                </div>
                <QuestionBuilder />
            </div>
        </div>
    );
}

export default CreateQuizPage;