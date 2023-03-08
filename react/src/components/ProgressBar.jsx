export default function ProgressBar({ name, color, progress, left, over, data, sum }) {
  if (progress > 100)
    progress = 100

  return (
    <div className="w-full h-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-500">{name}</p>
        <p className="text-sm font-medium text-gray-700"><b>{data}</b>{` / ${sum}g`}</p>
      </div>
      <div className="w-full h-4 rounded-full bg-zinc-300 mb-2">
        <div className={`h-full rounded-full bg-${color}-500 flex justify-center`}
        style={{ width: `${progress}%` }}
        >
        </div>
        <div className="flex items-center justify-center mb-2">
          <p className="text-sm font-medium text-gray-500">{left}g {over ? 'over' : 'left'}</p>
        </div>
      </div>
    </div>
  )
}
