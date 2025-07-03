export default function GoalsProgress() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-xl mb-4 text-orange-500 font-bold">Daily Goals</h2>
      <div className="mb-2">
        <p>Steps</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full w-2/3"></div>
        </div>
      </div>
      <div className="mb-2">
        <p>Calories</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
